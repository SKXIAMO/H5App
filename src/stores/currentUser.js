import { defineStore } from 'pinia'
import currentUserData from '../data/currentUser.json'

export const useCurrentUserStore = defineStore('currentUser', {
    state: () => ({
        currentUser: window.currentUser || currentUserData // 当前登录用户
    }),
    actions: {}
})