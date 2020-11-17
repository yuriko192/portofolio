<template>
  <div class="ProjectList">
    <h1 class="title">Projects</h1>
    <div class="item-list">
      <div class="item">
        <h3 class="title">Speedwagon Email Client</h3>
        <img src="@/assets/SpeedwagonMail.jpg" alt="">
      </div>
      <div class="item">
        <h3 class="title">Hotel Reservation Client</h3>
        <img src="@/assets/HotelReservation.jpg" alt="">
      </div>
      <div class="item">
        <h3 class="title">Newtab Chrome Extension</h3>
        <img src="@/assets/ChromeExtension.jpg" alt="">
      </div>
      <div class="item">
        <h3 class="title">Random Selfhosting projects</h3>
        <img src="@/assets/SelfHost.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectList",
  components: {}
}
</script>

<style scoped lang=scss>
.ProjectList{
  .item-list{
    display: flex;
    overflow: scroll;
    width: calc(100vw - 40px);
    .item{
      position: relative;
      img{
        width: 270px;
        height: 150px;
        margin: 0;
        border-radius: 5px;
      }
      .title{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        color: $primary;
        background-color: $bg-second;
        margin: 0;
        border-radius: 0 0 5px 5px;
      }
    }
  }

}
</style>