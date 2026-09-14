<template>
  <div class="page">
    <!-- <div class="page-top-background"></div> -->
    <div class="header">
      <BackButton theme="black" />
      <h1 class="title">Setting</h1>
    </div>
    <main class="options-list">
      <div class="option" v-for="(option, index) in options" :key="index" @click="handleOption(index)">
        <span class="option-text">{{ option.text }}</span>
        <div class="option-right">
          <div class="navigation-indicator"></div>
        </div>
      </div>
    </main>
    <div class="footer">
      <button class="btn delete-btn" @click="handleAction(true)">Delete account</button>
      <button class="btn logout-btn" @click="handleAction(false)">Log out</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useOtherStore } from '@/stores/other'
import { useCurrentUserStore } from '@/stores/currentUser'
import BackButton from '@/components/back.vue'
import { sendLogoutToIOS, sendShowLoadingToIOS, showToLogin } from '@/utils/iosBridge'

const options = ref([
  { text: 'Privacy Policy' },
  { text: 'User Agreement' },
  { text: 'Blacklist' },
  { text: 'Edit personal information' }
])

const router = useRouter()
const userStore =  useUserStore()
const otherStore =  useOtherStore()
const currentUserStore = useCurrentUserStore()

function handleOption(index) {
  switch (index) {
    case 0:
      router.push({ name: 'privacyPolicy' })
      break
    case 1:
      router.push({ name: 'userAgreement' })
      break
    case 2:
      if (otherStore.getIsShowToLogin()) {
        showToLogin()
        return
      }
      router.push({ name: 'block' })
      break
    case 3:
      if (otherStore.getIsShowToLogin()) {
        showToLogin()
        return
      }
      router.push({ name: 'edit' })
      break
    default:
      break
  }
}

function handleAction(isDelete) {
  sendShowLoadingToIOS(true)

  if (isDelete) {
    userStore.updateUser(currentUserStore.currentUser.userId, { isdelete: 1 })
  }

  const delay = Math.floor(Math.random() * 1500) + 500

  setTimeout(() => {
    sendShowLoadingToIOS(false)
    sendLogoutToIOS(isDelete)

  }, delay)
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

h1 {
  margin: 0;
}

/* Header */
.header {
  min-height: 0;
  display: flex;
  align-items: center;
  gap: calc(100vw * 12 / 375);
  padding: calc(100vh * 58 / 812) calc(100vw * 20 / 375) 0;
  z-index: 1;
}

.title {
  font-family: 'SFProDisplaySemibold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 600;
  line-height: calc(100vw * 23.87 / 375);
  color: rgb(0, 0, 0);
}

/* Options List */
.options-list {
  min-height: 0;
  flex: 1;
  padding: calc(100vh * 32 / 812) calc(100vw * 20 / 375) 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: calc(100vh * 16 / 812);
  z-index: 1;
}

.option {
  height: calc(100vh * 46 / 812);
  background: rgba(242, 242, 242, 1);
  border-radius: calc(100vw * 12 / 375);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 calc(100vw * 16 / 375);
}

.option-text {
  font-family: 'SFProDisplaySemibold', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 600;
  line-height: calc(100vw * 19.09 / 375);
  color: #000;
}

.option-right .navigation-indicator {
  width: calc(100vw * 24 / 375);
  height: calc(100vw * 24 / 375);
  background-image: url('@/assets/seetinggoicon.png');
  background-size: cover; /* 等比缩放覆盖 */
  background-position: center; /* 居中显示 */
  background-repeat: no-repeat;
  overflow: hidden;
}

/* Footer */
.footer {
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(100vh * 16 / 812);
  padding-bottom: calc(100vh * 73 / 812);
}

.btn {
  width: calc(100vw * 190 / 375);
  height: calc(100vh * 54 / 812);
  border-radius: calc(100vw * 100 / 375);
  font-family: 'SFProDisplaySemibold', sans-serif;
  font-size: calc(100vw * 18 / 375);
  font-weight: 600;
  line-height: calc(100vw * 21.48 / 375);
  color: #fff;
  background: rgba(255, 117, 117, 1);
  border: none;
}

/* .delete-btn {
  background: linear-gradient(135deg, rgba(255, 159, 142, 1) 0%, rgba(241, 213, 160, 1) 32.13%, rgba(201, 255, 221, 1) 67.84%, rgba(157, 255, 255, 1) 100%);
  color: rgba(74, 32, 25, 1);
} */

.logout-btn {
  background: linear-gradient(135deg, rgba(255, 137, 177, 1) 0%, rgba(245, 91, 250, 1) 49.99%, rgba(46, 171, 255, 1) 100%);
}
</style>
