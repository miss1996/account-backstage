<template>
	<div id="subject">
		<div class="filter">
			<el-col :span="12">
				<el-radio-group v-model="filter" size="medium" :class="skin_style" @change="filterChange">
					<el-radio-button label="资产"></el-radio-button>
					<el-radio-button label="负债"></el-radio-button>
					<el-radio-button label="权益"></el-radio-button>
					<el-radio-button label="成本"></el-radio-button>
					<el-radio-button label="损益"></el-radio-button>
				</el-radio-group>
			</el-col>
			<el-col :span="12" align="right" class="right_top">
				<el-row class="btn-box">
					<el-button type="primary" :btnType="`${skin_style}_btn`" @click="showAdd('0')">新增</el-button>
					<!-- <el-button type="primary" :btnType="`${skin_style}_btn`">导入</el-button> -->
					<el-button type="primary" :btnType="`${skin_style}_btn`">导出</el-button>
					<el-button type="primary" :btnType="`${skin_style}_btn`" @click="batchDelete">删除</el-button>
					<closeBtn></closeBtn>
				</el-row>
			</el-col>
		</div>
		<div class="list">
			<el-table ref="multipleTable" highlight-current-row @current-change="selectCurrentChange" @selection-change="selectionChange" stripe border :data="tableData" style="width: 100%">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<i :style="{color:skin_color}" class="icon iconfont icon-tianjiaxiang add" @click="showAdd(scope.row)"></i>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<i :style="{color:skin_color}" class="el-icon-edit-outline icon" @click="showEdit"></i>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<i :style="{color:skin_color}" class="el-icon-delete icon" @click="deleteRow(scope.row.subjectId)"></i>
					</template>
				</el-table-column>
				<el-table-column prop="accountId" class-name="align_left" label="编码">
				</el-table-column>
				<el-table-column prop="subjectName" class-name="align_left" label="名称">
				</el-table-column>
				<el-table-column prop="subsetType" label="类别">
				</el-table-column>
				<el-table-column prop="balanceDirection" label="余额方向">
				</el-table-column>
				<el-table-column prop="assistName" label="辅助核算">
				</el-table-column>
				<el-table-column prop="state" label="状态">
					<template slot-scope="scope">
						<el-switch v-model="scope.row.check" :active-color="skin_color" inactive-color="#999999" :class="skin_style">
						</el-switch>
						<span class="switch-text" v-if="scope.row.check == true">已开启</span>
						<span class="switch-text" v-else>未开启</span>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="paginationBox">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :pager-count="pageCount" :page-size="5" layout=" prev, pager, next, total, jumper" :total="50">
			</el-pagination>
			<el-button class="go">确定</el-button>
		</div>
		<el-dialog title="新增下级科目" :visible.sync="dialogVisible" custom-class="myDialog" width="32%">
			<el-form ref="form" :model="form" label-width="94px">
				<el-form-item label="科目编码">
					<el-input v-model="form.subjectCode"></el-input>
				</el-form-item>
				<el-form-item label="科目名称">
					<el-input v-model="form.subjectName"></el-input>
				</el-form-item>
				<el-form-item label="上级目录">
					<el-input v-model="form.superior" disabled></el-input>
				</el-form-item>
				<el-form-item label="科目类别">
					<el-select v-model="form.subjectTypeId" placeholder="请选择科目类别" :disabled = 'typeDisable'>
						<el-option label="流动资产" value="1"></el-option>
						<el-option label="非流动资产" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="余额方向">
					<el-radio-group v-model="form.balanceDirection">
						<el-radio :label="0" >借</el-radio>
						<el-radio :label="1">贷</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="" class="spe">
					<el-checkbox-group v-model="form.fuType"  @change="showChange('fuType')">
						<div :class="{'bac-gray':fuTypeShow}">
							<el-checkbox label="辅助核算" name="type1"></el-checkbox>
							<div v-if="fuTypeShow">
							<el-form ref="form" :model="form" label-width="100px" class="main-child" >
								<el-form-item label="">
									<el-checkbox-group v-model="form.fu.type">
										<el-checkbox :label="1" name="type1">客户</el-checkbox>
										<el-checkbox :label="2" name="type1">供应商</el-checkbox>
                    <el-checkbox label="3" name="type1">项目</el-checkbox>
										<el-checkbox label="4" name="type1">职员</el-checkbox>
										<el-checkbox label="5" name="type1">部门</el-checkbox>
										<el-checkbox label="6" name="type1">存货</el-checkbox>
									</el-checkbox-group>
								</el-form-item>
								<el-form-item label="自定义内容">
									<el-select v-model="form.fu.content" placeholder="请选择" size="small">
										<el-option :label="item.name" :value="item.assistTypeId" v-for="(item,index) in seldefine" :key="index"></el-option>
									</el-select>
								</el-form-item>
							</el-form>
							</div>
						</div>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="" class="spe">
					<el-checkbox-group v-model="form.shuType"  @change="showChange('shuType')">
						<div :class="{'bac-gray':shuTypeShow}" style="height: 40px;">
							<el-checkbox label="数量核算" name="type1"></el-checkbox>
							<el-form ref="form" :model="form" label-width="94px" class="main-child main-child1" v-if="shuTypeShow">
								<el-form-item label="计量单位">
									<el-input v-model="form.shu.unit"></el-input>
								</el-form-item>
							</el-form>
						</div>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="" class="spe">
					<el-checkbox-group v-model="form.waiType"  @change="showChange('waiType')">
						<div :class="{'bac-gray':waiTypeShow}">
							<el-checkbox label="外币核算" name="type1"></el-checkbox>
							<el-form ref="form" :model="form" label-width="94px" class="main-child" v-if="waiTypeShow">
								<el-form-item label="">
									<el-checkbox-group v-model="form.wai.type">
										<el-checkbox :label="item.code" name="type1" v-for="(item,index) in tableDataxx" :key="index">{{item.name}}</el-checkbox>
									</el-checkbox-group>
								</el-form-item>
							</el-form>
						</div>
					</el-checkbox-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<span class="btn" :style="{background:skin_color}" @click="saveSubject">保存</span>
				<span class="btn" @click="dialogVisible = false">取消</span>
			</div>
		</el-dialog>

    <!--确认删除弹框-->
    <el-dialog title="系统提示" :visible.sync="dialogVisibleDelete" custom-class="myDialog" width="417px" class="warning">
      <div class="warning-box">
        <img class="warning-png" src="../../assets/imgs/warning.png" alt="">
        <div class="warning-note" >
          <p>	您确定要删除该科目吗？</p>
          <p>删除后不可恢复！</p>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <span class="btn" :style="{background:skin_color}" @click="sureDelete">确定</span>
        <span class="btn" @click="dialogVisibleDelete = false">取消</span>
      </div>
    </el-dialog>
	</div>
