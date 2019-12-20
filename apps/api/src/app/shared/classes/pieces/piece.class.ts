import { Board } from '../board.class';
import { BoardPosition, PieceColor } from '@chchen/api-interfaces';
import { PieceInterface } from './piece.interface';

export abstract class Piece implements PieceInterface {

    color: PieceColor;

    constructor(readonly type) { }

    getColor() {
        return this.color;
    }

    setColor(color: PieceColor) {
        this.color = color;
    }

    onMove() { };

    abstract getPossibleMoves(board: Board, position: BoardPosition): BoardPosition[];

    toString(): string {
        return this.color === PieceColor.WHITE ? 'W' : 'B';
    }

}
