import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MatchInterface } from '@chchen/api-interfaces';
import { Match } from '../shared/classes/match.class';

@Injectable()
export class MatchService {

    private matches: {
        [id: string]: MatchInterface
    };

    constructor() {
        this.matches = { };
    }

    createMatch(player1: string, player2: string) {
        const match = new Match(player1, player2);
        this.matches[match.id] = match;
        return match.id;
    }

    getMatch(id: string) {
        const match = this.matches[id];
        if (match) return match;
        else throw new HttpException(`Match with id ${id} not found`, HttpStatus.NOT_FOUND);
    }

}
