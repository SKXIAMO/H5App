<template>
  <div class="empty-container">
    <img src="@/assets/empty.png" alt="empty" class="empty-image" />
    <div class="empty-text">NO Data</div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.empty-container {
  display: flex;
  flex-direction: column; /* 上下排列 */
  align-items: center;    /* 水平居中 */
}

.empty-image {
  width: calc(100vw * 156 / 375);
  height: calc(100vw * 156 / 375);
}

.empty-text {
  /* margin-top: calc(100vh * 5 / 812);  */
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 400;
  letter-spacing: 0px;
  line-height: calc(100vw * 21.55 / 375);
  color: rgb(255, 255, 255);
}
</style>