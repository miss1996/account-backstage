<template>
  <div id="balanceReport" class="public-container2">
    <el-row class="Rtitle">
      <el-col :span="12">
        数量金额总账
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
          <th class="icon-td" rowspan="2"></th>
          <th class="icon-r" colspan="1" rowspan="2">科目编码</th>
          <th colspan="1" rowspan="2">科目名称</th>
          <th colspan="1" rowspan="2" style="width: 65px;">单位</th>
          <th colspan="4" rowspan="1">期初余额</th>
          <th colspan="2" rowspan="1">本期借方</th>
          <th colspan="2" rowspan="1">本期贷方</th>
          <th colspan="2" rowspan="1">本年累计借方</th>
          <th colspan="2" rowspan="1">本年累计贷方</th>
          <th colspan="4" rowspan="1">期末余额</th>
        </tr>
        <tr>
          <th>方向</th>
          <th>数量</th>
          <th>单价</th>
          <th>金额</th>
          <th>数量</th>
          <th>金额</th>
          <th>数量</th>
          <th>金额</th>
          <th>数量</th>
          <th>金额</th>
          <th>数量</th>
          <th>金额</th>
          <th>方向</th>
          <th>数量</th>
          <th>单价</th>
          <th>金额</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in tableData5" :key="index" v-show="item.expand" @mouseenter="mouseEnter(index)" @click="rowClick(index)">
          <td class="icon-td" @click="expendTd(item)" :class="{'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}">
            <div v-if="index !== 6">
              <i class="el-icon-caret-right" v-if="item.node && !item.clicked"></i>
              <i class="el-icon-caret-bottom" v-if="item.node && item.clicked"></i>
            </div>
          </td>
          <td class="icon-r" :class="{pl15:item.parent, 'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}">{{item.code}}</td>
          <td :class="{pl15:item.parent, 'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}" class="align_left">{{item.name}}</td>
          <td style="text-align: center" :class="{'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}">{{item.unit}}</td>
          <td style="text-align: center" :class="{'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}">{{item.cq_direction}}</td>
          <td class="align_right" :class="{'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}">{{item.cq_number}}</td>
          <td class="align_right" :class="{'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}">{{item.cq_unitPrice}}</td>
          <td class="align_right" :class="{'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}">{{item.cq_price}}</td>
          <td class="align_right" :class="{'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}">{{item.jf_number}}</td>
          <td class="align_right" :class="{'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}">{{item.jf_price}}</td>
          <td class="align_right" :class="{'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}">{{item.df_number}}</td>
          <td class="align_right" :class="{'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}">{{item.df_price}}</td>
          <td class="align_right" :class="{'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}">{{item.jf_total_number}}</td>
          <td class="align_right" :class="{'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}">{{item.jf_total_price}}</td>
          <td class="align_right" :class="{'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}">{{item.df_total_number}}</td>
          <td class="align_right" :class="{'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}">{{item.df_total_price}}</td>
          <td style="text-align: center" :class="{'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}">{{item.qm_direction}}</td>
          <td class="align_right" :class="{'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}">{{item.qm_number}}</td>
          <td class="align_right" :class="{'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}">{{item.qm_unitPrice}}</td>
          <td class="align_right" :class="{'hover-bg': index == currentHoverRow, 'click-bg': index == currentClickRow}">{{item.qm_price}}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage2"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="100">
    </el-pagination>
  </div>
</template>

