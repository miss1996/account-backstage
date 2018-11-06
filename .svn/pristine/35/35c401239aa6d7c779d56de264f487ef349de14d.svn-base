<template>
	<div id="paper" class="public-container">
		<el-row>
			<el-col align="right" :span="24">
				<el-row class="btn-box">
					<el-button type="primary" :btnType="`${skin_style}_btn`" @click="addTemplate">导入模板</el-button>
					<closeBtn></closeBtn>
				</el-row>
			</el-col>
		</el-row>
		<div class="list">
			<el-table stripe border :data="tableData" ref="singleTable" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
				<el-table-column prop="title" class-name="align_left" label="名称">
				</el-table-column>
				<el-table-column prop="category" label="类别">
				</el-table-column>
				<el-table-column prop="template" label="模板类型">
				</el-table-column>
				<el-table-column prop="default" label="默认模板">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<i class="el-icon-edit-outline icon" :style="{color:skin_color}" @click="editType"></i>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<i class="el-icon-download icon" :style="{color:skin_color}" @click="downloadRow(scope.$index, tableData)"></i>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<i class="el-icon-delete icon" :style="{color:skin_color}" @click="deleteRow(scope.$index, tableData)"></i>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="paginationBox">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage2" :pager-count="pageCount" :page-size="5" layout=" prev, pager, next, total, jumper" :total="50">
			</el-pagination>
			<el-button class="go">确定</el-button>
		</div>
		<el-dialog title="编辑套打模版" :visible.sync="dialogVisible" custom-class="myDialog" width="31%">
			<el-form ref="form" :model="form" label-width="90px">
				<el-form-item label="名称">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="是否默认">
					<el-radio-group v-model="form.moren">
						<el-radio label="是"></el-radio>
						<el-radio label="否"></el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<span class="btn" :style="{background:skin_color}">保存</span>
				<span class="btn" @click="dialogVisible = false">取消</span>
			</div>
		</el-dialog>
		<!--导入模板-->
		<el-dialog title="导入套打模版" :visible.sync="dialogVisibleAdd" custom-class="myDialog" width="32%">
			<el-form ref="formAdd" :model="formAdd" label-width="90px">
				<el-form-item label="模板类别">
					<el-input v-model="formAdd.type"></el-input>
				</el-form-item>
				<el-form-item label="模板文件">
					<input type="text" name="file-path" v-model="formAdd.fileName" id="file-path" class="ui-input" readonly="" autocomplete="false">
					<div class="webuploader-pick">
						<span>浏览</span>
						<input type="file" capture="camera" name="file" @change="changeFile" class="webuploader-element-invisible" multiple="multiple" accept="application/xls,application/xlsx">
					</div>
				</el-form-item>
				<el-form-item label="模板名称">
					<el-input v-model="formAdd.name"></el-input>
				</el-form-item>
				<el-form-item label="模板描述">
					<el-input v-model="formAdd.desc"></el-input>
				</el-form-item>
				<el-form-item label="模板编码">
					<el-input v-model="formAdd.code"></el-input>
				</el-form-item>
				<el-form-item label="默认模板">
					<el-radio-group v-model="form.moren">
						<el-radio label="是"></el-radio>
						<el-radio label="否"></el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<span class="btn" :style="{background:skin_color}">保存</span>
				<span class="btn" @click="dialogVisibleAdd = false">取消</span>
			</div>
		</el-dialog>

		<!--确认删除弹框-->
		<el-dialog title="系统提示" :visible.sync="dialogDelete" custom-class="myDialog" width="417px" class="warning">
			<div class="warning-box">
				<img class="warning-png" src="../../assets/imgs/warning.png" alt="">
				<div class="warning-note">
					<p>您确定要删除该模板吗？</p>
					<p>删除后不可恢复！</p>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<span class="btn" :style="{background:skin_color}">确定</span>
				<span class="btn" @click="dialogDelete = false">取消</span>
			</div>
		</el-dialog>

	</div>
</template>

