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

/* .coninnot-bgi {
  position: absolute;
  top: calc(100vh * -89 / 812);
  width: 100%;
  height: calc(100vh * 401 / 812);
  background-image: url('@/assets/coinnotbgi.png');
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat;
} */

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
  width: calc(100vw * 190 / 375);
  height: calc(100vh * 54 / 812);
  border-radius: calc(100vw * 100 / 375);
  font-family: 'SFProDisplayBold', sans-serif;
  font-size: calc(100vw * 18 / 375);
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, rgba(255, 137, 177, 1) 0%, rgba(245, 91, 250, 1) 49.99%, rgba(46, 171, 255, 1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>