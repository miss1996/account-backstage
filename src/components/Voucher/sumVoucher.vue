<template>
  <div id="sumVoucher" class="public-container">
    <el-row class="Rtitle">
      <el-col :span="12">
        凭证汇总表
        <el-popover
          placement="bottom-start"
          width="470"
          popper-class="searchCondition"
          v-model="poverVisible"
          trigger="click">
          <el-form ref="checkform" :model="checkform" label-position="left" size="small" label-width="85px">
            <el-form-item label="汇总日期:">
              <el-col :span="9">
                <el-date-picker type="date" v-model="checkform.date1" value-format="yyyy-MM-dd"  placeholder="选择日期" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2" align="center">至</el-col>
              <el-col :span="9">
                <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="checkform.date2" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col :span="4" style="text-align: center; font-size: 20px;"><i class="el-icon-time"></i></el-col>
            </el-form-item>
            <el-collapse-transition>
              <div v-show="showForm">
                <el-form-item label="凭证字:">
                  <el-col :span="20">
                    <el-select placeholder="请选择凭证字" v-model="checkform.proof" style="width: 100%">
                      <el-option :label="item.voucherWord" :value="item.voucherWordId" v-for="item in proofWordsArray" :key="item.voucherWordId"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
                <el-form-item label="凭证号:">
                  <el-col :span="9"><el-input type="text" v-model="checkform.resource"></el-input></el-col>
                  <el-col :span="2" style="text-align: center">至</el-col>
                  <el-col :span="9"><el-input type="text" v-model="checkform.resource2"></el-input></el-col>
                </el-form-item>
                <!-- <el-form-item label="科目级次:">
                  <el-col :span="9"><el-input type="text" v-model="checkform.desc"></el-input></el-col>
                  <el-col :span="2" style="text-align: center">至</el-col>
                  <el-col :span="9"><el-input type="text" v-model="checkform.desc2"></el-input></el-col>
                </el-form-item> -->
              </div>
            </el-collapse-transition>
            <el-form-item class="label_none">
              <el-button type="text" class="handle-text" v-show="showForm === true" @click="showForm = false">收起更多<i class="el-icon-arrow-up"></i></el-button>
              <el-button type="text" class="handle-text" v-show="showForm === false" @click="showForm = true">更多条件<i class="el-icon-arrow-down"></i></el-button>
              <el-button type="primary" :btnType="`${skin_style}_btn`" style="float: right" size="small" @click="getList">确定</el-button>
              <el-button style="float: right" size="small" @click="poverVisible = false">重置</el-button>
            </el-form-item>
          </el-form>
          <el-button slot="reference">{{checkform.date1}}至{{checkform.date2}}<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
        </el-popover>
        <div class="inline-block">
          凭证总张数: <span :style="{color:skin_color}">{{pzTotal}}</span>张,附件总数: <span :style="{color:skin_color}">{{fjTotal}}</span>张
        </div>

      </el-col>
      <el-col :span="12" align="right" class="right_top">
        <el-row class="btn-box">
          <el-button type="primary" :btnType="`${skin_style}_btn`">查询</el-button>
          <el-button type="primary" :btnType="`${skin_style}_btn`">打印</el-button>
          <el-button type="primary" :btnType="`${skin_style}_btn`" @click="exportVoucher">导出</el-button>
          <closeBtn></closeBtn>
        </el-row>
      </el-col>
    </el-row>


    <el-table
      :data="tableData"
      stripe
      border
      ref="singleTable"
      highlight-current-row
      @current-change="handleCurrentChange"
      class="sunTable"
      style="width: 100%; margin-top: 20px; margin-bottom: 40px">
      <el-table-column
        prop="subjectCode"
        class-name="align_left"
        label="科目编码">
      </el-table-column>
      <el-table-column
        prop="subjectName"
        class-name="align_left"
        label="科目名称">
      </el-table-column>
      <el-table-column
        :formatter="jfMoney"
        class-name="align_right"
        label="借方金额">
        <template slot-scope="scope" >
          {{scope.row.debitAmount?scope.row.debitAmount:scope.row.debitAmountTotal}}.00
        </template>
      </el-table-column>
      <el-table-column
        :formatter="jfMoney"
        class-name="align_right"
        label="贷方金额">
        <template slot-scope="scope" >
          {{scope.row.creditAmount?scope.row.creditAmount:scope.row.creditAmountTotal}}.00
        </template>
      </el-table-column>
    </el-table>

    <!-- <div class="paginationBox">
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
    </div> -->

  </div>
