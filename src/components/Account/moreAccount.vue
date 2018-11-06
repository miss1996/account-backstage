<template>
  <div id="moreAccount" class="public-container">
    <el-row class="Rtitle">
      <el-col :span="12">
        多栏账
        <el-popover
          placement="bottom-start"
          width="430"
          popper-class="searchCondition"
          v-model="poverVisible"
          trigger="click">
          <el-form ref="checkform" :model="checkform" label-position="left" size="small" label-width="110px">
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
                <el-form-item label="会计科目:" style="margin-bottom: 15px">
                  <el-col :span="20">
                    <el-input v-model="checkform.subject"  style="width: 100%"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="核算项目类别:" style="margin-bottom: 15px">
                  <el-col :span="20">
                    <el-select placeholder="" style="width:100%; margin-right: 13px" v-model="checkform.currency">
                      <el-option label="供应商" value="buxian"></el-option>
                      <el-option label="供应商" value="beijing"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
                <el-form-item label="核算项目:" style="margin-bottom: 15px">
                  <el-col :span="20">
                    <el-select placeholder="" style="width:100%; margin-right: 13px" v-model="checkform.currency">
                      <el-option label="全部" value="buxian"></el-option>
                      <el-option label="供应商" value="beijing"></el-option>
                    </el-select>
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
                <el-form-item label=" " style="margin-bottom: 5px">
                  <el-col :span="20">
                    <el-checkbox v-model="checkform.checkbox_2">显示明细栏余额</el-checkbox>
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
                <el-form-item label=" " style="margin-bottom: 5px">
                  <el-col :span="20">
                    <el-checkbox v-model="checkform.checkbox_1">无发生额且余额为0不显示</el-checkbox>
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
          <el-button type="primary" :btnType="`${skin_style}_btn`" @click="exportXlsx">导出</el-button>
          <closeBtn></closeBtn>
        </el-row>
      </el-col>
    </el-row>

    <el-row style="width: 100%; margin-top: 20px;">
      <el-col :span="24">
        <div class="titlebox">科目:1001记-1</div>
        <el-table
          :data="tableData"
          stripe
          border
          ref="singleTable"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="margin-bottom: 40px">
          <el-table-column
            prop="coding"
            label="日期">
          </el-table-column>
          <el-table-column
            prop="name"
            class-name="align_left"
            label="凭证字号">
          </el-table-column>
          <el-table-column
            prop="zhaiyao"
            class-name="align_left"
            label="摘要">
          </el-table-column>
          <el-table-column
            prop="jf_money"
            :formatter="format"
            class-name="align_right"
            label="借方金额">
          </el-table-column>
          <el-table-column
            prop="df_money"
            :formatter="format"
            class-name="align_right"
            label="贷方金额">
          </el-table-column>
          <el-table-column
            prop="direct"
            label="方向">
          </el-table-column>
          <el-table-column
            prop="money"
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
        poverVisible:false,
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
        tableData: [{
          coding: '895455',
          name: '记-1',
          zhaiyao:'初期余额',
          jf_money: '334.66',
          df_money:'233.44',
          direct:'借',
          money:'8856.00'
        },{
          coding: '895455',
          name: '记-1',
          zhaiyao:'初期余额',
          jf_money: '334.66',
          df_money:'233.44',
          direct:'借',
          money:'8856.00'
        },{
          coding: '895455',
          name: '记-1',
          zhaiyao:'初期余额',
          jf_money: '334.66',
          df_money:'233.44',
          direct:'贷',
          money:'8856.00'
        },{
          coding: '895455',
          name: '记-1',
          zhaiyao:'初期余额',
          jf_money: '334.66',
          df_money:'233.44',
          direct:'借',
          money:'8856.00'
        },{
          coding: '895455',
          name: '记-1',
          zhaiyao:'初期余额',
          jf_money: '3345.66',
          df_money:'2334.44',
          direct:'贷',
          money:'88567.00'
        },{
          coding: '895455',
          name: '记-1',
          zhaiyao:'初期余额',
          jf_money: '334.66',
          df_money:'233.44',
          direct:'贷',
          money:'8856.00'
        },{
          coding: '895455',
          name: '记-1',
          zhaiyao:'初期余额',
          jf_money: '334.66',
          df_money:'233.44',
          direct:'借',
          money:'8856.00'
        },{
          coding: '895455',
          name: '记-1',
          zhaiyao:'初期余额',
          jf_money: '3345.66',
          df_money:'2334.44',
          direct:'贷',
          money:'88567.00'
        }],
        multipleSelection: [],
        checkform:{
          subject:'',
          region: '',
          date1: '',
          date2: '',
          level2:"",
          level1:'',
          currency: '',
          checkbox_1:'',
          checkbox_2:''
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        currentRow: null,
      }
    },
    methods:{
      exportXlsx(){
        this.$message({
          message: '没有满足条件的结果！',
          type: 'warning'
        });
      },
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
        this.$refs.multipleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable.scss";
  @import "../../assets/css/table_1";
</style>
<style lang="scss">
  #moreAccount{
    .el-table .cell{
      height: 50px;
      line-height: 50px;
    }
  }

</style>
