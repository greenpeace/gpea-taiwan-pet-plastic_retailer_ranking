<template>
  <div class="replies">
    <div class="container">
      <div class="title">
        <h2>減塑不能停！企業最新減塑進展</h2>
        <h3>綠色和平持續跟零售企業對話、交流，來看看企業有什麼減塑新作法！</h3>
      </div>
      <div class="replies-container" id="replies-container">
        <div v-for="(item, index) in replies" :key="index" class="reply">
          <div class="icon" v-if="item.name.toLowerCase() !== 'greenpeace'">
            <img :src="item.img" width="100%" alt="">
          </div>
          <div class="message" v-if="item.name.toLowerCase() !== 'greenpeace'">
            <div class="brand-name">{{item.name}}</div>
            <div class="brand-reply">
              {{item.reply}}<br>
              <div class="brand-date">{{item.date}}</div>
            </div>
          </div>
          <div class="gp-message" v-else>
            <div class="brand-name">{{item.name}}</div>
            <div class="brand-reply">
              {{item.reply}}<br>
              <div class="brand-date">{{item.date}}</div>
            </div>
          </div>
        </div>
        <div class="no-reply">
          <div id="newest-reply">
            沒有更新的回覆
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import dayjs from "dayjs";

export default {
  name: 'Replies',
  props: ["appScript"],
  data() {
    return {
      replies: [],
      marts: [
        // 超商
        {
          name: "統一超商",
          img: require("../assets/marts/711.png"),
        },
        {
          name: "全家",
          img: require("../assets/marts/family.png"),
        },
        // 超市
        {
          name: "全聯福利中心",
          img: require("../assets/marts/px-mart.png"),
        },
        {
          name: "美廉社",
          img: require("../assets/marts/simple-mart.png"),
        },
        {
          name: "頂好",
          img: require("../assets/marts/wellcome.png"),
        },
        {
          name: "家樂福",
          img: require("../assets/marts/carrefour.png"),
        },
        //
        {
          name: "愛買",
          img: require("../assets/marts/a-mart.png"),
        },
        {
          name: "好市多",
          img: require("../assets/marts/costco.png"),
        },
        {
          name: "大潤發",
          img: require("../assets/marts/rt-mart.png"),
        },
      ]
    }
  },
  async mounted() {
    try {
      const repliesRef = await axios.get(`${this.appScript}?sheetName=replies`)
      repliesRef.data.values.shift();
      // console.log(repliesRef.data.values)
      this.replies = repliesRef.data.values.map(item => {
        // console.log(this.marts)
        let target = _.find(this.marts, {name: item[0]});
        // console.log(target)
        return {
          name: item[0],
          reply: item[1],
          date: dayjs(item[2]).format("YYYY-MM-DD"),
          img: target ? target.img : ""
        }
      })
      console.log(this.replies)
      var container = this.$el.querySelector("#replies-container");
      console.log(container.scrollHeight)
      setTimeout(() => {
        window.$('#replies-container').animate({
          scrollTop: container.scrollHeight
        }, 800)
      }, 500)
    } catch (err) {
      console.log(err);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.replies {
  height: 100vh;
  width: 100%;
  display: block;
  background-position: center center;
  background-size: 100%;
  background-repeat: no-repeat;
  background-image: url('../assets/replies_bg.png');
  .container {
    height: 100vh;
    width: 100%;
    position: relative;
    display: flex;
    z-index: 1;
    background-position: 20% 105%;
    background-size: 40%;
    background-repeat: no-repeat;
    background-image: url('../assets/replies_fish.png');
    .title {
      width: 50%;
      text-align: left;
      padding: 5% 5% 5% 10%;
      box-sizing: border-box;
      color: #4a4a4a;
      letter-spacing: 2pt;
      h3 {
        font-weight: lighter;
      }
    }
    .replies-container {
      box-sizing: border-box;
      width: 40%;
      height: 85vh;
      overflow-x: hidden;
      overflow-y: scroll;
      padding-top: 50px;
      position: relative;
      text-align: center;
      scroll-behavior: smooth;
      .no-reply {
        display: flex;
        justify-content: center;
        align-items: center; 
        * {
          background-color: #a7a7a7; 
          color: white;
          border-radius: 50px;
          padding: 10px 20px;
        }
      }
      .reply{
        display: flex;
        position: relative;
        margin: 50px;
        .icon {
          background-color: white;
          border-radius: 100px;
          width: 55px;
          height: 55px;
          display: flex;
          img {
            vertical-align: middle;
            align-items: center;
          }
        }
        .message {
          text-align: left;
          margin-left: 20px;
          letter-spacing: 1.2pt;
          width: 70%;
          .brand-name {
            color: #a7a7a7;
          }
          .brand-reply {
            color: #4a4a4a;
            background-color: white;
            margin-top: 10px;
            padding: 10px 20px;
            border-radius: 20px;
            line-height: 1.46;
            .brand-date {
              width: 100%;
              text-align: right;
              font-size: 0.1rem;
              color: #a7a7a7
            }
          }
        }
        .gp-message {
          text-align: left;
          letter-spacing: 1.2pt;
          width: 70%;
          margin-left: 30%;
          .brand-name {
            color: #a7a7a7;
            text-align: right;
          }
          .brand-reply {
            color: white;
            background-color: #00b900;
            margin-top: 10px;
            padding: 10px 20px;
            border-radius: 20px;
            line-height: 1.46;
            .brand-date {
              width: 100%;
              text-align: right;
              font-size: 0.1rem;
              color: white;
            }
          }
        }
      }
    }
  }
}
@media (min-width: 992px) and (max-width: 1919px) {
  .replies{
    .container {
      .replies-container {
        .reply {
          margin: 20px;
        }
      }
    }
  }
}
@media (max-width: 991px) {
  .replies{
    background-position: center center;
    background-size: 100% 200%;
    height: auto;
    padding-bottom: 50px;
    font-size: 0.8rem;
    .container {
      background-position: center bottom;
      background-size: 100%;
      display: inline-block;
      height: auto;
      .title {
        width: 100%;
        padding: 5%;
      }
      .replies-container {
        width: 92%;
        // margin-left: 5%;
        .reply {
          margin: 20px;
          .icon {
            width: 45px;
            height: 45px;
          }
        }
      }
    }
  }
  .brand-date {
    font-size: 0.8rem !important;
  }
}
</style>
