import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {

    constructor(
        private matchService: MatchService
    ) { }

    @Put()
    createMatch(@Body('player1') player1: string, @Body('player2') player2: string) {
        return this.matchService.createMatch(player1, player2);
    }

    @Get('/:id')
    getMatch(@Param('id') id: string) {
        return this.matchService.getMatch(id);
    }

}
