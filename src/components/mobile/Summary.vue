<template>
  <div class="summary" id="summary">
    <div class="option-dialog-btn">
      <i @click="optionDialogVisible = true" class="fa fa-bars fa-2x" aria-hidden="true"></i>
    </div>
    <div class="runner-row" v-bind:style="runnerRow">
      <div class="runner-container"  
        v-for="(item) in selectedSummary" 
        :key="item.index" 
        v-bind:class="{ selected: item.selected}"
        @click="openInfoDialog(item)">
        <h3 class="runner-title">{{item.brand}}<br> <i class="fa fa-caret-down" aria-hidden="true"></i> </h3>
        <h6>{{summaryType === 'support' ? "網路支持率" : "減塑得分"}}</h6>
        <h4 class="runner-score">{{summaryType === 'support' ? item.percent : item.score}}</h4>
        <i class="fa fa-question-circle" aria-hidden="true"></i>
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
          <el-button class="share-btn share-button share-button__fb" @click="open('https://www.facebook.com/sharer/sharer.php?u=https://act.gp/3j3B9Zo')"><i class="fa fa-share-alt" aria-hidden="true"></i> 分享投票活動給更多朋友</el-button>
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
          <div>
            <div class="floating-switch" @click="changeType">
              <div v-bind:class="{active: summaryType === 'score'}" class="switch-btn">減塑得分</div>
              <div v-bind:class="{active: summaryType === 'support'}" class="switch-btn">網路支持率</div>
            </div>
            <h2 @click="restart">看看其他組賽況 <i class="fa fa-chevron-right" aria-hidden="true"></i></h2>
          </div>
        </div>
      </div>
    </transition>

    <!-- info div -->
    <transition name="fade" mode="out-in">
      <div class="info-dialog" v-if="showInfo">
        <div class="info-dialog-container">
          <div class="close">
            <i @click="showInfo = false"  class="fa fa-times" aria-hidden="true"></i>
          </div>
          <div class="info-content">
            <h2>{{info.brand}}</h2>
            <el-row type="flex" class="score-row" justify="space-between">
              <el-col :span="6">
                <p>減塑整體得分</p>
              </el-col>
              <el-col :span="6">
                <h2>{{info.score}}</h2>
              </el-col>
              <el-col :span="6">
                <p>網路支持率</p>
              </el-col>
              <el-col :span="6">
                <h2>{{info.percent}}</h2>
              </el-col>
            </el-row>
            <div>
              {{info.description}}
            </div>
            <div class="advantage">
              <div class="icon">
                <img src="../../assets/good.png" alt="">
              </div>
              <div class="content">
                <h3>很棒！做得好！</h3>{{info.advantage}}
              </div>
            </div>
            <div class="disadvantage">
              <div class="icon">
                <img src="../../assets/bad.png" alt="">
              </div>
              <div class="content">
                <h3>加油！可以做更好！</h3>{{info.disadvantage}}
              </div>
            </div>
          </div>
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
      showInfo: false,
      info: {},
      optionDialogVisible: false,
      summaryType: "score", // support
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
    this.$scrollTo("#summary")
    for (let i in this.summary) {
      let targetCategory = _.find(this.categories, {title: this.summary[i][0]});
      let targetCategoryItems = _.find(targetCategory.items, {value: this.summary[i][1]});

      let item = {
        index: i,
        brand: this.summary[i][1],
        count: this.summary[i][2],
        score: this.summary[i][3], // 減塑得分
        description: this.summary[i][4],
        advantage: this.summary[i][5],
        disadvantage: this.summary[i][6],
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
    
    this.selectedSummary.forEach(item => {
      item.total = _.sumBy(this.selectedSummary, "count");
      item.percent = `${((item.count / item.total) * 100).toFixed(2)}%`;
    });
    console.log(this.selectedSummary)
    setTimeout(() => {
      this.bindChart();
    }, 500)
    setTimeout(() => {
      this.dialogVisible = true  
    }, 4000)
  },
  methods: {
    restart() {
      this.$emit("restart");
    },
    open(url) {
      window.open(url, "_blank")
    },
    openInfoDialog(item) {
      this.info = item;
      console.log(item)
      this.showInfo = true;
    },
    changeType() {
      if (this.summaryType === "score") {
        this.summaryType = "support"
      } else {
        this.summaryType = "score"
      }
      this.bindChart();
      // console.log(this.summaryType)
      this.optionDialogVisible = false;
    },
    bindChart() {
      if (this.summaryType === "support") {
        this.selectedSummary = this.selectedSummary.map((item) => {
          item.height = `${((item.count / item.total) * 100 / 2.2).toFixed(2)}vh`;
          return item
        });
      } else {
        this.selectedSummary = this.selectedSummary.map((item) => {
          item.height = `${((item.score / 60) * 100 / 2).toFixed(2)}vh`;
          return item
        });
      }
    },
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
    .floating-switch {
      background-color: white;
      border-radius: 50px;
      padding: 5px;
      display: flex;
      margin-bottom: 50px;
      .switch-btn {
        transition: all 0.3s ease-in;
        border: none;
        border-radius: 50px;
        padding: 8px 10px;
        font-weight: bolder;
        margin-left: 0;
        color: #a7a7a7;
        &.active {
          background-color: #ffb100;
          color: white;
        }
      }
    }
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

.info-dialog {  
  position: absolute;
  display: flex;
  vertical-align: middle;
  align-items: center;
  z-index: 100;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(5px);
  top: 0;
  right: 0;
  text-align: left;
  .info-dialog-container {
    position: relative;
    border-radius: 20px;
    width: 90%;
    margin: 5%;
    padding: 20px;
    background-color: white;
    box-sizing: border-box;
    color: #4a4a4a;
    max-height: 90vh;
    overflow-y: scroll;
    .close {
      float: right;
    }
    .info-content {
      color: #969696;
      h2 {
        margin-top: 5px;
        color: #4a4a4a;
      }
      .score-row {
        display: flex;
        text-align: center;
        white-space: nowrap;
        font-weight: bold;
      }
      .advantage, .disadvantage{
        margin-top: 20px;
        display: flex;
        .icon {
          margin-top: 10px;
          margin-right: 10px;
        }
        .content {
          h3 {
            color: #4a4a4a;
          }
        }
      }
    }
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
  height: 96vh;
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
    height: 96vh;
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
      .fa-question-circle {
        float: right;
        padding-right: 10px;
        margin-bottom: -10px;
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
