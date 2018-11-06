<template>
  <div id="original">
    <el-row class="Rtitle">
      <el-col :span="12">
        原始凭证
        <el-select placeholder="请选择" size="small" style="width:100%; display: inline-block; width: 130px" v-model="qishu">
          <el-option label="2018年12期" value="12"></el-option>
          <el-option label="2018年11期" value="11"></el-option>
          <el-option label="2018年10期" value="10"></el-option>
          <el-option label="2018年9期" value="9"></el-option>
          <el-option label="2018年8期" value="8"></el-option>
          <el-option label="2018年7期" value="7"></el-option>
          <el-option label="2018年6期" value="6"></el-option>
          <el-option label="2018年5期" value="5"></el-option>
          <el-option label="2018年4期" value="4"></el-option>
          <el-option label="2018年3期" value="3"></el-option>
          <el-option label="2018年2期" value="2"></el-option>
          <el-option label="2018年1期" value="1"></el-option>
        </el-select>&nbsp;&nbsp;
        <el-select placeholder="请选择" v-model="checkform.name" class="setSelect" style="width: 120px;">
          <el-option label="已生成凭证" value="1"></el-option>
          <el-option label="未生成凭证" value="0"></el-option>
        </el-select>&nbsp;&nbsp;
      </el-col>
      <el-col :span="12" align="right" class="right_top">
        <el-row class="btn-box">
          <closeBtn></closeBtn>
        </el-row>
      </el-col>
    </el-row>

    <el-row :gutter="40" class="mainbox">
      <el-col :span="18">
        <div style="padding: 15px; background-color: white; margin-bottom: 15px; text-align: center">
          <img src="../../assets/imgs/fapiaoda.jpg" alt="" style="width: 96%; height: auto">
        </div>
        <div class="voucherList" ref="voucherList" style="width: 100%">
          <div class="left arrow " @click="scrollNext('left')" :class="{noClick:disableArrow == 'left'}"><i class="el-icon-arrow-left"></i></div>
          <ul class="voucher-ul" ref="voucherUl" style="left: 0">
            <!-- <el-checkbox-group v-model="checkboxGroup1"> -->
            <li v-for="(item,index) in voucherListData" :key="index" class="item-box">
                <el-checkbox name="type" @change="changeList(item)" v-model="item.checked"></el-checkbox>
                <img :src="item.url" class="voucher" alt="">
                <div class="detail">
                  <p>
                    <span>{{item.createTime}}</span>
                    <span class="">记-05</span>
                  </p>
                  <p class="">上传人：{{item.uploaderName}}</p>
                </div>
            </li>
            <!-- </el-checkbox-group> -->
          </ul>
          <div class="right arrow" @click="scrollNext('right')" :class="{noClick:disableArrow == 'right'}"><i class="el-icon-arrow-right"></i></div>
        </div>
      </el-col>
      <el-col :span="6" style="background-color: white; padding: 40px 20px 20px 20px;">
        <el-form ref="voucherData" :model="voucherData" label-width="80px">
          <el-form-item label="*业务类型">
            <el-col :span="21">
              <el-select placeholder="请选择业务类型" size="small" v-model="voucherData.type" style="width: 100%">
                <el-option label="不限" value="不限"></el-option>
                <el-option label="采购物资" value="采购物资"></el-option>
              </el-select>
            </el-col>
            <el-col :span="3" style="text-align: left; padding: 0">
              <img :src='require(`../../assets/imgs/${skin_style}/shezhi000.svg`)' style="vertical-align: middle; cursor: pointer" @click="$router.push('serviceClassification')">
            </el-col>
          </el-form-item>
          <el-form-item label="*日期">
            <el-col :span="22">
              <el-date-picker type="date" size="small" v-model="voucherData.date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="*摘要">
            <el-col :span="22">
              <el-input type="textarea" v-model="voucherData.digest" style="width: 100%;"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="*金额">
            <el-col :span="22">
              <el-input type="number" size="small" v-model="voucherData.money" style="width: 100%;"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="22" align="right">
              <el-button type="primary" :btnType="`${skin_style}_btn`" style="float: right">生成凭证</el-button>
            </el-col>
          </el-form-item>
        </el-form>

        <div class="imgMessage">
          <div style="font-size: 18px; line-height:2">图片信息</div>
          <div style="padding-left: 20px; font-size: 16px; line-height: 2">
            <span>上传人&nbsp;&nbsp; cccc0909</span><br/>
            <span>上传时间&nbsp;&nbsp; 2018-07-18</span>
          </div>
          <div style="margin-top: 132px; margin-bottom: 30px">
            <el-button type="primary" :btnType="`${skin_style}_btn`" @click="uploadBox">上传票据</el-button>
            <el-button type="primary" :btnType="`${skin_style}_btn`" @click="sureDelate">删除</el-button>
            <el-button type="primary" :btnType="`${skin_style}_btn`">下载附件</el-button>
          </div>
        </div>
      </el-col>

    </el-row>
    <el-dialog title="附件导入" :visible.sync="dialogVisible" custom-class="myDialog speDialog" width="32%">
      <p style="margin-bottom:20px;">可批量上传jpg、png、bmp、jpeg等图片文件，电子发票支持pdf文件最大支持一次性批量上传50M</p>
			<el-form ref="formAdd" :model="addForm" label-width="100px">
				<el-form-item label="选择期间：">
          <!-- <el-select v-model='addForm.priod'  placeholder="请选择" style="width: 80px" @change='changeText'>
            <el-option
              v-for="item in options"
              :key="item.voucherWordId"
              :label="item.voucherWord"
              :value="item.voucherWordId">
            </el-option>
          </el-select> -->
				</el-form-item>
				<el-form-item label="选择文件：">
					<input type="text" name="file-path" v-model="addForm.fileStr" id="file-path" class="ui-input" readonly="" autocomplete="false">
					<div class="webuploader-pick">
						<span>浏览</span>
						<input type="file" capture="camera" name="file" @change="changeFile" class="webuploader-element-invisible" multiple="multiple" accept="image/*">
					</div>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<span class="btn" :style="{background:skin_color}">保存</span>
				<span class="btn" @click="dialogVisible = false">取消</span>
			</div>
		</el-dialog>
    <el-dialog title="系统提示" :visible.sync="dialogVisibleDelete" custom-class="myDialog" width="417px" class="warning">
			<div class="warning-box">
				<img class="warning-png" src="../../assets/imgs/warning.png" alt="">
				<div class="warning-note">
					<p>您确定要删除吗？</p>
					<p>删除后不可恢复！</p>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<span class="btn" :style="{background:skin_color}" @click="toDelete">确定</span>
				<span class="btn" @click="dialogVisibleDelete=false">取消</span>
			</div>
		</el-dialog>
  </div>
