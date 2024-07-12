export interface ChatMessage {
  messageId?: string;
  senderUser: ChatUser;
  receiverUser: ChatUser;
  messageText: string;
  timestamp?: Date;
}

export interface ChatUser {
  name: string;
  email: string;
  photoId?: string;
}

export interface ConversationProps {
  email?: string;
  cookie?: string;
  data: Data;
}

export interface Data {
  conversationId: string;
  members: ChatUser[];
  messages: ChatMessage[];
}
