<template>
  <div class="page">
    <!-- <div class="page-top-background"></div> -->
    <div class="top-header">
      <BackButton theme="black" />
    </div>
    <form class="content" @submit.prevent="saveProfile">
      <div class="intro">
        <h1>Complete your profile</h1>
        <p>Add a photo and a few words so the community can get to know you.</p>
      </div>
      <div class="top">
        <button
          class="top-block"
          type="button"
          aria-label="Choose a profile photo"
          :style="{ backgroundImage: `url(${topBlockImage})` }"
          @click="chooseAvatar"
        >
          <span class="camera-corner">
            <img src="@/assets/cameraicon.png" alt="" />
          </span>
        </button>
        <button class="photo-action" type="button" @click="chooseAvatar">Choose photo</button>
      </div>
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        style="display:none"
        @change="onFileChange"
      />
      <div class="form-section">
        <label class="field-label" for="profile-name">Name</label>
            <div class="input-box">
            <input
              id="profile-name"
              v-model="name"
              type="text"
              maxlength="30"
              autocomplete="name"
              placeholder="Your display name"
            />
            </div>
      </div>
      <div class="form-section">
        <div class="field-heading">
          <label class="field-label" for="profile-about">About me</label>
          <span class="character-count">{{ aboutMe.length }}/120</span>
        </div>
            <div class="input-box about-box">
            <textarea
              id="profile-about"
              v-model="aboutMe"
              maxlength="120"
              rows="3"
              placeholder="Tell people a little about yourself"
            ></textarea>
            </div>
      </div>
      <!-- <div class="third">
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
      </div> -->
      <div class="fourth-section">
        <button class="save-btn" type="submit" :disabled="isSaving">
          {{ isSaving ? 'Saving…' : 'Save profile' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import BackButton from '@/components/back.vue'
import avatarImage from '@/assets/avataricon.png'
import { sendShowLoadingToIOS, sendShowToastToIOS, sendNewUserDataToIOS } from '@/utils/iosBridge'
import { uploadSingleImage } from '@/utils/ossUpload'

defineOptions({ name: 'PracticeProfileInfo' })

const topBlockImage = ref(avatarImage)

const name = ref('')
const aboutMe = ref('')

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
// eslint-disable-next-line no-unused-vars -- retained for the optional profile fields kept in the design draft
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
// eslint-disable-next-line no-unused-vars -- retained for the optional profile fields kept in the design draft
const selectedCountryLabel = computed(() => {
  const selectedCountry = countryOptions.find(
    (countryOption) => countryOption.code === selectedCountryCode.value,
  )
  return selectedCountry
    ? `${selectedCountry.name} (${selectedCountry.code})`
    : selectedCountryCode.value
})

const fileInput = ref(null)
// eslint-disable-next-line no-unused-vars -- retained for the optional profile fields kept in the design draft
const birthdayInput = ref(null)
const avatarFile = ref(null)
const isSaving = ref(false)

// eslint-disable-next-line no-unused-vars -- retained for the optional profile fields kept in the design draft
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

  if (!aboutMe.value.trim()) {
    sendShowToastToIOS('Please enter your introduction')
    return
  }

  sendShowLoadingToIOS(true)
  isSaving.value = true

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
        'about': aboutMe.value,
      }

      sendShowLoadingToIOS(false)
      isSaving.value = false

      sendNewUserDataToIOS(newUserData)

    }, delay)

  } catch (e) {
    console.error(e)
    sendShowLoadingToIOS(false)
    isSaving.value = false
    sendShowToastToIOS('Updated failed, please check your network.')
  }
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

.top-header {
  min-height: 0;
  display: flex;
  align-items: center;
  gap: calc(100vw * 16 / 375);
  padding: calc(100vh * 58 / 812) calc(100vw * 20 / 375) 0;
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
  border: calc(100vw * 4 / 375) solid rgba(255, 255, 255, 0.6);
  position: relative;
  margin-top: calc(100vh * 38 / 812);
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
  /* box-shadow: 0px calc(100vw * 2 / 375) calc(100vw * 4 / 375)  rgba(0, 0, 0, 0.1); */
  /* backdrop-filter: calc(100vw * 12 / 375); */
  display: flex;
  align-items: center;
  padding: 0 calc(100vw * 16 / 375);
  box-sizing: border-box;
  cursor: pointer;
}

.birthday-content {
  position: relative;
  justify-content: space-between;
  font-family: 'SFProDisplayRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 16.71 / 375);
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

/* .gender-woman-icon {
  width: calc(100vw * 41 / 375);
  height: calc(100vh * 41 / 812);
  background-image: url('@/assets/registerwomanicon.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
} */

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
  margin: calc(100vh * 240 / 812) 0 calc(100vh * 34 / 812);
  display: flex;
  justify-content: center;
  width: 100%;
}

