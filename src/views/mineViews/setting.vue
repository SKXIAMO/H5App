<template>
  <div class="page">
    <div class="header">
      <BackButton />
      <h1 class="title">Setting</h1>
    </div>
    <main class="options-list">
      <div class="option" v-for="(option, index) in options" :key="index" @click="handleOption(index)">
        <span class="option-text">{{ option.text }}</span>
        <div class="option-right">
          <div class="arrow-placeholder"></div>
        </div>
      </div>
    </main>
    <div class="footer">
      <div class="footer-btn delete-btn" @click="handleAction(true)">Delete account</div>
      <div class="footer-btn logout-btn" @click="handleAction(false)">Log out</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useCurrentUserStore } from '@/stores/currentUser'
import BackButton from '@/components/back.vue'
import { sendLogoutToIOS, sendShowLoadingToIOS, sendShowToLoginToIOS } from '@/utils/iosBridge'

const options = ref([
  { text: 'Privacy Policy' },
  { text: 'User Agreement' },
  { text: 'Blacklist' },
  { text: 'Wallet' },
  { text: 'Edit personal information' }
])

const router = useRouter()
const userStore =  useUserStore()
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
      router.push({ name: 'block' })
      break
    case 3:
      if (currentUserStore.currentUser.isguest == 1) {
        sendShowToLoginToIOS()
        return
      }
      router.push({ name: 'coins' })
      break
    case 4:
      if (currentUserStore.currentUser.isguest == 1) {
        sendShowToLoginToIOS()
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
  background: url('@/assets/pagebgc.png') no-repeat center center;
  background-size: cover;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

h1 {
  margin: 0;
}

/* Header */
.header {
  min-height: 0;
  display: flex;
  align-items: center;
  gap: calc(100vw * 16 / 375);
  padding: calc(100vh * 58 / 812) calc(100vw * 20 / 375) 0;
}

.title {
  font-family: 'ArchivoNarrowBold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  line-height: calc(100vw * 26.94 / 375);
  color: rgb(255, 255, 255);
  /* background: linear-gradient(
    141.29deg,
    rgba(255, 110, 50, 1) 0%,
    rgba(253, 61, 104, 1) 44.94%,
    rgba(251, 226, 100, 1) 100%
  );
  -webkit-background-clip: text; 
  -webkit-text-fill-color: transparent; 
  background-clip: text; */
}

/* Options List */
.options-list {
  min-height: 0;
  flex: 1;
  padding: calc(100vh * 20 / 812) calc(100vw * 20 / 375) 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: calc(100vh * 16 / 812);
}

.option {
  height: calc(100vh * 52 / 812);
  background: rgba(142, 108, 219, 1);
  border-radius: calc(100vw * 20 / 375);
  box-shadow: 0 calc(100vw * 2 / 375) calc(100vw * 4 / 375) rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 calc(100vw * 10 / 375);
}

.option-text {
  font-family: 'ArchivoNarrowRegular', sans-serif;
  color: rgb(255, 255, 255);
  font-size: calc(100vw * 16 / 375);
  font-weight: 400;
  line-height: calc(100vw * 21.55 / 375);
}

.option-right .arrow-placeholder {
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
  gap: calc(100vh * 20 / 812);
  padding-bottom: calc(100vh * 96 / 812);
}

.footer-btn {
  width: calc(100vw * 264 / 375);
  height: calc(100vh * 60 / 812);
  background-image: url('@/assets/zhubtnbgi.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  font-family: 'ArchivoNarrowBold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  line-height: calc(100vw * 26.94 / 375);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* .delete-btn {
  background: linear-gradient(135deg, rgba(255, 159, 142, 1) 0%, rgba(241, 213, 160, 1) 32.13%, rgba(201, 255, 221, 1) 67.84%, rgba(157, 255, 255, 1) 100%);
  color: rgba(74, 32, 25, 1);
} */

.logout-btn {
  background-image: url('@/assets/logoutbtnbgi.png');
}
</style>