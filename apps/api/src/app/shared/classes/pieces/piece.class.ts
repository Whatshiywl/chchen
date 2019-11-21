import { PieceInterface, PieceColor } from './piece.interface';
import { Board, BoardPosition } from '../board.class';

export abstract class Piece implements PieceInterface {

    constructor(public readonly color: PieceColor) { }

    abstract getPossibleMoves(position: BoardPosition, board?: Board): BoardPosition[];

}