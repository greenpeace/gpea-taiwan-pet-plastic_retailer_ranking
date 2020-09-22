<template>
  <div id="app">
    <Desktop 
      v-if="isDesktop" 
      v-bind:appScript="appScript" 
      v-bind:categories="categories" 
      v-on:submit="submitDecision" />
    <Mobile 
      v-else
      v-bind:appScript="appScript" />
  </div>
</template>

<script>
import Desktop from './views/Desktop.vue'
import Mobile from './views/Mobile.vue'
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
              src: require("./assets/convenience_store/brand_7E.png"),
              srcSummary: require("./assets/summary/run_1-1.png"),
            },
            {
              value: "全家",
              src: require("./assets/convenience_store/brand_FM.png"),
              srcSummary: require("./assets/summary/run_1-2.png"),
            },
          ]
        },
        {
          title: "超市組",
          items: [
            {
              value: "家樂福",
              src: require("./assets/super_market/brand_carrefour.png"),
              srcSummary: require("./assets/summary/run_2-1.png"),
            },
            {
              value: "全聯福利中心",
              src: require("./assets/super_market/brand_mtmart.png"),
              srcSummary: require("./assets/summary/run_2-2.png"),
            },
            {
              value: "美廉社",
              src: require("./assets/super_market/brand_simplemart.png"),
              srcSummary: require("./assets/summary/run_2-3.png"),
            },
            {
              value: "頂好",
              src: require("./assets/super_market/brand_wellcome.png"),
              srcSummary: require("./assets/summary/run_2-4.png"),
            },
          ]
        },
        {
          title: "量販店組",
          items: [
            {
              value: "愛買",
              src: require("./assets/mass_merchandiser/brand_amart.png"),
              srcSummary: require("./assets/summary/run_3-1.png"),
            },
            {
              value: "Costco",
              src: require("./assets/mass_merchandiser/brand_costco.png"),
              srcSummary: require("./assets/summary/run_3-2.png"),
            },
            {
              value: "大潤發",
              src: require("./assets/mass_merchandiser/brand_rt.png"),
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
  },
  computed: {
    isDesktop: function () {
      // console.log(window.innerWidth)
      return (window.innerWidth >= 768)
    }
  },
  async created() {
    try {

      let ipRes = await axios.get("https://api.ipify.org?format=json");
      this.ip = ipRes.data.ip;
      // on local env
      this.appScript = this.corsAnyWhere + this.appScript;
      
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async submitDecision(value) {
      try {
        let postData = {
          "rows": [
            {
              "ip": this.ip,
              "category": value.category,
              "brand": value.brand
            }
          ]
        }

        await axios.post(this.appScript + `?sheetName=votes`, postData);
        // await this.getSummary();

      } catch (err) {
        console.log(err);
      }
    },
    // async getSummary() {
    //   try {
    //     let summaryRef = await axios.get(this.appScript + "?sheetName=votes_summary")
    //     this.summary = summaryRef.data.values;
    //     console.log(this.summary);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
  }
}
</script>

<style lang="scss">
body {
  background-image: url(./assets/bg.png);
  background-position: center bottom;
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
  transition: backdrop-filter .5s;
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
