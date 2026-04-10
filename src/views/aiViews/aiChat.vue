<template>
  <div class="page">
    <!-- <div class="aiusermodel"></div>
    <div class="aichatmodel"></div> -->
    <div class="page-container">
      <!-- top -->
      <div class="top-bgc">
        <div class="top-section">
          <BackButton />
          <p>Tiga AI</p>
        </div>
        <div class="top-ai-out-drection">
          <div class="top-ai-bg-contanier">
            <!-- <div class="top-ai-bg-contanier-text">Tiga AI</div> -->
            <div class="top-ai-bg-contanier-image"></div>
            <!-- center -->
            <div class="center-section">
              <div
                v-for="(item, index) in messages"
                :key="index"
                class="message-box"
                @click="handleMessageClick(item)"
              >
                <span>{{ item }}</span>
              </div>
            </div>
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
    <div class="bottom-input">
      <input type="text" placeholder="Say something" v-model="chatInput" />
      <div class="send-icon" @click="sendMessage" >
        <img src="@/assets/commentsend.png" alt="Send" />
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

const formatTime12 = (date) => {
  let hours = date.getHours()
  let minutes = date.getMinutes()
  hours = hours % 12
  if (hours === 0) hours = 12
  return `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}`
}

const messages = ref([
  'I\'m feeling great today.',
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
  { sendId: '0', time: getFirstTime(), message: 'Hi there! I\'m Tiga, your AI buddy for all things fun and.'},
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

  } catch (err) {
    sendShowLoadingToIOS(false)
    sendShowToastToIOS('Network error')
  }
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

  } catch (err) {
    sendShowLoadingToIOS(false)
    sendShowToastToIOS('Network error')
  }
}
</script>

<style scoped>
.page {
  width: 100vw;
  height: 100vh;
  overflow: hidden; /* prevent scrolling */
  background: url('@/assets/pagebgc.png') no-repeat center center;
  background-size: cover;
}

.page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  /* justify-content: center; */
}

.top-bgc {
  width: 100%;
  /* height: calc(100vh * 281 / 812);
  background-image: url('@/assets/aichattop.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; */
  display: flex;
  flex-direction: column;
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
  margin-top: calc(100vh * 56 / 812);
  margin-left: calc(100vw * 20 / 375);
  z-index: 100;
  display: flex;
  align-items: center;
  gap: calc(100vh * 14 / 812);
}

.top-section p {
  font-family: 'ArchivoNarrowBold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  line-height: calc(100vw * 26.94 / 375);
  color: #fff;
  margin: 0;
}

.top-ai-out-drection {
  display: flex;
  justify-content: center;
  margin-top: calc(100vh * 33 / 812);
}

.top-ai-bg-contanier {
  position: relative;
  width: calc(100vw * 335 / 375);
  height: calc(100vh * 149 / 812);
  background-image: url('@/assets/bottomfirstbgi.png');
  background-size: cover; /* 等比缩放覆盖 */
  background-position: center; /* 居中显示 */
  background-repeat: no-repeat;
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
  right: calc(100vw * 0 / 375);
  bottom: calc(100vh * 0 / 812);
  width: calc(100vw * 145 / 375);
  height: calc(100vh * 202 / 812);
  background-image: url('@/assets/aiuserpic.png');
  background-size: cover; /* 等比缩放覆盖 */
  background-position: center; /* 居中显示 */
  background-repeat: no-repeat;
}

.center-section {
  margin-top: calc(100vh * 21 / 812);
  /* margin-bottom: calc(100vh * 21 / 812); */
  margin-left: calc(100vw * 16 / 375);
  margin-right: calc(100vw * 16 / 375);
  display: flex;
  flex-direction: column;
  gap: calc(100vh * 10 / 812);
}

.message-box {
  display: inline-flex;
  align-items: center;
  padding: calc(100vh * 6 / 812) calc(100vw * 13 / 375);
  border-radius: calc(100vw * 10 / 375) 0px calc(100vw * 10 / 375) calc(100vw * 10 / 375);
  background: rgba(255, 255, 255, 0.5);
  /* backdrop-filter: blur(calc(100vw * 8 / 375)); */
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size: calc(100vw * 12 / 375);
  font-weight: 400;
  line-height: calc(100vw * 16.16 / 375);
  letter-spacing: 0;
  color: rgb(255, 255, 255);
  width: fit-content; /* Wrap width to content */
  justify-content: flex-start; /* Align content to left */
}

