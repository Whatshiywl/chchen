import { Match } from './match.class';

export class Player {

    constructor(
        readonly type: 'human' | 'computer',
        readonly url: string
    ) { }
    
}
