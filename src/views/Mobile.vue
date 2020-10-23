<template>
  <div class="mobile">
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
</template>

<script>
import SelectCategory from '../components/mobile/SelectCategory'
import SelectBrand from '../components/mobile/SelectBrand'
import CountDown from '../components/mobile/CountDown'
import Summary from '../components/mobile/Summary'
import axios from 'axios'

export default {
  name: 'Mobile',
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
        return "step-1"
      } else if (this.step === 2) {
        return "step-2"
      } else if (this.step === 3) {
        return "step-3"
      } else if (this.step === 4) {
        return "step-4"
      }
      return "step-1"

    }
  },
  mounted() {},
  created() {
    this.getSummary()
  },
  methods: {
    async makeDecision (decision) {
      if (decision.type === "category") {
        this.categoryIndex = decision.index;
        this.select.category = decision.option;
        this.step = 4;
        // this.$scrollTo("#summary")
      } else if (decision.type === "brand") {
        // this.select.brand = decision.option;
        // await this.submitDecision(this.select);
        // await this.getSummary();
        this.step = 3;
      } else if (decision.type === "summary") {
        this.$emit("showForm");
        this.step = 4;
      }
    },
    removeDecision () {
      this.step -= 1
      // this.$scrollTo("#select-brand");
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
        document.querySelector(".slider-row").classList.add('transparent');
        // await this.getSummary();
      } catch (err) {
        console.log(err);
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.mobile {
  background-color: rgb(96, 20, 19);
  position: relative;
}
</style>