.bottom-section {
  margin-top: calc(100vh * 30 / 812);
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0; /* ⚡ 关键 */
  /* border-radius: calc(100vw * 30 / 375) calc(100vw * 30 / 375) 0px 0px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px calc(100vw * 4 / 375)  rgba(0, 0, 0, 0.1); */
}

.bottom-scroll {
  flex: 1;
  min-height: 0; /* ⚡ 关键 */
  overflow-y: auto;
  padding: 0 0 calc(100vh * 90 / 812) 0;
  display: flex;
  flex-direction: column;
  gap: calc(100vh * 12 / 812);
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
  gap: calc(100vh * 12 / 812);
}

.chat-time {
  text-align: center;
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 400;
  line-height: calc(100vw * 21.55 / 375);
  letter-spacing: 0;
  color: rgb(255, 255, 255);
}

.chat-content {
  display: flex;
  align-items: flex-start;
  gap: calc(100vw * 12 / 375);
  margin-left: calc(100vw * 20 / 375);
  margin-right: calc(100vw * 96 / 375);
}

.chat-content-rigth {
  display: flex;
  align-items: flex-start;
  justify-content: end;
  gap: calc(100vw * 12 / 375);
  margin-left: calc(100vw * 96 / 375);
  margin-right: calc(100vw * 20 / 375);
}

.chat-avatar {
  width: calc(100vw * 44 / 375);
  height: calc(100vw * 44 / 375);
  border-radius: 50%;
}

.chat-avatar-rigth-border-box {
  flex-shrink: 0;
  background: rgba(142, 108, 219, 1);
  border-radius: 50%; /* fully circular */
  display: flex;
  justify-content: center;
}

.chat-avatar-rigth {
  width: calc(100vw * 44 / 375);
  height: calc(100vw * 44 / 375);
  border-radius: 50%; /* fully circular */
  padding: calc(100vh * 1 / 812) calc(100vw * 1 / 375);
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
  border-radius: 0px calc(100vw * 10 / 375) calc(100vw * 10 / 375) calc(100vw * 10 / 375);
  background: rgba(142, 108, 219, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: calc(100vh * 10 / 812) calc(100vw * 10 / 375);
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size: calc(100vw * 12 / 375);
  font-weight: 400;
  line-height: calc(100vw * 16.16 / 375);
  letter-spacing: 0;
  color: rgb(255, 255, 255);
}

.chat-message-rigth {
  border-radius: calc(100vw * 10 / 375) 0px calc(100vw * 10 / 375) calc(100vw * 10 / 375);
  background: rgba(244, 142, 90, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: calc(100vh * 10 / 812) calc(100vw * 10 / 375);
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size: calc(100vw * 12 / 375);
  font-weight: 400;
  line-height: calc(100vw * 16.16 / 375);
  letter-spacing: 0;
  color: rgb(255, 255, 255);
}

.bottom-input {
  position: absolute;
  left: calc(100vw * 20 / 375);
  right: calc(100vw * 20 / 375);
  bottom: calc(100vh * 29 / 812);
  height: calc(100vh * 54 / 812);
  border-radius: calc(100vw * 40 / 375);
  background: rgba(244, 142, 90, 1);
  backdrop-filter: blur(calc(100vw * 32 / 375));
  display: flex;
  align-items: center;
  padding: 0 calc(100vw * 5 / 375) 0 calc(100vw * 16 / 375);
  gap: calc(100vw * 16 / 375);
  box-sizing: border-box;
}

.bottom-input input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  /* font-family: 'OPPOSansRegular', sans-serif; */
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 18.86 / 375);
  letter-spacing: 0;
  color: #fff;
}

.bottom-input input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.send-icon {
  width: calc(100vw * 44 / 375);
  height: calc(100vw * 44 / 375);
  border-radius: 50%;
  background: #fff;
  /* cursor: pointer; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.send-icon img {
  width: calc(100vw * 22 / 375);
  height: calc(100vw * 22 / 375);
}
</style>