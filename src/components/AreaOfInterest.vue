<template>
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
</template>

<script>
export default {
name: "AreaOfInterest",
components:{
}
}
</script>

<style scoped lang=scss>
.areaofinterest{
  @extend .flex-col;
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
</style>