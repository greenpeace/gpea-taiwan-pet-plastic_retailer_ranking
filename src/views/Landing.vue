<template>
  <div class="landing">
    <div class="floating-man">
      <img src="../assets/landing_man.png" width="100%" alt="">
    </div>
    <transition name="el-fade-in">
      <div class="cover" v-if="show">
        <div class="floating-logo">
          <img src="../assets/logo_black.png" width="100%" alt="">
        </div>
        <el-row>
          <el-col :sm="6">
            <img src="../assets/logan.png" width="100%" alt="">
          </el-col>
          <el-col :sm="24">
            <h1>我們願意，零售企業你願意嗎？</h1>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="24">
            <p>在這場為環境而努力的競賽中<br>我們都在和與日「巨」增的塑膠污染拔河</p>
            <p>2019 年綠色和平發布第一次的臺灣零售商減塑評比後<br>經過一年的時間<br>究竟哪間企業進步最多呢？</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="24">
            <el-button class="confirm-btn" v-scroll-to="'#voting'">
              <!-- <i class="fa fa-spinner fa-spin" ></i>  -->
              看看誰進步最多
            </el-button>
          </el-col>
        </el-row>
      </div>
    </transition>  
  </div>
</template>

<script>
export default {
  name: 'Blank',
  props: {
    msg: String
  },
  data() {
    return {
      show: false
    }
  },
  mounted() {
    this.show = true;
  },
  methods: {
    //
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.landing {
  position: relative;
  z-index: 0;
  background-position: center top;
  background-size: 100%;
  background-repeat: no-repeat;
  background-image: url('../assets/landing_bg.png');
  width: 100%;
  height: 100vh;
  text-align: left;
  letter-spacing: 2pt;
  .floating-man {
    position: absolute;
    bottom: -35%;
    right: 100px;
    width: 40%;
  }
  .cover {
    transition: all .5s ease;
    position: relative;
    padding: 5% 10%;
    height: 100vh;
    background-color: rgba(#fff, 0.75);
    .floating-logo {
      position: absolute;
      right: 130px;
      top: 50px;
      max-width: 305px;
      width: 30%
    }
    .confirm-btn {
      padding: 20px 40px;
      border-radius: 34px;
      background-color: #ffb100;
      font-weight: bold;
      letter-spacing: inherit;
      color: white;
      font-size: 1.2rem;
      border: none;
      cursor: pointer;
      &:hover {
        background-color: #f57f17;
      }
    }
  }
}
</style>
