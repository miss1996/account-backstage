<template>
  <div id="sheetSum" class="public-container">
    <el-row class="Rtitle">
      <el-col :span="12">
        核算项目组合表
        <el-popover
          placement="bottom-start"
          width="430"
          popper-class="searchCondition"
          trigger="click">
          <el-form ref="checkform" label-position="left" :model="checkform" label-width="85px" size="small">
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
                <el-form-item label="" class="label_none">
                  <el-radio-group v-model="checkform.resource">
                    <el-radio label="科目 - 辅助核算组合"></el-radio>
                    <el-radio label="双辅助核算组合"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <div class="handle-cloum-row">
                  <el-col :span="20">
                    <div v-if="handleRow == true">
                      <el-form-item label="行：辅助核算" class="longLabel" style="margin-bottom: 15px">
                        <el-select placeholder="" style="width:100%;" v-model="checkform.cloum">
                          <el-option label="客户" value="buxian"></el-option>
                          <el-option label="顾客" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="列：科  目" class="longLabel" style="margin-bottom: 15px">
                        <el-input  v-model="checkform.row" placeholder="请输入科目编码或编码范围"></el-input>
                        <p style="color:#ccc; margin:0;line-height: 1.3; font-size: 12px; margin-top: 5px">例：1001，1009，2121-2131</p>
                      </el-form-item>
                    </div>
                    <div v-else>
                      <el-form-item label="行：科  目" class="longLabel" style="margin-bottom: 15px">
                        <el-input  v-model="checkform.cloum" placeholder="请输入科目编码或编码范围"></el-input>
                        <p style="color:#ccc; margin:0;line-height: 1.3; font-size: 12px; margin-top: 5px">例：1001，1009，2121-2131</p>
                      </el-form-item>
                      <el-form-item label="列：辅助核算" class="longLabel" style="margin-bottom: 15px">
                        <el-select placeholder="" style="width:100%;" v-model="checkform.row">
                          <el-option label="客户" value="buxian"></el-option>
                          <el-option label="顾客" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="4" class="sortBox"> <i class="el-icon-sort"  @click="handleChange"></i> </el-col>
                </div>
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
                <el-form-item label="币  别:" style="margin-bottom: 15px">
                  <el-col :span="20">
                    <el-select placeholder="" style="width:100%; margin-right: 13px" v-model="checkform.currency">
                      <el-option label="综合本位币" value="buxian"></el-option>
                      <el-option label="综合本位币2" value="beijing"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
                <el-form-item label="数  据:">
                  <el-checkbox-group v-model="checkform.type">
                    <el-checkbox label="初期余额" name="type"></el-checkbox>
                    <el-checkbox label="借方发生额" name="type"></el-checkbox>
                    <el-checkbox label="贷方发生额" name="type"></el-checkbox>
                    <el-checkbox label="期末余额" name="type"></el-checkbox>
                    <el-checkbox label="损益发生额" name="type"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="" class="label_none">
                  <el-checkbox-group v-model="checkform.type1">
                    <el-checkbox label="余额为0不显示" name="type"></el-checkbox>
                    <el-checkbox label="显示科目编码" name="type"></el-checkbox>
                    <el-checkbox label="显示合计" name="type"></el-checkbox>
                    <el-checkbox label="仅显示明细科目名称" name="type"></el-checkbox>
                  </el-checkbox-group>
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
        style="margin-bottom: 40px">
        <el-table-column
          prop="name"
          class-name="align_left"
          label="名称">
        </el-table-column>
        <el-table-column
          label="新增科目77-外币">
          <el-table-column
            prop="cq_balance"
            :formatter="format"
            class-name="align_right"
            label="初期余额">
          </el-table-column>
          <el-table-column
            prop="jf_money"
            :formatter="format"
            class-name="align_right"
            label="借方发生额">
          </el-table-column>
          <el-table-column
            prop="df_money"
            :formatter="format"
            class-name="align_right"
            label="贷方发生额">
          </el-table-column>
          <el-table-column
            prop="qm_balance"
            :formatter="format"
            class-name="align_right"
            label="期末余额">
          </el-table-column>
          <el-table-column
            prop="sy_money"
            :formatter="format"
            class-name="align_right"
            label="损益发生额">
          </el-table-column>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage2"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="100">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>

  import { mapState, } from 'vuex'
  import NumFormatter from '../../assets/js/NumFormatter.js'
  import closeBtn from '../closeTab'
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
        handleRow:true,
        pageCount:5,
        showForm:false,
        options:[
          {
            value:'ji',
            label:'记'
          }
        ],
        filterText:'',
        currentPage2:1,
        tableData: [{
          name: '出差费用',
          cq_balance: '338474.00',
          jf_money:'848923.00',
          df_money: '334.66',
          qm_balance:'233.44',
          sy_money:'339548.00'
        },{
          name: '出差费用',
          cq_balance: '338474.00',
          jf_money:'848923.00',
          df_money: '334.66',
          qm_balance:'233.44',
          sy_money:'339548.00'
        },{
          name: '出差费用',
          cq_balance: '338474.00',
          jf_money:'848923.00',
          df_money: '334.66',
          qm_balance:'233.44',
          sy_money:'339548.00'
        },{
          name: '出差费用',
          cq_balance: '338474.00',
          jf_money:'848923.00',
          df_money: '334.66',
          qm_balance:'233.44',
          sy_money:'339548.00'
        },{
          name: '出差费用',
          cq_balance: '338474.00',
          jf_money:'848923.00',
          df_money: '334.66',
          qm_balance:'233.44',
          sy_money:'339548.00'
        },{
          name: '出差费用',
          cq_balance: '338474.00',
          jf_money:'848923.00',
          df_money: '334.66',
          qm_balance:'233.44',
          sy_money:'339548.00'
        },{
          name: '出差费用',
          cq_balance: '338474.00',
          jf_money:'848923.00',
          df_money: '334.66',
          qm_balance:'233.44',
          sy_money:'339548.00'
        },{
          name: '出差费用',
          cq_balance: '338474.00',
          jf_money:'848923.00',
          df_money: '334.66',
          qm_balance:'233.44',
          sy_money:'339548.00'
        },{
          name: '出差费用',
          cq_balance: '338474.00',
          jf_money:'848923.00',
          df_money: '334.66',
          qm_balance:'233.44',
          sy_money:'339548.00'
        },{
          name: '出差费用',
          cq_balance: '338474.00',
          jf_money:'848923.00',
          df_money: '334.66',
          qm_balance:'233.44',
          sy_money:'339548.00'
        }],
        multipleSelection: [],
        checkform:{
          cloum:'',
          krow:'',
          type:[],
          type1:[],
          resource:'',
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
      handleChange(){
        this.handleRow = !this.handleRow
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
      
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/table_1";
  .handle-cloum-row{
    border: 1px dashed #ddd;
    overflow: hidden;
    padding-top: 10px;
    margin-bottom: 10px;
    text-align: center;
    .sortBox{
      .el-icon-sort{
        font-size: 25px;
        color: #aaa;
        vertical-align: middle;
        line-height: 95px;
      }
      &:hover{cursor: pointer}
    }
  }

</style>
<style lang="scss">
@import '../../assets/css/variable.scss';
  #sheetSum{
    .el-table .cell{
      height: 50px;
      line-height: 50px;
    }
  }

</style>
