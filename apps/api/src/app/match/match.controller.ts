import { Controller, Get, Put, Param } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {

    constructor(
        private matchService: MatchService
    ) { }

    @Put()
    createMatch() {
        return this.matchService.createMatch();
    }

    @Get('/:id')
    getMatch(@Param('id') id: string) {
        return this.matchService.getMatch(id);
    }

}
