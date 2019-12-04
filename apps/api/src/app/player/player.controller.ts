import { Controller, Put, Body } from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {

    constructor(
        private playerService: PlayerService
    ) { }

    @Put()
    createPlayer(
        @Body('name') name: string,
        @Body('url') url: string
    ) {
        return this.playerService.createPlayer(name, url);
    }
    
}
