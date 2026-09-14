<template>
  <div class="page">
    <!-- <div class="page-top-background"></div> -->
    <!-- 头像背景 -->
    <!-- <div class="avatar-bg" :style="{ '--avatar-url': `url(${currentUser.avator})` }"></div> -->
    <!-- 可滑动内容 -->
    <div class="scroll-content">
      <div class="top">
        <div class="top-avatar-border">
          <div class="top-avatar" :style="{ '--avatar-url': `url(${currentUser.avator})` }"></div>
        </div>
        <div class="user-info">
          <div class="top-name">{{ currentUser.name }}</div>
          <div class="intro-text">{{ currentUser.about }}</div>
        </div>
      </div>
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
        <template v-if="userId !== currentUserStore.currentUser.userId">
      <div class="intro-chat">
          <div class="follow-btn" @click="handleFollow" >
              <div class="follow-icon" :class="{ following: isFollowing }"></div>
              <div class="follow-text">{{ isFollowing ? 'unfollow' : 'follow' }}</div>
          </div>
          <div class="chat-btn" @click="handleChat">
              <div class="chat-icon"></div>
              <div class="chat-text">Chat</div>
          </div>
      </div>
        </template>
      <!-- Post标题 -->
      <div class="post-title-container">
        <div class="post-title">Post</div>
      </div>
      <!-- PostList -->
      <div class="post-list">
        <template v-if="userPosts.length > 0">
          <div class="post-item" :class="post.dynamicType === 1 ? 'video-post' : 'image-post'" v-for="post in userPosts" :key="post.dynamicId" @click="toPostDetail(post.dynamicId, post.dynamicType)">
            <template v-if="post.dynamicType !== 1">
              <div class="post-top">
                  <div class="post-user">
                    <div class="post-avatar-border">
                      <div class="post-avatar">
                        <div class="post-avatar-img" :style="{ backgroundImage: `url(${currentUser.avator})` }"></div>
                      </div>
                    </div>
                    <div class="post-username" :title="currentUser.name">{{ currentUser.name }}</div>
                  </div>
                  <div class="post-report" v-if="userId !== currentUserStore.currentUser.userId" @click.stop="showOtherHomeReport"></div>
              </div>
              <div class="post-image" :style="{ backgroundImage: `url(${post.dynamicPic[0]})` }">
                <div class="post-pic-icon"></div>
                <div class="post-tag"># {{ otherStore.getTagByIndex(post.dynamicTitleType) }}</div>
                <div class="post-bottom-overlay">
                  <div class="post-details">{{ post.dynamicDesc }}</div>
                </div>
                <div class="post-like">
                  <div class="post-like-icon" :class="{ 'is-liked': post.isLiked }"></div>
                  <div class="post-like-count">{{ post.displayedLikeCount }}</div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="video-media" :style="{ backgroundImage: `url(${post.dynamicPic[0]})` }">
                <div class="video-top post-top">
                  <div class="post-user"><div class="post-avatar"><div class="post-avatar-img" :style="{ backgroundImage: `url(${currentUser.avator})` }"></div></div><div class="post-username">{{ currentUser.name }}</div></div>
                  <div class="post-report" v-if="userId !== currentUserStore.currentUser.userId" @click.stop="showOtherHomeReport"></div>
                </div>
                <div class="post-isvideo-icon"></div>
                <div class="post-bottom-overlay"><div class="post-details">{{ post.dynamicDesc }}</div></div>
                <div class="post-like"><div class="post-like-icon" :class="{ 'is-liked': post.isLiked }"></div><div class="post-like-count">{{ post.displayedLikeCount }}</div></div>
              </div>
            </template>
          </div>
        </template>
        <template v-else>
          <Empty />
        </template>
      </div>
    </div>
    <!-- 顶部按钮 -->
    <div class="top-btn">
        <BackButton theme="black" />
        <MoreButton theme="black" v-if="userId !== currentUserStore.currentUser.userId" @click="showOtherHomeReport" />
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
import { goBackOrClose, sendShowLoadingToIOS, sendShowToastToIOS, showToLogin } from '@/utils/iosBridge'

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
const userPosts = computed(() => {
  const likedPostIDs = new Set((currentUserStore.currentUser?.postLikeIds || []).map(String))
  return postStore.getPostsByUserId(userId).map(post => {
    const isLiked = likedPostIDs.has(String(post.dynamicId))
    return {
      ...post,
      isLiked,
      displayedLikeCount: (Number(post.dynamicLikeCount) || 0) + (isLiked ? 1 : 0)
    }
  })
})
const otherStore =  useOtherStore()
const currentUserStore = useCurrentUserStore()
const chatStore = useChatsStore()
const router = useRouter()

