<template>
  <div class="aside-container" :style="{background:skin_color}">
    <div class="ikc-logo">
      <img :src="ikcIcon" alt="ikeepCloud">
    </div>
    <div class="userMsg" @click="$router.push('/recordCredential')">
      <img :src="userIcon" alt="">
      <span>iKeeper</span>
    </div>
    <div class="slider-popover">
      <div v-for="(items,index) in routerList" :key="index" :class = "[{activedTab:items.actived == true},skin_style]" v-if="items.visible !== false">
        <el-popover
          placement="right"
          trigger="hover"
          :visible-arrow="visibled"
          :popper-class="skin_style"
          @show = 'showPop(items)'
          @hide = 'hidePop(items)'
          @after-leave = 'hidePop(items)'
          v-if="items.collapse !== false"
        >
          <div class="popover-content" :class="{special:index == 4}">
            <div :span="12" class="p-row" v-for="(item,idx) in items.children" :key="idx" @click.stop.prevent="jumpTo(item.path)">{{item.meta.title}}</div>
          </div>
          <el-button slot="reference" type="text">
            <img :src="items.iconCls" class="icon">
            <span class="name-p">{{items.name}}</span>
          </el-button>
        </el-popover>
        <div v-else class="slider-item" style="cursor: pointer" @click="jumpTo(items.children[0].path)">
          <img :src="items.iconCls" class="icon" style="margin-right: 8px;">
          <span class="name-p">{{items.children[0].meta.title}}</span>
        </div>
      </div>
    </div>
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
        uniqueOpen:true,
        visibled:false,
        isX:false,
        routerList:''
      }
    },
    methods: {
      showPop(data){
        this.$nextTick(function () {
          data.actived = true;
          this.isX = true
        })
      },
      hidePop(data){
        this.$nextTick(function () {
          data.actived = false;
          this.isX = false
        })
      },
      jumpTo(path){
        this.$router.push(path)
      }
    },
    computed:{
      ...mapState([
        'activeMenu',
        'skin_style',
        'skin_color'
      ])
    },
    created(){
      this.routerList = this.$router.options.routes;
    }
  }

</script>

<style scoped lang=scss>
  @import "../assets/css/slider";
</style>
<style lang=scss>
  .el-popover.el-popper{
    -webkit-box-shadow: 2px 2px 6px 0 rgba(151,151,151,.5);
    box-shadow: 2px 2px 6px 0 rgba(151,151,151,.5);
  }
  .el-popover.el-popper.blue,.el-popover.el-popper.green,.el-popover.el-popper.orange,.el-popover.el-popper.popular,.el-popover.el-popper.pink{
    padding: 0;
    left: 144px !important;
    margin-left: 2px;
  }
  .el-popper.green{
    .popover-content{
      background-color: #F4F9FF;
      .p-row{
        &:hover{
          background-color: rgba(0,137,189,.1);
        }
      }
    }
  }
  .el-popper.blue{
    .popover-content{
      background-color: #F4FDFF;
      .p-row{
        &:hover{
          background-color: rgba(48,170,188,.1);
        }
      }
    }
  }
  .el-popper.orange{
    .popover-content{
      background-color: #FFFAF4;
      .p-row{
        &:hover{
          background-color: rgba(247,154,61,.1);
        }
      }
    }
  }
  .el-popper.popular{
    .popover-content{
      background-color: #F9F8FF;
      .p-row{&:hover{
        background-color: rgba(137,120,243,.1);
      }}
    }
  }
  .el-popper.pink{
    .popover-content{
      background-color: #FEF7F7;
      .p-row{&:hover{
        background-color: rgba(247,146,146,.1);
      }}
    }
  }
</style>

