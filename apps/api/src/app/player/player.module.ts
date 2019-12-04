import { Module, HttpModule } from "@nestjs/common";
import { PlayerService } from '../player/player.service';
import { PlayerController } from './player.controller';

@Module({
    imports: [ HttpModule ],
    controllers: [ PlayerController ],
    providers: [ PlayerService ]
})
export class PlayerModule { }
