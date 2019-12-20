import { Injectable, HttpException, HttpStatus, HttpService } from '@nestjs/common';
import { BoardPosition } from '@chchen/api-interfaces';
import { Match } from '../shared/classes/match.class';
import { Player } from '../shared/classes/player.class';
import { PlayerService } from '../player/player.service';

@Injectable()
export class MatchService {

    readonly timeout: number;

    private matches: {
        [id: string]: Match
    };

    constructor(
        private httpService: HttpService,
        private playerService: PlayerService
    ) {
        this.matches = { };
        this.timeout = 60*1000;
    }

    createMatch(player1: string, player2: string) {
        const match = new Match(player1, player2);
        this.matches[match.id] = match;
        return match;
    }

    getMatches() {
        return Object.keys(this.matches);
    }

    getMatch(id: string) {
        const match = this.matches[id];
        if (match) return match;
        else throw new HttpException(`Match with id ${id} not found`, HttpStatus.NOT_FOUND);
    }

    move(matchId: string, fromStr: string, toStr: string) {
        const match = this.getMatch(matchId);
        const from = this.stringToBoardPosition(fromStr);
        const to = this.stringToBoardPosition(toStr);
        return match.play(from, to);
    }

    async queryPlayer(matchId: string, player: Player) {
        const match = this.getMatch(matchId);
        const response = await this.httpService.post<{ from: string, to: string }>(player.url, match, {
            timeout: this.timeout
        }).toPromise();
        const { from, to } = response.data;
        return this.move(matchId, from, to);
    }

    async startMatch(matchId: string) {
        const match = this.getMatch(matchId);
        let turn = 0;
        while (true) {
            let playerId = match.players[turn];
            const player = this.playerService.getPlayer(playerId);
            turn = turn === 0 ? 1 : 0;
            try {
                await this.queryPlayer(matchId, player);
            } catch (error) {
                playerId = match.players[turn];
                match.setWinner(playerId);
                break;
            }
        }
    }

    // 2,6 => [ 2, 6 ]
    // c7  => [ 2, 6 ]
    // 22  => [ 2, 6 ]
    stringToBoardPosition(posStr: string) {
        let x: number;
        let y: number;
        if (posStr.includes(',')) {
            [ x, y ] = posStr.split(',').map(s => Number(s.trim()));
        } else if (posStr.match(/([a-h])([1-8])/)) {
            const [ , xLetter, yStr ] = posStr.match(/([a-h])([1-8])/);
            x = xLetter.toLowerCase().charCodeAt(0) - 97;
            y = Number(yStr) - 1;
        } else if (posStr.match(/^(([0-9])|([0-5][0-9])|(6[0-3]))$/)) {
            const posNum = Number(posStr);
            x = Math.floor(posNum / 8);
            y = posNum % 8;
        }
        if (!(x + 1) || !(y + 1)) throw new HttpException(`${posStr} -> ${x},${y} not a valid position`, HttpStatus.BAD_REQUEST);
        return [ x, y ] as BoardPosition;
    }

}
