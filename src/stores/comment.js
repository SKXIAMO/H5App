import { defineStore } from 'pinia'
import commentsData from '../data/comments.json'
import { useCurrentUserStore } from './currentUser'
import { sendCommentsToIOS } from '@/utils/iosBridge'

export const useCommentsStore = defineStore('comment', {
    state: () => ({
        comment: commentsData,  // 初始化为本地 JSON
    }),
    actions: {
        getCommentsById(postId) {
            const currentUserStore = useCurrentUserStore()
            const blockList = currentUserStore.currentUser.blockList || []

            // 过滤 dynamicId 匹配的评论，并排除被屏蔽的用户
            const filtered = this.comment.filter(
                c => c.dynamicId == postId && !blockList.includes(c.userId)
            )

            // 倒序返回
            return filtered.reverse();
        },

        addComment(comment) {
            this.comment.push(comment)
            sendCommentsToIOS(this.comment)
        }
    }
})