<template>
  <div class="home">
    <img src="https://avatars2.githubusercontent.com/u/30367416?s=460&u=237d28568e566fc4f387769974135345aa45eabc&v=4" alt="" class="profileImage">
    <h1 class="name">Ivan Wijaya</h1>
    <h3 class="jobdesc">Computer Science Student<br/>Tarumanagara University</h3>
    <div class="areaofinterest">
      <h2 class="title">Area Of Interest</h2>
      <div class="item">
        <h4>
          <span><img src="@/assets/fullstack.svg" alt="" class="icon-text"></span>
          Fullstack Developer
        </h4>
      </div>
      <div class="item">
        <h4>
          <span><img src="@/assets/UIDesign.svg" alt="" class="icon-text"></span>
          UI Designer
        </h4>
      </div>
      <div class="item">
        <h4>
          <span><img src="@/assets/Mobile.svg" alt="" class="icon-text"></span>
          Mobile Programmer
        </h4>
      </div>
      <div class="item">
        <h4>
          <span><img src="@/assets/AI.svg" alt="" class="icon-text"></span>
          AI Engineer
        </h4>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>

<style lang="scss" scoped>
.home{
  @extend .flex-col;
  align-items: center;
  margin: 0;
  position: relative;
  background-color: $bg-col;
  &:before{
    content: '';
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: linear-gradient(rgba(0,0,0,0), $bg-col 60%),url("../assets/BG.jpg");
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
  }
  .profileImage{
    margin-top: 25vh;
    $size: 300px;
    width: $size;
    border-radius: $size;
  }
  *{
    z-index: 2;
  }
  .jobdesc{
    text-align: center;
  }
  .areaofinterest{
    @extend .flex-col;
    margin-top: 50px;
    background-color: $bg-second;
    align-self: stretch;
    padding: 15px 10px;
    border-radius: 10px;
    .title{
      text-align: center;
    }
    .item{
      width: 100%;
    }
  }
}
</style>