<template>
	<div id="customer">
		<div class="filter">
			<el-col :span="16">
				<el-radio-group v-model="filter" size="medium" :class="skin_style" @change="filterChange">
					<el-radio-button v-for="(item,index) in assistTypeList" :key="index" :name="item.value" :label="item.name"></el-radio-button>
				</el-radio-group>
				<el-select class="option filter-border vertical-center" v-model="selectedOption" placeholder="选择自定义辅助核算" @change="changeType">
					<el-option v-for="item in zdyArray" :key="item.assistTypeId" :label="item.name" :value="item.assistTypeId">
					</el-option>
				</el-select>
				<el-input class="vertical-center" v-model="inputContent" placeholder="按编号，名称等查询"></el-input>
				<el-button class="vertical-center" type="primary" :btnType="`${skin_style}_btn`" @click="selectList">查询</el-button>
			</el-col>
			<el-col :span="8" align="right" class="right_top">
				<el-row class="btn-box">
					<el-button type="primary" :btnType="`${skin_style}_btn`" @click="add">新增</el-button>
					<el-button type="primary" :btnType="`${skin_style}_btn`" @click="deletes">删除</el-button>
					<!-- <el-button type="primary" :btnType="`${skin_style}_btn`">更多</el-button> -->
					<closeBtn></closeBtn>
				</el-row>
			</el-col>
		</div>
		<div class="list">
			<el-table ref="multipleTable" highlight-current-row @current-change="handleCurrentChange" @selection-change="handleSelectionChange" stripe border :data="tableData" style="width: 100%">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="code" class-name="align_left" label="编码">
				</el-table-column>
				<el-table-column prop="name" class-name="align_left" label="名称">
				</el-table-column>
				<el-table-column v-if="this.$route.query.accountParam==5" prop="spec" class-name="align_left" label="规格">
				</el-table-column>
				<el-table-column v-if="this.$route.query.accountParam==5" prop="unit" class-name="align_left" label="单位">
				</el-table-column>
				<el-table-column prop="state" label="状态">
					<template slot-scope="scope">
						<el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" :active-color="skin_color" inactive-color="#999999" :class="skin_style" @change="changeStatus(scope.row)">
						</el-switch>
						<span class="switch-text" v-if="scope.row.status == 1">已开启</span>
						<span class="switch-text" v-else>已禁用</span>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<i :style="{color:skin_color}" class="el-icon-edit-outline icon" @click="editItem(scope.row)"></i>
						<!-- @click="editRow(scope.$index, tableData)"-->
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<i :style="{color:skin_color}" class="el-icon-delete icon" @click="deleteRow(scope.row)"></i>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- <div class="paginationBox">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :pager-count="pageCount" :page-size="5" layout=" prev, pager, next, total, jumper" :total="50">
			</el-pagination>
			<el-button class="go">确定</el-button>
		</div> -->
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" custom-class="myDialog" width="30%">
			<el-form ref="form" :model="form" label-width="60px">
				<el-form-item label="编码:">
					<el-input v-model="form.code"></el-input>
				</el-form-item>
				<el-form-item label="名称:">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<span class="btn" :style="{background:skin_color}" @click="saveList">保存</span>
				<span class="btn" @click="dialogVisible = false;">取消</span>
			</div>
		</el-dialog>
		<!--确认删除弹框-->
		<el-dialog title="系统提示" :visible.sync="dialogVisibleDelete" custom-class="myDialog" width="417px" class="warning">
			<div class="warning-box">
				<img class="warning-png" src="../../assets/imgs/warning.png" alt="">
				<div class="warning-note">
					<p>您确定要删除该辅助核算吗？</p>
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
import unilt from "../../api/baseUtility";
import urls from "../../api/unsplash/url";
export default {
	data() {
		return {
			zdyArray:[],
			currentAssistTypeId:this.$route.query.accountParam,
			defaultStatus:1,
			currentAssistId:'',
			dialogTitle:'新增'+this.$route.query.myname,
			isEdit:false,
			dialogVisibleDelete: false,
			dialogVisible: false,
			filter: this.$route.query.myname,
			form: {
				code: "",
				name: ""
			},
			tableData: [],
			currentPage: 1,
			pageCount: 5,
			assistTypeList:[
				{name:'客户',ssistTypeId:'1'},
				{name:'供应商',assistTypeId:'2'},
				{name:'项目',assistTypeId:'3'},
				{name:'职员', assistTypeId:'4'},
				{name:'存货',assistTypeId:'5'},
				{name:'部门',assistTypeId:'6'}
			],
			selectedOption: this.$route.query.accountParam >6?this.$route.query.accountParam:'',
			arrayId:[],
			multipleSelection: [],
			inputContent: "",
			currentRow: null
		};
	},
	computed: {
		...mapState(["skin_style", "skin_color",'assistArray'])
	},
	methods: {
		changeType(date){
			this.currentAssistTypeId=date
			this.inputContent=''
			this._assistList()
		},
		selectList(){
			this._assistList(this.inputContent)
		},
		sureDelete(){
			this._assistDelete(this.arrayId)
		},
		changeStatus(data){
			this.currentAssistId=data.assistId;
		  this.form.code=data.code;
			this.form.name=data.name;
			this.defaultStatus=data.status;
			this._assistUpdated();
		},
		deletes() {
			if (this.multipleSelection.length == 0) {
				this.$message({
					message: "请选择要删除的数据！",
					type: "warning"
				});
			} else {
				this.dialogVisibleDelete = true;
				//console.log(this.multipleSelection)
				this.arrayId=this.multipleSelection.map(function(item) {
					return item.assistId
				});
			}
		},
		editItem(data) {
			//console.log(data)
			this.currentAssistId=data.assistId
			this.dialogVisible = true;
			this.isEdit=true;
			this.dialogTitle="编辑辅助核算";
			this.form.code=data.code
			this.form.name=data.name
		},
		add() {
			this.dialogVisible = true;
			this.isEdit=false;
			this.dialogTitle='新增'+this.$route.query.myname;
			this.form.code=''
			this.form.name=''
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		},
		deleteRow(data) {
			//console.log(data)
			this.arrayId=[]
			this.arrayId.push(data.assistId)
			this.dialogVisibleDelete=true
				//console.log("删除" + index);
		},
		filterChange(value) {
			if(value=="客户"){
				this.currentAssistTypeId='1'
			}else if(value=='供应商'){
				this.currentAssistTypeId='2'
			}else if(value=='项目'){
				this.currentAssistTypeId='3'
			}else if(value=='职员'){
				this.currentAssistTypeId='4'
			}else if(value=='存货'){
				this.currentAssistTypeId='5'
			}else if(value=='部门'){
				this.currentAssistTypeId='6'
			}
			this.inputContent=''
			this.selectedOption=''
			this.$store.commit('ASSIST',{name:'accountCustomer',title:value})
		  this._assistList()
		},
		setCurrent(row) {
				this.$refs.singleTable.setCurrentRow(row);
		},
		handleCurrentChange(val) {
				this.currentRow = val;
		},
		handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(this.multipleSelection);
		},
		saveList(){
			if(this.form.code==""){
				this.$message({
					message: '请输入编码！',
					type: 'warning'
				});
			}else if(this.form.name==""){
				this.$message({
					message: '请输入名称！',
					type: 'warning'
				});
			}else{
				if(this.isEdit){
					this._assistUpdated()
				}else{
					this._assistAdd()
				}
			}
		},
		//列表
		async _assistList(inutText) {
			try {
				let params
				if(inutText){
					params = unilt.baseEncode({
						assistTypeId:this.currentAssistTypeId,
						name:inutText
					},urls.assistList);
				}else{
					params = unilt.baseEncode({
						assistTypeId:this.currentAssistTypeId
					},urls.assistList);
				}
				let res = await this.$api.unsplash.baseInterface(params);
				if (res.returnStatus.code != "0000") {
					this.$message.error(res.returnStatus.message);
					return;
				}
				//console.log(res)
				if (res.data && res.data.content) {
					let _resDate = unilt.baseDecode(res.data.content); //解密
					//console.log(_resDate);
					this.tableData=_resDate
				}
			} catch (e) {
				console.log(e);
			}
		},
		//新增明细列表
		async _assistAdd() {
			try {
				let params = unilt.baseEncode({
					accountId:'1', // 
					assistTypeId: this.$route.query.accountParam,
					code: this.form.code,
					name: this.form.name,
					status: this.defaultStatus,//新增的默认值都是1
				},urls.assistAdd);
				let res = await this.$api.unsplash.baseInterface(params);
				//console.log(res)
				if (res.returnStatus.code != "0000") {
					this.$message.error( unilt.baseDecode(res.returnStatus.message));
					return;
				}else{
					this.$message({
						showClose: true,
						message: '恭喜你，添加成功',
						type: 'success'
					});
					this.dialogVisible=false;
					this._assistList();
				}
			} catch (e) {
				console.log(e);
			}
		},
		//修改明细列表
		async _assistUpdated() {
			try {
				let params = unilt.baseEncode({
					accountId:"1",
					assistId: this.currentAssistId,
					assistTypeId: this.$route.query.accountParam,
					code: this.form.code,
					name: this.form.name,
					status: this.defaultStatus,
				},urls.assistUpdate);
				let res = await this.$api.unsplash.baseInterface(params);
				//console.log(res)
				if (res.returnStatus.code != "0000") {
					this.$message.error( unilt.baseDecode(res.returnStatus.message));
					return;
				}else{
					this.$message({
						showClose: true,
						message: '恭喜你，修改成功',
						type: 'success'
					});
					this.dialogVisible=false;
					this._assistList();
				}
			} catch (e) {
				console.log(e);
			}
		},
		//删除明细列表
		async _assistDelete(dataId) {
			try {
				let params = unilt.baseEncode(dataId,urls.assistDelete);
				let res = await this.$api.unsplash.baseInterface(params);
				//console.log(res)
				if (res.returnStatus.code != "0000") {
					this.$message.error( unilt.baseDecode(res.returnStatus.message));
					return;
				}else{
					this.$message({
						showClose: true,
						message: '恭喜你，删除成功',
						type: 'success'
					});
					this.dialogVisibleDelete=false;
					this._assistList();
				}
			} catch (e) {
				console.log(e);
			}
		},
	},
	components: {
		closeBtn
	},
	created() {
		this.zdyArray=JSON.parse(sessionStorage.getItem('assist'))
		let _param = this.$route.query;
		// this.$router.options.routes.children
		//console.log(_param);
		this._assistList()
	}
};
</script>

<style lang="scss">
@import "../../assets/css/variable.scss";
#customer {
	.filter .el-input__inner {
		height: 39px;
		border: 1px solid #d8dce5;
		border-radius: 2px;
		color: black;
	}
	.filter .el-input {
		width: 206px;
		margin-left: 13px;
		height: 39px;
	}
	.el-col-12 {
		background: #f4f4f4;
	}
	.el-table .cell {
		height: 50px;
		line-height: 50px;
	}
	.el-table td {
		&:nth-child(2),
		&:nth-child(3) {
			text-align: left;
			padding-left: 20px;
		}
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
}
</style>

<style lang="scss" scoped>
@import "../../assets/icon/iconfont.css";
#customer {
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
	.vertical-center {
		vertical-align: middle;
	}
}
</style>

