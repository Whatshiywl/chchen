import { Injectable } from '@nestjs/common';

@Injectable()
export class MatchService {

    private matches = [];

    createMatch() {
        return Date.now();
    }

    getMatch(id: string) {
        return { id };
    }

}
