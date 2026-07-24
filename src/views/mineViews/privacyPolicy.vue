<template>
  <div class="agreement-page">

    <!-- header -->
    <div class="header">
      <BackButton />
      <div class="title">Privacy Policy</div>
    </div>

    <!-- content -->
    <div class="agreement-content">

      <h1>Tenao Privacy Policy</h1>
      <p class="update-time">Last updated: July 23, 2026</p>

      <p>
        Welcome to <strong>Tenao</strong>, a community for yoga enthusiasts to connect, share their practice, explore yoga videos, and receive AI-powered suggestions. This Privacy Policy explains what information we collect, how we use and protect it, and the choices available to you when you use Tenao.
      </p>

      <h2>1. Information We Collect</h2>

      <p>We may collect the following information when you use Tenao:</p>

      <ul>
        <li><strong>Account information:</strong> your username, profile photo, account identifier, and other details you choose to provide.</li>
        <li><strong>User content:</strong> yoga posts, photos, videos, captions, comments, likes, messages, and other content you create or share.</li>
        <li><strong>AI feature data:</strong> photos, videos, prompts, and related information you voluntarily submit to receive yoga pose or practice suggestions.</li>
        <li><strong>Usage information:</strong> the features you use, content you view, searches, interactions, and activity within the community.</li>
        <li><strong>Device and technical information:</strong> device model, operating system, app version, language, IP address, and diagnostic or log information.</li>
        <li><strong>Transaction information:</strong> records relating to purchases, virtual items, or paid features. Payment credentials may be processed by the applicable app store or payment provider and are not stored directly by Tenao.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>

      <p>We use information to operate and improve Tenao, including to:</p>

      <ul>
        <li>Create and manage your account and provide the features you request.</li>
        <li>Publish your posts and enable likes, comments, messages, follows, sharing, and other community interactions.</li>
        <li>Process content submitted to AI features and return personalized yoga suggestions.</li>
        <li>Recommend relevant yoga videos, posts, and community content.</li>
        <li>Process purchases, maintain transaction records, and provide purchased features or virtual items.</li>
        <li>Detect fraud, abuse, harmful content, and violations of our User Agreement.</li>
        <li>Maintain app performance, troubleshoot issues, and develop new features.</li>
        <li>Respond to support requests and send service-related notices.</li>
      </ul>

      <h2>3. Public Content and Community Activity</h2>

      <p>
        Content you post publicly, along with your profile information and community interactions, may be visible to other Tenao users. Please avoid sharing personal or sensitive information that you do not want others to see. Private messages are intended only for their participants, subject to necessary safety, security, and legal processing.
      </p>

      <h2>4. How We Share Information</h2>

      <p>We do not sell your personal information. We may share information:</p>

      <ul>
        <li>With service providers that support hosting, storage, content delivery, AI processing, analytics, customer support, security, and payments.</li>
        <li>When you direct us to share information or use a feature that requires sharing.</li>
        <li>To comply with applicable law, legal process, or valid government requests.</li>
        <li>To protect the rights, safety, and integrity of Tenao, our users, or others, and to prevent fraud or abuse.</li>
        <li>In connection with a merger, acquisition, financing, reorganization, or transfer of all or part of our business, subject to appropriate safeguards.</li>
      </ul>

      <h2>5. AI-Powered Features</h2>

      <p>
        When you use an AI-powered feature, the content you submit is processed to generate suggestions about yoga poses, form, or practice. AI results may be incomplete or inaccurate and should not be treated as medical advice, diagnosis, or a substitute for guidance from a qualified professional. Do not submit content containing another person unless you have their permission.
      </p>

      <h2>6. Data Retention</h2>

      <p>
        We retain information for as long as reasonably necessary to provide Tenao, maintain security, resolve disputes, enforce our agreements, and comply with legal obligations. Retention periods vary depending on the type of information and why it was collected. Some information may remain in backups for a limited period after deletion.
      </p>

      <h2>7. Data Security</h2>

      <p>
        We use reasonable administrative, technical, and organizational safeguards designed to protect information against unauthorized access, loss, misuse, alteration, or disclosure. No method of electronic transmission or storage is completely secure, so we cannot guarantee absolute security.
      </p>

      <h2>8. Your Choices and Rights</h2>

      <p>Depending on your location and applicable law, you may be able to:</p>

      <ul>
        <li>Access, correct, or delete certain account information and content.</li>
        <li>Request a copy of personal information we hold about you.</li>
        <li>Object to or restrict certain processing where legally available.</li>
        <li>Withdraw consent where processing is based on consent.</li>
        <li>Manage device permissions, such as camera, photo library, or notification access, through your device settings.</li>
      </ul>

      <p>
        You may submit a privacy request through the support channel available in Tenao. We may need to verify your identity before completing a request.
      </p>

      <h2>9. Children’s Privacy</h2>

      <p>
        Tenao is not directed to children under the minimum age required by applicable law. We do not knowingly collect personal information from children without legally valid authorization. If you believe a child has provided personal information improperly, please contact us through the in-app support channel.
      </p>

      <h2>10. International Processing</h2>

      <p>
        Your information may be processed in countries or regions other than where you live. Where required, we use appropriate safeguards for cross-border transfers of personal information.
      </p>

      <h2>11. Changes to This Policy</h2>

      <p>
        We may update this Privacy Policy to reflect changes to Tenao, our practices, or applicable law. We will provide notice within the app or through another appropriate method when material changes are made. The “Last updated” date shows when this Policy was most recently revised.
      </p>

      <h2>12. Contact Us</h2>

      <p>
        If you have questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us through the support channel available within the Tenao app.
      </p>

    </div>
  </div>
