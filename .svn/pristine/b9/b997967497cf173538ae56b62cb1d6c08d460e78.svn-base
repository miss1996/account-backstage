import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      component: Main,
      collapse:false,
      visible:false
    },
    {
      path: '/',
      component: Main,
      collapse:false,
      visible:false,
      children:[
        {
          path: 'index',
          component: resolve => require(['../components/Index.vue'], resolve),
          meta: { title: '首页' },
          visible:false
        },{
          path: 'accountCustomer',
          name:'accountCustomer',
          meta: { title: '' },
          component: resolve => require(['../components/Setting/accountCustomer.vue'], resolve),
          collapse:false,
          visible:false
        },{
          path: 'trimVoucher',
          name:'trimVoucher',
          meta: { title: '凭证管理' },
          component: resolve => require(['../components/Voucher/trimVoucher.vue'], resolve),
          collapse:false,
          visible:false
        },{
          path: 'fileVoucher',
          name:'fileVoucher',
          meta: { title: '导入凭证' },
          component: resolve => require(['../components/Voucher/fileVoucher.vue'], resolve),
          collapse:false,
          visible:false
        },{
          path: 'serviceClassification',
          name:'serviceClassification',
          meta: { title: '业务分类' },
          component: resolve => require(['../components/Voucher/serviceClassification.vue'], resolve),
          collapse:false,
          visible:false
        },{
          path: 'currencyCreate',
          name:'currencyCreate',
          meta: { title: '新建账套' },
          component: resolve => require(['../components/Setting/currencyCreate.vue'], resolve),
          collapse:false,
          visible:false
        }
      ]
    },
    {
      path: '/',
      name: '凭证',
      iconCls: require('../assets/imgs/icon_pingzheng.svg'),//图标样式class
      component: Main,
      actived:false,
      children:[
        {
          path: 'recordCredential',
          component: resolve => require(['../components/Voucher/recordCredential.vue'], resolve),
          meta: { title: '录凭证' }
        },{
          path: 'checkCredential',
          component: resolve => require(['../components/Voucher/checkCredential.vue'], resolve),
          meta: { title: '查凭证' }
        },{
          path: 'sumVoucher',
          component: resolve => require(['../components/Voucher/sumVoucher.vue'], resolve),
          meta: { title: '凭证汇总表' }
        },{
          path: 'originalCertificate',
          component: resolve => require(['../components/Voucher/originalCertificate.vue'], resolve),
          meta: { title: '原始凭证' }
        }
      ]
    },
    {
      path: '/',
      name: '账簿',
      iconCls: require('../assets/imgs/icon_zhangbu.svg'),//图标样式class
      component: Main,
      actived:false,
      children: [
        {
          path: 'accountState',
          component: resolve => require(['../components/Account/accountState.vue'], resolve),
          meta: { title: '明细账' },
        },
        {
          path: 'Ledger',
          component: resolve => require(['../components/Account/Ledger.vue'], resolve),
          meta: { title: '总账' },
        },
        {
          path: 'moreAccount',
          component: resolve => require(['../components/Account/moreAccount.vue'], resolve),
          meta: { title: '多栏账' },
        },
        {
          path: 'balanceReport',
          component: resolve => require(['../components/Account/balanceReport.vue'], resolve),
          meta: { title: '科目余额表' },
        },
        {
          path: 'numDetail',
          component: resolve => require(['../components/Account/numDetail.vue'], resolve),
          meta: { title: '数量金额明细账' },
        },
        {
          path: 'numTotal',
          component: resolve => require(['../components/Account/numTotal.vue'], resolve),
          meta: { title: '数量金额总账' },
        },
        {
          path: 'sumSheet',
          component: resolve => require(['../components/Account/sumSheet.vue'], resolve),
          meta: { title: '核算项目余额表' },
        },
        {
          path: 'sumSheetProject',
          component: resolve => require(['../components/Account/sumSheetProject.vue'], resolve),
          meta: { title: '核算项目明细账' },
        },{
          path: 'sheetSumProject',
          component: resolve => require(['../components/Account/sheetSumProject.vue'], resolve),
          meta: { title: '核算项目组合表' },
        }
      ]
    },
    {
      path: '/',
      name: '报表',
      component: Main,
      actived:false,
      iconCls: require('../assets/imgs/icon_baobiao.svg'),//图标样式class
      children: [
        {
          path: 'sateofExpenses',
          meta: { title: '费用明细表' },
          component: resolve => require(['../components/Report/sateofExpenses.vue'], resolve),
        },{
          path: 'jsState',
          meta: { title: '主要应交税金明细表' },
          component: resolve => require(['../components/Report/jsState.vue'], resolve),
        },{
          path: 'cashChart',
          meta: { title: '现金流量表' },
          component: resolve => require(['../components/Report/cashChart.vue'], resolve),
        },{
          path: 'incomeState',
          meta: { title: '利润表' },
          component: resolve => require(['../components/Report/incomeState.vue'], resolve),
        },{
          path: 'balanceSheet',
          meta: { title: '资产负债表' },
          component: resolve => require(['../components/Report/balanceSheet.vue'], resolve),
        }
      ]
    },
    {
      path: '/',
      iconCls: require('../assets/imgs/icon_jiezhang.svg'),//图标样式class
      component: Main,
      collapse:false,
      actived:false,
      children:[
        {
          path: 'settle',
          meta: { title: '结账' },
          component: resolve => require(['../components/Settle.vue'], resolve),
        }
      ]
    },
    {
      path: '/',
      name: '设置',
      component: Main,
      actived:false,
      iconCls: require('../assets/imgs/icon_shezhi.svg'),//图标样式class
      children: [
        {
          path: 'subject',
          meta: { title: '科目' },
          component: resolve => require(['../components/Setting/Subject.vue'], resolve),
        },{
          path: 'proofWords',
          meta: { title: '凭证字' },
          component: resolve => require(['../components/Setting/proofWords.vue'], resolve),
        },{
          path: 'currency',
          meta: { title: '币别' },
          component: resolve => require(['../components/Setting/Currency.vue'], resolve),
        },{
          path: 'account',
          meta: { title: '辅助核算' },
          component: resolve => require(['../components/Setting/Account.vue'], resolve),
        },{
          path: 'financeBalance',
          meta: { title: '财务初始余额' },
          component: resolve => require(['../components/Setting/financeBalance.vue'], resolve),
        },{
          path: 'saleStroageData',
          meta: { title: '进销存基础资料' },
          component: resolve => require(['../components/Setting/saleStroageData.vue'], resolve),
        },{
          path: 'saleStroage',
          meta: { title: '关联进销存' },
          component: resolve => require(['../components/Setting/saleStroage.vue'], resolve),
        },{
          path: 'systemSetting',
          meta: { title: '系统参数' },
          component: resolve => require(['../components/Setting/systemParam.vue'], resolve),
        },{
          path: 'fbackup',
          meta: { title: '备份与恢复' },
          component: resolve => require(['../components/Setting/fBackup.vue'], resolve),
        },{
          path: 'wvas',
          meta: { title: '增值服务' },
          component: resolve => require(['../components/Setting/Wvas.vue'], resolve),
        },{
          path: 'voucherTemplate',
          meta: { title: '凭证模板' },
          component: resolve => require(['../components/Setting/voucherTemplate.vue'], resolve),
        },{
          path: 'paperTemplate',
          meta: { title: '套打模板' },
          component: resolve => require(['../components/Setting/paperTemplate.vue'], resolve),
        },
        {
          path: 'daily',
          meta: { title: '操作日志' },
          component: resolve => require(['../components/Setting/Daily.vue'], resolve),
        }
      ]
    }
  ]
})