</template>

<script>
import { mapState } from "vuex";
import closeBtn from "../closeTab";
import urls from '../../api/unsplash/url'
import utility from '../../api/baseUtility'
export default {
    data() {
        return {
          dialogVisibleDelete:false,
            fuTypeShow: false,
            shuTypeShow: false,
            waiTypeShow: false,
            dialogVisible: false,
            filter: "资产",
            tableDataxx:[],
            tableData: [],
            form: {
                subjectCode: "",
                subjectName: "",
                superior: "",
                subjectTypeId: "1",
                balanceDirection: "",
                fuType:[],
                shuType:[],
                waiType:[],
                fu: { type: [], content: "" },
                shu: { unit: "" },
                wai: { type: [] }
            },
            seldefine: [],
            currentPage: 1,
            pageCount: 5,
            currentRow: null,
          deleteSubjectId:'',
          typeDisable:true,
          batchDeleteList:[]
        };
    },
    computed: {
        ...mapState(["skin_style", "skin_color"])
    },
    methods: {
        showChange(type) {
					if(this.form[type].length){
						this[type+'Show']=true
					}else{
						this[type+'Show']=false
					}
        },
				showAdd(type){
          this.dialogVisible=true
          this.currencyList()
          if(type === '0'){ //新增父级节点
             this.form.superior = '无上级科目'
            this.typeDisable = false;
          }else{ //新增子集节点

          }
				},
				showEdit(){
					this.dialogVisible=true
				},
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        setCurrent(row) {
          this.$refs.singleTable.setCurrentRow(row);
        },
        selectCurrentChange(val) {
          this.currentRow = val;
        },
        selectionChange(val){
          console.log(val)
          for (let i = 0; i < val.length; i++) {
            this.batchDeleteList.push({
              subjectId:val[i].subjectId,
              accountId:'1'
            })
          }
          console.log(this.batchDeleteList)
        },
        addRow(index, tableData) {
            console.log("添加" + index);
        },
        editRow(index, tableData) {
            console.log("编辑" + index);
        },
        batchDelete(){
          if(this.batchDeleteList.length === 0){
            this.$message({ message: '请选择你要删除的科目!', type:'waring' });
          }else{
            this.dialogVisibleDelete = true;
          }
        },
        deleteRow(subjectId) {
          this.dialogVisibleDelete = true
          this.deleteSubjectId = subjectId
        },
        sureDelete(){
          if(this.batchDeleteList.length === 0){
            this.subjectDelete();
          }else{
            this._subjectBatchDelete()
          }
        },
        filterChange(value) {
            console.log(value);
            let _id='';
            if(value === '资产'){_id = 'D1'}
            else if(value === '负债'){_id = 'D2'}
            else if(value === '权益'){_id = 'D3'}
            else if(value === '成本'){_id = 'D4'}
            else if(value === '损益'){_id = 'D5'}
            this.subjectSelectList(_id)
        },

      async subjectSelectList(id = 'D1'){
          console.log(id)
        try {
          let params = utility.baseEncode({
            "accountId": "1",
            "subjectTypeId": id
          },urls.subjectSelectList)
          let res = await this.$api.unsplash.baseInterface(params)
          if(res.data && res.data.content){
            let _resData = utility.baseDecode(res.data.content)//解密
            if(_resData && _resData.length > 0){
              let data = this.XXX(_resData,'0');
              for (let i = 0; i < data.length; i++) {
                data[i].balanceDirection = data[i].balanceDirection==0?'借':'贷'
              }
              this.tableData = [...data]
            }
          }
        }catch (e) {
          console.log(e)
        }
      },
      async subjectDelete(){
        try {
          let params = utility.baseEncode({
            "subjectId": this.deleteSubjectId,
            "accountId": "1"
          },urls.subjectDelete)
          let res = await this.$api.unsplash.baseInterface(params)
          console.log(res)
          if(res.returnStatus.message){
            this.$message({ message: utility.baseDecode2(res.returnStatus.message), type: `res.returnStatus.code == '0000' ? 'success' : 'error'` });
          }
        }catch (e) {
          console.log(e)
        }
      },
      async _subjectBatchDelete(){
        try {
          let params = utility.baseEncode(this.batchDeleteList,urls.subjectDelete)
          let res = await this.$api.unsplash.baseInterface(params)
          console.log(res)
          if(res.returnStatus.message){
            console.log(res.returnStatus.message)
            console.log('=========================')
            this.$message({ message: utility.baseDecodeSimply(res.returnStatus.message), type: `res.returnStatus.code == '0000' ? 'success' : 'error'` });
          }
        }catch (e) {
          console.log(e)
        }
      },
      async _assisgnList(){
        try {
          let params = utility.baseEncode({
            "accountId": "1"
          },urls.assisttypeSelect)
          let res = await this.$api.unsplash.baseInterface(params)
          console.log(res)
          if(res.data && res.data.content){
            let _resData = utility.baseDecode(res.data.content)//解密
            console.log(_resData)
            this.seldefine = _resData.filter(function (item,index) {
              return item.assistTypeId > 6;
            })
          }
        }catch (e) {
          console.log(e)
        }
      },
      /**
       * 查询币种列表
       */
      async currencyList(){
        try {
          let params = unilt.baseEncode({
            "accountId": "1", // 暂时传默认值
          },urls.currencyList)
          let res = await this.$api.unsplash.baseInterface(params)
          if(res.returnStatus.code != "0000") {
            this.$message.error(unilt.baseDecode2(res.returnStatus.message));
            return;
          }
          if(res.data && res.data.content){
            this.tableDataxx = unilt.baseDecode(res.data.content)//解密
            console.log(this.tableDataxx);
          }
        }catch (e) {
          console.log(e)
        }
      },
      async _subjectInsert(){
        
      },
      saveSubject(){
        let _msg = '';
        if(this.form.code === ''){
          _msg = '请输入科目编码！';
        }else if(this.form.name === ''){
           _msg = '请输入科目名称！';
        }
        if(_msg !== ''){
         this.$message({
            showClose: true,
            message: _msg,
            type: 'warning'
         });
        }else{
          this._subjectInsert();
        }
       
        
      },
      XXX(subjectBalances,type,nodesLists = []){
        let parentsNodes = subjectBalances.filter(function (item,index) {
          return item.parentId == type
        })
        let otherNodes = subjectBalances.filter(function (item,index) {
          return item.parentId != type
        })
        if(parentsNodes.length > 0){
          for (let i = 0; i < parentsNodes.length ; i++) {
            nodesLists.push(parentsNodes[i]);
            this.XXX(otherNodes,parentsNodes[i].subjectId,nodesLists)
          }
        }else{
          console.log('over')
        }
        return nodesLists;
      },
    },
    components: {
        closeBtn
    },
   created(){
      this.subjectSelectList();
      this._assisgnList();
   }
};
</script>

