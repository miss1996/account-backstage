<template>
    <div id="wvas">
      <el-row>
        <el-col :span="16">
          <span class="title">增值服务</span>
          <span class="content">付费用户可在此选择增值功能</span>
        </el-col>
        <el-col align="right" :span="8">
          <el-row class="btn-box">
            <closeBtn></closeBtn>
          </el-row>
        </el-col>
      </el-row>

      <el-row :gutter="60" class="list">
        <el-col :span="6" v-for="(item, index) in productList" :key="index">
          <div class="item">
            <img class="img" :src="item.src" alt="">
            <div class="btnbox">
              <div class="top">
                <span class="name">{{ item.name }}</span>
                <span class="detail">详情 >></span>
              </div>
              <span class="red">{{ item.price}}</span><span> {{item.unit}}</span>
              <el-button type="primary" :btnType="`${skin_style}_btn`">申 请</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>


</template>

<script>
  import { mapState, } from 'vuex'
  import closeBtn from '../closeTab'
    export default {
        data() {
            return {
               productList: [
                   { src: require("../../assets/imgs/wvas_1.png"), name: "数据恢复", price: "¥1500", unit: "/账套", url: "" },
                   { src: require("../../assets/imgs/wvas_2.png"), name: "套打设计", price: "¥1500", unit: "/账套", url: "" },
                   { src: require("../../assets/imgs/wvas_3.png"), name: "账套导入", price: "¥1500", unit: "/账套", url: "" },
                   { src: require("../../assets/imgs/wvas_4.png"), name: "自定义报表", price: "¥1500", unit: "/账套", url: "" },
                   { src: require("../../assets/imgs/wvas_5.png"), name: "产品培训", price: "¥1500", unit: "/账套", url: "" },
                   { src: require("../../assets/imgs/wvas_6.png"), name: "专属顾问", price: "¥1500", unit: "/账套", url: "" },
                   { src: require("../../assets/imgs/wvas_7.png"), name: "初始化服务", price: "¥1500", unit: "/账套", url: "" },
               ],
            }
        },
      components:{
        closeBtn
      },
      computed:{
        ...mapState([
          'skin_style',
          'skin_color'
        ])
      },
    }
</script>

<style lang="scss" scoped>
    #wvas {
        background: #f4f4f4;
      margin: 0 35px 0 45px;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
        .title {
            font-size:20px;
            color:#333333;
            font-weight: 700;
        }
        .content {
            font-size:18px;
            color:#999999;
        }
        .list {
          margin-top: 30px;
            .item {
                margin-bottom: 60px;
                overflow: hidden;
                width: 85%;
                .img {
                    width: 100%;
                    height: 258px;
                  font-size: 0;
                }
                .name {
                    font-size:22px;
                    color:#333333;
                }
              .detail{
                float: right;
                color: #30aabc;
                cursor: pointer;
              }
              .btnbox{
                overflow: hidden;
                padding: 10px 16px;
                margin-top: -3px;
                background-color: white;
                .top{
                  line-height: 60px;
                }
                .red{
                  color: red;
                  font-size: 18px;
                }
                button{
                  float: right;
                }
              }
            }
        }
    }
</style>

