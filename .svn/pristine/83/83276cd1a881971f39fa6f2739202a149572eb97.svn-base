<template>
  <div id="saleStroage">
    <el-row>
      <el-col :span="16">
        <h1>账套列表</h1>
      </el-col>
      <el-col align="right" :span="8">
        <el-row class="btn-box">
          <el-button type="primary" :btnType="`${skin_style}_btn`">开始备份</el-button>
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
          prop="code"
          width="120"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="serviceNum"
          class-name="align_left"
          label="服务编号">
        </el-table-column>
        <el-table-column
          prop="name"
          class-name="align_left"
          label="套账名称">
        </el-table-column>
        <el-table-column
          label="状态"
          width="200"
        >
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state"
              :active-color="skin_color"
              inactive-color="#999999"
                :class="skin_style"
            ></el-switch>
            <span v-if="scope.row.state == true">已关联</span>
            <span v-else>未关联</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--<div class="paginationBox">-->
      <!--<el-pagination-->
        <!--@size-change="handleSizeChange"-->
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page="currentPage"-->
        <!--:pager-count="pageCount"-->
        <!--:page-size="5"-->
        <!--layout=" prev, pager, next, total, jumper"-->
        <!--:total="50">-->
      <!--</el-pagination>-->
      <!--<el-button class="go">确定</el-button>-->
    <!--</div>-->
    <img src="../../assets/imgs/group.svg" style="width: 100%; height: auto;" alt="">
  </div>
</template>

<script>
  import { mapState, } from 'vuex'
  import closeBtn from '../closeTab'
  export default {
    data() {
      return {
        tableData: [
          { code: '1', serviceNum: '4444JKKL45654', name:'露露幼儿园',state:true},
          { code: '2', serviceNum: '24444JKKL45654', name:'培训帐套',state:true},
          { code: '3', serviceNum: '24444JKKL45654', name:'在线进销存（标准版-试用版',state:true},
          { code: '4', serviceNum: '4444JKKL45654', name:'深圳公司',state:true},
          { code: '5', serviceNum: '4444JKKL45654', name:'北京公司',state:true},
          { code: '6', serviceNum: '4444JKKL45654', name:'校园专用',state:true},
          { code: '7', serviceNum: '4444JKKL45654', name:'在线进销存',state:false},
          { code: '8', serviceNum: '24444JKKL45654', name:'露露幼儿园',state:false},
          { code: '9', serviceNum: '204444JKKL45654', name:'天马教育武汉分公司',state:false},
          { code: '10', serviceNum: '4444JKKL45654', name:'培训帐套',state:false},
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
  #saleStroage {
    .el-table .cell {
      height: 50px;
      line-height: 50px;
    }
    .el-table--enable-row-transition .el-table__body td {
      &:nth-child(2),&:nth-child(3){
        text-align: left;
        padding-left: 15px;
      }
    }
  }
</style>


<style lang="scss" scoped>
  @import '../../assets/icon/iconfont.css';
  #saleStroage {
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


