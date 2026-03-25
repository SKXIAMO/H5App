<template>
  <div class="page">
    <div class="top-header">
      <BackButton />
      <span class="edit-title">My diamonds</span>
    </div>

    <!-- 金币盒子UI -->
    <div class="coin-box">
      <div class="coin-box-header">
        <img src="@/assets/coin.png" alt="coin" class="coin-icon" />
      </div>
      <div class="coin-box-content">
        <div>My diamonds</div>
        <span class="coin-number">{{ currentUserStore.currentUser.coins }}</span>
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
          <div class="coin-item-box" :class="{ 'coin-item-box-selected': selectedIndex === index }">
            <div class="coin-left">
              <img src="@/assets/coin.png" class="coin-item-icon" />
              <span class="coin-count" :class="{ 'coin-count-selected': selectedIndex === index }">{{ item.cions }}</span>
            </div>

            <div class="coin-right">
              <span class="coin-price" :class="{ 'coin-price-selected': selectedIndex === index }">{{ item.money }}$</span>
              <!-- <div class="coin-radio" :class="{ 'coin-radio-selected': selectedIndex === index }"></div> -->
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
  background: linear-gradient(0, rgba(24, 24, 24, 1) 0%, rgba(53, 35, 50, 1) 100%);
  overflow: hidden;
  /* display: flex;
  flex-direction: column; */
  box-sizing: border-box;
}

.top-header {
  display: flex;
  align-items: center;
  gap: calc(100vw * 12 / 375);
  padding: calc(100vh * 58 / 812) calc(100vw * 20 / 375) 0;
}

.edit-title {
  font-family: 'SourceHanSansBold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  color: #fff;
}

/* 金币盒子外层 */
.coin-box {
  width: auto;
  height: calc(100vh * 103 / 812);
  border-radius: calc(100vw * 20 / 375);
  background: linear-gradient(270deg, rgba(255, 0, 128, 1) 0%, rgba(236, 86, 184, 1) 100%);
  background-image: url('@/assets/coinbgc.png');
  background-size: cover; /* 等比缩放覆盖 */
  background-position: left; /* 居中显示 */
  background-repeat: no-repeat;
  overflow: hidden;
  margin: calc(100vh * 22 / 812) calc(100vw * 20 / 375) 0;
  display: flex;
  /* flex-direction: column; */
  justify-content: start;
  /* justify-self: center; */
  align-items: center;
  gap: calc(100vw * 32 / 375);
  padding-left: calc(100vw * 32 / 375);
}


/* 上部分标题 */
.coin-box-header {
  width: calc(100vw * 78 / 375);
  height: calc(100vw * 78 / 375);
  overflow: hidden; /* 防止溢出 */
}

/* 下部分盒子内容 */
.coin-box-content {
  display: flex;       /* 内部内容水平排列 */
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: calc(100vh * 9 / 812);
  font-family: 'SourceHanSansRegular', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 400;
  line-height: calc(100vw * 23.17 / 375);
  color: #fff;
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
  font-family: 'SourceHanSansBold', sans-serif;
  font-size: calc(100vw * 24 / 375);
  font-weight: 700;
  color: #fff;
  /* line-height: calc(100vw * 34.75 / 375); */
}

.coinbgc {
  position: absolute;
  top: calc(100vh * 16 / 812);
  right: calc(100vh * 27 / 812);
  width: calc(100vw * 167 / 375);
  height: calc(100vh * 297 / 812);
  background-image: url('@/assets/coinsbgc.png');
  background-size: cover; /* 等比缩放覆盖 */
  background-position: center; /* 居中显示 */
  background-repeat: no-repeat;
  overflow: hidden;
  pointer-events: none; /* 点击穿透，不拦截点击事件 */
}
 
.coins {
  height: calc(100% - calc(100vh * 285 / 812));
  margin-top: calc(100vh * 16 / 812);
  padding: 0 calc(100vw * 16 / 375) calc(100vh * 34 / 812);
  overflow-y: auto;
}

.coin-list {
  display: flex;
  flex-wrap: wrap;
  gap: calc(100vw * 2 / 375);
}

.coin-item {
  width: calc(100vw * 113 / 375);
  height: calc(100vh * 108 / 812);
  border-radius: calc(100vw * 24 / 375);
  box-sizing: border-box;
  margin-bottom: calc(100vh * 6 / 812);
  display: flex;
  align-items: center;
  justify-content: center;
}

.coin-item-selected {
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.coin-item-box {
  width: calc(100vw * 105 / 375);
  height: calc(100vh * 100 / 812);
  border-radius: calc(100vw * 20 / 375);
  background: rgba(255, 255, 255, 0.1);
  /* margin: calc(100vh * 4 / 812) calc(100vw * 4 / 375); */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: calc(100vh * 8 / 812);
  /* padding: 0 calc(100vw * 10 / 375); */
}

.coin-item-box-selected {
  background: linear-gradient(180deg, rgba(255, 0, 128, 1) 0%, rgba(236, 86, 184, 1) 100%);
}

.coin-left {
  display: flex;
  align-items: center;
  gap: calc(100vw * 4 / 375);
}

.coin-item-icon {
  width: calc(100vw * 24 / 375);
  height: calc(100vh * 24 / 812);
}

.coin-count {
  font-family: 'PangMenZhengDaoBiaoTiTiMianFeiBan', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 400;
  line-height: calc(100vw * 16.96 / 375);
  color: rgba(255, 255, 255, 1);
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
  font-family: 'DosisRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 17.7 / 375);
  color: rgba(255, 255, 255, 0.7);
}

/* .coin-price-selected {
  color: #FFF;
} */

/* .coin-radio {
  width: calc(100vw * 15 / 375);
  height: calc(100vw * 15 / 375);
  border-radius: 50%;
  background: rgba(105, 71, 65, 1);
}

.coin-radio-selected {
  width: calc(100vw * 14 / 375);
  height: calc(100vw * 14 / 375);
  background: linear-gradient(
    135deg,
    rgba(255, 159, 142, 1) 0%,
    rgba(241, 213, 160, 1) 32.13%,
    rgba(201, 255, 221, 1) 67.84%,
    rgba(157, 255, 255, 1) 100%
  );
  border: calc(100vw * 1 / 375) solid rgba(255, 255, 255, 1);
} */
</style>