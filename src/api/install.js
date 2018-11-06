// 导入模块
import apiList from './apiList'

const install = function (Vue) {
  if (install.installed) return
  install.installed = true
  Object.defineProperties(Vue.prototype, {
    $api: {
      get () {
        return apiList
      }
    },
    $downloadFile:{
      down(data){
        if (!data) {
          return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'excel1111.xlsx')
        document.body.appendChild(link)
        link.click()
      }
    }
  })
}

export default {
  install
}
