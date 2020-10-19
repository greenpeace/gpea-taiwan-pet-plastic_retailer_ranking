<template>
  <div class="select-category" id="select-category">
    <div class="light-cover">
      <img src="@/assets/light_mobile_bg.png" alt="">
    </div>
    <el-row>
      <el-col :span="24">
        <h2 class="title">你認為過去一年內，<br>哪間超市／超商／量販店<br>在減塑方面做出最多努力？</h2>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <p class="description">投票後就能看見<strong>支持率最高</strong>的零售商是誰哦！</p>
      </el-col>
    </el-row>
    <p class="label-badge"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> 選擇類別，開始投票！</p>
    <div class="slider-row transparent">
      <div class="float-btn nav-left" @click="prevSlide()">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
      </div>
      <div class="float-btn nav-right" @click="nextSlide()">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </div>
      <slick
        ref="slick"
         @afterChange="handleAfterChange"
        :options="slickOptions">
        <div class="select-item" v-for="(item) in categories" :key="item.title">
          <img :src="item.img" alt="" v-bind:style="{width: item.imgWidth, paddingLeft: item.imgPaddingLeft}" >
        </div>
      </slick>
    </div>
    <div class="option-row">
      <div class="option-title">
        <h2>{{ selectedCategory.category }}</h2>
        <p>{{ selectedCategory.description }}</p>
        <el-button class="option-btn" @click="selectCategory">
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
  name: 'SelectCategory',
  components: { Slick },
  data() {
    return {
      loading: false,
      slickOptions: {
        infinite: true,
        centerPadding: "80px",
        dots: false,
        centerMode: true,
        slidesToShow: 1,
        // variableWidth: true,
        arrows: false,
      },
      categories: [
        {
          category: "超商組",
          title: "超商",
          description: "7-Eleven／全家",
          img: require("../../assets/convenience_store/store.png"),
          imgWidth: "70%",
          imgPaddingLeft: "15%",
        },
        {
          category: "超市組",
          title: "超市",
          description: "全聯福利中心／頂好超市／美廉社／家樂福",
          img: require("../../assets/super_market/store.png"),
          imgWidth: "100%",
          imgPaddingLeft: "0",
        },
        {
          category: "量販店組",
          title: "量販店",
          description: "大潤發／好市多／愛買",
          img: require("../../assets/mass_merchandiser/store.png"),
          imgWidth: "90%",
          imgPaddingLeft: "5%",
        },
      ],
      selectedCategory: {},
      // title: "",
      // description: ""
    }
  },
  mounted() {
    // this.selectedCategory = this.categories[0];
    this.handleAfterChange(undefined, undefined, 0);
    document.querySelector(".slider-row").classList.remove('transparent');
    // this.title = this.selectedCategory.title
    // this.description = this.selectedCategory.description
    this.$scrollTo("#select-category")
  },
  methods: {
    selectCategory() {
      document.querySelector(".slider-row").classList.add('transparent');
      this.$emit("decision", { type: "category", option: this.selectedCategory.category, index: this.selectedCategory.index});
    },
    handleAfterChange(event, slick, index) {
      this.selectedCategory = this.categories[index];
      this.selectedCategory.index = index;
      document.querySelector(".slick-slide").classList.remove('active');
      document.querySelector(".slick-current").classList.add('active');
    },
    prevSlide () {
      this.$refs.slick.prev();
    },
    nextSlide () {
      this.$refs.slick.next();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@media (max-width: 767px) and (min-width: 600px) {
  .select-category {
    height: 800px;  
  }  
}
.select-category {
  overflow: hidden;
  height: 720px;
  color: white;
  padding: 4% 7% 0 7%;
  box-sizing: border-box;
  position: relative;
  text-align: left;
  .title, .description {
    letter-spacing: 3pt;
  }
  .label-badge {
    background-color: rgba(255,255,255,0.16);
    padding: 7px 7px 7px 17px;
    border-radius: 50px;
    width: 55%;
  }
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
  .transparent {
    opacity: 0;
  }
  .slider-row {
    position: relative;
    z-index: 3;
    width: 100vw;
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
      .select-item {
        opacity: 1;
      }
    }
    .select-item {
      height: 200px;
      position: relative;
      opacity: 0.6;
      
      img {
        position: absolute;
        bottom: 0;
        max-height: 200px;
      }
      &.active {
        opacity: 1;
      }
    }
  }
  .option-row {
    position: relative;
    z-index: 4;
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
