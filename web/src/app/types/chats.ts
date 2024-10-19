export interface ChatMessage {
  id: string
  content: string
  createdAt: string
  userId: string
  userName: string
  userImage?: string | null
}

export interface NewChatMessage {
  content: string
  userName: string
  userImage?: string
}
