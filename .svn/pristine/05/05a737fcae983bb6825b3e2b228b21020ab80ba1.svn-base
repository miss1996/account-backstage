<template>
  <div id="sumSheetProject" class="public-container">
    <el-row class="Rtitle">
      <el-col :span="12">
        核算项目明细账
        <el-popover
          placement="bottom-start"
          width="430"
          popper-class="searchCondition"
          trigger="click">
          <el-form ref="checkform" :model="checkform" label-position="left" size="small" label-width="85px">
            <el-form-item label="会计期间:">
              <el-col :span="9">
                <el-select v-model="checkform.date1" >
                  <el-option label="2018年9期" value="2018年9期"></el-option>
                  <el-option label="2018年10期" value="2018年10期"></el-option>
                </el-select>
              </el-col>
              <el-col class="line" :span="2" align="center">至</el-col>
              <el-col :span="9">
                <el-select v-model="checkform.date2" >
                  <el-option label="2018年9期" value="2018年9期"></el-option>
                  <el-option label="2018年10期" value="2018年10期"></el-option>
                </el-select>
              </el-col>
              <el-col :span="4" style="text-align: center; font-size: 20px;"><i class="el-icon-time"></i></el-col>
            </el-form-item>
            <el-collapse-transition>
              <div v-show="showForm">
                <!-- <el-form-item label="辅助项目:">
                  <el-col :span="20">
                    <el-input   v-model="checkform.beginSubject"></el-input>
                    <p style="color:#ccc; margin:0;line-height: 1.3; font-size: 12px; margin-top: 5px">(可用,分割多个编码如1001,1008,2001,或直接输入编码段如1001--1009查询)</p>
                  </el-col>
                </el-form-item> -->
                <el-form-item label="科  目:">
                  <el-col :span="20">
                    <el-input   v-model="checkform.subject"></el-input>
                    <p style="color:#ccc; margin:0;line-height: 1.3; font-size: 12px; margin-top: 5px">(可用,分割多个编码如1001,1008,2001,或直接输入编码段如1001--1009查询)</p>
                  </el-col>
                </el-form-item>
                <!-- <el-form-item label="科目级次:">
                  <el-col :span="9">
                    <div class="handle-btn">
                      <el-input v-model="checkform.level1" @input="handleInput('num1')"></el-input>
                      <div class="handle">
                        <i class="el-icon-arrow-up" @click="arrowUp('num1')"></i>
                        <i class="el-icon-arrow-down" @click="arrowDown('num1')"></i>
                      </div>
                    </div>
                  </el-col>
                  <el-col class="line" :span="2" align="center">至</el-col>
                  <el-col :span="9">
                    <div class="handle-btn">
                      <el-input v-model="checkform.level2" @input="handleInput('num1')"></el-input>
                      <div class="handle">
                        <i class="el-icon-arrow-up" @click="arrowUp('num1')"></i>
                        <i class="el-icon-arrow-down" @click="arrowDown('num1')"></i>
                      </div>
                    </div>
                  </el-col>
                </el-form-item>
                <el-form-item label="币  别:" style="margin-bottom: 15px">
                  <el-col :span="20">
                    <el-select placeholder="" style="width:100%; margin-right: 13px" v-model="checkform.currency">
                      <el-option label="综合本位币" value="buxian"></el-option>
                      <el-option label="综合本位币2" value="beijing"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item> -->
                <el-form-item class="label_none" label=" " style="margin-bottom: 5px">
                  <el-col :span="20">
                    <el-checkbox v-model="checkform.checkbox_1">显示科目</el-checkbox>
                  </el-col>
                </el-form-item>
                <el-form-item class="label_none" label=" " style="margin-bottom: 5px">
                  <el-col :span="20">
                    <el-checkbox v-model="checkform.checkbox_5">余额为0不显示</el-checkbox>
                  </el-col>
                </el-form-item>
                <el-form-item class="label_none" label=" " style="margin-bottom: 5px">
                  <el-col :span="20">
                    <el-checkbox v-model="checkform.checkbox_6">无发生额且余额为0不显示</el-checkbox>
                  </el-col>
                </el-form-item>
              </div>
            </el-collapse-transition>
            <el-form-item class="label_none">
              <el-button type="text" class="handle-text" v-show="showForm === true" @click="showForm = false">收起更多<i class="el-icon-arrow-up"></i></el-button>
              <el-button type="text" class="handle-text" v-show="showForm === false" @click="showForm = true">更多条件<i class="el-icon-arrow-down"></i></el-button>
              <el-button type="primary" :btnType="`${skin_style}_btn`" style="float: right" size="small">确定</el-button>
              <el-button style="float: right" size="small">重置</el-button>
            </el-form-item>
          </el-form>
          <el-button slot="reference">2018-09-08<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
        </el-popover>&nbsp;&nbsp;&nbsp;辅助类别
        <el-select placeholder="" v-model="fzType" size="small" style="width: 110px">
          <el-option v-for="item in zdy_list" :label="item.name" :value="item.assistTypeId" :key="item.assistTypeId" ></el-option>
        </el-select>&nbsp;&nbsp;
        <el-button type="primary" :btnType="`${skin_style}_btn`">查询</el-button>

      </el-col>
      <el-col :span="12" align="right" class="right_top">
        <el-row class="btn-box">
          <el-button type="primary" :btnType="`${skin_style}_btn`">连续打印</el-button>
          <el-button type="primary" :btnType="`${skin_style}_btn`">打印</el-button>
          <el-button type="primary" :btnType="`${skin_style}_btn`" @click="exportExcel">导出</el-button>
          <closeBtn></closeBtn>
        </el-row>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="width: 100%; margin-top: 20px;">
      <el-col :span="handle_slider == false ? 19 : 23">
        <div class="titlebox">科目:{{subjectSelect}}</div>
        <el-table
          :data="tableData"
          stripe
          border
          ref="singleTable"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="margin-bottom: 40px">
          <el-table-column
            prop="voucherDate"
            label="日期">
          </el-table-column>
          <el-table-column
            prop="voucherWord"
            class-name="align_left"
            label="凭证字号">
          </el-table-column>
          <el-table-column
            prop="summary"
            class-name="align_left"
            label="摘要">
          </el-table-column>
          <el-table-column
            prop="debitAmount"
            :formatter="format"
            class-name="align_right"
            label="借方金额">
          </el-table-column>
          <el-table-column
            prop="creditAmount"
            :formatter="format"
            class-name="align_right"
            label="贷方金额">
          </el-table-column>
          <el-table-column
            prop="dc"
            label="方向">
          </el-table-column>
          <el-table-column
            prop="balance"
            :formatter="format"
            class-name="align_right"
            label="金额">
          </el-table-column>
        </el-table>

        <div class="paginationBox">
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

      </el-col>
      <el-col :span="5" class="rightBox" v-show="handle_slider == false" style="padding: 0px !important;height: 515px;overflow-y: auto;">
        <div class="handle" @click="collapseSlider('right')"><i class="el-icon-d-arrow-right"></i>&nbsp;快速切换</div>
        <div class="searchBox">
          <input id="searchKey" type="text" class="search-i" placeholder="请输入关键字">
          <i class="el-icon-search"></i>
        </div>
        <div class="zTreeDemoBackground">
          <ul id="treeAccount" class="ztree"></ul>
        </div>
      </el-col>
      <el-col :span="1" v-show="handle_slider == true" class="sliderExpand">
        <i class="el-icon-d-arrow-left" @click="collapseSlider('left')"></i>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  import { mapState, } from 'vuex'
  import NumFormatter from '../../assets/js/NumFormatter.js'
  import closeBtn from '../closeTab'
  import '../../assets/js/jquery.ztree.core'
  import {fuzzySearch} from  '../../assets/js/fuzzysearch'
  import '../../assets/js/jquery.ztree.exhide'
  import urls from "../../api/unsplash/url";
  import utility from "../../api/baseUtility";

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
        subjectSelect:'',
        zdy_list:[],
        pageCount:5,
        fzType:'',
        showForm:false,
        handle_slider:false,
        options:[
          {
            value:'ji',
            label:'记'
          }
        ],
        filterText:'',
        currentPage2:1,
        tableData: [],
        multipleSelection: [],
        checkform:{
          beginSubject: '',
          endSubject:'',
          region: '',
          date1: '2017-07-03',
          date2: '2018-11-03',
          level2:"",
          level1:'',
          currency: '',
          checkbox_1:'',
          checkbox_2:'',
          checkbox_3:'',
          checkbox_4:'',
          checkbox_5:'',
          checkbox_6:'',
          checkbox_7:''
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        zNodes:[],
        setting : {
          callback: {
            onClick: this.treeRowClick
          }
        },
        currentRow: null,
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      collapseSlider(type){
        this.handle_slider = type == 'right' ? true : false
      },
      format(row, column, cellValue, index) {
        return NumFormatter.formatNum(cellValue);
      },
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      treeRowClick(event, treeId, treeNode, clickFlag){
        console.log(treeNode)
        
      },
       // 账表辅助明细列表
    async _voucherDetalassisSelect(assistTypeId){
      try {
        let params = utility.baseEncode({
          "accountId": "123",                     
            "beginDate":this.checkform.date1,
            "endDate":this.checkform.date1, 
            "assistId":assistTypeId,
            "subjectIdAry":["1","10"] 
        },urls.voucherDetalassisSelect)
        let res = await this.$api.unsplash.baseInterface(params)
        console.log(res)
        if(res.returnStatus.code != "0000") {
          this.$message.error(utility.baseDecode2(res.returnStatus.message));
          return;
        }
        if(res.data && res.data.content){
          let _data = utility.baseDecode(res.data.content)//解密
          console.log(_data);
          if(_data.length > 0){
            this.tableData = _data
          }
        }
      }catch (e) {
        console.log(e)
      }
    },

       // 账表辅助明细右侧树状图
    async _assistypeEright(assistTypeId){
      try {
        let params = utility.baseEncode({
          "accountId": "1",                     
          "beginDate":this.checkform.date1,
          "endDate":this.checkform.date2, 
          "subjectIdAry":["5002","5003"],
          "assistTypeId": assistTypeId
        },urls.assistypeEright)
        let res = await this.$api.unsplash.baseInterface(params)
        if(res.returnStatus.code != "0000") {
          this.$message.error(utility.baseDecode2(res.returnStatus.message));
          return;
        }
        if(res.data && res.data.content){
          let _data = utility.baseDecode(res.data.content)//解密
          // console.log(_data);
          if(_data.length > 0){
            for(let i = 0; i < _data.length; i++){
              if(_data[i]){
                this.zNodes.push({
                  name:_data[i].code + ' '+ _data[i].name,
                  icon:require('../../assets/imgs/icon_wenjian3.svg'),
                  isParent:false
                })
              }
            }
            this.subjectSelect = this.zNodes[0].name
            // console.log(this.zNodes);
          $.fn.zTree.init($("#treeAccount"), this.setting, this.zNodes);
          fuzzySearch('treeAccount','#searchKey',null,true); //初始化模糊搜索方法
          }
        }
      }catch (e) {
        console.log(e)
      }
    },
    async _assisttypeSelect(){
      try {
        let params = utility.baseEncode({
          "accountId": "1"
        },urls.assisttypeSelect)
        let res = await this.$api.unsplash.baseInterface(params)
        // console.log(res)
        if(res.data && res.data.content){
          let _resData = utility.baseDecode(res.data.content)//解密
          // console.log(_resData)
          this.zdy_list = _resData.filter(function (item,index) {
            return item.assistTypeId > 6;
          })
        // console.log(this.zdy_list);
        this.fzType = this.zdy_list[0].name
        // this._assistypeEright(this.zdy_list[0].assistTypeId);
        this._voucherDetalassisSelect(this.zdy_list[0].assistTypeId)
        }
      }catch (e) {
        console.log(e)
      }
     },
    async exportExcel(){
      try {
        let params = utility.baseEncode({
          "accountId": "1",                     
          "beginDate":this.checkform.date1,
          "endDate":this.checkform.date2, 
          "subjectIdAry":["5002","5003"],
          "assistTypeId": assistTypeId
        },urls.exportVoucherDetailassis)
        let res = await this.$api.unsplash.baseInterface(params)
        // console.log(res)
        if(res.returnStatus.code === '0000'){
          this.$message({
            message: utility.baseDecode2(res.returnStatus.message),
            type: 'success'
          });
        }else{
            this.$message.error(utility.baseDecode2(res.returnStatus.message));
        }
      }catch (e) {
        console.log(e)
      }
    }
    },
    mounted(){
      this._assisttypeSelect()
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/table_1";
</style>
<style lang="scss">
  @import '../../assets/css/zTreeStyle.css';
 @import "../../assets/css/variable.scss";
  #sumSheetProject{
    .el-table .cell{
      height: 50px;
      line-height: 50px;
    }

  }
</style>
