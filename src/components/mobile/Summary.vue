<template>
  <div class="summary">
    <div class="option-dialog-btn">
      <i @click="optionDialogVisible = true" class="fa fa-bars fa-2x" aria-hidden="true"></i>
    </div>
    <div class="runner-row" v-bind:style="runnerRow">
      <div class="runner-container"  
        v-for="(item) in selectedSummary" 
        :key="item.index" 
        v-bind:class="{ selected: item.selected}">
        <h3 class="runner-title">{{item.brand}}<br> <i class="fa fa-caret-down" aria-hidden="true"></i> </h3>
        <h6>網路支持率 
          <!-- <i class="el-icon-question"></i> -->
        </h6>
        <h4 class="runner-score">{{item.percent}}</h4>
        <img class="runner-img" :src="item.runnerSrc" alt="">
        <div class="runner-path" v-bind:class="{ selected: item.selected}" v-bind:style="{height: item.height}"></div>
      </div>
    </div>
    <!-- <img :src="this.categories[this.categoryIndex].items[0].srcSummary" alt=""> -->
    <div class="float-share-btn">
      <el-button @click="shareDialogVisible = true"><i class="fa fa-share-alt"  aria-hidden="true"></i></el-button>
    </div>
    <!-- share dialog -->
    <el-dialog
      class="share-dialog"
      :visible.sync="shareDialogVisible"
      :append-to-body="true"
      :show-close="false"
      width="90%">
      <div class="close">
        <i @click="shareDialogVisible = false"  class="fa fa-times" aria-hidden="true"></i>
      </div>
      <h2>感謝您的投票！我們將在近期公布各間零售企業的減塑評分<br>您可以追蹤我們，關注最新減塑及其他環境資訊！</h2>
      <br>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-button class="share-btn" @click="open('https://www.facebook.com/greenpeace.org.tw/')"><i class="fa fa-facebook-official" aria-hidden="true"></i> 追蹤綠色和平臉書</el-button>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :span="24">
          <el-button class="share-btn" @click="open('https://www.facebook.com/sharer/sharer.php?u=https://act.gp/3j3B9Zo')"><i class="fa fa-share-alt" aria-hidden="true"></i> 分享投票活動給更多朋友</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- option nav -->
    <transition name="fade" mode="out-in">
      <div class="option-dialog" v-if="optionDialogVisible">
        <div class="close">
          <i @click="optionDialogVisible = false"  class="fa fa-times fa-2x" aria-hidden="true"></i>
        </div>
        <div class="content">
          <h2 @click="restart">看看其他組賽況 <i class="fa fa-chevron-right" aria-hidden="true"></i></h2>
        </div>
      </div>
    </transition>
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
      shareDialogVisible: false,
      optionDialogVisible: false,
      summaryJson: {},
      selectedSummary: [],
    }
  },
  computed:{
    runnerRow: function () {
      // console.log(this.selectedSummary.length);
      if (this.selectedSummary.length === 2) {
        return {
          marginLeft: "23.5%",
        }
      }
      return {}
    }
  },
  mounted() {
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
    
    setTimeout(() => {
      this.shareDialogVisible = true  
    }, 4000)
  },
  methods: {
    restart() {
      this.$emit("restart");
    },
    open(url) {
      window.open(url, "_blank")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.option-dialog-btn {
  z-index: 5;
  width: 100%;
  text-align: right;
  box-sizing: border-box;
  padding: 20px;
  position: absolute;
}
.option-dialog {
  position: fixed;
  backdrop-filter: blur(12px);
  background-color: rgba(0,0,0,0.4);
  z-index: 2050;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  .close {
    width: 100%;
    text-align: right;
    padding: 20px;
    box-sizing: border-box;
  }
  .content {
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;

  }
}
.share-dialog {
  .close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 20px;
    cursor: pointer;
  }
  h2 {
    text-align: center;
  }
}
.float-share-btn {
  position: absolute;
  bottom: 10px;
  right: 20px;
  .el-button {
    background-color: transparent;
    color: white;
    padding: 5px;
  }
}
.share-btn {
  width: 100%;
}
.summary {
  background-image: url("../../assets/bg_mobile.png");
  background-size: cover;
  background-position: center bottom;
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
  .runner-row {
    position: relative;
    display: flex;
    left: 5vw;
    width: 96vw;
    height: 88vh;
    .runner-container {
      position: absolute;
      bottom: 18.5vw;
      display: block;
      transition: all 2s ease 0s;
      width: 20.5%;
      height: auto;
      text-align: center;
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
        width: 100%;
        // transform: scale(0.6);
        // font-size: 1rem;
        font-weight: bold;
      }
      .runner-img {
        width: 100%;
        min-height: 100px;
        position: relative;
        z-index: 3;
        transform: scale(0.8);
      }
      .runner-path {
        height: 0;
        position: relative;
        z-index: 1;
        transition: all 2s ease 0s;
        background-color: white;
        margin-top: -40%;
        width: 40%;
        transform: translateX(75%);
        &.selected {
          background-color: #ffb100;
        }
      }
    }
  }
}

</style>
