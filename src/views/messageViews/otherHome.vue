<template>
  <div class="page">
    <!-- 头像背景 -->
    <div class="avatar-bg" :style="{ '--avatar-url': `url(${currentUser.avator})` }"></div>
    <!-- 可滑动内容 -->
    <div class="scroll-content">
      <div class="top">
        <div class="top-avatar-border">
          <div class="top-avatar" :style="{ '--avatar-url': `url(${currentUser.avator})` }">
              <div class="follow-btn" v-if="userId !== currentUserStore.currentUser.userId && !currentUserStore.currentUser.follow.includes(userId)" @click="handleFollow" >
                  <!-- <div class="follow-icon"></div> -->
              </div> 
          </div>
        </div>
      </div>
      <div class="top-name">{{ currentUser.name }}</div>
      <!-- 用户作品数量、粉丝、关注 -->
      <div class="user-stats">
        <div class="stat-item stat-first">
          <div class="stat-number">{{ userPosts.length || 0 }}</div>
          <div class="stat-label">Works</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ currentUser.fans.length || 0 }}</div>
          <div class="stat-label">Fans</div>
        </div>
        <div class="stat-item stat-first">
          <div class="stat-number">{{ currentUser.follow.length || 0 }}</div>
          <div class="stat-label">Follow</div>
        </div>
      </div>
      <!-- 简介和chat按钮 -->
      <div class="intro-chat">
        <div class="intro-text">{{ currentUser.about }}</div>
        <template v-if="userId !== currentUserStore.currentUser.userId">
          <div class="chat-btn" @click="handleChat">
              <div class="chat-icon"></div>
              <div class="chat-text">Chat</div>
          </div>
        </template>
        <template v-else>
          <div class="chat-btn-hidden"></div>
        </template>
      </div>
      <!-- Post标题 -->
      <div class="post-title-container">
        <!-- <div class="post-title">Post</div> -->
      </div>
      <!-- PostList -->
      <div class="post-list">
        <template v-if="userPosts.length > 0">
          <div class="post-item" v-for="post in userPosts" :key="post.dynamicId" @click="toPostDetail(post.dynamicId, post.dynamicType)">
            <!-- <div class="post-content"> -->
              <!-- Top row: avatar + name (left) and report button (right) -->
              <div class="post-top">
                  <div class="post-user">
                    <div class="post-avatar-border">
                      <div class="post-avatar">
                        <div class="post-avatar-img" :style="{ backgroundImage: `url(${currentUser.avator})` }"></div>
                      </div>
                    </div>
                    <div class="post-username" :title="currentUser.name">{{ currentUser.name }}</div>
                  </div>
                  <div class="post-report" v-if="userId !== currentUserStore.currentUser.userId" @click.stop="showReportFunc()"></div>
              </div>
              <!-- Middle image -->
              <div class="post-image" :style="{ backgroundImage: `url(${post.dynamicPic[0]})` }">
                <div class="post-isvideo-icon" v-if="post.dynamicType === 1"></div>
                <div class="post-content-button">
                  <div class="post-image-overlay">
                    <div class="overlay-item">
                      <div class="overlay-icon overlay-like"></div>
                      <div class="overlay-count">{{ post.dynamicLikeCount || 0 }}</div>
                    </div>
                    <div class="overlay-item">
                      <div class="overlay-icon overlay-comment"></div>
                      <div class="overlay-count">{{ post.dynamicCommentCount || 0 }}</div>
                    </div>
                  </div>
                  <!-- <div class="post_details">
                    <div>{{ post.dynamicDesc }}</div>
                  </div> -->
                </div>
              </div>
              <!-- Bottom: post type -->
              <!-- <div class="post-type"># {{ otherStore.getTagByIndex(post.dynamicTitleType) }}</div> -->
            <!-- </div> -->
            <!-- 详情 -->
            <div class="post_details">
              <div>{{ post.dynamicDesc }}</div>
            </div>
          </div>
        </template>
        <template v-else>
          <Empty />
        </template>
      </div>
    </div>
    <!-- 顶部按钮 -->
    <div class="top-btn">
        <BackButton/>
        <MoreButton v-if="userId !== currentUserStore.currentUser.userId" @click="showReportFunc()" />
    </div>
    <ReportDialog v-if="showReport" @close="showReport = false" @select="reportSelect" >
    </ReportDialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { usePostStore } from '@/stores/post'
