<template>
  <div class="contactmethod">
    <div class="item">
      <a href="https://line.me/ti/p/ivan9826">
        <line-icon></line-icon>
      </a>
    </div>
    <div class="item">
      <a href="https://t.me/yuriko192">
        <telegram-icon></telegram-icon>
      </a>
    </div>
    <div class="item">
      <a href="https://github.com/yuriko192">
        <github-icon></github-icon>
      </a>
    </div>
    <div class="item">
      <a href="https://api.whatsapp.com/send/?phone=62895375547897&text&app_absent=0">
        <whatsapp-icon></whatsapp-icon>
      </a>
    </div>
    <div class="item">
      <a href="mailto:ivanwijaya19@gmail.com">
        <gmail-icon></gmail-icon>
      </a>
    </div>
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
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto;
  justify-items: center;
  margin: 10px 0;
  width: 100%;
  background-color: $primary;
  justify-content: space-around;
  color: $text-col;

  * {
    color: $text-col;
  }

  .double-width {
    grid-column: span 2 / auto;
  }

  .item {
    svg {
      fill: $text-col;
      width: $icon-size;
      margin: 0;
    }
  }
}
</style>