<template>
  <div class="video-call">
    <div class="bg-gradient" :style="{ backgroundImage: `url(${userInfo.avator})` }">
      <div class="bg-colors-111"></div>
    </div>
    <!-- Top Avatar Container -->
    <div class="avatar-outer">
      <div class="avator-border-box">
        <img :src="userInfo.avator" alt="User Avatar" />
      </div>
    </div>

    <!-- Bottom Control Panel -->
    <div class="hangup">
      <div class="call-left">
        <div class="user-name">{{ userInfo.name }}</div>
        <div class="calling-text">{{ callingText }}</div>
      </div>
      <div class="hangup-btn" @click="hangup">
        <img src="@/assets/hangupicon.png" alt="hangup" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '@/stores/user'

const props = defineProps({ userId: String })
const emits = defineEmits(['hangup'])

const userStore = useUserStore()
const userInfo = userStore.getUserById(props.userId)

const callingText = ref('Calling')
let dotCount = 0
let intervalId = null

onMounted(() => {
  intervalId = setInterval(() => {
    dotCount = (dotCount + 1) % 4
    callingText.value = 'Calling' + '.'.repeat(dotCount)
  }, 1000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})

function hangup() {
  clearInterval(intervalId)
  emits('hangup')
}
</script>

<style scoped>
.video-call > *:not(.bg-gradient) {
  position: relative;
  z-index: 1;
}

/* Top avatar */
.bg-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  /* opacity: 0.1; */
}

.bg-colors-111 {
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, rgba(142, 108, 219, 1) 0%, rgba(255, 255, 255, 0) 99.84%);
}

.video-call {
  position: relative;
  width: 100%;
  height: 100vh;
  background: rgba(16, 18, 19, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  gap: calc(100vh * 311 / 812);
}

.avatar-outer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(100vh * 20 / 812);
}

.avator-border-box {
  display: flex;
  justify-content: center;
  border-radius: 50%;
  background: rgba(142, 108, 219, 1);
}

.avator-border-box img{
  width: calc(100vw * 104 / 375);
  height: calc(100vw * 104 / 375);
  padding: calc(100vh * 1 / 812) calc(100vw * 1 / 375);
  border-radius: 50%;
  object-fit: cover;
  overflow: hidden;
}

/* .avatar-inner {
  width: calc(100vw * 144 / 375);
  height: calc(100vw * 144 / 375);
  border-radius: calc(100vw * 40 / 375);
  padding: calc(100vw * 3 / 375);
  background: linear-gradient(135deg, rgba(255, 159, 142, 1) 0%, rgba(241, 213, 160, 1) 32.13%, rgba(201, 255, 221, 1) 67.84%, rgba(157, 255, 255, 1) 100%);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.avatar-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: calc(100vw * 37 / 375);
  display: block;
} */

/* Bottom call panel */
/* .call-panel {
  position: absolute;
  bottom: calc(100vh * 40 / 812);
  width: calc(100% - (calc(100vw * 50 / 375)));
  height: calc(100vh * 80 / 812);
  border-radius: calc(100vw * 40 / 375);
  background: rgba(255, 255, 255, 1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 calc(100vw * 20 / 375);
  box-sizing: border-box;
} */

.call-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: calc(100vh * 10 / 812);
}

.user-name {
  font-family: 'ArchivoNarrowBold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  line-height: calc(100vw * 26.94 / 375);
  color: rgb(0, 0, 0);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.calling-text {
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 18.86 / 375);
  color: rgb(0, 0, 0);
}

.hangup {
  margin-bottom: calc(100vh * 40 / 812);
  width: calc(100vw * 313 / 375);
  /* height: calc(100vw * 91 / 375); */
  border-radius: calc(100vw * 40 / 375);
  /* border: 1px solid rgba(255, 255, 255, 0.6); */
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: calc(100vh * 10 / 812) calc(100vw * 10 / 375) calc(100vh * 10 / 812) calc(100vw * 20 / 375);
}

.hangup-btn {
  width: calc(100vw * 60 / 375);
  height: calc(100vw * 60 / 375);
  border-radius: 50%;
  background: rgba(255, 28, 100, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hangup-btn img {
  width: calc(100vw * 28 / 375);
  height: calc(100vw * 28 / 375);
  object-fit: cover;
  overflow: hidden;
}
</style>