<template>
  <div id="mHeader">
    <el-row>
      <el-col :span="15">
        <h3 class="cName">{{cName}}</h3>
        <el-dropdown class="dropDown" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            切换<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="北京卅思云科技股份有限公司">北京卅思云科技股份有限公司</el-dropdown-item>
            <el-dropdown-item command="乐粮国际贸易有限公司重庆分公司">乐粮国际贸易有限公司重庆分公司</el-dropdown-item>
            <el-dropdown-item command="北京盛世邻里文化传媒科技有限公司">北京盛世邻里文化传媒科技有限公司</el-dropdown-item>
            <el-dropdown-item command="北京京航智慧科技有限公司">北京京航智慧科技有限公司</el-dropdown-item>
          <el-dropdown-item command="北京勤思敏行科技有限公司">北京勤思敏行科技有限公司</el-dropdown-item>
          </el-dropdown-menu>
          </el-dropdown>

        <el-autocomplete
          class="inline-input headerSelect"
          v-model="dataTime"
          suffix-icon="el-icon-date"
          :fetch-suggestions="querySearch"
          placeholder="请选择期数"
          @select="handleSelect"
          style="margin-left: 50px"
          v-bind:class="skin_style"
        ></el-autocomplete>

      </el-col>
      <el-col :span="9" class="right-col" style="padding-top: 7px;">
        <el-badge :value="3" class="item">
          <img src="../assets/imgs/icon_waring.svg" alt="">
        </el-badge>
        <el-popover
          placement="bottom"
          width="200"
          trigger="hover">
          <ul class="skinUl">
            <li v-for="(item,index) in skins" :class="{ actived: item.checked }" :key="index" v-on:click="changeSkin(item)">
              <span v-bind:style="{ background: item.color}" class="colorRound"></span>{{item.title}}
              <i class="el-icon-check"></i>
            </li>
          </ul>
          <img slot="reference" src="../assets/imgs/icon_pifu.svg" alt="" style="cursor:pointer;">
        </el-popover>

        <ul class="hCz">
          <li>退出</li>
          <li>服务支持</li>
          <li>帮助</li>
          <li>新手指南</li>
        </ul>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import { mapState, } from 'vuex'
    export default {
      name: "",
      data() {
        return {
          cName:'北京卅思云科技股份有限公司',
          dataTime:'',
          skins:[{
            style:'green',
            color:'#0688BC',
            title:'蓝色风格',
            checked:true
          },{
            style:'blue',
            color:'#30aabc',
            title:'绿色风格',
            checked:false
          },{
            style:'orange',
            color:'#F6993F',
            title:'橙色风格',
            checked:false
          },{
            style:'popular',
            color:'#8978F1',
            title:'紫色风格',
            checked:false
          },{
            style:'pink',
            color:'#F69191',
            title:'粉色风格',
            checked:false
          }],
          restaurants: [{
            value:'2018年8期',
          },{
            value:'2018年7期',
          },{
            value:'2018年6期',
          },{
            value:'2018年5期',
          },{
            value:'2018年4期',
          },{
            value:'2018年3期',
          }],
        }
      },
      methods:{
        handleCommand(command) {
          this.cName= command;
        },
        changeSkin(it){
          if(!it.checked){
            this.skins.forEach(function (item,index) {
              item.checked = false;
            })
            it.checked = true;

            //存储到state中
            this.$store.commit('CHANGE_SKIN',{
              style:it.style,
              color:it.color
            })

            const loading = this.$loading({
              lock: true,
              text: '正在切换风格',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.5)'
            });
            setTimeout(() => {
              loading.close();
            }, 1000);

          }
        },
        querySearch(queryString, cb) {
          var restaurants = this.restaurants;
          var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
          // 调用 callback 返回建议列表的数据
          cb(results);
        },
        createFilter(queryString) {
          return (restaurant) => {
            return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
          };
        },
        handleSelect(item) {
          console.log(item);
        }
      },
      computed:{
        ...mapState([
          'skin_style',
          'skin_color'
        ])
      },
      created(){
        if(sessionStorage.getItem('skin')){
          let _data = JSON.parse(sessionStorage.getItem('skin'));
          this.skins.forEach(function (item,index) {
            if(item.style == _data.style){
              item.checked = true
            }else{
              item.checked = false;
            }
          })
          this.$store.commit('CHANGE_SKIN',_data);
        }
      }
    }
</script>

<style scoped lang=scss>
  @import "../assets/css/variable";
  #mHeader{
    height: 100%;
    padding-top: 50px;
    .headerSelect{
      width: 120px;
      .el-input__inner{
        border: none;
      }
    }
    .cName{
      display: inline-block;
      margin-right: 8px;
      font-size: 22px;
    }
    .dropDown{
      font-size: $small_size;
      cursor: pointer;
    }
    .right-col{
      text-align: right;
      .item{
         margin-right: 15px;
        height: 24px;
        vertical-align: top;
        cursor:pointer;
      }
      .hCz{
        margin-left: 8px;
        display: inline-block;
        overflow: hidden;
        li{
          cursor:pointer;
          float: left;
          padding: 0 13px;
          color: #333333;
          font-size: $small_size;
          position: relative;
          &:after{
            content: '';
            position: absolute;
            right: 0;
            width: 1px;
            height: 16px;
            top: 5px;
            background-color: #333;
          }
          &:last-child:after{
            width: 0;
          }
        }
      }
    }

  }
  .skinUl{
    li{
      border-bottom: 1px solid #eaeaea;
      padding: 12px 20px;
      font-size: $small_size;
      cursor: pointer;
      .colorRound{
        border-radius: 50%;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        display: inline-block;
        width: 25px;
        height: 25px;
        vertical-align: middle;
        margin-right: 15px;

      }
      .el-icon-check{
        color: red;
        display: none;
        float: right;
        font-size: 20px;
      }

    }
    .actived{
      .el-icon-check{
        display: block;
      }
    }

  }
</style>

<style lang="scss">
  #mHeader{
  .data-picker{
    margin-left: 50px;
  .el-input__inner{
    background-color: transparent !important;
    border: none;
    color: rgb(6, 136, 188);
    font-size: 16px;
    padding-left: 35px;
  }
  .el-input__prefix{
    font-size: 20px;
    color: #666666;
  }
  }
    .headerSelect{
      .el-input__inner{
        border: none;
        background-color:#FAFCFF
      }
    }
    .headerSelect.blue{input{color: #30aabc;}}
    .headerSelect.green{input{color: #0688BC;}}
    .headerSelect.orange{input{color: #F6993F;}}
    .headerSelect.pink{input{color: #F69191;}}
    .headerSelect.popular{input{color: #8978F1;}}
  }
</style>