</template>

<script>

  import { mapState, } from 'vuex'
  import NumFormatter from "../../assets/js/NumFormatter.js"
  import closeBtn from '../closeTab'
  import urls from '../../api/unsplash/url'
  import utility from '../../api/baseUtility'
  export default {
    computed:{
      ...mapState([
        'skin_style',
        'skin_color',
        'proofWordsArray'
      ])
    },
    watch:{
      proofWordsArray:function(){
        if(this.proofWordsArray.length!=0){
          this.checkform.proof=this.proofWordsArray[0].voucherWordId
        }
      }
    },
    components:{
      closeBtn
    },
    data(){
      return{
        pzTotal:0,
        fjTotal:0,
        nowPeriod1:"",
        startVoucherDate1: "",
        endVoucherDate1: "",
	      voucherWordId1:"",
        poverVisible:false,
        pageCount:5,
        showForm:false,
        options:[
          {
            value:'ji',
            label:'记'
          }
        ],
        currentPage2:1,
        tableData: [],
        multipleSelection: [],
        checkform:{
          date1: '',
          date2: '',
          proof:'',
          resource: 0,
          resource2:0,
          //desc: '',
          //desc2:''
        },
        currentRow: null,
      }
    },
    methods:{
      getList(){
        this.poverVisible = false
        if(this.checkform.date1>this.checkform.date2){
           this.$message({
            message: '开始日期不能大于结束日期',
            type: 'warning'
          });
          return;
        }
        this._voucherSumList()
      },
      // handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      // },
      // handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      // },
      jfMoney(row, column, cellValue, index) {
        return NumFormatter.formatNum(cellValue);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      //凭证汇总列表
      async _voucherSumList(){
        try {
          let params = utility.baseEncode({
            accountId:"1000",
            nowPeriod:this.nowPeriod1,
            startVoucherDate:this.checkform.date1,
            endVoucherDate:this.checkform.date2,
	          voucherWordId:this.checkform.proof,
            startVoucherNum:this.checkform.resource,
            endVoucherNum:this.checkform.resource2
          },urls.voucherSumList)
          let res = await this.$api.unsplash.baseInterface(params);
          if(res.data && res.data.content){
            let _resData = utility.baseDecode(res.data.content)//解密
            console.log(_resData)
            this.pzTotal=_resData.voucherPiece
            this.fjTotal=_resData.billNum
            this.nowPeriod1=_resData.nowPeriod
            this.checkform.date1=_resData.startVoucherDate
            this.checkform.date2=_resData.endVoucherDate
            this.checkform.resource=_resData.startVoucherNum
            this.checkform.resource2=_resData.endVoucherNum
            this.tableData=_resData.voucherDetailList
          }
        }catch (e) {
          console.log(e)
        }
      },
      async exportVoucher(){
        try {
          let params = utility.baseEncode({
            "accountId": "1",
            "voucherDate": "2018-01-09"
          },urls.voucherListExport)
          let res = await this.$api.unsplash.baseInterface(params)
          if(res.data && res.data.content){
            let _resData = utility.baseDecode(res.data.content)//解密
            console.log(_resData)
          }
        }catch (e) {
          console.log(e)
        }
      }
    },
    created(){
      this._voucherSumList()
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/table_1";
</style>
<style lang="scss">
@import "../../assets/css/variable.scss";
  #sumVoucher{
    .el-table .cell{
      height: 50px;
      line-height: 50px;
    }
  }

</style>
