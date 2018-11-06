<template>
  <div id="account" class="public-container">
    <el-row>
      <el-col :span="16">
        <h1>辅助核算</h1>
      </el-col>
      <el-col align="right" :span="8">
        <el-row class="btn-box">
          <closeBtn></closeBtn>
        </el-row>
      </el-col>
    </el-row>

    <el-row class="container">
      <el-row class="l_bBox">
        <el-col class="l_bItem" :class="skin_style" :span="6" v-for="(item,index) in i_list" :key="index" >
          <div @click="jumpPage(item.name,item.assistTypeId)">
            <img :src="item.src" alt="">
            <span>{{item.name}}</span>
          </div>
        </el-col>

        <el-col class="l_bItem zdy_bItem" :class="skin_style" :span="6" v-for="(item,index) in zdy_list" :key="'zdy_'+index" >
          <div @click="jumpPage(item.name,item.assistTypeId)">
            <img :src="require(`../../assets/imgs/${skin_style}/icon_moren.svg`)" alt="">
            <span>{{item.name}}</span>
          </div>
          <div class="operate">
            <i class="el-icon-edit" @click="editAccount(item.name,item.assistTypeId)"></i>
            <i class="el-icon-close" @click="delAccount(item.assistTypeId)"></i>
          </div>
        </el-col>

        <el-col class="addIcon l_bItem" :span="6" >
          <div class="el-icon-plus" @click="dialogVisible = true; updateOrinsert = 'add'"></div>
        </el-col>
      </el-row>
    </el-row>

    <el-dialog
      title="新增分类"
      :visible.sync="dialogVisible"
      custom-class="myDialog"
      width="573px">
      <el-form ref="classform" :model="classform" label-width="57px">
        <el-form-item label="名称">
          <el-input v-model="classform.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <span class="btn" :style="{background:skin_color}" @click="saveClass">保存</span>
        <span class="btn" @click="dialogVisible = false">取消</span>
      </div>
    </el-dialog>

    <!-- 删除 -->
    <el-dialog title="系统提示" :visible.sync="dialogVisibleDelete" custom-class="myDialog" width="417px" class="warning">
			<div class="warning-box">
        <img class="warning-png" src="../../assets/imgs/warning.png" alt="">
        <div class="warning-note" >
          <p>您确定要删除该辅助核算吗？</p>
          <p>删除后不可恢复！</p>
        </div>
      </div>
			<div slot="footer" class="dialog-footer">
				<span class="btn" :style="{background:skin_color}" @click="_assisttypeDelete" >确定</span>
				<span class="btn" @click="dialogVisibleDelete = false">取消</span>
			</div>
		</el-dialog>

  </div>
</template>