</template>

<script>

  import { mapState, } from 'vuex'
  import closeBtn from '../closeTab'
  import unilt from "../../api/baseUtility";
  import urls from '../../api/unsplash/url'

  export default {
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
        addForm:{
          priod:'',
          fileStr:''
        },
        enclosureIdList:[],
        dialogVisibleDelete:false,
        dialogVisible:false,
        voucherListData:[],
        pageCount:5,
        disableArrow:'left',
        showForm:false,
        qishu:'',
        voucherData:{
          type:'',
          money:'',
          digest:'',
          date:''
        },
        options:[
          {
            value:'ji',
            label:'记'
          }
        ],
        currentPage2:1,
        checkform:{
          name: '1'
        }

      }
    },
    methods:{
      changeList(item){
        let arrayId=[]
        this.voucherListData.map(function(item,index){
          if(item.checked){
            arrayId.push(item.enclosureId)
          }
        })
        this.enclosureIdList=arrayId
      },
      toDelete(){
        this.dialogVisibleDelete=false
        this._voucherEDelete()
      },
      sureDelate(){
        if(this.enclosureIdList.length==0){
          this.$message({
            showClose: true,
            message: '请选择要删除的数据',
            type: 'warning'
          });
          return;
        }
        this.dialogVisibleDelete=true
      },
      changeFile(e) {
        // console.log(e);
         console.log(e.target.files);
        if(e.target.files){
          let fileList=e.target.files
          let str=""
          for(var i=0;i<fileList.length;i++){
            str+=fileList[i].name+';'
          }
          this.addForm.fileStr=str
        }
      },
      uploadFile(){

      },
      uploadBox(){
        this.dialogVisible=true
      },
      //原始凭证列表
      async _voucherEnclosure(){
        try {
          let params = unilt.baseEncode({
            "accountId": "1",
            "period": '201810',
            "isGenerate": this.checkform.name
          },urls.voucherEnclosure)
          let res = await this.$api.unsplash.baseInterface(params)
          if (res.data && res.data.content) {
            let _resData = unilt.baseDecode(res.data.content); //解密
            console.log(_resData);
            _resData.filter(function(item){
              item.checked = false;
              item.url=urls.imgBaseUrl+item.url
            })
            this.voucherListData=_resData
				  }
        }catch (e) {
          console.log(e)
        }
      },
      //删除原始凭证
      async _voucherEDelete(){
        try {
          let params = unilt.baseEncode({
            accountId: "1",
            enclosureIdList:this.enclosureIdList
          },urls.voucherEDelete)
          let res = await this.$api.unsplash.baseInterface(params)
          console.log(res)
          if (res.returnStatus.code=='0000') {
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
            this._voucherEnclosure()
				  }else{
            this.$message({
              showClose: true,
              message: unilt.baseDecode2(res.returnStatus.message),
              type: 'error'
            });
          }
        }catch (e) {
          console.log(e)
        }
      },
      scrollNext(direction){
        let target = this.$refs.voucherUl;
        let _left = target.style.left;
        let _totalLength = this.voucherListData.length*(145+20) - 20;
        let _screen = $('.voucherList').width();
        if(direction == 'left' && parseInt(_left) == 0){
          this.disableArrow = 'left';
        }else if(direction == 'right' && _totalLength + parseInt(_left) < _screen){
          this.disableArrow = 'right';
        }else{
          this.disableArrow = '';
          if(direction == 'left'){
            target.style.left = parseInt(_left)+330+'px'
          }else if(direction == 'right'){
            target.style.left = parseInt(_left)-330+'px'
          }
        }
      },
    },
    created(){
      this._voucherEnclosure();
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/table_1.scss";
  #original{
    margin: 10px 25px;
    min-height: 300px;
    .imgMessage{
      margin-top: 190px;
    }
    .noClick{
      color: #cccccc;
    }
    .voucherList{
      position: relative;
      background-color: white;
      padding: 10px;
      @include box-sizing;
      overflow: hidden;
      .arrow{
        width:17px;
        height:143px;
        line-height: 142px;
        background:rgba(234,234,234,1);
        position: absolute;
        top: 10px;
        z-index: 99;
        &:hover{cursor: pointer}
      }
      .left.arrow{
        left: 0px;
      }
      .right.arrow{
        right: 0px;
      }
      .voucher-ul{
        list-style: none;
        margin: 0 25px;
        overflow: hidden;
        min-width: 9999px;
        white-space: nowrap;
        position: relative;
        left: 0;
        transition: all .5s linear;
        -webkit-transition: all .5s linear;
        -moz-transition: all .5s linear;
        li{
          position: relative;
          float: left;
          width:145px;
          height:145px;
          margin-right: 20px;
          border:1px solid rgba(234,234,234,1);
          text-align: center;
          padding-top: 25px;
          @include box-sizing;
          .el-checkbox{
            position: absolute;
            top: 3px;
            left: 3px;
          }
          img.voucher{
            width:102px;
            height:68px;
          }
          .detail{
            p{
              margin: 0;
              padding: 0 5px;
              font-size:12px;
              color: #333333;
              text-align: left;
              span:last-child{
                color: #0089BD;
                float: right;
              }
              &:last-child{
                color: #0089BD;
              }
            }
          }
          &:last-child{margin-right: 0}
        }
      }
    }
    .right_top{
      .btn_h{
        display: inline-block;
        margin-right: 6px;
        border: 1px solid #d8dce5;
        height: 40px;
        line-height: 40px;
        padding: 0 11px;
        @include box-sizing;
        i{
          font-size: 26px;
          color: #989898;
          margin-top: 6px;
        }
      }
      >span{
        display: inline-block;
        vertical-align: top;
        line-height: 40px;
      }
    }
    .mainbox{
      margin-top: 20px;
      margin-bottom: 40px;
    }
    .el-pagination{
      text-align: center;

    }

  }
  .handle-text{
    color: #3CBAFF;
    position: relative;
    left: -80px;
  }

</style>

<style lang="scss">
  #original{
    .el-table .cell {
      height: 50px;
      line-height: 50px;
    }
    .ui-input {
      width: 328px;
      height: 35px;
      border-radius: 4px;
      vertical-align: middle;
      padding-left: 10px;
      border: 1px solid #ccc;
    }
    .webuploader-element-invisible {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      z-index: 999;
    }
    .webuploader-pick {
      display: inline-block;
      width: 60px;
      height: 35px;
      padding: 0;
      line-height: 34px;
      background-color: #fafdff;
      color: #0089bd;
      border: 1px solid #ccc;
      font-size: 13px;
      position: relative;
      text-align: center;
      border-radius: 3px;
      overflow: hidden;
      cursor: pointer;
      vertical-align: middle;
    }
  }
  .setSelect{
    .el-input__inner,.el-input__icon{
      height: 34px;
      line-height: 34px;
    }
  }
  .speDialog .el-dialog__body{
      padding-top:20px;
      padding-right:30px !important;
    }
</style>

