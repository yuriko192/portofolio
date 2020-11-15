<template>
  <div class="home">
    <img src="https://avatars2.githubusercontent.com/u/30367416?s=460&u=237d28568e566fc4f387769974135345aa45eabc&v=4" alt="" class="profileImage">
    <h1 class="name">Ivan Wijaya</h1>
    <h3 class="jobdesc">Computer Science Student<br/>Tarumanagara University</h3>
    <div class="btn-cv">Get CV</div>
    <contact-methods></contact-methods>
    <AreaOfInterest></AreaOfInterest>
  </div>
</template>

<script>
import AreaOfInterest from "@/components/AreaOfInterest";
import ContactMethods from "@/components/ContactMethods";
export default {
  name: 'Home',
  components: {
    AreaOfInterest,
    ContactMethods
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
  .name{
    font-size: 3rem;
  }
  .jobdesc{
    text-align: center;
    font-weight: normal;
  }
}
.btn-cv{
  @extend .btn;
  color: $bg-col;
  background-color: $primary;
  //border: solid 2px $primary;
  font-size: 1.1rem;
}
</style>