<script>

  import { mapState, } from 'vuex'
  import NumFormatter from '../../assets/js/NumFormatter.js'
  import closeBtn from '../closeTab'
  import tabSize from  '../../assets/js/tabSize'
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
        radio2:1,
        tableData5: [{
          code: '1001',
          name: '库存现金',
          unit:'个',
          cq_direction:'借',
          cq_number:'111',
          cq_unitPrice:'20',
          cq_price:'387538.00',
          jf_number:'234',
          jf_price:'2363455.00',
          df_number:'23434',
          df_price:'2434',
          jf_total_number:'8397439',
          jf_total_price:'34543',
          df_total_number:'2344',
          df_total_price:'4532',
          qm_direction:'借',
          qm_number:'23433',
          qm_unitPrice:'43433',
          qm_price:'34567',
          expand:true,
          node:'one',
          clicked:false,
        },{
          expand:false,
          parent:'one',
          code: '1001-1',
          unit:'个',
          cq_direction:'借',
          cq_number:'111',
          cq_unitPrice:'20',
          cq_price:'387538.00',
          jf_number:'234',
          jf_price:'2363455.00',
          df_number:'23434',
          df_price:'2434',
          jf_total_number:'8397439',
          jf_total_price:'34543',
          df_total_number:'2344',
          df_total_price:'4532',
          qm_direction:'借',
          qm_number:'23433',
          qm_unitPrice:'43433',
          qm_price:'34567',
          fcm_df_money: '',
        },{
          expand:false,
          parent:'one',
          code: '1001-2',
          unit:'个',
          cq_direction:'借',
          cq_number:'111',
          cq_unitPrice:'20',
          cq_price:'387538.00',
          jf_number:'234',
          jf_price:'2363455.00',
          df_number:'23434',
          df_price:'2434',
          jf_total_number:'8397439',
          jf_total_price:'34543',
          df_total_number:'2344',
          df_total_price:'4532',
          qm_direction:'借',
          qm_number:'23433',
          qm_unitPrice:'43433',
          qm_price:'34567',
        },{
          code: '1002',
          name: '库存现金',
          unit:'个',
          unit:'个',
          cq_direction:'借',
          cq_number:'111',
          cq_unitPrice:'20',
          cq_price:'387538.00',
          jf_number:'234',
          jf_price:'2363455.00',
          df_number:'23434',
          df_price:'2434',
          jf_total_number:'8397439',
          jf_total_price:'34543',
          df_total_number:'2344',
          df_total_price:'4532',
          qm_direction:'借',
          qm_number:'23433',
          qm_unitPrice:'43433',
          qm_price:'34567',
          expand:true,
          node:'two'
        },{
          expand:false,
          parent:'two',
          code: '1002-1',
          unit:'个',
          cq_direction:'借',
          cq_number:'111',
          cq_unitPrice:'20',
          cq_price:'387538.00',
          jf_number:'234',
          jf_price:'2363455.00',
          df_number:'23434',
          df_price:'2434',
          jf_total_number:'8397439',
          jf_total_price:'34543',
          df_total_number:'2344',
          df_total_price:'4532',
          qm_direction:'借',
          qm_number:'23433',
          qm_unitPrice:'43433',
          qm_price:'34567',
        },{
          expand:false,
          parent:'two',
          code: '1002-2',
          unit:'个',
          cq_direction:'借',
          cq_number:'111',
          cq_unitPrice:'20',
          cq_price:'387538.00',
          jf_number:'234',
          jf_price:'2363455.00',
          df_number:'23434',
          df_price:'2434',
          jf_total_number:'8397439',
          jf_total_price:'34543',
          df_total_number:'2344',
          df_total_price:'4532',
          qm_direction:'借',
          qm_number:'23433',
          qm_unitPrice:'43433',
          qm_price:'34567',
        },{
          code: '1003',
          name: '库存现金',
          unit:'个',
          cq_direction:'借',
          cq_number:'111',
          cq_unitPrice:'20',
          cq_price:'387538.00',
          jf_number:'234',
          jf_price:'2363455.00',
          df_number:'23434',
          df_price:'2434',
          jf_total_number:'8397439',
          jf_total_price:'34543',
          df_total_number:'2344',
          df_total_price:'4532',
          qm_direction:'借',
          qm_number:'23433',
          qm_unitPrice:'43433',
          qm_price:'34567',
          expand:true,
          node:'three'
        },{
          code: '1003-1',
          name: '库存现金',
          unit:'个',
          cq_direction:'借',
          cq_number:'111',
          cq_unitPrice:'20',
          cq_price:'387538.00',
          jf_number:'234',
          jf_price:'2363455.00',
          df_number:'23434',
          df_price:'2434',
          jf_total_number:'8397439',
          jf_total_price:'34543',
          df_total_number:'2344',
          df_total_price:'4532',
          qm_direction:'借',
          qm_number:'23433',
          qm_unitPrice:'43433',
          qm_price:'34567',
          expand:false,
          node:'three'
        },{
          code: '1003-2',
          name: '库存现金',
          unit:'个',
          cq_direction:'借',
          cq_number:'111',
          cq_unitPrice:'20',
          cq_price:'387538.00',
          jf_number:'234',
          jf_price:'2363455.00',
          df_number:'23434',
          df_price:'2434',
          jf_total_number:'8397439',
          jf_total_price:'34543',
          df_total_number:'2344',
          df_total_price:'4532',
          qm_direction:'借',
          qm_number:'23433',
          qm_unitPrice:'43433',
          qm_price:'34567',
          expand:false,
          node:'three'
        },{
          code: '1004',
          name: '库存现金',
          unit:'个',
          unit:'个',
          cq_direction:'借',
          cq_number:'111',
          cq_unitPrice:'20',
          cq_price:'387538.00',
          jf_number:'234',
          jf_price:'2363455.00',
          df_number:'23434',
          df_price:'2434',
          jf_total_number:'8397439',
          jf_total_price:'34543',
          df_total_number:'2344',
          df_total_price:'4532',
          qm_direction:'借',
          qm_number:'23433',
          qm_unitPrice:'43433',
          qm_price:'34567',
          expand:true,
          node:'four'
        },{
          expand:false,
          parent:'four',
          code: '1004-1',
          unit:'个',
          cq_direction:'借',
          cq_number:'111',
          cq_unitPrice:'20',
          cq_price:'387538.00',
          jf_number:'234',
          jf_price:'2363455.00',
          df_number:'23434',
          df_price:'2434',
          jf_total_number:'8397439',
          jf_total_price:'34543',
          df_total_number:'2344',
          df_total_price:'4532',
          qm_direction:'借',
          qm_number:'23433',
          qm_unitPrice:'43433',
          qm_price:'34567',
        },{
          expand:false,
          parent:'four',
          code: '1004-2',
          name: '应收票据',
          unit:'个',
          cq_direction:'借',
          cq_number:'111',
          cq_unitPrice:'20',
          cq_price:'387538.00',
          jf_number:'234',
          jf_price:'2363455.00',
          df_number:'23434',
          df_price:'2434',
          jf_total_number:'8397439',
          jf_total_price:'34543',
          df_total_number:'2344',
          df_total_price:'4532',
          qm_direction:'借',
          qm_number:'23433',
          qm_unitPrice:'43433',
          qm_price:'34567',
        },{
          code: '1005',
          name: '库存现金',
          unit:'个',
          cq_direction:'借',
          cq_number:'111',
          cq_unitPrice:'20',
          cq_price:'387538.00',
          jf_number:'234',
          jf_price:'2363455.00',
          df_number:'23434',
          df_price:'2434',
          jf_total_number:'8397439',
          jf_total_price:'34543',
          df_total_number:'2344',
          df_total_price:'4532',
          qm_direction:'借',
          qm_number:'23433',
          qm_unitPrice:'43433',
          qm_price:'34567',
          expand:true,
          node:'five'
        },{
          expand:false,
          parent:'five',
          code: '1005-1',
          unit:'个',
          cq_direction:'借',
          cq_number:'111',
          cq_unitPrice:'20',
          cq_price:'387538.00',
          jf_number:'234',
          jf_price:'2363455.00',
          df_number:'23434',
          df_price:'2434',
          jf_total_number:'8397439',
          jf_total_price:'34543',
          df_total_number:'2344',
          df_total_price:'4532',
          qm_direction:'借',
          qm_number:'23433',
          qm_unitPrice:'43433',
          qm_price:'34567',
        },{
          code: '1006',
          name: '库存现金',
          unit:'个',
          cq_direction:'借',
          cq_number:'111',
          cq_unitPrice:'20',
          cq_price:'387538.00',
          jf_number:'234',
          jf_price:'2363455.00',
          df_number:'23434',
          df_price:'2434',
          jf_total_number:'8397439',
          jf_total_price:'34543',
          df_total_number:'2344',
          df_total_price:'4532',
          qm_direction:'借',
          qm_number:'23433',
          qm_unitPrice:'43433',
          qm_price:'34567',
          expand:true,
          node:'six'
        },{
          expand:false,
          parent:'six',
          code: '1006-1',
          name: '应收票据',
          unit:'个',
          cq_direction:'借',
          cq_number:'111',
          cq_unitPrice:'20',
          cq_price:'387538.00',
          jf_number:'234',
          jf_price:'2363455.00',
          df_number:'23434',
          df_price:'2434',
          jf_total_number:'8397439',
          jf_total_price:'34543',
          df_total_number:'2344',
          df_total_price:'4532',
          qm_direction:'借',
          qm_number:'23433',
          qm_unitPrice:'43433',
          qm_price:'34567',
        },{
          code: '1007',
          name: '库存现金',
          unit:'个',
          cq_direction:'借',
          cq_number:'111',
          cq_unitPrice:'20',
          cq_price:'387538.00',
          jf_number:'234',
          jf_price:'2363455.00',
          df_number:'23434',
          df_price:'2434',
          jf_total_number:'8397439',
          jf_total_price:'34543',
          df_total_number:'2344',
          df_total_price:'4532',
          qm_direction:'借',
          qm_number:'23433',
          qm_unitPrice:'43433',
          qm_price:'34567',
          expand:true,
          node:'seven'
        },{
          expand:false,
          parent:'seven',
          code: '1007-1',
          unit:'个',
          cq_direction:'借',
          cq_number:'111',
          cq_unitPrice:'20',
          cq_price:'387538.00',
          jf_number:'234',
          jf_price:'2363455.00',
          df_number:'23434',
          df_price:'2434',
          jf_total_number:'8397439',
          jf_total_price:'34543',
          df_total_number:'2344',
          df_total_price:'4532',
          qm_direction:'借',
          qm_number:'23433',
          qm_unitPrice:'43433',
          qm_price:'34567',
        },{
          code: '1008',
          name: '库存现金',
          unit:'个',
          cq_direction:'借',
          cq_number:'111',
          cq_unitPrice:'20',
          cq_price:'387538.00',
          jf_number:'234',
          jf_price:'2363455.00',
          df_number:'23434',
          df_price:'2434',
          jf_total_number:'8397439',
          jf_total_price:'34543',
          df_total_number:'2344',
          df_total_price:'4532',
          qm_direction:'借',
          qm_number:'23433',
          qm_unitPrice:'43433',
          qm_price:'34567',
          expand:true,
          node:'eight'
        },{
          expand:false,
          parent:'eight',
          code: '1008-1',
          name: '应收票据',
          unit:'个',
          cq_direction:'借',
          cq_number:'111',
          cq_unitPrice:'20',
          cq_price:'387538.00',
          jf_number:'234',
          jf_price:'2363455.00',
          df_number:'23434',
          df_price:'2434',
          jf_total_number:'8397439',
          jf_total_price:'34543',
          df_total_number:'2344',
          df_total_price:'4532',
          qm_direction:'借',
          qm_number:'23433',
          qm_unitPrice:'43433',
          qm_price:'34567',
        },{
          code: '1009',
          name: '库存现金',
          unit:'个',
          cq_direction:'借',
          cq_number:'111',
          cq_unitPrice:'20',
          cq_price:'387538.00',
          jf_number:'234',
          jf_price:'2363455.00',
          df_number:'23434',
          df_price:'2434',
          jf_total_number:'8397439',
          jf_total_price:'34543',
          df_total_number:'2344',
          df_total_price:'4532',
          qm_direction:'借',
          qm_number:'23433',
          qm_unitPrice:'43433',
          qm_price:'34567',
          expand:true,
          node:'nine'
        },{
          expand:false,
          parent:'nine',
          code: '1009-1',
          unit:'个',
          cq_direction:'借',
          cq_number:'111',
          cq_unitPrice:'20',
          cq_price:'387538.00',
          jf_number:'234',
          jf_price:'2363455.00',
          df_number:'23434',
          df_price:'2434',
          jf_total_number:'8397439',
          jf_total_price:'34543',
          df_total_number:'2344',
          df_total_price:'4532',
          qm_direction:'借',
          qm_number:'23433',
          qm_unitPrice:'43433',
          qm_price:'34567',
        },{
          code: '10010',
          name: '库存现金',
          unit:'个',
          cq_direction:'借',
          cq_number:'111',
          cq_unitPrice:'20',
          cq_price:'387538.00',
          jf_number:'234',
          jf_price:'2363455.00',
          df_number:'23434',
          df_price:'2434',
          jf_total_number:'8397439',
          jf_total_price:'34543',
          df_total_number:'2344',
          df_total_price:'4532',
          qm_direction:'借',
          qm_number:'23433',
          qm_unitPrice:'43433',
          qm_price:'34567',
          expand:true,
          node:'ten'
        },{
          expand:false,
          parent:'ten',
          code: '10010-1',
          name: '应收票据',
          unit:'个',
          cq_direction:'借',
          cq_number:'111',
          cq_unitPrice:'20',
          cq_price:'387538.00',
          jf_number:'234',
          jf_price:'2363455.00',
          df_number:'23434',
          df_price:'2434',
          jf_total_number:'83439',
          jf_total_price:'343',
          df_total_number:'244',
          df_total_price:'432',
          qm_direction:'借',
          qm_number:'2333',
          qm_unitPrice:'43433',
          qm_price:'34567'
        }],
        currentHoverRow: null,
        currentClickRow: null,
      }
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      format(row, column, cellValue, index) {
        return NumFormatter.formatNum(cellValue);
      },
      handleExpendAll(val){
        console.log(val)
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
        let _p = data.node;
        data.clicked = !data.clicked;
        this.tableData5.forEach((item,index) => {
          if(item.parent == _p){
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
      }
    },
    mounted(){
      tabSize.init('resizeTable');
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
  .XXX{
    .el-form-item__label{
      width: 138px !important;
    }
    .el-form-item__content{
      margin-left: 138px !important;
    }
  }
</style>

