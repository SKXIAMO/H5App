<template>
  <div class="video-call">
    <div class="bg-gradient" :style="{ backgroundImage: `url(${userInfo.avator})` }"></div>
    <!-- Top Avatar Container -->
    <div class="avatar-outer">
      <img :src="userInfo.avator" alt="User Avatar" />
      <div class="call-left">
        <div class="user-name">{{ userInfo.name }}</div>
        <div class="calling-text">{{ callingText }}</div>
      </div>
    </div>

    <!-- Bottom Control Panel -->
    <div class="hangup">
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
  opacity: 0.1;
}

.video-call {
  position: relative;
  width: 100%;
  height: 100vh;
  background: linear-gradient(0deg, rgba(24, 24, 24, 1) 0%, rgba(53, 35, 50, 1) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.avatar-outer {
  margin-top: calc(100vh * 285 / 812);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(100vh * 46 / 812);
}

.avatar-outer img{
  width: calc(100vw * 80 / 375);
  height: calc(100vw * 80 / 375);
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.6);
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
  align-items: center;
  gap: calc(100vh * 12 / 812);
}

.user-name {
  font-family: 'PangMenZhengDaoBiaoTiTiMianFeiBan', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 400;
  line-height: calc(100vw * 21.2 / 375);
  color: rgba(255, 255, 255, 1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.calling-text {
  font-family: 'DosisRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 17.7 / 375);
  color: rgb(255, 255, 255);
}

.hangup {
  margin-bottom: calc(100vh * 79 / 812);
  width: calc(100vw * 72 / 375);
  height: calc(100vw * 72 / 375);
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hangup-btn {
  width: calc(100vw * 60 / 375);
  height: calc(100vw * 60 / 375);
  border-radius: 50%;
  background: linear-gradient(180deg, rgba(255, 0, 128, 1) 0%, rgba(236, 86, 184, 1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hangup-btn img {
  width: calc(100vw * 28 / 375);
  height: calc(100vw * 28 / 375);
}
</style>