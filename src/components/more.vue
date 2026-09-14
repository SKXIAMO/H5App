<template>
  <div class="outer-box">
    <div class="inner-box" :style="{ backgroundImage: `url(${currentMoreImage})` }"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import moreImage from '../assets/more.png'
import moreBlackImage from '../assets/more-black.png'

defineOptions({ name: 'MoreActionControl' })

const props = defineProps({
  theme: {
    type: String,
    default: 'white', // white | black
  },
})

const currentMoreImage = computed(() => {
  return props.theme === 'black' ? moreBlackImage : moreImage
})

</script>

<style scoped>
.outer-box {
  width: calc(100vw * 24 / 375);
  height: calc(100vw * 24 / 375); /* 使用宽度比例即可，不用 vh，保证圆形或正方形 */
  /* border-radius: calc(100vw * 14 / 375);
  background: rgba(255, 255, 255, 1); */

  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
}

.inner-box {
  width: 100%;
  height: 100%;
  background-size: cover;  /* 图片铺满容器 */
  background-position: center;
  background-repeat: no-repeat;
}
</style>
