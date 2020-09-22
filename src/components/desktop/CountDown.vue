<template>
  <div class="count-down">
    <transition name="fade" mode="out-in">
      <h1>{{second}}</h1>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'CountDown',
  data() {
    return {
      second: 3
    }
  },
  mounted() {
    this.startCountDown();
  },
  methods: {
    startCountDown() {
      if(this.second > 0) {
        setTimeout(() => {
          this.second -= 1
          this.startCountDown()
        }, 1000)
      } else {
        this.second = "GO !"
        this.$emit("decision", { type: "summary", option: true});
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.count-down {
  display: flex;
  // position: absolute;
  text-align: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  align-items: center;
  color: white;
  overflow: hidden;
  h1 {
    width: 100%;
    font-size: 10rem;
  }
}
</style>
