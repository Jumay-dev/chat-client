export type MessageEvent = 'message' | 'connection'

export interface MessageType {
    username: string;
    message: string;
    id: number;
    event: MessageEvent;
}