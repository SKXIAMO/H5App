<template>
  <div class="page">
    <!-- <div class="aiusermodel"></div>
    <div class="aichatmodel"></div> -->

    <div class="page-top-background"></div>
    <!-- 页面内容 -->
    <div class="page-content">
      <div class="ai-user-container"></div>
      <div class="top-section">
        <BackButton theme="black" />
      </div>
      <div class="bottom-scroll">
        <div class="bottom-first">
          <!-- <div class="ai-bgc-icon"></div> -->
          <!-- <div class="ai-title-inter">
            <div class="ai-title-inter-one">
              AI Yoga<br>
              Improvement<br>
              Guide
            </div>
            <div class="ai-title-inter-two">
              Give it a try!
            </div>
          </div> -->
        </div>
        <div class="bottom-section">
          <div class="bottom-container">
            <div class="bottom-top">
              <div class="bottom-title">Barre AI</div>
              <div class="bottom-text">Hi! I’m barre, your friendly AI companion here to chat about all your passions and interests. Whether you love fashion, art, music, or anything in between, I’m here to explore ideas, share tips, and keep the conversation fun and inspiring. Ready to dive into your favorite hobbies together? Let’s talk and discover something new every day!</div>
            </div>
          <!-- 购买 -->
          <div class="purchase-container" @click="handlePurchaseClick">
            <div class="purchase-info">
              <div class="purchase-icon"></div>
              <div class="purchase-count">x 200</div>
            </div>
            <div class="chat-box">Chat</div>
            <div class="ai-chat-arr"></div>
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

.page-content {
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  box-sizing: border-box;
}

.top-section {
  margin-top: calc(100vh * 58 / 812);
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

.bottom-first {
  flex: 1;
}

.ai-user-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  aspect-ratio: 1125 / 1554;
  background-image: url('@/assets/ai-detils-top-bgi.png');
  background-size: 100% 100%;
  background-position: top center;
  background-repeat: no-repeat;
  z-index: 0;
  pointer-events: none;
}

/* .ai-bgc-icon {
  position: absolute;
  right: calc(100vw * 2 / 375);
  top: calc(100vh * -12 / 812);
  width: calc(100vw * 66 / 375);
  height: calc(100vh * 66 / 812);
  background-image: url('@/assets/aibgcicon.png');
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat;
  z-index: 2;
} */

.ai-title-inter {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: calc(100vh * 16 / 812);
  z-index: 3;
}

.ai-title-inter-one {
  font-family: 'CinzelBlack', sans-serif;
  font-size: calc(100vw * 24 / 375);
  font-weight: 900;
  line-height: calc(100vw * 32.23 / 375);
  color: rgb(0, 0, 0);
  text-shadow: 0px calc(100vw * 2 / 375) 0px  rgba(0, 0, 0, 0.25);
}

.ai-title-inter-two {
  font-family: 'JetBrainsMonoBold', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 700;
  line-height: calc(100vw * 19.84 / 375);
  color: rgba(252, 71, 178, 1);
  padding: calc(100vh * 6 / 812) calc(100vw * 10 / 375);
  border-radius: calc(100vw * 10 / 375);
  background-color: #000;
}

.bottom-section {
  /* flex: 1; */
  min-height: 0;
  display: flex;
  justify-content: flex-start;
  z-index: 99;
}

.bottom-container { 
  /* flex: 1; */
  min-height: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(100vh * 113 / 812);
  box-sizing: border-box;
}

.bottom-top {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 calc(100vw * 68 / 375);
  gap: calc(100vh * 21 / 812);
}


.bottom-title {
  font-family: 'SFProDisplayBold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  line-height: calc(100vw * 34.75 / 375);
  letter-spacing: 0;
  color: rgba(0, 0, 0, 1);
  text-align: center;
}

.bottom-text {
  font-family: 'SFProDisplayRegular', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 400;
  line-height: calc(100vw * 19.09 / 375);
  letter-spacing: 0;
  color: rgba(0, 0, 0, 0.6);
  text-align: center;
  overflow-y: auto;
}

.purchase-container {
  margin-bottom: calc(100vh * 62 / 812);
  width: calc(100vw * 233 / 375);
  height: calc(100vh * 56 / 812);
  border-radius: calc(100vw * 400 / 375);
  background: linear-gradient(135deg, rgba(255, 137, 177, 1) 0%, rgba(245, 91, 250, 1) 49.99%, rgba(46, 171, 255, 1) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: calc(100vw * 10 / 375);
  box-sizing: border-box;
}

.purchase-info {
  display: flex;
  align-items: center;
  gap: calc(100vw * 10 / 375);
}

.purchase-icon {
  width: calc(100vw * 38 / 375);
  height: calc(100vh * 38 / 812);
  background-image: url('@/assets/coin.png'); /* replace with your local image */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.purchase-count {
  font-family: 'SFProDisplaySemibold', sans-serif;
  font-size: calc(100vw * 18 / 375);
  font-weight: 600;
  line-height: calc(100vw * 21.48 / 375);
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
  font-family: 'SFProDisplaySemibold', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 600;
  line-height: calc(100vw * 19.09 / 375);
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

.ai-chat-arr {
  width: calc(100vw * 24 / 375);
  height: calc(100vh * 24 / 812);
  background-image: url('@/assets/ai-chat-arr.png'); /* replace with your local image */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
