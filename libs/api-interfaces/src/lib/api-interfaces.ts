export interface Message {
    message: string;
}

export type BoardPosition = [number, number];

export interface MatchInterface {
    readonly id: string;
    readonly players: string[];
    readonly board: {
        ascii: string[];
        squares: Square[][];
    };
    readonly timestamp: string;
    readonly moves: [BoardPosition, BoardPosition][];
}

export interface Square {
    type: number;
    firstMove: boolean;
    color: number;
}

export enum PieceColor {
    WHITE = 1, BLACK = -1
}

export enum PieceType {
    Pawn = 1,
    Rook,
    Bishop,
    Knight,
    Queen,
    King
}