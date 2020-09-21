<template>
  <div class="select-brand">
    <el-row>
      <el-col :span="4">
        <h2 class="title" @click="back()"><i class="el-icon-arrow-left"></i>{{categories[category - 1].title}}</h2>
      </el-col>
      <el-col :span="7">
        <p class="label-badge"><i class="el-icon-warning"></i> 選擇你認為最努力減塑的隊伍！</p>
      </el-col>
    </el-row>
    <div class="hover-light-row">
      <el-row type="flex" justify="space-around">
        <el-col class="hover-light" :span="6" v-for="(item) in categories[category - 1].items" :key="item.src">
          <img src="@/assets/light_bg.png" alt="">
          <div class="confirm-btn">
            確認投票
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="select-row">
      <el-row type="flex" justify="space-around">
        <el-col :span="6" v-for="(item) in categories[category - 1].items" :key="item.src">
          <div class="brand-img">
            <img :src="item.src" alt="">
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectBrand',
  props: ["category"],
  data() {
    return {
      categories: [
        {
          title: "超商組",
          items: [
            {
              src: require("../../assets/convenience_store/brand_7E.png"),
            },
            {
              src: require("../../assets/convenience_store/brand_FM.png"),
            },
          ]
        },
        {
          title: "超市組",
          items: [
            {
              src: require("../../assets/super_market/brand_carrefour.png"),
            },
            {
              src: require("../../assets/super_market/brand_mtmart.png"),
            },
            {
              src: require("../../assets/super_market/brand_simplemart.png"),
            },
            {
              src: require("../../assets/super_market/brand_wellcome.png"),
            },
          ]
        },
        {
          title: "量販店組",
          items: [
            {
              src: require("../../assets/mass_merchandiser/brand_amart.png"),
            },
            {
              src: require("../../assets/mass_merchandiser/brand_costco.png"),
            },
            {
              src: require("../../assets/mass_merchandiser/brand_rt.png"),
            },
          ]
        },
      ]
    }
  },
  created() {
    this.selectedCategory = this.categories[this.category];
    console.log(this.categories[this.category]);
  },
  methods: {
    back() {
      console.log("back")
      this.$emit("back");
    } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.select-brand {
  color: white;
  padding: 4% 7%;
  .title {
    margin: 0;
    z-index: 10;
    position: relative;
  }
  .label-badge {
    background-color: rgba(255,255,255,0.16);
    padding: 7px 7px 7px 17px;
    margin: 0;
    border-radius: 50px;
  }
  .hover-light-row {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    .hover-light {
      position: relative;
      text-align: center;
      opacity: 0;
      &:hover {
        opacity: 1;
      }
      img {
        width: 100%;
        height: 93vh;
      }
      .confirm-btn {
        width: 40%;
        position: absolute;
        bottom: 10%;
        left: 28%;
        padding: 5px 10px;
        border-radius: 34px;
        background-color: #ffb100;
      }
    }
  }
  .select-row {
    position: absolute;
    bottom: 30%;
    left: 0;
    width: 100%;
    .brand-img {
      width: 100%;
      text-align: center;
      img {
        width: 60%;
      }
    }
  }
}
</style>
