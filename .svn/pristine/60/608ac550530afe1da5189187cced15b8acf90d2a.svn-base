<template>
  <div id="systemParam" class="public-container">
    <el-row :gutter="30" class="sysMain">
      <el-col :span="11">
          <el-button type="primary" @click="reastMssage" style="margin-bottom:15px">重新初始化</el-button>

        <div class="bac-fff"  style="padding-bottom: 50px">
          <div class="title">新建账套</div>
          <el-form ref="baseSetting" :model="baseSetting" label-width="80px">
            <el-form-item label="公司名称">
              <el-input v-model="baseSetting.companyName" ></el-input>
            </el-form-item>
            <el-form-item label="本币为">
              <el-input value="RMB" :disabled="true"  style="width:198px;"></el-input>
            </el-form-item>
            <el-form-item label="启用时间">
              <div style="width: 85%">
                <el-col :span="10">
                  <div class="handle-btn disabled">
                    <el-input v-model="baseSetting.beginTime" ></el-input>
                    <div class="handle">
                      <i class="el-icon-arrow-up"></i>
                      <i class="el-icon-arrow-down"></i>
                    </div>
                  </div>
                </el-col>
                <el-col class="line" :span="2">年</el-col>
                <el-col :span="10">
                  <div class="handle-btn disabled">
                    <el-input v-model="baseSetting.qishu"></el-input>
                    <div class="handle">
                      <i class="el-icon-arrow-up"></i>
                      <i class="el-icon-arrow-down"></i>
                    </div>
                  </div>
                </el-col>
                <el-col class="line" :span="2">期</el-col>
              </div>
            </el-form-item>
            <el-form-item label="会计制度">
              <el-select v-model="baseSetting.accountantSystemId" placeholder="请选择会计制度" >
                <el-option label="小企业会计准则（2014年颁）" value="AG13"></el-option>
                <el-option label="新企业准则（2006年版）" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="_currencyCreate">开始创建</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

  <script>
import unilt from '../../api/baseUtility'
import urls from '../../api/unsplash/url'
export default {
    name: "",
    data() {
      return {
        baseSetting: {
          companyName:'',
          startPeriod:'',
          accountantSystemId:'',
          beginTime:'',
          qishu:'',
          dialogVisibleDelete:true
        },
     };
    },
    methods: {
      arrowUp: function(target) {
          let _t = this.baseSetting[target];
          this.$nextTick(function() {
              this.baseSetting[target] = parseInt(_t) + 1;
          });
      },
      arrowDown: function(target) {
          let _t = this.baseSetting[target];
          if (_t == 0) {
              _t = 0;
          } else {
              _t = parseInt(_t) - 1;
          }
          this.$nextTick(function() {
              this.baseSetting[target] = _t;
          });
      },
      handleInput(target) {
          let _t = this.baseSetting[target];
          if (!this.isNumber(_t)) {
              this.$nextTick(function() {
                  this.baseSetting[target] = "";
              });
          }
      },
      isNumber(val) {
          var regPos = /^\d+$/;
          if (regPos.test(val)) {
              return true;
          } else {
              return false;
          }
      },
      async reastMssage(){
          try {
            let params = unilt.baseEncode({
                "accountId":"555"
            },urls.sysInitialist)
            let res = await this.$api.unsplash.baseInterface(params)
            console.log(res)
            if(res.returnStatus.code != "0000") {
                this.$message.error('初始化失败！');
                return;
            }else{
                this.$message({
                message: '初始化成功！',
                type: 'success'
                });
            }
          } catch (error) {
              
          }
      },
      // 创建账套
      async _currencyCreate(){
        try {
          let _codeLength = this.baseSetting.num1 + this.baseSetting.num2 + this.baseSetting.num3 + this.baseSetting.num4+'';
          console.log(_codeLength);
          let params = unilt.baseEncode({
           "companyName": this.baseSetting.companyName,
            "startPeriod": this.baseSetting.beginTime+'-'+this.baseSetting.qishu,
            "accountantSystemId": this.baseSetting.accountantSystemId
          },urls.currencyCreate)
          let res = await this.$api.unsplash.baseInterface(params)
          console.log(res)
          if(res.returnStatus.code != "0000") {
            this.$message.error('创建失败！');
            return;
          }else{
            this.$message({
              message: '创建成功！',
              type: 'success'
            });
          }
        }catch (e) {
          console.log(e)
        }
      },
    },
    
};
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
#systemParam {
    margin-bottom: 50px;
    .sysMain {
        margin-top: 20px;
    }
    .title {
        font-size: $larger_size;
        background-color: white;
        line-height: 70px;
        padding-left: 30px;
        font-weight: bold;
    }
    .el-form {
        .el-form-item {
            margin-bottom: 0;
            padding: 10px 0 10px 55px;
            background: #f4f4f4;
            margin:0 30px;
            width:auto;
            &:nth-child(even) {
                background-color: white;
            }
            .el-input,
            .el-select {
                width: calc(100% - 35px);
            }
        }
        .el-radio-group {
            .el-radio {
                display: block;
                margin-bottom: 10px;
            }
            .el-radio + .el-radio {
                margin-left: 0;
            }
        }
    }
    .handle-btn {
        margin-left: -15px;
        margin-right: -15px;
        overflow: hidden;
        border: 1px solid #cccccc;
        .el-input {
            float: left;
        }
        .handle {
            float: left;
            width: 35px;
            text-align: center;
            i {
                display: block;
                line-height: 20px;
                color: #666666;
                cursor: pointer;
            }
        }
    }

    .moreOption {
        .line {
            padding: 0 !important;
            text-align: center;
        }
    }

    .handle-btn.disabled {
        background-color: #eaeaea;
        border: none;
    }
    .waring-box {
        line-height: 40px;
        img {
            vertical-align: middle;
        }
    }
    .bac-fff,.el-form{
      background: #fff;
    }
}
</style>
<style lang="scss">
#systemParam {
    .handle-btn {
        .el-input__inner {
            border: none;
        }
    }
}
</style>
