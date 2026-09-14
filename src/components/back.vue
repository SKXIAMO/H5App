<template>
  <div class="outer-box" @click="handleBack">
    <div class="inner-box" :style="{ backgroundImage: `url(${currentBackImage})` }"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import backImage from '../assets/back.png'
import backBlackImage from '../assets/back-black.png'
import { goBackOrClose } from '@/utils/iosBridge'

defineOptions({ name: 'BackNavigationControl' })

const props = defineProps({
  theme: {
    type: String,
    default: 'white', // white | black
  },
})

const currentBackImage = computed(() => {
  return props.theme === 'black' ? backBlackImage : backImage
})

function handleBack() {
  goBackOrClose()
}
</script>

<style scoped>
.outer-box {
  width: calc(100vw * 24 / 375);
  height: calc(100vw * 24 / 375); /* 使用宽度比例即可，不用 vh，保证圆形或正方形 */
  /* border-radius: calc(100vw * 14 / 375); */
  /* background: rgba(255, 255, 255, 1); */

  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
}

.inner-box {
  width: calc(100vw * 24 / 375);
  height: calc(100vw * 24 / 375);
  background-size: cover;  /* 图片铺满容器 */
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
}
</style>
