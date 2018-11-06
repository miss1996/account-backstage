<template>
  <div id="balanceReport" class="public-container2">
    <el-row class="Rtitle">
      <el-col :span="12">
        科目余额表
        <el-popover
          placement="bottom-start"
          width="430"
          v-model="poverVisible"
          popper-class="searchCondition"
          trigger="click">
          <el-form ref="checkform" :model="checkform" label-position="left" size="small" label-width="85px">
            <el-form-item label="会计期间:">
              <el-col :span="9">
                <el-select v-model="startPeriod" >
                  <el-option :label="item.label" :value="item.value" v-for="(item,index) in period" :key="index"></el-option>
                  <!-- <el-option label="2018年9期" value="2018年9期"></el-option>
                  <el-option label="2018年10期" value="2018年10期"></el-option> -->
                </el-select>
              </el-col>
              <el-col class="line" :span="2" align="center">至</el-col>
              <el-col :span="9">
                <el-select v-model="endPeriod" >
                  <el-option :label="item.label" :value="item.value" v-for="(item,index) in period" :key="index"></el-option>
                  <!-- <el-option label="2018年9期" value="2018年9期"></el-option>
                  <el-option label="2018年10期" value="2018年10期"></el-option> -->
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
                <el-form-item class="label_none" label=" " style="margin-bottom: 5px">
                  <el-col :span="20">
                    <el-checkbox v-model="checkform.checkbox_1">显示辅助核算</el-checkbox>
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
              <el-button type="primary" :btnType="`${skin_style}_btn`" style="float: right" size="small" @click="selectPeriod">确定</el-button>
              <el-button style="float: right" size="small" @click="poverVisible = false">重置</el-button>
            </el-form-item>
          </el-form>
          <el-button slot="reference">{{minPeriod}}<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
        </el-popover>

        <el-checkbox v-model="expendAll" @change="handleExpendAll" style="margin-left: 20px">展开所有级次</el-checkbox>

      </el-col>
      <el-col :span="12" align="right" class="right_top">
        <el-row class="btn-box">
          <el-button type="primary" :btnType="`${skin_style}_btn`">查询</el-button>
          <el-button type="primary" :btnType="`${skin_style}_btn`">打印</el-button>
          <el-button type="primary" :btnType="`${skin_style}_btn`">导出</el-button>
          <closeBtn></closeBtn>
        </el-row>
      </el-col>
    </el-row>

    <div class="resizeBox">
      <table id="resizeTable">
        <thead>
        <tr>
          <!-- <th class="icon-td" rowspan="2"></th> -->
          <th class="icon-r" colspan="1" rowspan="2" style="text-align:center">科目编码</th>
          <th colspan="1" rowspan="2">科目名称</th>
          <th colspan="2" rowspan="1">期初余额</th>
          <th colspan="2" rowspan="1">本期发生额</th>
          <th colspan="2" rowspan="1">本年累计发生额</th>
          <th colspan="2" rowspan="1">期末余额</th>
        </tr>
        <tr>
          <th>借方金额</th>
          <th>贷方金额</th>
          <th>借方金额</th>
          <th>贷方金额</th>
          <th>借方金额</th>
          <th>贷方金额</th>
          <th>借方金额</th>
          <th>贷方金额</th>
        </tr>
        </thead>
        <tbody>
           <tr v-for="(item,index) in tableData5" :key="index" v-show="item.expand" @mouseenter="mouseEnter(index)" @click="rowClick(index)">
             <!-- <td  class="icon-td" @click="expendTd(item)">
               
             </td> -->
             <td  @click="expendTd(item)" :style="{'padding-left':item.subjectLevel*30+'px'}" class="icon-r"  :class="{ 'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}">
               <div v-if="item.subjectSubState" style="display:inline;">
                 <i class="el-icon-caret-right" v-if="!item.clicked"></i>
                 <i class="el-icon-caret-bottom" v-if="item.clicked"></i>
               </div>
               {{item.subjectCode}}
              </td>
             <td :class="{pl15:item.parent, 'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}" style="text-align: left" v-html="item.subjectName"></td>
             <td class="align-right" :class="{'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}">{{item.beginDebitFor}}</td>
             <td class="align-right" :class="{'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}">{{item.beginCreditFor}}</td>
             <td class="align-right" :class="{'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}">{{item.debitFor}}</td>
             <td class="align-right" :class="{'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}">{{item.creditFor}}</td>
             <td class="align-right" :class="{'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}">{{item.ytdDebitFor}}</td>
             <td class="align-right" :class="{'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}">{{item.ytdCreditFor}}</td>
             <td class="align-right" :class="{'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}">{{item.endDebitFor}}</td>
             <td class="align-right" :class="{'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}">{{item.endCreditFor}}</td>
           </tr>
        </tbody>
      </table>
    </div>
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage2"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="100">
    </el-pagination> -->
  </div>
</template>

