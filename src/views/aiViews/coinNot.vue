<template>
  <div class="coninnot-container">
    <!-- <div class="coninnot-bgi"></div> -->
    <div class="coinnot-box">
      <div class="coinnot-bgc">
        <div class="coinnot-content">
          <div class="recharge-title">
            <div class="recharge-title-text">Sorry</div>
            <div class="recharge-title-content">your current balance is insufficient</div>
          </div>
          <div class="recharge-button" @click="handleRecharge"></div>
        </div>
      </div>
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
} 

.coinnot-bgc {
  width: calc(100vw * 280 / 375);
  height: calc(100vh * 315 / 812);
  background-image: url('@/assets/coinnotbgi.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: end;
}

.coinnot-content {
  padding-bottom: calc(100vh * 32 / 812);
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  gap: calc(100vh * 20 / 812);
}

.recharge-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  gap: calc(100vh * 10 / 812);
}

.recharge-title-text {
  display: flex;
  justify-content: center;
  font-family: 'ArchivoNarrowBold', sans-serif;
  font-size: calc(100vw * 24 / 375);
  font-weight: 700;
  line-height: calc(100vw * 32.33 / 375);
  color: rgba(14, 28, 66, 1);
}

.recharge-title-content {
  display: flex;
  justify-content: center;
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size: calc(100vw * 18 / 375);
  font-weight: 400;
  line-height: calc(100vw * 24.25 / 375);
  color: rgba(0, 0, 0, 0.6);
  padding: 0 calc(100vw * 67 / 375) 0 calc(100vw * 58 / 375);
  text-align: center;
}

.recharge-button {
  width: calc(100vw * 187 / 375);
  height: calc(100vh * 58 / 812);
  background-image: url('@/assets/rechargebgi.png');
  background-size: cover; /* 等比缩放覆盖 */
  background-position: center; /* 居中显示 */
  background-repeat: no-repeat;
}
</style>