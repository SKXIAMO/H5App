<template>
  <div class="page">
    <div class="page-top-background"></div>
    <div class="top-header">
      <BackButton />
      <span class="edit-title">My diamonds</span>
    </div>

    <!-- 金币盒子UI -->
    <div class="coin-container">
      <div class="coin-box">
        <!-- <div class="coin-bg-top"></div> -->
        <div class="coin-bg-right"></div>
        <!-- <div class="coin-bg-button"></div> -->
        <div class="coin-box-content">
          <div>Wallet Balance:</div>
          <div class="coin-desc-box">
            <div class="coin-icon111"></div>
            <span class="coin-number">{{ currentUserStore.currentUser.coins }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="coinbgc"></div> -->
    <!-- 金币列表 -->
    <div class="coins">
      <div class="coin-list">
        <div
          v-for="(item,index) in otherStore.other.coinsSetting"
          :key="index"
          class="coin-item"
          :class="{ 'coin-item-selected': selectedIndex === index }"
          @click="() => { selectedIndex = index; handleCoinClick(item) }"
        >
          <div class="coin-left">
              <img src="@/assets/coin.png" class="coin-item-icon" />
              <span class="coin-count" :class="{ 'coin-count-selected': selectedIndex === index }">{{ item.cions }}</span>
            </div>

            <div class="coin-right">
              <span class="coin-price" :class="{ 'coin-price-selected': selectedIndex === index }">{{ item.money }}$</span>
              <div :class="{ 'coin-radio-selected': selectedIndex === index, 'coin-radio': selectedIndex!== index }">
                <div class="coin-radio-inner" v-if="selectedIndex === index"></div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BackButton from '@/components/back.vue'
import { useOtherStore } from '@/stores/other'
import { useCurrentUserStore } from '@/stores/currentUser'
import { useUserStore } from '@/stores/user'
import { sendPaymentToIOS } from '@/utils/iosBridge'

const otherStore =  useOtherStore()
const currentUserStore = useCurrentUserStore()
const userStore =  useUserStore()

const selectedIndex = ref(-1)

function handleCoinClick(item) {
  // item.key 或 item.id 作为支付标识
  const payKey = item.key

  // 调用 iOS 支付
  sendPaymentToIOS(payKey)
}
</script>

<style scoped>
.page {
  position: relative;
  width: 100%;
  height: 100vh;
  background: rgba(238, 239, 248, 1);
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

.top-header {
  display: flex;
  align-items: center;
  gap: calc(100vw * 16 / 375);
  padding: calc(100vh * 58 / 812) calc(100vw * 20 / 375) 0;
  z-index: 1;
}

.edit-title {
  font-family: 'JetBrainsMonoBold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  line-height: calc(100vw * 24.8 / 375);
  color: rgba(36, 24, 24, 1);
}

.coin-container {
  display: flex;
  justify-content: center;
  margin: calc(100vh * 16 / 812) calc(100vw * 20 / 375) 0;
}

/* 金币盒子外层 */
.coin-box {
  flex: 1;
  position: relative;
  height: calc(100vh * 98 / 812);
  border-radius: calc(100vw * 16 / 375);
  background: linear-gradient(90deg, rgba(165, 237, 57, 1) 0%, rgba(48, 234, 255, 1) 100%);
}

/* .coin-bg-top {
  position: absolute;
  top: calc(100vh * -21 / 812);
  right: calc(100vw * 85 / 375);
  width: calc(100vw * 67 / 375);
  height: calc(100vh * 39 / 812);
  background-image: url('@/assets/coinbgtop.png');
  background-size: cover; 
  overflow: hidden;
  z-index: 1;
} */

.coin-bg-right {
  position: absolute;
  top: calc(100vh * -1 / 812);
  right: calc(100vw * 7 / 375);
  width: calc(100vw * 127 / 375);
  height: calc(100vh * 99 / 812);
  background-image: url('@/assets/coinbgc.png');
  background-size: cover; /* 等比缩放覆盖 */
  overflow: hidden;
  z-index: 2;
}

.coin-bg-button {
  position: absolute;
  bottom: calc(100vh * -21 / 812);
  left: calc(100vw * 19 / 375);
  width: calc(100vw * 82 / 375);
  height: calc(100vh * 79 / 812);
  background-image: url('@/assets/coinbgbutton.png');
  background-size: cover; /* 等比缩放覆盖 */
  overflow: hidden;
  z-index: 3;
}

/* 下部分盒子内容 */
.coin-box-content {
  margin-top: calc(100vh * 17 / 812);
  margin-left: calc(100vw * 17 / 375);
  display: flex;       /* 内部内容水平排列 */
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: calc(100vh * 4 / 812);
  font-family: 'JetBrainsMonoBold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  line-height: calc(100vw * 24.8 / 375);
  color: #000000;
  z-index: 4;
}

.coin-desc-box {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: calc(100vw * 6 / 375);
}

.coin-icon111 {
  width: calc(100vw * 38 / 375);
  height: calc(100vh * 38 / 812);
  background-image: url('@/assets/coin.png');
  background-size: cover; /* 等比缩放覆盖 */
}

/* coin 图标 */
.coin-icon {
  width: 100%;
  height: 100%;
  object-fit: cover;   /* 关键！等同 background-size: cover */
  display: block;      /* 去掉底部间隙 */
}

/* 金币数量文字 */
.coin-number {
  font-family: 'JetBrainsMonoRegular', sans-serif;
  font-size: calc(100vw * 22 / 375);
  font-weight: 400;
  line-height: calc(100vw * 27.28 / 375);
  color: rgba(36, 24, 24, 1);
}
 
.coins {
  flex: 1;
  margin-top: calc(100vh * 20 / 812);
  padding: 0 calc(100vw * 20 / 375) calc(100vh * 34 / 812);
  overflow-y: auto;
}

.coin-list {
  display: flex;
  flex-direction: column;
  gap: calc(100vh * 12 / 812);
}

.coin-item {
  /* width: calc(100vw * 113 / 375); */
  height: calc(100vh * 64 / 812);
  border-radius: calc(100vw * 16 / 375);
  border: calc(100vw * 2 / 375) solid transparent;
  background:
    linear-gradient(#fff, #fff) padding-box,
    linear-gradient(90deg, rgba(165, 237, 57, 1) 0%, rgba(48, 234, 255, 1) 100%) border-box;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 calc(100vw * 10 / 375);
}

.coin-item-selected {
  background: linear-gradient(90deg, rgba(165, 237, 57, 1) 0%, rgba(48, 234, 255, 1) 100%);
  border: none;
}

.coin-left {
  display: flex;
  align-items: center;
  gap: calc(100vw * 8 / 375);
}

.coin-item-icon {
  width: calc(100vw * 38 / 375);
  height: calc(100vh * 38 / 812);
}

.coin-count {
  font-family: 'JetBrainsMonoBold', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 700;
  line-height: calc(100vw * 19.84 / 375);
  color: rgb(0, 0, 0);
}

/* .coin-count-selected {
  color: #fff;
} */

.coin-right {
  display: flex;
  align-items: center;
  gap: calc(100vw * 10 / 375);
}

.coin-price {
  font-family: 'JetBrainsMonoRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 17.36 / 375);
  color: rgb(0, 0, 0);
}
/* 
.coin-price-selected {
  color: #FFF;
} */

.coin-radio {
  width: calc(100vw * 15 / 375);
  height: calc(100vw * 15 / 375);
  border-radius: 50%;
  background: rgb(0, 0, 0);
  border: calc(100vw * 1 / 375) solid rgb(0, 0, 0);
}

.coin-radio-selected {
  width: calc(100vw * 15 / 375);
  height: calc(100vw * 15 / 375);
  border-radius: 50%;
  background: rgb(255, 255, 255);
  border: calc(100vw * 1 / 375) solid rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
}

.coin-radio-inner {
  width: calc(100vw * 10 / 375);
  height: calc(100vw * 10 / 375);
  border-radius: 50%;
  background: rgba(252, 71, 178, 1);
}
</style>