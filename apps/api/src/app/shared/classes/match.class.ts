import { Board } from './board.class';
import { PieceColor } from './pieces/piece.interface';
import { MatchInterface, BoardPosition } from '@chchen/api-interfaces';
import * as uuid from 'uuid/v1';
import * as moment from 'moment';

export class Match implements MatchInterface {

    readonly id: string;
    readonly players: string[];
    readonly timestamp: string;
    readonly moves: [BoardPosition, BoardPosition][];
    private board: Board;
    private turn: PieceColor;

    constructor(
        w: string,
        b: string
    ) {
        this.id = uuid();
        this.players = [w, b];
        this.timestamp = moment().format('YYYYMMDDHHmmssSSS');
        this.moves = [];
        this.board = new Board();
        this.turn = PieceColor.WHITE;
    }

    play(from: BoardPosition, to: BoardPosition) {
        const [ x0, y0 ] = from;
        const [ x1, y1 ] = to;
        const pieceToMove = this.board.get(from);
        if (!pieceToMove) throw new Error(`No piece @${x0},${y0}`);
        if (pieceToMove.getColor() !== this.turn) throw new Error(`Peace @${x0},${y0} is not ${this.turn}`);
        const fromDistanceToEdge = this.board.distanceToEdges(from);
        if (Math.min(...fromDistanceToEdge) < 0) throw new Error(`${x0},${y0} is an invalid position to move from`);
        const toDistanceToEdge = this.board.distanceToEdges(to);
        if (Math.min(...toDistanceToEdge) < 0) throw new Error(`${x1},${y1} is an invalid position to move from`);
        const squareToOccupy = this.board.get(to);
        if (squareToOccupy && squareToOccupy.getColor() === this.turn) throw new Error(`Peace @${x1},${y1} is also ${this.turn}`);
        this.board.set(from, undefined);
        this.board.set(to, pieceToMove);
        this.turn = -this.turn;
        this.moves.push([from, to]);
        this.board.updateAscii();
        return this;
    }
    
}
