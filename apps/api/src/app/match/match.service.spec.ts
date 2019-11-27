import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';

describe('MatchService', () => {
    let service: MatchService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MatchService]
        }).compile();

        service = module.get<MatchService>(MatchService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should convert positions correctly', () => {
        const posStr1 = '2,6';
        const posStr2 = 'c7';
        const posStr3 = '22';
        const pos1 = service.stringToBoardPosition(posStr1);
        const pos2 = service.stringToBoardPosition(posStr2);
        const pos3 = service.stringToBoardPosition(posStr3);
        expect(pos1).toEqual([ 2, 6 ]);
        expect(pos2).toEqual([ 2, 6 ]);
        expect(pos3).toEqual([ 2, 6 ]);
    });
});
