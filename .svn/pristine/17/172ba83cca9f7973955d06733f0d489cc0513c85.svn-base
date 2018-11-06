<template>
  <div id="cIndex">
    <el-row :gutter="30" style="margin-right: -5px">
      <el-col :span="18">
         <table class="top_table">
           <tr>
             <td colspan="4" class="t_title">最近凭证</td>
             <td rowspan="3" align="center">
               <div class="pz_bg" :style="{background:skin_color}">
                 <img src="../assets/imgs/icon_lupinghzneg.svg" alt="">
                 <span>录凭证</span>
               </div>
             </td>
           </tr>
           <tr class="grayBg">
             <td>2018/06/12</td>
             <td class="blue_c">记-1</td>
             <td>计提折旧费用</td>
             <td align="right">666.88</td>
           </tr>
           <tr>
             <td>2018/06/12</td>
             <td class="blue_c">记-12</td>
             <td>结转本期损益</td>
             <td align="right">3342.88</td>
           </tr>
         </table>

        <el-row class="l_bBox">
          <el-col class="l_bItem" :class="skin_style" :span="6" v-for="(item,index) in i_list" :key="index" >
            <div @click="$router.push(item.path)">
              <img :src="item.src" alt="">
              <span>{{item.name}}</span>
            </div>
          </el-col>
          <el-col class="addIcon l_bItem" :span="6" style="border-right: none">
            <!--<span class="el-icon-plus" @click="dialogVisible = true"></span>-->
          </el-col>
        </el-row>
      </el-col>
      <el-col class="right_box" :span="6" style="background-color: white; padding: 0 !important;">
        <h3>本期财务指标</h3>
        <ul>
          <li v-for="(item,index) in cwzbData" :key="index">
            <span>{{item.title}}</span>
            <span class="blue">{{item.money}}</span>
          </li>
        </ul>
        <div class="setting">
          <div><img src="../assets/imgs/icon_shuaxin.svg" alt="">刷新</div>
          <div><img src="../assets/imgs/icon_guanli.svg" alt="">管理</div>
        </div>
      </el-col>
    </el-row>

    <el-dialog
      title="添加"
      :visible.sync="dialogVisible"
      width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  import { mapState, } from 'vuex'
  export default {
    data() {
      return {
        dialogVisible:false,
        finanTarget:[],
        imgsrc:'',
        cwzbData:[{
           title:'现金',
           money:''
        },{
          title:'银行存款',
          money:''
        },{
          title:'存货',
          money:''
        },{
          title:'应收账款',
          money:''
        },{
          title:'主营业务收入',
          money:''
        },{
          title:'销售费用',
          money:''
        },{
          title:'管理费用',
          money:'39,878.00'
        }],
        i_list:[]
      }
    },
    methods: {
      changeSkin(){
        let icons = [{
          src:require(`../assets/imgs/${this.skin_style}/icon_chapingzheng.svg`),
          path:'/checkCredential',
          name:'查凭证'
        },{
          src:require(`../assets/imgs/${this.skin_style}/icon_kemuyuebiao.svg`),
          name:'科目余额表',
          path:'/balanceReport',
        },{
          src:require(`../assets/imgs/${this.skin_style}/icon_lirunbiao.svg`),
          name:'利润表',
          path:'/incomeState',
        },{
          src:require(`../assets/imgs/${this.skin_style}/icon_zichanfuzhaibiao.svg`),
          name:'资产负债表',
          path:'/balanceSheet',
        },{
          src:require(`../assets/imgs/${this.skin_style}/icon_mingxizhang.svg`),
          name:'明细账',
          path:'/accountState',
        },{
          src:require(`../assets/imgs/${this.skin_style}/icon_jiezhang.svg`),
          name:'结账',
          path:'/settle',
        },{
          src:require(`../assets/imgs/${this.skin_style}/icon_yijianfankui.svg`),
          name:'意见反馈',
          path:'',
        },{
          src:require(`../assets/imgs/${this.skin_style}/icon_zengzhifuwu.svg`),
          name:'增值服务',
          path:'/wvas',
        }
        ]
        this.i_list = icons;
      }
    },
    computed:{
      ...mapState([
        'activeMenu',
        'skin_style',
        'skin_color'
      ])
    },
    watch:{
      skin_style(){
        this.changeSkin();
      }
    },
    created(){
      this.changeSkin();
      // console.log(this.skin_style)
      // console.log(`../assets/imgs/${this.skin_style}/icon_chapingzheng.svg`)
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/variable";
  #cIndex{
    padding: 0 30px 30px 30px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    .top_table{
      width: 100%;
      tr>td{
        width: 20%;
      }
      .pz_bg{
        box-shadow:0 2px 4px 0 rgba(107,107,107,0.50);
        -webkit-box-shadow:0 2px 4px 0 rgba(107,107,107,0.50);
        -moz-box-shadow: 0 2px 4px 0 rgba(107,107,107,0.50);;
        border-radius:6px;
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        width:135px;
        height:116px;
        text-align: center;
        padding: 10px 0;
        @include box-sizing;
        img{
          width: auto;
          height: auto;
        }
        span{
          display: block;
          color: #fff;
          font-size: $middle_size;
          margin-top: -7px;
        }
      }
      .t_title{
        font-size: $normal_size;
        color: #333;
      }
      td{
        background-color: white;
        padding: 15px 20px;
        &:first-child{
          padding-left: 50px;
        }
      }
      tr.grayBg{
        td{
          background-color: #FAFBFC;
          font-size: $small_size;
          border-bottom: 1px solid #eaeaea;
          .blue_c{
            color: #30aabc;
          }
        }
      }
    }
    .l_bBox{
      margin-top: 10px;
      background-color: white;
      .l_bItem{
        cursor: pointer;
        border-right:1px solid #eaeaea;
        border-bottom: 1px solid #eaeaea;
        padding: 20px 0;
        text-align: center;
        @include box-sizing;
        span{
          display: block;
          text-align: center;
          font-size: $larger_size;
          position: relative;
          bottom: 0;
          left: 0;
        }

      }
      .l_bItem.blue{
        &:hover{
          border-bottom: 1px solid #1b96a8;
        }
      }
      .l_bItem.orange{
        &:hover{
          border-bottom: 1px solid #F6993F;
        }
      }
      .l_bItem.popular{
        &:hover{
          border-bottom: 1px solid #8978F1;
        }
      }
      .l_bItem.pink{
        &:hover{
          border-bottom: 1px solid #F69191;
        }
      }
      .l_bItem.green{
        &:hover{
          border-bottom: 1px solid #0688BC;
        }
      }
      .addIcon{
        border-right: 1px dashed #eaeaea;
        height: 199px;
        line-height: 199px;
        span{
          display: inline-block;
          font-size: 4rem;
          color: #999999;
        }
      }

    }
    .right_box{
      position: relative;
      min-height: 720px;
      .closeMoudle{
        position: absolute;
        top: -35px;
        height: 30px;
        line-height: 30px;
        right: 20px;
        font-size: $small_size;
        color: #999;
        .el-icon-close{
          font-size: 20px;
          vertical-align: middle;
        }
      }
      h3{
        font-style: $normal_size;
        color: #000;
        height: 66px;
        line-height: 66px;
        padding-left: 35px;
      }
      ul{
        li{
          height: 50px;
          line-height: 50px;
          padding: 0 28px;
          font-size: $small_size;
          border-bottom: 1px solid #eaeaea;
          &:nth-child(odd){
            background-color: #fbfcfd;
          }
          span:last-child{
            float: right;
            color: #30aabc;
          }
        }

      }
      .setting{
        margin: 50px;
        text-align: right;
        >div{
          display: inline-block;
          margin-left: 30px;
          line-height: 55px;
          height: 55px;
          font-size: $small_size;
          color: #666666;
          img{
            vertical-align: middle;
            margin-right: 5px;
          }
        }
      }
      ul li{
        padding-left:35px;
      }
    }
  }

</style>
