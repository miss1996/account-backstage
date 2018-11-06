<template>
    <div id="saleStroageData" class="public-container">
      <el-row>
        <el-col :span="24" align="right">
          <closeBtn></closeBtn>
        </el-col>
      </el-row>
      <el-row class="container">
        <el-col v-for="(item,index) in listData" :key='index'>
          <img :src="item.img" alt="">
          <div class="desc">{{item.desc}}</div>
        </el-col>
      </el-row>
      <div class="descContainer">
        <div class="title">
          请在此设置进销存账套的基础资料跟本账套的科目对应关系。如科目又变化，请先“<el-button type="primary" :btnType="`${skin_style}_btn`">同步会计科目</el-button> ”
        </div>
        <p>1、设置进销存“客户”的应收欠款所计入的会计科目。</p>
        <p>2、设置进销存“供应商”的应收欠款所计入的会计科目。</p>
        <p>3、设置进销存“存货”的库存成本、销售收入及销售成本计入的会计科目。</p>
        <p>4、设置进销存“账户”对应的会计科目。</p>
      </div>
    </div>
</template>

<script>
  import { mapState, } from 'vuex'
  import closeBtn from '../closeTab'
    export default {
        name: "saleStroageData",
      data() {
        return {
           listData:[]
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
        changeSkin(){
          let icons = [{
            img:require(`../../assets/imgs/${this.skin_style}/icon_kehu.svg`),
            desc:'客户'
          },{
            img:require(`../../assets/imgs/${this.skin_style}/icon_gongyingshang.svg`),
            desc:'供应商'
          },{
            img:require(`../../assets/imgs/${this.skin_style}/icon_cunhuo.svg`),
            desc:'存货'
          },{
            img:require(`../../assets/imgs/${this.skin_style}/icon_zhanghu.svg`),
            desc:'账户'
          },{
            img:require(`../../assets/imgs/${this.skin_style}/icon_qitashouzhi.svg`),
            desc:'其他收支'
          }]
          this.listData = icons;
          console.log(this.i_list)
        }
      },
      watch:{
        skin_style(){
          this.changeSkin();
        }
      },
      created(){
        this.changeSkin();
      }
    }
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  #saleStroageData{
    .container{
      margin-top: 15px;
      border:1px solid $border-color;
      .el-col{
        width: 20% !important;
        padding: 40px 0;
        background-color: white;
        text-align: center;
        border-right: 1px solid $border-color;
        &:last-child{
          border-right: none;
        }
        .desc{
          font-size: $middle_size;
        }
        &:hover{
          cursor: pointer;
        }
      }
    }
    .descContainer{
      background-color: white;
      padding: 20px 40px;
      margin-top: 20px;
      .title,p{
        margin: 0;
        padding: 0;
        line-height: 2.8;
        font-size: $larger_size;
      }
      p{
        color: #666666;
      }
    }
  }

</style>
