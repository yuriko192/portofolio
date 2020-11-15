<template>
  <div id="app">
    <div class="header"></div>
    <router-view/>
    <div class="footer">
      Icons made by
      <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a>,
      <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a>,
      <a href="https://www.flaticon.com/authors/prettycons" title="prettycons">prettycons</a>
      from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>,
      <a href="https://simpleicons.org/" title="Simpleicons"> www.simpleicons.org/</a>
      <br/>
      Images made by
      <a href="https://unsplash.com/@cdr6934" title="ChrisRied">Chris Ried</a>
      from <a href="https://www.unsplash.com/" title="Unsplash"> www.unsplash.com</a>
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
