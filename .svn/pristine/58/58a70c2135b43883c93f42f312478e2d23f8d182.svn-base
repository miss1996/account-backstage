<template>
	<div id="voucher">
		<el-row>
			<el-col :span="16">
				<h1>凭证模板</h1>
			</el-col>
			<el-col :span="8" align="right">
				<closeBtn></closeBtn>
			</el-col>
		</el-row>
		<div class="list">
			<el-table ref="multipleTable" highlight-current-row @current-change="tableCurrentChange" @selection-change="selectionChange" stripe border :data="tableData" style="width: 100%">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<i class="el-icon-edit-outline icon" :style="{color:skin_color}" @click="editemplateList(scope.row)"></i><!--editRow(scope.$index, tableData)-->
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<i class="el-icon-delete icon" :style="{color:skin_color}"  @click="deleteTemplateList(scope.row)"></i>
					</template>
				</el-table-column>
				<el-table-column prop="voucherTemplateType.templateTypeName" label="类别">
				</el-table-column>
				<el-table-column prop="templateName" class-name="align_left" label="名称">
				</el-table-column>
			</el-table>
		</div>
		<!-- <div class="paginationBox">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :pager-count="pageCount" :page-size="5" layout=" prev, pager, next, total, jumper" :total="50">
			</el-pagination>
			<el-button class="go">确定</el-button>
		</div> -->
		<el-dialog title="编辑模板" :visible.sync="dialogVisible" custom-class="myDialog" width="31%">
			<el-form ref="form" :model="form" label-width="90px">
				<el-form-item label="模板类别" v-if="dialogVisible">
					<el-select v-model="form.value" placeholder="请选择科目类别">
						<el-option :label="item.templateTypeName" :value="item.voucherTemplateTypeId" v-for="(item,index) in tableType" :key="index"></el-option><!--typeNameList-->
						<!-- <el-option label="工资" value="1"></el-option>
						<el-option label="日常支出" value="2"></el-option> -->
						<p @click="openAddType" class="voucher_addType">+新增类别</p>
					</el-select>
				</el-form-item>
				<el-form-item label="模板名称">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<span class="btn" :style="{background:skin_color}" @click="editSave">保存</span>
				<span class="btn" @click="dialogVisible = false">取消</span>
			</div>
		</el-dialog>
		<!--模板类别弹框-->
		<el-dialog title="模板类别" :visible.sync="dialogVisibleType" custom-class="myDialog" width="35%" :before-close="handleClose">
			<div class="dialog-top">
				<el-form ref="formType" :model="formType" label-width="0px">
					<el-form-item label="">
						<el-input v-model="formType.title" ref="inputTitle"></el-input>
					</el-form-item>
			 	</el-form>
			 	<div class="dialog-btn">
					<span class="btn" @click="addTypeSave">保存</span>
					<span class="btn" @click="addTypeCancel">取消</span>
				</div>
			</div>
			<div class="dialog-table">
				<el-table ref="multipleTable" height="350" highlight-current-row @current-change="tableCurrentChange" stripe border :data="tableType" style="width: 100%;">
					<el-table-column label="操作">
						<template slot-scope="scope">
							<i class="el-icon-edit-outline icon" :style="{color:skin_color}" @click="editDialog(scope.row)"></i><!--editRow(scope.$index, tableData)-->
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<i class="el-icon-delete icon" :style="{color:skin_color}" @click="deleteDialog(scope.row)"></i>
						</template>
					</el-table-column>
					<el-table-column prop="templateTypeName" label="类别">
					</el-table-column>
				</el-table>
			</div>
		</el-dialog>
		<el-dialog title="系统提示" :visible.sync="dialogVisibleDelete" custom-class="myDialog" width="417px" class="warning">
			<div class="warning-box">
        <img class="warning-png" src="../../assets/imgs/warning.png" alt="">
        <div class="warning-note" >
          <p>您确定要删除吗？</p>
          <p>删除后不可恢复！</p>
        </div>
      </div>
			<div slot="footer" class="dialog-footer">
				<span class="btn" :style="{background:skin_color}" @click="sureDeleteList">确定</span>
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
					isEdit:false,
					typeNameList:[],
					currentListId:'',
					currentTypeId:'',
					dialogVisible:false, 
					dialogVisibleType:false,
					dialogVisibleDelete:false,
					dialogVisible:false,
					form: {
							type: "",
							name: "",
							value:''
					},
					formType:{
						title: "",
					},
					tableData: [],
					tableType:[],
					currentPage: 1,
					pageSize: 10,
					total: 100,
					pageCount: 5,
					currentRow: null
        };
    },
    computed: {
        ...mapState(["skin_style", "skin_color"])
    },
    components: {
        closeBtn
    },
    methods: {
			handleClose(done){
				//请求类别名
				this.isEdit=false
				done();
				//this._voucherTemplateSelectTypeName()
				this._voucherTemplateSelectTypeList()
			},
			sureDeleteList(){
				if(this.dialogVisibleType){
					//删除模板类别列表
					this._voucherTemplateSelectTypeDelete()
				}else{
					//删除模板列表
					this._voucherTemplateDelete()
				}
				this.dialogVisibleDelete=false
			},
			//删除凭证模板列表
			deleteTemplateList(data){
				this.dialogVisibleDelete=true
				this.currentListId=data.voucherTemplatesId
			},
			//编辑凭证模板列表
			editemplateList(data){
				//console.log(data)
				this.dialogVisible=true
				this.form.name=data.templateName
				this.form.type=data.voucherTemplateType.templateTypeName
				this.form.value=data.voucherTemplateTypeId
				this.currentListId=data.voucherTemplatesId
			},
			openAddType(){
				//this.dialogVisible=false
				this.dialogVisibleType=true
				this._voucherTemplateSelectTypeList()
			},
			editDialog(data){
				this.isEdit=true
				this.$refs.inputTitle.focus();
				this.$refs.inputTitle.select();
				this.currentTypeId=data.voucherTemplateTypeId
				this.formType.title=data.templateTypeName
			},
			deleteDialog(data){
				this.currentTypeId=data.voucherTemplateTypeId
				this.dialogVisibleDelete=true
			},
			// handleSizeChange(val) {
			// 		console.log(`每页 ${val} 条`);
			// },
			// handleCurrentChange(val) {
			// 		console.log(`当前页: ${val}`);
			// },
			editRow(index, tableData) {
					console.log(index);
			},
			deleteRow(index, tableData) {},
			setCurrent(row) {
					this.$refs.multipleTable.setCurrentRow(row);
			},
      tableCurrentChange(val) {
					this.currentRow = val;
			},
      selectionChange(val){
        console.log(val)
			},
			editSave(){
				if(this.form.name==""){
					this.$message({
						message: '请输入模板名称！',
						type: 'warning'
					});
				}else if(this.form.value==""){
					this.$message({
						message: '请选择模板类别！',
						type: 'warning'
					});
				}else{
					this._voucherTemplateEdit()
				}
			},
			addTypeCancel(){
				this.isEdit=false
				this.formType.title=""
			},
			//添加类别,编辑
			addTypeSave(){
				if(this.formType.title==""){
					this.$message({
						message: '请输入类别名称！',
						type: 'warning'
					});
				}else{
					if(this.isEdit){
						//调编辑接口
						this._voucherTemplateSelectTypeUpdate()
					}else{
						//调添加接口
						this._voucherTemplateSelectTypeAdd()
					}
				}
			},
			//凭证模板列表
			async _voucherTemplateList() {
				try {
					let params = utility.baseEncode({
							accountId: "1" // 暂时传默认值
						},urls.voucherTemplateList);
					let res = await this.$api.unsplash.baseInterface(params);
					if (res.returnStatus.code != "0000") {
						this.$message.error(utility.baseDecode2(res.returnStatus.message));
						return;
					}
					if (res.data && res.data.content) {
						let _resData = utility.baseDecode(res.data.content); //解密
						this.tableData=_resData
						//console.log(_resData);
					}
					//类别列表名
					//this._voucherTemplateSelectTypeName()
					//类别列表
					this._voucherTemplateSelectTypeList()
				} catch (e) {
					console.log(e);
				}
			},
			//凭证模板列表编辑
			async _voucherTemplateEdit() {
				try {
					let params = utility.baseEncode({
							accountId: "1", // 暂时传默认值
							voucherTemplatesId:this.currentListId,
							voucherTemplateTypeId:this.form.value,
							templateName:this.form.name
						},urls.voucherTemplateEdit);
					let res = await this.$api.unsplash.baseInterface(params);
					if (res.returnStatus.code != "0000") {
						this.$message.error(utility.baseDecode2(res.returnStatus.message));
						return;
					}else{
						this.$message({
							showClose: true,
							message: '恭喜你，编辑成功',
							type: 'success'
						});
						this.dialogVisible=false
						this._voucherTemplateList();
					}
				} catch (e) {
					console.log(e);
				}
			},
			//凭证模板列表删除
			async _voucherTemplateDelete() {
				try {
					let params = utility.baseEncode({
							accountId: "1", // 暂时传默认值
							"voucherTemplatesId":this.currentListId,
						},urls.voucherTemplateDelete);
					let res = await this.$api.unsplash.baseInterface(params);
					if (res.returnStatus.code != "0000") {
						this.$message.error(utility.baseDecode2(res.returnStatus.message));
						return;
					}else{
						this.$message({
							showClose: true,
							message: '恭喜你，删除成功',
							type: 'success'
						});
						this._voucherTemplateList();
					}
				} catch (e) {
					console.log(e);
				}
			},
			//类别名列表
			async _voucherTemplateSelectTypeName() {
				try {
					let params = utility.baseEncode({
							accountId: "1" // 暂时传默认值
						},urls.voucherTemplateSelectTypeName);
					let res = await this.$api.unsplash.baseInterface(params);
					if (res.returnStatus.code != "0000") {
						this.$message.error(utility.baseDecode2(res.returnStatus.message));
						return;
					}
					if (res.data && res.data.content) {
						let _resData = utility.baseDecode(res.data.content); //解密
						this.typeNameList=_resData
					}
				} catch (e) {
					console.log(e);
				}
			},
			//类别列表
			async _voucherTemplateSelectTypeList() {
				try {
					let params = utility.baseEncode({
							accountId: "1" // 暂时传默认值
						},urls.voucherTemplateSelectTypeList);
					let res = await this.$api.unsplash.baseInterface(params);
					if (res.returnStatus.code != "0000") {
						this.$message.error(utility.baseDecode2(res.returnStatus.message));
						return;
					}
					if (res.data && res.data.content) {
						let _resData = utility.baseDecode(res.data.content); //解密
						this.tableType=_resData
					}
				} catch (e) {
					console.log(e);
				}
			},
			//类别新增
			async _voucherTemplateSelectTypeAdd() {
				try {
					let params = utility.baseEncode({
							accountId: "1", // 暂时传默认值
							"templateTypeName":this.formType.title,
						},urls.voucherTemplateSelectTypeAdd);
					let res = await this.$api.unsplash.baseInterface(params);
					if (res.returnStatus.code != "0000") {
						this.$message.error(utility.baseDecode2(res.returnStatus.message));
						return;
					}else{
						this.$message({
							showClose: true,
							message: '恭喜你，添加成功',
							type: 'success'
						});
						this.formType.title=""
						this._voucherTemplateSelectTypeList();
					}
				} catch (e) {
					console.log(e);
				}
			},
			//类别删除
			async _voucherTemplateSelectTypeDelete() {
				try {
					let params = utility.baseEncode({
							accountId: "1", // 暂时传默认值
							"voucherTemplateTypeId":this.currentTypeId,
						},urls.voucherTemplateSelectTypeDelete);
					let res = await this.$api.unsplash.baseInterface(params);
					if (res.returnStatus.code != "0000") {
						this.$message.error(utility.baseDecode2(res.returnStatus.message));
						return;
					}else{
						this.$message({
							showClose: true,
							message: '恭喜你，删除成功',
							type: 'success'
						});
						this._voucherTemplateSelectTypeList();
					}
				} catch (e) {
					console.log(e);
				}
			},
			//类别编辑
			async _voucherTemplateSelectTypeUpdate() {
				try {
					let params = utility.baseEncode({
							accountId: "1", // 暂时传默认值
							"voucherTemplateTypeId":this.currentTypeId,
							"templateTypeName":this.formType.title,
						},urls.voucherTemplateSelectTypeUpdate);
					let res = await this.$api.unsplash.baseInterface(params);
					if (res.returnStatus.code != "0000") {
						this.$message.error(utility.baseDecode2(res.returnStatus.message));
						return;
					}else{
						this.$message({
							showClose: true,
							message: '恭喜你，删除成功',
							type: 'success'
						});
						this.formType.title=""
						this._voucherTemplateSelectTypeList();
					}
					this.isEdit=false
				} catch (e) {
					console.log(e);
				}
			},
		},
		mounted(){
			this._voucherTemplateList()
		},
};
</script>

