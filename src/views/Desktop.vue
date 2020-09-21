<template>
  <div class="desktop">
    <transition name="fade">
      <component v-on:decision="makeDecision" v-on:back="removeDecision" v-bind:category="select.category" v-bind:is="currentTabComponent" ></component>
    </transition>
  </div>
</template>

<script>
import SelectCategory from '../components/desktop/SelectCategory'
import SelectBrand from '../components/desktop/SelectBrand'

export default {
  name: 'Desktop',
  components: {
    "step-1": SelectCategory,
    "step-2": SelectBrand,
  },
  data() {
    return {
      step: 1,
      select: {
        category: false,
        brand: false,
      },
    }
  },
  computed: {
    currentTabComponent: function() {
      
      if (this.step === 1) {
        return "step-1"
      } else if (this.step === 2) {
        return "step-2"
      }
      return "step-1"

    }
  },
  mounted() {
    document.body.classList.add('bg-blur')
  },
  methods: {
    makeDecision (decision) {
      console.log(decision)
      if (decision.type === "category") {
        this.select.category = decision.option
        this.step = 2
      }
    },
    removeDecision () {
      this.step -= 1
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
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
