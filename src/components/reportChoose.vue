<template>
  <div class="dialog-mask" @click.self="$emit('close')">
    <div class="dialog-container">
      <div class="dialog-content">
        <div class="dialog-options">
          <div class="option" @click="$emit('select', 0)">Report</div>
          <div class="option" @click="$emit('select', 1)">Shield</div>
        </div>
        <div class="cancel" @click.self="$emit('close')">Cancel</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import bgcImage from '@/assets/reportdialogbgc.png'
import optionsBgImage from '@/assets/reportchoosebgc.png'
</script>

<style scoped>
.dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  /* display: flex;
  justify-content: center;
  align-items: center; */
  z-index: 999;
}

.dialog-container {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%); /* 居中 */
  width: 100%;
  /* height: calc(100vh * 267 / 812); */
  /* margin-left: calc(100vw * 14 / 375); */
  /* background-size: cover;
  background-position: center;
  background-repeat: no-repeat; */
  border-radius: calc(100vw * 24 / 375) calc(100vw * 24 / 375) 0px 0px;
  background: rgba(14, 8, 15, 1);
  z-index: 1000;
  display: flex;
  justify-self: flex-end;
  flex-direction: column;
}

.dialog-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* 底部对齐 */
  align-items: center;       /* 水平居中 */
  /* height: 100%; */
  /* width: auto; */
  /* margin-right: calc(100vw * 28 / 375); */
  padding-bottom: calc(100vh * 45 / 812); /* 底部间距 */
  gap: calc(100vh * 28 / 812); /* 上下间距26 */
}

.dialog-options {
  /* width: calc(100vw * 260 / 375);
  height: calc(100vh * 164 / 812); */
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: calc(100vh * 16 / 812); /* 上下间距26 */
  margin-top: calc(100vh * 32 / 812);
  align-items: center;
}

.option {
  width: calc(100vw * 260 / 375);
  height: calc(100vh * 46 / 812);
  border-radius: calc(100vw * 20 / 375);
  background: rgba(255, 255, 255, 0.1);
  /* box-shadow: 0px calc(100vw * 2 / 375) calc(100vw * 4 / 375) rgba(0, 0, 0, 0.1); */
  font-family: 'SourceHanSansBold', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 700;
  color: rgb(255, 255, 255);
  text-align: center;

  display: flex; /* 新增 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.cancel {
  width: calc(100vw * 190 / 375);
  height: calc(100vh * 54 / 812);
  border-radius: calc(100vw * 40 / 375);
  background: linear-gradient(180deg, rgba(255, 0, 128, 1) 0%, rgba(236, 86, 184, 1) 100%);
  /* box-shadow: inset calc(100vw * -1 / 375) calc(100vw * -1 / 375) calc(100vw * 1 / 375) rgba(255, 255, 255, 0.6), inset calc(100vw * 1 / 375) calc(100vw * 1 / 375) calc(100vw * 1 / 375) rgba(255, 255, 255, 0.5); */
  /* backdrop-filter: blur(calc(100vw * 10 / 375)); */
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'SourceHanSansBold', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 700;
  color: rgb(255, 255, 255);
  text-align: center;
}
</style>