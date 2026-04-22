<template>
  <div class="agreement-page">

    <!-- Top Header -->
    <div class="header">
      <BackButton />
      <div class="title">User Agreement</div>
    </div>

    <!-- Content -->
    <div class="agreement-content">

      <h1>Tiga User Agreement</h1>

      <p class="update-time">Last updated: April, 2026</p>

      <p>
        Welcome to <strong>Tiga</strong>. This User Agreement governs your access to and use of the Tiga application, website, features, content, and related services. Tiga is a platform for vloggers and creators to share life moments, passions, and stories, discover other creators, and interact through community features and AI-powered chat. By creating an account, accessing, or using Tiga, you agree to be bound by this User Agreement and all applicable laws and regulations.
      </p>

      <h2>1. Project Description</h2>

      <p>
        Tiga provides tools and services that allow users to create, upload, publish, browse, and interact with vlog content. The platform is designed for creators and viewers who want to connect through lifestyle, travel, beauty, gaming, technology, and other creator-focused content categories. Tiga may also offer AI chat and other interactive features as part of the user experience.
      </p>

      <h2>2. Core Functions</h2>

      <ul>
        <li>Upload, publish, and manage vlog and creator content</li>
        <li>Browse, follow, and interact with creators and community content</li>
        <li>Use AI-powered chat features made available within the platform</li>
        <li>Engage through likes, comments, shares, messages, and similar social features</li>
      </ul>

      <h2>3. AI Assistant</h2>

      <p>
        Tiga may provide AI-generated features, including chat, suggestions, and other automated outputs. AI responses are generated automatically and may be inaccurate, incomplete, or inappropriate in some cases. You are responsible for reviewing any AI-generated content before relying on or sharing it. Tiga does not guarantee the accuracy, availability, or suitability of AI-generated outputs for any specific purpose.
      </p>

      <h2>4. Vlog Sharing & Discovery</h2>

      <p>
        You may use Tiga to upload, view, and discover vlogs and related creator content. You retain ownership of content you create and submit, but you grant Tiga the rights necessary to host, store, display, reproduce, distribute, and promote that content for the operation, improvement, and promotion of the service, subject to applicable law and our policies.
      </p>

      <h2>5. User Responsibilities</h2>

      <p>
        You agree to use Tiga in a lawful and respectful manner. You must provide accurate information where required, maintain the security of your account, and comply with this User Agreement, community rules, and all applicable laws. You may not use Tiga to harass others, infringe intellectual property rights, distribute unlawful content, attempt unauthorized access, or interfere with the normal operation of the platform.
      </p>

      <h2>6. Content Guidelines</h2>

      <p>
        All videos, comments, messages, profile information, and other user content must be lawful, non-infringing, and appropriate for the Tiga community. Tiga may review, restrict, remove, disable access to, or refuse to publish content that violates this User Agreement, applicable law, intellectual property rights, or platform safety requirements.
      </p>

      <h2>7. Account Security</h2>

      <p>
        You are responsible for maintaining the confidentiality of your login credentials and for activities that occur under your account. If you believe your account has been accessed without authorization, you should promptly update your credentials and contact support through the available in-app channels.
      </p>

      <h2>8. Termination</h2>

      <p>
        Tiga may suspend, restrict, or terminate access to your account or to certain features at any time if we reasonably believe you have violated this User Agreement, created risk for other users, exposed Tiga to legal or security issues, or otherwise used the platform in an abusive or harmful manner.
      </p>

      <h2>9. Updates to Agreement</h2>

      <p>
        We may revise this User Agreement from time to time to reflect changes to the service, legal requirements, or business operations. When updates become effective, your continued use of Tiga after the updated version is published will constitute your acceptance of the revised terms, unless applicable law requires additional notice or consent.
      </p>

      <h2>10. Contact Us</h2>

      <p>
        If you have questions about this User Agreement or need assistance regarding your account or use of the service, please contact us through the support channel or contact method made available within the app.
      </p>

      <h2>11. Additional Terms</h2>

      <p>
        Certain features of Tiga, including paid services, virtual items, subscriptions, promotions, or region-specific functions, may be subject to additional terms, policies, or disclosures. In the event of a conflict between those specific terms and this User Agreement, the additional terms will control for the relevant feature to the extent permitted by law.
      </p>

    </div>

  </div>
</template>

<script setup>
import BackButton from '@/components/back.vue'
</script>

<style scoped>

p {
  margin: 0;
  padding: 0;
}

.agreement-page{
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* Use local background image */
  background: url('@/assets/pagebgc.png') no-repeat center center;
  background-size: cover;
  color: #000;
}

/* Top Header */
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

/* Content */
.agreement-content{
  flex:1;
  overflow-y:auto;
  padding: 0 calc(100vw * 20 / 375) calc(100vh * 20 / 812) calc(100vw * 20 / 375);
  /* background:rgba(0,0,0,0.45);
  backdrop-filter:blur(calc(100vw * 10 / 375));
  border-radius:calc(100vw * 20 / 375) calc(100vw * 20 / 375) 0 0; */
}

/* Main Title */
.agreement-content h1{
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size:calc(100vw * 24 / 375);
  color: #fff;
  margin-bottom:calc(100vh * 10 / 812);
}

/* Update Time */
.update-time{
  opacity:0.7;
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size:calc(100vw * 12 / 375);
  margin-bottom:calc(100vh * 20 / 812);
  color: #fff;
}

/* Section Titles */
.agreement-content h2{
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size:calc(100vw * 18 / 375);
  margin-top:calc(100vh * 24 / 812);
  margin-bottom:calc(100vh * 10 / 812);
  color:rgba(142, 108, 219, 1);
}

/* Paragraphs */
.agreement-content p{
  font-family: 'ArchivoNarrowRegular', sans-serif;
  font-size:calc(100vw * 14 / 375);
  line-height:1.7;
  margin-bottom:calc(100vh * 10 / 812);
  color: #fff;
}

/* Lists */
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
