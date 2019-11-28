import { Board } from './board.class';
import { PieceColor } from './pieces/piece.interface';
import { MatchInterface, BoardPosition } from '@chchen/api-interfaces';
import * as uuid from 'uuid/v1';
import * as moment from 'moment';
import { HttpException, HttpStatus } from '@nestjs/common';

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
        this.board = new Board();
        this.moves = [];
        this.turn = PieceColor.WHITE;
    }

    play(from: BoardPosition, to: BoardPosition) {
        const [ x0, y0 ] = from;
        const [ x1, y1 ] = to;
        const pieceToMove = this.board.get(from);
        if (!pieceToMove) throw new HttpException(`No piece @${x0},${y0}`, HttpStatus.NOT_FOUND);
        if (pieceToMove.getColor() !== this.turn) throw new HttpException(`Piece @${x0},${y0} is not ${this.turn}`, HttpStatus.FORBIDDEN);
        const fromDistanceToEdge = this.board.distanceToEdges(from);
        if (Math.min(...fromDistanceToEdge) < 0) throw new HttpException(`${x0},${y0} is an invalid position to move from`, HttpStatus.FORBIDDEN);
        const toDistanceToEdge = this.board.distanceToEdges(to);
        if (Math.min(...toDistanceToEdge) < 0) throw new HttpException(`${x1},${y1} is an invalid position to move from`, HttpStatus.FORBIDDEN);
        const squareToOccupy = this.board.get(to);
        if (squareToOccupy && squareToOccupy.getColor() === this.turn) throw new HttpException(`Piece @${x1},${y1} is also ${this.turn}`, HttpStatus.FORBIDDEN);
        const allowedMovesForPiece = pieceToMove.getPossibleMoves(this.board, from);
        if (!allowedMovesForPiece.find(pos => pos[0] === to[0] && pos[1] === to[1])) throw new HttpException(`@${x0},${y0} -> $@${x1},${y1} is not a valid move`, HttpStatus.FORBIDDEN);
        this.board.set(from, undefined);
        this.board.set(to, pieceToMove);
        pieceToMove.onMove();
        this.turn = -this.turn;
        this.moves.push([from, to]);
        this.board.updateAscii();
        return this;
    }
    
}
