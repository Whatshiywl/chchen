import { Controller, Get, Put, Param, Post } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {

    constructor(
        private matchService: MatchService
    ) { }

    @Put('/:white/:black')
    createMatch(@Param('white') white: string, @Param('black') black: string) {
        return this.matchService.createMatch(white, black);
    }

    @Get()
    getMatches() {
        return this.matchService.getMatches();
    }

    @Get('/:id')
    getMatch(@Param('id') id: string) {
        return this.matchService.getMatch(id);
    }


    @Post('/:id/move/:from/:to')
    postMove(@Param('id') id: string, @Param('from') from: string, @Param('to') to: string) {
        return this.matchService.move(id, from, to);
    }



}
