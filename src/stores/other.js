import { defineStore } from 'pinia'
import otherData from '../data/other.json'

export const useOtherStore = defineStore('other', {
    state: () => ({
        other: window.other || otherData,  // 初始化为本地 JSON
    }),
    actions: {
        getTagByIndex(index) {
            return this.other.postTheme[index]
        },

        getIsShowToLogin() {
            return this.other.isGuestLogin === 1
        }
    }
})