const isFollowing = computed(() => {
  const followList = currentUserStore.currentUser.follow || []
  return followList.map(String).includes(String(userId))
})

const showReport = ref(false)

function showOtherHomeReport() {
  if (otherStore.getIsShowToLogin()) {
    showToLogin()
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
  if (otherStore.getIsShowToLogin()) {
    showToLogin()
    return
  }
  const currentUserId = currentUserStore.currentUser.userId

  // Update current user's follow list
  const currentUserFollow = currentUserStore.currentUser.follow ? [...currentUserStore.currentUser.follow] : []
  const targetIndex = currentUserFollow.findIndex(id => String(id) === String(userId))
  if (targetIndex >= 0) {
    currentUserFollow.splice(targetIndex, 1)
  } else {
    currentUserFollow.unshift(userId)
  }

  // Update post user's fans list
  const postUserFans = currentUser.value.fans
    ? [...currentUser.value.fans]
    : []
  const fanIndex = postUserFans.findIndex(id => String(id) === String(currentUserId))
  if (targetIndex >= 0) {
    if (fanIndex >= 0) postUserFans.splice(fanIndex, 1)
  } else if (fanIndex < 0) {
    postUserFans.unshift(currentUserId)
  }

  // Update current user store and user store
  userStore.updateUser(currentUserId, { follow: currentUserFollow })

  userStore.updateUser(userId, { fans: postUserFans })
  
  sendShowToastToIOS(targetIndex >= 0 ? 'Unfollowed successfully' : 'Followed successfully')
}

function handleChat() {
  if (otherStore.getIsShowToLogin()) {
    showToLogin()
    return
  }

  const currentUserId = String(currentUserStore.currentUser.userId)
  const profileUserId = String(userId)
  const currentUserFollowIds = (currentUserStore.currentUser.follow || []).map(String)
  const profileUserFollowIds = (currentUser.value.follow || []).map(String)
  const isMutuallyFollowing = currentUserFollowIds.includes(profileUserId)
    && profileUserFollowIds.includes(currentUserId)

  if (!isMutuallyFollowing) {
    sendShowToastToIOS('You can only chat with mutual followers.')
    return
  }

  sendShowLoadingToIOS(true)

  // 查找是否已有 chat
  const existChat = chatStore.chat.find(chat => {
    const ids = (chat.chatUserIds || []).map(String)
    return ids.length === 2
      && ids.includes(currentUserId)
      && ids.includes(profileUserId)
  })

  let chatId

  if (existChat) {
    chatId = existChat.chatId
  } else {
    // 创建新的 chat
    const newChat = {
      chatId: String(chatStore.chat.length + 1),
      chatUserIds: [currentUserId, profileUserId],
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
  background: rgb(255, 255, 255);
  background-size: cover;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.page-top-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh * 186 / 812);
  background: linear-gradient(0deg, rgba(165, 237, 57, 0) 0%, rgba(48, 234, 255, 0.38) 100%);
  pointer-events: none;
}

.avatar-bg {
  width: 100%;
  position: absolute;
  top: 0;
  height: calc(100vh * 348 / 812);
  background: var(--avatar-url) no-repeat center;
  background-size: cover;
  /* 关键：渐隐 */
  -webkit-mask-image: linear-gradient(to bottom, rgba(204, 204, 204, 0.55), rgba(204, 204, 204, 0));
  mask-image: linear-gradient(to bottom, rgba(204, 204, 204, 0.55), rgba(204, 204, 204, 0));
}

.scroll-content {
  position: relative;
  padding-top: calc(100vh * 98 / 812); /* 自适应顶部间距 */
  width: 100vw;
  height: calc(100vh - calc(100vh * 98 / 812));
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

.top {
  display: flex;
  /* justify-content: center; */
  gap: calc(100vw * 16 / 375);
  margin: 0 calc(100vw * 20 /375);
  align-items: center;
}

.top-avatar-border {
  border-radius: 50%;
  /* background: linear-gradient(90deg, rgba(165, 237, 57, 1) 0%, rgba(48, 234, 255, 1) 100%); */
  background-color: #999999;
  display: flex;
  justify-content: center;
}

.top-avatar {
  width: calc(100vw * 80 / 375); /* 可以根据需要调整 */
  height: calc(100vw * 80 / 375);
  border-radius: 50%;
  /* padding: calc(100vh * 2 / 812) calc(100vw * 2 / 375); */
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
  flex: 1;
  height: calc(100vh * 53 / 812);
  border-radius: calc(100vw * 20 / 375);
  background-color: rgba(185, 100, 255, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.follow-icon {
  width: calc(100vw * 40 / 375);
  height: calc(100vh * 40 / 812);
  flex: 0 0 auto;
  background: url('@/assets/add-follow-icon.png') center / cover no-repeat;
}

.follow-icon.following {
  background-image: url('@/assets/unfollow-icon.png');
}

.follow-text {
  font-family: 'SFProDisplaySemibold', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 600;
  line-height: calc(100vw * 19.09 / 375);
  color: rgba(255, 255, 255, 1);
}

.user-info {
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: calc(100vh * 6 / 812);
  justify-content: flex-start;
}

.top-name {
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: 'SFProDisplaySemibold', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 600;
  line-height: calc(100vw * 19.09 / 375);
  color: #000;
}

/* 用户作品数量、粉丝、关注样式 */
.user-stats {
  display: flex;
  /* justify-content: center; */
  gap: calc(100vw * 54 / 375); /* 三个内容间距60 */
  margin: 0 calc(100vw * 20 /375);
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
  font-family: 'SFProDisplayBold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  line-height: calc(100vw * 23.87 / 375);
  color: rgba(10, 10, 10, 1);
}

.stat-label {
  font-family: 'SFProDisplayRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 16.71 / 375);
  color: rgba(0, 0, 0, 0.4);
}

.intro-chat {
  display: flex;
  align-items: center;
  margin-top: calc(100vh * 29 / 812); /* 顶部间距 */
  padding-left: calc(100vw * 20 / 375);
  padding-right: calc(100vw * 20 / 375);
  width: 100%;
  box-sizing: border-box; /* 确保 padding 生效 */
  gap: calc(100vw * 11 / 375); /* 左右元素间距 */
}

.intro-text {
  min-width: 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-family: 'SFProDisplayRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 16.71 / 375);
  color: rgba(0, 0, 0, 0.6);
}

.chat-btn {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: calc(100vw * 12 / 375); /* 两个元素间距10 */
  /* width: calc(100vw * 122 / 375); */
  height: calc(100vh * 53 / 812);
  background: rgba(242, 242, 242, 1);
  /* border: calc(100vw * 1 / 375) solid rgb(0, 0, 0); */
  border-radius: calc(100vw * 20 / 375);
  cursor: pointer;
}

.chat-btn-hidden {
  width: calc(100vw * 122 / 375);
  height: calc(100vh * 46 / 812);
}

.chat-icon {
  width: calc(100vw * 40 / 375);
  height: calc(100vw * 40 / 375);
  background-image: url('@/assets/chaticon.png');
  background-size: cover;
  background-position: center;
}

.chat-text {
  font-family: 'SFProDisplaySemibold', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 600;
  line-height: calc(100vw * 19.09 / 375);
  color: rgb(0, 0, 0);
}

.post-title-container {
  margin: calc(100vh * 24 / 812) calc(100vw * 20 / 375) 0;
  display: flex;
  justify-content: start;
}

.post-title {
  font-family: 'SFProDisplayBold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  line-height: calc(100vw * 23.87 / 375);
  color: rgba(0, 0, 0, 1);
}

/* PostList styles */
.post-list {
  display: flex;
  flex-direction: column;
  padding: calc(100vh * 16 / 812) calc(100vw * 20 / 375) calc(100vh * 34 / 812);
  width: 100%;
  box-sizing: border-box;
  gap: calc(100vh * 16 / 812); /* 项间距16 */
}

/* Post Item new layout */
.post-item {
  height: calc(100vh * 249 / 812);
  border-radius: calc(100vw * 16 / 375);
  background: rgba(242, 242, 242, 1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: calc(100vh * 12 / 812) 0 0;
  gap: calc(100vh * 12 / 812);
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
  padding: 0 calc(100vw * 12 / 375);
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
  gap: calc(100vw * 12 / 375);
}

.post-avatar-border {
  /* background: linear-gradient(141.29deg, rgba(255, 110, 50, 1) 0%, rgba(253, 61, 104, 1) 44.94%, rgba(251, 226, 100, 1) 100%); */
  border-radius: 50%;
  display: flex;
  justify-content: center;
}

.post-avatar {
  width: calc(100vw * 32 / 375);
  height: calc(100vw * 32 / 375);
  border-radius: 50%;
  /* padding: calc(100vh * 1 / 812) calc(100vw * 1 / 375); */
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
  font-family: 'SFProDisplaySemibold', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 600;
  line-height: calc(100vw * 19.09 / 375);
  color: rgb(0, 0, 0);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-report {
  width: calc(100vw * 24 / 375);
  height: calc(100vw * 24 / 375);
  background-image: url('@/assets/postpiccommentreport.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
}

.post-isvideo-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100vw * 40 / 375);
  height: calc(100vw * 40 / 375);
  background-image: url('@/assets/videopluse.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  overflow: hidden;
}

.post-pic-icon {
  position: absolute;
  top: calc(100vh * 12 / 812);
  left: calc(100vw * 12 / 375);
  width: calc(100vw * 32 / 375);
  height: calc(100vh * 32 / 812);
  background: url('@/assets/post-pic-icon.png') center / cover no-repeat;
  z-index: 1;
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
  flex-direction: column;
  gap: calc(100vh * 13 / 812);
  margin: 0 calc(100vw * 10 / 375) calc(100vh * 10 / 812) 0;
  justify-content: end;
}

.overlay-item {
  width: calc(100vw * 32 / 375);
  border-radius: calc(100vw * 12 / 375);
  background: rgb(0, 0, 0);
  border: calc(100vw * 1 / 375) solid rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: calc(100vh * 6 / 812) 0;
  gap: calc(100vw * 6 / 375);
}

.overlay-icon {
  width: calc(100vw * 20 / 375);
  height: calc(100vw * 20 / 375);
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
  font-family: 'JetBrainsMonoRegular', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 400;
  line-height: calc(100vw * 19.84 / 375);
  color: rgb(255, 255, 255);
}

.post_details {
  width: 100%;
  /* height: calc(100vh * 41 / 812); */
  /* background: rgba(255, 255, 255, 0.2); */
  /* backdrop-filter: blur(calc(100vw * 4 / 375)); */
  /* border-radius: 0px 0px calc(100vw * 16 / 375) calc(100vw * 16 / 375); */
  display: flex;
  /* flex-direction: column;
  justify-content: center; */
}

.post_details div {
  font-family: 'JetBrainsMonoRegular', sans-serif;
  font-size: calc(100vw * 12 / 375);
  font-weight: 400;
  line-height: calc(100vw * 14.88 / 375);
  color: rgba(255, 255, 255, 1);

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;

  white-space: normal;
  overflow-wrap: anywhere;
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
  top: calc(100vh * 58 / 812);
  left: calc(100vw * 20 / 375);
  right: calc(100vw * 20 / 375);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
}

.post-tag {
  position: absolute;
  top: calc(100vh * 12 / 812);
  right: calc(100vw * 15 / 375);
  padding: calc(100vh * 4 / 812) calc(100vw * 8 / 375);
  border-radius: calc(100vw * 20 / 375);
  background: rgba(0, 0, 0, .2);
  font-family: 'SFProDisplayRegular', sans-serif;
  font-size: calc(100vw * 12 / 375);
  font-weight: 400;
  line-height: calc(100vw * 14.32 / 375);
  color: rgb(255, 255, 255);
}

.post-bottom-overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: calc(100vh * 42 / 812);
  /* padding: calc(100vh * 28 / 812) calc(100vw * 10 / 375) calc(100vh * 10 / 812); */
  box-sizing: border-box;
  background: linear-gradient(90deg, rgba(14, 8, 15, .5) 0%, rgba(14, 8, 15, 0) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.post-details {
  min-width: 0;
  width: 100%;
  padding-right: calc(100vw * 52 / 375);
  box-sizing: border-box;
  font-family: 'SFProDisplayRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 16.71 / 375);
  margin: 0 calc(100vw * 12 / 375);
  color: rgb(255, 255, 255);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-like {
  position: absolute;
  right: calc(100vw * 12 / 375);
  bottom: calc(100vh * 8 / 812);
  width: calc(100vw * 40 / 375);
  height: auto;
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
}

.post-like-icon {
  width: calc(100vw * 40 / 375);
  height: calc(100vh * 40 / 812);
  background-image: url('@/assets/dislikepic.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.post-like-icon.is-liked {
  background-image: url('@/assets/likepic.png');
}

.post-like-count {
  font-family: 'SFProDisplaySemibold', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 600;
  line-height: calc(100vw * 19.09 / 375);
  color: rgb(255, 255, 255);
  margin-top: calc(100vh * 2 / 812);
}

/* 视频帖：用户信息叠加在视频画面顶部 */
.video-post {
  padding: 0;
  position: relative;
}

.video-post .post-top {
  position: absolute;
  top: calc(100vh * 12 / 812);
  left: 0;
  right: 0;
  z-index: 2;
}

.video-post .post-username {
  color: #fff;
}

.video-post .post-image {
  height: calc(100% - calc(100vh * 24 / 812));
  flex: none;
  margin: calc(100vh * 12 / 812) calc(100vw * 12 / 375);
  box-sizing: border-box;
  border-radius: inherit;
}

.video-media {
  position: relative;
  width: calc(100% - calc(100vw * 24 / 375));
  height: calc(100% - calc(100vh * 24 / 812));
  margin: calc(100vh * 12 / 812) calc(100vw * 12 / 375);
  border-radius: inherit;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.video-media .video-top {
  position: absolute;
  top: calc(100vh * 12 / 812);
  left: 0;
  right: 0;
  z-index: 2;
}

.video-media .post-user {
  flex: 0 1 auto;
  width: auto;
  max-width: 82%;
}

.video-media .post-username {
  flex: 0 1 auto;
  max-width: calc(100vw * 110 / 375);
}

/* 图片帖：头部独立占位，媒体从头部下方开始 */
.image-post {
  padding-top: calc(100vh * 12 / 812);
}

.image-post .post-top {
  position: relative;
  z-index: 1;
}

.image-post .post-image {
  flex: 1;
  min-height: 0;
  margin: 0;
  border-radius: calc(100vw * 16 / 375);
}

.image-post .post-isvideo-icon {
  display: none;
}

/* 视频帖：媒体铺满卡片，头部叠加在画面顶部 */
.video-post .post-top {
  padding-left: calc(100vw * 12 / 375);
  padding-right: calc(100vw * 12 / 375);
}

.post-image {
  margin: calc(100vh * 12 / 812) calc(100vw * 12 / 375);
  flex: 1;
  border-radius: calc(100vw * 16 / 375);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
  margin-top: 0;
}
</style>
