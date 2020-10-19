<template>
  <div class="count-down" id="count-down">
    <div>
      <transition name="fade" mode="out-in">
        <h1>{{second}}</h1>
      </transition>
    </div>
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
    this.$scrollTo("#count-down")
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
  background-image: url("../../assets/bg_mobile.png");
  background-size: cover;
  background-position: center -105px;
  text-align: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 720px;
  color: white;
  overflow: hidden;
  transition: backdrop-filter .2s;
  * {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.4);
    backdrop-filter: blur(12px);
    width: 100%;
    height: 720px;
    h1 {
      margin: 0;
      width: 100%;
      font-size: 10rem;
    }
  } 
}
</style>
