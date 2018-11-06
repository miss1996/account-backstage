<template>
  <div id="accountState" class="public-container">
    <el-row class="Rtitle">
      <el-col :span="12">
        明细账
        <el-popover
          placement="bottom-start"
          width="430"
          v-model="poverVisible"
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
                <el-form-item label="起始科目:">
                  <el-col :span="20">
                    <el-input  placeholder="请输入凭证号，或凭证号范围" v-model="checkform.beginSubject"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="结束科目:">
                  <el-col :span="20">
                    <el-input placeholder="请输入凭证号，或凭证号范围" v-model="checkform.endSubject"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="科目级次:">
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
                <el-form-item label="币别:" style="margin-bottom: 15px">
                  <el-col :span="20">
                    <el-select placeholder="" style="width:100%; margin-right: 13px" v-model="checkform.currency">
                      <el-option label="综合本位币" value="buxian"></el-option>
                      <el-option label="综合本位币2" value="beijing"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
                <el-form-item label=" "  class="label_none" style="margin-bottom: 5px">
                  <el-col :span="20">
                    <el-checkbox v-model="checkform.checkbox_1">显示辅助核算</el-checkbox>
                  </el-col>
                </el-form-item>
                <el-form-item label=" "  class="label_none" style="margin-bottom: 5px">
                  <el-col :span="20">
                    <el-checkbox v-model="checkform.checkbox_2">只显示最明细科目</el-checkbox>
                  </el-col>
                </el-form-item>
                <el-form-item label=" "  class="label_none" style="margin-bottom: 5px">
                  <el-col :span="20">
                    <el-checkbox v-model="checkform.checkbox_3">显示现金银行存款对方科目</el-checkbox>
                  </el-col>
                </el-form-item>
                <el-form-item label=" "  class="label_none" style="margin-bottom: 5px">
                  <el-col :span="20">
                    <el-checkbox v-model="checkform.checkbox_4">现金、银行存款科目显示日合计</el-checkbox>
                  </el-col>
                </el-form-item>
                <el-form-item label=" "  class="label_none" style="margin-bottom: 5px">
                  <el-col :span="20">
                    <el-checkbox v-model="checkform.checkbox_5">余额为0不显示</el-checkbox>
                  </el-col>
                </el-form-item>
                <el-form-item label=" "  class="label_none" style="margin-bottom: 5px">
                  <el-col :span="20">
                    <el-checkbox v-model="checkform.checkbox_6">无发生额且余额为0不显示</el-checkbox>
                  </el-col>
                </el-form-item>
                <el-form-item label=" " class="label_none">
                  <el-col :span="20">
                    <el-checkbox v-model="checkform.checkbox_7">无发生额不显示本期合计、本年累计</el-checkbox>
                  </el-col>
                </el-form-item>
              </div>
            </el-collapse-transition>
            <el-form-item class="label_none">
              <el-button type="text" class="handle-text" v-show="showForm === true" @click="showForm = false">收起更多<i class="el-icon-arrow-up"></i></el-button>
              <el-button type="text" class="handle-text" v-show="showForm === false" @click="showForm = true">更多条件<i class="el-icon-arrow-down"></i></el-button>
              <el-button type="primary" :btnType="`${skin_style}_btn`" style="float: right" size="small" @click="poverVisible = false">确定</el-button>
              <el-button style="float: right" size="small" @click="poverVisible = false">重置</el-button>
            </el-form-item>
          </el-form>
          <el-button slot="reference">2018-09-08<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
        </el-popover>

      </el-col>
      <el-col :span="12" align="right" class="right_top">
        <el-row class="btn-box">
          <el-button type="primary" :btnType="`${skin_style}_btn`">查询</el-button>
          <el-button type="primary" :btnType="`${skin_style}_btn`">连续打印</el-button>
          <el-button type="primary" :btnType="`${skin_style}_btn`">打印</el-button>
          <el-button type="primary" :btnType="`${skin_style}_btn`">导出</el-button>
          <closeBtn></closeBtn>
        </el-row>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="width: 100%; margin-top: 20px;">
      <el-col :span="handle_slider == false ? 19 : 23">
        <div class="titlebox">科目:{{subjectTitle}}</div>
        <el-table
          :data="tableData"
          stripe
          border
          ref="singleTable"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="margin-bottom: 40px;min-height: 571px;">
          <el-table-column
            prop="voucherDate"
            label="日期">
          </el-table-column>
          <el-table-column
            prop="voucherName"
            class-name="align_left"
            label="凭证字号">
          </el-table-column>
          <el-table-column
            prop="abstractName"
            class-name="align_left"
            label="摘要">
          </el-table-column>
          <el-table-column
            v-if="checkform.checkbox_3 == true"
            class-name="align_left"
            label="贷方科目">
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
            prop="balanceDirection"
            label="方向">
          </el-table-column>
          <el-table-column
            prop="remainingSum"
            :formatter="format"
            class-name="align_right"
            label="金额">
          </el-table-column>
        </el-table>

        <div class="paginationBox">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="pageCurrentChange"
            :current-page="currentPage2"
            :pager-count="5"
            layout=" prev, pager, next, total, jumper"
            :total="totalItems">
          </el-pagination>
          <el-button class="go">确定</el-button>
        </div>

      </el-col>
      <el-col :span="5" class="rightBox" v-show="handle_slider == false" style="padding: 0px !important; height: 616px; overflow-y: auto;">
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
  import '../../assets/js/jquery.ztree.core'
  import {fuzzySearch} from  '../../assets/js/fuzzysearch'
  import '../../assets/js/jquery.ztree.exhide'
  import closeBtn from '../closeTab'
  import '../../assets/js/NumFormatter.js'
  import NumFormatter from '../../assets/js/NumFormatter.js';
  import urls from '../../api/unsplash/url'
  import utility from '../../api/baseUtility'
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
        subjectTitle:'',
        poverVisible:false,
        showForm:false,
        handle_slider:false,
        options:[
          {
            value:'ji',
            label:'记'
          }
        ],
        filterText:'',
        totalItems:0,
        currentPage2:1,
        pageCount:1,
        tableData: [],
        multipleSelection: [],
        subjectId:1,
        checkform:{
          beginSubject: '',
          endSubject:'',
          region: '',
          date1: '',
          date2: '',
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
        zNodes:[],
        setting : {
          data: {
            simpleData: {
              enable: true
            }
          },
          callback: {
            onClick: this.treeRowClick
          }},
        currentRow: null,
      }
    },
    methods:{
      sureSearch(){
        // if(this.checkform.checkbox_3 == true){
        //
        // }
      },
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
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      pageCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage2 = val;
        this.accountList();
      },
      collapseSlider(type){
        this.handle_slider = type == 'right' ? true : false
      },
      format(row, column, cellValue, index) {
        return NumFormatter.formatNum(cellValue);
      },
      setCurrent(row) {
        this.$refs.multipleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      treeRowClick(event, treeId, treeNode, clickFlag){
        this.subjectId = treeNode.id;
        this.accountList();
      },
      async accountList(){
        try {
          let params = utility.baseEncode({
            "accountingPeriod": "201807-201809",
            "subjectId": this.subjectId,
            "accountId": "1",
            "pageNum": this.currentPage2,
            "pageSize": "10"
          },urls.accountList)
          console.log(this.subjectId)
          let res = await this.$api.unsplash.baseInterface(params)
          if(res.data && res.data.content){
            // console.log(res)
            let _resData = utility.baseDecode(res.data.content)//解密
            console.log(_resData)
            this.subjectTitle = _resData.subjectCode+_resData.subjectName;
            let _data = _resData.pagePojo;
            this.totalItems = _data.total;
             this.pageCount = _data.pageCount;
            if(_data.list && _data.list.length > 0){
               this.tableData = [..._data.list];
            }
          }
        }catch (e) {
          console.log(e)
        }
      },
      async accountTree(){
        try {
          let params = utility.baseEncode({
            searchField:'',
            accountId: "1"
          },urls.accountTree)
          let res = await this.$api.unsplash.baseInterface(params)
          if(res.data && res.data.content){
            let _resData = utility.baseDecode(res.data.content)//解密
            console.log(_resData)
            if(_resData.length > 0){ for (let i = 0; i < _resData.length; i++) {
                let _data = _resData[i];
                let _innerData = {
                  // id:parseInt(_data.subjectId),
                  // pId:parseInt(_data.parentId),
                  id:_data.subjectId,
                  pId:_data.parentId,
                  name:_data.subjectCode+' '+_data.subjectName,
                  open:false,
                }
                if(_data.subjectSubState === true){
                  _innerData.iconOpen = require('../../assets/imgs/openwenjian.svg');
                  _innerData.iconClose = require('../../assets/imgs/icon_wenjian2.svg')
                }else{
                  _innerData.icon = require('../../assets/imgs/icon_wenjian3.svg')
                }
                this.zNodes.push(_innerData)
              }
              $.fn.zTree.init($("#treeAccount"), this.setting, this.zNodes);
              fuzzySearch('treeAccount','#searchKey',null,true); //初始化模糊搜索方法
            }
          }
          this.accountList(); //列表
        }catch (e) {
          console.log(e)
        }
      }
    },
    mounted(){
      this.accountTree(); //树
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/table_1";
</style>
<style lang="scss">
  @import '../../assets/css/zTreeStyle.css';
  @import '../../assets/css/variable.scss';
  #accountState{
    .el-table .cell{
      height: 50px;
      line-height: 50px;
    }
  }

</style>