import { useOtherStore } from '@/stores/other'
import { useCurrentUserStore } from '@/stores/currentUser'
import { useChatsStore } from '@/stores/chat'
import BackButton from '@/components/back.vue'
import MoreButton from '@/components/more.vue'
import ReportDialog from '@/components/reportChoose.vue'
import Empty from '@/components/empty.vue'
import { goBackOrClose, sendShowLoadingToIOS, sendShowToastToIOS, sendShowToLoginToIOS } from '@/utils/iosBridge'

const { userId } = defineProps({
  userId: {
    type: [String, Number],
    required: true
  }
})
// 用户信息
const userStore = useUserStore()
const currentUser = computed(() => {
  return userStore.getUserById(userId) || {}
})
// 用户帖子列表
const postStore = usePostStore()
const userPosts = computed(() => postStore.getPostsByUserId(userId))
const otherStore =  useOtherStore()
const currentUserStore = useCurrentUserStore()
const chatStore = useChatsStore()
const router = useRouter()

const showReport = ref(false)

function showReportFunc() {
  if (currentUserStore.currentUser.isguest == 1) {
    sendShowToLoginToIOS()
    return
  }
  showReport.value = true
}

function reportSelect(value) {
  showReport.value = false
  if (value === 0) {
    router.push({ name: 'report' })
  } else if (value === 1) {
    //用户选择屏蔽
    sendShowLoadingToIOS(true)

    // 用户选择屏蔽时加入 blockList
    const blockList = currentUserStore.currentUser.blockList || []

    // 不存在才加入，避免重复
    if (!blockList.includes(userId)) {
      blockList.unshift(userId)

      // 使用 userStore 公共方法同步更新当前用户并回传 iOS
      userStore.updateUser(currentUserStore.currentUser.userId, { blockList: blockList })
    }

    const delay = Math.floor(Math.random() * 1500) + 500

    setTimeout(() => {
      sendShowLoadingToIOS(false)
      sendShowToastToIOS('Blocking successful')

      goBackOrClose()

    }, delay)
  }
}

// Handle follow action
function handleFollow() {
  if (currentUserStore.currentUser.isguest == 1) {
    sendShowToLoginToIOS()
    return
  }
  const currentUserId = currentUserStore.currentUser.userId

  // Update current user's follow list
  const currentUserFollow = currentUserStore.currentUser.follow ? [...currentUserStore.currentUser.follow] : []
  if (!currentUserFollow.includes(userId)) {
    currentUserFollow.unshift(userId)
  }

  // Update post user's fans list
  const postUserFans = currentUser.fans ? [...currentUser.fans] : []
  if (!postUserFans.includes(currentUserId)) {
    postUserFans.unshift(currentUserId)
  }

  // Update current user store and user store
  userStore.updateUser(currentUserId, { follow: currentUserFollow })

  userStore.updateUser(userId, { fans: postUserFans })
  
  sendShowToastToIOS('Followed successfully')
}

function handleChat() {
  if (currentUserStore.currentUser.isguest == 1) {
    sendShowToLoginToIOS()
    return
  }
  const currentUserFollow = Array.isArray(currentUserStore.currentUser.follow)
    ? currentUserStore.currentUser.follow
    : []

  const targetUserFans = Array.isArray(currentUser.value?.follow)
    ? currentUser.value.follow
    : []

  const postrCurrentUserId = currentUserStore.currentUser.userId

  if (!currentUserFollow.includes(userId) || !targetUserFans.includes(postrCurrentUserId)) {
    sendShowToastToIOS('You can only chat if you follow each other.')
    return
  }

  sendShowLoadingToIOS(true)
  const currentUserId = currentUserStore.currentUser.userId

  // 查找是否已有 chat
  const existChat = chatStore.chat.find(chat => {
    const ids = chat.chatUserIds || []
    return ids.includes(currentUserId) && ids.includes(userId)
  })

  let chatId

  if (existChat) {
    chatId = existChat.chatId
  } else {
    // 创建新的 chat
    const newChat = {
      chatId: String(chatStore.chat.length + 1),
      chatUserIds: [currentUserId, userId],
      lastSendContent: '',
      lastSendTime: new Date().toISOString(),
      unreadMsgCount: 0,
      lastSendUserId: currentUserId
    }

    chatStore.addChat?.(newChat)
    chatId = newChat.chatId
  }

  const delay = Math.floor(Math.random() * 1500) + 500

  setTimeout(() => {
    sendShowLoadingToIOS(false)
    // 跳转聊天页
    router.push({
      name: 'chat',
      params: { chatId: chatId }
    })

  }, delay)
}

//详情
function toPostDetail(dynamicId, dynamicType) {
  if (dynamicType == 0) {
    router.push({
      name: 'picPostDetails',
      params: { postId: dynamicId }   // ✅ 注意这里是 postId
    })
  }
  if (dynamicType == 1) {
    router.push({
      name: 'videoPostDetails',
      params: { postId: dynamicId }   // ✅ 同样修改
    })
  }
}
</script>

