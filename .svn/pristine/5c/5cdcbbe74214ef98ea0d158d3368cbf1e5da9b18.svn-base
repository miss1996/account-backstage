<template>
  <div id="fback">
    <el-row>
      <el-col :span="10">
        <h1>数据备份记录：</h1>
      </el-col>
      <el-col align="right" :span="14">
        <el-row class="btn-box">
          <el-button type="primary" :btnType="`${skin_style}_btn`" @click="bfNote">开始备份</el-button>
          <closeBtn></closeBtn>
        </el-row>
      </el-col>
    </el-row>
    <div class="list">
      <el-table
        ref="multipleTable"
        highlight-current-row
        @current-change="handleCurrentChange"
        stripe
        border
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="name"
          class-name="align_left"
          label="备份名称">
        </el-table-column>
        <el-table-column
          prop="time"
          label="时间">
        </el-table-column>
        <el-table-column
          prop="size"
          class-name="align_right"
          label="文件大小">
        </el-table-column>
        <el-table-column
          label="操作"
           width="200"
          align="center"
        >
          <template slot-scope="scope">
            <i class="iconfont icon-icon-" :style="{color:skin_color}" style="font-size: 18px" @click="hfNote"></i>
            <i class="el-icon-delete icon" :style="{color:skin_color}" @click="deleteNote"></i><!--deleteRow(scope.$index, tableData)-->
            <i class="iconfont icon-xiazai" :style="{color:skin_color}"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="paginationBox">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :pager-count="pageCount"
        :page-size="5"
        layout=" prev, pager, next, total, jumper"
        :total="50">
      </el-pagination>
      <el-button class="go">确定</el-button>
    </div>
    <el-dialog title="开始备份" :visible.sync="dialogVisiblebfNote" custom-class="myDialog" width="620px" class="warning">
			<div class="warning-box">
        <img class="warning-png" src="../../assets/imgs/warning.png" alt="">
        <div class="warning-note" >
          <p style="color:#333;">为保证备份数据的完整性，<span style="font-weight:600;">请确保账套里的其他用户已经退出系统。</span></p>
          <p>确定执行备份？</p>
        </div>
      </div>
			<div slot="footer" class="dialog-footer">
				<span class="btn" :style="{background:skin_color}">确定</span>
				<span class="btn" @click="dialogVisiblebfNote = false">取消</span>
			</div>
		</el-dialog>
    <el-dialog title="删除备份" :visible.sync="dialogVisibleDelete" custom-class="myDialog" width="417px" class="warning">
			<div class="warning-box">
        <img class="warning-png" src="../../assets/imgs/warning.png" alt="">
        <div class="warning-note" >
          <p style="color:#333;margin-top:13px;">确定删除该备份？</p>
        </div>
      </div>
			<div slot="footer" class="dialog-footer">
				<span class="btn" :style="{background:skin_color}">确定</span>
				<span class="btn" @click="dialogVisibleDelete = false">取消</span>
			</div>
		</el-dialog>
    <!--恢复备份-->
    <el-dialog title="恢复备份" :visible.sync="dialogVisiblehf" custom-class="myDialog" width="680px" class="warning">
			<div class="warning-box">
        <img class="warning-png" src="../../assets/imgs/warning.png" alt="">
        <div class="warning-note" >
          <p style="color:#333;width:520px;">您将把账套数据恢复到备份文件所在的状态，<span style="color:#ee0c0c;">此操作不可回退</span>，请谨慎操作。为保证备份数据的完整性，<span style="color:#ee0c0c;">请确保账套里的其他用户已经退出系统</span>。</p>
          <el-form ref="form" :model="form" label-width="0" class="main-child">
            <el-form-item label="">
              <el-checkbox-group v-model="form.know">
                <el-checkbox label="我已清楚了解将产生的后果" name="type2"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
					</el-form>
          <p style="color:#ee0c0c;margin-top:-10px;height:30px;"><span v-if="showHf">（请先确认并勾选“我已清楚了解将产生的后果”）</span></p>
        </div>
      </div>
			<div slot="footer" class="dialog-footer">
				<span class="btn" :style="{background:skin_color}" @click="startbf">确定</span>
				<span class="btn" @click="dialogVisiblehf = false">取消</span>
			</div>
		</el-dialog>
  </div>
</template>

<script>
  import { mapState, } from 'vuex'
  import closeBtn from '../closeTab'
  export default {
    data() {
      return {
        form:{
          know:[]
        },
        showHf:false,
        dialogVisiblebfNote:false,
        dialogVisibleDelete:false,
        dialogVisiblehf:false,
        tableData: [
          { name: '944465632824778_66669488_20180716_164538.zip', time: '2018-07-16 16:45:41', size:'67 kb'},
          { name: '944465632824778_66669488_20180716_164538.zip', time: '2018-07-16 16:45:41', size:'67 kb'},
          { name: '944465632824778_66669488_20180716_164538.zip', time: '2018-07-16 16:45:41', size:'67 kb'},
          { name: '944465632824778_66669488_20180716_164538.zip', time: '2018-07-16 16:45:41', size:'67 kb'},
          { name: '944465632824778_66669488_20180716_164538.zip', time: '2018-07-16 16:45:41', size:'67 kb'},
          { name: '944465632824778_66669488_20180716_164538.zip', time: '2018-07-16 16:45:41', size:'67 kb'},
          { name: '944465632824778_66669488_20180716_164538.zip', time: '2018-07-16 16:45:41', size:'67 kb'},
          { name: '944465632824778_66669488_20180716_164538.zip', time: '2018-07-16 16:45:41', size:'67 kb'},
          { name: '944465632824778_66669488_20180716_164538.zip', time: '2018-07-16 16:45:41', size:'67 kb'},
          { name: '944465632824778_66669488_20180716_164538.zip', time: '2018-07-16 16:45:41', size:'67 kb'},
        ],
        currentPage: 1,
        pageSize: 10,
        total: 100,
        pageCount:5,
        currentRow: null,
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
      startbf(){
        if(this.form.know.length==0){
          this.showHf=true
        }else{
          alert("接口")
        }
      },
      hfNote(){
        this.dialogVisiblehf=true
      },
      bfNote(){
        this.dialogVisiblebfNote=true
      },
      deleteNote(){
        this.dialogVisibleDelete=true
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      editRow(index, tableData) {
        console.log(index);
      },
      deleteRow(index, tableData) {
      },
      setCurrent(row) {
        this.$refs.multipleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      }
    }
  }
</script>

<style lang="scss">
    #fback {
    .el-table .cell {
      height: 50px;
      line-height: 50px;
    }
    .warning .el-dialog__body{
      padding-bottom:10px !important;
    }
  }
</style>


<style lang="scss" scoped>
  @import '../../assets/icon/iconfont.css';
  #fback {
    margin: 20px 35px 0 27px;
    h1 {
      margin-left: 32px;
      font-size:20px;
      color:#333333;
      font-weight: 700;
    }
    .list {
      margin-top: 20px;
      margin-bottom: 20px;
      .icon {
        font-size: 22px;
        color: #30aabc;
        margin-right: 10px;
      }
    }
    .iconfont{
      font-size: 21px;
      color: #30aabc;
      margin-right: 10px;
    }

  }
</style>

