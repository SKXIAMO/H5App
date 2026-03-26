<template>
  <div class="agreement-page">

    <!-- Top Header -->
    <div class="header">
      <BackButton />
      <div class="title">User Agreement</div>
    </div>

    <!-- Content -->
    <div class="agreement-content">

      <h1>Glimd User Agreement</h1>

      <p class="update-time">Last updated: 2026</p>

      <p>
        Welcome to <strong>Glimd</strong>! Before using Glimd’s social dance community, AI assistant, and video sharing features, please read this User Agreement carefully. By accessing or using Glimd, you agree to comply with this agreement and all applicable laws.
      </p>

      <h2>1. Acceptance of Terms</h2>

      <p>
        By creating an account or using Glimd, you confirm that you have read, understood, and agreed to comply with this User Agreement and all applicable laws.
      </p>

      <h2>2. Description of Services</h2>

      <p>
        Glimd provides a platform for dancers worldwide, including but not limited to:
      </p>

      <ul>
        <li>A global trendy dance community for interaction and inspiration</li>
        <li>AI-assisted guidance for dance practice and skill improvement</li>
        <li>Video capture, upload, and sharing of daily practice, performances, and tutorials</li>
      </ul>

      <p>
        Glimd reserves the right to modify, suspend, or discontinue any part of the services at any time without prior notice.
      </p>

      <h2>3. User Accounts</h2>

      <p>
        Some features may require you to create an account. You agree to provide accurate and complete information and to keep your account credentials secure.
      </p>

      <p>
        You are responsible for all activities conducted under your account.
      </p>

      <h2>4. User Conduct</h2>

      <p>
        While using Glimd, you agree not to:
      </p>

      <ul>
        <li>Violate any applicable laws or regulations</li>
        <li>Harass, abuse, or harm other users</li>
        <li>Upload illegal, harmful, or offensive content</li>
        <li>Interfere with platform security or attempt unauthorized access</li>
      </ul>

      <h2>5. Virtual Content and Purchases</h2>

      <p>
        Glimd may offer virtual items such as dance course credits or rewards for use within the platform. These items have no real-world monetary value and cannot be redeemed for cash.
      </p>

      <p>
        All purchases are final unless otherwise required by law.
      </p>

      <h2>6. Privacy and Data</h2>

      <p>
        Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
      </p>

      <h2>7. Content Upload</h2>

      <p>
        You may upload videos of dance practice, performances, or tutorials to document your growth and share creativity.
      </p>

      <p>
        All uploaded content must comply with this agreement and applicable laws. Glimd reserves the right to remove or restrict access to inappropriate content.
      </p>

      <h2>8. Termination and Suspension</h2>

      <p>
        Glimd reserves the right to suspend or terminate your account or access to services if you violate this agreement or engage in harmful activities.
      </p>

      <h2>9. Disclaimer</h2>

      <p>
        Glimd services are provided “as is” and “as available.” We do not guarantee that the services will be uninterrupted, error-free, or meet all your expectations.
      </p>

      <h2>10. Changes to This Agreement</h2>

      <p>
        Glimd may update this agreement from time to time. Continued use of the service after changes constitutes acceptance of the updated terms.
      </p>

      <h2>11. Contact Us</h2>

      <p>
        If you have any questions about this agreement, please contact us through the in-app support channels.
      </p>

    </div>

  </div>
</template>

<script setup>
import BackButton from '@/components/back.vue'
</script>

<style scoped>

.agreement-page{
  width:100%;
  height:100vh;
  display:flex;
  flex-direction:column;
  color:white;
  background: linear-gradient(0, rgba(24, 24, 24, 1) 0%, rgba(53, 35, 50, 1) 100%);
}

/* Top Header */
.header{
  display:flex;
  align-items:center;
  gap:calc(100vw * 12 / 375);
  padding:calc(100vh * 58 / 812) calc(100vw * 20 / 375) calc(100vh * 20 / 812);
}

.title{
  font-family: 'SourceHanSansBold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: bold;
  color: #fff;
}

/* Content */
.agreement-content{
  flex:1;
  overflow-y:auto;
  padding:calc(100vh * 20 / 812) calc(100vw * 20 / 375);
  /* background:rgba(0,0,0,0.45);
  backdrop-filter:blur(calc(100vw * 10 / 375));
  border-radius:calc(100vw * 20 / 375) calc(100vw * 20 / 375) 0 0; */
}

/* Main Title */
.agreement-content h1{
  font-family: 'SourceHanSansRegular', sans-serif;
  font-size:calc(100vw * 24 / 375);
  margin-bottom:calc(100vh * 10 / 812);
}

/* Update Time */
.update-time{
  opacity:0.7;
  font-family: 'SourceHanSansRegular', sans-serif;
  font-size:calc(100vw * 12 / 375);
  margin-bottom:calc(100vh * 20 / 812);
}

/* Section Titles */
.agreement-content h2{
  font-family: 'SourceHanSansRegular', sans-serif;
  font-size:calc(100vw * 18 / 375);
  margin-top:calc(100vh * 24 / 812);
  margin-bottom:calc(100vh * 10 / 812);
  color:rgba(236, 86, 184, 1);
}

/* Paragraphs */
.agreement-content p{
  font-family: 'SourceHanSansRegular', sans-serif;
  font-size:calc(100vw * 14 / 375);
  line-height:1.7;
  margin-bottom:calc(100vh * 10 / 812);
}

/* Lists */
.agreement-content ul{
  padding-left:calc(100vw * 18 / 375);
}

.agreement-content li{
  margin-bottom:calc(100vh * 6 / 812);
  font-family: 'SourceHanSansRegular', sans-serif;
  font-size:calc(100vw * 14 / 375);
}

</style>