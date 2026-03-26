<template>
  <div class="page">
    <!-- <div class="aiusermodel"></div>
    <div class="aichatmodel"></div> -->
    <div class="page-container">
      <!-- top -->
      <div class="top-bgc">
        <div class="top-section">
          <BackButton />
          <p>Glimd AI</p>
        </div>
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
                    <div class="chat-avatar-rigth">
                      <img :src="currentUserStore.currentUser.avator" alt="AI Avatar" />
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
  "How can I make a better dance video?",
  "Where can I find popular dance BGM?",
  "Which dance style is good for beginners to learn?"
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
  { sendId: '0', time: getFirstTime(), message: 'Hi there! I\'m Glimd, your AI buddy for all things fun and.'},
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
  background: linear-gradient(0deg, rgba(24, 24, 24, 1) 0%, rgba(53, 35, 50, 1) 100%);
}

.page-container {
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
  font-family: 'PangMenZhengDaoBiaoTiTiMianFeiBan', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 400;
  line-height: calc(100vw * 21.2 / 375);
  letter-spacing: 0;
  color: rgb(255, 255, 255);
  margin: 0;
}

.center-section {
  margin-bottom: calc(100vh * 8 / 812);
  margin-left: calc(100vw * 20 / 375);
  margin-right: calc(100vw * 106 / 375);
  display: flex;
  flex-direction: column;
  gap: calc(100vh * 8 / 812);
}

.message-box {
  display: inline-flex;
  align-items: center;
  padding: calc(100vh * 9 / 812) calc(100vw * 10 / 375);
  border-radius: calc(100vw * 32 / 375);
  background: rgba(13, 8, 13, 0.2);
  backdrop-filter: blur(calc(100vw * 8 / 375));
  font-family: 'SourceHanSansRegular', sans-serif;
  font-size: calc(100vw * 12 / 375);
  font-weight: 400;
  line-height: calc(100vw * 17.38 / 375);
  letter-spacing: 0;
  color: rgba(255, 255, 255, 1);
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
  padding: calc(100vh * 36 / 812) 0 calc(100vh * 90 / 812) 0;
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
  gap: calc(100vh * 9 / 812);
}

.chat-time {
  text-align: center;
  font-family: 'SourceHanSansRegular', sans-serif;
  font-size: calc(100vw * 16 / 375);
  font-weight: 400;
  line-height: calc(100vw * 23.17 / 375);
  letter-spacing: 0;
  color: rgb(255, 255, 255, 0.6);
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

.chat-avatar-rigth {
  width: calc(100vw * 44 / 375);
  height: calc(100vw * 44 / 375);
  flex-shrink: 0;
  border-radius: 50%; /* fully circular */
  border: calc(100vw * 2 / 375) solid rgba(255, 255, 255, 0.6);
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
  border-radius: calc(100vw * 20 / 375);
  background: linear-gradient(270deg, rgba(255, 0, 128, 1) 0%, rgba(236, 86, 184, 1) 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: calc(100vh * 10 / 812) calc(100vw * 19 / 375);
  font-family: 'SourceHanSansRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 20.27 / 375);
  letter-spacing: 0;
  color: rgba(255, 255, 255, 1);
}

.chat-message-rigth {
  border-radius: calc(100vw * 20 / 375);
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: calc(100vh * 10 / 812) calc(100vw * 19 / 375);
  font-family: 'SourceHanSansRegular', sans-serif;
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 20.27 / 375);
  letter-spacing: 0;
  color: rgb(255, 255, 255);
}

.bottom-input {
  position: absolute;
  left: calc(100vw * 20 / 375);
  right: calc(100vw * 20 / 375);
  bottom: calc(100vh * 37 / 812);
  height: calc(100vh * 46 / 812);
  border-radius: calc(100vw * 40 / 375);
  background: rgba(62, 57, 63, 1);
  backdrop-filter: blur(calc(100vw * 32 / 375));
  display: flex;
  align-items: center;
  padding: 0 0 0 calc(100vw * 16 / 375);
  gap: calc(100vw * 16 / 375);
  box-sizing: border-box;
}

.bottom-input input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  /* font-family: 'SourceHanSansRegular', sans-serif; */
  font-size: calc(100vw * 14 / 375);
  font-weight: 400;
  line-height: calc(100vw * 20.27 / 375);
  letter-spacing: 0;
  color: #fff;
}

.bottom-input input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.send-icon {
  width: calc(100vw * 46 / 375);
  height: calc(100vw * 46 / 375);
  border-radius: 50%;
  background: linear-gradient(180deg, rgba(255, 0, 128, 1) 0%, rgba(236, 86, 184, 1) 100%);
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