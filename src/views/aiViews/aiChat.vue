<template>
  <div class="page">
    <!-- <div class="aiusermodel"></div>
    <div class="aichatmodel"></div> -->
    <!-- <div class="page-top-background"></div>
    <div class="page-top-aiuser"></div> -->
    <div class="page-container">
      <!-- top -->
      <div class="top-bgc">
        <div class="top-section">
          <BackButton theme="black" />
          <p>Barre AI</p>
        </div>
        <div class="bottom-first">
          <div
            v-for="(item, index) in promptList"
            :key="index"
            class="prompt-item"
            @click="handlePromptClick(item)"
          >
            <span class="prompt-text">{{ item }}</span>
            <div class="prompt-icon"></div>
          </div>
        </div>
      </div>
      <!-- bottom -->
      <div class="bottom-section">
        <div class="bottom-scroll">
          <div v-for="(item, index) in bottomItems" :key="index" class="chat-item">
            <div class="chat-choose" v-if="item.sendId === '0'">
                <div class="chat-time">{{ item.time }}</div>
                    <div class="chat-content">
                    <img class="chat-avatar" src="@/assets/aiavator.png" alt="AI Avatar" />
                    <div class="chat-message">{{ item.message }}</div>
                </div>
            </div>
            <div class="chat-choose" v-else>
                <div class="chat-time">{{ item.time }}</div>
                    <div class="chat-content-rigth">
                    <div class="chat-message-rigth">{{ item.message }}</div>
                    <div class="chat-avatar-rigth-border-box">
                      <div class="chat-avatar-rigth"> 
                        <img :src="currentUserStore.currentUser.avator" alt="AI Avatar" />
                      </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部输入框 -->
    <!-- bottom input box -->
    <div class="bottom-input-outbox">
      <div class="bottom-input">
        <input type="text" placeholder="Say something" v-model="chatInput" />
        <div class="send-icon" @click="sendMessage" >
          <img src="@/assets/commentsend.png" alt="Send" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BackButton from '@/components/back.vue'
import { useCurrentUserStore } from '@/stores/currentUser'
import { sendShowLoadingToIOS, sendShowToastToIOS } from '@/utils/iosBridge'
import { aiChat } from '@/utils/ai'
import { decryptAES } from '@/utils/aes'

defineOptions({ name: 'AiChatView' })

const formatTime12 = (date) => {
  let hours = date.getHours()
  let minutes = date.getMinutes()
  hours = hours % 12
  if (hours === 0) hours = 12
  return `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}`
}

const promptList = ref([
  "I'm feeling great today.",
  'Do you like reading?',
  'Can you comfort me?'
])

const currentUserStore = useCurrentUserStore()

const getFirstTime = () => {
  const key = 'chat_first_time'
  const saved = localStorage.getItem(key)

  if (saved) return saved

  const now = new Date()
  const time = formatTime12(now) // changed here
  localStorage.setItem(key, time)

  return time
}

const bottomItems = ref([
  { sendId: '0', time: getFirstTime(), message: "Hi there! I'm Barre, your AI buddy for all things fun and creative."},
])

async function handleMessageClick(message) {
  const time = formatTime12(new Date()) // changed here
  bottomItems.value.push({
    sendId: currentUserStore.currentUser.id,
    time,
    message: message
  })

  sendShowLoadingToIOS(true)

  try {
    const res = await aiChat(message)

    sendShowLoadingToIOS(false)

    if (res.data.code === '0000') {
      // 1 解密
      const decryptText = decryptAES(res.data.result)
      // 2 转 JSON
      const data = JSON.parse(decryptText)
      const aiMessage = data?.output?.choices?.[0]?.message?.content || ''
      
      // 然后 push 到聊天列表
      bottomItems.value.push({
        sendId: '0',           // AI
        time: formatTime12(new Date()), // changed here
        message: aiMessage
      })
    } else {
      sendShowToastToIOS(res.data.message)
    }

  } catch {
    sendShowLoadingToIOS(false)
    sendShowToastToIOS('Network error')
  }
}

