import { defineStore } from 'pinia'
import otherData from '../data/other.json'

export const useOtherStore = defineStore('other', {
    state: () => ({
        other: { ...otherData, ...(window.other || {}) },
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

window.addEventListener('barreUsersReady', () => {
    const store = useOtherStore()
    if (window.other) store.other = { ...store.other, ...window.other }
})
