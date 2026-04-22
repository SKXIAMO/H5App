<template>
  <div class="agreement-page">

    <!-- header -->
    <div class="header">
      <BackButton />
      <div class="title">Privacy Policy</div>
    </div>

    <!-- content -->
    <div class="agreement-content">

      <h1>Tiga Privacy Policy</h1>
      <p class="update-time">Last updated: April, 2026</p>

      <p>
        Welcome to <strong>Tiga</strong>. Tiga is a platform for vloggers and creators to share life moments, passions, and stories, discover community content, and interact through AI-powered chat and social features. This Privacy Policy explains how we collect, use, disclose, store, and protect your information when you use the Tiga app, website, and related services.
      </p>

      <h2>1. Information We Collect</h2>

      <p>We may collect the following categories of information to operate and improve Tiga:</p>

      <ul>
        <li>Account information such as your username, profile name, profile photo, email address, login identifiers, and account preferences</li>
        <li>Content and social data such as videos, comments, messages, likes, follows, uploads, and other information you create, submit, or share on Tiga</li>
        <li>AI interaction data such as prompts, chat content, feedback, and related usage information when you use AI-powered features</li>
        <li>Device and technical information such as device model, operating system, language, IP address, app version, identifiers, and diagnostic data</li>
        <li>Transaction-related information when you make purchases, such as product identifiers, purchase status, and receipt or order related metadata provided through payment channels</li>
      </ul>

      <h2>2. How We Use Your Information</h2>

      <p>We use your information for purposes such as:</p>

      <ul>
        <li>Providing, maintaining, and improving Tiga’s creator, community, and AI chat features</li>
        <li>Displaying your profile and content to other users according to your activity and settings</li>
        <li>Personalizing feeds, recommendations, search results, and user experience</li>
        <li>Processing purchases, virtual items, subscriptions, and related account support</li>
        <li>Monitoring safety, preventing abuse, investigating fraud, and enforcing our policies</li>
        <li>Communicating service notices, updates, support messages, and operational information</li>
      </ul>

      <h2>3. Sharing Your Information</h2>

      <p>We do not sell your personal information for money. We may share information in limited circumstances, including:</p>

      <ul>
        <li>With service providers, vendors, and infrastructure partners who help us operate hosting, analytics, moderation, customer support, AI, payment, and security services</li>
        <li>With other users when you publish content, create a public profile, comment, like, message, or otherwise interact through community features</li>
        <li>When required by law, legal process, or valid governmental request</li>
        <li>To protect the rights, safety, property, users, systems, and operations of Tiga or others, including fraud and abuse prevention</li>
        <li>In connection with a merger, financing, acquisition, reorganization, sale of assets, or similar business transaction</li>
      </ul>

      <h2>4. Data Security</h2>

      <p>We use reasonable technical, administrative, and organizational safeguards designed to protect personal information against unauthorized access, loss, misuse, alteration, or disclosure. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.</p>

      <h2>5. Data Retention</h2>

      <p>We retain information for as long as reasonably necessary to provide the service, maintain legitimate business records, resolve disputes, enforce our agreements, comply with legal obligations, and protect the safety and integrity of the platform. Retention periods may vary depending on the type of data and the reason it was collected.</p>

      <h2>6. Children’s Privacy</h2>

      <p>Tiga is not intended for children below the minimum age required by applicable law in the relevant jurisdiction. We do not knowingly collect personal information from children where prohibited by law. If you believe a child has provided personal information in violation of applicable law, please contact us so we can review and take appropriate action.</p>

      <h2>7. Your Rights</h2>

      <p>Depending on your location and applicable law, you may have rights such as:</p>

      <ul>
        <li>Request access to the personal information we hold about you</li>
        <li>Request correction, update, deletion, or export of certain information</li>
        <li>Object to or restrict certain processing where permitted by law</li>
        <li>Withdraw consent where processing is based on consent, without affecting prior lawful processing</li>
      </ul>

      <h2>8. Changes to This Policy</h2>

      <p>We may update this Privacy Policy from time to time to reflect changes in the service, legal requirements, or our data practices. When updates become effective, your continued use of Tiga after the revised policy is posted will indicate your acceptance of the updated policy to the extent permitted by law.</p>

      <h2>9. Contact Us</h2>

      <p>If you have questions, requests, or concerns about this Privacy Policy or our handling of personal information, please contact us through the support or contact method made available within the Tiga app.</p>

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
  gap:calc(100vw * 16 / 375);
  padding:calc(100vh * 58 / 812) calc(100vw * 20 / 375) calc(100vh * 20 / 812);
}

.title{
  font-family: 'ArchivoNarrowBold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  line-height: calc(100vw * 26.94 / 375);
  color: rgb(255, 255, 255);
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
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size:calc(100vw * 24 / 375);
  margin-bottom:calc(100vh * 10 / 812);
  color: #fff;
}

/* 更新时间 */
.update-time{
  opacity:0.7;
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size:calc(100vw * 12 / 375);
  margin-bottom:calc(100vh * 20 / 812);
  color: #fff;
}

/* 小标题 */
.agreement-content h2{
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size:calc(100vw * 18 / 375);
  margin-top:calc(100vh * 24 / 812);
  margin-bottom:calc(100vh * 10 / 812);
  color:rgba(142, 108, 219, 1);
}

/* 正文 */
.agreement-content p{
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size:calc(100vw * 14 / 375);
  line-height:1.7;
  margin-bottom:calc(100vh * 10 / 812);
  color: #fff;
}

/* 列表 */
.agreement-content ul{
  padding-left:calc(100vw * 18 / 375);
  color: #fff;
}

.agreement-content li{
  margin-bottom:calc(100vh * 6 / 812);
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size:calc(100vw * 14 / 375);
  color: #fff;
}
</style>
