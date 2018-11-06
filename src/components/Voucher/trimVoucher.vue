<template>
    <div id="trimVoucher" class="public-container">
      <el-row class="Rtitle">
        <el-col :span="12">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/checkCredential' }">查凭证</el-breadcrumb-item>
            <el-breadcrumb-item>凭证管理</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="12" align="right" class="right_top">
            <closeBtn></closeBtn>
        </el-col>
      </el-row>
      <div class="container">
        <el-steps :space="200" :active="activeStep" :align-center="true" style="width: 600px; margin: 0 auto">
          <el-step title="快速预览"></el-step>
          <el-step title="整理凭证"></el-step>
          <el-step title="完成" icon="el-icon-circle-check-outline"></el-step>
        </el-steps>
        <div class="line"></div>
        <div class="searchContainer">
          <el-form :inline="true" :model="searchData" class="demo-form-inline" v-if="activeStep !== 3">
            <el-form-item label="整理范围">
              <el-select v-model="searchData.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="凭证字">
              <el-select v-model="searchData.voucherText" placeholder="活动区域">
                <el-option label="记" value="shanghai"></el-option>
                <el-option label="住" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="歧视凭证字号">
              <el-select v-model="searchData.voucherText" placeholder="活动区域">
                <el-option label="未整理" value="shanghai"></el-option>
                <el-option label="已整理" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label=" ">
              <el-radio-group v-model="searchData.sort">
                <el-radio label="按凭证号顺次前移补齐断号"></el-radio>
                <el-radio label="按凭证日期重新顺次编号"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div style="text-align: center; margin-top: 30px" v-if="activeStep !== 3">
            <el-button type="primary" :btnType="`${skin_style}_btn`" @click="onSubmit">确定</el-button>
            <el-button type="primary" :btnType="`${skin_style}_btn`" v-if="activeStep == 2" @click="dialogVisible = true">开始整理</el-button>
          </div>

          <el-table
            :data="singleTable"
            stripe
            border
            ref="singleTable"
            highlight-current-row
            @current-change="handleCurrentChange"
            class="sunTable"
            v-if="activeStep == 2"
            style="width: 100%; margin-top: 20px; margin-bottom: 40px">
            <el-table-column
              prop="date"
            label="日期">
            </el-table-column>
            <el-table-column
              prop="beginNum"
              label="原有凭证号">
            </el-table-column>
            <el-table-column
              prop="endNum"
              label="重编后凭证号">
            </el-table-column>
          </el-table>
        </div>
        <div class="paginationBox" v-if="activeStep == 2">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage2"
            :pager-count="pageCount"
            :page-size="5"
            layout=" prev, pager, next, total, jumper"
            :total="50">
          </el-pagination>
          <el-button class="go">确定</el-button>
        </div>

        <div class="endStepBox" v-if="activeStep == 3">
          <div class="_success">
            <i class="el-icon-success"></i>
            <span>恭喜你，凭证整理完成!</span>
          </div>
          <p style="color: #0089BD; margin-top: 30px; cursor: pointer" @click="$router.push('/checkCredential')">返回凭证列表</p>

        </div>

      </div>


      <el-dialog
        title="整理凭证"
        :visible.sync="dialogVisible"
        custom-class="myDialog"
        width="559px">
        <div style="text-align: center; font-size: 16px">系统将自动对凭证号进行调整，已打印的凭证将需要重新打印!</div>
        <div slot="footer" class="dialog-footer">
          <span class="btn" :style="{background:skin_color}" @click="sureSort">确定</span>
          <span class="btn" @click="dialogVisible = false">暂不整理</span>
        </div>
      </el-dialog>

    </div>
</template>

<script>
  import { mapState, } from 'vuex'
   import closeBtn from '../closeTab'
    export default {
      name: "trimVoucher",
      computed:{
        ...mapState([
          'skin_style',
          'skin_color'
        ])
      },
      components:{
        closeBtn
      },
      data(){
        return{
          dialogVisible:false,
          activeStep:1,
          currentPage2:1,
          pageCount:5,
          searchData:{
            region:'',
            voucherText:'',
            sort:'',
          },
          singleTable:[{
            date:'2018-06-01',
            beginNum:'记-07',
            endNum:'记-04'
          },{
            date:'2018-06-01',
            beginNum:'记-07',
            endNum:'记-04'
          },{
            date:'2018-06-01',
            beginNum:'记-07',
            endNum:'记-04'
          },{
            date:'2018-06-01',
            beginNum:'记-07',
            endNum:'记-04'
          },{
            date:'2018-06-01',
            beginNum:'记-07',
            endNum:'记-04'
          },{
            date:'2018-06-01',
            beginNum:'记-07',
            endNum:'记-04'
          },{
            date:'2018-06-01',
            beginNum:'记-07',
            endNum:'记-04'
          },{
            date:'2018-06-01',
            beginNum:'记-07',
            endNum:'记-04'
          },{
            date:'2018-06-01',
            beginNum:'记-07',
            endNum:'记-04'
          },{
            date:'2018-06-01',
            beginNum:'记-07',
            endNum:'记-04'
          }]
        }
      },
      methods:{
        onSubmit(){
           this.activeStep = 2;
        },
        sureSort(){
          this.activeStep = 3;
          this.dialogVisible = false
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        },
      }
    }
</script>

<style scoped lang="scss">
  @import "../../assets/css/table_1";

  #trimVoucher{
    .Rtitle{
      .el-breadcrumb{
        line-height: 34px;
      }
    }
    .container{
      background: white;
      padding: 35px;
      margin-top: 20px;
      min-height: 400px;
    }
    .line{
      border: 1px dashed #DDDDDD;
      margin-top: 20px;
      margin-bottom: 30px;
    }
    .endStepBox{
      margin-top: 100px;
      text-align: center;
      ._success{
        .el-icon-success{
          font-size: 30px;
          color:#7DD321;
          vertical-align: middle;
        }
        >span{
          display: inline-block;
          height:30px;
          line-height: 30px;
          font-size:20px;
          font-weight:bold;
          color:rgba(51,51,51,1);
          margin-left: 6px;
          vertical-align: middle;
        }
      }
    }
  }
</style>

<style lang="scss">
  #trimVoucher{
    .el-step__icon.is-icon{
      width: 30px;
      height: 30px;
    }
    .el-step__head.is-process{
      color: #DDDDDD;
      border-color: #DDDDDD;
    }
    .el-step.is-horizontal .el-step__line{
      top: 15px;
    }
    .el-step__icon-inner[class*=el-icon]:not(.is-status){
      font-size: 30px;
    }
    .el-step__icon{
      width: 30px;
      height: 30px;
    }
    .el-step:not(:last-child){
      .el-step__head.is-finish{
        color: white;
        border-color: #0688BC;
        .el-step__icon.is-text{
          background-color: #0688BC;
        }
      }
    }

    .is-finish{
      .is-icon{
        color: #0688BC;
        .el-icon-circle-check-outline:before{
          content: "\E62D";
        }
      }
    }
    .el-step__title.is-finish{
      color: #0688BC;
    }

    .el-table .cell{
      height: 50px;
      line-height: 50px;
    }

  }
</style>
