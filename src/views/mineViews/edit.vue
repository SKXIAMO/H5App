<template>
  <div class="page">
    <!-- <div class="page-top-background"></div> -->
    <div class="top-header">
      <BackButton theme="black" />
      <span class="edit-title">Edit</span>
    </div>
    <div class="content">
      <div class="top">
        <div class="top-block" :style="{ backgroundImage: `url(${topBlockImage})` }" @click="chooseAvatar">
            <div class="camera-corner">
            <img src="@/assets/cameraicon.png" alt="camera" />
            </div>
        </div>
      </div>
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        style="display:none"
        @change="onFileChange"
      />
      <div class="second">
        <div class="second-section">
            <div class="label">Name</div>
            <div class="input-box">
            <input v-model="name" type="text" placeholder="Please enter" />
            </div>
        </div>
      </div>
      <div class="third">
        <div class="third-section">
            <div class="label">About me</div>
            <div class="input-box about-me-box">
            <textarea v-model="aboutMe" placeholder="Please enter"></textarea>
            </div>
        </div>
      </div>
      <div class="fourth-section">
        <div class="save-btn" @click="saveProfile">Save</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCurrentUserStore } from '@/stores/currentUser'
import { useUserStore } from '@/stores/user'
import BackButton from '@/components/back.vue'
import { goBackOrClose, sendShowLoadingToIOS, sendShowToastToIOS } from '@/utils/iosBridge'
import { uploadSingleImage } from '@/utils/ossUpload'

defineOptions({ name: 'ProfileEditView' })

// Use relative path for web build
const topBlockImage = ref('/src/assets/avataricon.png')

const name = ref('')
const aboutMe = ref('')

const fileInput = ref(null)
const avatarFile = ref(null)

const currentUserStore = useCurrentUserStore()
const userStore =  useUserStore()

const chooseAvatar = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const onFileChange = (e) => {
  const file = e.target.files[0]
  if (!file) return

  avatarFile.value = file

  // 本地预览
  const reader = new FileReader()
  reader.onload = (ev) => {
    topBlockImage.value = ev.target.result
  }
  reader.readAsDataURL(file)
}

const saveProfile = async () => {
  if (!name.value.trim()) {
    sendShowToastToIOS('Please enter name')
    return
  }

  if (!aboutMe.value.trim()) {
    sendShowToastToIOS('Please enter about me')
    return
  }

  sendShowLoadingToIOS(true)

  let avatarUrl = topBlockImage.value

  try {
    if (avatarFile.value) {
      avatarUrl = await uploadSingleImage(avatarFile.value, 'template_development')
    }

    const delay = avatarFile.value ? 0 : Math.floor(Math.random() * 1500) + 500

    setTimeout(() => {
      userStore.updateUser(currentUserStore.currentUser.userId, { 
        avator: avatarUrl,
        name: name.value,
        about: aboutMe.value
      })

      sendShowLoadingToIOS(false)

      goBackOrClose()

      sendShowToastToIOS('Profile updated')
    }, delay)

  } catch (e) {
    console.error(e)
    sendShowLoadingToIOS(false)
    sendShowToastToIOS('Updated failed, please check your network.')
  }
}

onMounted(() => {
  const user = currentUserStore.currentUser
  if (!user) return

  name.value = user.name || ''
  aboutMe.value = user.about || ''

  if (user.avator) {
    topBlockImage.value = user.avator
  }
})
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

.top-header {
  display: flex;
  align-items: center;
  gap: calc(100vw * 12 / 375);
  padding: calc(100vh * 58 / 812) calc(100vw * 20 / 375) 0;
  z-index: 1;
}

.edit-title {
  font-family: 'SFProDisplaySemibold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 600;
  line-height: calc(100vw * 23.87 / 375);
  color: rgb(0, 0, 0);
}

.content {
  flex: 1;
  position: relative;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

.top, .second, .third {
    display: flex;
    justify-content: center;
}

.top-block {
  width: calc(100vw * 80 / 375);
  height: calc(100vw * 80 / 375);
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  border: calc(100vw * 4 / 375) solid rgba(255, 255, 255, 0.6);
  position: relative;
  margin-top: calc(100vh * 30 / 812);
}

.camera-corner {
  position: absolute;
  bottom: 0;
  right: 0;
  width: calc(100vw * 28 / 375);
  height: calc(100vw * 28 / 375);
  border-radius: 50%;
  /* background: rgba(0, 0, 0, 1);
  border: calc(100vw * 1 / 375) solid rgb(255, 255, 255); */
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(calc(100vw * 6 / 375), calc(100vw * 6 / 812));
}

.camera-corner img {
  width: calc(100vw * 28 / 375);
  height: calc(100vw * 28 / 375);
}

.second-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: calc(100vh * 14 / 812);
  width: calc(100% - calc(100vh * 40 / 812));
  margin: calc(100vh * 44 / 812) 0 0;
}

.label {
  font-family: 'SFProDisplaySemibold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 600;
  line-height: calc(100vw * 23.87 / 375);
  color: rgb(0, 0, 0);
}

.input-box {
  width: 100%;
  height: calc(100vh * 54 / 812);
  border-radius: calc(100vw * 16 / 375);
  background: rgba(242, 242, 242, 1);
  display: flex;
  align-items: center;
  padding: 0 calc(100vw * 16 / 375);
  box-sizing: border-box;
}

.input-box input {
  width: 100%;
  border: none;
  outline: none;
  font-family: 'SFProDisplayRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 16.71 / 375);
  letter-spacing: 0;
  color: #000000;
  background: transparent;
}

.input-box input::placeholder {
  color: rgba(0, 0, 0, 0.4);
}

.third-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: calc(100vh * 14 / 812);
  width: calc(100% - calc(100vh * 40 / 812));
  margin-top: calc(100vh * 24 / 812);
}

.about-me-box {
  height: calc(100vh * 100 / 812);
}

.about-me-box textarea {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  resize: none;
  font-family: 'SFProDisplayRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 16.71 / 375);
  color: #000000;
  background: transparent;
  padding: calc(100vh * 16 / 812) 0; /* top-left padding */
  box-sizing: border-box;
}

.fourth-section {
  margin: calc(100vh * 195 / 812) 0 calc(100vh * 34 / 812);
  display: flex;
  justify-content: center;
  width: 100%;
}

.save-btn {
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
