<template>
    <div id="finance">
        <div class="filter">
            <el-col :span="16">
                <el-radio-group v-model="filter" size="medium" :class="skin_style" @change="filterChange">
                    <el-radio-button label="资产"></el-radio-button>
                    <el-radio-button label="负债"></el-radio-button>
                    <el-radio-button label="共同"></el-radio-button>
                    <el-radio-button label="权益"></el-radio-button>
                    <el-radio-button label="成本"></el-radio-button>
                    <el-radio-button label="损益"></el-radio-button>
                </el-radio-group>
                    <span class="top-text coin">币别</span>
                    <el-select class="option filter-border vertical-center" v-model="selectedOption"  @change = 'currencyChange' placeholder="所有操作">
                        <el-option
                            v-for="item in allOptions"
                            :key="item.currencyId"
                            :label="item.name"
                            :value="item.currencyId">
                        </el-option>
                    </el-select>
                    <span class="rate top-text">汇率{{ rate }}</span>
                    <el-checkbox class="checkbox" v-model="hideNum">隐藏数量</el-checkbox>
            </el-col>
            <el-col :span="8" align="right" class="right_top">
                <el-row class="btn-box">
                    <el-button type="primary" :btnType="`${skin_style}_btn`">查询</el-button>
                    <el-button type="primary" :btnType="`${skin_style}_btn`" @click="_subjectInitialBalanceUpdate">保存</el-button>
                    <el-button type="primary" :btnType="`${skin_style}_btn`" @click="showBalance">试算平衡</el-button>
                    <el-button type="primary" :btnType="`${skin_style}_btn`">导出</el-button>
                    <closeBtn></closeBtn>
                </el-row>
            </el-col>
        </div>
        <div class="list">
            <el-table
                :data="realData"
                ref="singleTable"
                highlight-current-row
                @current-change="handleCurrentChange"
                stripe
                border
                style="margin-bottom: 40px">
                <el-table-column
                    prop="subject.subjectCode"
                    class-name="align_left"
                    label="科目编码">
                </el-table-column>
                <el-table-column
                    prop="subject.subjectName"
                    class-name="align_left"
                    label="科目名称">
                </el-table-column>
                <el-table-column
                    label="方向">
                    <template slot-scope="scope">
                      <span>{{scope.row.subject.balanceDirection === '0' ? '借' : '贷'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="cc_money"
                    class-name="align_right"
                    label="初期余额">
                    <el-table-column
                    class-name="align_right"
                    label="数量">
                     <template slot-scope="scope">
                       <el-input v-show='scope.row.IsSubset === 1 && scope.row.subject.units' v-model="scope.row.InitialBalanceNum" class="inputClass"></el-input>
                     </template>
                </el-table-column>
                <el-table-column
                    :formatter="format"
                    class-name="align_right"
                    label="金额">
                    <template slot-scope="scope">
                       <el-input v-show='scope.row.IsSubset === 1' v-model="scope.row.initialBalanceAmount" class="inputClass"></el-input>
                     </template>
                </el-table-column>
                </el-table-column>
                <el-table-column
                    prop="lj_money"
                    class-name="align_right"
                    label="本年累计借方">
                    <el-table-column
                    class-name="align_right"
                    label="数量">
                    <template slot-scope="scope">
                       <el-input v-show='scope.row.IsSubset === 1 && scope.row.subject.units' v-model="scope.row.sumDebitnumCurrenty" class="inputClass"></el-input>
                     </template>
                    </el-table-column>
                    <el-table-column
                    :formatter="format"
                    class-name="align_right"
                    label="金额">
                    <template slot-scope="scope">
                       <el-input v-show='scope.row.IsSubset === 1' v-model="scope.row.sumDebitCurrenty" class="inputClass"></el-input>
                     </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    prop="money"
                    class-name="align_right"
                    label="年初余额">
                    <el-table-column
                    class-name="align_right"
                    label="数量">
                    <template slot-scope="scope">
                       <el-input v-show='scope.row.IsSubset === 1 && scope.row.subject.units' v-model="scope.row.earlyBalanceNum" class="inputClass"></el-input>
                     </template>
                    </el-table-column>
                    <el-table-column
                    :formatter="format"
                    class-name="align_right"
                    label="金额">
                    <template slot-scope="scope">
                       <el-input v-show='scope.row.IsSubset === 1' v-model="scope.row.earlyBalance" class="inputClass"></el-input>
                     </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
        </div>
        <!-- <div class="paginationBox">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :pager-count="pageCount"
                :page-size="5"
                layout=" prev, pager, next, total, jumper"
                :total="50">
            </el-pagination>
            <el-button class="go">确定</el-button>
        </div> -->
        <el-dialog
            title="试算平衡检查"
            :visible.sync="dialogVisible"
            custom-class="myDialog"
            width="30%">
            <!-- <el-alert
                title="恭喜您，您录入的初始余额平衡！"
                您录入的初始余额不平衡，请仔细核对「资产负债表」与「利润表」
                type="success"
                show-icon
                center
                :closable="false">
            </el-alert> -->
            <el-alert
                :title="balanceTitle"
                type="error"
                show-icon
                center
                :closable="false">
            </el-alert>
            <el-table
                :data="tableTest"
                border
                style="width: 100%">
                <el-table-column
                prop="items"
                width="180"
                label="项目">
                </el-table-column>
                <el-table-column
                prop="jieMoney"
                label="借方金额"
                class-name="align_right">
                </el-table-column>
                <el-table-column
                prop="daiMoney"
                label="贷方金额"
                class-name="align_right">
                </el-table-column>
                <el-table-column
                prop="balance"
                label="差额"
                class-name="align_right">
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from "vuex";
import closeBtn from "../closeTab";
import NumFormatter from "../../assets/js/NumFormatter.js";
import urls from "../../api/unsplash/url";
import utility from "../../api/baseUtility";
export default {
  data() {
    return {
      balanceTitle:'',
      dialogVisible: false,
      filter: "资产",
      currentPage: 1,
      pageCount: 5,
      allOptions: [],
      selectedOption: "",
      inputContent: "",
      rate: "1.0000",
      hideNum: true,
      tableData: [],
      realData:[],
      tableTest: [
        {
          items: "期初余额（综合本位币）",
          jieMoney: "668",
          daiMoney: "668",
          balance: "0"
        },
        {
          items: "累计发生额（综合本位币）",
          jieMoney: "0",
          daiMoney: "0",
          balance: "0"
        }
      ]
      
    };
  },
  computed: {
    ...mapState(["skin_style", "skin_color"])
  },
  methods: {
    showBalance() {
      this.dialogVisible = true;
      this._trialBalanceTrialbalancerun();
    },
    currencyChange(val){
      console.log(val)
      this.realData = this.realData.filter(function(item,index){
         return item.subject.currency.currencyId == val
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    addRow(index, tableData) {
      console.log("添加" + index);
    },
    filterChange(val) {
      this.realData = this.tableData.filter(function(item,index){
        return item.subjectType.name == val
      })
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
     // 查询币种列表
    async currencyList(){
      try {
        let params = utility.baseEncode({
          "accountId": "1", // 暂时传默认值
        },urls.currencyList)
        let res = await this.$api.unsplash.baseInterface(params)
        if(res.returnStatus.code != "0000") {
          this.$message.error(utility.baseDecode2(res.returnStatus.message));
          return;
        }
        if(res.data && res.data.content){
          this.allOptions = utility.baseDecode(res.data.content)//解密
          console.log(this.allOptions);
        }
      }catch (e) {
        console.log(e)
      }
    },
    async _trialBalanceTrialbalancerun() {
      try {
        let params = utility.baseEncode(
          {"accountBookId": "1"},
          urls.trialBalanceTrialbalancerun
        );
        let res = await this.$api.unsplash.baseInterface(params);
        console.log(res);
        if(res.data && res.data.content){
          // let _resData = utility.baseDecode(res.data.content)//解密
          console.log(_resData)
          
        }
      } catch (e) {
        console.log(e);
      }
    },
    async _subjectInitialBalanceSelect() {
      try {
        let params = utility.baseEncode(
          {"accountBookId": "1"},
          urls.subjectInitialBalanceSelect
        );
        let res = await this.$api.unsplash.baseInterface(params);
        if(res.data && res.data.content){
          let _resData = utility.baseDecode(res.data.content)//解密
          console.log(_resData)
          this.tableData = _resData;
          this.realData = _resData.filter(function(item,index){
            return item.subjectType.name == '资产'
          })
        }
      } catch (e) {
        console.log(e);
      }
      this.currencyList() //调用币别接口
    },
   async _subjectInitialBalanceUpdate(){
      try {
        let updateData = [];
        for(let i = 0 ; i < this.tableData.length; i++){
            updateData.push({
              subjectInitialBalanceId:this.tableData[i].subjectInitialBalanceId,
              subjectAssistsubjectId:this.tableData[i].subjectAssistsubjectId,
              subjectAssistAccountingId:this.tableData[i].subjectAssistAccountingId,
              accountBookId:this.tableData[i].accountBookId,
              initialBalanceAmount:this.tableData[i].initialBalanceAmount == '' ? 0 : parseInt(this.tableData[i].initialBalanceAmount),
              InitialBalanceNum:this.tableData[i].InitialBalanceNum == '' ? 0 : parseInt(this.tableData[i].InitialBalanceNum),
              realtimeBalanceAmount:this.tableData[i].realtimeBalanceAmount == '' ? 0 : parseInt(this.tableData[i].realtimeBalanceAmount),
              realtimeBalanceNum:this.tableData[i].realtimeBalanceNum== '' ? 0 : parseInt(this.tableData[i].realtimeBalanceNum),
              sumDebitCurrenty:this.tableData[i].sumDebitCurrenty == '' ? 0 : parseInt(this.tableData[i].sumDebitCurrenty),
              sumDebitnumCurrenty:this.tableData[i].sumDebitnumCurrenty == '' ? 0 : parseInt(this.tableData[i].sumDebitnumCurrenty),
              sumCreditCurrenty:this.tableData[i].sumCreditCurrenty == '' ? 0 : parseInt(this.tableData[i].sumCreditCurrenty),
              sumCreditnumCurrenty:this.tableData[i].sumCreditnumCurrenty == '' ? 0 : parseInt(this.tableData[i].sumCreditnumCurrenty),
              earlyBalance:this.tableData[i].earlyBalance == '' ? 0 : parseInt(this.tableData[i].earlyBalance),
              earlyBalanceNum:this.tableData[i].earlyBalanceNum == '' ? 0 : parseInt(this.tableData[i].earlyBalanceNum),
              actualPlAccrual:this.tableData[i].actualPlAccrual == '' ? 0 :parseInt(this.tableData[i].actualPlAccrual),
              status:this.tableData[i].status
            });
        }console.log(updateData);
        let params = utility.baseEncode(updateData,urls.subjectInitialBalanceUpdate);
        let res = await this.$api.unsplash.baseInterface(params);
        console.log(res);
        if(res.returnStatus.code === '0000'){
          this.$message({
            message: utility.baseDecode2(res.returnStatus.message),
            type: 'success'
          });
        }else{
            this.$message.error(utility.baseDecode2(res.returnStatus.message));
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  components: {
    closeBtn
  },
  currentRow: null,
  created(){
    this._subjectInitialBalanceSelect(); 
  }
};
</script>

<style lang="scss">
@import "../../assets/css/variable.scss";
#finance {
  .filter .el-input__inner {
    height: 39px;
    border: 1px solid #d8dce5;
    border-radius: 2px;
    color: black;
  }
  .filter .el-input {
    width: 106px;
    margin-left: 13px;
    height: 39px;
  }
  .el-radio-button__inner {
    color: #000;
  }
  .el-radio-group.blue {
    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      color: white;
      background-color: $blue;
      border-color: $blue;
    }
  }
  .el-radio-group.orange {
    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      color: white;
      background-color: $orange;
      border-color: $orange;
    }
  }
  .el-radio-group.popular {
    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      color: white;
      background-color: $popular;
      border-color: $popular;
    }
  }
  .el-radio-group.pink {
    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      color: white;
      background-color: $pink;
      border-color: $pink;
    }
  }
  .el-radio-group.green {
    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      color: white;
      background-color: $green;
      border-color: $green;
    }
  }

  .el-table .cell {
    height: 50px;
    line-height: 50px;
  }
  .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    box-shadow: 0 2px 3px 0 rgba(117, 117, 117, 0.5) !important;
  }
  .el-radio-button__inner:hover {
    color: #000;
  }
  .el-radio-button__inner {
    background: #eaeaea;
    border: 1px solid #fff;
    border-top: 0;
    border-bottom: 0;
  }
  .el-alert {
    width: auto;
    margin: 0 auto;
    margin-bottom: 15px;
    border-radius: 4px;
    text-align: center;
  }
  .el-alert--success {
    border: 1px solid #adff56;
    background: #f5ffeb;
  }
  .el-alert--error {
    border: 1px solid #ff8585;
    background: #fff6f6;
  }
  .el-alert__title {
    /*font-size: 16px;*/
  }
  .el-dialog__body {
    padding-top: 15px;
  }
}
</style>

<style lang="scss" scoped>
@import "../../assets/icon/iconfont.css";
#finance {
  margin-left: 21px;
  margin-right: 21px;
  .filter {
    overflow: hidden;
    .top-text {
      color: #333333;
      text-align: left;
    }
    .coin {
      margin-left: 70px;
    }
    .rate {
      margin-left: 16px;
    }
    .checkbox {
      margin-left: 24px;
    }
  }
  .list {
    margin-top: 20px;
  }
  .paginationBox {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .vertical-center {
    vertical-align: middle;
  }
  .inputClass{
    width: calc(100% - 30px);
  }
}
</style>

