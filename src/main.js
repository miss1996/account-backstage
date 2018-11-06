// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import 'es6-promise/auto'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import $ from 'jquery'
import router from './router'
import axios from 'axios'
import vuex from 'vuex'
import api from './api/install'
Vue.prototype.$axios = axios;
// axios.defaults.baseURL = '/api'

Vue.config.productionTip = false
Vue.use(api)
Vue.use(ElementUI)
Vue.use(vuex);
// sessionStorage.removeItem('storeState')
// sessionStorage.removeItem('activeAside')

store.dispatch('account_subject',1);//科目列表树状
//store.dispatch('proof_words_list');//凭证字
router.beforeEach((to, from, next) => {
  if(to.path === '/'){
    next({ path: '/index' })
  }else if(to.path !== '/' && to.path !== '/index'){
    let session_d = JSON.parse(sessionStorage.getItem('storeState')) || [];
    let state_d = store.state.navTabs;
    if(session_d.length > state_d.length ){
      session_d.forEach(function (item,index) {
        store.commit('INCREMENT',{
          name:item.name,
          title:item.title
        })
    })
    }else{
      let _name = to.path.substring(1);
      let _title = '';
      console.log(store.state)
      if(to.path.indexOf('accountCustomer') > 0){
        if(to.query.myname){
          _title = `辅助核算_${to.query.myname}`
        }else if(store.getters.filterNavTabs.length > 0){
          _title = `${store.getters.filterNavTabs[0].title}`
        }
        
      }else{
        _title = to.meta.title;
      }

      store.commit('INCREMENT',{
        name:_name,
        title:_title
      });
    }
    next();
    //记录左侧导航激活状态
      store.commit('CHANGE_STATE',{
        title:to.meta.title,
        path:to.path.substring(1)
      })
  }else{
    next()
  }


})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