<style scoped>
.page {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url('@/assets/pagebgc.png') no-repeat center center;
  background-size: cover;
  overflow: hidden;
}

.avatar-bg {
  width: 100%;
  position: absolute;
  top: 0;
  height: calc(100vh * 348 / 812);
  background: var(--avatar-url) no-repeat center;
  background-size: cover;
  /* 关键：渐隐 */
  -webkit-mask-image: linear-gradient(to bottom, rgba(204, 204, 204, 0.82), rgba(204, 204, 204, 0.14));
  mask-image: linear-gradient(to bottom, rgba(204, 204, 204, 0.82), rgba(204, 204, 204, 0.14));
}

.scroll-content {
  position: relative;
  padding-top: calc(100vh * 72 / 812); /* 自适应顶部间距 */
  width: 100vw;
  height: calc(100vh - calc(100vh * 72 / 812));
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

.top {
  display: flex;
  justify-content: center;
}

.top-avatar-border {
  border-radius: 50%;
  background: rgba(241, 237, 224, 1);
  display: flex;
  justify-content: center;
}

.top-avatar {
  width: calc(100vw * 66 / 375); /* 可以根据需要调整 */
  height: calc(100vw * 66 / 375);
  border-radius: 50%;
  padding: calc(100vh * 1 / 812) calc(100vw * 1 / 375);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.top-avatar::before {
  content: '';
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-image: var(--avatar-url);
  background-size: cover;
  background-position: center;
}

.follow-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: calc(100vw * 20 / 375);
  height: calc(100vh * 20 / 812);
  background-image: url('@/assets/follow.png');
  background-size: cover; /* 等比缩放覆盖 */
  background-position: center; /* 居中显示 */
  background-repeat: no-repeat;
  overflow: hidden;
}

.top-name {
  padding: calc(100vh * 12 / 812) calc(100vw * 20 / 375) 0;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  line-height: calc(100vw * 26.94 / 375);
  font-family: 'ArchivoNarrowBold', sans-serif;
  color: rgb(255, 255, 255);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  text-align: center;
}

/* 用户作品数量、粉丝、关注样式 */
.user-stats {
  display: flex;
  justify-content: center;
  gap: calc(100vw * 60 / 375); /* 三个内容间距60 */
  margin-top: calc(100vh * 16 / 812); /* 顶部间距16 */
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(100vh * 6 / 812); /* 上下结构间距6 */
  width: calc(100vw * 62 / 375);
}

.stat-number {
  font-family: 'ArchivoNarrowBold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  line-height: calc(100vw * 26.94 / 375);
  color: rgb(255, 255, 255);
}

.stat-label {
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 18.86 / 375);
  color: rgb(255, 255, 255);
}

.intro-chat {
  display: flex;
  justify-content: space-between; /* 左右对齐 */
  align-items: center;
  margin-top: calc(100vh * 20 / 812); /* 顶部间距 */
  padding-left: calc(100vw * 20 / 375);
  padding-right: calc(100vw * 20 / 375);
  width: 100%;
  box-sizing: border-box; /* 确保 padding 生效 */
  gap: calc(100vw * 10 / 375); /* 左右元素间距 */
}

.intro-text {
  flex: 1;
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 18.86 / 375);
  color: rgb(255, 255, 255);
  word-break: break-word;
}

.chat-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: calc(100vw * 10 / 375); /* 两个元素间距10 */
  width: calc(100vw * 119 / 375);
  height: calc(100vh * 53 / 812);
  background: rgba(255, 255, 255, 0.1);
  /* border: calc(100vw * 1 / 375) solid rgba(251, 226, 100, 1); */
  border-radius: calc(100vw * 20 / 375);
  cursor: pointer;
}

.chat-btn-hidden {
  width: calc(100vw * 119 / 375);
  height: calc(100vh * 53 / 812);
}

.chat-icon {
  width: calc(100vw * 32 / 375);
  height: calc(100vw * 32 / 375);
  background-image: url('@/assets/otherhomechaticon.png');
  background-size: cover;
  background-position: center;
}

.chat-text {
  font-family: 'ArchivoNarrowBold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  line-height: calc(100vw * 26.94 / 375);
  color: rgba(255, 255, 255, 1);
}

.post-title-container {
  margin: calc(100vh * 20 / 812) calc(100vw * 20 / 375) 0;
  width: calc(100vw * 91 / 375);
  height: calc(100vw * 44 / 375);
  background-image: url('@/assets/posttitlebgi.png');
  background-size: cover;
  background-position: center;
}

