<template>
  <div class="page">
    <div class="back">
      <BackButton/>
    </div>
    <div class="page-content">
        <!-- 输入框 -->
        <div class="input-box">
          <textarea
            v-model="text"
            maxlength="150"
            class="post-textarea"
            placeholder="Please enter"
          ></textarea>
          <div class="text-count">{{ text.length }}/150</div>
        </div>
        <!-- Theme -->
        <!-- <div class="theme-label">Theme</div> -->
        <!-- ThemeList -->
        <!-- <div class="theme-list">
          <div v-for="(theme, index) in otherStore.other.postTheme" :key="index" class="theme-item" :class="{ selected: selectedTheme === index }" @click="selectedTheme = index"># {{ theme }}</div>
        </div> -->
        <!-- Upload（Pic） -->
        <div class="theme-label">Upload（Pic）</div>
        <!-- 图片上传 -->
        <div class="upload-list">
          <!-- 添加图片按钮 -->
          <label
            v-if="uploadedImagesFiles.length < maxImages"
            class="upload-item"
          >
            <input type="file" accept="image/*" multiple style="display:none" @change="handleAddImage" />
            <div class="upload-add"></div>
          </label>
          <!-- 预览已选择但未上传的图片 -->
          <template v-if="uploadedImagesFiles.length > 0">
            <label
              v-for="(file, index) in uploadedImagesFiles"
              :key="index"
              class="upload-item"
            >
              <div
                class="upload-image"
                :style="{ backgroundImage: file ? `url(${file.preview || file._previewUrl || URL.createObjectURL(file)})` : '' }"
              ></div>
              <div class="upload-remove" @click="handleRemoveImage(index)"></div>
            </label>
          </template>
        </div>
        <!-- Release -->
        <div class="release-button" @click="handleRelease">Release</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useOtherStore } from '@/stores/other'
import { usePostStore } from '@/stores/post'
import { useCurrentUserStore } from '@/stores/currentUser'
import BackButton from '@/components/back.vue'
import { uploadMultipleImages } from '@/utils/ossUpload.js'
import { goBackOrClose, sendShowLoadingToIOS, sendShowToastToIOS } from '@/utils/iosBridge'

const text = ref('')
const selectedTheme = ref(0)

const otherStore = useOtherStore()

const maxImages = 5
const uploadedImagesFiles = ref([]) // store selected File objects (local preview only)

const handleAddImage = (event) => {
  const files = Array.from(event.target.files)
  const remaining = maxImages - uploadedImagesFiles.value.length
  const toAdd = files.slice(0, remaining).map(file => {
    file.preview = window.URL.createObjectURL(file) // local preview only
    return file
  })
  uploadedImagesFiles.value.push(...toAdd)
}

const handleRemoveImage = (index) => {
  uploadedImagesFiles.value.splice(index, 1)
}

const postStore = usePostStore()
const currentUserStore = useCurrentUserStore()
const handleRelease = async () => {
  if (!text.value.trim()) {
    sendShowToastToIOS('Please fill in the post text.')
    return
  }
  if (!uploadedImagesFiles.value.length) {
    sendShowToastToIOS('Please select at least one image.')
    return
  }

  sendShowLoadingToIOS(true)

  try {
    // 上传图片到 OSS
    const urls = await uploadMultipleImages(uploadedImagesFiles.value, 'template_development')

    // 构造新帖子对象
    const newPost = {
      dynamicId: String(postStore.posts.length + 1), // 生成唯一ID
      userId: currentUserStore.currentUser.userId, // 可以替换为当前用户ID
      dynamicType: 0,
      dynamicDesc: text.value,
      dynamicTitleType: selectedTheme.value,
      dynamicPic: urls,
      dynamicVideo: '', // 如果有视频可以赋值
      dynamicLikeCount: 0,
      dynamicCommentCount: 0
    }

    // 添加到帖子列表
    postStore.addPost(newPost)

    sendShowToastToIOS('Post released successfully')
    goBackOrClose()
    
  } catch (err) {
    console.error('上传失败', err)
    sendShowToastToIOS('Upload failed, please check your network.')
  } finally {
    sendShowLoadingToIOS(false)
  }
}
</script>

