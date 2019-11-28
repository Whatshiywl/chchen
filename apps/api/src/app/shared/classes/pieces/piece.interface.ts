import { Board } from '../board.class';
import { BoardPosition } from '@chchen/api-interfaces';

export enum PieceColor {
    WHITE = 1, BLACK = -1
}

export interface PieceInterface {

    getColor: () => PieceColor;
    setColor: (color: PieceColor) => void;

    getPossibleMoves: (board: Board, position: BoardPosition) => BoardPosition[];

    toString: () => string;

}
