<template>
  <div class="page">
    <div class="page-top-background"></div>
    <div class="top-header">
      <BackButton />
      <span class="edit-title">Fans</span>
    </div>
    <!-- 粉丝列表 -->
    <div class="container">
        <div class="fan-list" v-if="fans.length > 0">
            <div v-for="(item, index) in fans" :key="index" class="fan-item">
                <div class="fan-left">
                    <div class="user-info">
                      <div class="avator-box-border">
                        <div class="avatar-box">
                            <div class="avatar-inner">
                                <img :src="item.avator" alt="avatar" />
                            </div>
                        </div>
                      </div>
                      <div class="user-name">{{ item.name }}</div>
                    </div>
                    <div class="user-intro">{{ item.about }}</div>
                </div>
                <div class="fan-right" @click="addFollow(item.userId)"></div>
            </div>
        </div>
        <Empty class="empty" v-else />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCurrentUserStore } from '@/stores/currentUser'
import { useUserStore } from '@/stores/user'
import BackButton from '@/components/back.vue'
import Empty from '@/components/empty.vue'
import { sendShowLoadingToIOS, sendShowToastToIOS } from '@/utils/iosBridge'

const currentUserStore = useCurrentUserStore()
const userStore = useUserStore()

const fans = computed(() => {
  return currentUserStore.currentUser?.fans?.map(userId => {
    // Here you can map userId to user info if you have a userStore
    // For now we return placeholder data
    return userStore.getUserById(userId)
  }) || []
})

function addFollow(userId) {
  if (currentUserStore.currentUser.follow?.includes(userId)) {
    sendShowToastToIOS('You have already followed this user.')
    return
  }

  sendShowLoadingToIOS(true)
  const currentUserId = currentUserStore.currentUser.userId

  // Update current user's follow list
  const currentUserFollow = currentUserStore.currentUser.follow ? [...currentUserStore.currentUser.follow] : []
  if (!currentUserFollow.includes(userId)) {
    currentUserFollow.unshift(userId)
  }

  // Update post user's fans list
  const otherUser = userStore.getUserById(userId)
  const otherUserFans = otherUser.fans ? [...otherUser.fans] : []
  if (!otherUserFans.includes(currentUserId)) {
    otherUserFans.unshift(currentUserId)
  }

  const delay = Math.floor(Math.random() * 1500) + 500

  setTimeout(() => {

    userStore.updateUser(currentUserStore.currentUser.userId, { follow: currentUserFollow })
    userStore.updateUser(userId, { fans: otherUserFans })

    sendShowLoadingToIOS(false)
    sendShowToastToIOS('Followed successfully')
  }, delay)
}
</script>

<style scoped>
.page {
  position: relative;
  width: 100%;
  height: 100vh;
  background: rgba(238, 239, 248, 1);
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

.top-header {
  display: flex;
  align-items: center;
  gap: calc(100vw * 16 / 375);
  padding: calc(100vh * 58 / 812) calc(100vw * 20 / 375) 0;
  z-index: 1;
}

.edit-title {
  font-family: 'JetBrainsMonoBold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  line-height: calc(100vw * 24.8 / 375);
  color: rgba(36, 24, 24, 1);
}

.container {
  flex: 1;
  overflow-y: auto;
  margin: calc(100vh * 20 / 812) 0 0;
  box-sizing: border-box;
}

.fan-list {
  margin: 0 calc(100vw * 20 / 375) 0;
  display: flex;
  flex-direction: column;
  gap: calc(100vh * 16 / 812);
  padding-bottom: calc(100vh * 34 / 812);
}

.fan-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: calc(100vh * 79 / 812);
  border-radius: calc(100vw * 20 / 375);
  border: calc(100vw * 2 / 375) solid transparent;
  background:
    linear-gradient(#fff, #fff) padding-box,
    linear-gradient(90deg, rgba(165, 237, 57, 1) 0%, rgba(48, 234, 255, 1) 100%) border-box;
  padding: 0 calc(100vw * 16 / 375);
  box-sizing: border-box;
}

.fan-left {
  width: calc(100% - calc(100vw * 70 / 375));
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  gap: calc(100vh * 8 / 812);
}

.user-info {
  display: flex;
  align-items: center;
  gap: calc(100vw * 12 / 375);
}

.avator-box-border {
  flex-shrink: 0; /* 禁止收缩 */
  width: calc(100vw * 32 / 375);
  height: calc(100vw * 32 / 375);
  border-radius: 50%;
  background: #000;
  padding: calc(100vw * 1 / 375);
}

.avatar-box {
  flex-shrink: 0; /* 禁止收缩 */
  width: calc(100vw * 32 / 375);
  height: calc(100vw * 32 / 375);
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
}

.avatar-inner img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  font-family: 'JetBrainsMonoBold', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 700;
  line-height: calc(100vw * 19.84 / 375);
  color: rgba(51, 51, 51, 1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-intro {
  font-family: 'JetBrainsMonoRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 17.36 / 375);
  color: rgba(102, 102, 102, 1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.fan-right {
  width: calc(100vw * 70 / 375);
  height: calc(100vh * 33 / 812);
  background-image: url('@/assets/addfollow.png');
  background-size: cover; /* 等比缩放覆盖 */
  background-position: center; /* 居中显示 */
  background-repeat: no-repeat;
}

.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>