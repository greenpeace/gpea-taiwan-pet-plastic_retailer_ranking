<template>
  <div id="app">
    <Desktop 
      v-if="isDesktop" 
      v-bind:appScript="appScript" 
      v-bind:categories="categories" />
    <Mobile 
      v-else
      v-bind:appScript="appScript" 
      v-bind:categories="categories" />
    <Footer v-bind:isDesktop="isDesktop" />
  </div>
</template>

<script>
import Desktop from './views/Desktop.vue'
import Mobile from './views/Mobile.vue'
import Footer from './views/Footer.vue'
import axios from 'axios'

export default {
  name: 'app',
  data() {
    return {
      ip: "",
      appScript: "https://script.google.com/macros/s/AKfycbw8XjIKnkXAGjIMltyqQ4IE5n29puZEkkvKPSwOUMwQ7O6erUD3/exec",
      corsAnyWhere: "https://cors-anywhere.small-service.gpeastasia.org/",
      // summary: [],
      categories: [
        {
          title: "超商組",
          items: [
            {
              value: "7-Eleven",
              src: require("./assets/convenience_store/7E.png"),
              srcSummary: require("./assets/summary/run_1-1.png"),
            },
            {
              value: "全家",
              src: require("./assets/convenience_store/FM.png"),
              srcSummary: require("./assets/summary/run_1-2.png"),
            },
          ]
        },
        {
          title: "超市組",
          items: [
            {
              value: "家樂福",
              src: require("./assets/super_market/carrefour.png"),
              srcSummary: require("./assets/summary/run_2-1.png"),
            },
            {
              value: "全聯福利中心",
              src: require("./assets/super_market/px.png"),
              srcSummary: require("./assets/summary/run_2-2.png"),
            },
            {
              value: "美廉社",
              src: require("./assets/super_market/simplemart.png"),
              srcSummary: require("./assets/summary/run_2-3.png"),
            },
            {
              value: "頂好",
              src: require("./assets/super_market/wellcome.png"),
              srcSummary: require("./assets/summary/run_2-4.png"),
            },
          ]
        },
        {
          title: "量販店組",
          items: [
            {
              value: "愛買",
              src: require("./assets/mass_merchandiser/amart.png"),
              srcSummary: require("./assets/summary/run_3-1.png"),
            },
            {
              value: "Costco",
              src: require("./assets/mass_merchandiser/costco.png"),
              srcSummary: require("./assets/summary/run_3-2.png"),
            },
            {
              value: "大潤發",
              src: require("./assets/mass_merchandiser/rt.png"),
              srcSummary: require("./assets/summary/run_3-3.png"),
            },
          ]
        },
      ],
    }
  },
  components: {
    Desktop,
    Mobile,
    Footer
  },
  computed: {
    isDesktop: function () {
      // console.log(window.innerWidth)
      return (window.innerWidth >= 992)
    }
  },
  async created() {
    try {

      let ipRes = await axios.get("https://api.ipify.org?format=json");
      this.ip = ipRes.data.ip;
      // on local env
      if (process.env.NODE_ENV === "dev") {
        this.appScript = this.corsAnyWhere + this.appScript;
      }
      // this.appScript = this.corsAnyWhere + this.appScript;
      
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    //
  }
}
</script>

<style lang="scss">
body {
  font-family: "Noto Sans TC" ,'Avenir', Helvetica, Arial, sans-serif;
  height: auto;
  margin: 0;
}
button {
  font-family: "Noto Sans TC" ,'Avenir', Helvetica, Arial, sans-serif;
}
#mc-form {
  display: none;
}
.bg-blur {
  backdrop-filter: blur(43.2px);
  -webkit-backdrop-filter: blur(43.2px);
}
#app {
  font-family: "Noto Sans TC" ,'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@media all and (max-width: 991px) {
  body {
    font-size: 14px;
  }
}
@media all and (min-width: 992px) and (min-width: 1200px) {
  body {
    font-size: 14px;
  }
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
