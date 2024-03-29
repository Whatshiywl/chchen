import { Piece } from './piece.class';
import { Board } from '../board.class';
import { BoardPosition, PieceType, PieceColor } from '@chchen/api-interfaces';

export class Bishop extends Piece {

    constructor () {
        super(PieceType.Bishop);
    }

    getPossibleMoves(board: Board, [ x, y ]: BoardPosition) {
        const distances = board.distanceToEdges([x, y]);
        const hits = [false, false, false, false];
        const moves: BoardPosition[] = [];
        for (let d = 1; d < 7; d++) {
            const subMoves: BoardPosition[] = [ ];
            if (distances[0] > d && distances[1] > d) subMoves.push([x + d, y + d]); else subMoves.push(undefined);
            if (distances[0] > d && distances[3] > d) subMoves.push([x + d, y - d]); else subMoves.push(undefined);
            if (distances[2] > d && distances[1] > d) subMoves.push([x - d, y + d]); else subMoves.push(undefined);
            if (distances[2] > d && distances[3] > d) subMoves.push([x - d, y - d]); else subMoves.push(undefined);
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

    toString() {
        return this.color === PieceColor.WHITE ? '♗' : '♝';
    }

}