<script>
  import { mapState, } from 'vuex'
  import closeBtn from '../closeTab'
  import urls from '../../api/unsplash/url'
  import utility from '../../api/baseUtility'
    export default {
      name: "Account",
      data(){
        return{
          i_list:[],
          zdy_list:[],
          dialogVisible:false,
          dialogVisibleDelete:false,
          assisttypeDeleteId:'',
          updateOrinsert:'',
          classform:{
            name:''
          }
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
            src:require(`../../assets/imgs/${this.skin_style}/icon_kehu.svg`),
            name:'客户',
            assistTypeId:'1'
          },{
            src:require(`../../assets/imgs/${this.skin_style}/icon_gongyingshang.svg`),
            name:'供应商',
            assistTypeId:'2'
          },{
            src:require(`../../assets/imgs/${this.skin_style}/icon_xiangmu.svg`),
            name:'项目',
            assistTypeId:'3'
          },{
            src:require(`../../assets/imgs/${this.skin_style}/icon_zhiyuan.svg`),
            name:'职员',
            assistTypeId:'4'
          },{
            src:require(`../../assets/imgs/${this.skin_style}/icon_cunhuo.svg`),
            name:'存货',
            assistTypeId:'5'
          },{
            src:require(`../../assets/imgs/${this.skin_style}/icon_bumen.svg`),
            name:'部门',
            assistTypeId:'6'
          }
          ]
          this.i_list = icons;
        },
        jumpPage(name,param){
          this.$router.push({ path:'accountCustomer', query: {accountParam:param,myname:name}});
        },
        saveClass(){
          if(this.classform.name == ''){
            this.$message({
              message: '名称不能为空！',
              type: 'warning'
            });
            return ;
          }
          if(this.updateOrinsert == 'edit'){
            this._assisttypeUpdate();
          }else{
            this._assisttypeInsert();
          }
          // this.dialogVisible = false;
        },
        editAccount(name,id){
          this.dialogVisible = true;
          this.updateOrinsert = 'edit'
          this.classform.name = name;
          this.assisttypeDeleteId = id;
        },
        delAccount(id){
          this.assisttypeDeleteId = id;
          this.dialogVisibleDelete = true;
        },
        async _assisttypeInsert(){
         try {
            let params = utility.baseEncode({
              "accountId": "1",
              "name": this.classform.name
            },urls.assisttypeInsert)
            let res = await this.$api.unsplash.baseInterface(params)
            console.log(res);
            if(res.returnStatus.code === '0000'){
              this.classform.name = '';
              this.$message({
                message: '添加成功！',
                type: 'success'
              });
              this._assisttypeSelect();
            }else{
               this.$message.error('添加失败!');
            }
          }catch (e) {
            console.log(e)
          }
        },
       async _assisttypeUpdate(){
         try {
            let params = utility.baseEncode({
              "assistTypeId": this.assisttypeDeleteId,
              "name": this.classform.name
            },urls.assisttypeUpdate)
            let res = await this.$api.unsplash.baseInterface(params)
            console.log(res);
            if(res.returnStatus.code === '0000'){
              this.classform.name = '';
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
              this._assisttypeSelect();
            }else{
               this.$message.error('修改失败!');
            }
            this.dialogVisible = false;
          }catch (e) {
            console.log(e)
          }
       },
        async _assisttypeDelete(){
          try {
            let params = utility.baseEncode({
              "accountId": "1",
              "assistTypeId": this.assisttypeDeleteId
            },urls.assisttypeDelete)
            let res = await this.$api.unsplash.baseInterface(params)
            console.log(res);
            if(res.returnStatus.code === '0000'){
              this.$message({
                message: '删除成功！',
                type: 'success'
              });

              this._assisttypeSelect();
            }else{
               this.$message.error('删除失败!');
            }
            this.dialogVisibleDelete = false;
          }catch (e) {
            console.log(e)
          }
        },
        async _assisttypeSelect(){
          try {
            let params = utility.baseEncode({
              "accountId": "1"
            },urls.assisttypeSelect)
            let res = await this.$api.unsplash.baseInterface(params)
            console.log(res)
            if(res.data && res.data.content){
              let _resData = utility.baseDecode(res.data.content)//解密
              console.log(_resData)
              this.zdy_list = _resData.filter(function (item,index) {
                return item.assistTypeId > 6;
              })
              this.$store.commit('CHANGE_ARRAY',this.zdy_list)
            }
          }catch (e) {
            console.log(e)
          }
        },
      },
      watch:{
        skin_style(){
          this.changeSkin();
        }
      },
      created(){
        this.changeSkin();
        this._assisttypeSelect();
      }
    }
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
   #account{
     .l_bBox{
       margin-top: 10px;
       background-color: white;
       .l_bItem{
         position: relative;
         cursor: pointer;
         border-right:1px solid #eaeaea;
         border-bottom: 1px solid #eaeaea;
         padding: 40px 0;
         text-align: center;
         width: 20% !important;
         @include box-sizing;
         span{
           display: block;
           text-align: center;
           font-size: $middle_size;
           position: relative;
           bottom: 0;
           left: 0;
         }
         .operate{
          position: absolute;
          top: 10px;
          right: 10px;
          display: none;
          i{
            font-size: 25px;
            margin-left: 10px;
            color: #666
          }
        }
        &:hover{
          .operate{
            display: block;
          }
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
         height: 223px;
         line-height: 223px;
         padding: 0;
         .el-icon-plus{
           display: inline-block;
           font-size: 4rem;
           color: #999999;
           width: 100%;
           line-height: 223px;
         }
       }

     }
     
   }
</style>
