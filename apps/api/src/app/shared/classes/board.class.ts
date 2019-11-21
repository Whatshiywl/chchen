import { Piece } from './pieces/piece.class';

export type BoardPosition = [number, number];

export class Board {

    private squares: Piece[][];

    distanceToEdges(position: BoardPosition) {
        const [ x, y ] = position;
        return [
            8 - y, // top
            8 - x, // right
            y,     // bottom
            x      // left
        ];
    }

}