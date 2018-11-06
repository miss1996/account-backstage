<template>
  <div id="fileVoucher" class="public-container">
    <el-row class="Rtitle">
      <el-col :span="12">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/checkCredential' }">查凭证</el-breadcrumb-item>
          <el-breadcrumb-item>Excel导入</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="12" align="right" class="right_top">
        <closeBtn></closeBtn>
      </el-col>
    </el-row>
    <div class="container">
      <el-steps :space="200" :active="activeStep" :align-center="true" style="width: 600px; margin: 0 auto">
        <el-step title="下载模板"></el-step>
        <el-step title="导入Excle表"></el-step>
        <el-step title="导入完毕" icon="el-icon-circle-check-outline"></el-step>
      </el-steps>
      <div class="line"></div>
      <div class="searchContainer">
        <div v-if="activeStep === 1">
          <el-button type="text" icon="el-icon-download">下载模板</el-button>
          <div style="margin-top: 80px; text-align: center; margin-bottom: 50px" >
            <el-button type="primary" :btnType="`${skin_style}_btn`" @click="onSubmit">下一步</el-button>
          </div>
          <p style="color: #EE0623;">温馨提示：请下载统一的模版，并按相应的格式在Excel软件中填写您的业务数据，然后再导入到系统中。</p>
        </div>

        <div v-if="activeStep === 2">
          <el-form :inline="true" :model="searchData" class="demo-form-inline" v-if="activeStep !== 3">
            <el-form-item label=" ">
              <el-checkbox v-model="searchData.code">凭证重新编号</el-checkbox>
            </el-form-item>
            <el-form-item label=" " style="margin-left: 50px;">
              <span style="color: #333333">请选择要导入的Excel文件</span> <input type="text" name="file-path" v-model="fileName" id="file-path" class="ui-input" readonly="" autocomplete="false">
              <div class="webuploader-pick">
                <span>浏览</span>
                <input type="file" capture="camera" name="file" @change="changeFile" class="webuploader-element-invisible" multiple="multiple" accept=".xls,.xlsx">
              </div>
            </el-form-item>
          </el-form>
          <div align="center" style="margin-top: 70px">
            <el-button @click="activeStep = 1" style="margin-right: 32px">上一步</el-button>
            <el-button type="primary" :btnType="`${skin_style}_btn`" @click="outputFile">导 入</el-button>
          </div>
        </div>
      </div>


      <div class="endStepBox" v-if="activeStep == 3">
        <div class="_success _result" v-if="outputSuccess">
          <i class="el-icon-success"></i>
          <span>恭喜你，凭证整理完成!</span>
        </div>

        <div class="_error _result" v-else>
          <i class="el-icon-warning"></i>
          <span>导入的Excle列数不对，请重新导入！</span>
        </div>

        <el-button type="primary" :btnType="`${skin_style}_btn`" @click="activeStep = 2">上一步</el-button>
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
        outputSuccess:false,
        fileName:'',
        dialogVisible:false,
        activeStep:1,
        currentPage2:1,
        pageCount:5,
        searchData:{
          code:'',
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
      outputFile(){
         this.activeStep =3
        if(Math.random() > 0.5){
          this.outputSuccess = true
        }else{
          this.outputSuccess = false
        }
      },
      changeFile(e){
        console.log(e)
        this.fileName = e.srcElement.files[0].name
        // if(e.files && e.files[0] ){
        //   file = e.files[0];
        //   var reader=new FileReader();
        //   reader.readAsDataURL(file);
        //
        // }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/table_1";

  #fileVoucher{
    .ui-input{
      width:255px;
      height:35px;
      border-radius:2px;
      border:1px solid rgba(216,220,229,1);
      vertical-align: middle;
      padding-left: 10px;
    }
    .webuploader-pick{
      display: inline-block;
      width: 60px;
      height: 34px;
      padding: 0;
      line-height: 34px;
      background-color: #fafdff;
      color:#0089BD;
      border: 1px solid #D8DCE5;
      font-size: 13px;
      position: relative;
      text-align: center;
      border-radius: 3px;
      overflow: hidden;
      cursor: pointer;
      vertical-align: middle;
      input[type=file]{
        cursor: pointer;
      }
      .webuploader-element-invisible{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 999;
      }
    }
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
      ._result{
        margin-bottom: 60px;
        .el-icon-warning{
          font-size: 30px;
          color:#FFA93C;
          vertical-align: middle;
        }

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
  #fileVoucher{
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
