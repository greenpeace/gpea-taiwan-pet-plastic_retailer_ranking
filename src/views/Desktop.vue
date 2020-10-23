<template>
  <div class="desktop">
    <div class="desktop-blur bg-blur">
      <transition name="fade" mode="out-in">
        <component 
          v-on:decision="makeDecision" 
          v-on:back="removeDecision" 
          v-on:restart="restartDecision" 
          v-bind:category="select.category" 
          v-bind:brand="select.brand" 
          v-bind:categoryIndex="categoryIndex" 
          v-bind:appScript="appScript"
          v-bind:summary="summary" 
          v-bind:categories="categories" 
          v-bind:is="currentTabComponent"></component>
      </transition>
    </div>
  </div>
</template>

<script>
import SelectCategory from '../components/desktop/SelectCategory'
import SelectBrand from '../components/desktop/SelectBrand'
import CountDown from '../components/desktop/CountDown'
import Summary from '../components/desktop/Summary'
import axios from 'axios'

export default {
  name: 'Desktop',
  props: ["appScript", "ip", "categories"],
  components: {
    "step-1": SelectCategory,
    "step-2": SelectBrand,
    "step-3": CountDown,
    "step-4": Summary,
  },
  data() {
    return {
      step: 1,
      categoryIndex: 0,
      select: {
        category: false,
        brand: false,
      },
      summary: []
    }
  },
  computed: {
    currentTabComponent: function() {
      
      if (this.step === 1) {
        if (document.querySelector('.desktop-blur')) {
          document.querySelector('.desktop-blur').classList.add('bg-blur');
        }
        return "step-1"
      } else if (this.step === 2) {
        document.querySelector('.desktop-blur').classList.add('bg-blur');
        return "step-2"
      } else if (this.step === 3) {
        document.querySelector('.desktop-blur').classList.add('bg-blur');
        return "step-3"
      } else if (this.step === 4) {
        document.querySelector('.desktop-blur').classList.remove('bg-blur');
        return "step-4"
      }

      return "step-1"

    }
  },
  created() {
    console.log("getting summary")
    this.getSummary();
  },
  mounted () {
    //
  },
  methods: {
    async makeDecision (decision) {
      if (decision.type === "category") {
        this.categoryIndex = decision.index;
        this.select.category = decision.option;
        // this.step = 2;
        this.step = 4;
      } else if (decision.type === "brand") { // skipped
        this.select.brand = decision.option;
        // console.log(this.select.brand)
        await this.$emit("submit", this.select);
        await this.getSummary();
        this.step = 3;
      } else if (decision.type === "summary") {
        this.step = 4;
        this.$emit("showForm");
      }
    },
    removeDecision () {
      this.step -= 1
    },
    restartDecision () {
      console.log("restart")
      this.step = 1
      this.categoryIndex = 0;
      this.select = {
        category: false,
        brand: false,
      };
    },
    async getSummary() {
      try {
        let summaryRef = await axios.get(this.appScript + "?sheetName=votes_summary")
        this.summary = summaryRef.data.values;
        // remove sheet header
        this.summary.shift();
        // console.log(this.summary);
      } catch (err) {
        console.log(err);
      }
    },
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

        await axios.post(this.appScript + `?sheetName=votes`, postData, { headers: {'Content-Type': 'text/plain;charset=utf-8'}});

      } catch (err) {
        console.log(err);
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.desktop {
  position: relative;
  letter-spacing: 2pt;
  text-align: left;
  height: 100vh;
  background-image: url(../assets/bg.png);
  background-position: center bottom;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
