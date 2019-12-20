import { Piece } from './piece.class';
import { Board } from '../board.class';
import { BoardPosition, PieceType, PieceColor } from '@chchen/api-interfaces';

export class Pawn extends Piece {

    private firstMove: boolean;

    constructor() {
        super(PieceType.Pawn);
        this.firstMove = true;
    }

    getPossibleMoves(board: Board, [ x, y ]: BoardPosition) {
        const distances = board.distanceToEdges([x, y]);
        const distanceToBorder = distances[1 - this.color];
        const moves: BoardPosition[] = [];
        if (distanceToBorder >= 1) {
            const aheadY = y + this.color;
            const ahead = board.get([x, aheadY]);
            if (!ahead) moves.push([x, aheadY]);
            if (distances[1] > 0) {
                const diag1 = board.get([x + 1, aheadY]);
                if (diag1 && diag1.color === -this.color) moves.push([x + 1, aheadY]);
            }
            if (distances[3] > 0) {
                const diag2 = board.get([x - 1, aheadY]);
                if (diag2 && diag2.color === -this.color) moves.push([x - 1, aheadY]);
            }
        }
        if (distanceToBorder >= 2 && this.firstMove) moves.push([x, y + 2 * this.color]);
        return moves;
    }

    onMove() {
        this.firstMove = false;
    }

    toString() {
        return this.color === PieceColor.WHITE ? '♙' : '♟';
    }

}
