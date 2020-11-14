<template>
  <div id="app">
    <div class="header"></div>
    <router-view/>
    <div class="footer">
      Icons made by
      <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a>,
      <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a>,
      <a href="https://www.flaticon.com/authors/prettycons" title="prettycons">prettycons</a>,
      <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a>
      from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#app {
  @extend .flex-col;
  margin: 0;
  position: relative;
}

.header {
  margin: 0;
  padding: 10px 5px;
  display: none;
}

.footer {
  margin: 0;
  padding: 10px 15px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: $bg-second;
}
</style>