.save-btn {
  width: calc(100vw * 190 / 375);
  height: calc(100vh * 54 / 812);
  border-radius: calc(100vw * 100 / 375);
  font-family: 'SFProDisplaySemibold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 600;
  line-height: calc(100vw * 23.87 / 375);
  color: #fff;
  background: linear-gradient(135deg, rgba(255, 137, 177, 1) 0%, rgba(245, 91, 250, 1) 49.99%, rgba(46, 171, 255, 1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Responsive profile layout */
.page {
  min-height: 100vh;
  min-height: 100dvh;
  height: 100dvh;
  background:
    radial-gradient(circle at 50% -12%, rgba(245, 91, 250, 0.12), transparent 34%),
    #fff;
}

.top-header {
  min-height: 52px;
  padding: calc(env(safe-area-inset-top, 0px) + 14px) 20px 0;
  box-sizing: border-box;
}

.content {
  width: min(100%, 480px);
  margin: 0 auto;
  padding: 20px 20px calc(env(safe-area-inset-bottom, 0px) + 24px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.intro {
  text-align: center;
}

.intro h1 {
  margin: 0;
  color: #141414;
  font-family: 'SFProDisplayBold', sans-serif;
  font-size: clamp(26px, 7vw, 32px);
  font-weight: 700;
  line-height: 1.16;
  letter-spacing: -0.02em;
}

.intro p {
  max-width: 330px;
  margin: 10px auto 0;
  color: #707070;
  font-family: 'SFProDisplayRegular', sans-serif;
  font-size: 15px;
  line-height: 1.45;
}

.top {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.top-block {
  width: 96px;
  height: 96px;
  flex: 0 0 96px;
  margin: 0;
  padding: 0;
  border: 4px solid rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  background-color: #f1f1f4;
  background-size: cover;
  background-position: center;
  box-shadow: 0 8px 24px rgba(40, 18, 72, 0.14);
  cursor: pointer;
  appearance: none;
  -webkit-tap-highlight-color: transparent;
}

.top-block:focus-visible {
  outline: 3px solid rgba(168, 80, 255, 0.32);
  outline-offset: 3px;
}

.camera-corner {
  right: -2px;
  bottom: -2px;
  width: 30px;
  height: 30px;
  background: #fff;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.16);
}

.camera-corner img {
  width: 26px;
  height: 26px;
}

.photo-action {
  margin-top: 10px;
  padding: 5px 8px;
  border: 0;
  background: transparent;
  color: #8b48ee;
  font-family: 'SFProDisplaySemibold', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.form-section {
  width: 100%;
  margin-top: 24px;
}

.field-heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.field-label {
  display: block;
  margin-bottom: 9px;
  color: #1b1b1b;
  font-family: 'SFProDisplaySemibold', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
}

.character-count {
  margin-bottom: 9px;
  color: #aaa;
  font-family: 'SFProDisplayRegular', sans-serif;
  font-size: 12px;
}

.input-box {
  width: 100%;
  min-height: 54px;
  height: auto;
  padding: 0 16px;
  border: 1px solid transparent;
  border-radius: 16px;
  background: rgba(245, 245, 247, 0.96);
  transition: border-color 160ms ease, background-color 160ms ease, box-shadow 160ms ease;
}

.input-box:focus-within {
  border-color: rgba(151, 70, 238, 0.55);
  background: #fff;
  box-shadow: 0 0 0 4px rgba(151, 70, 238, 0.08);
}

.input-box input,
.input-box textarea {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: #171717;
  font-family: 'SFProDisplayRegular', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
  box-sizing: border-box;
}

.input-box input {
  height: 52px;
}

.about-box {
  align-items: flex-start;
  padding-top: 14px;
  padding-bottom: 14px;
}

.input-box textarea {
  min-height: 64px;
  padding: 0;
  resize: none;
}

.input-box input::placeholder,
.input-box textarea::placeholder {
  color: #a2a2a8;
}

.fourth-section {
  width: 100%;
  margin: auto 0 0;
  padding-top: 28px;
}

.save-btn {
  width: 100%;
  min-height: 56px;
  height: 56px;
  padding: 0 20px;
  border: 0;
  border-radius: 18px;
  color: #fff;
  font-family: 'SFProDisplaySemibold', sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 1;
  box-shadow: 0 10px 24px rgba(168, 54, 232, 0.22);
  cursor: pointer;
  transition: transform 140ms ease, box-shadow 140ms ease, opacity 140ms ease;
  appearance: none;
  -webkit-tap-highlight-color: transparent;
}

.save-btn:active:not(:disabled) {
  transform: translateY(1px) scale(0.99);
  box-shadow: 0 6px 16px rgba(168, 54, 232, 0.2);
}

.save-btn:disabled {
  opacity: 0.65;
  cursor: wait;
}

@media (max-height: 720px) {
  .content {
    padding-top: 10px;
  }

  .intro p {
    display: none;
  }

  .top {
    margin-top: 14px;
  }

  .top-block {
    width: 80px;
    height: 80px;
    flex-basis: 80px;
  }

  .form-section {
    margin-top: 16px;
  }

  .fourth-section {
    padding-top: 20px;
  }
}

@media (min-width: 700px) {
  .page {
    background:
      radial-gradient(circle at 50% -8%, rgba(245, 91, 250, 0.16), transparent 36%),
      #f7f7f9;
  }

  .content {
    flex: initial;
    margin: 24px auto 40px;
    padding: 32px;
    border: 1px solid rgba(30, 30, 30, 0.06);
    border-radius: 28px;
    background: rgba(255, 255, 255, 0.92);
    box-shadow: 0 22px 60px rgba(35, 24, 54, 0.1);
  }

  .fourth-section {
    margin-top: 32px;
  }
}
</style>
