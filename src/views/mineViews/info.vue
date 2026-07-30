<template>
  <div class="page">
    <div class="page-top-background"></div>
    <div class="top-header">
      <BackButton />
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
            <div class="label">Name:</div>
            <div class="input-box">
            <input v-model="name" type="text" placeholder="Please enter" />
            </div>
        </div>
      </div>
      <div class="third">
        <div class="third-section">
            <div class="label">Gender</div>
            <div class="input-box birthday-content">
                <div class="birthday-input">{{ selectedGender }}</div>
                <div class="birthday-icon"></div>
                <select
                  v-model="selectedGender"
                  class="profile-native-select"
                  aria-label="Gender"
                >
                  <option
                    v-for="genderOption in genderOptions"
                    :key="genderOption"
                    :value="genderOption"
                  >
                    {{ genderOption }}
                  </option>
                </select>
            </div>
        </div>
      </div>
      <div class="third">
        <div class="third-section">
            <div class="label">Birthday</div>
            <div class="input-box birthday-content">
                <div class="birthday-input">{{ birthday }}</div>
                <div class="birthday-icon"></div>
                <input
                  ref="birthdayInput"
                  v-model="birthday"
                  :max="maxBirthday"
                  class="birthday-native-input"
                  type="date"
                  lang="en-US"
                  @change="normalizeBirthday"
                />
            </div>
        </div>
      </div>
      <div class="third">
        <div class="third-section">
            <div class="label">Country</div>
            <div class="input-box birthday-content">
                <div class="birthday-input">{{ selectedCountryLabel }}</div>
                <div class="birthday-icon"></div>
                <select
                  v-model="selectedCountryCode"
                  class="profile-native-select"
                  aria-label="Country"
                >
                  <option
                    v-for="countryOption in countryOptions"
                    :key="countryOption.code"
                    :value="countryOption.code"
                  >
                    {{ countryOption.name }} ({{ countryOption.code }})
                  </option>
                </select>
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
import { computed, ref } from 'vue'
import BackButton from '@/components/back.vue'
import { sendShowLoadingToIOS, sendShowToastToIOS, sendNewUserDataToIOS } from '@/utils/iosBridge'
import { uploadSingleImage } from '@/utils/ossUpload'

defineOptions({ name: 'PracticeProfileInfo' })

// Use relative path for web build
const topBlockImage = ref('/src/assets/avataricon.png')

const name = ref('')

const formatDate = (date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const getDefaultBirthday = () => {
  const now = new Date()
  now.setFullYear(now.getFullYear() - 20)
  return formatDate(now)
}

const getMaxBirthday = () => {
  const now = new Date()
  now.setFullYear(now.getFullYear() - 18)
  return formatDate(now)
}

const maxBirthday = getMaxBirthday()
const birthday = ref(getDefaultBirthday())
const genderOptions = ['Female', 'Male']
const selectedGender = ref(genderOptions[0])
const countryOptions = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'MX', name: 'Mexico' },
  { code: 'BR', name: 'Brazil' },
  { code: 'AR', name: 'Argentina' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'IE', name: 'Ireland' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'ES', name: 'Spain' },
  { code: 'IT', name: 'Italy' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'BE', name: 'Belgium' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'AT', name: 'Austria' },
  { code: 'SE', name: 'Sweden' },
  { code: 'NO', name: 'Norway' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FI', name: 'Finland' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'GR', name: 'Greece' },
  { code: 'AU', name: 'Australia' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'CN', name: 'China' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'TW', name: 'Taiwan' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'SG', name: 'Singapore' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'TH', name: 'Thailand' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'PH', name: 'Philippines' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'IN', name: 'India' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'EG', name: 'Egypt' },
]
const selectedCountryCode = ref('US')
const selectedCountryLabel = computed(() => {
  const selectedCountry = countryOptions.find(
    (countryOption) => countryOption.code === selectedCountryCode.value,
  )
  return selectedCountry
    ? `${selectedCountry.name} (${selectedCountry.code})`
    : selectedCountryCode.value
})

const fileInput = ref(null)
const birthdayInput = ref(null)
const avatarFile = ref(null)

const normalizeBirthday = () => {
  if (birthday.value > maxBirthday) {
    birthday.value = maxBirthday
  }
}

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

  sendShowLoadingToIOS(true)

  let avatarUrl = topBlockImage.value

  try {
    if (avatarFile.value) {
      avatarUrl = await uploadSingleImage(avatarFile.value, 'template_development')
    }
    
    const delay = Math.floor(Math.random() * 1500) + 500

    setTimeout(() => {
      const submittedAvatarUrl = avatarFile.value ? avatarUrl : ''
      let newUserData = {
        'avator': submittedAvatarUrl,
        'name': name.value,
      }

      sendShowLoadingToIOS(false)

      sendNewUserDataToIOS(newUserData)

    }, delay)

  } catch (e) {
    console.error(e)
    sendShowLoadingToIOS(false)
    sendShowToastToIOS('Updated failed, please check your network.')
  }
}

