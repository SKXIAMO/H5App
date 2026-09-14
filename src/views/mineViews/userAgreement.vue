<template>
  <div class="agreement-page">

    <!-- Top Header -->
    <div class="header">
      <BackButton theme="black" />
      <div class="title">User Agreement</div>
    </div>

    <!-- Content -->
    <div class="agreement-content">

      <h1>Barre User Agreement</h1>

      <p class="update-time">Last updated: July 23, 2026</p>

      <p>
        Welcome to <strong>Barre</strong>, a basketball community where players can share their progress, explore skill videos, connect through the game, and receive AI-powered feedback. Please read this User Agreement carefully. By accessing or using Barre, you agree to this Agreement and all applicable laws. If you do not agree, please do not use Barre.
      </p>

      <h2>1. Barre Services</h2>

      <p>
        Barre provides tools and content intended to support your basketball journey. Features may include:
      </p>

      <ul>
        <li>Creating and sharing basketball updates, photos, videos, and personal milestones.</li>
        <li>Exploring basketball videos, skills, drills, techniques, and community content.</li>
        <li>Receiving AI-powered suggestions based on content you choose to submit.</li>
        <li>Following users and interacting through likes, comments, messages, and sharing features.</li>
        <li>Accessing virtual items, paid features, or other services that may be offered in Barre.</li>
      </ul>

      <p>
        Features may change or be discontinued as Barre evolves. We may release updates that are required for continued use of some services.
      </p>

      <h2>2. Account Eligibility and Security</h2>

      <p>
        You must meet the minimum age required by applicable law to use Barre. You agree to provide accurate information, keep your account credentials secure, and promptly notify us of suspected unauthorized access. You are responsible for activity performed through your account unless applicable law provides otherwise.
      </p>

      <h2>3. Community Conduct</h2>

      <p>
        Barre is intended to be a supportive and respectful basketball community. You agree not to:
      </p>

      <ul>
        <li>Harass, threaten, discriminate against, exploit, or impersonate another person.</li>
        <li>Post illegal, hateful, violent, sexually exploitative, deceptive, or otherwise harmful content.</li>
        <li>Encourage unsafe training practices or intentionally provide dangerous instructions.</li>
        <li>Infringe intellectual property, privacy, publicity, or other rights.</li>
        <li>Send spam, manipulate engagement, distribute malware, or interfere with Barre’s operation or security.</li>
        <li>Scrape, copy, reverse engineer, or access Barre through unauthorized automated means.</li>
        <li>Use Barre for unlawful, fraudulent, or unauthorized commercial activity.</li>
      </ul>

      <h2>4. Your Content</h2>

      <p>
        You retain ownership of content you create and share. You confirm that you have all rights and permissions needed to post that content, including permission from any person shown in it.
      </p>

      <p>
        To operate Barre, you grant us a worldwide, non-exclusive, royalty-free license to host, store, reproduce, process, display, distribute, and make your content available through Barre. This license is limited to operating, improving, promoting, and protecting the service and ends when your content is deleted, except where continued retention is legally permitted or technically necessary for a limited period.
      </p>

      <p>
        You are responsible for your content. We may review, restrict, remove, or preserve content when reasonably necessary to enforce this Agreement, protect users, comply with law, or maintain the integrity of Barre.
      </p>

      <h2>5. AI-Powered Suggestions</h2>

      <p>
        Barre may analyze photos, videos, prompts, or other information you voluntarily submit to provide suggestions about basketball skills, form, or training. AI-generated results may be inaccurate, incomplete, or unsuitable for your circumstances. You should use your own judgment and stop any activity that causes pain, dizziness, or discomfort.
      </p>

      <p>
        Barre does not provide medical diagnosis, treatment, physiotherapy, or professional healthcare advice. AI suggestions and community content are for general informational purposes only and are not a substitute for advice from a qualified coach or healthcare professional. Consult an appropriate professional before beginning or changing an exercise program, particularly if you have an injury, health condition, or other concern.
      </p>

      <h2>6. Basketball Videos and Community Content</h2>

      <p>
        Basketball videos and community posts reflect the views and experience of their creators. We do not guarantee that any drill, instruction, or recommendation is safe or appropriate for every user. Participate within your abilities, use suitable equipment and surroundings, and seek qualified supervision when needed.
      </p>

      <h2>7. Purchases and Virtual Items</h2>

      <p>
        Some features or virtual items may require payment. Prices and applicable terms will be shown before purchase. Transactions may be processed by an app store or third-party payment provider and are also subject to that provider’s terms. Except where required by law or the applicable store policy, purchases and virtual items are non-transferable, have no cash value, and are not redeemable for cash.
      </p>

      <h2>8. Intellectual Property</h2>

      <p>
        Barre, including its software, visual design, branding, features, and content provided by us, is owned by or licensed to Barre and is protected by applicable intellectual property laws. Subject to this Agreement, we grant you a limited, personal, non-exclusive, non-transferable, and revocable right to use Barre for its intended purposes.
      </p>

      <h2>9. Suspension and Termination</h2>

      <p>
        You may stop using Barre at any time. We may restrict, suspend, or terminate access, or remove content, if we reasonably believe you have violated this Agreement, created risk or harm, or if action is required by law. Where appropriate, we may provide notice or an opportunity to appeal through available support channels.
      </p>

      <h2>10. Service Availability and Disclaimers</h2>

      <p>
        Barre is provided on an “as is” and “as available” basis to the extent permitted by law. We do not guarantee uninterrupted operation, error-free content, specific fitness results, or the accuracy of AI suggestions or user-generated content. Nothing in this Agreement excludes rights or remedies that cannot legally be excluded.
      </p>

      <h2>11. Limitation of Liability</h2>

      <p>
        To the maximum extent permitted by applicable law, Barre and its service providers will not be liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the service. You remain responsible for assessing your physical ability, surroundings, and the suitability of any basketball activity before participating.
      </p>

      <h2>12. Privacy</h2>

      <p>
        Our collection and use of personal information are described in the Barre Privacy Policy. By using Barre, you acknowledge that you have reviewed that Policy.
      </p>

      <h2>13. Changes to This Agreement</h2>

      <p>
        We may update this Agreement to reflect changes to Barre, our practices, or applicable law. We will provide appropriate notice of material changes. Continued use of Barre after an updated Agreement takes effect constitutes acceptance of the updated terms.
      </p>

      <h2>14. Governing Terms</h2>

      <p>
        This Agreement is governed by applicable law. Any mandatory consumer protections and rights available in your place of residence remain unaffected.
      </p>

      <h2>15. Contact Us</h2>

      <p>
        If you have questions about this Agreement or need support, please contact us through the support channel available within the Barre app.
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
  background: #fff;
  background-size: cover;
  color: #000;
}

