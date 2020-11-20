<template>
  <div class="contactmethod">
    <a href="https://line.me/ti/p/ivan9826" class="contact-btn">
      <line-icon></line-icon>
    </a>
    <a href="https://t.me/yuriko192" class="contact-btn">
      <telegram-icon></telegram-icon>
    </a>
    <a href="https://github.com/yuriko192" class="contact-btn">
      <github-icon></github-icon>
    </a>
    <a href="https://api.whatsapp.com/send/?phone=62895375547897&text&app_absent=0" class="contact-btn">
      <whatsapp-icon></whatsapp-icon>
    </a>
    <a href="mailto:ivanwijaya19@gmail.com" class="contact-btn">
      <gmail-icon></gmail-icon>
    </a>
  </div>
</template>

<script>
import gmailIcon from '@/assets/gmail'
import lineIcon from '@/assets/line'
import githubIcon from '@/assets/github'
import telegramIcon from '@/assets/telegram'
import whatsappIcon from '@/assets/whatsapp'

export default {
  name: "ContactMethods",
  components: {
    gmailIcon,
    lineIcon,
    githubIcon,
    telegramIcon,
    whatsappIcon
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