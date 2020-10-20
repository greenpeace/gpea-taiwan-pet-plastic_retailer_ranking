<template>
  <div class="footer">
    <div class="footer-content bg-blur">
      <el-row :gutter="20">
        <el-col :sm="9" :md="8">
          <el-row :gutter="20">
            <el-col :sm="24" :md="{span: 8, offset: 3}">
              <el-button class="share-btn" 
                @click="open('https://www.greenpeace.org/taiwan?ref=2020-plastic_retailer')">主頁</el-button>
            </el-col>
            <el-col :sm="24" :md="10" v-if="isDesktop">
              <el-button class="share-btn" 
                @click="open('https://supporter.ea.greenpeace.org/tw/s/donate?campaign=plastics&ref=2020-plastic_retailer')">支持我們</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20" v-if="!isDesktop">
            <el-col :sm="24" :md="{span: 10, offset: 3}">
              <el-button class="share-btn" 
                @click="open('https://supporter.ea.greenpeace.org/tw/s/donate?campaign=plastics&ref=2020-plastic_retailer')">支持我們</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :sm="{span: 24}" :md="{span: 21, offset: 3}" :lg="{span: 18, offset: 3}">
              <el-button class="share-btn" 
                @click="open('https://www.greenpeace.org/taiwan/policies/privacy-and-cookies/?ref=2020-plastic_retailer')">
                隱私政策與個人資料收集聲明
              </el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :sm="9">
          <p class="footer-text">綠色和平致力於為地球發聲，我們的存在是因為脆弱的地球需要改變、需要行動。但保護地球的使命不能僅靠綠色和平來完成，您就是改變世界的力量！</p>
        </el-col>
        <el-col :sm="6" :md="{span: 4, offset: 2}">
          <p class="footer-text">© 2020 Greenpeace</p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: ["isDesktop"],
  methods: {
    open(url) {
      window.open(url, "_blank")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.footer {
  position: relative;
  color: #424242;
  background-color: #f5f5f5;
  overflow: hidden; 
  .footer-content {
    height: 230px;
    padding: 20px;
    box-sizing: border-box;
    .el-row {
      margin-top: 20px;
    }
    .share-btn {
      width: 100%;
      border-radius: 50px;
      background-color: transparent;
      font-weight: bolder;
      font-size: 1rem;
      border: 1px solid #424242;
      &:hover {
        border-color: #ffb100;
      }
    }
    .footer-text {
      font-size: 1rem;
      padding-top: 20px;
      text-align: left;
    }
    .footer-copyright {
      font-size: 1rem;
      padding-top: 20px;
    }
  }
}
</style>
