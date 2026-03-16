import { defineStore } from 'pinia'
import messagesData from '../data/message.json'
import { sendMessagesToIOS } from '@/utils/iosBridge'

export const useMessagesStore = defineStore('message', {
    state: () => ({
        message: window.messageList || messagesData,  // 初始化为本地 JSON
    }),
    actions: {
        getMessagesByChatId(chatId) {
            return this.message.filter(msg => msg.chatId === chatId)
        },
        addMessage(newMessage) {
            this.message.push(newMessage)
            sendMessagesToIOS(this.message)  // 发送给 iOS
        },
    }
})