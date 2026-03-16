import { defineStore } from 'pinia'
import chatsData from '../data/chat.json'
import { sendChatsToIOS } from '@/utils/iosBridge'

export const useChatsStore = defineStore('chat', {
    state: () => ({
        chat: window.chatList || chatsData,  // 初始化为本地 JSON
    }),
    actions: {
        getChatById(chatId) {
            return this.chat.find(c => c.chatId === chatId)
        },
        updateChat(chatId, updatedData) {
            const chat = this.chat.find(c => c.chatId === chatId)
            if (chat) {
                Object.assign(chat, updatedData)
                sendChatsToIOS(this.chat)  // 发送给 iOS
            }
        },
        addChat(newChat) {
            this.chat.push(newChat)
            sendChatsToIOS(this.chat)  // 发送给 iOS
        },
    }
})