/* .post-title {
  font-family: 'PangMenZhengDaoBiaoTiTiMianFeiBan', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 400;
  line-height: calc(100vw * 21.2 / 375);
  color: rgba(255, 255, 255, 1);
  padding: calc(100vh * 10 / 812) calc(100vw * 10 / 375);
  background: #000;
  border: calc(100vw * 1 / 375) solid rgba(251, 226, 100, 1);
  border-radius: calc(100vw * 10 / 375);
  box-sizing: border-box;
} */

/* PostList styles */
.post-list {
  display: flex;
  flex-direction: column;
  padding: calc(100vh * 16 / 812) calc(100vw * 20 / 375) calc(100vh * 34 / 812);
  width: 100%;
  box-sizing: border-box;
  gap: calc(100vh * 12 / 812); /* 项间距16 */
}

/* Post Item new layout */
.post-item {
  height: calc(100vh * 272 / 812);
  border-radius: calc(100vw * 20 / 375);
  background: rgba(255, 255, 255, 1);
  /* box-shadow: 0px 0px calc(100vw * 4 / 375)  rgba(0, 0, 0, 0.06); */
  border: calc(100vw * 2 / 375) solid rgba(142, 108, 219, 1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: calc(100vh * 17 / 812) calc(100vw * 12 / 375) calc(100vh * 10 / 812);
  gap: calc(100vh * 10 / 812);
}

/* Post item new sections */
/* .post-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: calc(100vh * 12 / 812) calc(100vw * 12 / 375);
  gap: calc(100vh * 10 / 812);
} */

.post-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: calc(100vw * 10 / 375);
}

.post-user {
  min-width: 0;
  flex: 1;
  display: flex;
  align-items: center;
  gap: calc(100vw * 11 / 375);
}

.post-avatar-border {
  background: rgba(142, 108, 219, 1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
}

.post-avatar {
  width: calc(100vw * 34 / 375);
  height: calc(100vw * 34 / 375);
  border-radius: 50%;
  padding: calc(100vh * 1 / 812) calc(100vw * 1 / 375);
  box-sizing: border-box;
  display: flex;
}

.post-avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.post-username {
  flex: 1;
  font-family: 'ArchivoNarrowBold', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 700;
  line-height: calc(100vw * 18.86 / 375);
  color: rgb(0, 0, 0);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-report {
  width: calc(100vw * 24 / 375);
  height: calc(100vw * 24 / 375);
  background-image: url('@/assets/postpiccommentreportblack.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
}

.post-image {
  flex: 1;
  border-radius: calc(100vw * 14 / 375);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
}

.post-isvideo-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100vw * 36 / 375);
  height: calc(100vw * 36 / 375);
  background-image: url('@/assets/videopluse.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  overflow: hidden;
}

.post-content-button {
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: calc(100vh * 10 / 812);
  align-items: flex-end;
}

.post-image-overlay {
  display: flex;
  justify-content: end;
  gap: calc(100vh * 10 / 812);
  margin: 0 calc(100vw * 6 / 375) calc(100vh * 6 / 812) 0;
}

.overlay-item {
  border-radius: calc(100vw * 20 / 375);
  background: rgb(0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: calc(100vh * 4 / 812) calc(100vw * 10 / 375);
  gap: calc(100vw * 4 / 375);
  /* margin-right: calc(100vw * 10 / 375); */
}

.overlay-icon {
  width: calc(100vw * 28 / 375);
  height: calc(100vw * 28 / 375);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.overlay-like {
  background-image: url('@/assets/likepic.png');
}

.overlay-comment {
  background-image: url('@/assets/chaticon.png');
}

.overlay-count {
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 400;
  line-height: calc(100vw * 21.55 / 375);
  color: rgb(255, 255, 255);
}

/* .post_details {
  width: 100%;
  height: calc(100vh * 41 / 812);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(calc(100vw * 4 / 375));
  border-radius: 0px 0px calc(100vw * 16 / 375) calc(100vw * 16 / 375);
  display: flex;
  flex-direction: column;
  justify-content: center;
} */

.post_details div {
  /* padding: 0 calc(100vw * 10 / 375); */
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 18.86 / 375);
  color: rgb(0, 0, 0);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* .post-type {
  font-family: 'Archivo', sans-serif;
  text-align: left;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 15.23 / 375);
  color: rgba(255, 255, 255, 1);
} */

.top-btn {
  position: absolute;
  top: calc(100vh * 56 / 812);
  left: calc(100vw * 20 / 375);
  right: calc(100vw * 20 / 375);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
}
</style>