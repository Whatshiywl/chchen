import { Module, HttpModule } from "@nestjs/common";
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { PlayerService } from '../player/player.service';

@Module({
    imports: [ HttpModule ],
    controllers: [ MatchController ],
    providers: [ MatchService, PlayerService ]
})
export class MatchModule { }
