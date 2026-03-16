import { defineStore } from 'pinia'
import currentUserData from '../data/currentUser.json'

export const useCurrentUserStore = defineStore('currentUser', {
    state: () => ({
        // 如果 window.currentUser 有值就用它，否则用默认 JSON
        currentUser: window.currentUser || currentUserData
    }),
    actions: {
        setCurrentUser(user) {
            this.currentUser = user
            window.currentUser = user  // 保证全局 JS 对象也更新
        }
    }
})

function updateCurrentUser(user) {
    // 更新 Pinia store
    const currentUserStore = useCurrentUserStore()
    currentUserStore.setCurrentUser(user)
}