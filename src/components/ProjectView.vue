<template>
  <div class="ProjectView" :style="`display: `+ onproject()">
    <h1 class="title">Speedwagon Email Client</h1>
    <img src="@/assets/SpeedwagonMail.jpg" alt="" class="mainimg">
    <div class="Details">
      <h2>Technology Used</h2>
      <ul>
        <li>
          <svg class="icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <title>{{ geticons('vue.js').title }}</title>
            <path :d="geticons('vue.js').path"/>
          </svg>
          Vue.js
        </li>
        <li>
          <svg class="icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path :d="geticons('Sass').path"/>
          </svg>
          Scss</li>
        <li>
          <svg class="icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path :d="geticons('Bootstrap').path"/>
          </svg>
          Bootstrap</li>
        <li>
          <svg class="icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path :d="geticons('Node.js').path"/>
          </svg>
          ExpressJs</li>
        <li>
          <svg class="icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path :d="geticons('Mongodb').path"/>
          </svg>
          MongoDB</li>
      </ul>
    </div>
    <div class="desc">
      <h2>What this project is</h2>
      <p class="explain">
        Speedwagon Email CLient is a............
      </p>
    </div>

  </div>
</template>

<script>
const simpleIcons = require('simple-icons');
export default {
  name: "ProjectView",
  components: {},
  methods: {
    onproject() {
      if (this.$store.state.onproject) {
        return "flex";
      } else {
        return "none";
      }
    },
    geticons(icon) {
      return simpleIcons.get(icon);
    }
  },
}
</script>

<style scoped lang="scss">
.ProjectView {
  position: fixed;
  background: rgba(#100E17, .98);
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 0;
  z-index: 99 !important;
  align-items: center;
  color: $bg-second;

  * {
    color: $bg-second;
  }

  .title {
    text-align: end;
    margin: 20px 10px 10px 100px;
  }

  .mainimg {
    width: 95%;
  }

  .icon {
    fill: $bg-second;
  }
}
</style>