/* Top Header */
.header{
  display:flex;
  align-items:center;
  gap:calc(100vw * 12 / 375);
  padding:calc(100vh * 58 / 812) calc(100vw * 20 / 375) calc(100vh * 20 / 812);
}

.title{
  font-family: 'SFProDisplayBold', sans-serif;
  font-size: calc(100vw * 20 / 375);
  font-weight: 700;
  line-height: calc(100vw * 24.8 / 375);
  color: rgba(36, 24, 24, 1);
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
  font-family: 'SFProDisplayBold', sans-serif;
  font-size:calc(100vw * 16 / 375);
  margin-bottom:calc(100vh * 10 / 812);
}

/* Update Time */
.update-time{
  opacity:0.7;
  font-family: 'SFProDisplayRegular', sans-serif;
  font-size:calc(100vw * 12 / 375);
  margin-bottom:calc(100vh * 20 / 812);
}

/* Section Titles */
.agreement-content h2{
  font-family: 'SFProDisplayRegular', sans-serif;
  font-size:calc(100vw * 18 / 375);
  margin-top:calc(100vh * 24 / 812);
  margin-bottom:calc(100vh * 10 / 812);
  color:rgba(48, 234, 255, 1);
}

/* Paragraphs */
.agreement-content p{
  font-family: 'SFProDisplayRegular', sans-serif;
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
  font-family: 'SFProDisplayRegular', sans-serif;
  font-size:calc(100vw * 14 / 375);
}

</style>