</template>

<script setup>
import BackButton from '@/components/back.vue'
</script>

<style scoped>

p, h1 {
  margin: 0;
  padding: 0;
}

.agreement-page{
  width:100%;
  height:100vh;
  display:flex;
  flex-direction:column;
  background: url('@/assets/pagebgc.png') no-repeat center center;
  background-size: cover;
  color: #000;
}

/* 顶部 */
.header{
  display:flex;
  align-items:center;
  gap:calc(100vw * 12 / 375);
  padding:calc(100vh * 58 / 812) calc(100vw * 20 / 375) calc(100vh * 20 / 812);
}

.title{
  font-family: 'JetBrainsMonoBold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  line-height: calc(100vw * 24.8 / 375);
  color: rgba(36, 24, 24, 1);
}

/* 内容 */
.agreement-content{
  flex:1;
  overflow-y:auto;
  padding: 0 calc(100vw * 20 / 375) calc(100vh * 20 / 812) calc(100vw * 20 / 375);
  /* background:rgba(0,0,0,0.45); */
  /* backdrop-filter:blur(calc(100vw * 10 / 375)); */
  /* border-radius:calc(100vw * 20 / 375) calc(100vw * 20 / 375) 0 0; */
}

/* 标题 */
.agreement-content h1{
  font-family: 'JetBrainsMonoBold', sans-serif;
  font-size:calc(100vw * 16 / 375);
  margin-bottom:calc(100vh * 10 / 812);
}

/* 更新时间 */
.update-time{
  opacity:0.7;
  font-family: 'JetBrainsMonoRegular', sans-serif;
  font-size:calc(100vw * 12 / 375);
  margin-bottom:calc(100vh * 20 / 812);
}

/* 小标题 */
.agreement-content h2{
  font-family: 'JetBrainsMonoRegular', sans-serif;
  font-size:calc(100vw * 18 / 375);
  margin-top:calc(100vh * 24 / 812);
  margin-bottom:calc(100vh * 10 / 812);
  color:rgba(48, 234, 255, 1);
}

/* 正文 */
.agreement-content p{
  font-family: 'JetBrainsMonoRegular', sans-serif;
  font-size:calc(100vw * 14 / 375);
  line-height:1.7;
  margin-bottom:calc(100vh * 10 / 812);
}

/* 列表 */
.agreement-content ul{
  padding-left:calc(100vw * 18 / 375);
}

.agreement-content li{
  margin-bottom:calc(100vh * 6 / 812);
  font-family: 'JetBrainsMonoRegular', sans-serif;
  font-size:calc(100vw * 14 / 375);
}
</style>
