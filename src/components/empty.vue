<template>
  <div class="empty-container">
    <img src="@/assets/empty.png" alt="empty" class="empty-image" />
    <div class="empty-text">NO Data</div>
  </div>
</template>

<script setup>
defineOptions({ name: 'EmptyStatePanel' })
</script>

<style scoped>
.empty-container {
  display: flex;
  flex-direction: column; /* 上下排列 */
  align-items: center;    /* 水平居中 */
  gap: calc(100vh * 20 / 812);
}

.empty-image {
  width: calc(100vw * 119 / 375);
  height: calc(100vw * 119 / 375);
}

.empty-text {
  font-family: 'SFProDisplayRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  letter-spacing: 0px;
  line-height: calc(100vw * 16.71 / 375);
  color: rgba(0, 0, 0, 0.4);
}
</style>
