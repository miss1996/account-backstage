<template>
	<div id="proofWords" class="public-container">
		<el-row>
			<el-col align="right" :span="24">
				<el-row class="btn-box">
					<el-button type="primary" :btnType="`${skin_style}_btn`" @click="add">新增</el-button>
					<closeBtn></closeBtn>
				</el-row>
			</el-col>
		</el-row>
		<div class="list" id="out-table">
			<el-table stripe border :data="tableData" ref="singleTable" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
				<el-table-column prop="voucherWord" label="凭证字">
				</el-table-column>
				<el-table-column prop="pringTitle" label="打印标题">
				</el-table-column>
				<el-table-column prop="isDefault" :formatter="isDefault" label="是否默认">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<i class="el-icon-edit-outline icon" :style="{color:skin_color}" @click="edit(scope.row)"></i>
						<!--editRow(scope.$index, tableData)-->
						&nbsp;&nbsp;&nbsp;&nbsp;
						<i class="el-icon-delete icon" :style="{color:skin_color}" @click="deleteWord(scope.row)"></i>
						<!--&nbsp;&nbsp;&nbsp;
						<i class="iconfont icon-shangyi" :style="{color:skin_color}" @click="deleteRow(scope.$index, tableData)"></i>
						&nbsp;&nbsp;&nbsp;
						<i class="iconfont icon-xiayi" :style="{color:skin_color}" @click="deleteRow(scope.$index, tableData)"></i> -->
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" custom-class="myDialog" width="31%" :before-close="cancel">
			<el-form ref="form" :model="form" label-width="90px">
				<el-form-item label="凭证字:">
					<el-input v-model="form.voucherWord"></el-input>
				</el-form-item>
				<el-form-item label="打印标题:">
					<el-input v-model="form.pringTitle"></el-input>
				</el-form-item>
				<el-form-item label="是否默认">
					<el-radio-group v-model="form.isDefault">
						<el-radio label="1">是</el-radio>
						<el-radio label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<span class="btn" :style="{background:skin_color}" @click="save(form)">保存</span>
				<span class="btn" @click="cancel">取消</span>
			</div>
		</el-dialog>
		<el-dialog title="系统提示" :visible.sync="dialogVisibleDelete" custom-class="myDialog" width="417px" class="warning" :before-close="cancelWarn">
			<div class="warning-box">
				<img class="warning-png" src="../../assets/imgs/warning.png" alt="">
				<div class="warning-note">
					<p>您确定要删除吗？</p>
					<p>删除后不可恢复！</p>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<span class="btn" :style="{background:skin_color}" @click="deleteNote">确定</span>
				<span class="btn" @click="cancelWarn">取消</span>
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
			firstDefalute:'',
			lastDefalute:'',
			dialogTitle:'新增凭证字',
			dialogVisible: false,
			dialogVisibleDelete: false,
			form: {
				voucherWord: "",
				pringTitle: "",
				isDefault: "0"
			},
			tableData: [],
			currentRow: null
		};
	},
	components: {
		closeBtn
	},
	computed: {
		...mapState(["skin_style", "skin_color"])
	},
	methods: {
		add() {
			this.dialogVisible = true;
		},
		save(data) {
			this.lastDefalute=data.isDefault;
			if(data.voucherWord==""){
				this.$message({
					message: '请输入凭证字！',
					type: 'warning'
				});
			}else if(data.pringTitle==""){
				this.$message({
					message: '请输入打印标题！',
					type: 'warning'
				});
			}else{
				if (data.voucherWordId) {
				// 编辑
					if(this.firstDefalute=='1'&&this.lastDefalute=='0'){
						 this.$message({
							message: '请确保至少有一个默认的凭证字',
							type: 'error'
						});
						return false;
					}else{
						this.editProofWords(data);
					}
				} else {
					// 新增
					this._insertProofWords(data);
				}
				this.dialogTitle="新增凭证字"
				this.dialogVisible = false;
				this.reset();
			}
		},
		cancel() {
			console.log("cancel");
			this.reset();
			this.dialogVisible = false;
			this.dialogTitle="新增凭证字"
		},
		cancelWarn() {
			this.reset();
			this.dialogVisibleDelete = false;
		},
		edit(data) {
			this.firstDefalute=data.isDefault;
			console.log(data)
			this.dialogTitle="编辑凭证字"
			this.form.voucherWord = data.voucherWord;
			this.form.voucherWordId = data.voucherWordId;
			this.form.pringTitle = data.pringTitle;
			this.form.isDefault = data.isDefault;
			this.form.accountId = data.accountId;
			this.dialogVisible = true;
			// this.reset();
		},
		deleteWord(data) {
			this.form = data;
			this.dialogVisibleDelete = true;
		},
		deleteNote() {
			if(this.form.isDefault=="1"){
				 this.$message({
					message: '默认凭证字不能被删除',
					type: 'error'
				});
			}else{
				this.deleteProofWords(this.form);
			}
			this.dialogVisibleDelete = false;
			this.reset();
		},
		editRow(index, tableData) {},
		downloadRow(index, tableData) {},
		deleteRow(index, tableData) {},
		setCurrent(row) {
			this.$refs.singleTable.setCurrentRow(row);
		},
		handleCurrentChange(val) {
			this.currentRow = val;
		},
		outExe() {
			this.$confirm("此操作将导出excel文件, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			}).then(() => {
				this.excelData = this.dataList; //你要导出的数据list。
				this.export2Excel();
			}).catch(() => {});
		},
		export2Excel() {
			var that = this;
			require.ensure([], () => {
				const {
						export_json_to_excel
				} = require("../../assets/vendor/Export2Excel"); //这里必须使用绝对路径
				const tHeader = [
						"id",
						"withNum",
						"userId",
						"name",
						"amount",
						"status",
						"amountIn",
						"amountSuccess",
						"createTime"
				]; // 导出的表头名
				const filterVal = [
						"id",
						"withNum",
						"userId",
						"name",
						"amount",
						"status",
						"amountIn",
						"amountSuccess",
						"createTime"
				]; // 导出的表头字段名
				const list = that.excelData;
				const data = that.formatJson(filterVal, list);
				let time1,
					time2 = "";
				if (this.start !== "") {
					time1 = that.moment(that.start).format("YYYY-MM-DD");
				}
				if (this.end !== "") {
					time2 = that.moment(that.end).format("YYYY-MM-DD");
				}
				export_json_to_excel(
					tHeader,
					data,
					`[${time1}-${time2}]提现管理excel`
				); // 导出的表格名称，根据需要自己命名
			});
		},
		formatJson(filterVal, jsonData) {
			return jsonData.map(v => filterVal.map(j => v[j]));
		},
		isDefault(row, column, cellValue, index) {
			if (cellValue == "1") {
					return "是";
			}
			return "否";
		},
		/**
		 * 查询凭证字列表
		 */
		async proofWordsList() {
			try {
				let params = unilt.baseEncode({
						accountId: "1" // 暂时传默认值
					},urls.proofWordsList);
				let res = await this.$api.unsplash.baseInterface(params);
				if (res.returnStatus.code != "0000") {
					this.$message.error(res.returnStatus.message);
					return;
				}
				if (res.data && res.data.content) {
					this.tableData = unilt.baseDecode(res.data.content); //解密
					console.log(this.tableData);
				}
			} catch (e) {
				console.log(e);
			}
		},
		/**
		 * 新增凭证字
		 */
		async _insertProofWords(data) {
			console.log(data)
			try {
				let params = unilt.baseEncode({
					accountId: "1", // 暂时传默认值
					voucherWord: data.voucherWord,
					pringTitle: data.pringTitle,
					isDefault: data.isDefault
				},urls.insertProofWrods);
				let res = await this.$api.unsplash.baseInterface(params);
				console.log(res)
				if (res.returnStatus.code != "0000") {
					this.$message.error(res.returnStatus.message);
					return;
				}else{
					this.$message({
						showClose: true,
						message: '恭喜你，添加成功',
						type: 'success'
        	});
					this.proofWordsList();
				}
				
			} catch (e) {
				console.log(e);
			}
		},
		/**
		 * 编辑凭证字
		 */
		async editProofWords(data) {
			try {
				let params = unilt.baseEncode(data, urls.editProofWords);
				let res = await this.$api.unsplash.baseInterface(params);
				if (res.returnStatus.code != "0000") {
					this.$message.error(res.returnStatus.message);
				}else{
					this.$message({
						showClose: true,
						message: '恭喜你，编辑成功',
						type: 'success'
        	});
					this.proofWordsList();
				}
				
			} catch (e) {
				console.log(e);
			}
		},
		/**
		 * 删除凭证字
		 */
		async deleteProofWords(data) {
			try {
				let params = unilt.baseEncode({
					voucherWordId: data.voucherWordId,
					accountId: "1" // 暂时传默认值
					},urls.deleteProofWords);
				let res = await this.$api.unsplash.baseInterface(params);
				console.log(res)
				if (res.returnStatus.code != "0000") {
					//this.$message.error(res.returnStatus.message);
					this.$message.error(unilt.baseDecode2(res.returnStatus.message));
					return;
				}else{
					this.$message({
						showClose: true,
						message: '恭喜你，删除成功',
						type: 'success'
        	});
					this.proofWordsList();
				}
			} catch (e) {
				console.log(e);
			}
		},
		/**
		 * 表单数据还原
		 */
		reset() {
			this.form = {
				accountId: "",
				voucherWordId: "",
				voucherWord: "",
				pringTitle: "",
				isDefault: "0"
			};
		}
	},
	mounted() {
		this.proofWordsList();
	}
};
</script>


<style lang="scss" scoped>
@import "../../assets/css/variable";
@import "../../assets/downupIcon/iconfont.css";
#proofWords {
	.list {
		margin-top: 20px;
		margin-bottom: 20px;
		.icon,
		.iconfont {
			font-size: 20px;
			color: #30aabc;
			cursor: pointer;
		}
	}
}
</style>

<style lang="scss">
#proofWords {
  .el-table .cell {
		height: 50px;
		line-height: 50px;
	}
    /*.el-table--enable-row-transition .el-table__body td {*/
    /*&:nth-child(4), &:nth-child(5), &:nth-child(7) {*/
    /*text-align: right;*/
    /*padding-right: 15px;*/
    /*}*/
    /*}*/
}
</style>

