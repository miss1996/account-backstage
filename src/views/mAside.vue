<template>
  <div class="aside-container" :style="{background:skin_color}">
    <div class="ikc-logo">
      <img :src="ikcIcon" alt="ikeepCloud">
    </div>
    <div class="userMsg">
      <img :src="userIcon" alt="">
      <span>jdjdjd</span>
    </div>
    <el-aside width="220px" class="aside">
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :background-color="skin_color"
        :unique-opened = 'uniqueOpen'
        text-color="#fff">
        <div v-for="(item,idx) in $router.options.routes" :key="idx" v-if="item.visible !== false" :class="{blueMenu:skin_style == 'blue',orangeMenu:skin_style == 'orange',popularMenu:skin_style == 'popular',pinkMenu:skin_style == 'pink',greenMenu:skin_style == 'green'}">
          <el-menu-item :index="item.children[0].meta.title" v-if="item.collapse === false"  @click="$router.push(item.children[0].path)">
            <img :src="item.iconCls" alt="" class="icon">
            <span slot="title" class="title">{{item.children[0].meta.title}}</span>
          </el-menu-item>
          <el-submenu :index="item.name" v-else class="submenu_s">
            <template slot="title">
              <img :src="item.iconCls" alt="" class="icon">
              <span class="title">{{item.name}}</span>
            </template>
            <el-menu-item v-for="itm in item.children" :index="itm.meta.title" @click="$router.push(itm.path)">
              {{itm.meta.title}}
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
  import { mapState, } from 'vuex'
    export default {
      name: "mAside",
      data(){
        return{
          ikcIcon:require('../assets/imgs/icon_logo.svg'),
          userIcon:require('../assets/imgs/xktp.jpg'),
          uniqueOpen:true
        }
      },
      methods: {
        handleOpen(key, keyPath) {
          // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      },
      computed:{
        ...mapState([
          'activeMenu',
          'skin_style',
          'skin_color'
        ])
      }
    }
</script>

<style scoped lang=scss>
  @import "../assets/css/variable";
  @import "../assets/css/slider_old";
  .aside-container{
    box-sizing: border-box;
    width: 220px;
  .icon{
    display: inline-block;
    margin-right: 10px;
  }
  .title{
    font-size: $larger_size;
    letter-spacing:6px;
  }
  .el-menu-item{
    height: 64px !important;
    line-height: 64px !important;
  }
  .ikc-logo{
    text-align: center;
    padding: 5px 0 0 0;
    border-right: solid 1px #e6e6e6;
  img{
    width: auto;
    height: auto;
  }
  }
  .userMsg{
    text-align: center;
    border-right: solid 1px #e6e6e6;
    padding-bottom:10px;
  img{
    border-radius: 8px;
    width: 83px;
    height: 83px;
    display: block;
    margin: 0 auto;
  }
  span{
    display: inline-block;
    color: #ffffff;
    line-height: 2;
  }
  }
  }


</style>
