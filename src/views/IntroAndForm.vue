<template>
  <div class="intro">
    <!-- <div class="floating-man">
      <img src="../assets/landing_man.png" width="100%" alt="">
    </div> -->
    <transition name="el-fade-in">
      <div class="intro-block" v-if="show">
        <div>
          <el-row>
            <el-col :sm="12">
              <h1>解決塑膠問題，企業加油好嗎？</h1>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <p>消費者有心減塑、政府推動限塑政策之外，若零售企業也積極與供應商、物流商等合力減少塑膠用量，一定會帶來明顯的效果！一起為零售企業加油，為環境更加努力！</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="12">
              <el-button class="confirm-btn" v-scroll-to="'#form-block'">
                <!-- <i class="fa fa-spinner fa-spin" ></i>  -->
                我也來幫忙
              </el-button>
            </el-col>
          </el-row>
        </div> 
      </div>
    </transition>  
    <div id="form-block" class="form-block" v-if="show">
      <el-row>
        <el-col :sm="12" class="title">
          <h1>立即連署，要求九大零售企業，<br>減少塑膠包裝！</h1>
          <p>綠色和平會把你的訴求，轉達給各企業。</p>
        </el-col>
        <!-- form -->
        <el-col :xs="24" :sm="12">
          <div class="form-container">
            <!-- progress bar -->
            <div class="progress-bar-container">
              <el-row :gutter="15">
                <el-col :xs="15" :sm="18">
                  <div class="progress-title">當前連署進度</div>
                  <div class="progress-bar">
                    <div class="progress-bar-outer">
                      <div class="fish-icon" v-bind:style="{left: progressBarFishPos}">
                        <img src="../assets/fish.png" width="100%" alt="">
                        <img src="../assets/bubble.png" class="bubble" width="100%" alt="">
                      </div>
                      <div class="progress-bar-inner" v-bind:style="{width: progressBarWidth}"></div>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="9" :sm="6" class="progress-number">
                  <h3>
                    <animated-number
                      :value="progressNumber"
                      :formatValue="formatToPrice"
                      :duration="1000"  />
                  </h3>
                  <h6> / {{progressGoal}}</h6>
                </el-col>
              </el-row>
            </div>
            <transition name="el-fade-in">
              <div class="form" v-if="!formComplete" v-loading="formLoading">
                <el-form
                  :model="ruleForm"
                  :rules="rules"
                  ref="ruleForm"
                  label-width="120px"
                  label-position="top">
                  <el-form-item label="電子信箱" prop="email" required>
                    <el-input autocomplete="on" placeholder="greenpeace@gmail.com" v-model="ruleForm.email"></el-input>
                  </el-form-item>
                  <el-row :gutter="30">
                    <el-col :span="12">
                      <el-form-item label="姓氏" prop="lastName" required>
                        <el-input autocomplete="on" v-model="ruleForm.lastName" placeholder="王"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="名字" prop="firstName" required>
                        <el-input autocomplete="on" v-model="ruleForm.firstName" placeholder="小明"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="30">
                    <el-col :xs="24" :md="24" :xl="17">
                      <el-form-item label="電話（0912345678 或 02-23612351）" prop="phoneNumber" required>
                        <el-input autocomplete="on" v-model="ruleForm.phoneNumber" placeholder="0912345678"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="12" :md="12">
                      <el-form-item label="出生年份" prop="yearOfBirth" required>
                        <el-date-picker type="year" v-model="ruleForm.yearOfBirth" style="width: 100%;"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="15">
                    <el-col
                      :xs="{span: 3}"
                      :sm="{span: 3}"
                      :md="{span: 3}"
                      :xl="{span: 1}"
                    >
                      <el-form-item label class="check-box">
                        <el-checkbox v-model="ruleForm.moreInfo"></el-checkbox>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="20" :sm="20" :md="20" :xl="21">
                      <p class="checkbox-text">我要即時收到最新專案訊息，知道更多參與和協助的方法！<br><span>綠色和平尊重您的個人隱私資料，您可以隨時取消訂閱，請參考<a href="" target="_blank">隱私保護政策</a>。</span></p>
                    </el-col>
                  </el-row>
                  <div class="submit-btn-container">
                    <el-form-item>
                      <el-button
                        round
                        class="submit-btn"
                        @click="submitForm('ruleForm')"
                      >立即連署</el-button>
                    </el-form-item>
                  </div>
                </el-form>
              </div>
              <div class="form-complete" v-if="formComplete">
                <div>
                  <i class="fa fa-check-circle fa-5x" aria-hidden="true"></i>
                  <h2>連署成功</h2>
                  <p>感謝您對地球盡一份心力！</p>
                </div>
              </div>
            </transition>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs"
import AnimatedNumber from "animated-number-vue";
var Mailcheck = require("mailcheck");

