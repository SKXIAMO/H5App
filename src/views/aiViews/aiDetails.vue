<template>
  <div class="page">
    <!-- <div class="aiusermodel"></div>
    <div class="aichatmodel"></div> -->

    <!-- 页面内容 -->
    <div class="page-content">
      <div class="top-section">
        <BackButton />
      </div>
      <div class="bottom-section">
        <div class="bottom-container">
          <div class="bottom-top">
            <div class="bottom-title">Glimd AI</div>
            <div class="bottom-text">Hey there! I'm Glimd AI, your ultimate dance sidekick here. Craving the latest viral dance routines? Need hacks to boost your practice game? Or just want to dive into awesome dance vibes? Hit me up, and I'll guide you every step of the way!</div>
          </div>
        <!-- 购买 -->
        <div class="purchase-container" @click="handlePurchaseClick">
          <div class="purchase-info">
            <div class="purchase-icon"></div>
            <div class="purchase-count">x 200</div>
          </div>
          <div class="chat-box">Chat</div>
        </div>
        </div>
      </div>
    </div>
    <div
      class="dialog"
      v-if="showCoinNot"
      @click.self="showCoinNot = false"
    >
      <CoinNotDialog @recharge="handleRechargeEvent" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCurrentUserStore } from '@/stores/currentUser'
import { useUserStore } from '@/stores/user'
import BackButton from '@/components/back.vue'
import CoinNotDialog from '@/views/aiViews/coinNot.vue'
import { sendShowLoadingToIOS } from '@/utils/iosBridge'

const showCoinNot = ref(false)

const currentUserStore = useCurrentUserStore()
const userStore =  useUserStore()
function handlePurchaseClick() {
  if (currentUserStore.currentUser.coins >= 100) {
    sendShowLoadingToIOS(true)

    const currentCoins = currentUserStore.currentUser.coins - 100
    userStore.updateUser(currentUserStore.currentUser.userId, { coins: currentCoins })

    const delay = Math.floor(Math.random() * 1500) + 500

    setTimeout(() => {
      sendShowLoadingToIOS(false)
      router.push({ name: 'aiChat' })
    }, delay)
  } else {
    showCoinNot.value = true
  }
}

const router = useRouter()
function handleRechargeEvent(value) {
  showCoinNot.value = false
  if (value === true) {
    router.push({ name: 'coins' })
  }
}
</script>

<style scoped>
.page {
  width: 100vw;
  height: 100vh;
  overflow: hidden; /* prevent scrolling */
  background: linear-gradient(0deg, rgba(24, 24, 24, 1) 0%, rgba(53, 35, 50, 1) 100%);
  background-image: url('@/assets/aibgc.png'); /* replace with your asset filename */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.page-content {
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* top内容在上，bottom内容在下 */
  box-sizing: border-box;
}

.top-section {
  margin-top: calc(100vh * 58 / 812);
  margin-left: calc(100vw * 20 / 375);
  z-index: 100;
}

.bottom-section {
  display: flex;
  justify-content: flex-start;
  z-index: 99;
}

.bottom-container { 
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(100vh * 115 / 812);
  box-sizing: border-box;
}

.bottom-top {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 calc(100vw * 68 / 375);
  gap: calc(100vh * 10 / 812);
}

.bottom-title {
  font-family: 'SourceHanSansBold', sans-serif;
  font-size: calc(100vw * 25 / 375);
  font-weight: 700;
  line-height: calc(100vw * 36.2 / 375);
  letter-spacing: 0;
  color: rgb(255, 255, 255);
  text-align: center;
}

.bottom-text {
  font-family: 'SourceHanSansRegular', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 400;
  line-height: calc(100vw * 23.17 / 375);
  letter-spacing: 0;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
}

.purchase-container {
  margin-bottom: calc(100vh * 62 / 812);
  width: calc(100vw * 233 / 375);
  height: calc(100vh * 56 / 812);
  border-radius: calc(100vw * 40 / 375);
  background: linear-gradient(180deg, rgba(255, 0, 128, 1) 0%, rgba(236, 86, 184, 1) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: calc(100vw * 24 / 375);
  box-sizing: border-box;
}

.purchase-info {
  display: flex;
  align-items: center;
  gap: calc(100vw * 8 / 375);
}

.purchase-icon {
  width: calc(100vw * 40 / 375);
  height: calc(100vh * 40 / 812);
  background-image: url('@/assets/coin.png'); /* replace with your local image */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.purchase-count {
  font-family: 'SourceHanSansBold', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 700;
  line-height: calc(100vw * 23.17 / 375);
  letter-spacing: 0;
  color: rgba(255, 235, 59, 1);
}

.chat-box {
  /* width: calc(100vw * 73 / 375);
  height: calc(100vh * 38 / 812);
  border-radius: calc(100vw * 40 / 375);
  background: rgba(74, 32, 25, 1);
  display: flex;
  justify-content: center;
  align-items: center; */
  font-family: 'SourceHanSansBold', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 700;
  line-height: calc(100vw * 23.17 / 375);
  letter-spacing: 0;
  color: rgba(255, 255, 255, 1);
  box-sizing: border-box;
}

.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
</style>