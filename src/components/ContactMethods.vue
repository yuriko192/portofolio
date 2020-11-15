<template>
  <div class="contactmethod">
    <div class="item">
      <line-icon></line-icon>
    </div>
    <div class="item">
      <telegram-icon></telegram-icon>
    </div>
    <div class="item">
      <reddit-icon></reddit-icon>
    </div>
    <div class="item">
      <whatsapp-icon></whatsapp-icon>
    </div>
    <div class="item">
      <gmail-icon></gmail-icon>
    </div>
  </div>
</template>

<script>
import gmailIcon from '@/assets/gmail'
import lineIcon from '@/assets/line'
import redditIcon from '@/assets/reddit'
import telegramIcon from '@/assets/telegram'
import whatsappIcon from '@/assets/whatsapp'
export default {
  name: "ContactMethods",
  components: {
    gmailIcon,
    lineIcon,
    redditIcon,
    telegramIcon,
    whatsappIcon
  },
}
</script>

<style scoped lang=scss>
.contactmethod {
  $text-col : $bg-col;
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
  .item{
    svg{
      fill: $text-col;
      width: $icon-size;
      margin: 0;
    }
  }
}
</style>