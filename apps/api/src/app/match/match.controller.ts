import { Controller, Get, Put, Param } from '@nestjs/common';
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

    @Get('/:id')
    getMatch(@Param('id') id: string) {
        return this.matchService.getMatch(id);
    }

}
