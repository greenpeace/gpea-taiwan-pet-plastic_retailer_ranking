<template>
  <div class="summary">
    <!-- <el-switch
      v-model="mode"
      active-color="#13ce66"
      inactive-color="#ff4949">
    </el-switch> -->
    <div class="float-btn">
      <h2 @click="restart">看看其他組賽況 <i class="el-icon-arrow-right"></i></h2>
    </div>
    <div class="runner-row" v-bind:style="runnerRow">
      <div class="runner-container"  
        v-for="(item) in selectedSummary" 
        :key="item.index" 
        v-bind:class="{ selected: item.selected}">
        <h3 class="runner-title">{{item.brand}}<br> <i class="el-icon-caret-bottom"></i> </h3>
        <h6>網路支持率 
          <!-- <i class="el-icon-question"></i> -->
        </h6>
        <h1 class="runner-score">{{item.percent}}</h1>
        <img class="runner-img" :src="item.runnerSrc" alt="">
        <div class="runner-path" v-bind:class="{ selected: item.selected}" v-bind:style="{height: item.height}"></div>
      </div>
    </div>
    <!-- <img :src="this.categories[this.categoryIndex].items[0].srcSummary" alt=""> -->
  </div>
</template>

<script>
// import axios from "axios"
import _ from "lodash"

export default {
  name: 'Summary',
  props: ["summary", "categoryIndex", "categories", "brand"],
  data() {
    return {
      mode: "",
      summaryJson: {},
      selectedSummary: [],
    }
  },
  computed:{
    runnerRow: function () {
      console.log(this.selectedSummary.length);
      if (this.selectedSummary.length === 2) {
        return {
          marginLeft: "22%",
        }
      }
      return {}
    }
  },
  mounted() {
    document.body.classList.remove('bg-blur');
    
    for (let i in this.summary) {
      let targetCategory = _.find(this.categories, {title: this.summary[i][0]});
      let targetCategoryItems = _.find(targetCategory.items, {value: this.summary[i][1]});

      let item = {
        index: i,
        brand: this.summary[i][1],
        count: this.summary[i][2],
        score: this.summary[i][3], // 減塑得分
        runnerSrc: targetCategoryItems.srcSummary,
        selected: (this.brand === this.summary[i][1]),
      }

      if (!this.summaryJson[this.summary[i][0]]) {
        this.summaryJson[this.summary[i][0]] = [item]
      } else {
        this.summaryJson[this.summary[i][0]].push(item);
      }
    }

    this.selectedSummary = this.summaryJson[this.categories[this.categoryIndex].title]

    
    let total = _.sumBy(this.selectedSummary, "count");
    
    this.selectedSummary.forEach(item => {
      item.percent = `${((item.count / total) * 100).toFixed(2)}%`;
    });
    setTimeout(() => {
      this.selectedSummary = this.selectedSummary.map((item) => {
        item.height = `${((item.count / total) * 100 / 2.2).toFixed(2)}vh`;
        return item
      });  
    }, 500)
    
  },
  methods: {
    restart() {
      this.$emit("restart");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.summary {
  color: white;
  position: relative;
  overflow: hidden;
  z-index: 0;
  .float-btn {
    position: fixed;
    top: 5%;
    right:10%;
    z-index: 10;
    cursor: pointer;
  }
  @media (min-width: 1920px) {
    .runner-row {
      bottom: 0.4vw;
    }
  }
  .runner-row {
    position: relative;
    display: flex;
    left: 6vw;
    width: 88vw;
    height: 88vh;
    .runner-container {
      position: absolute;
      bottom: 0;
      // background-color: rgba(255,255,255, 0.6);
      display: block;
      transition: all 2s ease 0s;
      width: 22.5%;
      margin-left: 2%;
      height: auto;
      text-align: center;
      padding: 0 40px;
      box-sizing: border-box;
      .el-icon-caret-bottom {
        font-size: 4rem;
      }
      &:nth-child(2) {
        left: 24.5%;
      }
      &:nth-child(3) {
        left: 49%;
      }
      &:nth-child(4) {
        left: 73.5%;
      }
      &.selected {
        color: #ffb100;
      }
      .runner-score {
        transform: scale(1.2);
        font-weight: bold;
      }
      .runner-img {
        width: 100%;
        position: relative;
        z-index: 3;
      }
      .runner-path {
        height: 0;
        position: relative;
        z-index: 1;
        transition: all 2s ease 0s;
        background-color: white;
        margin-top: -18%;
        width: 40%;
        transform: translateX(70%);
        &.selected {
          background-color: #ffb100;
        }
      }
    }
  }
}

</style>
