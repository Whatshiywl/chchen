import { Piece } from './piece.class';
import { Board } from '../board.class';
import { BoardPosition } from '@chchen/api-interfaces';
import { PieceColor } from './piece.interface';

export class Pawn extends Piece {

    private firstMove: boolean;

    constructor() {
        super();
        this.firstMove = true;
    }

    getPossibleMoves(board: Board, [ x, y ]: BoardPosition) {
        const distances = board.distanceToEdges([x, y]);
        const distanceToBorder = distances[1 - this.color];
        const moves: BoardPosition[] = [];
        if (distanceToBorder >= 1) {
            const aheadY = y + this.color;
            moves.push([x, aheadY]);
            const diag1 = board.get([x + 1, aheadY]);
            if (diag1 && diag1.color === -this.color) moves.push([x + 1, aheadY]);
            const diag2 = board.get([x - 1, aheadY]);
            if (diag2 && diag2.color === -this.color) moves.push([x - 1, aheadY]);
        }
        if (distanceToBorder >= 2 && this.firstMove) moves.push([x, y + 2 * this.color]);
        return moves;
    }

    toString() {
        return this.color === PieceColor.WHITE ? '♙' : '♟';
    }

}
