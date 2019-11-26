import { PieceInterface, PieceColor } from './piece.interface';
import { Board, BoardPosition } from '../board.class';

export abstract class Piece implements PieceInterface {

    color: PieceColor;

    constructor() { }

    getColor() {
        return this.color;
    }

    setColor(color: PieceColor) {
        this.color = color;
    }

    abstract getPossibleMoves(position: BoardPosition, board?: Board): BoardPosition[];

}
