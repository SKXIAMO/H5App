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
  width: calc(100vw * 149 / 375);
  height: calc(100vw * 149 / 375);
}

.empty-text {
  font-family: 'JetBrainsMonoRegular', sans-serif;
  font-size: calc(100vw * 18 / 375);
  font-weight: 400;
  letter-spacing: 0px;
  line-height: calc(100vw * 22.32 / 375);
  color: rgba(102, 102, 102, 1);
}
</style>