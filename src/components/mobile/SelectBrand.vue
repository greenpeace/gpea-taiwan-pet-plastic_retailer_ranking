<template>
  <div class="select-brand">
    <div class="light-cover">
      <img src="@/assets/light_mobile_bg.png" alt="">
    </div>
    <el-row>
      <el-col :span="24">
        <h2 class="title" @click="back()"><i class="fa fa-chevron-left" aria-hidden="true"></i> {{categories[categoryIndex].title}}</h2>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="20">
        <p class="label-badge"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> 選擇你認為最努力減塑的隊伍！</p>
      </el-col>
    </el-row>
    <div class="slider-row">
      <div class="float-btn nav-left" @click="prevSlide()">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
      </div>
      <div class="float-btn nav-right" @click="nextSlide()">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </div>
      <slick
        ref="slick_brand"
        @afterChange="handleAfterChange"
        :options="slickOptions">
        <!-- <div>1111</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div> -->
        <div class="slider-item" v-for="(item) in items" :key="item.value">
          <img :src="item.src" alt="">
        </div>
      </slick>
    </div>
    <div class="option-row">
      <div class="option-title">
        <h2>{{ selectedBrand.value }}</h2>
        <el-button class="option-btn" @click="selectBrand">
          前往投票
        </el-button>
      </div>
    </div>
    <div class="option-skirt"></div>
  </div>
</template>

<script>
import Slick from 'vue-slick';
import "../../../node_modules/slick-carousel/slick/slick.css"

export default {
  name: 'SelectBrand',
  props: ["categoryIndex", "categories"],
  components: { Slick },
  data() {
    return {
      slickOptions: {
        infinite: true,
        centerPadding: "70px",
        dots: false,
        centerMode: true,
        slidesToShow: 1,
        // variableWidth: true,
        arrows: false,
      },
      hoverIndex: false,
      items: [],
      selectedBrand: {}
    }
  },
  created() {
    this.items = this.categories[this.categoryIndex].items; 
  },
  mounted() {
    this.handleAfterChange(undefined, undefined, 0);
  },
  methods: {
    back() {
      document.querySelector(".slider-row").classList.add('transparent');
      this.$emit("back");
    },
    prevSlide () {
      this.$refs.slick_brand.prev();
    },
    nextSlide () {
      this.$refs.slick_brand.next();
    },
    handleAfterChange(event, slick, index) {
      this.selectedBrand = this.items[index];
      this.selectedBrand.index = index;
      console.log(this.selectedBrand)
      document.querySelector(".slick-slide").classList.remove('active');
      document.querySelector(".slick-current").classList.add('active');
    },
    selectBrand() {
      document.querySelector(".slider-row").classList.add('transparent');
      this.$emit("decision", { type: "brand", option: this.selectedBrand.value});
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.select-brand {
  overflow: hidden;
  height: 720px;
  color: white;
  padding: 4% 7% 0 7%;
  box-sizing: border-box;
  position: relative;
  text-align: left;
  width: 100%;
  .light-cover {
    position: absolute;
    top: 0;
    left: -15vw;
    width: 100%;
    z-index: 2;
    img {
      height: 75vh;
      width: 130vw;
    }
  }
  .title {
    margin: 0;
    z-index: 10;
    position: relative;
    cursor: pointer;
    letter-spacing: 5pt;
  }
  .label-badge {
    background-color: rgba(255,255,255,0.16);
    padding: 7px 7px 7px 17px;
    margin: 0;
    border-radius: 50px;
    letter-spacing: 1pt;
  }
  .transparent {
    opacity: 0;
  }
  .slider-row {
    position: relative;
    z-index: 3;
    width: 100vw;
    height: 350px;
    margin-top: 60px;
    margin-left: -8%;
    margin-right: -8%;
    box-sizing: border-box;
    .float-btn {
      position: absolute;
      display: flex;
      align-items: center;
      font-size: 2rem;
      opacity: 1;
      height: 100%;
      z-index: 5;
      width: 60px;
      justify-content: center;
      &.nav-left {
        left: 0;
      }
      &.nav-right {
        right: 0;
      }
    }
    .slick-current {
      .slider-item {
        opacity: 1;
      }
    }
    .slider-item {
      height: 350px;
      position: relative;
      opacity: 0.6;
      img {
        position: absolute;
        width: 90%;
        padding-left: 5%;
        bottom: 0;
      }
      &.active {
        opacity: 1;
      }
    }
  }
  .option-row {
    position: relative;
    z-index: 4;
    padding-top: 40px;
    .option-title{
      text-align: center;
    }
    .option-btn {
      width: 100%;
      background-color: #ffb100;
      color: white;
      border-radius: 50px;
      letter-spacing: 3pt;
      font-size: 1rem;
      font-weight: bolder;
      border: none;
    }
  }
  .option-skirt {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #480000;
    height: 200px;
    z-index: 1;
  }
}
</style>
