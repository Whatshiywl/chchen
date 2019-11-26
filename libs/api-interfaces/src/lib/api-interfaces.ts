export interface Message {
    message: string;
}

export type BoardPosition = [number, number];

export interface MatchInterface {
    readonly id: string;
    readonly players: string[];
    readonly timestamp: string;
    readonly moves: [BoardPosition, BoardPosition][];
}
