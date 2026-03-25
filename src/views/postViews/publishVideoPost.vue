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
        <!-- Upload（video） -->
        <div class="theme-label">Upload（video）</div>
        <!-- 视频上传 -->
        <div class="upload-list">
          <!-- 添加视频按钮 -->
          <label v-if="!uploadedVideo" class="upload-item">
            <input type="file" accept="video/*" style="display:none" @change="handleAddVideo" />
            <div class="upload-add"></div>
          </label>

          <!-- 已上传的视频第一帧显示 -->
          <template v-if="uploadedVideo">
            <label class="upload-item">
              <img class="upload-video-preview" :src="videoFirstFrame" alt="video preview" />
              <div class="upload-remove" @click="handleRemoveVideo"></div>
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
import { uploadSingleImage, uploadVideo } from '@/utils/ossUpload'
import { goBackOrClose, sendShowLoadingToIOS, sendShowToastToIOS } from '@/utils/iosBridge'

const text = ref('')
const selectedTheme = ref(0)

const otherStore =  useOtherStore()
const postStore = usePostStore()
const currentUserStore = useCurrentUserStore()

const uploadedVideo = ref(null)  // store the video file
const videoFirstFrame = ref('') // store the preview image

const handleAddVideo = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  uploadedVideo.value = file;

  const url = URL.createObjectURL(file);
  const video = document.createElement('video');
  video.src = url;
  video.muted = true;
  video.playsInline = true;
  video.crossOrigin = 'anonymous';

  let frameCaptured = false; // track if frame was captured

  video.addEventListener('loadedmetadata', () => {
    try {
      video.currentTime = 0.5; // avoid black frame
    } catch (e) {
      console.warn('set currentTime error', e);
    }
  });

  video.addEventListener('seeked', () => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      videoFirstFrame.value = canvas.toDataURL('image/jpeg', 0.7);
      frameCaptured = true;
      URL.revokeObjectURL(url);
    } catch (err) {
      console.warn('video frame capture failed', err);
    }
  });

  // backup fallback in case seeked doesn't trigger (iOS issue)
  setTimeout(() => {
    if (!frameCaptured) {
      videoFirstFrame.value = 'https://via.placeholder.com/108'; // fallback placeholder
      URL.revokeObjectURL(url);
    }
  }, 1500);
};

const handleRemoveVideo = () => {
  uploadedVideo.value = null
  videoFirstFrame.value = ''
}

const handleRelease = async () => {
  // 1. 判断文案是否为空
  if (!text.value.trim()) {
    sendShowToastToIOS('Please fill in the post text.')
    return
  }

  if (!uploadedVideo.value) {
    sendShowToastToIOS('Please select a video.')
    return
  }

  sendShowLoadingToIOS(true)

  try {
    // 2. 上传视频
    const videoUrl = await uploadVideo(uploadedVideo.value,'template_development')
    console.log('视频 URL:', videoUrl)

    // 3. 上传视频第一帧图片
    const imageBlob = await (await fetch(videoFirstFrame.value)).blob()
    const imageFile = new File([imageBlob], 'first_frame.png', { type: 'image/png' })
    const imageUrl = await uploadSingleImage(imageFile,'template_development')
    console.log('视频第一帧 URL:', imageUrl)

    // 构造新帖子对象
    const newPost = {
      dynamicId: String(postStore.posts.length + 1), // 生成唯一ID
      userId: currentUserStore.currentUser.userId, // 可以替换为当前用户ID
      dynamicType: 1,
      dynamicDesc: text.value,
      dynamicTitleType: '',
      dynamicPic: [imageUrl],
      dynamicVideo: videoUrl, // 如果有视频可以赋值
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
  position: relative;
  width: 100%;
  height: 100vh;
  background: linear-gradient(0deg, rgba(24, 24, 24, 1) 0%, rgba(53, 35, 50, 1) 100%);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.back {
  min-width: 0;
  padding-top: calc(100vh * 58 / 812);
  padding-left: calc(100vw * 20 / 375);
}

.page-content {
  min-width: 0;
  flex: 1;
  /* position: relative; */
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
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
  margin-top: calc(100vh * 24 / 812);
  margin-left: calc(100vw * 20 / 375);
  font-family: 'SourceHanSansBold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  line-height: calc(100vw * 28.96 / 375);
  color: rgba(255, 255, 255, 1);
  text-align: left;
}

.upload-list {
  display: flex;
  overflow-x: auto;
  margin-top: calc(100vh * 9 / 812);
  padding-left: calc(100vw * 20 / 375);
  padding-right: calc(100vw * 20 / 375);
  gap: calc(100vw * 10 / 375); /* 间距10，当有图片时 */
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
  /* backdrop-filter: blur(12px); */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.upload-video-preview {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  object-fit: cover;
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
  margin: calc(100vh * 229 / 812) auto calc(100vh * 34 / 812) auto;
}
</style>