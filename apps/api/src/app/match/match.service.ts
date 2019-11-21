import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Match } from '@chchen/api-interfaces';
import * as moment from 'moment';

@Injectable()
export class MatchService {

    private matches: {
        [id: string]: Match
    };

    constructor() {
        this.matches = { };
    }

    createMatch(player1: string, player2: string) {
        const datetime = moment().format('YYYYMMDDHHmmssSSS');
        const id = `${datetime}_${player1}_vs_${player2}`;
        const match = {
            id,
            players: [ player1, player2 ]
        } as Match;
        this.matches[id] = match;
        return id;
    }

    getMatch(id: string) {
        const match = this.matches[id];
        if (match) return match;
        else throw new HttpException(`Match with id ${id} not found`, HttpStatus.NOT_FOUND);
    }

}