<style scoped>
.page {
  /* position: relative; */
  width: 100%;
  height: 100vh;
  background: linear-gradient(0deg, rgba(24, 24, 24, 1) 0%, rgba(53, 35, 50, 1) 100%);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.back {
    padding-top: calc(100vh * 58 / 812);
    padding-left: calc(100vw * 20 / 375);
}

.page-content {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

.input-box {
  position: relative;
  margin-top: calc(100vh * 18 / 812);
  margin-left: calc(100vw * 20 / 375);
  margin-right: calc(100vw * 20 / 375);
  height: calc(100vh * 186 / 812);
  /* border-radius: calc(100vw * 16 / 375);
  background: rgba(255, 255, 255, 1); */
  padding: calc(100vh * 12 / 812) calc(100vw * 12 / 375);
  box-sizing: border-box;
}

.post-textarea {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  resize: none;
  font-family: 'SourceHanSansRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 20.27 / 375);
  background: transparent;
  color: #ffffff;
}

.post-textarea::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.text-count {
  position: absolute;
  right: calc(100vw * 12 / 375);
  bottom: calc(100vh * 12 / 812);
  font-family: 'SourceHanSansRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 20.27 / 375);
  color: rgba(255, 255, 255, 0.6);
}

.theme-label {
  margin-top: calc(100vh * 31 / 812);
  margin-left: calc(100vw * 20 / 375);
  font-family: 'SourceHanSansBold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  line-height: calc(100vw * 28.96 / 375);
  color: rgba(255, 255, 255, 1);
  text-align: left;
}

/* .theme-list {
  display: flex;
  justify-content: flex-start;
  gap: calc(100vw * 11 / 375);
  margin-left: calc(100vw * 20 / 375);
  margin-top: calc(100vh * 20 / 812);
}

.theme-item {
  width: calc(100vw * 94 / 375);
  height: calc(100vh * 44 / 812);
  border-radius: calc(100vw * 20 / 375);
  background: rgba(255, 255, 255, 0.16);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Archivo', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 15.23 / 375);
  letter-spacing: 0;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
}

.theme-item.selected {
  background: linear-gradient(135deg, rgba(255, 159, 142, 1) 0%, rgba(241, 213, 160, 1) 32.13%, rgba(201, 255, 221, 1) 67.84%, rgba(157, 255, 255, 1) 100%);
  color: rgba(74, 32, 25, 1);
} */

.upload-list {
  display: flex;
  overflow-x: auto;
  margin-top: calc(100vh * 9 / 812);
  padding-left: calc(100vw * 20 / 375);
  padding-right: calc(100vw * 20 / 375);
  gap: calc(100vw * 5 / 375); /* 间距10，当有图片时 */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;     /* Firefox */
}

.upload-list::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.upload-item {
  width: calc(100vw * 108 / 375);
  height: calc(100vw * 108 / 375);
  flex-shrink: 0;
  border-radius: calc(100vw * 20 / 375);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.upload-image {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.upload-add {
  width: calc(100vw * 39 / 375);
  height: calc(100vw * 39 / 375);
  background-image: url('@/assets/uploadpic.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: auto;
}

.upload-remove {
  position: absolute;
  top: calc(100vh * 0 / 812);
  right: calc(100vw * 0 / 375);
  width: calc(100vw * 24 / 375);
  height: calc(100vw * 24 / 375);
  background-image: url('@/assets/uploadremove.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 10;
}

/* Release Button Styles */
.release-button {
  width: calc(100vw * 190 / 375);
  height: calc(100vh * 54 / 812);
  border-radius: calc(100vw * 40 / 375);
  background: linear-gradient(180deg, rgba(255, 0, 128, 1) 0%, rgba(236, 86, 184, 1) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'SourceHanSansBold', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 700;
  line-height: calc(100vw * 23.17 / 375);
  color: rgb(255, 255, 255);
  cursor: pointer;
  margin: calc(100vh * 222 / 812) auto calc(100vh * 34 / 812) auto;
}
</style>