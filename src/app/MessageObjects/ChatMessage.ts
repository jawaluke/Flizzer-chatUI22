export interface ChatMessage {
    chatId: number
    message: string
    sender: string
    receiver: string
    messageTag: string
    times: string|undefined;
}