<template>
  <div class="desktop">
    <transition name="fade" mode="out-in">
      <component 
        v-on:decision="makeDecision" 
        v-on:back="removeDecision" 
        v-bind:category="select.category" 
        v-bind:categoryIndex="categoryIndex" 
        v-bind:appScript="appScript"
        v-bind:summary="summary" 
        v-bind:categories="categories" 
        v-bind:is="currentTabComponent"></component>
    </transition>
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
  mounted() {
    document.body.classList.add('bg-blur');
  },
  methods: {
    async makeDecision (decision) {
      if (decision.type === "category") {
        this.categoryIndex = decision.index;
        this.select.category = decision.option;
        this.step = 2;
      } else if (decision.type === "brand") {
        this.select.brand = decision.option;
        this.$emit("submit", this.select);
        await this.getSummary();
        this.step = 3;
      } else if (decision.type === "summary") {
        this.step = 4;
      }
    },
    removeDecision () {
      this.step -= 1
    },
    async getSummary() {
      try {
        let summaryRef = await axios.get(this.appScript + "?sheetName=votes_summary")
        this.summary = summaryRef.data.values;
        // console.log(this.summary);
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
  letter-spacing: 2pt;
  text-align: left;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
