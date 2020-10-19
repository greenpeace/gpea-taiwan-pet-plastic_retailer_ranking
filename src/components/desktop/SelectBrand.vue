<template>
  <div class="select-brand">
    <el-row>
      <el-col :span="4">
        <h2 class="title" @click="back()"><i class="fa fa-chevron-left" aria-hidden="true"></i>{{categories[categoryIndex].title}}</h2>
      </el-col>
      <el-col :span="7">
        <p class="label-badge"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> 選擇你認為最努力減塑的隊伍！</p>
      </el-col>
    </el-row>
    <div class="hover-light-row">
      <el-row type="flex" justify="space-around">
        <el-col class="hover-light" 
          :span="6" 
          v-for="(item, index) in categories[categoryIndex].items" 
          :key="item.src">
          <img src="@/assets/light_bg.png" alt="" 
            @mouseenter="addHover(index)" 
            @mouseout="clearHover()">
          <el-button class="confirm-btn"
            @click="selectBrand(item.value)" 
            v-bind:class="{loading: loading}"
            :disabled="loading">
            <i v-if="loading" class="fa fa-spinner fa-spin" ></i> 確認投票
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="select-row">
      <el-row type="flex" justify="space-around">
        <el-col :span="6" v-for="(item, index) in categories[categoryIndex].items" :key="item.src">
          <div class="brand-img" v-bind:class="{hover: (index === hoverIndex)}">
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
  props: ["categoryIndex", "categories"],
  data() {
    return {
      loading: false,
      hoverIndex: false,
    }
  },
  methods: {
    back() {
      this.$emit("back");
    },
    addHover(index) {
      this.hoverIndex = index;
      console.log(this.hoverIndex)
    },
    clearHover() {
      this.hoverIndex = false
      console.log(this.hoverIndex)
    },
    selectBrand(value) {
      this.loading = true;
      this.$emit("decision", { type: "brand", option: value});
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.select-brand {
  color: white;
  padding: 4% 7%;
  height: 100vh;
  box-sizing: border-box;
  .title {
    margin: 0;
    z-index: 10;
    position: relative;
    cursor: pointer;
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
        left: 30%;
        padding: 10px 10px;
        border-radius: 34px;
        background-color: #ffb100;
        font-weight: bold;
        color: white;
        font-size: 1.2rem;
        border: none;
        cursor: pointer;
        &:hover {
          background-color: #f57f17;
        }
        &.loading {
          background-color: #ef6c00;
        }
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
      opacity: 0.6;
      img {
        width: 60%;
      }
      &.hover {
        opacity: 1;
      }
    }
  }
}
</style>
