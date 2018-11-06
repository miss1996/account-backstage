<template>
    <div id="daily">
        <div class="filter">
            <el-col :span="12">
                <el-date-picker class="time filter-border"
                    v-model="dateTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
                <el-select class="user filter-border" v-model="selectedUser" placeholder="所有用户">
                    <el-option
                        v-for="item in allUsers"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select class="option filter-border" v-model="selectedOption" placeholder="所有操作">
                    <el-option
                        v-for="item in allOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <div class="input filter-border">
                    <el-input v-model="dailyContent" placeholder="请输入日志内容"></el-input>
                </div>
            </el-col>
            <el-col :span="12" align="right" class="right_top">
                <el-row class="btn-box">
                    <el-button type="primary" :btnType="`${skin_style}_btn`">查询</el-button>
                    <el-button type="primary" :btnType="`${skin_style}_btn`">打印</el-button>
                    <closeBtn></closeBtn>
                </el-row>
            </el-col>
        </div>
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
                  prop="date"
                  label="日期">
                </el-table-column>
                <el-table-column
                  prop="nickName"
                  label="用户名">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名">
                </el-table-column>
                <el-table-column
                  prop="operate"
                  label="操作类型">
                </el-table-column>
                <el-table-column
                  prop="log"
                  class-name="align_left"
                  label="日志">
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
    </div>
</template>

<script>
    import { mapState, } from 'vuex'
    import closeBtn from '../closeTab'
    export default {
        data() {
            return {
                name: "Daily",
                dateTime: '',
                allUsers: [
                    { value: '1', label: '所有用户' },
                    { value: '2', label: '所有用户' },
                    { value: '3', label: '所有用户' }
                ],
                allOptions: [
                    { value: '4', label: '所有操作' },
                    { value: '5', label: '所有操作' },
                    { value: '6', label: '所有操作' }
                ],
                titles: ["日期", "用户名", "姓名", "操作类型", "日志"],
                selectedUser: '',
                selectedOption: '',
                dailyContent: '',
                tableData: [
                  { date: '2018-07-16 18:54:49', nickName: 'Demo', name: '体验用户', operate: '新手指引', log: '查询多栏账：201802-201901 ,1001' },
                  { date: '2018-07-16 18:54:49', nickName: 'Demo', name: '体验用户', operate: '新手指引', log: '查询多栏账：201802-201901 ,1001' },
                  { date: '2018-07-16 18:54:49', nickName: 'Demo', name: '体验用户', operate: '新手指引', log: '查询多栏账：201802-201901 ,1001' },
                  { date: '2018-07-16 18:54:49', nickName: 'Demo', name: '体验用户', operate: '新手指引', log: '查询多栏账：201802-201901 ,1001' },
                  { date: '2018-07-16 18:54:49', nickName: 'Demo', name: '体验用户', operate: '新手指引', log: '查询多栏账：201802-201901 ,1001' },
                  { date: '2018-07-16 18:54:49', nickName: 'Demo', name: '体验用户', operate: '新手指引', log: '查询多栏账：201802-201901 ,1001' },
                  { date: '2018-07-16 18:54:49', nickName: 'Demo', name: '体验用户', operate: '新手指引', log: '查询多栏账：201802-201901 ,1001' },
                  { date: '2018-07-16 18:54:49', nickName: 'Demo', name: '体验用户', operate: '新手指引', log: '查询多栏账：201802-201901 ,1001' },
                  { date: '2018-07-16 18:54:49', nickName: 'Demo', name: '体验用户', operate: '新手指引', log: '查询多栏账：201802-201901 ,1001' },
                  { date: '2018-07-16 18:54:49', nickName: 'Demo', name: '体验用户', operate: '新手指引', log: '查询多栏账：201802-201901 ,1001' },
                ],
                currentPage: 1,
                pageSize: 10,
                total: 100,
                pageCount:5,
                currentRow: null,
            }
        },
        computed:{
            ...mapState([
                'skin_style',
                'skin_color'
            ])
        },
        components:{
            closeBtn
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            setCurrent(row) {
                this.$refs.singleTable.setCurrentRow(row);
            },
            handleCurrentChange(val) {
                this.currentRow = val;
            }
        }
    }
</script>

<style lang="scss">
    #daily {
        .el-table .cell {
            height: 50px;
            line-height: 50px;
        }
    }
</style>


<style lang="scss" scoped>
  @import "../../assets/css/variable";
    #daily {
        margin: 20px 35px 0 27px;
        background: #f4f4f4;
        font-size: 0;
        .filter {
            overflow: hidden;
        }
        .time {
            width: 271px;
            margin-right: 18px;
        }
        .user {
            width: 132px;
            margin-right: 18px;
        }
        .option {
            width: 132px;
            margin-right: 18px;
        }
        .input {
            width: 187px;
            display: inline-block;
        }
        .list {
            margin-top: 20px;
          margin-bottom: 20px;
        }

    }
    .filter-border {
        height: 40px;
    }

</style>
