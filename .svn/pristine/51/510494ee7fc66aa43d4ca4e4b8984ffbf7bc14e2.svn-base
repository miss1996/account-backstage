<template>
  <div id="currency" class="public-container">
    <el-row>
      <el-col align="right" :span="24">
        <el-row class="btn-box">
          <el-button type="primary" :btnType="`${skin_style}_btn`" @click="addType">新增</el-button>
          <closeBtn></closeBtn>
        </el-row>
      </el-col>
    </el-row>

    <div class="list">
      <el-table
        stripe
        border
        ref="singleTable"
        highlight-current-row
        @current-change="handleCurrentChange"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="code"
          class-name="align_left"
          label="编码">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="rate"
          class-name="align_right"
          label="汇率">
        </el-table-column>
        <el-table-column
          prop="isStandard"
          :formatter="isStandardMondey"
          label="是否本位币">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <i class="el-icon-edit-outline icon" :style="{color:skin_color}" @click="editType(scope.row)"></i>
            <i v-if="scope.row.isStandard != 1" class="el-icon-delete icon" :style="{color:skin_color}" style="margin-left: 30px" @click="deleteType(scope.row)"></i>
            <i v-else style="width:22px;display:inline-block;"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--新增弹框-->
    <el-dialog title="新增币别" :visible.sync="dialogVisible" :close-on-click-modal='false' custom-class="myDialog" width="30%">
			<el-form ref="currencyForm" :model="currencyForm" :rules="insertRules"  label-width="70px">
				<el-form-item label="编码:" prop="code">
					<el-input v-model="currencyForm.code" :disabled="isRMB"></el-input>
				</el-form-item>
				<el-form-item label="币别:" prop="name">
					<el-input v-model="currencyForm.name"></el-input>
				</el-form-item>
				<el-form-item label="汇率:" prop="rate">
					<el-input v-model="currencyForm.rate" :disabled="isRMB"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<span class="btn" :style="{background:skin_color}" @click="save('currencyForm')">保存</span>
				<span class="btn" @click="dialogVisible = false">取消</span>
			</div>
		</el-dialog>
    <!--确认删除弹框-->
    <el-dialog title="系统提示" :visible.sync="dialogVisibleDelete" custom-class="myDialog" width="417px" class="warning">
			<div class="warning-box">
        <img class="warning-png" src="../../assets/imgs/warning.png" alt="">
        <div class="warning-note" >
          <p>您确定要删除该币别吗？</p>
          <p>删除后不可恢复！</p>
        </div>
      </div>
			<div slot="footer" class="dialog-footer">
				<span class="btn" :style="{background:skin_color}" @click="deleteCurrency">确定</span>
				<span class="btn" @click="dialogVisibleDelete = false">取消</span>
			</div>
		</el-dialog>
  </div>
</template>

<script>
  import { mapState, } from 'vuex'
  import closeBtn from '../closeTab'
  import unilt from '../../api/baseUtility'
  import urls from '../../api/unsplash/url'
  export default {
    data() {
      return {
        dialogVisible:false,
        dialogVisibleDelete:false,
        currencyForm: {
          code: "",
          name: "",
          rate: "",
          accountId:'',
          currencyId:''
        },
        isRMB:false,
        currencyOpera:'',
        tableData: [],
        currentRow: null,
        delCurencyRow:'',
        insertRules:{
          code: [
            { required: true, message: '币别编码不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '币别名称不能为空', trigger: 'change' }
          ],
          rate: [
            { required: true, message: '币别汇率不能为空', trigger: 'change' }
          ]
        }
      }
    },
    components:{
      closeBtn
    },
    computed:{
      ...mapState([
        'skin_style',
        'skin_color'
      ])
    },
    methods: {
      addType(){
        this.dialogVisible=true
        this.currencyOpera = 'add';
      },
      editType(row){
        console.log(row)
        this.currencyOpera = 'edit';
        this.dialogVisible=true
        this.currencyForm.accountId = row.accountId;
        this.currencyForm.currencyId = row.currencyId;
        this.currencyForm.code = row.code;
        this.currencyForm.name = row.name;
        this.currencyForm.rate = row.rate;
        if(row.code === 'RMB'){this.isRMB = true}
        else{this.isRMB = false}
      },
      deleteType(row){
        this.dialogVisibleDelete = true;
        this.delCurencyRow = row;
      },
      downloadRow(index, tableData) {
      },
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      save(formName) {
        let xx = false;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.currencyOpera === 'add'){this.insertCurrency(this.currencyForm);}
            else{this.editCurrency(this.currencyForm)}
            xx = true;
          } else {
            console.log('error submit!!');
            return false;
          }
        });

        if(xx && this.currencyOpera === 'add'){
          this.$refs[formName].resetFields()
        }

      },
      /*
      * 新增币种
      */
      async insertCurrency(data){
        try {
          let params = unilt.baseEncode({
            "accountId": "1", // 暂时传默认值
            "code": data.code,
            "name": data.name,
            "rate": data.rate,
          },urls.insertCurrency)
          let res = await this.$api.unsplash.baseInterface(params)
          console.log(res);
          if(res.returnStatus.code == "0000") {
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.currencyList();
          }else{
            this.$message({
              message: unilt.baseDecode2(res.returnStatus.message),
              type: 'warning'
            });
          }
        }catch (e) {
          console.log(e)
        }
      },
      // 币种修改
      async editCurrency(data){
        try {
          let params = unilt.baseEncode({
            "accountId": data.accountId, // 暂时传默认值
            "currencyId":data.currencyId,
            "code": data.code === 'RMB' ? 'RBM' : data.code,
            "name": data.name,
            "rate": data.rate,
          },urls.editCurrency)
          let res = await this.$api.unsplash.baseInterface(params)
          console.log(res)
          if(res.returnStatus.code == "0000") {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.dialogVisible=false;
            this.currencyList();
          }
        }catch (e) {
          console.log(e)
        }
      },
      // 币种删除
      async deleteCurrency(){
        try {
          let params = unilt.baseEncode({
            "accountId": this.delCurencyRow.accountId, // 暂时传默认值
		      	"currencyId": this.delCurencyRow.currencyId
          },urls.deleteCurrency)
          let res = await this.$api.unsplash.baseInterface(params)
          console.log(res);
          if(res.returnStatus.code != "0000") {
            this.$message.error('删除失败！');
          }else{
            this.$message({
              message: '删除成功！',
              type: 'success'
            });
            this.currencyList();
          }
          this.dialogVisibleDelete = false;

        } catch (error) {
          consoel.log(error)
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
            this.tableData = unilt.baseDecode(res.data.content)//解密
            console.log(this.tableData);
          }
        }catch (e) {
          console.log(e)
        }
      },
      /**
       * 是否是本位币，对返回数据进行处理
       */
      isStandardMondey(row, column, cellValue, index) {
        if (cellValue == 1) {
          return '是';
        } else {
          return '否';
        }
      }
    },
    mounted() {
      this.currencyList();
    }
  }
</script>


<style lang="scss" scoped>
  @import "../../assets/css/variable";

  #currency {
    .list {
      margin-top: 20px;
      margin-bottom: 20px;
      .icon {
        font-size: 22px;
        color: #30aabc;
        cursor: pointer;
      }
    }
  }
</style>

  <style lang="scss">
      #currency{
        .el-table .cell{
          height: 50px;
          line-height: 50px;
        }
      }

</style>

