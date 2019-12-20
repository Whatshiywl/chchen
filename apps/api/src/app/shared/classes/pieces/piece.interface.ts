import { Board } from '../board.class';
import { BoardPosition, PieceColor } from '@chchen/api-interfaces';

export interface PieceInterface {

    getColor: () => PieceColor;
    setColor: (color: PieceColor) => void;

    onMove: () => void;

    getPossibleMoves: (board: Board, position: BoardPosition) => BoardPosition[];

    toString: () => string;

}
