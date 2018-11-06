<template>
  <div id="systemParam" class="public-container">
    <el-row>
      <el-col align="right" :span="24">
        <el-row class="btn-box">
          <el-button type="primary" :btnType="`${skin_style}_btn`" @click="_updateParameter">保存</el-button>
          <closeBtn></closeBtn>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="30" class="sysMain">
      <el-col :span="11">
        <div class="bac-fff"  style="padding-bottom: 50px">
          <div class="title">基础参数</div>
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
                    <el-input v-model="baseSetting.beginTime" :disabled="true"></el-input>
                    <div class="handle">
                      <i class="el-icon-arrow-up"></i>
                      <i class="el-icon-arrow-down"></i>
                    </div>
                  </div>
                </el-col>
                <el-col class="line" :span="2">年</el-col>
                <el-col :span="10">
                  <div class="handle-btn disabled">
                    <el-input v-model="baseSetting.qishu" :disabled="true"></el-input>
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
              <el-select v-model="baseSetting.accountantSystemId" placeholder="请选择会计制度" :disabled="true">
                <el-option label="小企业会计准则（2014年颁）" value="AG13"></el-option>
                <el-option label="新企业准则（2006年版）" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="切换到:" style="padding-bottom: 15px">
              <span :style="{color:skin_color}">新会计准则（2018年颁）</span> 
            </el-form-item>
          </el-form>
        </div>
        <div class="title" style="margin-top: 15px">账簿</div>
        <el-form ref="baseSetting" :model="baseSetting" label-width="80px">
          <el-form-item label="">
            <el-checkbox v-model="check_1" name="labe1">账簿余额方向与科目方向相同</el-checkbox>
          </el-form-item>
          <el-form-item label="">
            <el-checkbox v-model="check_2" name="labe1">现金、银行存款科目赤字检查</el-checkbox>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="13">
        <div class="title">科目参数</div>
        <el-form ref="baseSetting" :model="baseSetting" label-width="80px">
          <el-form-item label="科目级次">
            <el-col :span="6" style="padding-right: 0">
              <el-select v-model="baseSetting.subjectsLevel" style="width: 75%">
                <el-option v-for="(item,index) in level" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
            <el-col :span="18" style="padding-left: 0">
              <div class="waring-box" style="font-size: 12px">
                <img src="../../assets/imgs/icon_jinggao.svg" alt="">
                <span>科目级次调大后，不能再调小（即不能再恢复到调整前的级次和长度），请谨慎操作！</span>
              </div>
            </el-col>
          </el-form-item>
          <el-form-item label="编码长度" style="padding-bottom: 150px">
            <div style="width: 85%" class="moreOption">
              <el-col :span="5">
                <div class="handle-btn">
                  <el-input v-model="baseSetting.num1" @input="handleInput('num1')"></el-input>
                  <div class="handle">
                    <i class="el-icon-arrow-up" @click="arrowUp('num1')"></i>
                    <i class="el-icon-arrow-down" @click="arrowDown('num1')"></i>
                  </div>
                </div>
              </el-col>
              <el-col class="line" :span="1">&minus;</el-col>
              <el-col :span="5">
                <div class="handle-btn">
                  <el-input v-model="baseSetting.num2" @input="handleInput('num2')"></el-input>
                  <div class="handle">
                    <i class="el-icon-arrow-up" @click="arrowUp('num2')"></i>
                    <i class="el-icon-arrow-down" @click="arrowDown('num2')"></i>
                  </div>
                </div>
              </el-col>
              <el-col class="line" :span="1">&minus;</el-col>
              <el-col :span="5">
                <div class="handle-btn">
                  <el-input v-model="baseSetting.num3" @input="handleInput('num3')"></el-input>
                  <div class="handle">
                    <i class="el-icon-arrow-up" @click="arrowUp('num3')"></i>
                    <i class="el-icon-arrow-down" @click="arrowDown('num3')"></i>
                  </div>
                </div>
              </el-col>
              <el-col class="line" :span="1">&minus;</el-col>
              <el-col :span="5">
                <div class="handle-btn">
                  <el-input v-model="baseSetting.num4" @input="handleInput('num4')"></el-input>
                  <div class="handle">
                    <i class="el-icon-arrow-up" @click="arrowUp('num4')"></i>
                    <i class="el-icon-arrow-down" @click="arrowDown('num4')"></i>
                  </div>
                </div>
              </el-col>
            </div>
          </el-form-item>
        </el-form>
        <div class="title" style="margin-top: 20px">开票信息</div>
        <el-form ref="baseSetting" :model="baseSetting" label-width="120px" style="padding-bottom: 29px">
          <el-form-item label="纳税人名称">
            <el-input v-model="baseSetting.ratepaying"></el-input>
          </el-form-item>
          <el-form-item label="纳税人识别号" style="padding-bottom: 69px">
            <el-input v-model="baseSetting.ratepayNumber"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

  <script>
import { mapState } from "vuex";
import closeBtn from "../closeTab";
import unilt from '../../api/baseUtility'
import urls from '../../api/unsplash/url'
export default {
    name: "",
    data() {
      return {
        check_1:true,
        check_2:false,
        baseSetting: {},
        level:[{
          label:5,
          value:5
        },{
          label:6,
          value:6
        },{
          label:7,
          value:7
        },{
          label:8,
          value:8
        },{
          label:9,
          value:9
        }]
    };
    },
    components: {
        closeBtn
    },
    computed: {
        ...mapState(["skin_style", "skin_color"])
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
      // 系統參數查詢
      async _selectParameter(){
        try {
          let params = unilt.baseEncode({
            "accountId":"110000002018092111165702527555", // 暂时传默认值
          },urls.selectParameter)
          let res = await this.$api.unsplash.baseInterface(params)
          if(res.returnStatus.code != "0000") {
            this.$message.error(unilt.baseDecode2(res.returnStatus.message));
            return;
          }
          if(res.data && res.data.content){
           let _data = unilt.baseDecode(res.data.content)//解密
           this.baseSetting = _data;
           this.baseSetting.beginTime = _data.startPeriod.split('-')[0]
           this.baseSetting.qishu = _data.startPeriod.split('-')[1]
           let xx = _data.codeLength.split('');
           this.baseSetting.num1 = xx[0]
           this.baseSetting.num2 = xx[1]
           this.baseSetting.num3 = xx[2]
           this.baseSetting.num4 = xx[3]
           console.log(this.baseSetting)
          }
        }catch (e) {
          console.log(e)
        }
      },
      // 系統參數修改
      async _updateParameter(){
        try {
          let _codeLength = this.baseSetting.num1 + this.baseSetting.num2 + this.baseSetting.num3 + this.baseSetting.num4+'';
          console.log(_codeLength);
          let params = unilt.baseEncode({
            "accountId":"110000002018092111165702527555", // 暂时传默认值
            "companyName": this.baseSetting.companyName,
            "subjectsLevel": this.baseSetting.subjectsLevel,
            "codeLength": _codeLength
          },urls.updateParameter)
          let res = await this.$api.unsplash.baseInterface(params)
          console.log(res)
          if(res.returnStatus.code != "0000") {
            this.$message.error(unilt.baseDecode2(res.returnStatus.message));
            return;
          }else{
            this.$message({
              message: unilt.baseDecode2(res.returnStatus.message),
              type: 'success'
            });
            this._selectParameter();
          }
        }catch (e) {
          console.log(e)
        }
      },
    },
    created(){
      this._selectParameter();
    }
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