<style lang="scss">
@import "../../assets/css/variable.scss";
#subject {
    .el-col-12 {
        background: #f4f4f4;
    }
    .el-table .cell {
        height: 50px;
        line-height: 50px;
    }
    .el-table__row--striped {
        background-color: #f8f8f8;
    }
    .el-radio-button__inner {
        color: #000;
    }
    .el-radio-group.blue {
        .el-radio-button__orig-radio:checked + .el-radio-button__inner {
            color: white;
            background-color: $blue;
            border-color: $blue;
        }
    }
    .el-radio-group.orange {
        .el-radio-button__orig-radio:checked + .el-radio-button__inner {
            color: white;
            background-color: $orange;
            border-color: $orange;
        }
    }
    .el-radio-group.popular {
        .el-radio-button__orig-radio:checked + .el-radio-button__inner {
            color: white;
            background-color: $popular;
            border-color: $popular;
        }
    }
    .el-radio-group.pink {
        .el-radio-button__orig-radio:checked + .el-radio-button__inner {
            color: white;
            background-color: $pink;
            border-color: $pink;
        }
    }
    .el-radio-group.green {
        .el-radio-button__orig-radio:checked + .el-radio-button__inner {
            color: white;
            background-color: $green;
            border-color: $green;
        }
    }
    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        box-shadow: 0 2px 3px 0 rgba(117, 117, 117, 0.5) !important;
    }

    .el-radio-button__inner:hover {
        color: #000;
    }
    .el-radio-button__inner {
        background: #eaeaea;
        border: 1px solid #fff;
        border-top: 0;
        border-bottom: 0;
    }
    .spe .el-form-item__content {
        margin-left: 0 !important;
    }
    .main-child {
        .el-checkbox + .el-checkbox {
            margin-left: 15px;
        }
        .el-form-item {
            margin-bottom: 0;
        }
        .el-form-item__content {
            line-height: 31px;
        }
        .el-input {
            width: 200px;
        }
    }
    .main-child1 {
        display: inline-block;
        .el-form-item__content {
            display: inline-block;
        }
        .el-form-item {
            height: 40px;
        }
    }
    .bac-gray1 {
        padding-top: 4px;
    }
}
</style>

<style lang="scss" scoped>
@import "../../assets/icon/iconfont.css";
#subject {
    margin-left: 21px;
    margin-right: 21px;
    .filter {
        overflow: hidden;
    }
    .list {
        margin-top: 20px;
        .icon {
            font-size: 22px;
            color: #30aabc;
          cursor: pointer;
        }
        .add {
            font-size: 30px;
        }
        .switch-text {
            margin-left: 14px;
            color: #000;
        }
    }
    .paginationBox {
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .bac-gray {
        background: #f4f4f4;
    }
    .main-child {
        margin-left: 28px;
    }
    .bac-gray + .bac-gray {
        margin-top: 20px;
    }
}

.myDialog .el-dialog__body .el-form .el-form-item.spe{margin-bottom: 0 !important;}
</style>

