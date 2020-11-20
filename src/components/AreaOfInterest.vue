<template>
  <div class="areaofinterest">
    <h2 class="title double-width">Area Of Interest</h2>
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
}
@media screen and (min-width: 900px){
  .areaofinterest{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    align-self: auto;
    .item{
      align-items: center;
    }
    .double-width{
      grid-column: span 2 / auto;
    }
  }
}
</style>