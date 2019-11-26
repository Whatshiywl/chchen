import { Piece } from './pieces/piece.class';
import { Pawn } from './pieces/pawn.class';
import { PieceColor } from './pieces/piece.interface';

export type BoardPosition = [number, number];

export class Board {

    private squares: Piece[][];

    constructor() {
        this.squares = [];
        for (let col = 0; col < 8; col++) {
            const column: Piece[] = [];
            for(let row = 0; row < 8; row++) {
                let piece: Piece;
                if ([0, 7].includes(row)) {
                    if ([0, 7].includes(col)) {
                        // piece = new Rook();
                    } else if ([1, 6].includes(col)) {
                        // piece = new Knight();
                    } else if ([2, 5].includes(col)) {
                        // piece = new Bishop();
                    } else if (col === 3) {
                        // piece = new Queen();
                    } else {
                        // piece = new King();
                    }
                } else if ([1, 6].includes(row)) {
                    piece = new Pawn();
                }

                if (piece) {
                    const pieceColor = row <= 1 ? PieceColor.WHITE : PieceColor.BLACK;
                    piece.setColor(pieceColor);
                }

                column[row] = piece;
            }
            this.squares[col] = column;
        }
    }

    get([ x, y ]: BoardPosition) {
        return this.squares[x][y];
    }

    set([ x, y ]: BoardPosition, piece: Piece) {
        this.squares[x][y] = piece;
    }

    distanceToEdges([ x, y ]: BoardPosition) {
        return [
            7 - y, // top
            7 - x, // right
            y,     // bottom
            x      // left
        ];
    }

}