export default {
  name: 'Intro',
  components: {
    AnimatedNumber
  },
  props: {
    msg: String
  },
  data() {
    var validateName = (rule, value, callback) => {
      let nameReg = new RegExp(/^[\u4e00-\u9fa5_a-zA-Z_ ]{1,40}$/);
      if (value === "") {
        callback(new Error("姓名格式不正確，請不要輸入數字或符號"));
      } else if (!nameReg.test(value)) {
        callback(new Error("姓名格式不正確，請不要輸入數字或符號"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      let re_phone = new RegExp(/0\d{1,2}-\d{6,8}/);
      let re_mobile = new RegExp(/((?=(09))[0-9]{10})$/);
      if (value === "") {
        callback(new Error("電話格式不正確"));
      } else if (!(re_phone.test(value) || re_mobile.test(value))) {
        callback(new Error("電話格式不正確"));
      } else {
        callback();
      }
    };
    return {
      show: false,
      formComplete: false,
      formLoading: false,
      progressNumber: 1200,
      progressGoal: 200000,
      ruleForm: {
        email: "",
        lastName: "",
        firstName: "",
        phoneNumber: "",
        yearOfBirth: "",
        moreInfo: true
      },
      rules: {
        email: [
          {
            type: "email",
            required: true,
            message: "請輸入電子郵件",
            trigger: "blur"
          }
        ],
        lastName: [
          {
            validator: validateName,
            message: "姓名格式不正確",
            trigger: "blur"
          }
        ],
        firstName: [
          {
            validator: validateName,
            message: "姓名格式不正確，請不要輸入數字或符號",
            trigger: "blur"
          }
        ],
        phoneNumber: [
          {
            validator: validatePhone,
            message: "電話格式不正確",
            trigger: "blur"
          }
        ],
        yearOfBirth: [
          {
            type: "date",
            required: true,
            message: "請選擇出生年份",
            trigger: "blur"
          }
        ]
      }
    }
  },
  computed: {
    progressBarWidth: function () {
      return ((this.progressNumber / this.progressGoal) * 100 ).toString() + "%";
    },
    progressBarFishPos: function () {
      return ((this.progressNumber / this.progressGoal) * 100 - 10).toString() + "%";
    },
  },
  mounted() {
    this.show = true;
    setTimeout(() => {
      this.progressNumber = 12000;
    }, 2000)
  },
  methods: {
    formatToPrice(value) {
      // console.log(value)
      var parts = value.toString().split(".");
      parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");
      return parts[0]
    },
    submitForm(formName) {
      // console.log((this.ruleForm.moreInfo ? "Y" : "N"));
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
        // this.yahooADTracking();
        // this.$emit("thankYou");
        this.postForm();
      });
    },
    validatePhone(rule, value, callback) {
      let re_phone = new RegExp(/0\d{1,2}-\d{6,8}/);
      let re_mobile = new RegExp(/((?=(09))[0-9]{10})$/);
      if (value === "") {
        callback(new Error("電話格式不正確"));
      } else if (!(re_phone.test(value) || re_mobile.test(value))) {
        callback(new Error("電話格式不正確"));
      } else {
        callback();
      }
    },
    checkMail() {
      //email suggestion, email correctness
      let domains = [
        "me.com",
        "outlook.com",
        "netvigator.com",
        "cloud.com",
        "live.hk",
        "msn.com",
        "gmail.com",
        "hotmail.com",
        "ymail.com",
        "yahoo.com",
        "yahoo.com.tw",
        "yahoo.com.hk",
      ];
      let topLevelDomains = ["com", "net", "org"];

      Mailcheck.run({
        email: window.$("[name='email']").val(),
        domains: domains, // optional
        topLevelDomains: topLevelDomains, // optional
        suggested: (suggestion) => {
          window.$("#emailSuggestion").html(suggestion.full);
          window.$(".email-suggestion").show();

          window.$(".email-suggestion").click(function () {
            window.$("[name='email']").val(window.$("#emailSuggestion").html());
            window.$(".email-suggestion").hide();
          });
        },
        empty: () => {
          this.emailSuggestion = null;
        },
      });
    },
    async postForm() {
      this.formLoading = true;
      let $ = (selector) => document.querySelector(selector),
      $all = (selector) => document.querySelectorAll(selector);

      this.$emit("displayCover");
      
      if (this.isDDPage && !this.ruleForm.phoneNumber) {
        this.ruleForm.phoneNumber = ""
      }
      // modify the original form
      $('#mc-form [name="Email"]').value = this.ruleForm.email;
      $('#mc-form [name="LastName"]').value = this.ruleForm.lastName;
      $('#mc-form [name="FirstName"]').value = this.ruleForm.firstName;
      $('#mc-form [name="MobilePhone"]').value = this.ruleForm.phoneNumber;
      $('#mc-form [name="OptIn"]').value = this.ruleForm.moreInfo;
      $('#mc-form [name="Birthdate"]').value = dayjs(
        this.ruleForm.yearOfBirth
      ).format("YYYY-MM-DD");
      //console.log("optin:", $('#mc-form [name="OptIn"]').value);
      // collect values from form
      let formData = new FormData();
      $all("#mc-form input").forEach(function (el) {
        let v = null;
        if (el.type === "checkbox") {
          v = $('#mc-form [name="OptIn"]').value;
        } else {
          v = el.value;
        }

        formData.append(el.name, v);
        //console.log('use', el.name, v)
      });

      this.formComplete = true;
      this.$scrollTo("#form-block");
      return 

      // need testing
      // return fetch($("#mc-form").action, {
      //   method: "POST",
      //   body: formData,
      // })
      //   .then((response) => response.json())
      //   .then((response) => {
      //     if (response) {
      //       console.log("mc form posted")
      //       console.log('response', response)
      //       // this.$emit("removeCover");
      //       // this.$emit("thankYou");
      //       this.formLoading = false;
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     this.formLoading = false;
      //     // this.$emit("removeCover");
      //   });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@keyframes shake {
  0% {background-position: 40% top;}
  25% {background-position: 60% top;}
  50% {background-position: 30% top;}
  75% {background-position: 50% top;}
  100% {background-position: 40% top;}
}

@keyframes shake-m {
  0% {background-position: 20% top;}
  50% {background-position: 70% top;}
  100% {background-position: 20% top;}
}

.intro {
  position: relative;
  z-index: 0;
  // background-position: center top;
  animation-name: shake;
  animation-duration: 6s;
  animation-iteration-count: infinite;
  background-size: 110%;
  background-repeat: no-repeat;
  background-color: black;
  background-image: url('../assets/intro_bg.png');
  width: 100%;
  height: auto;
  text-align: left;
  letter-spacing: 2pt;
  .floating-man {
    position: absolute;
    bottom: -35%;
    right: 100px;
    width: 40%;
  }
  .intro-block {
    transition: all .5s ease;
    position: relative;
    padding: 5% 10%;
    height: 100vh;
    color: white;
    .confirm-btn {
      padding: 20px 40px;
      border-radius: 34px;
      background-color: #ffb100;
      font-weight: bold;
      letter-spacing: inherit;
      color: white;
      font-size: 1.2rem;
      border: none;
      cursor: pointer;
      &:hover {
        background-color: #f57f17;
      }
    }
  }

  .form-block {
    transition: all .5s ease;
    position: relative;
    padding: 2% 10%;
    height: auto;
    min-height: 720px;
    color: white;
    .title {
      margin-top: 10%;
    }
    .form-container {
      position: relative;
      width: 100%;
      min-height: 550px;
      border-radius: 10px;
      background-color: white;
      overflow: hidden;
      .progress-bar-container {
        background-color: #f4f4f4;
        color: #a7a7a7;
        height: 180px;
        padding: 5%;
        box-sizing: border-box;
        .progress-title {
          font-size: 1rem;
        }
        .progress-number {
          text-align: right;
          padding-top: 40px;
          h3, h6 {
            margin: 10px 0;
          }
        }
        .progress-bar {
          width: 100%;
          margin-top: 60px;
          .progress-bar-outer {
            position: relative;
            width: 100%;
            height: 10px;
            background-color: white;
            border-radius: 10px;
            .fish-icon {
              transition: all 1s ease-in-out;
              position: absolute;
              left: 0;
              transform: translateY(-35%);
              width: 25%;
              .bubble {
                width: 15%;
                position: absolute;
                transform: translate(-140%, -90%);
              }
            }
            .progress-bar-inner {
              transition: all 1s ease-in-out;
              background-color: #192555;
              width: 0;
              height: inherit;
              border-radius: 10px;
            }
          }
        }
      }
      .form {
        padding: 4% 10%;
        .checkbox-text {
          font-size: 0.6rem;
          color: #4a4a4a;
          span {
            color: #a7a7a7;
            a {
              color: #ffb100;
            }
          }
        }
        .submit-btn-container {
          margin-top: 20px;
          width: 50%;
          .submit-btn {
            width: 100%;
            color: white;
            background-color: #ffb100;
            letter-spacing: 2pt;
            font-weight: bolder;
            &:hover {
              background-color: #f57f17;
            }     
          }
        }
      }
      .form-complete {
        position: absolute;
        display: flex;
        text-align: center;
        align-items: center;
        vertical-align: middle;
        height: 80%;
        width: 100%;
        color: #4a4a4a;
        * {
          text-align: center;
          width: 100%;
        }
        .fa-check-circle {
          color: #66cc00;
        }
      }
    }
  }
}

@media (min-width: 1920px) {
  .checkbox-text {
    font-size: 0.8rem;
  } 
  .form-container {
    min-height: 850px;
  }
}
@media (max-width: 991px) {
  .intro {
    background-size: cover;
    animation-name: shake-m;
    .intro-block {
      text-align: center;
      display: flex;
      align-items: flex-end;
      vertical-align: baseline;
      line-height: 1.6;
      h1 {
        font-size: 1.1rem;
      }
      .confirm-btn {
        margin-top: 30vh;
        margin-bottom: 20vh;
        padding: 10px;
        width: 100%;
      }
    }
  }

 .form-block {
   padding: 20px 5% !important;
   height: auto !important;
    .title {
      text-align: center;
      font-size: 0.6rem;
      p {
        font-size: 0.8rem;
      }
    }
    .form-container {
      .progress-bar-container {
        width: 100%;
        height: 150px !important;
        .progress-title {
          font-size: 1rem;
        }
      }
    }
    .submit-btn-container {
      width: 100% !important;
    }
  }
}
</style>