<style lang="scss">
	#voucher {
		.el-table .cell {
			height: 50px;
			line-height: 50px;
		}
		.el-table--enable-row-transition .el-table__body td {
			&:last-child {
				text-align: left;
				padding-left: 15px;
			}
		}
		.dialog-top{
			overflow:hidden;
			margin-bottom:30px;
			.el-form{
				float:left;
			}
			.dialog-btn{
				float:right;
				.btn{
					display: inline-block;
					height: 36px;
					line-height: 36px;
					border: 1px solid #D8DCE5;
					background: #fafdff;
					border-radius: 2px;
				  padding: 0 15px;
					cursor: pointer;
    			font-size: 13px;
				}
			}
		}
	}
	.voucher_addType{
		height: 38px;
		line-height:41px;
		padding: 0 20px;
		font-size: 16px;
		cursor: pointer;
	}
</style>


<style lang="scss" scoped>
#voucher {
    margin: 20px 35px 0 27px;
    /*background: #f4f4f4;*/
    h1 {
        margin-left: 32px;
        font-size: 20px;
        color: #333333;
        font-weight: 700;
    }
    .list {
        margin-top: 20px;
        margin-bottom: 20px;
        .icon {
            font-size: 22px;
            color: #30aabc;
        }
    }
}
</style>

