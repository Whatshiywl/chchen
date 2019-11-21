import { Piece } from './piece.class';
import { BoardPosition, Board } from '../board.class';
import { PieceColor } from './piece.interface';

export class Pawn extends Piece {

    private firstMove: boolean;

    constructor(color: PieceColor) {
        super(color);
        this.firstMove = true;
    }

    getPossibleMoves([ x, y ]: BoardPosition, board: Board) {
        const distances = board.distanceToEdges([x, y]);
        const distanceToBorder = distances[1 - this.color];
        const moves: BoardPosition[] = [];
        if (distanceToBorder >= 1) moves.push([x, y + this.color]);
        if (distanceToBorder >= 2 && this.firstMove) moves.push([x, y + 2 * this.color]);
        return moves;
    }

}