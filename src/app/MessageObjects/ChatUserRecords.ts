import { ChatMessage } from "./ChatMessage"
import { ChatUser } from "./ChatUser"
import { UserMessagesResponse } from "./UserMessageResponse"

export interface ChatUserRecords {
    chatMessageList: ChatMessage[]
    chatUsers: ChatUser[]
    userMessagesResponses: UserMessagesResponse[]
}