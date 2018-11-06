import Vue from 'vue'
import vuex from 'vuex'
import unilt from './api/baseUtility'
import urls from './api/unsplash/url'
Vue.use(vuex)

const state = {
  navTabs:[{title:'首页',name:'index'}],
  tab:{
    name:'',
    title:''
  },
  activeTab:'index', //右侧默认激活tab
  activeMenu:'', //左侧默认打开menu
  skin_style:'green', //皮肤风格
  skin_color:'#0688BC', //皮肤颜色值
  accountSubject:[], //科目树状数据
  elTabsTreeActive:'1',
  assistArray:[],
  proofWordsArray:[]
}
const getters = {
  filterNavTabs: state => {
    return state.navTabs.filter(todo => todo.name == 'accountCustomer')
  }
}
const mutations = {
  INCREMENT (state,it) {
    state.tab.name = it.name;
    state.tab.title = it.title;
    let _arr = state.navTabs.filter(function (item,index,arr) {
      return item.name === state.tab.name
    });
   
    state.activeTab = state.tab.name;
    if(_arr === undefined || _arr.length == 0){
      state.navTabs.push(
        {
          title: state.tab.title,
          name: state.tab.name
        }
      )
      sessionStorage.setItem('storeState',JSON.stringify(state.navTabs));
    }else{
      if(state.tab.name === 'accountCustomer'){
        state.navTabs.map(function(item,index){
          if(item.name === 'accountCustomer'){
            item.title = state.tab.title
          }
        })
      }
    }
  },
  ASSIST(state,item){
    state.tab.name = item.name;
    state.tab.title = `辅助核算_${item.title}`;
    state.navTabs.map(function(item,index){
      if(item.name === 'accountCustomer'){
        item.title = state.tab.title
      }
    })
  },
  REMOVETAB(state, item){
    let tabs = state.navTabs;
    if(item === 'all'){
      state.navTabs.splice(1)
      state.activeTab = 'index'
      state.activeMenu = '首页'
      sessionStorage.removeItem('activeAside')
      sessionStorage.removeItem('storeState');
      return false;
    }else if(item === 'other_all'){
      state.navTabs.splice(1);
      this.commit('INCREMENT',{
        name:state.tab.name,
        title:state.tab.title
      });
      return false;
    }
    let activeName = item == 'actived' ? state.activeTab : item.datas.activeName;
    let targetName = item == 'actived' ? state.activeTab : item.datas.targetName;
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          let nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            activeName = nextTab.name;
          }
        }
      });
    }
    state.activeTab = activeName;
    state.navTabs = tabs.filter(tab => tab.name !== targetName);
    console.log(state.activeTab);
    //删除sessionStorage中的数据
    sessionStorage.setItem('storeState',JSON.stringify(state.navTabs));
  },
  CHANGE_STATE(state,data){
    if(sessionStorage.getItem('activeAside') && state.activeMenu !== JSON.parse(sessionStorage.getItem('activeAside')).title){
      state.activeMenu = JSON.parse(sessionStorage.getItem('activeAside')).title;
      state.activeTab = JSON.parse(sessionStorage.getItem('activeAside')).path;
    }else{
      state.activeMenu = data.title;
      state.activeTab = data.path;
      sessionStorage.setItem('activeAside',JSON.stringify(data))
    }
  },
  CHANGE_SKIN(state,data){
    state.skin_style = data.style;
    state.skin_color = data.color;
    sessionStorage.setItem('skin',JSON.stringify(data))
  },
  ACCOUNT_SUBJECT_MUACTION(state,data){
    if(data.length > 0){
      state.accountSubject = [...data]
    }
    //console.log(state.accountSubject);
  },
  PROOF_WORDS_LIST(state,data){
    if(data.length > 0){
      state.proofWordsArray = [...data]
    }
    //console.log(state.proofWordsArray);
  },
  CHANGE_ARRAY(state,data){
    console.log(data)
    state.assistArray=data
    sessionStorage.setItem('assist',JSON.stringify(data))
  }
}

const actions = {
  async account_subject ({ dispatch, commit },data) {
    try {
      let params = unilt.baseEncode({
        "accountId": "1",
        "subjectTypeId": data
      },urls.subjectList)
      let res = await new Vue().$api.unsplash.baseInterface(params);
      //console.log(res);
      if(res.data && res.data.content){
        let _resData = unilt.baseDecode(res.data.content)//解密
        //console.log(_resData);
        //console.log('-------------------------------');
        let _array = [];
        if(_resData && _resData.length > 0){
          //树形结构
          for (let i = 0; i < _resData.length; i++) {
            let _data = _resData[i];
            let _innerData = {
              id:_data.subjectId,
              pId:_data.parentId,
              name:_data.subjectCode+' '+_data.subjectName,
              open:false,
            }
            if(_data.isParent === true){
              _innerData.iconOpen = require('./assets/imgs/openwenjian.svg');
              _innerData.iconClose = require('./assets/imgs/icon_wenjian2.svg')
            }else{
              _innerData.icon = require('./assets/imgs/icon_wenjian3.svg')
            }
            _array.push(_innerData)
          }
          commit('ACCOUNT_SUBJECT_MUACTION',_array);
        }
      }
    }catch (e) {
      console.log(e)
    }
    dispatch('proof_words_list')
  },
  async proof_words_list ({ dispatch, commit}){
   // alert(1)
    try {
      let params = unilt.baseEncode({
          accountId: "1" // 暂时传默认值
        },urls.proofWordsList);
      let res = await new Vue().$api.unsplash.baseInterface(params);
      if (res.returnStatus.code != "0000") {
        new Vue().$message.error(res.returnStatus.message);
        return;
      }
      if (res.data && res.data.content) {
        let _resData= unilt.baseDecode(res.data.content); //解密
        commit('PROOF_WORDS_LIST',_resData);
      }
    } catch (e) {
      console.log(e);
    }
  },
}

// 创建 store 实例
export default new vuex.Store({//store对象
  state,
  mutations,
  getters,
  actions
})
