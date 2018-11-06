<template>
  <div id="credential">
    <el-row class="btn-box">
      <el-button type="primary" :btnType="`${skin_style}_btn`">保存并新增</el-button>
      <el-button type="primary" :btnType="`${skin_style}_btn`">保存</el-button>
      <el-button type="primary" :btnType="`${skin_style}_btn`" @click="print">打印</el-button>
      <el-dropdown>
        <el-button type="primary" :btnType="`${skin_style}_btn`">更多</el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @commonand="alert('s')">保存为凭证模板</el-dropdown-item>
          <el-dropdown-item>从模板生成凭证</el-dropdown-item>
          <el-dropdown-item>选项</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <closeBtn></closeBtn>
    </el-row>
    <el-row class="Rtitle">
      <el-col :span="11">
        凭证字 <el-select v-model='proofValue'  placeholder="请选择" style="width: 80px" @change='changeText'>
          <el-option
            v-for="item in options"
            :key="item.voucherWordId"
            :label="item.voucherWord"
            :value="item.voucherWordId">
          </el-option>
        </el-select>
        <el-input v-model="input" type="number"  class="input_number" style="width: 70px"></el-input>&nbsp;号&nbsp;&nbsp;&nbsp;
        日期&nbsp;<el-date-picker
            v-model="datePick"
            type="date"
            style="width: 140px"
            placeholder="选择日期">
          </el-date-picker>
      </el-col>
      <el-col :span="7" align="left" class="center_top">
        <h2>记账凭证</h2>
        <span>2018年第6期</span>
      </el-col>
      <el-col :span="6" align="right" class="right_top">
        <div class="showKeyboards" @mouseenter="keyBoard = true" @mouseleave = 'keyBoard = false'>
          <img class="img1" src="../../assets/imgs/ico-shortcut-key.gif" alt="">
          <img class="img2" src="../../assets/imgs/vchKeyBoard.png" v-show="keyBoard === true" alt="">
        </div>
        <div class="prev btn_h"><i class="el-icon-caret-left"></i></div>
        <div class="next btn_h" style="margin-right: 10px"><i class="el-icon-caret-right"></i></div>
        <span>附单据</span>
        <el-input style="width: 60px; vertical-align: top"></el-input>
        <span>张</span>
      </el-col>
    </el-row>
    <table class="record-table" >
      <tr class="tr-th">
        <th style="width: 30px; border: none;"></th>
        <th><span>摘要</span></th>
        <th><span>会计科目</span></th>
        <th v-show="showNum" style="width: 150px"><span>数量</span></th>
        <th v-show="showCoin" style="width: 150px"><span>币别</span></th>
        <th>
          <span>借方金额</span>
          <div class="money_unit"> <span>亿</span> <span>千</span> <span>百</span> <span>十</span> <span>万</span> <span>千</span> <span>百</span> <span>十</span> <span>元</span> <span>角</span> <span class="last">分</span> </div>
        </th>
        <th>
          <span>贷方金额</span>
          <div class="money_unit"> <span>亿</span> <span>千</span> <span>百</span> <span>十</span> <span>万</span> <span>千</span> <span>百</span> <span>十</span> <span>元</span> <span>角</span> <span class="last">分</span> </div>
        </th>
        <th style="width: 30px; border: none;"></th>
      </tr>
      <tr v-for="(item,index) in tableData" :key="index" @mouseenter = 'focusTr(item)' @mouseleave = 'leave(item)'>
        <td style="width: 30px; border: none;">
          <div class="operate" v-show="item.ishover == true">
            <i class="el-icon-circle-plus-outline" @click = "addRow(index)"></i>
            <i class="el-icon-circle-close-outline" @click = "removeRow(index)"></i>
          </div>
        </td>
        <!-- @focus="item.digest.focus = true" -->
        <td @click="handleSetting(item.digest)">
          <el-autocomplete
            class="inline-input complete-input"
            :class="{borderInput:item.digest.focus == true}"
            v-model="item.digest.content"
            :fetch-suggestions="querySearch1"
            @select="handleSelect"
            @focus="subjectFocus(this, item)"
            @input="contentInput(item, index)"
            @blur="item.digest.focus = false"
            select
            style="width: 100%;"
          ></el-autocomplete>
          <label :for="item.digest.content" v-show="item.ishover == true" @click.stop="dialogVisible = true">摘要</label>
        </td>
        <td @click="handleSetting(item.subject)">
          <el-autocomplete
            class="inline-input complete-input"
            :class="{borderInput:item.subject.focus == true}"
            v-model="item.subject.content"
            :fetch-suggestions="querySearch"
            @select="handleSelectSub(item)"
            @focus="item.subject.focus = true"
            @blur="item.subject.focus = false"
            style="width: 100%;"
          ></el-autocomplete>
          <label :for="item.subject.content" v-show="item.ishover == true" @click.stop="showSubject">科目</label>
          <label class="balance" :for="item.subject.content" v-show="item.ishover == true">{{ "余额：" + item.subject.finalBalance }}</label>
        </td>
        <td class="num" v-show="showNum">
          <div v-show="item.num.canEdit">
            <span>数量:</span>
            <el-input v-model="item.num.number" @input="inputNum(item.num.number, index)" @blur="coinChange(item)"></el-input>
          </div>
          <div v-show="item.num.canEdit">
            <span>单价:</span>
            <el-input v-model="item.num.price" @input="inputPrice(item.num.price, index)" @blur="coinChange(item)"></el-input>
          </div>
        </td>
        <td class="coin" v-show="showCoin">
          <div v-show="item.coin.canEdit">
            <el-select v-model="item.coin.selected"
              @change="coinChange(item)">
              <el-option
                v-for="i in item.coin.list"
                :key="i.rate"
                :label="i.name"
                :value="i.rate">
              </el-option>
            </el-select>
            <el-input v-model="item.coin.selected" class='input' :disabled="true"></el-input>
          </div>
          <div v-show="item.coin.canEdit">
            <span>原币:</span>
            <el-input v-model="item.coin.ori" class="input" :disabled="true"></el-input><br/>
          </div>
        </td>
        <td @click="handleSetting(item.debit_m)" >
          <input type="text" v-model="item.debit_m.content" v-if="item.debit_m.focus == true" @blur="mblur(item.debit_m,'debit_m', item.subject)" @focus="mfocus(item.debit_m)" @input="leftPriceInput(item.debit_m, item.credit_m, item.key)" class="m_input" v-autoFocus >
          <div class="contentDiv" :class="{ negativeNum: parseFloat(item.debit_m.realNum) < 0 }" v-else>{{item.debit_m.content}}</div>
        </td>
        <td @click="handleSetting(item.credit_m)">
          <input type="text" v-model="item.credit_m.content" v-if="item.credit_m.focus == true" @blur="mblur(item.credit_m,'credit_m', item.subject)" @focus="mfocus(item.credit_m)" @input="rightPriceInput(item.credit_m, item.debit_m, item.key)" class="m_input" v-autoFocus >
          <div class="contentDiv" :class="{ negativeNum: parseFloat(item.credit_m.realNum) < 0 }" v-else>{{item.credit_m.content}}</div>
        </td>
        <td style="width: 30px; border: none;">
          <div class="operate" v-show="item.ishover == true">
            <i class="el-icon-circle-plus-outline" @click = "addRow(index)"></i>
            <i class="el-icon-circle-close-outline" @click = "removeRow(index)"></i>
          </div>
        </td>
      </tr>
      <tr class="totalTr">
        <td></td>
        <td :colspan="computeSpan">合计：</td>
        <td class="totalJ"><div class="contentDiv" :class="{ negativeNum: parseFloat(totalNum.debit_m) < 0 }">{{ isNaN(totalNum.debit_m) ? "" :  Math.abs(totalNum.debit_m)}}</div></td>
        <td><div class="contentDiv" :class="{ negativeNum: parseFloat(totalNum.credit_m) < 0 }">{{ isNaN(totalNum.credit_m) ? "" : Math.abs(totalNum.credit_m)}}</div></td>
        <td style="width: 30px; border: none;"></td>
      </tr>
    </table>
    <div class="tabelBottom">
      <div style="float:left;">制单人：哈哈</div>
      <div style="float:right;">
        <el-button type="primary" :btnType="`${skin_style}_btn`">保存并新增</el-button>
        <el-button type="primary" :btnType="`${skin_style}_btn`">保存</el-button>
      </div>
    </div>

    <!--摘要-->
    <el-dialog
      title="凭证摘要库"
      :visible.sync="dialogVisible"
      custom-class = 'myDialog'
      width="30%">
      <div class="digestBox">
        <label :for="digestText">摘要内容：</label>
        <el-input type="textarea" :rows="2"  placeholder="请输入摘要内容" v-model="digestText"></el-input>
        <div class="btnbox">
          <el-button size="small" @click="saveDigest">保存</el-button>
          <el-button size="small" @click="dialogVisible = false">取消</el-button>
        </div>
        <el-table
          :data="digestData"
          border
          stripe
          style="width: 100%; margin-top: 16px; margin-bottom: 15px">
          <el-table-column
            label="操作"
            width="180">
            <template slot-scope="scope">
              <i class="el-icon-edit"  @click="handleDigest(scope.row,'edit')"></i>&nbsp;&nbsp;&nbsp;
              <i class="el-icon-close" @click="handleDigest(scope.row,'del')"></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="value"
            label="摘要内容">
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>

    <!--科目-->
    <div class="mydialog_modal" style="z-index: 20051;" v-show="subjectVisible" >
      <div class="myDialog subjectVisible">
        <div class="el-dialog__header">
          <span class="el-dialog__title">选择科目</span>
          <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click="subjectVisible = false"><i class="el-dialog__close el-icon el-icon-close"></i></button>
        </div>
        <div class="el-dialog__body">
          <el-tabs v-model="activeName"  type="border-card" @tab-click="handleClick" class="elTabs">
            <el-tab-pane :label="item.name" :name="item.subjectTypeId" v-for="(item,index) in subjectType" :key="index"></el-tab-pane>
            <div class="zTreeDemoBackground">
              <ul id="treeAccount" class="ztree"></ul>
            </div>

          </el-tabs>
        </div>
        <div slot="footer" class="el-dialog__footer">
          <div class="dialog-footer">
            <span class="btn" :style="{background:skin_color}">确定</span>
            <span class="btn" @click="subjectVisible = false">取消</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapState, } from 'vuex'
  import '../../assets/js/jquery.ztree.core'
  import closeBtn from '../closeTab'
  import unilt from '../../api/baseUtility'
  import urls from '../../api/unsplash/url'

    export default {
      directives:{
        // 自定义指令的名字
        autoFocus:{
          // 钩子函数，被绑定元素插入父节点时调用 (父节点存在即可调用，不必存在于 document 中)。
          inserted(el){
            el.focus();
            if(el.tagName.toLocaleLowerCase() !== 'input'){
              el.getElementsByTagName('input')[0].focus();
            }
          },
          // 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
          bind(){},
          // 所在组件的 VNode 更新时调用，但是可能发生在其孩子的 VNode 更新之前。
          // 指令的值可能发生了改变也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
          update(){},
          // 所在组件的 VNode 及其孩子的 VNode 全部更新时调用。
          componentUpdated(){},
          // 只调用一次，指令与元素解绑时调用。
          unbind(){}
        }
      },
      components:{
        closeBtn
      },
        data() {
          return {
            subjectType:[],
            totalNum:{},
            options:[],
            keyBoard:false,
            activeName:'1',//资产
            digestData: [],
            digestText:'',
            digestId:'',//编辑中间量
            dialogVisible:false,
            subjectVisible:false,
            proofValue:'',
            input:'',
            datePick:'',
            tableData: [{
              key:'1',
              direction: '1', // 方向 0 借 1 贷
              ishover:false,
              digest: {
                content:'',
                focus:false
              },
              subject: {
                content:'',
                focus:false,
                balance: '-100',
                finalBalance: '-100'
              },
              num: {
                canEdit: false,
                focus: false,
                number: '1',
                price: ''
              },
              coin: {
                canEdit: false,
                focus: false,
                list: [
                  { name: 'RMB', rate: 1 },
                  { name: 'USD', rate: 6.66 },
                ],
                selected: 1,
                ori: '',
              },
              debit_m: {
                content:'',
                realNum:'',
                focus:false
              },
              credit_m: {
                content:'',
                realNum:'',
                focus:false
              }
            },{
              key:'2',
              direction: '1', // 方向 0 借 1 贷
              ishover:false,
              digest: {
                content:'',
                focus:false
              },
              subject: {
                content:'',
                focus:false,
                balance: '-100',
                finalBalance: '-100'
              },
              num: {
                canEdit: false,
                focus: false,
                number: '',
                price: ''
              },
              coin: {
                canEdit: false,
                focus: false,
                list: [
                  { name: 'RMB', rate: 1 },
                  { name: 'USD', rate: 6.66 },
                ],
                selected: 1,
                ori: '',
              },
              debit_m: {
                content:'',
                realNum:'',
                focus:false
              },
              credit_m: {
                content:'',
                realNum:'',
                focus:false
              }
            },{
              key:'3',
              direction: '0', // 方向 0 借 1 贷
              ishover:false,
              digest: {
                content:'',
                focus:false
              },
              subject: {
                content:'',
                focus:false,
                balance: '-100',
                finalBalance: '-100'
              },
              num: {
                canEdit: false,
                focus: false,
                number: '',
                price: ''
              },
              coin: {
                canEdit: false,
                focus: false,
                list: [
                  { name: 'RMB', rate: 1 },
                  { name: 'USD', rate: 6.66 },
                ],
                selected: 1,
                ori: '',
              },
              debit_m: {
                content:'',
                realNum:'',
                focus:false
              },
              credit_m: {
                content:'',
                realNum:'',
                focus:false
              }
            }],
            restaurants: [],
            zNodes:[],
            setting : {
              data: {
                simpleData: {
                  enable: true
                }
              },
              callback: {
                onClick: this.treeRowClick
              }
            },
            keyCode: null,
          }
        },
      watch:{
        proofWordsArray:function(){
          if(this.proofWordsArray.length!=0){
            let defaultProof=this.proofWordsArray.filter(function(item){
            return item.isDefault==1
          })
          this.proofValue=this.proofWordsArray[0].voucherWordId
          this.options=this.proofWordsArray
          }
          this._voucherNum()
          //console.log(this.proofWordsArray)
        }
      },
      computed:{
        ...mapState([
          'skin_style',
          'skin_color',
          'proofWordsArray'
          //'accountSubject'
        ]),
        showNum() {
          let canEdit = false;
          for (let i = 0; i < this.tableData.length; i++) {
            if(this.tableData[i].num.canEdit) {
              canEdit = true;
            }
          }
          return canEdit;
        },
        showCoin() {
          let canEdit = false;
          for (let i = 0; i < this.tableData.length; i++) {
            if(this.tableData[i].coin.canEdit) {
              canEdit = true;
            }
          }
          return canEdit;
        },
        computeSpan() {
          let cols = 2;
          if (this.showNum) {
            cols ++;
          }
          if (this.showCoin) {
            cols ++;
          }
          return cols;
        },
      },
      methods: {
        //切换凭证字
        changeText(){
          this._voucherNum()
        },
        showSubject(){
          this.subjectVisible = true;
          //console.log(this.subjectType)
          this._subjectList()
        },
        handleClick(tab, event) {
          this._subjectList()
        },
        subjectFocus(v, item) {
          item.digest.focus = true
        },
        handleDigest(data,operate){
          if(operate === 'edit'){ // 编辑
           this.digestId = data.id;
           this.digestText = data.value;
          }else{ // 删除
            this.deleteDigest({
              "accountId":"1",
              "summaryId":data.id
            });
          }
        },
        inputNum(num, index) {
          this.$nextTick(() => {
            // num = this.handleString2Int(num);
            this.tableData[index].num.number = this.handleString2Int(num);
          })
        },
        inputPrice(price, index) {
          this.$nextTick(() => {
            // num = this.handleString2Int(num);
            this.tableData[index].num.price = this.handleString(price);
          })
        },
        spaceLis() {
          console.log("space");
        },
        saveDigest(){
          if(this.digestText === ''){
            this.$message.error('请输入摘要内容');
          }else{
            if(this.digestId !== ''){ // 编辑
              this.editDigest({
                "accountId": "1",
                "summaryId": this.digestId,
                "summaryContent": this.digestText
              });
              this.digestId = '';
            }else{ // 新增
              this.insertDigest();
            }
            this.digestText = '';
          }
        },
        addRow(idx) {
          this.tableData[idx].ishover=false
          this.tableData[idx].digest.focus=false
          this.tableData[idx].subject.focus=false
          this.tableData[idx].debit_m.focus=false
          this.tableData[idx].credit_m.focus=false
          let item = {
            key: '',
            ishover: true,
            direction: '', // 方向 0 借 1 贷
            digest: {
              content: '',
              focus: false
            },
            subject: {
              content: '',
              focus: false,
              balance: '',
              finalBalance: ''
            },
            num: {
                canEdit: false,
                focus: false,
                number: '',
                price: ''
              },
              coin: {
                canEdit: false,
                focus: false,
                list: [],
                selected: '',
                rage: '',
                ori: '',
              },
            debit_m: {
              content: '',
              realNum:'',
              focus: false
            },
            credit_m: {
              content: '',
              realNum:'',
              focus: false
            }
          }
          this.tableData.splice(idx, 0, item)
        },
        removeRow(idx) {
          this.tableData.splice(idx, 1)
        },
        focusTr(item) {
          item.ishover = true;
        },
        leftPriceInput(item, next, key) {
          // 借贷只能输入一个
          next.content = '';
          next.realNum = '';
          // 包含空格 互换内容
          if (item.content.indexOf(' ') != -1) {
            item.content.replace(" ", "");
            item.focus = false;
            next.content = item.content;
            next.realNum = item.realNum;
            item.content = '';
            item.realNum = '';
            next.focus = true;
          }
          // 自动平衡
          if (item.content.indexOf('=') != -1) {
            item.content.replace("=", "");
            item.content = -parseFloat(this.sum(key)) + "";
          }
          item.content = this.handleString(item.content);
          if (parseFloat(item.content) > 999999999.99) {
            item.content = 999999999.99;
          }
          item.realNum = item.content;
        },
        rightPriceInput(item, pro, key) {
          // 借贷只能输入一个
          pro.content = '';
          pro.realNum = '';
          // 包含空格 互换内容
          if (item.content.indexOf(' ') != -1) {
            item.content.replace(" ", "");
            item.focus = false;
            pro.content = item.content;
            pro.realNum = item.realNum;
            item.content = '';
            item.realNum = '';
            pro.focus = true;
          }
          // 自动平衡
          if (item.content.indexOf('=') != -1) {
            item.content.replace("=", "");
            item.content = this.sum(key);
          }
          item.content = this.handleString(item.content);
          if (parseFloat(item.content) > 999999999.99) {
            item.content = 999999999.99;
          }
          item.realNum = item.content;
        },
        sum(key) {
          let sum = 0;
          for (let i = 0; i < this.tableData.length; i++) {
            if(this.tableData[i].debit_m.realNum && this.tableData[i].key != key) {
              sum += parseFloat(this.tableData[i].debit_m.realNum);
            }
            if (this.tableData[i].credit_m.realNum && this.tableData[i].key != key) {
              sum -= parseFloat(this.tableData[i].credit_m.realNum);
            }
          }
          return sum.toFixed(2) + "";
        },
        // 去除字符串中的非数字(不包括小数点和复数)
        handleString(s) {
          return s.replace(/[^\d.-]/ig,"");
        },
        // 去除字符串中的非数字
        handleString2Int(s) {
          return s.replace(/[^\d]/ig,"");
        },
        // 对结尾小数的处理
        handleDecimal(str) {
          if (str) {
            if(str.indexOf(".") == -1) {
              return str + "00";
            } else if(str.indexOf(".") == str.length - 1) {
                return str.replace(".", "") + "00";
            } else if(str.indexOf(".") == str.length - 2) {
                return str.replace(".", "") + "0";
            } else {
                return str.replace(".", "");
            }
          }
        },
        contentInput(item, index) {
          // 复制第一条分录摘要
          if (item.digest.content == '//') {
            item.digest.content = this.tableData[0].digest.content;
          }
          // 复制上一条分录摘要
          else if (item.digest.content == '..') {
            item.digest.content = this.tableData[index-1].digest.content;
          }
        },
        leave(item) {
          item.ishover = false;
        },
        handleSetting(data) {
          data.focus = true;
        },
        mfocus(data){
          data.content = data.realNum;
        },
        mblur(blur,type, subject) {
          blur.content = this.handleDecimal(blur.content);
          if (blur.content) {
            blur.content = blur.content.replace("-", "");
          }
          if (parseFloat(blur.content) == 0) {
            blur.content = '';
          }
          blur.focus = false;
          this.getTotal(type)
          // 计算项目中的余额
          if (type == "debit_m" && blur.realNum) {
            subject.finalBalance = (parseFloat(subject.balance) + parseFloat(blur.realNum)).toFixed(2) + ""
          } else if(type == "credit_m" && blur.realNum) {
            subject.finalBalance = (parseFloat(subject.balance) - parseFloat(blur.realNum)).toFixed(2) + ""
          }
        },
        querySearch1(queryString, cb) {
          let restaurants = this.digestData;
          let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
          // 调用 callback 返回建议列表的数据
          cb(results);
        },
        querySearch(queryString, cb) {
          let restaurants = this.restaurants;
          let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
          // 调用 callback 返回建议列表的数据
          cb(results);
        },
        createFilter(queryString) {
          return (restaurant) => {
            return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
          };
        },
        loadAll() {
          return [
            { "value": "1001 库存现金" },
            { "value": "1002 银行存款" },
            { "value": "1012 其他货币资金" },
          ];
        },
        coinChange(item) {
          this.computedPrice(item);
        },
        // 更新借方或贷方的金额
        computedPrice(item) {
          var total = parseFloat(item.num.price) * parseInt(item.num.number);
          if (item.num.number && item.num.price) {
            if (item.coin.selected) {
              item.coin.ori = total;
              total *= item.coin.selected;
            }
            var totalStr = total.toFixed(2) + "";
            if(item.direction == 0) { // 借
              item.debit_m.content = this.handleDecimal(totalStr);
              item.debit_m.realNum = totalStr;
            } else if (item.direction == 1) { // 贷
              item.credit_m.content = this.handleDecimal(totalStr);
              item.credit_m.realNum = totalStr;
            }
          }
        },
        handleSelect() {
        },
        handleSelectSub(item) {
          if (item.subject.content == '1001 库存现金') {
            item.num = {
                canEdit: true,
                focus: false,
                number: '1',
                price: ''
              };
            item.coin = {
                canEdit: true,
                focus: false,
                list: [
                  { name: 'RMB', rate: 1 },
                  { name: 'USD', rate: 6.66 },
                ],
                selected: 1,
                ori: '',
              };
          } else {
            item.num = {
                canEdit: false,
                focus: false,
                number: '1',
                price: ''
              };
            item.coin = {
                canEdit: false,
                focus: false,
                list: [
                  { name: 'RMB', rate: 1 },
                  { name: 'USD', rate: 6.66 },
                ],
                selected: 1,
                ori: '',
              };
          }
        },
        getTotal(type){
          let total=0;
          this.tableData.forEach(function (item,index) {
            if(!item[type].realNum==''){
              total+=parseFloat(item[type].realNum)
            }
          })
          let temp = this.handleDecimal(total.toFixed(2) + "")
          if (parseFloat(temp) == 0 || isNaN(temp)) {
            temp = '';
          }
          this.totalNum[type] = temp;
        },
        // 回车键焦点切换
        handleEntre() {
          for(let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].digest.focus) {
              this.tableData[i].digest.focus = false;
              this.tableData[i].subject.focus = true;
              return;
            } else if (this.tableData[i].subject.focus) {
              this.tableData[i].subject.focus = false;
              this.tableData[i].debit_m.focus = true;
              return;
            } else if (this.tableData[i].debit_m.focus) {
              this.tableData[i].debit_m.focus = false;
              this.tableData[i].credit_m.focus = true;
              return;
            } else if (this.tableData[i].credit_m.focus && this.tableData[i+1]) {
              this.tableData[i].credit_m.focus = false;
              this.tableData[i+1].digest.focus = true;
              return;
            }
          }
        },
        handleReverseEntre() {
          for(let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].subject.focus) {
              this.tableData[i].subject.focus = false;
              this.tableData[i].digest.focus = true;
              return;
            } else if (this.tableData[i].debit_m.focus) {
              this.tableData[i].debit_m.focus = false;
              this.tableData[i].subject.focus = true;
              return;
            } else if (this.tableData[i].credit_m.focus) {
              this.tableData[i].credit_m.focus = false;
              this.tableData[i].debit_m.focus = true;
              return;
            } else if (this.tableData[i].digest.focus && i != 0) {
              this.tableData[i].digest.focus = false;
              this.tableData[i-1].credit_m.focus = true;
              return;
            }
          }
        },
        // 打印PDF图片
        print() {
          window.open('../../../static/pdf/web/viewer.html')
        },
        //获取摘要列表
        async getDigestList(){
          try {
            let params = unilt.baseEncode({
              "accountId": "1"
            },urls.digestList)
            let res = await this.$api.unsplash.baseInterface(params)
            if(res.data && res.data.content){
              let _resData = unilt.baseDecode(res.data.content)//解密
              this.digestData = _resData.map(function(item) {
                return {id: item.summaryId, value: item.summaryContent}
              });
              this._subjectList();
            }
          }catch (e) {
            console.log(e)
          }
        },
        //新增摘要
        async insertDigest(){
          // this.digestData.push({
          //   id:Date.parse(new Date()),
          //   value:this.digestText
          // })
          try {
            let params = unilt.baseEncode({
              "accountId":"1",
              "summaryContent":this.digestText
            },urls.digestInsert)
            let res = await this.$api.unsplash.baseInterface(params);
            if(res.data && res.data.content){
              let _resData = unilt.baseDecode(res.data.content)//解密
              this.digestData.push({id: _resData.summaryId, value: _resData.summaryContent})
            }
          }catch (e) {
            console.log(e)
          }
        },
        // 编辑摘要
        async editDigest(param){
          try {
            let params = unilt.baseEncode(param,urls.digestUpdate)
            let res = await this.$api.unsplash.baseInterface(params)
            if(res.returnStatus.code == "0000"){
              this.digestData.map(function(item, index) {
                if (item.id === param.summaryId) {
                  item.value = param.summaryContent;
                }
              })
            }
          }catch (e) {
            console.log(e)
          }
        },
        // 删除摘要
        async deleteDigest(param){
          try {
            let params = unilt.baseEncode(param,urls.digestDelete)
            let res = await this.$api.unsplash.baseInterface(params)
            if(res.data && res.data.content){
              let i;
              this.digestData.map(function(item, index) {
                if (item.id === params.summaryId) {
                  i = index;
                }
              })
              this.digestData.splice(i, 1);
            }
          }catch (e) {
            console.log(e)
          }
        },
        //科目分类
        async _subjectTypeList(param){
          try {
            let params = unilt.baseEncode('1',urls.subjectTypeList)
            let res = await this.$api.unsplash.baseInterface(params);
            //console.log(res)
            if(res.data && res.data.content){
              let _resData = unilt.baseDecode(res.data.content)//解密
              if(_resData && _resData.length > 0){
                this.subjectType=_resData
              }
            }
          }catch (e) {
            console.log(e)
          }
        },
        //科目列表
        async _subjectList(){
          this.zNodes=[]
          let params;
          if(this.subjectVisible){
            params = unilt.baseEncode({
              "accountId": "1",
              "subjectTypeId": this.activeName
            },urls.subjectList)
          }else{
            params = unilt.baseEncode({
              "accountId": "1",
            },urls.subjectList)
          }
          try {
            let res = await this.$api.unsplash.baseInterface(params);
            if(res.data && res.data.content){
              let _resData = unilt.baseDecode(res.data.content)//解密
              if(_resData && _resData.length > 0){
                //console.log(_resData)
                //按上下级顺序排序
                var compare = function (obj1, obj2) {
                  var val1 = obj1.subjectCode;
                  var val2 = obj2.subjectCode;
                  if (val1 < val2) {
                      return -1;
                  } else if (val1 > val2) {
                      return 1;
                  } else {
                      return 0;
                  }            
                } 
                //列表展示
                this.restaurants=_resData.sort(compare).map(function(item) {
                  return {value: item.subjectCode+' '+item.subjectName}
                });
                //树形结构
                for (let i = 0; i < _resData.length; i++) {
                  let _data = _resData[i];
                  let _innerData = {
                    id:_data.subjectId,
                    pId:_data.parentId,
                    name:_data.subjectCode+' '+_data.subjectName,
                    open:false,
                  }
                  if(_data.isParent === true){
                    _innerData.iconOpen = require('../../assets/imgs/openwenjian.svg');
                    _innerData.iconClose = require('../../assets/imgs/icon_wenjian2.svg')
                  }else{
                    _innerData.icon = require('../../assets/imgs/icon_wenjian3.svg')
                  }
                  this.zNodes.push(_innerData)
                }
                
                $.fn.zTree.init($("#treeAccount"), this.setting, this.zNodes);
              }
            }
            this._subjectTypeList(); 
          }catch (e) {
            console.log(e)
          }
        },
        //生成凭证号
        async _voucherNum(){
          console.log(this.proofValue+'sss')
          try {
            let params = unilt.baseEncode({
              accountId: "1",
              voucherWordId: this.proofValue,
              period: ""
            },urls.voucherNum)
            let res = await this.$api.unsplash.baseInterface(params);
            console.log(res)
            if(res.data && res.data.content){
              let _resData = unilt.baseDecode(res.data.content)//解密
              console.log(_resData)
              this.input=_resData
            }
          }catch (e) {
            console.log(e)
          }
          this.getDigestList();
        },
      },
      mounted() {
        //this.restaurants = this.loadAll();
        //this.proofWordsList()
        //获取摘要列表
        //this.getDigestList();
        //this._voucherNum()
        document.onkeydown=(event)=> {
          // F12
          if(event.keyCode === 123) {
            event.preventDefault();
            console.log('F12');
          }
          // Ctrl + S
          else if (event.keyCode === 83 && event.ctrlKey) {
            event.preventDefault();
            console.log('Ctrl + S');
          }
          // ++
          else if (event.keyCode === 107 && this.keyCode === 107) {
            if (this.keyCode == 107) {
              console.log('++');
              this.keyCode = null;
            } else {
              this.keyCode = event.keyCode;
            }
          }
          else if (event.keyCode === 13 && event.shiftKey) {
            this.handleReverseEntre();
          }
          // Shift + tab
          else if (event.keyCode === 9 && event.shiftKey) {
            event.preventDefault();
            this.handleReverseEntre();
          }
          // Ctrl + Tab
          // else if (event.keyCode === 9 && event.ctrlKey) {
          //   event.preventDefault();
          //   console.log('Ctrl + Tab');
          // }
          // Enter
          else if(event.keyCode === 13 && !event.ctrlKey && !event.shiftKey) {
            this.handleEntre();
          }
        };
      },
    }
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  #credential{
    background-color: white;
    margin: 10px 25px;
    min-height: 300px;
    padding: 20px 25px 25px;
    .mydialog_modal{
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.5);
    }
    .subjectVisible{
      width: 573px;
      position: relative;
      margin: 15vh auto 50px;
      background: #fff;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    .showKeyboards{
      display: inline-block;
      margin-right: 15px;
      position: relative;
      &:hover{
        cursor: pointer;
      }
      .img2{
        position: absolute;
        top: 18px;
        right: -3px;
        width: auto;
        height: auto;
        z-index: 999;
      }
    }
    .btn-box{
      text-align: right;
      margin-bottom: 20px;
      .el-button{
        background-color: #30A9BB;
        border-color: #30A9BB;
      }
    }
    .tabelBottom{
      margin:20px 30px 0;
      overflow:hidden;
    }
    .center_top{
      margin-top: -12px;
      h2{
        display: inline-block;
        font-size: 36px;
        margin-right: 10px;
      }
    }
    .right_top{
      .btn_h{
        cursor: pointer;
        display: inline-block;
        margin-right: 6px;
        border: 1px solid #d8dce5;
        height: 40px;
        line-height: 40px;
        padding: 0 5px;
        @include box-sizing;
        i{
          font-size: 26px;
          color: #989898;
          margin-top: 6px;
        }
      }
      >span{
        display: inline-block;
        vertical-align: top;
        line-height: 40px;
      }

    }

    .record-table{
      table-layout:fixed;
      border-collapse: collapse;
      margin-top: 25px;
      width: 100%;
      th,td{
        border: 1px solid #ccc;
        position: relative;
        &:nth-child(2){
          width: 25%;
        }
        &:nth-last-child(2),&:nth-last-child(3){
          width: 270.6px;
        }
      }
      td{
        .contentDiv{
          padding-left: 10px;
        }
        .negativeNum {
          color: red;
        }
        .balance {
          position: absolute;
          left: 10px;
          width: 100%;
          line-height: 148px;
          height: 30px;
          bottom: 0;
        }
        >label{
          position: absolute;
          top: 0;
          right: 0px;
          width: 35px;
          height: 85px;
          line-height: 85px;
          z-index: 99;
          font-size: $small_size;
          color: #aaa;
          cursor: pointer;
        }
        .operate{
          text-align: center;
          i{
            display: block;
            margin-bottom: 10px;
            cursor: pointer;
          }
        }
        .m_input{
          width: 100%;
          height: 80px;
          line-height: 80px;
          border: none;
          padding: 10px;
          &:focus{
            border: 1px solid #3CBAFF
          }
        }
        &:nth-last-child(2),&:nth-last-child(3),&.totalJ{
          background-image: url("../../assets/imgs/money_rp.png");
          background-size: 100% 100%;
          background-repeat: repeat-y;
          text-align: right;
          overflow: hidden;
          div{
            letter-spacing: 14.7px;
            font-weight: bold;
            margin-right: -8px;
            height: 84px;
            line-height: 84px;
          }
          .m_input{
            margin-right: 0;
            margin-left: -8px;
          }
        }
      }
      th{
        text-align: center;
        height: 67px;
        >span{
          font-size: $middle_size;
        }
        &:nth-last-child(2),&:nth-last-child(3){
          >span{
            font-size: $larger_size;
          }
          .money_unit{
            background-image: url("../../assets/imgs/money_rp.png");
            background-size: 100% 100%;
            background-repeat: repeat-y;
            width: 100%;
            height: 23px;
            font-size: $small_size;
            font-weight: normal;
            overflow: hidden;
            margin-bottom: -10px;
            border-top: 1px solid #eaeaea;
            margin-top: 3px;
            span{
              float: left;
              text-align: center;
              width: 24.5px;
            }
          }
        }
      }
      td{
        font-size: $normal_size;
      }
      .totalTr{
        height: 80px;
        td:first-child{
          width: 30px; border: none;
        }
        td:nth-child(2){
          padding-left:10px;
        }
      }
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    input[type="number"]{
      -moz-appearance: textfield;
    }

    .digestBox{
      label{
        display: block;
        padding-bottom: 6px;
        font-size: $normal_size;
      }
      .btnbox{
        text-align: right;
        padding: 10px 0;
      }
    }

    .elTabs{
      width: 100%;
    }

  }
