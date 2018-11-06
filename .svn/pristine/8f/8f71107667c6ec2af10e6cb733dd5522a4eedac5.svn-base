<template>
  <div id="balanceSheet" class="public-container">
    <el-row class="Rtitle">
      <el-col :span="12">
        资产负债表
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
        </el-select>

      </el-col>
      <el-col :span="12" align="right" class="right_top">
        <el-row class="btn-box">
          <el-button type="primary" :btnType="`${skin_style}_btn`">查询</el-button>
          <el-button type="primary" :btnType="`${skin_style}_btn`">报税</el-button>
          <el-button type="primary" :btnType="`${skin_style}_btn`" @click="print">打印</el-button>
          <el-button type="primary" :btnType="`${skin_style}_btn`">导出</el-button>
          <closeBtn></closeBtn>
        </el-row>
      </el-col>
    </el-row>

    <el-table
      :data="tableData"
      stripe
      border
      @cell-click="cellClick"
      ref="singleTable"
      highlight-current-row
      @current-change="handleCurrentChange"
      class="sunTable"
      style="width: 100%; margin-top: 20px; margin-bottom: 40px">
      <el-table-column
        class-name="align_left"
        label="资产">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.lProjectName }}</span>
          <i class="el-icon-edit-outline" style="display: none;"></i>
        </template>
      </el-table-column>
      <el-table-column
        prop="lLinage"
        label="行次">
      </el-table-column>
      <el-table-column
        prop="lTerminal"
        class-name="align_right"
        label="期末数">
        <template slot-scope="scope">
          <p v-if="!!scope.row.terminal">{{ scope.row.terminal}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="lEarlyMoney"
        class-name="align_right"
        :formatter="format"
        label="年初数">
      </el-table-column>
        <!-- <template scope="scope">
          <p v-if="!!scope.row.earlyMoney">{{ scope.row.earlyMoney }}</p>
        </template> -->
      <el-table-column
        prop="rProjectName"
        class-name="align_left"
        label="负债和所有者(股东权益)">
      </el-table-column>
      <el-table-column
        prop="rLinage"
        label="行次">
      </el-table-column>
      <el-table-column
        prop="rTerminal"
        class-name="align_right"
        :formatter="format"
        label="期末数">
      </el-table-column>
        <!-- <template scope="scope">
          <p v-if="!!scope.row.terminal2">{{ scope.row.terminal2 }}</p>
        </template> -->
      <el-table-column
        prop="rEarlyMoney"
        class-name="align_right"
        :formatter="format"
        label="年初数">
        <!-- <template scope="scope">
          <p v-if="!!scope.row.earlyMoney2">{{scope.row.earlyMoney2 }}</p>
        </template> -->
      </el-table-column>
    </el-table>

    <el-dialog title="新增下级科目" :visible.sync="dialogVisible" custom-class="myDialog" width="39%">
			 <el-form :model="form">
         <el-row style="line-height: 40px;">
           <el-col :span="8">
            <el-form-item label="科目：">
              <el-input v-model="form.subject" auto-complete="off">
                <i slot="suffix" class="el-input__icon el-icon-date"></i>
              </el-input>
            </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="运算符号：">
              <el-select v-model="form.sign">
                <el-option label="+" value="add"></el-option>
                <el-option label="-" value="minus"></el-option>
              </el-select>
            </el-form-item>
           </el-col>
           <el-col :span="6">
            <el-form-item label="取数规则：">
              <el-select v-model="form.rule">
                <el-option label="余额" value="balance"></el-option>
                <el-option label="借方金额" value="jf_balance"></el-option>
                <el-option label="贷方金额" value="df_balance"></el-option>
              </el-select>
            </el-form-item>
           </el-col>
           <el-col :span="4">
            <el-button>添加</el-button>
           </el-col>
         </el-row>
      </el-form>
      <el-table
        :data="tableData6"
        border
        height="200"
        show-summary
        style="width: 100%; margin-top: 20px">
        <el-table-column
          prop="subject"
          label="科目">
        </el-table-column>
        <el-table-column
          prop="name"
          label="运算符号">
        </el-table-column>
        <el-table-column
          prop="rule"
          label="取数规则">
        </el-table-column>
        <el-table-column
          prop="qm_num"
          label="期末数">
        </el-table-column>
        <el-table-column
          prop="nc_num"
          label="年初数">
        </el-table-column>
        <el-table-column
          prop="operate"
          label="操作">
           <template slot-scope="scope">
            <i class="el-icon-close" @click="deleteRow(scope.$index, tableData6)"></i>
          </template>
        </el-table-column>
      </el-table>
			<div slot="footer" class="dialog-footer">
				<span class="btn" :style="{background:skin_color}" @click="dialogVisible = false">保存</span>
				<span class="btn" @click="dialogVisible = false">取消</span>
			</div>
		</el-dialog>
  </div>
</template>

<script>
  import { mapState, } from 'vuex'
  import closeBtn from '../closeTab'
  import urls from '../../api/unsplash/url'
  import utility from '../../api/baseUtility'
  import NumFormatter from '../../assets/js/NumFormatter.js'
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
        qishu:'',
        dialogVisible: false,
        showForm:false,
        pageCount:5,
        stateData:'月报',
        canvasId: 'myCanvas',
        type: 'bar',
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
        currentRow: null,
        form: {
          subject: '',
          sign: '',
          rule: '',
        },
        tableData6: [{
          subject: '12987122',
          name: '+',
          rule: '余额',
          qm_num: '3.2',
          nc_num: 10
        }, {
          subject: '12987123',
          name: '-',
          rule: '余额',
          qm_num: '4.43',
          nc_num: 12
        }, {
          subject: '12987124',
          name: '+',
          rule: '余额',
          qm_num: '1.9',
          nc_num: 9
        }, {
          subject: '12987125',
          name: '-',
          rule: '余额',
          qm_num: '2.2',
          nc_num: 17
        }, {
          subject: '12987126',
          name: '+',
          rule: '余额',
          qm_num: '4.1',
          nc_num: 15
        }],
        tableData: [],
      }
    },
    mounted(){
      this.balanceSheetList(); //列表
      //this.balanceSheetFormList()//公式项列表
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      format(row, column, cellValue, index) {
        console.log(cellValue);
        if (cellValue == undefined) {
          return "";
        }
        return NumFormatter.formatNum(cellValue);
      },
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      cellClick(row, column, cell, event) {
        if (column.label == "资产" || column.label == "负债和所有者(股东权益)") {
          this.dialogVisible = true;
        } else if (column.label == "期末数") {
          console.log("跳转到总账");
        }
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      print() {
        window.open('../../../static/pdf/web/viewer.html')
      },
      async balanceSheetList(){
        try {
          let that=this
          let params = utility.baseEncode({
            "accountId": "1",
            "period":"201809"
          },urls.balanceSheetList)
          let res = await this.$api.unsplash.baseInterface(params)
          if(res.data && res.data.content){
            let _resData = utility.baseDecode(res.data.content)//解密
            if(_resData && _resData.length > 0){
              // 左侧数组
              let a = [];
              // 右侧数组
              let b = [];
              // 左侧插入指针
              let lIndex = 0;	
              // 右侧插入指针
              let rIndex = 0;
              // 原始数据处理
              _resData.map(function(item, index){
                if (item.projectType == "1") {
                  if (item.projectName == '非流动资产合计') {
                    lIndex =  index;
                  }
                  a.push(item);
                } else {
                  if (item.projectName == '所有者权益（或股东权益）合计') {
                    rIndex =  index;
                  }
                  b.push(item);
                }
              });
              rIndex -= a.length;
              // 左右数组平衡
              if (a.length > b.length) {
                for (let i = 0; i < a.length - b.length; i++) {
                  b.splice(rIndex, 0, {});
                }
              } else if (a.length < b.length) {
                for (let i = 0; i < b.length - a.length; i++) {
                  a.splice(lIndex, 0, {});
                }
              }
              // 插入数值
              for (let i = 0; i < a.length; i++) {
                this.tableData.push({
                  lAssetsId: a[i].assetsId,
                  lPid: a[i].pid,
                  lProjectType: a[i].projectType,
                  lProjectName: a[i].projectName, 
                  lLinage: a[i].linage, 
                  lEarlyMoney: a[i].earlyMoney, 
                  lTerminal: a[i].terminal,
                  rAssetsId: b[i].assetsId,
                  rPid: b[i].pid,
                  rProjectType: b[i].projectType,
                  rProjectName: b[i].projectName, 
                  rLinage: b[i].linage, 
                  rEarlyMoney: b[i].earlyMoney, 
                  rTerminal: b[i].terminal})
              }
            }
          }
        }catch (e) {
          console.log(e)
        }
      },
      async balanceSheetFormList(){
        try {
          let params = utility.baseEncode({
            "accountId":"1",
            "assetsId":"3",
            "subjectId":"123",
            "period":"201809"
          },urls.balanceSheetFormList)
          let res = await this.$api.unsplash.baseInterface(params)
          if(res.data && res.data.content){
            let _resData = utility.baseDecode(res.data.content)//解密
             console.log(_resData)
            if(_resData && _resData.length > 0){
              console.log(_resData)
            }
          }
        }catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>

<style  lang="scss" scoped>
  @import "../../assets/css/table_1";
</style>
<style lang="scss">
@import "../../assets/css/variable.scss";
  #balanceSheet{
    .el-table .cell{
      height: 50px;
      line-height: 50px;
    }
    .myDialog .el-dialog__body {
      padding: 40px 2px 60px 20px;
      .el-form {
        .el-form-item__label {
          padding: 0;
        }
        .el-input[data-v-44fb682b] {
          width: 180px;
        }
        .el-input {
          width: 95px;
        }
      }
      .el-table .cell {
        height: 36px;
        line-height: 36px;
      }
      .el-table th {
      line-height: 36px;
      height: 36px;
      }
    }
    .el-button[data-v-44fb682b] {
      padding: 10px 13px;
    }
    .sunTable.el-table--enable-row-hover .el-table__body tr:hover>td {
      &:nth-child(odd) {
        text-decoration: underline;
        cursor: pointer;
        i {
          display: inline !important;
        }
      }
    }
  }
</style>

