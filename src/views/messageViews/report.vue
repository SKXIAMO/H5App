<template>
  <div class="page">
    <div class="back">
      <BackButton/>
    </div>
    <div class="page-content">
        <div class="grid-container">
            <div class="grid-item" 
                 v-for="(item, index) in otherStore.other.reportContent" 
                 :key="index"
                 :class="{ selected: selectedIndex === index }"
                 @click="selectedIndex = index">
                <div class="choose-box">
                    <div class="check-icon" v-if="selectedIndex === index"></div>
                </div>
                <div class="report-content">{{ item }}</div>
            </div>
        </div>
        <div class="input-title">Supplementary description</div>
        <div class="input-box">
          <textarea v-model="inputText" class="input-field" maxlength="150" placeholder="Supplementary description (optional)"></textarea>
          <div class="char-count">{{ inputText.length }}/150</div>
        </div>
        <div class="btn-box" @click="handleSubmit">Submit</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BackButton from '@/components/back.vue'
import { useOtherStore } from '@/stores/other'
import { goBackOrClose, sendShowLoadingToIOS, sendShowToastToIOS } from '@/utils/iosBridge'

const otherStore =  useOtherStore()

const selectedIndex = ref(0)
const inputText = ref('')

function handleSubmit() {
  sendShowLoadingToIOS(true)

  const delay = Math.floor(Math.random() * 1500) + 500

  setTimeout(() => {
    sendShowLoadingToIOS(false)
    sendShowToastToIOS('Report successful')

    goBackOrClose()

  }, delay)
}
</script>

<style scoped>
.page {
  width: 100%;
  height: 100vh;
  background: url('@/assets/pagebgc.png') no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.back {
  padding-top: calc(100vh * 56 / 812);
  padding-left: calc(100vw * 20 / 375);
}

.page-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 一行两条 */
  column-gap: calc(100vw * 7 / 375); /* 左右间距7 */
  row-gap: calc(100vh * 12 / 812); /* 上下间距12 */
  padding: calc(100vh * 20 / 812) calc(100vw * 20 / 375) 0; /* 可选左右内边距 */
}

.grid-item {
  position: relative;
  border-radius: calc(100vw * 20 / 375);
  /* box-shadow: 0px calc(100vw * 2 / 375) calc(100vw * 4 / 375) rgba(0, 0, 0, 0.06); */
  background: rgb(255, 255, 255);
  height: calc(100vw * 115 / 375);
  overflow: hidden;
}

.choose-box {
  position: absolute;
  right: 0;
  bottom: 0;
  width: calc(100vw * 32 / 375);
  height: calc(100vw * 32 / 375);
  border-radius: calc(100vw * 8 / 375) 0px calc(100vw * 20 / 375) 0px;
  background: rgba(0, 0, 0, 0.12);
}

.grid-item.selected .choose-box {
  background: rgba(244, 142, 90, 1);
}

.check-icon {
  position: absolute;
  top: calc(100vh * 6 / 812);
  left: calc(100vw * 6 / 375);
  width: calc(100vw * 20 / 375);
  height: calc(100vw * 20 / 375);
  background-image: url('@/assets/checkicon.png');
  background-size: cover; /* 等比缩放覆盖 */
  background-position: center; /* 居中显示 */
  background-repeat: no-repeat;
  overflow: hidden;
}

.report-content {
  padding: calc(100vh * 12 / 812) calc(100vw * 12 / 375) 0;
  color: rgb(0, 0, 0);
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 400;
  line-height: calc(100vw * 21.55 / 375);
}

.input-title {
  padding-top: calc(100vh * 30 / 812);
  padding-left: calc(100vw * 20 / 375);
  font-family: 'ArchivoNarrowBold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  line-height: calc(100vw * 26.94 / 375);
  color: rgb(255, 255, 255);
}

.input-box {
  position: relative;
  margin: calc(100vh * 16 / 812) calc(100vw * 20 / 375) 0;
  height: calc(100vh * 103 / 812);
  border-radius: calc(100vw * 16 / 375);
  background: rgb(255, 255, 255);
  /* box-shadow: 0px 0px calc(100vw * 4 / 375)  rgba(0, 0, 0, 0.06); */
  backdrop-filter: calc(100vw * 12 / 375);
  padding: calc(100vh * 12 / 812) calc(100vw * 12 / 375);
  box-sizing: border-box;
}

.input-field {
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  outline: none;
  background: transparent;
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  color: rgb(0, 0, 0); /* 输入文本颜色 */
  line-height: calc(100vw * 18.86 / 375);
}

.input-field :placeholder {
  color: rgba(0, 0, 0, 0.5);
}

.char-count {
  position: absolute;
  right: calc(100vw * 8 / 375);
  bottom: calc(100vh * 8 / 812);
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  color: rgba(0, 0, 0, 0.5);
  line-height: calc(100vw * 18.86 / 375);
}

.btn-box {
  margin: 0 auto; /* 新增：水平居中 */
  margin-top: calc(100vh * 37 / 812);
  margin-bottom: calc(100vh * 34 / 812);
  width: calc(100vw * 264 / 375);
  height: calc(100vh * 60 / 812);
  background-image: url('@/assets/zhubtnbgi.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  font-family: 'ArchivoNarrowBold', sans-serif;
  font-size: calc(100vw * 24 / 375);
  font-weight: 700;
  line-height: calc(100vw * 32.33 / 375);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-align: center;
  vertical-align: top;
}
</style>