</style>
<style lang="scss">
  @import '../../assets/css/zTreeStyle.css';
  .complete-input{
    .el-input__inner{
      height: 80px;
      line-height: 80px;
      padding:0 10px !important;
      border: none;
      &:hover{
        border: none !important;
      }
    }
  }

  .complete-input.borderInput{
    .el-input__inner{
      border: 1px solid #3CBAFF !important;
    }
  }

  #credential{
    .el-input__inner{
       padding-left:10px;
       padding-right:25px;
    }
    .el-date-editor{
      .el-input__inner{
        padding-left:25px;
        padding-right:35px;
      }
    }
    .input_number{
      .el-input__inner{
        padding-right:0;
      }
    }
    .el-dialog__body {
      padding: 30px 68px 30px 50px;
    }
    .digestBox{
      .el-table th{
        height: 45px;
        line-height: 45px;
        font-size: 16px;
      }
      .el-table td:last-child{
        .cell{
          font-size: 16px;
          text-align: left;
        }
      }
      .el-table .cell{
        padding: 8px !important;
        i{
          cursor: pointer;
        }
      }
    }
    .num {
      width: 150px;
      >div {
        margin-left: 5px;
        .el-input {
          width: 80px;
        }
        .el-input__inner {
          border: 0;
          border-bottom: 1px solid #dcdfe6;
          border-radius: 0;
          height: 30px;
          padding: 0;
        }
        .el-input__inner:hover {
          border: 0 !important;
          border-bottom: 1px solid #3CBAFF !important;
          border-radius: 0;
        }
      }
    }
    .coin {
      width: 150px;
      .el-select {
        width: 60px;
      }
      >div {
        margin-left: 5px;
        .input.el-input {
          width: 50px;
        }
        .el-input__inner {
          height: 30px;
          padding: 0;
        }
        .input {
          .el-input__inner {
            border: 0;
            border-bottom: 1px solid #dcdfe6;
            border-radius: 0;
          }
          .el-input__inner:hover {
            border: 0 !important;
            border-bottom: 1px solid #3CBAFF !important;
            border-radius: 0;
          }
        }
      }
    }
  }
</style>

