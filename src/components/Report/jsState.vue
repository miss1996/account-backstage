<template>
  <div id="jsState" class="public-container">
    <el-row class="Rtitle">
      <el-col :span="12">
        主要应交税金明细表
        <el-select placeholder="" size="small" v-model="stateData" style="width: 80px">
          <el-option label="月报" value="buxian"></el-option>
          <el-option label="周报" value="beijing"></el-option>
        </el-select>
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
          <el-button type="primary" :btnType="`${skin_style}_btn`">编辑公式</el-button>
          <el-button type="primary" :btnType="`${skin_style}_btn`">打印</el-button>
          <el-button type="primary" :btnType="`${skin_style}_btn`">导出</el-button>
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
        prop="coding"
        class-name="align_left"
        label="项目">
      </el-table-column>
      <el-table-column
        prop="name"
        label="行次">
      </el-table-column>
      <el-table-column
        prop="jf_money"
        :formatter="format"
        class-name="align_right"
        label="本月数">
      </el-table-column>
      <el-table-column
        prop="df_money"
        :formatter="format"
        class-name="align_right"
        label="本年累计数">
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

  </div>
</template>

<script>
  import { mapState, } from 'vuex'
  import closeBtn from '../closeTab'
  import NumFormatter from "../../assets/js/NumFormatter.js"
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
        pageCount:5,
        showForm:false,
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
        tableData: [{
          coding: '1、应交增值税',
          name: '01',
          jf_money: '33344.66',
          df_money:'23433.44',
        }, {
          coding: '（1）期末抵扣数（用负号填列）',
          name: '02',
          jf_money: '33434.66',
          df_money:'34233.44',
        },{
          coding: '（2）销项税额',
          name: '03',
          jf_money: '56334.66',
          df_money:'34233.44',
        },{
          coding: '进项税额转出',
          name: '04',
          jf_money: '34334.66',
          df_money:'56233.44',
        },{
          coding: '转出多交增值税',
          name: '05',
          jf_money: '12334.66',
          df_money:'34233.44',
        }, {
          coding: '（3）进项税额',
          name: '06',
          jf_money: '31234.66',
          df_money:'23233.44',
        },{
          coding: '已交税金',
          name: '06',
          jf_money: '33234.66',
          df_money:'22333.44',
        },{
          coding: '2、未交增值税',
          name: '07',
          jf_money: '32334.66',
          df_money:'23233.44',
        },{
          coding: '（1）期初末交数（多交数用负号填列）',
          name: '08',
          jf_money: '32334.66',
          df_money:'23323.44',
        },{
          coding: '（2）本期转入数（多交数用负号填列）',
          name: '09',
          jf_money: '33454.66',
          df_money:'23453.44',
        },{
          coding: '（3）期末未交数（多交数用负号填列）',
          name: '10',
          jf_money: '33454.66',
          df_money:'23453.44',
        }],
        currentRow: null,
      }
    },

    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      format(val) {
        return NumFormatter.formatNum(val.jf_money);
      },
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/table_1";
</style>
<style lang="scss">
  #jsState{
    .el-table .cell{
      height: 50px;
      line-height: 50px;
    }
    .el-table--enable-row-transition .el-table__body td {
      &:nth-child(1){
        text-align: left;
      }
      &:nth-child(3),&:nth-child(4) {
        text-align: right;
        padding-right: 15px;
      }
    }
  }
</style>

