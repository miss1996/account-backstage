<template>
    <div id="sateofExpense" class="public-container">
      <el-row class="Rtitle">
        <el-col :span="12">
          费用明细表
          <el-popover
            placement="bottom-start"
            width="400"
            popper-class="searchCondition"
            trigger="click">
            <el-form ref="checkform" :model="checkform" label-position="left" size="small" label-width="85px">
              <el-form-item label="会计时间:">
                <el-col :span="9">
                  <el-date-picker type="date" placeholder="选择日期" style="width: 100%;" v-model="checkform.date1"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2" align="center">至</el-col>
                <el-col :span="9">
                  <el-date-picker type="date" placeholder="选择日期" style="width: 100%;" v-model="checkform.date2"></el-date-picker>
                </el-col>
                <el-col :span="4" style="text-align: center; font-size: 20px;"><i class="el-icon-time"></i></el-col>
              </el-form-item>
              <el-collapse-transition>
                <div v-show="showForm">
                  <el-form-item label="会计科目:">
                    <el-col :span="20">
                      <el-input  placeholder="" v-model="checkform.desc"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="" class="label_none">
                    <el-col :span="20">
                      <el-radio-group v-model="checkform.type2">
                        <el-radio label="只显示下级科目"></el-radio>
                        <el-radio label="只显示最明细科目"></el-radio>
                        <el-radio label="不显示下级科目" style="margin-left: 0;margin-top: 10px"></el-radio>
                      </el-radio-group>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="" class="label_none">
                    <el-checkbox-group v-model="checkform.type">
                      <el-checkbox label="显示核算项目" name="type"></el-checkbox>
                      <el-checkbox label="显示本年累计" name="type"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </div>
              </el-collapse-transition>
              <el-form-item class="label_none">
                <el-button type="text" class="handle-text" v-show="showForm === true" @click="showForm = false">收起更多<i class="el-icon-arrow-up"></i></el-button>
                <el-button type="text" class="handle-text" v-show="showForm === false" @click="showForm = true">更多条件<i class="el-icon-arrow-down"></i></el-button>
                <el-button type="primary" :btnType="`${skin_style}_btn`" style="float: right" size="small">确定</el-button>
                <el-button style="float: right" size="small">重置</el-button>
              </el-form-item>
            </el-form>
            <el-button slot="reference">2018-09-08<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
          </el-popover>

          <div style="font-size: 18px; margin-left: 20px; display: inline-block;">
            <el-checkbox v-model="expendAll">展开所有级次</el-checkbox>
            <el-checkbox v-model="showbar" @change="onshowbar">显示折线图</el-checkbox>
          </div>


        </el-col>
        <el-col :span="12" align="right" class="right_top">
          <el-row class="btn-box">
            <el-button type="primary" :btnType="`${skin_style}_btn`">查询</el-button>
            <el-button type="primary" :btnType="`${skin_style}_btn`">打印</el-button>
            <el-button type="primary" :btnType="`${skin_style}_btn`">导出</el-button>
            <closeBtn></closeBtn>
          </el-row>
        </el-col>
      </el-row>

      <div class="echartContainer" ref="echartmain"  v-show="showbar" >
        <!--<img src="../../assets/imgs/downlode.png" alt="">-->
        <div ref="myChart" :style="[{width:chartWidth,height:chartHeight}]"></div>
      </div>

      <el-table
        :data="tableData"
        @row-click="rowClick"
        ref="singleTable"
        highlight-current-row
        @current-change="handleCurrentChange"
        stripe
        border
        class="sunTable"
        style="width: 100%; margin-top: 20px; margin-bottom: 40px">
        <el-table-column
          prop="coding"
          class-name="align_left"
          label="编码">
        </el-table-column>
        <el-table-column
          prop="name"
          class-name="align_left"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="jf_money"
          class-name="align_right"
          label="2018年1月">
        </el-table-column>
        <el-table-column
          prop="df_money"
          class-name="align_right"
          label="2018年2月">
        </el-table-column>
        <el-table-column
          prop="grand_total"
          class-name="align_right"
          label="本年累计">
        </el-table-column>
      </el-table>

      <div class="paginationBox">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage2"
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
  let echarts = require('echarts');
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
        currentRow: null,
        expendAll:'',
        showbar:true,
        chartWidth:'',
        chartHeight:'420px',
        pageCount:5,
        options:[
          {
            value:'ji',
            label:'记'
          }
        ],
        showForm:false,
        filterText:'',
        currentPage2:1,
        checkform:{
          type:[],
          type2:[],
          name: '',
          region: '',
          date1: '',
          date2: '',
          resource: '',
          desc: '',
          subject:'',
          arr1:'',
          arr2:'',
          arr3:'',
          arr4:'',
          arr5:'',
          text:''
        },
        radio2:1,
        tableData: [{
          coding: '895455',
          name: '库存现金',
          jf_money: '334.66',
          df_money:'233.44',
          grand_total:''
        }, {
          coding: '895455',
          name: '库存现金',
          jf_money: '334.66',
          df_money:'233.44',
          grand_total:''
        },{
          coding: '895455',
          name: '库存现金',
          jf_money: '334.66',
          df_money:'233.44',
          grand_total:''
        },{
          coding: '895455',
          name: '库存现金',
          jf_money: '334.66',
          df_money:'233.44',
          grand_total:''
        }],
        echartOption:{
          color: ['#F6993F'],
          toolbox: {
            show : true,
            itemSize:'24',
            showTitle:false,
            right: 15,
            itemGap:15,
            feature : {
              magicType : {
                show: true,
                type: ['line', 'bar'],
                icon:{
                  line:'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAjCAYAAAAaLGNkAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Nzg0RDhDRURBNUU5MTFFODhERjBERjlBNTM2NTVEMzMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Nzg0RDhDRUVBNUU5MTFFODhERjBERjlBNTM2NTVEMzMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3ODREOENFQkE1RTkxMUU4OERGMERGOUE1MzY1NUQzMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3ODREOENFQ0E1RTkxMUU4OERGMERGOUE1MzY1NUQzMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuyG6OcAAAQGSURBVHja7JdtbFNVHMbvOb3tgsV1GhYxI8Zk0U0hxH0g5t62rHEzphQ2WOjQsDi+2ADxi46wqF8GYWpmYmQsC5gQohuE2AkZGzQxmw76FifE6IZ0G4YJCwuJXzpTt9615/DcJTW19q634Bgf1qS5L+ft93/Oc875X8I5F5b7R1YgHicIQYVQ/5IkM0lylC/lWA6H43lJsh5IH1f903RVlhKgurraEo/PX8RtVWaZ+CjUhgJiLDbbQwhnFotl17JAKEqiE5cNlNJXfT7fTGY5zScam83myBdAluWDnLMGQsSaQCBwO1sdmkc0Lckku4hOX9Hbxmq11sFqH1NKGkKhyz9p1dMFAQVs8HMzIeQaOu212+3FuRWo3MQY7yZE+CAYDJ5brG5OCKfTWQgFugDRabEUvo4VNY3nbz0ej3ER6Oc4T1wghHYD4LNcY+SEiEajHVAgZjKZmmGquCjSHXhdOjJy/ZgWNGNMXYqjJpO4X4/SNMec1iPyXZjT3UNDQ3PqO7/fP20w0B2QuRH+2Jde3+12GwD9DeeEms2rdqJN4qEgsBrWAeA4JP0Qrv4lvQwgw/CGB+VH4Y/K1PupqbsduFQUFBhdAwMDUb0GphpbOVEU5Svc/RwM+j/PVicUCnRBjXb4o0fdjqHK+3jeg72gBgpMag34h831lC4IWbY1IdIK+KARftA84UpKSpoBei0eV35A/Tawvw3VftSqPyY735llfPzOG+6ns56ismzFjeklgyFRgOggN20IhwNeHZtYESCG4ZtTWAmfZFUWK2lsdOoLHFceIpCm8tCl9vTTOwNC3CgIybN4vBoOBxv1zmlVVdUzg4OD97KVTdjdxYlkrAdzvB7TVV8e8n2fOkU1poPOQ/4TlArvZnY2LrtcEWnLrxF5S21mmSaAVFMBgKuItIgYxU0pgJyegOHaIetfqedJe92zEdnpZZz14bD/U+DCuYjVdVg172LqjMmuN5NCIkgEPlz05Bq5/ErfrbyXqDpIRHbtm0vM3oByLxODuBlz+RqGxt7B3gNI3+/Vbst/2rW0UEB/ivanBUJaEb177XddMV3pXcqY4fBQ5Kbs2jAvsC8RagWqtJaVmNuI16v8I7N12/oES55fyAVE4/YX/L2/qfe3HNtVk54BipUKZPeL4Uv9i2V0mhCn6BMb+cLBQ/xGke4tvdI/ka0TVQXl79hpdIfNiuyh3HCdkWTvgrzcUFsW7ovkSis1IbqNq5OIUioL+L7WkZ+SMdvWQwLjH6HxHJS7bDSb3yod8EZ1tM2a6PIHTXTVFQMfHFH9kG+CvQDzf0A8TJafmW0v2+9fiS6l8/U4iKaX/IuLEIbLyWwQM0jHmh5R8Eo6xMq36ArEYwlxX4ABAPWfCqTUJMBbAAAAAElFTkSuQmCC',
                  bar:'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAjCAYAAAD17ghaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0YwNDE3RjdBNUU5MTFFOEI5ODNDMDRBOEEyMzZGMkIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0YwNDE3RjhBNUU5MTFFOEI5ODNDMDRBOEEyMzZGMkIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3RjA0MTdGNUE1RTkxMUU4Qjk4M0MwNEE4QTIzNkYyQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3RjA0MTdGNkE1RTkxMUU4Qjk4M0MwNEE4QTIzNkYyQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pli1CvUAAALbSURBVHja7FdNaBNBFH4zm6YtNEEau0lR8Kj0x4NSdTfdGCl40JMHT156EBRP6kkFBY+C6MHfXDx4EjwWD5GqMZvU1IMUT+JFsLZNTFBpG5Owu298W1uNMTXJtk3B9sEyMzuz730z73vv7TAhBKyncFhnWXcArmovGWOOFc4M7n9IzV4QLE564i43xLc+fzW1NF/pclaNAysB8Dkc7gCzNIgMQwQiRPoH6PU86bQCiZS85gDKJaspB03ECGls50xI/sT49kp7rrXw6+zQkK9QzF+3BB5jnF3mAmQEtq0pJJzRDgznS/PvEMAjtbt6AnrqlgUQZsBidZPQieTCyi7DFPcZwg7BpeHuxNiTBdIdV9rT07ivhblOrAkAEQ63pa3SJdPE83TUd+VO+QgbGfm+NJ9Jg0qU+tSZSHxcdQBpTRnKmMV7xOQc46ASyd7+tQihHxiMNpQHaho+rMqQxxsg8ChFzEVZT0WorZrT/b39d2ByclmuNRSGtJZlQspJ+uQarYiyVnHW/2w805DLnOaBmWCwl3JJBAQEmMTP+ONjTx1xpsJe3WHIwHpExl/6W9r6nBpvmANzmtbl0fWs3Q8kU/2NKNY0rduy8APtuLXsZG1dck0A2UPBnZZh3Z5Hw0fDPU52hoheMv7N6/X02ONCoeAzDPN9XZmQjD8WTExILW2hlRwv7Rij0egX++Gcf63bBVS1dm/sH5J6JBgMnqKIOvfnkcPNZDIZaQoAROjjHEbJtw8WeGOJ04iir2knsChTuq6/sTuqOjhNje//4YCqqq/Jx11l/i263W4tFovllqsTqwqAjA9wzkLk47w9Nk3rhWEsJKZcM6Nggnw8Z3cURTVrJB3h5Ja1eTP6pwskSQpQVev4GedYDazXrnqLecBThZh8aZ7409kQALt0llcvGpeIkLO/jo5DlhLPVUTrQtlXV37P81khcAuRd7qiHNf+I9q8nm8oAD8EGADT5TtVCJQVpAAAAABJRU5ErkJggg=='
                }
              },
              saveAsImage : {
                show: true,
                type:'png',
                name:'down',
                icon:'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAkCAYAAACe0YppAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDNDRjMxRDBBQ0VBMTFFOEFCMEJGQUJDN0I0MThGRjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDNDRjMxRDFBQ0VBMTFFOEFCMEJGQUJDN0I0MThGRjUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEM0NGMzFDRUFDRUExMUU4QUIwQkZBQkM3QjQxOEZGNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEM0NGMzFDRkFDRUExMUU4QUIwQkZBQkM3QjQxOEZGNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Po6UqF8AAAGiSURBVHjaYvz//z/DQAAmhgECA2YxAyioYZgU8NLavPZ/WhoruXaR7eP/jIyhr+5ckaN7UAMdzTogcczIwMAyIBYDU8QI8zHDQPn4/0D5mHHk+ZhxoHz8/z/9ffzfwYEiSynxMX0s/u/ry/XSziIaxn/D9xsjfl/aWLhQ38ccb/7//8vQ8sLGsh1ccrxjRPExUHwCsLKb+T80lI3oxIlcDzMCkyrO+tfGRun//z+HGJkYZ7Exs0/6+ef7ExY2JvXfv/5XAXW5srJwOAkfOPCEUH1MchyLHzlyj5mN2fn/v/9ZP/7+TBU/fIL3z69/dcAM7cTMyGpPyFKyfQwPVjtL3f9//+0HKr0NbA3wMHAzOUvsOvaK2BYI2ala4tDxyyyMDO7/GRgfc7FyOBJrKcU+prR9N3Kbtyj50dLSugRIydPCImA0PgBSvTiKvv/dQAUXgVG9krpxyxD0//+/HDwWgxVdPXbsaDs1LbayslYCUiaDL44hcfFfz8rKpoG6Qf3PCK/FjIxMJcC8pgBUKkzlpHUMmHaW4SxARvvHw9JigAADAGQ0o4H5Tj8cAAAAAElFTkSuQmCC'
              }
            }
          },
          xAxis: {
            type: 'category',
            data: ['201801', '201802', '201803', '201804', '201805', '201806', '201807']
          },
          yAxis: {},
          series: [{
            name: '销售费用',
            type: 'bar',
            smooth: true,
            data: [5000, 10000, 15000, 20000, 25000, 30000,25000],
          }],
        },
      }
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleChart(type){
        this.echartOption.series[0].type = type;
        let myChart = echarts.init(this.$refs.myChart);
        myChart.setOption(this.echartOption);
      },
      onshowbar(val){
        console.log(this.showbar)
      },
      rowClick(row, event, column) {
        console.log(row);
        // row.style.backgroundColor = 'red';
      },
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      downImgs(){

      }
    },
    mounted(){
      this.handleChart('bar');
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/table_1";
  .echartContainer{
    margin-top: 20px;
    padding-right: 15px;
    padding-top: 15px;
    background-color: white;
    margin-bottom: 50px;
    position: relative;
  }
  .EChartsBox{
    position: absolute;
    right: 48px;
    top: 10px;
    z-index: 9999;
    img{
      display: inline-block;
      width: 37px;
      height: auto;
      cursor: pointer;
    }
  }
</style>
<style lang="scss">
  #sateofExpense{
    .el-table .cell{
      height: 50px;
      line-height: 50px;
    }
    // checkbox样式修改
    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: white;
    }
    .el-checkbox__inner {
      border-radius: 9px;
    }
    .el-checkbox__inner:after {
      left: 3px;
      top: 3px;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner::after {
      transform: scale(1, 1);
    }
    .el-checkbox__inner::after {
      transform: scale(0, 0);
      border: 1px solid #409EFF;
      background-color: #409EFF;
      border-radius: 8px;
      height: 8px;
      width: 8px;
    }
  }
</style>

