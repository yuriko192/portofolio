<template>
  <div class="Hero">
    <img src="@/assets/DP.png" alt="" class="profileImage">
    <h1 class="name">Ivan Wijaya</h1>
    <h3 class="jobdesc">Computer Science Student<br/>Tarumanagara University</h3>
    <a href="https://drive.google.com/file/d/1lThHt7vgwAQk5AIwHCbaQ-hasYgcTm_s/view?usp=sharing" class="btn-cv">
      Get CV
    </a>
  </div>
</template>

<script>
export default {
  name: "Hero"
}
</script>

<style scoped lang="scss">
.Hero {

  @extend .flex-col;
  align-items: center;
  margin: 25vh 0 0 0;
  position: relative;

  .name {
    font-size: 3rem;
  }

  .jobdesc {
    text-align: center;
    font-weight: normal;
  }
  .profileImage {

    $size: 300px;
    width: $size;
    border-radius: $size;
  }
}

.btn-cv {
  @extend .btn;
  font-size: 1.1rem;
  box-shadow: 0 0 1rem rgba(black, .7);
  transition: box-shadow 70ms;

  &:hover {
    box-shadow: 0 0 .1rem black;
  }

}
</style>