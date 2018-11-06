<template>
  <div id="ledger" class="public-container">
    <el-row class="Rtitle">
      <el-col :span="12">
        总账
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
                    <el-checkbox v-model="checkform.checkbox_5">余额为0不显示</el-checkbox>
                  </el-col>
                </el-form-item>
                <el-form-item label=" "  class="label_none" style="margin-bottom: 5px">
                  <el-col :span="20">
                    <el-checkbox v-model="checkform.checkbox_6">无发生额且余额为0不显示</el-checkbox>
                  </el-col>
                </el-form-item>
                <el-form-item label=" "  class="label_none">
                  <el-col :span="20">
                    <el-checkbox v-model="checkform.checkbox_7">无发生额不显示本期合计、本年累计</el-checkbox>
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
        </el-popover>

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

    <el-row :gutter="20" style="width: 100%; margin-top: 20px;">
        <el-table
          :data="tableData"
          stripe
          border
          ref="singleTable"
          highlight-current-row
          @current-change="handleCurrentChange"
          :span-method="objectSpanMethod"
          style="margin-bottom: 40px">
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
            prop="during"
            label="期间">
          </el-table-column>
          <el-table-column
            prop="abstractName"
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
            prop="balanceDirection"
            label="方向">
          </el-table-column>
          <el-table-column
            prop="remainingSum"
            :formatter="format"
            class-name="align_right"
            label="余额">
          </el-table-column>
        </el-table>

      <div class="paginationBox">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="pageCurrentChange"
          :current-page="currentPage2"
          :pager-count="5"
          :page-size="pageSize"
          layout=" prev, pager, next, total, jumper"
          :total="totalItems">
        </el-pagination>
        <el-button class="go">确定</el-button>
      </div>

    </el-row>
  </div>
</template>

<script>

  import { mapState, } from 'vuex'
  import NumFormatter from '../../assets/js/NumFormatter.js'
  import closeBtn from '../closeTab'
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
        pageSize:3,
        totalItems:0,
        pageCount:5,
        showForm:false,
        options:[
          {
            value:'ji',
            label:'记'
          }
        ],
        rowSpan:1,
        filterText:'',
        currentPage2:1,
        tableData: [],
        multipleSelection: [],
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
        currentRow: null,
      }
    },

    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      pageCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage2 = val;
        this.ledgerList();
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
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        let num = this.rowSpan ? this.rowSpan : 1;
        if (columnIndex === 0 || columnIndex === 1) {
          if (rowIndex % num === 0) {
            return {
              rowspan: num,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      async ledgerList(){
        try {
          let params = utility.baseEncode({
            "accountingPeriod": "201800-201812",
            "subjectLevel": "1",
            "accountId": "1",
            "pageNum": this.currentPage2,
            "pageSize": this.pageSize
          },urls.ledgerList)
          let res = await this.$api.unsplash.baseInterface(params)
          if(res.data && res.data.content){
            let _resData = utility.baseDecode(res.data.content).pagePojo//解密
            this.totalItems = _resData.total;
            this.pageCount = _resData.pageCount;
            if(_resData.list && _resData.list.length > 0){
              this.tableData= [];
              this.rowSpan = _resData.list[0].generalLedgerList.length;
              for (let i = 0; i < _resData.list.length ; i++) {
                for (let j = 0; j < _resData.list[i].generalLedgerList.length; j++) {
                  let _data = _resData.list[i].generalLedgerList[j];
                  this.tableData.push({
                    subjectCode:_resData.list[i].subjectCode,
                    subjectName: _resData.list[i].subjectName,
                    abstractName:_data.abstractName,
                    balanceDirection:_data.balanceDirection,
                    creditAmount:_data.creditAmount,
                    debitAmount:_data.debitAmount,
                    during:_data.during,
                    remainingSum:_data.remainingSum,
                  })
                }
              }
            }
            console.log(this.tableData)
          }
        }catch (e) {
          console.log(e)
        }
      }
    },
    created(){this.ledgerList()}
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/table_1";
</style>
<style lang="scss">
@import "../../assets/css/variable.scss";
  #ledger{
    .el-table .cell{
      height: 50px;
      line-height: 50px;
    }
  }
</style>
