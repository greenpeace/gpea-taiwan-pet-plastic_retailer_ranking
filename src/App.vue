<template>
  <div id="app">
    <Desktop v-if="isDesktop" />
    <Mobile v-else />
  </div>
</template>

<script>
import Desktop from './views/Desktop.vue'
import Mobile from './views/Mobile.vue'

export default {
  name: 'app',
  components: {
    Desktop,
    Mobile,
  },
  computed: {
    isDesktop: function () {
      // console.log(window.innerWidth)
      return (window.innerWidth >= 768)
    }
  }
}
</script>

<style lang="scss">
body {
  background-image: url(./assets/bg.png);
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}
.bg-blur {
  -webkit-backdrop-filter: blur(43.2px);
  backdrop-filter: blur(43.2px);
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
@media all and (max-width: 1919px) and (min-width: 1200px) {
  body {
    font-size: 14px;
  }
}
@media all and (min-width: 1920px) {
  body {
    font-size: 24px;
  }
}
</style>
