<template>
  <div id="numDetail" class="public-container2">
    <el-row class="Rtitle">
      <el-col :span="12">
        数量金额明细账
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
                <el-form-item class="XXX" label="数量显示小数位数:">
                  <el-col :span="19">
                    <div class="handle-btn">
                      <el-input v-model="checkform.level2" @input="handleInput('num1')"></el-input>
                      <div class="handle">
                        <i class="el-icon-arrow-up" @click="arrowUp('num1')"></i>
                        <i class="el-icon-arrow-down" @click="arrowDown('num1')"></i>
                      </div>
                    </div>
                  </el-col>
                </el-form-item>
                <el-form-item class="XXX" label="单价显示小数位数:" style="margin-bottom: 15px">
                  <el-col :span="19">
                    <div class="handle-btn">
                      <el-input v-model="checkform.level2" @input="handleInput('num1')"></el-input>
                      <div class="handle">
                        <i class="el-icon-arrow-up" @click="arrowUp('num1')"></i>
                        <i class="el-icon-arrow-down" @click="arrowDown('num1')"></i>
                      </div>
                    </div>
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
          <el-button type="primary" :btnType="`${skin_style}_btn`">连续打印</el-button>
          <el-button type="primary" :btnType="`${skin_style}_btn`">打印</el-button>
          <el-button type="primary" :btnType="`${skin_style}_btn`">导出</el-button>
          <closeBtn></closeBtn>
        </el-row>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="width: 100%; margin-top: 20px;">
      <el-col :span="handle_slider == false ? 19 : 23">
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
            label="借方发生额">
            <el-table-column
              prop="jf_number"
              class-name="align_right"
              label="数量">
            </el-table-column>
            <el-table-column
              prop="jf_unit"
              class-name="align_right"
              label="单价">
            </el-table-column>
            <el-table-column
              prop="jf_price"
              :formatter="format"
              class-name="align_right"
              label="金额">
            </el-table-column>
          </el-table-column>
          <el-table-column
            prop="df_money"
            label="贷方发生额">
            <el-table-column
              prop="m_number"
              class-name="align_right"
              label="数量">
            </el-table-column>
            <el-table-column
              prop="df_unit"
              class-name="align_right"
              label="单价">
            </el-table-column>
            <el-table-column
              prop="df_price"
              :formatter="format"
              class-name="align_right"
              label="金额">
            </el-table-column>
          </el-table-column>
          <el-table-column
            prop="money"
            label="金额">
            <el-table-column
              prop="m_direct"
              label="方向">
            </el-table-column>
            <el-table-column
              prop="m_number"
              class-name="align_right"
              label="数量">
            </el-table-column>
            <el-table-column
              prop="m_unit"
              class-name="align_right"
              label="单价">
            </el-table-column>
            <el-table-column
              prop="m_price"
              :formatter="format"
              class-name="align_right"
              label="金额">
            </el-table-column>
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
      <el-col :span="5" class="rightBox" v-show="handle_slider == false" style="padding: 0px !important; height: 614px; overflow-y: auto;">
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
        pageCount:5,
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
          name: '记-3',
          zhaiyao:'期初余额',
          direct:'借',
          jf_number:'373474.00',
          jf_unit:'456.00',
          jf_price:'8000',
          df_number:'26545.00',
          df_unit:'568.00',
          df_price:'8000',
          m_number:'22365.00',
          m_unit:'4565.00',
          m_price:'8000',
          m_direct:'借'
        },{
          coding: '895455',
          name: '记-3',
          zhaiyao:'期初余额',
          direct:'借',
          jf_number:'373474.00',
          jf_unit:'456.00',
          jf_price:'8000',
          df_number:'26545.00',
          df_unit:'568.00',
          df_price:'8000',
          m_number:'22365.00',
          m_unit:'4565.00',
          m_price:'8000',
          m_direct:'借'
        },{
          coding: '895455',
          name: '记-3',
          zhaiyao:'期初余额',
          direct:'借',
          jf_number:'373474.00',
          jf_unit:'456.00',
          jf_price:'8000',
          df_number:'26545.00',
          df_unit:'568.00',
          df_price:'8000',
          m_number:'22365.00',
          m_unit:'4565.00',
          m_price:'8000',
          m_direct:'借'
        },{
          coding: '895455',
          name: '记-3',
          zhaiyao:'期初余额',
          direct:'借',
          jf_number:'373474.00',
          jf_unit:'456.00',
          jf_price:'8000',
          df_number:'26545.00',
          df_unit:'568.00',
          df_price:'8000',
          m_number:'22365.00',
          m_unit:'4565.00',
          m_price:'8000',
          m_direct:'借'
        },{
          coding: '895455',
          name: '记-3',
          zhaiyao:'期初余额',
          direct:'借',
          jf_number:'373474.00',
          jf_unit:'456.00',
          jf_price:'8000',
          df_number:'26545.00',
          df_unit:'568.00',
          df_price:'8000',
          m_number:'22365.00',
          m_unit:'4565.00',
          m_price:'8000',
          m_direct:'借'
        },{
          coding: '895455',
          name: '记-3',
          zhaiyao:'期初余额',
          direct:'借',
          jf_number:'373474.00',
          jf_unit:'456.00',
          jf_price:'8000',
          df_number:'26545.00',
          df_unit:'568.00',
          df_price:'8000',
          m_number:'22365.00',
          m_unit:'4565.00',
          m_price:'8000',
          m_direct:'借'
        },{
          coding: '895455',
          name: '记-3',
          zhaiyao:'期初余额',
          direct:'借',
          jf_number:'373474.00',
          jf_unit:'456.00',
          jf_price:'8000',
          df_number:'26545.00',
          df_unit:'568.00',
          df_price:'8000',
          m_number:'22365.00',
          m_unit:'4565.00',
          m_price:'8000',
          m_direct:'借'
        },{
          coding: '895455',
          name: '记-3',
          zhaiyao:'期初余额',
          direct:'借',
          jf_number:'373474.00',
          jf_unit:'456.00',
          jf_price:'8000',
          df_number:'26545.00',
          df_unit:'568.00',
          df_price:'8000',
          m_number:'22365.00',
          m_unit:'4565.00',
          m_price:'8000',
          m_direct:'借'
        },{
          coding: '895455',
          name: '记-3',
          zhaiyao:'期初余额',
          direct:'借',
          jf_number:'373474.00',
          jf_unit:'456.00',
          jf_price:'8000',
          df_number:'26545.00',
          df_unit:'568.00',
          df_price:'8000',
          m_number:'22365.00',
          m_unit:'4565.00',
          m_price:'8000',
          m_direct:'借'
        },{
          coding: '895455',
          name: '记-3',
          zhaiyao:'期初余额',
          direct:'借',
          jf_number:'373474.00',
          jf_unit:'456.00',
          jf_price:'8000',
          df_number:'26545.00',
          df_unit:'568.00',
          df_price:'8000',
          m_number:'22365.00',
          m_unit:'4565.00',
          m_price:'8000',
          m_direct:'借'
        }],
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
        zNodes:[
          { name:"1001 记-3", isParent:false,icon:require('../../assets/imgs/icon_wenjian1.svg')},
          { name:"1002 银行存款", open:true,iconOpen:require('../../assets/imgs/openwenjian.svg'),iconClose:require('../../assets/imgs/icon_wenjian2.svg'),
            children: [
              { name:"100201 银行存款",
                open:false,
                iconOpen:require('../../assets/imgs/openwenjian.svg'),
                iconClose:require('../../assets/imgs/icon_wenjian2.svg'),
                children: [
                  { name:"38473 差旅费",icon:require('../../assets/imgs/icon_wenjian3.svg')},
                  { name:"38473 差旅费",icon:require('../../assets/imgs/icon_wenjian3.svg')},
                  { name:"38473 差旅费",icon:require('../../assets/imgs/icon_wenjian3.svg')},
                  { name:"38473 差旅费",icon:require('../../assets/imgs/icon_wenjian3.svg')}
                ]},
              { name:"10023 应收票据", isParent:true,icon:require('../../assets/imgs/icon_wenjian2.svg')}
            ]
          },
          { name:"1002 银行存款", open:true,iconOpen:require('../../assets/imgs/openwenjian.svg'),iconClose:require('../../assets/imgs/icon_wenjian2.svg'),
            children: [
              { name:"100201 银行存款",
                open:false,
                iconOpen:require('../../assets/imgs/openwenjian.svg'),
                iconClose:require('../../assets/imgs/icon_wenjian2.svg'),
                children: [
                  { name:"38473 差旅费",icon:require('../../assets/imgs/icon_wenjian3.svg')},
                  { name:"38473 差旅费",icon:require('../../assets/imgs/icon_wenjian3.svg')},
                  { name:"38473 差旅费",icon:require('../../assets/imgs/icon_wenjian3.svg')},
                  { name:"38473 差旅费",icon:require('../../assets/imgs/icon_wenjian3.svg')}
                ]},
              { name:"10023 应收票据", isParent:true,icon:require('../../assets/imgs/icon_wenjian2.svg')}
            ]
          },
          { name:"1002 银行存款", open:true,iconOpen:require('../../assets/imgs/openwenjian.svg'),iconClose:require('../../assets/imgs/icon_wenjian2.svg'),
            children: [
              { name:"100201 银行存款",
                open:false,
                iconOpen:require('../../assets/imgs/openwenjian.svg'),
                iconClose:require('../../assets/imgs/icon_wenjian2.svg'),
                children: [
                  { name:"38473 差旅费",icon:require('../../assets/imgs/icon_wenjian3.svg')},
                  { name:"38473 差旅费",icon:require('../../assets/imgs/icon_wenjian3.svg')},
                  { name:"38473 差旅费",icon:require('../../assets/imgs/icon_wenjian3.svg')},
                  { name:"38473 差旅费",icon:require('../../assets/imgs/icon_wenjian3.svg')}
                ]},
              { name:"10023 应收票据", isParent:true,icon:require('../../assets/imgs/icon_wenjian2.svg')}
            ]
          },
          { name:"10024 其他应收款", open:true,iconOpen:require('../../assets/imgs/openwenjian.svg'),iconClose:require('../../assets/imgs/icon_wenjian2.svg'),
            children: [
              { name:"1002439 伙食费",
                iconOpen:require('../../assets/imgs/openwenjian.svg'),iconClose:require('../../assets/imgs/icon_wenjian2.svg'),
                children: [
                  { name:"1002434 出差费",icon:require('../../assets/imgs/icon_wenjian3.svg')},
                  { name:"1002434 出差费",icon:require('../../assets/imgs/icon_wenjian3.svg')},
                  { name:"1002434 出差费",icon:require('../../assets/imgs/icon_wenjian3.svg')},
                  { name:"1002434 出差费",icon:require('../../assets/imgs/icon_wenjian3.svg')}
                ]
              }
            ]
          },
          { name:"10023 银行存款", isParent:false,icon:require('../../assets/imgs/icon_wenjian1.svg')}
        ],
        setting : {},
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
      // async accountList(){
      //   try {
      //     let params = unilt.baseEncode({
      //       "accountingPeriod": "201807-201809",
      //       "subjectId": "1",
      //       "accountId": "1",
      //       "pageNum": "1",
      //       "pageSize": "3"
      //     },urls.digestList)
      //     let res = await this.$api.unsplash.baseInterface(params)
      //     if(res.data && res.data.content){
      //       let _resData = unilt.baseDecode(res.data.content)//解密
      //       this.digestData = _resData.map(function(item) {
      //         return {id: item.summaryId, value: item.summaryContent}
      //       });
      //     }
      //   }catch (e) {
      //     console.log(e)
      //   }
      // }
    },
    mounted(){
      $.fn.zTree.init($("#treeAccount"), this.setting, this.zNodes);
      fuzzySearch('treeAccount','#searchKey',null,true); //初始化模糊搜索方法
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/table_2";
  .public-container2 .sliderExpand{
    height: 614px;
  }
</style>
<style lang="scss">
  @import '../../assets/css/zTreeStyle.css';
  @import "../../assets/css/table_2_1";
  @import "../../assets/css/variable.scss";
  #numDetail {
    .el-table td:first-child{
      border-right: 1px solid $border-color;
    }
  }

  .XXX{
    .el-form-item__label{
      width: 138px !important;
    }
    .el-form-item__content{
      margin-left: 138px !important;
    }
  }

</style>