async function handlePromptClick(message) {
  await handleMessageClick(message)
}

const chatInput = ref('')

async function sendMessage() {
  const text = chatInput.value.trim()
  if (!text) return

  const time = formatTime12(new Date()) // changed here

  bottomItems.value.push({
    sendId: currentUserStore.currentUser.id,
    time,
    message: text
  })

  sendShowLoadingToIOS(true)
  try {
    const res = await aiChat(text)

    sendShowLoadingToIOS(false)

    if (res.data.code === '0000') {
      // 1 解密
      const decryptText = decryptAES(res.data.result)
      // 2 转 JSON
      const data = JSON.parse(decryptText)
      const aiMessage = data?.output?.choices?.[0]?.message?.content || ''
      
      // 然后 push 到聊天列表
      bottomItems.value.push({
        sendId: '0',           // AI
        time: formatTime12(new Date()), // changed here
        message: aiMessage
      })

      chatInput.value = ""
    } else {
      sendShowToastToIOS(res.data.message)
    }

  } catch {
    sendShowLoadingToIOS(false)
    sendShowToastToIOS('Network error')
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
  z-index: -1;
}

.page-top-aiuser {
  position: absolute;
  top: calc(100vh * 56 / 812);
  right: 0;
  width: calc(100vw * 338 / 375);
  height: calc(100vh * 343 / 812);
  background-image: url('@/assets/aiuserpic.png');
  background-size: cover; /* 等比缩放覆盖 */
  background-position: center; /* 居中显示 */
  background-repeat: no-repeat;
  z-index: 0;
}

.page-container {
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
  /* justify-content: center; */
}

.top-bgc {
  width: 100%;
  height: calc(100vh * 281 / 812);
  background-image: url('@/assets/aichattop.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.bottom-first {
  position: relative;
  margin: calc(100vh * 0 / 812) calc(100vw * 20 / 375) calc(100vh * 24 / 812);
  display: flex;
  flex-direction: column;
  gap: calc(100vh * 8 / 812);
  z-index: 3;
}

.prompt-item {
  width: calc(100vw * 201 / 375);
  height: calc(100vh * 36 / 812);
  padding: 0 calc(100vw * 12 / 375);
  border-radius: calc(100vw * 32 / 375);
  background: rgba(13, 8, 13, 0.2);
  backdrop-filter: blur(calc(100vw * 8 / 375));
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}

.prompt-text {
  font-family: 'SFProDisplayRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  line-height: calc(100vw * 16.71 / 375);
  color: #fff;
}

.prompt-icon {
  width: calc(100vw * 16 / 375);
  height: calc(100vw * 16 / 375);
  flex-shrink: 0;
  background-image: url('@/assets/ai-chat-list-icon.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.ai-user-container {
  position: absolute;
  top: calc(100vh * 56 / 812);
  right: 0;
  width: calc(100vw * 338 / 375);
  height: calc(100vh * 343 / 812);
  background-image: url('@/assets/aiuserpic.png');
  background-size: cover; /* 等比缩放覆盖 */
  background-position: center; /* 居中显示 */
  background-repeat: no-repeat;
  z-index: 0;
}

/* .ai-bgc-icon {
  position: absolute;
  right: calc(100vw * 2 / 375);
  top: calc(100vh * -12 / 812);
  width: calc(100vw * 66 / 375);
  height: calc(100vh * 66 / 812);
  background-image: url('@/assets/aibgcicon.png');
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat;
  z-index: 2;
} */

.ai-title-inter {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: calc(100vh * 16 / 812);
  z-index: 3;
}

.ai-title-inter-one {
  font-family: 'CinzelBlack', sans-serif;
  font-size: calc(100vw * 24 / 375);
  font-weight: 900;
  line-height: calc(100vw * 32.23 / 375);
  color: rgb(0, 0, 0);
  text-shadow: 0px calc(100vw * 2 / 375) 0px  rgba(0, 0, 0, 0.25);
}

.ai-title-inter-two {
  font-family: 'JetBrainsMonoBold', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 700;
  line-height: calc(100vw * 19.84 / 375);
  color: rgba(252, 71, 178, 1);
  padding: calc(100vh * 6 / 812) calc(100vw * 10 / 375);
  border-radius: calc(100vw * 10 / 375);
  background-color: #000;
}

/* .aiusermodel {
  position: absolute;
  left: calc(100vw * 20 / 375);
  top: calc(100vh * 40 / 812);
  width: calc(100vw * 179 / 375);
  height: calc(100vh * 314 / 812);
  opacity: 1;
  background-image: url('@/assets/aiusermodel.png'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
}

.aichatmodel {
  position: absolute;
  left: calc(100vw * 181 / 375);
  top: calc(100vh * 62 / 812);
  width: calc(100vw * 104 / 375);
  height: calc(100vh * 38 / 812);
  opacity: 1;
  background-image: url('@/assets/aichatmodel.png'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
} */

.top-section {
  position: relative;
  margin-top: calc(100vh * 58 / 812);
  margin-left: calc(100vw * 20 / 375);
  z-index: 100;
  display: flex;
  align-items: center;
  gap: calc(100vh * 12 / 812);
}

.top-section p {
  font-family: 'SFProDisplaySemibold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 600;
  color: #000;
  line-height: calc(100vw * 23.78 / 375);
  margin: 0;
}

.top-ai-out-drection {
  display: flex;
  justify-content: center;
  margin-top: calc(100vh * 22 / 812);
}

.top-ai-bg-contanier-text {
  position: absolute;
  top: calc(100vh * 33 / 812);
  left: calc(100vw * 87 / 375);
  font-family: 'PangMenZhengDaoBiaoTiTiMianFeiBan', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 400;
  line-height: calc(100vw * 21.2 / 375);
  color: rgba(255, 255, 255, 1);
}

.top-ai-bg-contanier-image {
  position: absolute;
  right: calc(100vw * 11 / 375);
  top: calc(100vh * -74 / 812);
  width: calc(100vw * 108 / 375);
  height: calc(100vh * 138 / 812);
  background-image: url('@/assets/aiuserpic.png');
  background-size: cover; /* 等比缩放覆盖 */
  background-position: center; /* 居中显示 */
  background-repeat: no-repeat;
}

.center-section {
  margin-top: calc(100vh * 12 / 812);
  margin-bottom: calc(100vh * 18 / 812);
  margin-left: calc(100vw * 20 / 375);
  margin-right: calc(100vw * 36 / 375);
  display: flex;
  flex-direction: column;
  gap: calc(100vh * 5 / 812);
}

.message-box {
  display: inline-flex;
  align-items: center;
  padding: calc(100vh * 10 / 812) calc(100vw * 10 / 375);
  border-radius: 0px calc(100vw * 20 / 375) calc(100vw * 20 / 375) calc(100vw * 20 / 375);
  background: rgba(253, 61, 104, 0.1);
  /* backdrop-filter: blur(calc(100vw * 8 / 375)); */
  font-family: 'OPPOSansRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 18.47 / 375);
  letter-spacing: 0;
  color: rgba(94, 69, 58, 1);
  width: fit-content; /* Wrap width to content */
  justify-content: flex-start; /* Align content to left */
}

.bottom-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0; /* ⚡ 关键 */
}

.bottom-scroll {
  flex: 1;
  min-height: 0; /* ⚡ 关键 */
  overflow-y: auto;
  padding: calc(100vh * 20 / 812) 0 calc(100vh * 90 / 812) 0;
  display: flex;
  flex-direction: column;
  gap: calc(100vh * 16 / 812);
}

/* Optional: hide scrollbar */
.bottom-scroll::-webkit-scrollbar {
  display: none;
}

.bottom-scroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.chat-item {
  display: flex;
  flex-direction: column;
}

.chat-choose {
  display: flex;
  flex-direction: column;
  gap: calc(100vh * 13 / 812);
}

.chat-time {
  text-align: center;
  font-family: 'SFProDisplayRegular', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 400;
  line-height: calc(100vw * 19.09 / 375);
  letter-spacing: 0;
  color: rgba(0, 0, 0, 0.6);
}

.chat-content {
  display: flex;
  align-items: flex-start;
  gap: calc(100vw * 12 / 375);
  margin-left: calc(100vw * 20 / 375);
  margin-right: calc(100vw * 46 / 375);
}

.chat-content-rigth {
  display: flex;
  align-items: flex-start;
  justify-content: end;
  gap: calc(100vw * 12 / 375);
  margin-left: calc(100vw * 46 / 375);
  margin-right: calc(100vw * 20 / 375);
}

.chat-avatar {
  width: calc(100vw * 44 / 375);
  height: calc(100vw * 44 / 375);
  border-radius: 50%;
}

.chat-avatar-rigth-border-box {
  flex-shrink: 0;
  /* background: linear-gradient(90deg, rgba(165, 237, 57, 1) 0%, rgba(48, 234, 255, 1) 100%); */
  border-radius: 50%; /* fully circular */
  display: flex;
  justify-content: center;
}

.chat-avatar-rigth {
  width: calc(100vw * 44 / 375);
  height: calc(100vw * 44 / 375);
  border-radius: 50%; /* fully circular */
  /* padding: calc(100vh * 1 / 812) calc(100vw * 1 / 375); */
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
}

/* Ensure avatar images fit inside the circular container and any overflow is hidden */
.chat-avatar img,
.chat-avatar-rigth img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* ensure image fills container */
  border-radius: 50%;
  overflow: hidden;
}

.chat-message {
  border-radius: 0px calc(100vw * 24 / 375) calc(100vw * 24 / 375) calc(100vw * 24 / 375);
  background: rgba(242, 242, 242, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: calc(100vh * 13 / 812) calc(100vw * 16 / 375);
  font-family: 'SFProDisplayRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 16.71 / 375);
  letter-spacing: 0;
  color: rgb(0, 0, 0);
}

.chat-message-rigth {
  border-radius: calc(100vw * 24 / 375) 0px calc(100vw * 24 / 375) calc(100vw * 24 / 375);
  background: rgba(185, 100, 255, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: calc(100vh * 13 / 812) calc(100vw * 16 / 375);
  font-family: 'SFProDisplayRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 16.71 / 375);
  letter-spacing: 0;
  color: rgb(255, 255, 255);
}

.bottom-input-outbox {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: calc(100vh * 90 / 812);
  background: rgba(255, 255, 255, 1);
  box-shadow:inset 0px calc(100vw * 1 / 375) 0px  rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: start;
  z-index: 10;
}

.bottom-input {
  height: calc(100vh * 46 / 812);
  border-radius: calc(100vw * 40 / 375);
  background: rgba(242, 242, 242, 1);
  display: flex;
  align-items: center;
  margin: calc(100vh * 8 / 812) calc(100vw * 20 / 375) 0;
  padding: 0 calc(100vw * 16 / 375);
  gap: calc(100vw * 10 / 375);
  box-sizing: border-box;
  z-index: 10;
}

.bottom-input input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  /* font-family: 'OPPOSansRegular', sans-serif; */
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 16.71 / 375);
  letter-spacing: 0;
  color: #000;
}

.bottom-input input::placeholder {
  color: rgba(0, 0, 0, 0.4);
}

.send-icon {
  width: calc(100vw * 32 / 375);
  height: calc(100vw * 32 / 375);
  /* border-radius: 50%;
  background: linear-gradient(180deg, rgba(255, 0, 128, 1) 0%, rgba(236, 86, 184, 1) 100%); */
  /* cursor: pointer; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.send-icon img {
  width: calc(100vw * 32 / 375);
  height: calc(100vw * 32 / 375);
}
</style>
