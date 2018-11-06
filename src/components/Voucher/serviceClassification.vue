<template>
  <div id="serviceClassification" class="public-container">
    <el-row class="Rtitle">
      <el-col :span="24" align="right" class="right_top">
        <el-row class="btn-box">
          <el-button type="primary" :btnType="`${skin_style}_btn`" @click="insertClassifiy">新增</el-button>
          <!-- <el-button type="primary" :btnType="`${skin_style}_btn`" @click="dialogVisible = true">新增</el-button> -->
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="width: 100%;  padding: 0; margin: 20px 0">
      <el-col :span="5" class="rightBox" v-show="handle_slider == false" :style="{height:treeHeight}" style="padding: 0px !important; min-height: 616px; overflow-y: auto;">
        <div class="zTreeDemoBackground">
          <ul id="treeAccount" class="ztree"></ul>
        </div>
      </el-col>
      <el-col :span="19" style="padding-right: 0">
        <el-table
          :data="tableData"
          stripe
          border
          ref="singleTable"
          highlight-current-row
          class="rightTable"
          @current-change="handleCurrentChange"
          style="margin-bottom: 40px">
          <el-table-column
            prop="coding"
            label="操作">
            <template slot-scope="scope">
              <i :style="{color:skin_color}" class="el-icon-edit-outline icon" @click="editItem(scope.row)"></i>
              <i :style="{color:skin_color}" style="margin-left: 30px" class="el-icon-delete icon" @click="deleteItem(scope.row.businessTypeId)"></i>
					</template>
          </el-table-column>
          <el-table-column
            prop="businessTypeName"
            label="分类名称">
          </el-table-column>
          <el-table-column
            class-name="align_left"
            label="摘要">
            <template slot-scope="scope">
              <div class="row-item" v-for="(item,index) in scope.row.businessTypeDetailList" :key="index">{{item.summaryContent}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="fenlu"
            label="分录信息">
            <el-table-column
              prop="dc"
              label="借/贷">
              <template slot-scope="scope">
                <div class="row-item" v-for="(item,index) in scope.row.businessTypeDetailList" :key="index">{{item.dc=="0"?"借":"贷"}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="subjectName"
              class-name="align_left"
              label="科目">
              <template slot-scope="scope">
                <div class="row-item" v-for="(item,index) in scope.row.businessTypeDetailList" :key="index">{{item.subjectName}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="moneyProportion"
              :formatter="format"
              class-name="align_right"
              label="金额比例%">
              <template slot-scope="scope">
                <div class="row-item" v-for="(item,index) in scope.row.businessTypeDetailList" :key="index">{{item.moneyProportion}}</div>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-col>

    </el-row>
    <!--新增分类-->
    <el-dialog
      title="新增分类"
      :visible.sync="dialogVisible"
      custom-class = 'myDialog'
      width="60%">
      <div class="digestBox">
        <el-row>
          <el-col :span="1">
            <label style="height: 40px; line-height: 40px;">名称：</label>
          </el-col>
          <el-col :span=23>
            <el-input type="text" style="margin-left: 20px; margin-right: 20px;width: 98%;" placeholder="请输入摘要内容" v-model="form.businessTypeName"></el-input>
          </el-col>
        </el-row>
        <el-table
          :data="form.businessTypeDetailList"
          border
          stripe
          style="width: 100%; margin-top: 16px; margin-bottom: 15px">
          <el-table-column
            width="180">
            <template slot-scope="scope">
              <i class="el-icon-plus"  @click="handleDigest(scope.row,'add', scope.$index)"></i>&nbsp;&nbsp;&nbsp;
              <i class="el-icon-close" @click="handleDigest(scope.row,'del', scope.$index)"></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="summary"
            label="摘要">
            <template slot-scope="scope">
              <el-input class="abstract" type="text" v-model="scope.row.summary"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="dc"
            width="80"
            label="借/贷">
            <template slot-scope="scope">
              <el-select v-model="scope.row.dc" class="abstract">
                <el-option
                  v-for="item in directions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="subjectId"
            label="科目">
            <template slot-scope="scope">
              <!-- <el-autocomplete
                class="inline-input complete-input abstract"
                suffix-icon="el-icon-date"
                :fetch-suggestions="querySearch"
                v-model="scope.row.subjectIdToName"
                @select="handleSelectSub"
                style="width: 100%;"
              ></el-autocomplete> -->
               <el-select v-model="scope.row.subjectId" filterable placeholder="请选择">
                <el-option
                  v-for="(item,index) in projects"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="moneyProportion"
            width="120"
            label="金额比例">
            <template slot-scope="scope">
              <el-input class="abstract" type="text" v-model="scope.row.moneyProportion"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <span class="btn" :style="{background:skin_color}" @click="save(form)">保存</span>
				<span class="btn" @click="dialogVisible = false;isedit=false">取消</span>
      </span>
    </el-dialog>
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
        isedit:false,
        isParent_:false,//是否为父级目录，只有父级目录可以添加业务分类
        treeHeight:'',
        dialogVisible: false,
        poverVisible:false,
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
        pageCount:5,
        tableData: [],
        multipleSelection: [],
        checkform:{
          beginSubject: '',
          endsubject:'库存现金',
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
        subjectId:'',
        subjectName:'',
        subjectChildren:[],
        zNodes:[],
        setting : {
          callback: {
            onClick: this.treeRowClick
          }
        },
        currentRow: null,
        form: {
          businessTypeName: '',
          businessTypeDetailList: [{
            summary: '',
            dc: '0',
            subjectId: '',
            subjectIdToName:'',
            moneyProportion: '',
          }]
        },
        businessTypeId:'',
        projects: [],
        directions: [
          { value: '0', label: "借" },
          { value: '1', label: "贷" },
        ]
      }
    },
    methods:{
      sureSearch(){
        // if(this.checkform.checkbox_3 == true){
        //
        // }
      },
      editItem(data){
        this._subjectList();
        this.isedit=true
        this.dialogVisible=true
        this.businessTypeId=data.businessTypeId
        //console.log(data)
        for(var i=0;i<data.businessTypeDetailList.length;i++){
          data.businessTypeDetailList[i].summary=data.businessTypeDetailList[i].summaryContent
          data.businessTypeDetailList[i].subjectId=data.businessTypeDetailList[i].subjectName
        }
        this.form.businessTypeName=data.businessTypeName
        this.form.businessTypeDetailList=data.businessTypeDetailList
      },
      deleteItem(id){
        this._businessTypeDelete(id)
      },
      arrowUp: function(target) {
        let _t = this.baseSetting[target];
        this.$nextTick(function() {
          this.baseSetting[target] = parseInt(_t) + 1;
        });
      },
      arrowDown: function(target) {
        let _t = this.baseSetting[target];
        if (_t == 0) {
          _t = 0;
        } else {
          _t = parseInt(_t) - 1;
        }
        this.$nextTick(function() {
          this.baseSetting[target] = _t;
        });
      },
      handleDigest(data, type, index) {
        if (type == 'add') { // 新增
          let a = { summary: data.summary, dc: data.dc, subjectId: data.subjectId, moneyProportion: data.moneyProportion };
          this.form.businessTypeDetailList.splice(index+1,0,a);
        } else { // 删除
          if (this.form.businessTypeDetailList.length <= 1) {
            this.$message({
              message: '至少保留一条分录',
              type: 'warning'
            });
            return;
          }
          this.form.businessTypeDetailList.splice(index,1);
        }
      },
      format(row, column, cellValue, index) {
        return NumFormatter.formatNum(cellValue);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      treeRowClick(event, treeId, treeNode, clickFlag){
        console.log(treeNode)
        this.subjectName = treeNode.name;
        this.subjectId = treeNode.id;
        if(treeNode.children){
          this.isParent_=true
        }else{
          this.isParent_=false
        }
        this.businessTypeDetailList();
      },
      //新增
      insertClassifiy(){
        if(this.subjectId&&this.isParent_){
          this.isedit=false
          this.form.businessTypeName='',
          this.form.businessTypeDetailList=[{summary:'',dc:'0',subjectId:'',moneyProportion:''}]
          this.dialogVisible = true
          this._subjectList();
          //this.insertClassifiyInterface();
        }else{
          this.$message({
            message: `请选择上级分类!`,
            type: 'warning'
          });
        }
      },
      //保存
      save(form){
        console.log(form)
        let valid=false
        if(form.businessTypeName==""){
          valid=false
          this.$message({
            message: '请输入名称',
            type: 'warning'
          });
        }else if(form.businessTypeName){
          for(var i=0;i<form.businessTypeDetailList.length;i++){
            if(form.businessTypeDetailList[i].summary==""){
              valid=false
              this.$message({
                message: '请输入摘要',
                type: 'warning'
              });
            }else if(form.businessTypeDetailList[i].subjectId==""){
              valid=false
              this.$message({
                message: '请选择科目',
                type: 'warning'
              });
            }else if(form.businessTypeDetailList[i].moneyProportion==""){
              valid=false
              this.$message({
                message: '请输入金额比例',
                type: 'warning'
              });
            }else{
              valid=true
            }
          }
        }
        if(valid){
          //校验通过，数据提交后台
          if(this.isedit){
            this._businessTypeUpdate(form.businessTypeName,form.businessTypeDetailList)
          }else{
            //console.log(form.businessTypeDetailList)
            this.insertClassifiyInterface(form.businessTypeName,form.businessTypeDetailList)
          }
          this.dialogVisible=false;
        }
      },
      //新增业务分类
      async insertClassifiyInterface(name,list){
        try {
          let params = utility.baseEncode({
            "accountId": "1",
            "pid": this.subjectId,
            "businessTypeName": name,
            "businessTypeDetailList": list
          },urls.businessTypeInsert)
          let res = await this.$api.unsplash.baseInterface(params)
          console.log(res)
          if(res.returnStatus.code=='0000'){
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.businessTypeDetailList()
          }
        }catch (e) {
          console.log(e)
        }
      },
      //删除业务分类
      async _businessTypeDelete(id){
        try {
          let params = utility.baseEncode({
            "accountId": "1",
            "businessTypeId":id
          },urls.businessTypeDelete)
          let res = await this.$api.unsplash.baseInterface(params)
          console.log(res)
          if(res.returnStatus.code == "0000") {
            this.$message({
              message: '删除成功！',
              type: 'success'
            });
            this.businessTypeDetailList();
          }
        }catch (e) {
          console.log(e)
        }
      },
      //编辑业务分类
      async _businessTypeUpdate(name,list){
        try {
          let params = utility.baseEncode({
            "accountId": "1",
            "businessTypeId": this.businessTypeId,
            "businessTypeName": name,
            "businessTypeDetailList": list
          },urls.businessTypeUpdate)
          let res = await this.$api.unsplash.baseInterface(params)
          console.log(res)
          if(res.returnStatus.code=='0000'){
            this.$message({
              message: '编辑成功！',
              type: 'success'
            });
            this.businessTypeDetailList()
          }
        }catch (e) {
          console.log(e)
        }
      },
      //业务分类树
      async accountTree(){
        try {
          let params = utility.baseEncode('1',urls.businessTypeList)
          let res = await this.$api.unsplash.baseInterface(params)
          if(res.data && res.data.content){
            let _resData = utility.baseDecode(res.data.content)//解密
            // console.log(_resData)
            if(_resData.length > 0){
              for (let i = 0; i < _resData.length; i++) {
                let _data = _resData[i];
                let _innerData = {
                  name:_data.businessTypeName,
                  open:false,
                  id:_data.businessTypeId,
                  children:[]
                }
                if(_data.businessTypeList && _data.businessTypeList.length > 0){
                  _innerData.iconOpen = require('../../assets/imgs/openwenjian.svg');
                  _innerData.iconClose = require('../../assets/imgs/icon_wenjian2.svg');
                  for (let j = 0; j <_data.businessTypeList.length ; j++) {
                    let _d = _data.businessTypeList[j];
                    _innerData.children.push({
                      id:_d.businessTypeId,
                      name:_d.businessTypeName,
                      icon:require('../../assets/imgs/icon_wenjian3.svg')
                    })
                  }
                }else{
                  _innerData.isParent = false;
                  _innerData.icon = require('../../assets/imgs/icon_wenjian3.svg')
                }
                this.zNodes.push(_innerData)
            }
              $.fn.zTree.init($("#treeAccount"), this.setting, this.zNodes);
              fuzzySearch('treeAccount','#searchKey',null,true); //初始化模糊搜索方法
            }
          }
          this.businessTypeDetailList(); //列表
        }catch (e) {
          console.log(e)
        }
      },
      async businessTypeDetailList(){
        try {
          let params = utility.baseEncode({
            "accountId": "1",
            "pid": this.subjectId
          },urls.businessTypeDetailList)
          let res = await this.$api.unsplash.baseInterface(params)
          if(res.data && res.data.content){
            let _resData = utility.baseDecode(res.data.content)//解密
            //console.log(_resData)
            // console.log('------------------')
            this.tableData = [..._resData]
          }else if(res.data.content==""){
            this.tableData=[]
          }
        }catch (e) {
          console.log(e)
        }
      },
      // querySearch(queryString, cb) {
      //   var restaurants = this.projects;
      //   var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      //   // 调用 callback 返回建议列表的数据
      //   cb(results);
      // },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      //科目列表
      async _subjectList(){
        try {
          let params = utility.baseEncode({
            "accountId": "1",
          },urls.subjectList)
          let res = await this.$api.unsplash.baseInterface(params);
          if(res.data && res.data.content){
            let _resData = utility.baseDecode(res.data.content)//解密
            if(_resData && _resData.length > 0){
              console.log(_resData)
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
              this.projects=_resData.sort(compare).map(function(item) {
                return {label: item.subjectCode+' '+item.subjectName, value:item.subjectId}
              });
            }
          }  
        }catch (e) {
          console.log(e)
        }
      },
    },
    created(){
      this.accountTree();
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/table_1";
  #serviceClassification{
    .ztree{
      padding: 25px;
    }
  }
</style>
<style lang="scss">
  @import '../../assets/css/zTreeStyle.css';
  @import '../../assets/css/variable.scss';
  #serviceClassification{
    .el-select{
      border:none;
      width:100%;
      .el-input__inner,.el-input__inner:hover{
        border:none !important;
        width:100%;
      }
    }
    .el-table--enable-row-hover .el-table__body tr:hover > td .el-input__inner {
      background-color: #fbfed6;
    }
    .el-table .cell{
      .icon{
        font-size: 22px;
        vertical-align: middle;
      }
      .abstract {
        width: 100%;
        height: 100%;
        .el-input__inner {
          border-width: 0;
          background-color: transparent !important;
          &:hover {
            border-width: 0 !important;
            background-color: transparent !important;
          }
        }
      }
    }
    .el-table td.align_left{padding-left: 0 !important;}
    .rightTable{
      height: 616px;
      overflow-y: auto;
    }
  }

</style>
