<template>
 <div id="mMain">
   <div class="top-tabs-box clearfix">
     <el-tabs v-model="actived" type="card" closable @tab-remove="removeTab" @tab-click="tabClick" style="max-width: 85%; float: left">
       <el-tab-pane
         v-for="item in navTabs"
         :key="item.name"
         :label="item.title"
         :name="item.name"
       >
       </el-tab-pane>
     </el-tabs>
     <!--<el-dropdown @command="handleCommand"  style="float: left; width: 30px; text-align: center; line-height: 45px">-->
        <!--<span class="el-dropdown-link">-->
          <!--<i class="el-icon-caret-bottom el-icon&#45;&#45;right"></i>-->
        <!--</span>-->
       <!--<el-dropdown-menu slot="dropdown">-->
         <!--<el-dropdown-item command="all">关闭全部</el-dropdown-item>-->
         <!--<el-dropdown-item command="one">关闭当前页</el-dropdown-item>-->
       <!--</el-dropdown-menu>-->
     <!--</el-dropdown>-->
   </div>
  <!--<div @contextmenu.prevent="mouseEvent">fff</div>-->
   <transition name="fade" mode="out-in">
     <router-view></router-view>
   </transition>
 </div>
</template>

<script>
  import { mapState, } from 'vuex'
    export default {
      data() {
        return {
           actived:'index'
        }
      },
      methods: {
        handleCommand(command) {
          if(command == 'all'){
            this.$store.commit('REMOVETAB', 'all')
          }else{
            this.removeTab(this.activeTab)
          }
        },
        removeTab(targetName) {
          let obj = {
            targetName:targetName,
            activeName:this.activeTab
          }
          this.$store.commit('REMOVETAB', {
            datas: obj
          })
          this.$router.push('/'+this.activeTab);
        },
        tabClick(targetName){
          console.log(targetName);
          console.log('=======================');
          if(targetName.name !== this.activeTab){
           this.$router.push(targetName.name);
            this.$store.commit('CHANGE_STATE',{
              title:targetName.label,
              path:targetName.name
            })
          }
          
        }
      },
      computed:{
        ...mapState([
          'navTabs',
          'activeTab'
        ])
      },
      watch:{
        activeTab:function (t,b) {
          this.$nextTick(function(){
            this.actived = this.activeTab;
          })
        }
      },
      mounted(){
        this.actived = this.activeTab;
        console.log(this.actived);
      }
    }
</script>

<style scoped lang="scss">
  #mMain{
    .top-tabs-box{
      background-color: #e1e8ee;
      position: relative;
      margin-bottom: 25px;
      border-top: 1px solid #dfdfdf;
      border-bottom: 1px solid #dfdfdf;
      height: 42px;
      line-height: 42px;
    }

  }
</style>
<style lang="scss">
  @import "../assets/css/variable";
  #mMain{
    .el-tabs__header{
      margin-bottom: 0 !important;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item:not(:first-child){
      border-left: 1px solid #ccc;
      &:hover{
        padding: 0 19px;
      }
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item:last-child{
      border-right: 1px solid #ccc;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__nav{
      border: none;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item,.el-tabs--card>.el-tabs__header{
      border-bottom: none;
    }

    .el-tabs--card{
      max-width: 100% !important;
    }

    .el-tabs__item{
      padding: 0 26px;
      line-height: 42px;
      font-size: $normal_size;
    }
    .el-tabs--card > .el-tabs__header .is-closable:first-child{
      padding: 0 36px !important;
      .el-icon-close{
        display: none;
      }
    }
    .el-tabs--card > .el-tabs__header .is-active{
      background-color:#ffffff;
      border-bottom: 1px solid #ffffff;
      padding: 0 16px !important;
    }
    .el-tabs__item.is-active{
      color: #000;
    }
    .el-tabs__item:hover{
      color:#303133
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item:not(:first-child):hover{
      padding: 0 19px;
    }

    .el-tabs--card > .el-tabs__header .is-active[aria-selected = true]:not(:first-child){
      padding: 0 19px !important;
    }

  }

</style>
