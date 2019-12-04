import { Piece } from './piece.class';
import { Board } from '../board.class';
import { BoardPosition } from '@chchen/api-interfaces';
import { PieceColor } from './piece.interface';

export class Knight extends Piece {

    getPossibleMoves(board: Board, [ x, y ]: BoardPosition) {
        const moves: BoardPosition[] = [];
        moves.push([x + 1, y + 2]);
        moves.push([x + 2, y + 1]);

        moves.push([x + 1, y - 2]);
        moves.push([x + 2, y - 1]);
        
        moves.push([x - 1, y + 2]);
        moves.push([x - 2, y + 1]);

        moves.push([x - 1, y - 2]);
        moves.push([x - 2, y - 1]);

        return moves.filter(move => {
            if (!board.isInside(move)) return false;
            const piece = board.get(move);
            if (piece && piece.color === this.color) return false;
            return true;
        });
    }

    toString() {
        return this.color === PieceColor.WHITE ? '♘' : '♞';
    }

}
