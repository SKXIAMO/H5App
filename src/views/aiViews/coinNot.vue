<template>
  <div class="coninnot-container">
    <!-- <div class="coninnot-bgi"></div> -->
    <div class="coinnot-box">
      <div class="coinnot-bgc"></div>
      <div class="recharge-button" @click="handleRecharge">Recharge</div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['recharge'])

function handleRecharge() {
  emit('recharge', true)
}
</script>

<style scoped>
.coninnot-container {
  width: 100%;
  position: absolute;
}

.coninnot-bgi {
  position: absolute;
  top: calc(100vh * -89 / 812);
  width: 100%;
  height: calc(100vh * 401 / 812);
  background-image: url('@/assets/coinnotbgi.png');
  background-size: cover; /* 等比缩放覆盖 */
  background-position: center; /* 居中显示 */
  background-repeat: no-repeat;
}

.coinnot-box {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: calc(100vh * 23 / 812);
} 

.coinnot-bgc {
  width: calc(100vw * 269 / 375);
  height: calc(100vh * 295 / 812);
  background-image: url('@/assets/coinnot.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.recharge-button {
  position: absolute;
  bottom: calc(100vh * 30 / 812);
  width: calc(100vw * 203 / 375);
  height: calc(100vh * 53 / 812);
  border-radius: calc(100vw * 40 / 375);
  font-family: 'JetBrainsMonoBold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  color: #fff;
  border: calc(100vw * 2 / 375) solid transparent;
  background:
    linear-gradient(#000, #000) padding-box,
    linear-gradient(90deg, rgba(165, 237, 57, 1) 0%, rgba(48, 234, 255, 1) 100%) border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>