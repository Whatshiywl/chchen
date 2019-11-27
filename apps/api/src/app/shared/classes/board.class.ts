import { Piece } from './pieces/piece.class';
import { Pawn } from './pieces/pawn.class';
import { PieceColor } from './pieces/piece.interface';
import { BoardPosition } from '@chchen/api-interfaces';

export class Board {

    private ascii: string[];
    private squares: Piece[][];

    constructor() {
        this.ascii = [];
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
        this.updateAscii();
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

    updateAscii() {
        this.ascii = [' |1|2|3|4|5|6|7|8|'].concat(this.squares.map((col, i) => {
            return `${String.fromCharCode(i + 65)}|` + col.map(piece => {
                let pLetter = 'u';
                if (!piece) return ' ';
                else if (piece instanceof Pawn) pLetter = 'o';
                // else if (piece instanceof Rook) pLetter = 'h';
                // else if (piece instanceof Knight) pLetter = 'j';
                // else if (piece instanceof Bishop) pLetter = 'b';
                // else if (piece instanceof Queen) pLetter = 'q';
                // else if (piece instanceof King) pLetter = 'k';

                if (piece.getColor() === PieceColor.BLACK) pLetter = pLetter.toUpperCase();
                return pLetter;
            }).join('|') + '|';
        }));
    }

}
