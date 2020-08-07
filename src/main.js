import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookie from 'vue-cookie'
import store from './store/index'

import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

axios.defaults.baseURL = '/api'
axios.defaults.timeout = 8000
// 接口响应拦截
axios.interceptors.response.use((response) => {
  let res = response.data
  if (res.status == 0) {
    return res.data
  } else if (res.status == 10) { //未登录
    let path = window.location.hash
    if (path != '#/index') {
      window.location.href = '/#/login'
    }
    // window.location.href = '/#/login';

    return Promise.reject(res)
  } else {
    Message.warning(res.msg);
    return Promise.reject(res)
  }
})

Vue.use(VueAxios, axios)
Vue.use(VueCookie)

Vue.prototype.$message = Message
Vue.prototype.message = (mes, type = 'warning', duration = 2000) => {
  Vue.prototype.$message({
    showClose: true,
    message: mes,
    type: type,
    duration: duration,
    center: true
  })
}

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
