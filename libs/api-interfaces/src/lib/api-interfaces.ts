export interface Message {
    message: string;
}

export interface MatchInterface {
    readonly id: string;
    readonly players: string[];
    readonly timestamp: string;
}
