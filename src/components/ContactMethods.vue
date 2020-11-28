<template>
  <div class="contactmethod">
    <a href="https://line.me/ti/p/ivan9826" class="contact-btn">
      <LineIcon></LineIcon>
    </a>
    <a href="https://t.me/yuriko192" class="contact-btn">
      <TelegramIcon></TelegramIcon>
    </a>
    <a href="https://github.com/yuriko192" class="contact-btn">
      <GitHubIcon></GitHubIcon>
    </a>
    <a href="https://api.whatsapp.com/send/?phone=62895375547897&text&app_absent=0" class="contact-btn">
      <WhatsAppIcon></WhatsAppIcon>
    </a>
    <a href="mailto:ivanwijaya19@gmail.com" class="contact-btn">
      <GmailIcon></GmailIcon>
    </a>
  </div>
</template>

<script>
import {GmailIcon, LineIcon, GitHubIcon, TelegramIcon, WhatsAppIcon} from 'vue-simple-icons';

export default {
  name: "ContactMethods",
  components: {
    GmailIcon,
    LineIcon,
    GitHubIcon,
    TelegramIcon,
    WhatsAppIcon
  },
}
</script>

<style scoped lang=scss>
.contactmethod {
  $text-col: $bg-col;
  $text-col-2: $bg-tert;
  display: flex;
  justify-content: space-around;
  margin: 10px 0;
  width: 100%;
  background-color: $primary;
  padding: 0;
  .contact-btn {
    margin: 0;
    padding: 10px 15px;
    fill: $text-col;
    border-radius: .2rem;
    transition: all 100ms;
    &:hover {
      fill: $primary;
      background-color: $text-col;
    }
    svg {
      width: $icon-size;
      height: $icon-size;
      margin: 0;
    }
  }

}


</style>