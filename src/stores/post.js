import { defineStore } from 'pinia'
import postData from '../data/posts.json'  // 本地 JSON
import { sendPostsToIOS } from '@/utils/iosBridge'

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: postData  // 初始化帖子列表
  }),
  actions: {
    // 根据帖子 ID 查找帖子
    getPostById(postId) {
      // 保证类型一致，JSON 中 dynamicId 是字符串
      return this.posts.find(p => p.dynamicId === String(postId))
    },
    getPostsByUserId(userId) {
      return this.posts.filter(p => p.userId === String(userId))
    },
    updatePostById(postId, newData) {
      const post = this.posts.find(p => p.dynamicId === String(postId))
      if (post) {
        Object.assign(post, newData)
        sendPostsToIOS(this.posts)
      }
    },
    addPost(newPost) {
      this.posts.push(newPost)
      sendPostsToIOS(this.posts)
    }
  }
})