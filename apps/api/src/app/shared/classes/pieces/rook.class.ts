import { Piece } from './piece.class';
import { Board } from '../board.class';
import { BoardPosition, PieceType, PieceColor } from '@chchen/api-interfaces';

export class Rook extends Piece {

    private firstMove: boolean;

    constructor() {
        super(PieceType.Rook);
        this.firstMove = true;
    }

    getPossibleMoves(board: Board, [ x, y ]: BoardPosition) {
        const distances = board.distanceToEdges([x, y]);
        const hits = [false, false, false, false];
        const moves: BoardPosition[] = [];
        for (let d = 1; d < 7; d++) {
            const subMoves: BoardPosition[] = [ ];
            if (distances[0] > d) subMoves.push([x, y + d]); else subMoves.push(undefined);
            if (distances[1] > d) subMoves.push([x + d, y]); else subMoves.push(undefined);
            if (distances[2] > d) subMoves.push([x, y - d]); else subMoves.push(undefined);
            if (distances[3] > d) subMoves.push([x - d, y]); else subMoves.push(undefined);
            subMoves.forEach((move, dir) => {
                if (!move) return;
                if (hits[dir]) return;
                const piece = board.get(move);
                if (piece) {
                    hits[dir] = true;
                    if (piece.color === this.color) return;
                }
                moves.push(move);
            });
        }
        return moves;
    }

    onMove() {
        this.firstMove = false;
    }

    toString() {
        return this.color === PieceColor.WHITE ? '♖' : '♜';
    }

}