<script>
import { mapState } from "vuex";
import closeBtn from "../closeTab";
export default {
    data() {
        return {
            dialogDelete: false,
            dialogVisible: false,
            dialogVisibleAdd: false,
            form: {
                name: "",
                moren: false
            },
            formAdd: {
                type: "",
                fileName: "",
                name: "",
                desc: "",
                cede: "",
                moren: false
            },
            // titles: ["名称", "类别", "模板类型", "默认模板", "操作"],
            tableData: [
                {
                    title:
                        "通用模板（适用240*140 240*120 210*120 210*140的空白纸）",
                    category: "凭证",
                    template: "自定义模板",
                    default: "是"
                },
                {
                    title:
                        "通用模板（适用240*140 240*120 210*120 210*140的空白纸）",
                    category: "凭证",
                    template: "自定义模板",
                    default: "是"
                },
                {
                    title:
                        "通用模板（适用240*140 240*120 210*120 210*140的空白纸）",
                    category: "凭证",
                    template: "自定义模板",
                    default: "是"
                },
                {
                    title:
                        "通用模板（适用240*140 240*120 210*120 210*140的空白纸）",
                    category: "凭证",
                    template: "自定义模板",
                    default: "是"
                },
                {
                    title:
                        "通用模板（适用240*140 240*120 210*120 210*140的空白纸）",
                    category: "凭证",
                    template: "自定义模板",
                    default: "是"
                },
                {
                    title:
                        "通用模板（适用240*140 240*120 210*120 210*140的空白纸）",
                    category: "凭证",
                    template: "自定义模板",
                    default: "是"
                },
                {
                    title:
                        "通用模板（适用240*140 240*120 210*120 210*140的空白纸）",
                    category: "凭证",
                    template: "自定义模板",
                    default: "是"
                },
                {
                    title:
                        "通用模板（适用240*140 240*120 210*120 210*140的空白纸）",
                    category: "凭证",
                    template: "自定义模板",
                    default: "是"
                },
                {
                    title:
                        "通用模板（适用240*140 240*120 210*120 210*140的空白纸）",
                    category: "凭证",
                    template: "自定义模板",
                    default: "是"
                },
                {
                    title:
                        "通用模板（适用240*140 240*120 210*120 210*140的空白纸）",
                    category: "凭证",
                    template: "自定义模板",
                    default: "是"
                }
            ],
            currentPage2: 1,
            pageCount: 5,
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
        addTemplate() {
            this.dialogVisibleAdd = true;
        },
        editType() {
            this.dialogVisible = true;
        },
        changeFile(e) {
            console.log(e);
            this.fileName = "测试文件.xlsx";
            // if(e.files && e.files[0] ){
            //   file = e.files[0];
            //   var reader=new FileReader();
            //   reader.readAsDataURL(file);
            //
            // }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        editRow(index, tableData) {},
        downloadRow(index, tableData) {},
        deleteRow(index, tableData) {
            this.dialogDelete = true;
        },
        setCurrent(row) {
            this.$refs.singleTable.setCurrentRow(row);
        },
        handleCurrentChange(val) {
            this.currentRow = val;
        }
    }
};
</script>


<style lang="scss" scoped>
@import "../../assets/css/variable";
@import "../../assets/css/table_1.scss";
#paper {
    .list {
        margin-top: 20px;
        margin-bottom: 20px;
        .icon {
            font-size: 22px;
            color: #30aabc;
            &:hover {
                cursor: pointer;
            }
        }
    }
}
</style>

<style lang="scss">
#paper {
    .el-table .cell {
        height: 50px;
        line-height: 50px;
    }
    .ui-input {
        width: 330px;
        height: 35px;
        border-radius: 4px;
        vertical-align: middle;
        padding-left: 10px;
        border: 1px solid #ccc;
    }
    .webuploader-element-invisible {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 999;
    }
    .webuploader-pick {
        display: inline-block;
        width: 60px;
        height: 35px;
        padding: 0;
        line-height: 34px;
        background-color: #fafdff;
        color: #0089bd;
        border: 1px solid #ccc;
        font-size: 13px;
        position: relative;
        text-align: center;
        border-radius: 3px;
        overflow: hidden;
        cursor: pointer;
        vertical-align: middle;
    }
}
</style>


