<template>
  <div class="page">
    <!-- <div class="aiusermodel"></div>
    <div class="aichatmodel"></div> -->

    <!-- 页面内容 -->
    <div class="page-content">
      <div class="top-section">
        <BackButton />
      </div>
      <div class="bottom-scroll">
        <div class="bottom-first-box">
          <div class="bottom-first">
            <div class="ai-user-container"></div>
            <!-- <div class="ai-bgc-icon"></div> -->
            <div class="ai-content">
              <div class="ai-title-inter">
                <div class="ai-title-inter-one">Tiga Ai</div>
                <div class="ai-title-inter-two">Hello, I'm your smart AI assistant. Feel free to ask me any questions you may have.</div>
              </div>
              <div class="ai-prop-box">Welcome toTiga Ai</div>
            </div>
          </div>
        </div>
        <div class="bottom-section">
          <div class="bottom-container">
            <div class="bottom-top">
              <div class="bottom-title">Tiga AI</div>
              <div class="bottom-text">Hi! I’m Tiga, your friendly AI companion, here to help you create and explore the world of vlogging! Whether you’re into travel vlogs, lifestyle, tech reviews, or anything in between, I’m here to brainstorm ideas, share tips, and keep the creativity flowing. Ready to start your next vlog adventure together? Let’s chat, inspire each other, and create something amazing every day!</div>
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
  if (currentUserStore.currentUser.coins >= 200) {
    sendShowLoadingToIOS(true)

    const currentCoins = currentUserStore.currentUser.coins - 200
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
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url('@/assets/pagebgc.png') no-repeat center center;
  background-size: cover;
}

.page-content {
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  box-sizing: border-box;
}

.top-section {
  margin-top: calc(100vh * 56 / 812);
  margin-left: calc(100vw * 20 / 375);
  z-index: 100;
}

.bottom-scroll {
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.bottom-first-box {
  display: flex;
  justify-content: center;
}

.bottom-first {
  position: relative;
  margin: calc(100vh * 42 / 812) calc(100vw * 0 / 375) calc(100vh * 0 / 812);
  background-image: url('@/assets/bottomfirstbgi.png');
  background-size: cover; /* 等比缩放覆盖 */
  background-position: center; /* 居中显示 */
  background-repeat: no-repeat;
  width: calc(100vw * 335 / 375);
  height: calc(100vh * 149 / 812);
}

.ai-user-container {
  position: absolute;
  right: calc(100vw * 0 / 375);
  bottom: calc(100vh * 0 / 812);
  width: calc(100vw * 145 / 375);
  height: calc(100vh * 202 / 812);
  background-image: url('@/assets/aiuserpic.png');
  background-size: cover; /* 等比缩放覆盖 */
  background-position: center; /* 居中显示 */
  background-repeat: no-repeat;
  z-index: 2;
}

.ai-bgc-icon {
  position: absolute;
  right: calc(100vw * 2 / 375);
  top: calc(100vh * -12 / 812);
  width: calc(100vw * 66 / 375);
  height: calc(100vh * 66 / 812);
  background-image: url('@/assets/aibgcicon.png');
  background-size: cover; /* 等比缩放覆盖 */
  background-position: center; /* 居中显示 */
  background-repeat: no-repeat;
  z-index: 2;
}

.ai-content {
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: calc(100vh * 10 / 812) calc(100vw * 156 / 375) calc(100vh * 14 / 812) calc(100vw * 18 / 375);
}

.ai-title-inter {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: calc(100vh * 5 / 812);
  /* padding: 0 calc(100vw * 22 / 375); */
  z-index: 3;
}

.ai-title-inter-one {
  /* padding-right: calc(100vw * 7 / 375); */
  font-family: 'ArchivoNarrowBold', sans-serif;
  font-size: calc(100vw * 24 / 375);
  font-weight: 700;
  line-height: calc(100vw * 32.33 / 375);
  color: rgba(255, 255, 255, 1);
}

.ai-title-inter-two {
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size: calc(100vw * 11 / 375);
  font-weight: 400;
  line-height: calc(100vw * 14.82 / 375);
  color: rgba(255, 255, 255, 1);
}

.ai-prop-box {
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 400;
  line-height: calc(100vw * 21.55 / 375);
  color: rgb(0, 0, 0);
  padding: calc(100vh * 5 / 812) calc(100vw * 14 / 375);
  border-radius: calc(100vw * 16 / 375);
  background: rgba(255, 255, 255, 1);
}

.bottom-section {
  flex: 1;
  min-height: 0;
  display: flex;
  justify-content: flex-start;
  z-index: 99;
}

.bottom-container { 
  flex: 1;
  min-height: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(100vh * 28 / 812);
  box-sizing: border-box;
}

.bottom-top {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: calc(100vh * 40 / 812) calc(100vw * 30 / 375) 0;
  border-radius: calc(100vw * 20 / 375);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: calc(100vw * 4 / 375);
  /* box-shadow: 0px 0px calc(100vw * 10 / 375)  rgba(0, 0, 0, 0.06); */
  padding: calc(100vh * 16 / 812) calc(100vw * 16 / 375);
  gap: calc(100vw * 16 / 375);
}

.bottom-title {
  font-family: 'DDINBold', sans-serif;
  font-size: calc(100vw * 24 / 375);
  font-weight: 700;
  line-height: calc(100vw * 24 / 375);
  letter-spacing: 0;
  color: rgb(255, 255, 255);
  text-align: center;
}

.bottom-text {
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size: calc(100vw * 18 / 375);
  font-weight: 400;
  line-height: calc(100vw * 30 / 375);
  letter-spacing: 0;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  overflow-y: auto;
}

.purchase-container {
  margin-bottom: calc(100vh * 34 / 812);
  width: calc(100vw * 264 / 375);
  height: calc(100vh * 60 / 812);
  background-image: url('@/assets/zhubtnbgi.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: calc(100vw * 18 / 375);
  box-sizing: border-box;
}

.purchase-info {
  display: flex;
  align-items: center;
  gap: calc(100vw * 3 / 375);
}

.purchase-icon {
  width: calc(100vw * 44 / 375);
  height: calc(100vh * 31 / 812);
  background-image: url('@/assets/coin.png'); /* replace with your local image */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.purchase-count {
  font-family: 'ArchivoNarrowBold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  line-height: calc(100vw * 26.94 / 375);
  letter-spacing: 0;
  color: rgb(255, 255, 255);
}

.chat-box {
  /* width: calc(100vw * 73 / 375);
  height: calc(100vh * 38 / 812);
  border-radius: calc(100vw * 40 / 375);
  background: rgba(74, 32, 25, 1);
  display: flex;
  justify-content: center;
  align-items: center; */
  font-family: 'ArchivoNarrowBold', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 700;
  line-height: calc(100vw * 21.55 / 375);
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
</style>