</script>

<style scoped>
.page {
  position: relative;
  width: 100%;
  height: 100vh;
  background: rgba(238, 239, 248, 1);
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
  min-height: 0;
  display: flex;
  align-items: center;
  gap: calc(100vw * 16 / 375);
  padding: calc(100vh * 56 / 812) calc(100vw * 20 / 375) 0;
}

.content {
  min-height: 0;
  flex: 1;
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
  border: calc(100vw * 1 / 375) solid rgba(255, 255, 255, 1);
  position: relative;
  margin-top: calc(100vh * 35 / 812);
}

.camera-corner {
  position: absolute;
  bottom: 0;
  right: 0;
  width: calc(100vw * 24 / 375);
  height: calc(100vw * 24 / 375);
  border-radius: 50%;
  /* background: rgba(255, 255, 255, 1); */
  display: flex;
  align-items: center;
  justify-content: center;
  /* transform: translate(calc(100vw * 4 / 375), calc(100vw * 4 / 812)); */
}

.camera-corner img {
  width: calc(100vw * 24 / 375);
  height: calc(100vw * 24 / 375);
}

.second-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: calc(100vh * 12 / 812);
  width: calc(100% - calc(100vh * 40 / 812));
  margin: calc(100vh * 30 / 812) 0 0;
}

.label {
  font-family: 'JetBrainsMonoBold', sans-serif;
  font-size: calc(100vw * 18 / 375);
  font-weight: 700;
  line-height: calc(100vw * 22.32 / 375);
  color: rgb(0, 0, 0);
}

.input-box {
  width: 100%;
  height: calc(100vh * 53 / 812);
  border-radius: calc(100vw * 14 / 375);
  background: rgba(227, 227, 227, 1);
  /* box-shadow: 0px calc(100vw * 2 / 375) calc(100vw * 4 / 375)  rgba(0, 0, 0, 0.1); */
  /* backdrop-filter: calc(100vw * 12 / 375); */
  display: flex;
  align-items: center;
  padding: 0 calc(100vw * 12 / 375);
  box-sizing: border-box;
  cursor: pointer;
}

.birthday-content {
  position: relative;
  justify-content: space-between;
  font-family: 'JetBrainsMonoRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 17.36 / 375);
  letter-spacing: 0;
  color: rgba(153, 153, 153, 1);
}

.birthday-input {
  flex: 1;
  pointer-events: none;
}

.birthday-native-input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 3;
}

.profile-native-select {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 3;
}

.birthday-icon {
  width: calc(100vw * 20 / 375);
  height: calc(100vh * 20 / 812);
  background-image: url('@/assets/birthdayicon.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  pointer-events: none;
}

.input-box input {
  width: 100%;
  border: none;
  outline: none;
  font-family: 'JetBrainsMonoRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 17.36 / 375);
  letter-spacing: 0;
  color: #000000;
  background: transparent;
}

.input-box input::placeholder {
  color: rgba(153, 153, 153, 1);
}

.third-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: calc(100vh * 10 / 812);
  width: calc(100% - calc(100vh * 40 / 812));
  margin-top: calc(100vh * 20 / 812);
  position: relative;
}

.gender-content {
  display: flex;
  gap: calc(100vw * 54 / 375);
  margin-top: calc(100vh * 16 / 812);
}

.gender {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(100vh * 10 / 375);
  cursor: pointer;
}

.gender-woman-icon {
  width: calc(100vw * 41 / 375);
  height: calc(100vh * 41 / 812);
  background-image: url('@/assets/registerwomanicon.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* .gender-man-icon {
  width: calc(100vw * 37 / 375);
  height: calc(100vh * 41 / 812);
  background-image: url('@/assets/registermanicon.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
} */

.gender-text {
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 18.86 / 375);
  letter-spacing: 0;
  color: #ffffff;
}

.gender-box {
  width: calc(100vw * 60 / 375);
  height: calc(100vh * 60 / 812);
  background: rgba(255, 255, 255, 1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: calc(100vw * 2 / 375) solid transparent;
  box-sizing: border-box;
}

.gender-box-active {
  border: calc(100vw * 2 / 375) solid rgba(142, 108, 219, 1);
}

.fourth-section {
  margin: calc(100vh * 47 / 812) 0 calc(100vh * 34 / 812);
  display: flex;
  justify-content: center;
  width: 100%;
}

.save-btn {
  width: calc(100vw * 198 / 375);
  height: calc(100vh * 53 / 812);
  border-radius: calc(100vw * 40 / 375);
  font-family: 'JetBrainsMonoBold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  color: #fff;
  border: calc(100vw * 2 / 375) solid transparent;
  background:
    linear-gradient(#000, #000) padding-box,
    linear-gradient(90deg, rgba(165, 237, 57, 1) 0%, rgba(48, 234, 255, 1) 100%) border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
