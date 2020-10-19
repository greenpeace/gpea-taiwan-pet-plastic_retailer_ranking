<template>
  <div id="app">
    <Landing />
    <div id="voting">
      <Desktop 
        v-if="isDesktop" 
        v-on:showForm="showForm" 
        v-bind:appScript="appScript" 
        v-bind:ip="ip" 
        v-bind:categories="categories" />
      <Mobile 
        v-else
        v-on:showForm="showForm" 
        v-bind:appScript="appScript" 
        v-bind:ip="ip" 
        v-bind:categories="categories" />
    </div>
    <IntroAndForm v-if="introShow" />
    <Footer v-bind:isDesktop="isDesktop" />
  </div>
</template>

<script>
import Landing from './views/Landing.vue'
import IntroAndForm from './views/IntroAndForm.vue'
import Desktop from './views/Desktop.vue'
import Mobile from './views/Mobile.vue'
import Footer from './views/Footer.vue'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    Desktop,
    Mobile,
    Footer,
    Landing,
    IntroAndForm
  },
  data() {
    return {
      ip: "",
      introShow: true,
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
  mounted() {
    this.$scrollTo("#app")
  },
  methods: {
    showForm () {
      this.introShow = true;
    },
    toNext() {
      console.log("next")
      var container = this.$el.querySelector("#landing");
      console.log(container)
      container.scrollTop = container.scrollHeight;
    }
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

.tooltip {
  display: block !important;
  z-index: 10000;

  .tooltip-inner {
    background: white;
    color: #4a4a4a;
    border-radius: 16px;
    padding: 5px 30px 4px;
    max-width: 600px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
  }

  &[x-placement^="top"] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="right"] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^="left"] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
}

.el-input__inner {
  border: none !important;
  border-bottom: 1px solid grey !important;
  border-radius: unset !important;
  height: 30px !important;
  &:focus {
    border-bottom: 1px solid #ffb100 !important;
  }
}
.el-form-item__label {
  padding: unset !important;
  height: 25px !important;
  line-height: 20px !important;
  display: inline !important;
}
.el-form-item {
  margin-bottom: 12px !important;
}

.el-checkbox__inner {
  background-color: #ffb100 !important;
  border-color: #ffb100 !important;
  // color: #ffb100 !important;
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
