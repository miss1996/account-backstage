<template>
  <div id="checkCredent" class="public-container">
    <el-row class="Rtitle">
      <el-col :span="12">查凭证
        <el-popover
        placement="bottom-start"
        width="470"
        v-model="poverVisible"
        popper-class="searchCondition"
        trigger="click">
          <el-form ref="checkform" :model="checkform" label-position="left" size="small" label-width="85px">
            <el-form-item label="会计时间:">
              <el-col :span="9">
                <el-select placeholder="请选择期间" v-model="checkform.date1" style="width: 100%">
                  <el-option label="1" value="1"></el-option>
                </el-select>
              </el-col>
              <el-col class="line" :span="2" align="center">至</el-col>
              <el-col :span="9">
                <el-select placeholder="请选择期间" v-model="checkform.date2" style="width: 100%">
                  <el-option label="1" value="1"></el-option>
                </el-select>
              </el-col>
              <el-col :span="4" style="text-align: center; font-size: 20px; cursor: pointer"><i class="el-icon-time"></i></el-col>
            </el-form-item>
            <el-collapse-transition>
              <div v-show="showForm">
                <el-form-item label="凭证字:">
                  <el-col :span="20">
                    <el-select placeholder="请选择凭证字" style="width: 100%" v-model="checkform.name">
                      <el-option label="不限" value="不限"></el-option>
                      <el-option label="区域二" value="区域二"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
                <el-form-item label="凭证号:" style="margin-bottom: 0">
                  <el-col :span="20">
                    <el-input  placeholder="请输入凭证号，或凭证号范围" v-model="checkform.desc"></el-input>
                    <p style="color:#ccc; margin:0;line-height: 1.3; font-size: 12px; margin-top: 5px">例：1,2,5-7</p>
                  </el-col>
                </el-form-item>
                <el-form-item label="状态:">
                  <el-select placeholder="" style="width: 100px; margin-right: 13px" v-model="checkform.region">
                    <el-option label="不限" value="buxian"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                  <el-checkbox label="仅查找机制凭证" name="type"></el-checkbox>
                </el-form-item>
                <el-form-item label="摘要:">
                  <el-col :span="20">
                    <el-input type="text" v-model="checkform.resource"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="科目:">
                  <el-col :span="20">
                    <el-input type="text" v-model="checkform.subject"></el-input>
                    <p style="color:#ccc; margin:0;line-height: 1.3; font-size: 12px; margin-top: 5px">例：1008,1009</p>
                  </el-col>
                  <el-col :span="4" style="text-align: center; font-size: 20px; cursor: pointer">
                    <i class="el-icon-tickets" @click="subjectVisible = true"></i>
                  </el-col>
                </el-form-item>
                <el-form-item label="辅助核算:">
                  <el-col :span="10">
                    <el-select placeholder="" v-model="checkform.arr1">
                      <el-option label="空" value="buxian"></el-option>
                      <el-option label="客户" value="beijing"></el-option>
                      <el-option label="供应商" value="beijing"></el-option>
                      <el-option label="职员" value="beijing"></el-option>
                      <el-option label="项目" value="beijing"></el-option>
                      <el-option label="部门" value="beijing"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="9">
                    <el-select placeholder="" v-model="checkform.arr2">
                      <el-option label="不限" value="buxian"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
                <el-form-item label="金额:">
                  <el-col :span="9"><el-input type="text" v-model="checkform.arr3"></el-input></el-col>
                  <el-col :span="2" align="center">至</el-col>
                  <el-col :span="9"><el-input type="text" v-model="checkform.arr4"></el-input></el-col>
                </el-form-item>
                <el-form-item label="制单人:">
                  <el-col :span="20">
                    <el-input type="text" v-model="checkform.arr5"></el-input>
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
        <el-button slot="reference">2018第2期<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
      </el-popover>

      </el-col>
      <el-col :span="12" align="right" class="right_top">
        <el-row class="btn-box">
          <el-button type="primary" :btnType="`${skin_style}_btn`">保存并新增</el-button>
          <el-button type="primary" :btnType="`${skin_style}_btn`" @click="printDialogVisible = true">打印</el-button>
          <el-button type="primary" :btnType="`${skin_style}_btn`">导出</el-button>
          <el-button type="primary" :btnType="`${skin_style}_btn`" @click="audit('1')">审核</el-button>
          <el-dropdown @command="handleMore">
            <el-button type="primary" :btnType="`${skin_style}_btn`">更多</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">反审核</el-dropdown-item>
              <el-dropdown-item command="2">整理</el-dropdown-item>
              <el-dropdown-item command="3">插入</el-dropdown-item>
              <el-dropdown-item command="4">导入</el-dropdown-item>
              <el-dropdown-item command="5">批量删除</el-dropdown-item>
              <el-dropdown-item command="6">类表打印</el-dropdown-item>
              <el-dropdown-item command="7">按导入模板格式导出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <closeBtn></closeBtn>
        </el-row>
      </el-col>
    </el-row>

    <el-table
      ref="multipleTable"
      :data="tableData3"
      highlight-current-row
      @current-change="handleCurrentChange"
      border
      stripe
      tooltip-effect="dark"
      style="width: 100%; margin-top: 20px; margin-bottom: 40px"
      @selection-change="handleSelectionChange"
      :default-sort = "{prop: 'date'}">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="日期"
        prop="date"
        sortable
        :default-sort = "{prop: 'date'}"
        >
      </el-table-column>
      <el-table-column
        prop="pzzh"
        class-name="align_left"
        label="凭证字号">
      </el-table-column>
      <el-table-column
        prop="digest"
        width="140"
        class-name="align_left_special"
        label="摘要">
        <template slot-scope="scope">
          <div class="row-item">{{scope.row.digest}}</div>
          <div class="row-item">{{scope.row.digest}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="subject"
        label="科目"
        class-name="align_left_special"
        width="300">
        <template slot-scope="scope">
          <div class="row-item">{{scope.row.subject}}</div>
          <div class="row-item">{{scope.row.subject}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="jf_money"
        label="借方金额"
        class-name="align_right_special"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <div class="row-item">{{ jfMoney(scope.row) }}</div>
          <div class="row-item"></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="df_money"
        label="贷方金额"
        class-name="align_right_special"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <div class="row-item"></div>
          <div class="row-item">{{ jfMoney(scope.row) }}</div>
        </template>
      </el-table-column>
      <el-table-column
      prop="serialNum"
      label="原单据编号"
      class-name="align_right"
      show-overflow-tooltip>
    </el-table-column>
      <el-table-column
        prop="adjunct"
        width="80px"
        label="附件">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            width="110"
            popper-class="uplodePoper"
            trigger="click">
            <div class="mypover-content">
              <a>本地上传</a>
              <a>图片库</a>
            </div>
            <div class="icon-box" slot="reference"><i class="icon iconfont icon-fujian" :style="{color:skin_color,fontSize:fsize}"></i></div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="prepared"
        label="制单人"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="auditor"
        label="审核人"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作">
        <template slot-scope="scope">
          <div class="operate-box">
            <span>修改</span>
            <span>删除</span>
            <span>冲销</span>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage2"
      :page-size="5"
      :pager-count="pageCount"
      layout=" prev, pager, next, total, jumper"
      :total="50">
    </el-pagination>


    <!--科目-->
    <div class="mydialog_modal" style="z-index: 20051;" v-show="subjectVisible">
      <div class="myDialog subjectVisible">
        <div class="el-dialog__header">
          <span class="el-dialog__title">选择科目</span>
          <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click="subjectVisible = false"><i class="el-dialog__close el-icon el-icon-close"></i></button>
        </div>
        <div class="el-dialog__body">
          <el-tabs v-model="activeName"  type="border-card" @tab-click="handleClick" class="elTabs">
            <el-tab-pane label="资产" name="first">
            </el-tab-pane>
            <el-tab-pane label="负债" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="权益" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="成本" name="fourth">定时任务补偿</el-tab-pane>
            <el-tab-pane label="损益" name="sunyi">定时任务补偿</el-tab-pane>
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

    <!--上传图片-->
    <el-dialog
      title="附件导入"
      :visible.sync="adjunctVisible"
      custom-class = 'myDialog'
      width="30%">
      <div class="adjunctBox">
         <p>可批量上传jpg、png、bmp、jpeg等图片文件，电子发票支持pdf文件<br/>最大支持一次性批量上传50M </p>
      </div>
      <div slot="footer" class="dialog-footer">
      <span class="btn" :style="{background:skin_color}">保存</span>
      <span class="btn" @click="adjunctVisible = false">取消</span>
    </div>
    </el-dialog>

    <!--打印-->
    <el-dialog title="凭证打印" :visible.sync="printDialogVisible" custom-class="myDialog" width="32%">
      <div style="position: absolute;left: 100px;top: 14px;">
        <img src="../../assets/imgs/video.png" style="width: 18px;vertical-align: middle;" alt="">
        <span style="font-size: 16px">视频演示</span>
      </div>
      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="PDF打印" name="left" style="padding-top: 20px" class="print">
          <el-form ref="pdfForm" :model="pdfForm">
            <el-form-item label="打印纸型：">
              <el-radio v-model="pdfForm.radio" label="1">A4</el-radio>
              <el-radio v-model="pdfForm.radio" label="2">B5</el-radio>
              <el-radio v-model="pdfForm.radio" label="3">自定义纸张</el-radio>
            </el-form-item>
            <el-form-item style="margin-left: 100px" v-show="pdfForm.radio == '3'">
              <span style="margin-right: 5px">宽度</span><el-input v-model="pdfForm.width"></el-input><span style="margin-left: 5px">毫米</span>
              <span style="margin-left: 20px; margin-right: 5px;">长度</span><el-input v-model="pdfForm.height"></el-input><span style="margin-right: 5px">毫米</span>
            </el-form-item>
            <el-form-item label="图像方向：">
              <el-radio v-model="pdfForm.radio" label="horizontal">横向</el-radio>
              <el-radio v-model="pdfForm.radio" label="vertical">纵向</el-radio>
            </el-form-item>
            <el-form-item label="边距调整：">
              <div>
                <span style="margin-right: 5px">左</span><el-input v-model="pdfForm.left"></el-input><span style="margin-left: 5px">毫米</span>
              </div>
              <div>
                <span style="margin-left: 98px; margin-right: 5px;">上</span><el-input v-model="pdfForm.right"></el-input><span style="margin-left: 5px">毫米</span>
              </div>
            </el-form-item>
            <el-form-item v-show="pdfForm.radio == '1'" label="每页打印凭证数：" style="margin-top: 10px; margin-bottom: 10px">
              <el-select v-model="pdfForm.selectedNum">
                <el-option
                  v-for="item in pdfForm.nums"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="字体大小：">
              <el-input-number v-model="pdfForm.fontSize" controls-position="right" :min="8" :max="12"></el-input-number>
            </el-form-item>
            <el-form-item>
              <div v-for="(item, index) in pdfForm.checkbox" :key="index">
                <el-checkbox v-model="item.checked">{{ item.name }}</el-checkbox>
              </div>
            </el-form-item>
            <el-form-item>
               <div>
                  <el-checkbox v-model="pdfForm.summary.checked">汇总打印：</el-checkbox>
              </div>
              <div v-show="pdfForm.summary.checked">
                <span style="margin-left: 28px">将科目汇总到：</span>
                <el-input-number v-model="pdfForm.fontSize" controls-position="right" :min="1"></el-input-number>
                <span>级</span>
              </div>
              <div v-show="pdfForm.summary.checked" style="margin-left: 28px">
                <el-checkbox v-for="(item, index) in pdfForm.summary.checkList" :key="index" v-model="item.checked">{{ item.name }}</el-checkbox>
              </div>
            </el-form-item>
            <el-form-item>
              <div>
                  <el-checkbox v-model="pdfForm.leader.checked">打印时显示出纳、主管</el-checkbox>
              </div>
              <div v-show="pdfForm.leader.checked">
                <span style="margin-right: 28px">出纳：</span><el-input v-model="pdfForm.leader.cashier"></el-input>
              </div>
               <div v-show="pdfForm.leader.checked">
                <span style="margin-right: 28px">主管：</span><el-input v-model="pdfForm.leader.leader"></el-input>
              </div>
            </el-form-item>
            <el-form-item>
              <span>为了保证您的正常打印，请先下载安装Adobe PDF阅读器</span>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="专业套打" name="right" style="padding-top: 20px" class="major">
          <el-form ref="majorForm" :model="majorForm">
            <el-form-item label="选择模版:">
              <div>
                <el-select v-model="majorForm.selectedMoudle">
                <el-option
                  v-for="item in majorForm.moudles"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
              <a href="#" style="margin-left: 5px">设为默认模板</a>
              </div>
            </el-form-item>
            <el-form-item label="每张打印分录数:" class="number">
              <el-input v-model="majorForm.number"></el-input>
              <span style="color: #999">为0时，默认取套打模版中设置的打印分录数</span>
            </el-form-item>
            <el-form-item label="边距调整:">
                <span style="margin-right: 5px">左</span><el-input v-model="majorForm.left" style="width: 100px"></el-input><span style="margin-left: 5px">毫米</span>
              <div>
                <span style="margin-left: 88px; margin-right: 5px;">上</span><el-input v-model="majorForm.right" style="width: 100px"></el-input><span style="margin-left: 5px">毫米</span>
              </div>
            </el-form-item>
            <el-form-item>
              <div>
                <el-checkbox v-model="majorForm.empty">打印空白行</el-checkbox>
                <el-checkbox v-model="majorForm.tableLine">打印表格线</el-checkbox>
              </div>
              <div>
                <el-checkbox v-model="majorForm.name">不打印制单人姓名</el-checkbox>
              </div>
               <div>
                <el-checkbox v-model="majorForm.attachment">打印附件数为“0”</el-checkbox>
              </div>
               <div>
                  <el-checkbox v-model="majorForm.summary.checked">汇总打印：</el-checkbox>
              </div>
              <div v-show="majorForm.summary.checked" class="total">
                <span style="margin-left: 28px">将科目汇总到：</span>
                <el-input-number v-model="majorForm.fontSize" controls-position="right" :min="1"></el-input-number>
                <span>级</span>
              </div>
              <div v-show="majorForm.summary.checked" style="margin-left: 28px">
                <el-checkbox v-for="(item, index) in majorForm.summary.checkList" :key="index" v-model="item.checked">{{ item.name }}</el-checkbox>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </template>
    <div slot="footer" class="dialog-footer">
      <span class="btn" :style="{background:skin_color}" @click="print">打印</span>
      <span class="btn" @click="printDialogVisible = false">取消</span>
    </div>
	</el-dialog>

  </div>
</template>

<script>

  import { mapState, } from 'vuex'
  import NumFormatter from "../../assets/js/NumFormatter.js"
  import closeBtn from '../closeTab'
  import '../../assets/js/jquery.ztree.core'
  import urls from '../../api/unsplash/url'
  import utility from '../../api/baseUtility'
  export default {
    name: "checkCredential",
    computed:{
      ...mapState([
        'skin_style',
        'skin_color',
      ])
    },
    components:{
      closeBtn
    },
    data(){
        return{
          poverVisible:false,
          adjunctVisible:false,
          printDialogVisible: false,
          pageCount:5,
          showForm:false,
          fsize:'30px',
          options:[
            {
              value:'ji',
              label:'记'
            }
          ],
          activeName:'first',
          subjectVisible:false,
          currentPage2:1,
          tableData3: [{
            date: '2016-05-03',
            pzzh: '记-3111',
            digest: '购清扫车定金1',
            subject:'220263 应付账款_李名个人帐户',
            jf_money:'33897',
            df_moneyL:'',
            serialNum:'',
            adjunct:'12322',
            prepared:'23423',
            auditor:'未审核',
            operate:''
          },{
            date: '2016-05-05',
            pzzh: '记-3',
            digest: '购清扫车定金2',
            subject:'220263 应付账款_李名个人帐户',
            jf_money:'338970',
            df_moneyL:'',
            serialNum:'',
            adjunct:'12322',
            prepared:'23423',
            auditor:'未审核',
            operate:''
          },{
            date: '2016-06-03',
            pzzh: '记-3',
            digest: '购清扫车定金3',
            subject:'220263 应付账款_李名个人帐户',
            jf_money:'3389',
            df_moneyL:'',
            serialNum:'',
            adjunct:'12322',
            prepared:'23423',
            auditor:'未审核',
            operate:''
          },{
            date: '2018-05-03',
            pzzh: '记-3',
            digest: '购清扫车定金4',
            subject:'220263 应付账款_李名个人帐户',
            jf_money:'33897',
            df_moneyL:'',
            serialNum:'',
            adjunct:'12322',
            prepared:'23423',
            auditor:'未审核',
            operate:''
          },{
            date: '2018-05-03',
            pzzh: '记-3',
            digest: '购清扫车定金5',
            subject:'220263 应付账款_李名个人帐户',
            jf_money:'33897',
            df_moneyL:'',
            serialNum:'',
            adjunct:'12322',
            prepared:'23423',
            auditor:'未审核',
            operate:''
          }],
          multipleSelection: [],
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
          },
          currentRow: null,
          zNodes:[
            { name:"1001 库存现金", isParent:false,icon:require('../../assets/imgs/icon_wenjian1.svg')},
            { name:"1002 银行存款", open:true,icon:require('../../assets/imgs/icon_wenjian2.svg'),
              children: [
                { name:"100201 银行存款",
                  icon:require('../../assets/imgs/icon_wenjian3.svg'),
                  children: [
                    { name:"38473 差旅费",icon:require('../../assets/imgs/icon_wenjian3.svg')},
                    { name:"38473 差旅费",icon:require('../../assets/imgs/icon_wenjian3.svg')},
                    { name:"38473 差旅费",icon:require('../../assets/imgs/icon_wenjian3.svg')},
                    { name:"38473 差旅费",icon:require('../../assets/imgs/icon_wenjian3.svg')}
                  ]},
                { name:"10023 应收票据", isParent:true,icon:require('../../assets/imgs/icon_wenjian2.svg')}
              ]
            },
            { name:"1002 银行存款", open:true,icon:require('../../assets/imgs/icon_wenjian2.svg'),
              children: [
                { name:"100201 银行存款",
                  icon:require('../../assets/imgs/icon_wenjian3.svg'),
                  children: [
                    { name:"38473 差旅费",icon:require('../../assets/imgs/icon_wenjian3.svg')},
                    { name:"38473 差旅费",icon:require('../../assets/imgs/icon_wenjian3.svg')},
                    { name:"38473 差旅费",icon:require('../../assets/imgs/icon_wenjian3.svg')},
                    { name:"38473 差旅费",icon:require('../../assets/imgs/icon_wenjian3.svg')}
                  ]},
                { name:"10023 应收票据", isParent:true,icon:require('../../assets/imgs/icon_wenjian2.svg')}
              ]
            },
            { name:"1002 银行存款", open:true,icon:require('../../assets/imgs/icon_wenjian2.svg'),
              children: [
                { name:"100201 银行存款",
                  icon:require('../../assets/imgs/icon_wenjian3.svg'),
                  children: [
                    { name:"38473 差旅费",icon:require('../../assets/imgs/icon_wenjian3.svg')},
                    { name:"38473 差旅费",icon:require('../../assets/imgs/icon_wenjian3.svg')},
                    { name:"38473 差旅费",icon:require('../../assets/imgs/icon_wenjian3.svg')},
                    { name:"38473 差旅费",icon:require('../../assets/imgs/icon_wenjian3.svg')}
                  ]},
                { name:"10023 应收票据", isParent:true,icon:require('../../assets/imgs/icon_wenjian2.svg')}
              ]
            },
            { name:"10024 其他应收款", open:true,icon:require('../../assets/imgs/icon_wenjian2.svg'),
              children: [
                { name:"1002439 伙食费",
                  icon:require('../../assets/imgs/icon_wenjian2.svg'),
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
          'pdfForm': {
            radio: '1',
            fontSize: 9,
            nums: ["1", "2", "3"],
            selectedNum: "2",
            width: '',
            height: '',
            left: '',
            right: '',
            checkbox: [
              { checked: false, name: "不打印制单人姓名" },
              { checked: false, name: "打印附件数为“0”" },
              { checked: false, name: "在摘要中打印数量、单价" },
              { checked: false, name: "在摘要中打印外币" },
            ],
            summary: {
              checked: false,
              grade: 1,
              checkList: [
                { checked: false, name: "按借贷方向分别汇总" },
                { checked: false, name: "汇总金额为零不显示" },
                { checked: false, name: "显示核算项目" },
              ],
            },
            leader: {
                checked: false,
                cashier: "",
                leader: "",
              }
          },
          'majorForm': {
            moudles: [
              { value: 1, name: '友商在线记账凭证模板记账凭证模板(210mmⅹ95mm)' },
              { value: 2, name: '通用模板（适用240*140 240*120 210*120 210*140的空白纸）' },
              { value: 3, name: 'ikeep记账凭证(210mmⅹ140mm)' },
              { value: 4, name: 'ikeep配套数量/外币记账凭证模板(KP-J104-激光/喷墨240mmⅹ140mm)' },
              { value: 5, name: 'ikeep配套数量/外币记账凭证模板(激光/喷墨210mmⅹ140mm)' },
              { value: 6, name: 'ikeep配套数量_外币记账凭证模板((激光_喷墨240mmⅹ120mm)' },
              { value: 7, name: 'ikeep配套金额记账凭证模板(KP-J103-深圳版-激光/喷墨240mmⅹ140mm)' },
              { value: 8, name: 'ikeep配套金额记账凭证模板(激光/喷墨240mmⅹ120mm)' },
              { value: 9, name: 'ikeep配套金额记账凭证模板(激光_喷墨210mm_140mm)' },
              { value: 10, name: 'ikeep配套金额记账凭证模板(激光_喷墨240mmⅹ140mm)' },
            ],
            selectedMoudle: '',
            number: '',
            left: '',
            right: '',
            empty: false,
            tableLine: false,
            name: false,
            attachment: false,
            summary: {
              checked: false,
              grade: 1,
              checkList: [
                { checked: false, name: "按借贷方向分别汇总" },
                { checked: false, name: "汇总金额为零不显示" },
                { checked: false, name: "显示核算项目" },
              ],
            }
          },
          activeName: 'left',
        }
    },
    methods:{
      async audit(mark){
        try {
          if(this.multipleSelection.length > 0){
            let params = utility.baseEncode({
              "accountId":"1",
              "voucherIds":[
                "12",
                "22",
                "32",
                "4"
              ],
              "isChecked":mark
            },urls.auditPort)
            let res = await this.$api.unsplash.baseInterface(params)
            if(res.returnStatus.code === '0000'){
              this.$message({
                message: mark === '1' ? '审核成功！' : '反审核成功！',
                type: 'success'
              });
            }
          }else{
            this.$message({
              message: `请先选择你想要${mark === '1' ? "审核" : '反审核'}的凭证!`,
              type: 'warning'
            });
          }
        }catch (e) {
          console.log(e)
        }
      },
      handleMore(command){
        if(command === '2'){
          this.$router.push('/trimVoucher')
        }else if(command === '4'){
          this.$router.push('/fileVoucher')
        }else if(command === '1'){
          this.audit('0');
        }
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
      jfMoney(val) {
        return NumFormatter.formatNum(val.jf_money);
      },
      closeTab(command){
        // closeTabs(command)
      },
      setCurrent(row) {
        this.$refs.multipleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      print() {
        this.printDialogVisible = false;
        window.open('../../../static/pdf/web/viewer.html')
      },
      //凭证列表
      async _voucherList(){
        try {
          let params = utility.baseEncode({
            accountId: "1",
            voucherDate: '2018-01-09'
          },urls.voucherList)
          let res = await this.$api.unsplash.baseInterface(params);
          if(res.data && res.data.content){
            let _resData = utility.baseDecode(res.data.content)//解密
            console.log(_resData)
          }
        }catch (e) {
          console.log(e)
        }
      },
    },
    mounted(){
      console.log(this.proofWordsList)
      this._voucherList()
      $.fn.zTree.init($("#treeAccount"), this.setting, this.zNodes);
    },
  }
</script>

<style scoped lang="scss">
  @import "../../assets/icon/iconfont.css";
  @import "../../assets/css/table_1";

  #checkCredent{
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
  }
</style>

<style lang="scss">
@import "../../assets/css/variable.scss";
@import '../../assets/css/zTreeStyle.css';
#checkCredent {
  .uplodePoper {
    padding: 0;
    box-sizing: border-box;
    min-width: 110px;
    .mypover-content{
      background: white;
      a{
        display: block;
        color: #333333;
        line-height: 35px;
        border-bottom: 1px solid $border-color;
        padding-left: 26px;
        &:last-child{
          border-bottom: none;
        }
        &:hover{
          cursor: pointer;
        }
      }
    }
  }
  .adjunctBox{
    p{
      margin-bottom: 20px;
      font-size: 12px;
      color: #797676;
    }
  }
  .myDialog {
    .el-dialog__body {
      padding: 20px 20px 20px 20px;
    }
    .el-tabs__nav-wrap::after {
      height: 0;
    }
    .el-tabs__item:hover {
      color: #303133;
    }
    .el-tabs__item.is-active {
      border: solid 1px #30aabc;
      border-left: 0;
      border-right: 0;
      background-color: #30aabc;
      color: white;
    }
    .el-tabs__item {
      border: solid 1px #aeaeae;
    }
    .el-tabs__active-bar {
      display: none;
    }
     .el-dialog__body .print {
      .el-form .el-form-item {
        margin-bottom: 0;
      }
      .el-form .el-input[data-v-38187c1e] {
        width: 100px;
      }
      .el-input-number {
        width: 90px;
      }
      .el-form .el-input {
        width: 90px;
      }
    }
    .el-dialog__body .major {
      .el-form .el-input {
        width: 300px;
      }
      .el-form {
        .total {

          .el-input,.el-input-number {
            width: 90px;
          }
        }
      }
      .el-form .number {
        .el-input {
          width: 100px;
        }
      }
    }
    .major {
      a {
        color: #999;
      }
    }
  }
}
</style>