<script>

  import { mapState, } from 'vuex'
  import NumFormatter from '../../assets/js/NumFormatter.js'
  import closeBtn from '../closeTab'
  import tabSize from  '../../assets/js/tabSize'
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
        startPeriod:'',
        endPeriod:'',
        period:[],//所有期限两种格式数组
        minNum:'',//最小期限接口格式
        minPeriod:'',//最小期限页面格式
        poverVisible:false,
        expendAll:'',
        pageCount:5,
        colored:'#EE943D',
        iconCell:'iconCell',
        showForm:false,
        isIndeterminate: true,
        options:[
          {
            value:'ji',
            label:'记'
          }
        ],
        filterText:'',
        currentPage2:1,
        checkform:{
          name: '',
          region: '',
          date1: '',
          date2: '',
          resource: '',
          desc: '',
          subject:'',
          arr1:'',
          arr2:'',
          arr3:'',
          arr4:'',
          arr5:'',
          text:''
        },
        radio2:1,
        tableData5: [],
        currentHoverRow: null,
        currentClickRow: null,
        treeNodesList:[]
      }
    },
    methods:{
      selectPeriod(){
        if(this.startPeriod>this.endPeriod){
          this.$message({ message: '开始期间不能大于结束期间', type: 'warning' });
        }else{
          this.poverVisible = false
          let date=this.startPeriod+'-'+this.endPeriod
          this._subjectBalanceList(date)
          this.minPeriod=NumFormatter.periodFormat(this.startPeriod)+"至"+NumFormatter.periodFormat(this.endPeriod)
          if(this.startPeriod==this.endPeriod){
            this.minPeriod=NumFormatter.periodFormat(this.startPeriod)
          }
        }
      },     
      format(row, column, cellValue, index) {
        return NumFormatter.formatNum(cellValue);
      },
      handleExpendAll(val){
          this.tableData5.forEach(function (item,index) {
            item.clicked = val
            if(val == false){
                if(item.parent){
                  item.expand = val
                }
            }else{
              item.expand = val
            }
          })
      },
      expendTd(data){
        let _p = data.subjectId;
        data.clicked = !data.clicked;
         this.tableData5.forEach((item,index) => {
               if(item.parentId == _p){
               if(!item.expand){
                 item.expand = true
               }else{
                 item.expand = false
               }
             }
         })
      },
      mouseEnter(index) {
        this.currentHoverRow = index;
      },
      rowClick(index) {
        this.currentClickRow = index;
      },
      async _subjectBalanceList(date){
        try {
          let params = utility.baseEncode({
             "accountingPeriod":date,
             //"accountingPeriod":'201811',
              "accountId": "1"
          },urls.subjectBalanceList)
          let res = await this.$api.unsplash.baseInterface(params)
          if(res.data && res.data.content){
            let _resData = utility.baseDecode(res.data.content)//解密
            console.log(_resData)
            if(_resData.subjectBalances && _resData.subjectBalances.length > 0){
              let notexx = this.XXX(_resData.subjectBalances,'0');
              notexx.push(_resData.subjectBalances.slice(-1)[0])//将合记放进了
              console.log(notexx)
              //筛选一级的默认展开 ，其余的不展开
              let parentsNodes = notexx.filter(function (item,index) {
                return item.parentId == '0'
              })
              let otherNodes = notexx.filter(function (item,index) {
                return item.parentId != '0'
              })
              for(let i=0;i<parentsNodes.length;i++){
                  parentsNodes[i].expand=true
                }
              for(let i=0;i<otherNodes.length;i++){
                otherNodes[i].expand=false
              }
              //合计默认展开
              notexx.slice(-1)[0].expand=true
              notexx.clicked=false
              this.tableData5=notexx
            }
          }
        }catch (e) {
          console.log(e)
        }
      },
      XXX(subjectBalances,type,nodesLists = []){
        let parentsNodes = subjectBalances.filter(function (item,index) {
          return item.parentId == type
        })
        let otherNodes = subjectBalances.filter(function (item,index) {
          return item.parentId != type
        })
        if(parentsNodes.length > 0){
          for (let i = 0; i < parentsNodes.length ; i++) {
            nodesLists.push(parentsNodes[i]);
            this.XXX(otherNodes,parentsNodes[i].subjectId,nodesLists)
          }
        }else{
          //console.log('over')
        }
        return nodesLists;
      },
      async _periodList(){
        try {
          let params = utility.baseEncode({
              "accountId": "1"
          },urls.periodList)
          let res = await this.$api.unsplash.baseInterface(params)
          if(res.data && res.data.content){
            let _resData = utility.baseDecode(res.data.content)//解密
            console.log(_resData)
            if(_resData && _resData.length > 0){
              for(var i=0;i<_resData.length;i++){
                this.period.push({'value':_resData[i],'label':NumFormatter.periodFormat(_resData[i])})
              }
              _resData = _resData.filter(function (x) {
                return x!=0;
              });
              this.minNum=Math.min.apply(this,_resData)
              console.log( this.minN)
              this.minPeriod=NumFormatter.periodFormat(this.minNum)
              this.startPeriod=this.minPeriod
              this.endPeriod=this.minPeriod
            }
          }
        }catch (e) {
          console.log(e)
        }
        this._subjectBalanceList(this.minNum)//科目余额表列表
      }
    },
    mounted(){
      tabSize.init('resizeTable');
      this._periodList()//期间列表
    },

  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/table_2";
  .resizeBox{
    overflow-x: auto;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    table{
      width: 100%;
      border: 1px solid $border-color;
      border-collapse:collapse;
      table-layout:fixed;word-break:break-all;
      th, td{
        border: 1px solid $border-color;
        height: 50px;
        background-color: white;
        text-align: center;
        padding: 0 10px;
        @include box-sizing
      }
      td{
        text-align: right;
        &:nth-child(2),&:nth-child(3){
          text-align: left;
        }
      }
      .pl15{
        padding-left: 25px;
      }
      th{
        height: 58px;
        background-color: #eeeeee;
        letter-spacing: 3px;
        color: #333 !important;
        font-size: 16px;
      }
      tr{
        &:nth-child(even){
          td{
            background-color: #FAFAFA;
          }

        }
      }
      .icon-td{
        padding-right: 0;
        border-right: none;
        width: 30px;
        text-align: right;
      }
      .icon-r{
        border-left: none;
        text-align: left;
      }
    }

  }


</style>
<style lang="scss">
  @import "../../assets/css/table_2_1";
  @import "../../assets/css/variable.scss";
  #balanceReport {
    .iconCell{
      border-right: none;
      text-align: right;
    }
  }
</style>

