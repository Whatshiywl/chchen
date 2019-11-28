import { PieceInterface, PieceColor } from './piece.interface';
import { Board } from '../board.class';
import { BoardPosition } from '@chchen/api-interfaces';

export abstract class Piece implements PieceInterface {

    color: PieceColor;

    constructor() { }

    getColor() {
        return this.color;
    }

    setColor(color: PieceColor) {
        this.color = color;
    }

    abstract getPossibleMoves(board: Board, position: BoardPosition): BoardPosition[];

    toString(): string {
        return this.color === PieceColor.WHITE ? 'W' : 'B';
    }

}
