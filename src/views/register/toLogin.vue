<template>
  <div class="tologin-page" @click="toLoginCancle()">
    <div class="main-bg-box" @click.stop>
        <div class="main-bg-box-content">To ensure the normal operation of the function, please log in to your account first.</div>
        <div class="main-bg-box-btn">
            <div class="main-bg-cancle-btn" @click="toLoginCancle()">Cancle</div>
            <div class="main-bg-login-btn" @click="toLogin()">Log in</div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { useUIStore } from '@/stores/ui'
import { sendToLoginToIOS } from '@/utils/iosBridge'

const uiStore = useUIStore()

function toLoginCancle() {
    uiStore.closeToLogin()
}

function toLogin() {
    uiStore.closeToLogin()
    sendToLoginToIOS()
}
</script>

<style scoped>
.tologin-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.main-bg-box {
  width: calc(100vw * 282 / 375);
  height: calc(100vh * 285 / 812);
  background-image: url('@/assets/tologinbgi.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: calc(100vh * 26 / 812);
}

.main-bg-box-content {
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size: calc(100vw * 18 / 375);
  font-weight: 400;
  line-height: calc(100vw * 20 / 375);
  color: rgba(51, 51, 51, 1);
  text-align: center;
  padding: 0 calc(100vw * 33 / 375);
}

.main-bg-box-btn {
  display: flex;
  justify-content: center;
  padding-bottom: calc(100vh * 30 / 812);
  gap: calc(100vw * 12 / 375);
}

.main-bg-cancle-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100vw * 110 / 375);
  height: calc(100vh * 42 / 812);
  background: rgba(142, 108, 219, 1);
  border-radius: calc(100vw * 20 / 375);
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 400;
  line-height: calc(100vw * 21.55 / 375);
  color: rgba(255, 255, 255, 100);
}

.main-bg-login-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100vw * 110 / 375);
  height: calc(100vh * 42 / 812);
  background: rgba(244, 142, 90, 1);
  border-radius: calc(100vw * 20 / 375);
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 400;
  line-height: calc(100vw * 21.55 / 375);
  color: rgba(255, 255, 255, 100);
}
</style>