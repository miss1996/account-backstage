<template>
    <div id="settle">
      <el-row class="Rtitle">
        <el-col :span="12">
          <span>2018年第6期共录入凭证 <span :style="{color:skin_color}">85</span>张，财务初始余额试算平衡</span>&nbsp;&nbsp;&nbsp;
          <el-checkbox v-model="checked">全选</el-checkbox>
        </el-col>
        <el-col :span="12" align="right" class="right_top">
          <el-row class="btn-box">
            <el-button type="primary" :btnType="`${skin_style}_btn`">重新测算</el-button>
            <el-button type="primary" :btnType="`${skin_style}_btn`">生成凭证</el-button>
            <el-button type="primary" :btnType="`${skin_style}_btn`">结账</el-button>
            <closeBtn></closeBtn>
          </el-row>
        </el-col>
      </el-row>

      <el-row class="content-row" :gutter="30">
        <el-col :span="4">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-row>
                <el-col :span="6">
                  <el-checkbox v-model="checked"></el-checkbox>
                </el-col>
                <el-col :span="12" align="center">数据恢复</el-col>
                <el-col :span="6" align="right"><i class="el-icon-setting" :style="{color:skin_color}"></i></el-col>
              </el-row>
            </div>
            <div class="inner-content">
              <p>金额<br/>-240,678.38</p>
              <el-button type="primary" :btnType="`${skin_style}_btn`">生成凭证</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-row>
                <el-col :span="6">
                  <el-checkbox v-model="checked"></el-checkbox>
                </el-col>
                <el-col :span="12" align="center">数据恢复</el-col>
                <el-col :span="6" align="right"><i class="el-icon-setting" :style="{color:skin_color}"></i></el-col>
              </el-row>
            </div>
            <div class="inner-content">
              <p>金额<br/>-240,678.38</p>
              <el-button type="primary" :btnType="`${skin_style}_btn`">生成凭证</el-button>
            </div>
          </el-card>
        </el-col>

        <el-col :span="4" class="addItem">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-row>&nbsp;</el-row>
            </div>
            <div class="inner-content">
              <div class="add-i"><i class="el-icon-plus"></i></div>
              <p class="title">期末结转凭证模板</p>
            </div>
          </el-card>
        </el-col>

      </el-row>
    </div>
</template>

<script>
  import { mapState, } from 'vuex'
  import closeBtn from './closeTab'
    export default {
        name: "",
        data() {
            return {
              checked:false
            }
        },
      computed:{
        ...mapState([
          'skin_style',
          'skin_color'
        ])
      },
      components:{
        closeBtn
      }
    }
</script>

<style scoped lang="scss">
  @import "../assets/css/table_1";
  #settle{
    margin: 10px 25px;
    .content-row{
      margin: 15px 0;
      .item {
        margin-bottom: 18px;
      }
      .clearfix:before,
      .clearfix:after {
        display: table;
        content: "";
      }
      .clearfix:after {
        clear: both
      }
      .box-card {
        width: 100%;
        .inner-content{
          background-color: white;
          text-align: center;
          font-size: $normal_size;
          padding-bottom: 20px;
          p{
            margin: 0;
            color: #000;
            padding: 50px 0;
          }
          .add-i{
            width: 120px;
            height: 120px;
            line-height: 120px;
            text-align: center;
            font-size: 45px;
            color: #999;
            border: 1px dashed #979797;
            margin: 25px auto 22px auto;
            cursor: pointer;
          }
          .title{
            color: #999;
            font-size: $normal_size;
            padding: 0;
          }
        }
      }

    }
    .el-icon-setting{
      font-size: 20px;
    }
  }
</style>
<style lang="scss">
  #settle{
    .el-card__header{
      background-color: #fafbfc;
    }
    .addItem{
      .el-card__body{
        padding: 14.5px 20px;
      }
    }
  }

</style>
