import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Player } from '../shared/classes/player.class';

@Injectable()
export class PlayerService {

    private players: {
        [id: string]: Player
    }

    createPlayer(id: string, url: string) {
        if (this.players[id]) throw new HttpException(`Player with id ${id} already exists`, HttpStatus.CONFLICT);
        this.players[id] = new Player('computer', url);
        return this.players[id];
    }

    getPlayer(id: string) {
        if (!this.players[id]) throw new HttpException(`Player with id ${id} not found`, HttpStatus.NOT_FOUND);
        return this.players[id];
    }

}
