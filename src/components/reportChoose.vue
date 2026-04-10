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
// import bgcImage from '@/assets/reportdialogbgc.png'
// import optionsBgImage from '@/assets/reportchoosebgc.png'
</script>

<style scoped>
.dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  /* display: flex;
  justify-content: center;
  align-items: center; */
  z-index: 999;
}

.dialog-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 居中 */
  width: 100%;
  /* height: calc(100vh * 267 / 812); */
  /* margin-left: calc(100vw * 14 / 375); */
  /* background-size: cover;
  background-position: center;
  background-repeat: no-repeat; */
  /* border-radius: calc(100vw * 40 / 375) calc(100vw * 40 / 375) 0px 0px;
  background: linear-gradient(135deg, rgba(251, 226, 100, 1) 0%, rgba(250, 196, 172, 1) 100%); */

  width: calc(100vw * 281 / 375);
  height: calc(100vw * 326 / 375);
  background-image: url('@/assets/reportchoosedialogbgi.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1000;
  display: flex;
  justify-content: end;
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
  padding-bottom: calc(100vh * 17 / 812); /* 底部间距 */
  gap: calc(100vh * 22 / 812); /* 上下间距26 */
}

.dialog-options {
  /* width: calc(100vw * 260 / 375);
  height: calc(100vh * 164 / 812); */
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: calc(100vh * 16 / 812); /* 上下间距26 */
  /* margin-top: calc(100vh * 34 / 812); */
  align-items: center;
}

.option {
  width: calc(100vw * 260 / 375);
  height: calc(100vh * 46 / 812);
  border-radius: calc(100vw * 40 / 375);
  background: rgb(255, 255, 255);
  box-shadow: 0px calc(100vw * 2 / 375) calc(100vw * 4 / 375) rgba(0, 0, 0, 0.1);
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 400;
  line-height: calc(100vw * 21.55 / 375);
  color: rgb(0, 0, 0);
  text-align: center;

  display: flex; /* 新增 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.cancel {
  width: calc(100vw * 206 / 375);
  height: calc(100vh * 60 / 812);
  /* border-radius: calc(100vw * 87 / 375); */
  font-size: calc(100vw * 24 / 375);
  font-weight: 700;
  line-height: calc(100vw * 32.33 / 375);
  color: #fff;
  background-image: url('@/assets/reportbtnbgi.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>