<template>
  <div class="page">
    <!-- <div class="page-top-background"></div> -->
    <div class="back">
      <BackButton theme="black" />
    </div>
    <div class="page-content">
        <div class="grid-container">
            <div class="grid-item" 
                 v-for="(item, index) in otherStore.other.reportContent" 
                 :key="index"
                 :class="{ selected: selectedIndex === index }"
                 @click="selectedIndex = index">
                <!-- <div class="choose-box">
                    <div class="check-icon" v-if="selectedIndex === index"></div>
                </div> -->
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

defineOptions({ name: 'ReportSubmissionView' })

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
  position: relative;
  width: 100%;
  height: 100vh;
  background: rgb(255, 255, 255);
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

.back {
  padding-top: calc(100vh * 58 / 812);
  padding-left: calc(100vw * 20 / 375);
  z-index: 1;
}

.page-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

.grid-container {
  display: flex;
  flex-direction: column;
  gap: calc(100vh * 13 / 812);
  padding: calc(100vh * 24 / 812) calc(100vw * 20 / 375) 0; /* 可选左右内边距 */
}

.grid-item {
  position: relative;
  border-radius: calc(100vw * 214 / 375);
  background: rgba(242, 242, 242, 1);
  height: calc(100vw * 63 / 375);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.choose-box {
  position: absolute;
  right: 0;
  bottom: 0;
  width: calc(100vw * 32 / 375);
  height: calc(100vw * 32 / 375);
  border-radius: calc(100vw * 8 / 375) 0px calc(100vw * 20 / 375) 0px;
  background: rgba(48, 234, 255, 0.3);
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
  font-family: 'SFProDisplaySemibold', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 600;
  line-height: calc(100vw * 19.09 / 375);
  color: rgba(0, 0, 0, 0.6);
}

.selected {
  background: rgba(185, 100, 255, 1);
}

.selected .report-content{
  color: #fff;
}

.input-title {
  padding-top: calc(100vh * 40 / 812);
  padding-left: calc(100vw * 20 / 375);
  font-family: 'SFProDisplaySemibold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 600;
  line-height: calc(100vw * 23.87 / 375);
  color: rgb(0, 0, 0);
}

.input-box {
  position: relative;
  margin: calc(100vh * 14 / 812) calc(100vw * 20 / 375) 0;
  height: calc(100vh * 103 / 812);
  border-radius: calc(100vw * 16 / 375);
  background:rgba(242, 242, 242, 1);
  padding: calc(100vh * 18 / 812) calc(100vw * 16 / 375);
  box-sizing: border-box;
}

.input-field {
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  outline: none;
  background: transparent;
  font-family: 'SFProDisplayRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 16.71 / 375);
  color: rgb(0, 0, 0); /* 输入文本颜色 */
}

.input-field :placeholder {
  color: rgba(0, 0, 0, 0.4);
}

.char-count {
  position: absolute;
  right: calc(100vw * 8 / 375);
  bottom: calc(100vh * 13 / 812);
  font-family: 'SFProDisplayRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 16.71 / 375);
  color: rgba(0, 0, 0, 0.6);
}

.btn-box {
  margin: 0 auto; /* 新增：水平居中 */
  margin-top: calc(100vh * 29 / 812);
  margin-bottom: calc(100vh * 34 / 812);
  width: calc(100vw * 190 / 375);
  height: calc(100vh * 54 / 812);
  border-radius: calc(100vw * 100 / 375);
  font-family: 'SFProDisplaySemibold', sans-serif;
  font-size: calc(100vw * 18 / 375);
  font-weight: 600;
  line-height: calc(100vw * 21.48 / 375);
  color: #fff;
  background: linear-gradient(135deg, rgba(255, 137, 177, 1) 0%, rgba(245, 91, 250, 1) 49.99%, rgba(46, 171, 255, 1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
