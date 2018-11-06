<template>
    <div class="closeBtn">
      <el-dropdown @command="closeTab">
        <el-button type="primary" :btnType="`${skin_style}_btn`">关闭</el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="one">关闭当前页</el-dropdown-item>
          <el-dropdown-item command="other_all">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
</template>

<script>
  import { mapState, } from 'vuex'
    export default {
        name: "closeTab",
      data(){
          return{

          }
      },
      computed:{
        ...mapState([
          'skin_style',
          'skin_color',
          'activeTab'
        ])
      },
      methods:{
        closeTab(command){
          if(command == 'all'){
            this.$store.commit('REMOVETAB', 'all');
          }else if(command == 'other_all'){
            this.$store.commit('REMOVETAB', 'other_all');
          }else{
            this.$store.commit('REMOVETAB', 'actived')
          }
          this.$router.push('/'+this.activeTab);
        }
      }
    }
</script>

<style scoped>
   .closeBtn{
     display: inline-block;
   }
</style>
