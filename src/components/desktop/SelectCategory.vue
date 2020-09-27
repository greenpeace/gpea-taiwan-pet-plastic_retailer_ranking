<template>
  <div class="select-category">
    <el-row>
      <el-col :span="12">
        <h2 class="title">你認為過去一年內，<br>哪間超市／超商／量販店<br>在減塑方面做出最多努力？</h2>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <p class="description">投票後就能看見<strong>支持率最高</strong>的零售商是誰哦！</p>
      </el-col>
    </el-row>
    <p class="label-badge"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> 選擇類別，開始投票！</p>
    <div class="hover-light-row">
      <div class="hover-light" v-bind:class="{ hover: category1Hover}" @click="selectCategory(0, '超商組')" @mouseenter="category1Hover = true" @mouseout="category1Hover = false">
        <img src="@/assets/light_bg.png" alt="">
      </div>
      <div class="hover-light" v-bind:class="{ hover: category2Hover}" @click="selectCategory(1, '超市組')" @mouseenter="category2Hover = true" @mouseout="category2Hover = false">
        <img src="@/assets/light_bg.png" alt="">
      </div>
      <div class="hover-light" v-bind:class="{ hover: category3Hover}" @click="selectCategory(2, '量販店組')" @mouseenter="category3Hover = true" @mouseout="category3Hover = false">
        <img src="@/assets/light_bg.png" alt="">
      </div>
    </div>
    <div class="select-row">
      <el-row type="flex" justify="space-around">
        <el-col :span="4" class="option-item">
          <div class="option-image">
            <img src="@/assets/convenience_store/store.png" class="image convenience" alt="">
          </div>
          <div class="option-description" v-bind:class="{ hover: category1Hover}" @click="selectCategory(0, '超商組')" @mouseenter="category1Hover = true" @mouseout="category1Hover = false">
            <h2>超商</h2>
            <h6>7-Eleven／全家</h6>
          </div>
        </el-col>
        <el-col :span="6" class="option-item">
          <div class="option-image">
            <img src="@/assets/super_market/store.png" alt="" class="image super_market">
          </div>
          <div class="option-description" v-bind:class="{ hover: category2Hover}" @click="selectCategory(1, '超市組')" @mouseenter="category2Hover = true" @mouseout="category2Hover = false">
            <h2>超市</h2>
            <h6>全聯福利中心／頂好超市／美廉社／家樂福</h6>
          </div>
        </el-col>
        <el-col :span="5" class="option-item">
          <div class="option-image">
            <img src="@/assets/mass_merchandiser/store.png" alt="" class="image mass_merchant">
          </div>
          <div class="option-description" v-bind:class="{ hover: category3Hover}" @click="selectCategory(2, '量販店組')" @mouseenter="category3Hover = true" @mouseout="category3Hover = false">
            <h2>量販店</h2>
            <h6>大潤發／好市多／愛買</h6>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="option-skirt"></div>
  </div>
</template>

<script>
export default {
  name: 'SelectCategory',
  data() {
    return {
      category1Hover: false,
      category2Hover: false,
      category3Hover: false,
    }
  },
  methods: {
    selectCategory(index, value) {
      this.$emit("decision", { type: "category", option: value, index});
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.select-category {
  height: 100vh;
  color: white;
  padding: 4% 7% 0 7%;
  box-sizing: border-box;
  position: relative;
  @media (min-width: 1920px) {
    p {
      font-size: 1.2rem;
    }
  }
  .title {
    letter-spacing: 10pt;
  }
  .label-badge {
    background-color: rgba(255,255,255,0.16);
    padding: 7px 7px 7px 17px;
    border-radius: 50px;
    max-width: 280px;
  }
  .hover {
    opacity: 1 !important;
  }
  .hover-light-row {
    position: absolute;
    display: flex;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    .hover-light {
      width: 30.5vw;
      position: relative;
      opacity: 0;
      img {
        width: 130%;
        height: 88vh;
      }
    }
  }
  .select-row {
    position: absolute;
    bottom: 6%;
    left: 0;
    width: 100%;
    h2, h6 {
      margin-top: 3%;
      margin-bottom: 10px;
    }
    .option-item {
      height: 42vh;
      color: white;
      &:nth-child(1) {
        margin-left: 7vw;
      }
      &:nth-child(3) {
        margin-right: 2vw;
      }
      .option-image {
        height: 50%;
        max-height: 250px;
      }
      .option-description {
        padding-top: 10vh;
        text-align: center;
        opacity: 0.6;
        position: relative;
        z-index: 3;
      }
      .image {
        width: 100%;
      }
      .convenience {
        transform: scale(0.85); 
      }
      .super_market {
        transform: translateY(25px); 
      }
      .mass_merchant {
        transform: translateY(-20%);
      }
    }
  }
  .option-skirt {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #480000;
    height: 20vh;
    z-index: 1;
  }
}
</style>
