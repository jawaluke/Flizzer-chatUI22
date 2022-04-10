import { ChatMessage } from "./ChatMessage";
import { ChatUser } from "./ChatUser"

export interface UserMessagesResponse {
    chatUser: ChatUser;
    chatMessageList: ChatMessage[];
  }
  