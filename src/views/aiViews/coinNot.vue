<template>
  <div class="coinnot-box">
    <div class="coinnot-bgc"></div>
    <div class="recharge-button" @click="handleRecharge">Recharge</div>
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
.coinnot-box {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: calc(100vh * 20 / 812);
} 

.coinnot-bgc {
  width: calc(100vw * 280 / 375);
  height: calc(100vh * 190 / 812);
  background-image: url('@/assets/coinnot.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.recharge-button {
  /* position: absolute;
  bottom: calc(100vh * 34 / 812);
  left: 50%;
  transform: translateX(-50%); */
  width: calc(100vw * 190 / 375);
  height: calc(100vh * 54 / 812);
  border-radius: calc(100vw * 40 / 375);
  background: linear-gradient(180deg, rgba(255, 0, 128, 1) 0%, rgba(236, 86, 184, 1) 100%);

  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'SourceHanSansBold', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 700;
  line-height: calc(100vw * 23.17 / 375);
  letter-spacing: 0;
  color: rgba(255, 255, 255, 1);
}
</style>