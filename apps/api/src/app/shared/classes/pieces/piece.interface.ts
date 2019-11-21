import { Board, BoardPosition } from '../board.class';

export enum PieceColor {
    WHITE = 1, BLACK = -1
}

export interface PieceInterface {

    readonly color: PieceColor;

    getPossibleMoves: (position: BoardPosition, board?: Board) => BoardPosition[];

}