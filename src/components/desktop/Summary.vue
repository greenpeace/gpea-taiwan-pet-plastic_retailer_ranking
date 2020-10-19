<template>
  <div class="summary" id="summary">
    <div class="float-btn">
      <div class="floating-switch" @click="changeType">
        <div v-bind:class="{active: summaryType === 'score'}" class="switch-btn">減塑得分</div>
        <div v-bind:class="{active: summaryType === 'support'}" class="switch-btn">網路支持率</div>
      </div>
      <h4 @click="restart">看看其他組賽況 <i class="fa fa-chevron-right" aria-hidden="true"></i></h4>
    </div>
    <div class="runner-row" v-bind:style="runnerRow">      
      <div class="runner-container"  
        v-for="(item, index) in selectedSummary" 
        :key="item.index" 
        v-bind:class="{ selected: item.selected}">
        <h3 class="runner-title">{{item.brand}}<br> <i class="fa fa-caret-down" aria-hidden="true"></i> </h3>
        <h6>
          <!-- {{summaryType === 'support' ? "網路支持率" : "減塑得分"}} <i class="el-icon-question tooltip-target"></i> -->
          <v-popover 
            offset="16"
            trigger="manual"
            :open="isOpen === index"
            :auto-hide="false">
            {{summaryType === 'support' ? "網路支持率" : "減塑得分"}} <i class="fa fa-question-circle tooltip-target" aria-hidden="true" @mouseover="isOpen = index" @mouseout="isOpen = false"></i>
            <template slot="popover">
              <div class="popover-container">
                <h2>{{item.brand}}</h2>
                <div class="score-row">
                  <p>減塑整體得分</p>
                  <h1>{{item.score}}</h1>
                  <p>網路支持率</p>
                  <h1>{{item.percent}}</h1>
                </div>  
                <p>{{item.description}}</p>
                <div class="advantage">
                  <div class="icon">
                    <img src="../../assets/good.png" alt="">
                  </div>
                  <div class="content">
                    <h3>很棒！做得好！</h3><span v-html="item.advantage"></span>
                  </div>
                </div>
                <div class="disadvantage">
                  <div class="icon">
                    <img src="../../assets/bad.png" alt="">
                  </div>
                  <div class="content">
                    <h3>加油！一定要做更好哦！</h3><span v-html="item.disadvantage"></span>
                  </div>
                </div>
              </div>
            </template>
          </v-popover>
        </h6>
        <h1 class="runner-score">{{summaryType === 'support' ? item.percent : item.score}}</h1>
        <img class="runner-img" :src="item.runnerSrc" alt="">
        <div class="runner-path" v-bind:class="{ selected: item.selected}" v-bind:style="{height: item.height}"></div>
      </div>
    </div>
    <!-- <img :src="this.categories[this.categoryIndex].items[0].srcSummary" alt=""> -->
    <div class="float-share-btn">
      <small>*此評分結果為截至2020年10月12日零售通路企業回覆資料之統整結果</small>
      <!-- <el-button @click="dialogVisible = true"><i class="fa fa-share-alt"  aria-hidden="true"></i></el-button> -->
    </div>
    <el-dialog
      class="share-dialog"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :show-close="false"
      width="50%">
      <div class="close">
        <i @click="dialogVisible = false"  class="fa fa-times" aria-hidden="true"></i>
      </div>
      <h2>感謝您的投票！我們將在近期公布各間零售企業的減塑評分<br>您可以追蹤我們，關注最新減塑及其他環境資訊！</h2>
      <br>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-button class="share-btn" @click="open('https://www.facebook.com/greenpeace.org.tw/')"><i class="fa fa-facebook-official" aria-hidden="true"></i> 追蹤綠色和平臉書</el-button>
        </el-col>
        <el-col :span="12">
          <el-button class="share-btn share-button share-button__fb" @click="open('https://www.facebook.com/sharer/sharer.php?u=https://act.gp/3j3B9Zo')"><i class="fa fa-share-alt" aria-hidden="true"></i> 分享投票活動給更多朋友</el-button>
        </el-col>
      </el-row>
    </el-dialog>
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
      isOpen: false,
      dialogVisible: false,
      summaryType: "score", // support
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
        advantage: `<ul style="padding-left: 20px;">${this.summary[i][5].split("-").map(item => {if (item) {return `<li>${item}</li>`}}).join("")}</ul>`,
        disadvantage: `<ul style="padding-left: 20px;">${this.summary[i][6].split("-").map(item => {if (item) {return `<li>${item}</li>`}}).join("")}</ul>`,
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
    // setTimeout(() => {
    //   this.dialogVisible = true  
    // }, 4000)
  },
  methods: {
    restart() {
      this.$emit("restart");
    },
    changeType() {
      if (this.summaryType === "score") {
        this.summaryType = "support"
      } else {
        this.summaryType = "score"
      }
      this.bindChart();
      console.log(this.summaryType)
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
    open(url) {
      window.open(url, "_blank")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@media (min-width: 1920px) {
  .popover-container {
    font-size: 1rem;
  }    
}
.popover-container {
  h2 {
    color: #4a4a4a;
  }
  letter-spacing: 1pt;
  color: #969696;
  padding-bottom: 10px;
  .score-row {
    display: flex;
    align-items: baseline;
    h1 {
      color: #4a4a4a;
      margin: unset;
      margin-right: 40px;
      margin-left: 20px;
    }
  }
  .advantage, .disadvantage {
    display: flex;
    padding-top: 10px;
    padding-bottom: 10px;
    .icon {
      max-width: 50px;
      margin-right: 10px;
    }
    .content {
      margin: 0;
      h3 {
        color: #4a4a4a;
        margin: unset;
        margin-bottom: 10px;
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
.float-share-btn {
  position: absolute;
  bottom: 10px;
  right: 0;
  transform: scale(0.8, 0.8);
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
  color: white;
  position: relative;
  overflow: hidden;
  z-index: 0;
  height: 100vh;
  .float-btn {
    position: absolute;
    cursor: pointer;
    top: 5%;
    right: 5%;
    z-index: 10;
    font-size: 0.8rem;
    .floating-switch {
      background-color: white;
      border-radius: 50px;
      padding: 5px;
      display: flex;
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
  @media (min-width: 1920px) {
    .runner-row {
      bottom: 0.4vw;
    }
    .float-btn {
      font-size: 1rem;
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
        transform: scale(1.4);
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
