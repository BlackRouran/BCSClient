// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import axios from 'axios'
import 'mint-ui/lib/style.css'
import common from './common/common.js'
import qs from 'qs'
import Calendar from 'vue2-datepick'

//axios config
// axios.defaults.baseURL = 'http://99.10.51.19:8888/bcsServer'
axios.defaults.baseURL = '/bcsServer'
axios.defaults.transformRequest = function(params, headers) {
    return qs.stringify(params);
}
axios.defaults.headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
axios.defaults.responseType = 'json'

Vue.use(Mint);
Vue.use(Calendar)
Vue.config.productionTip = false
Vue.prototype.$axios = axios; //把axios 绑定在vue原型上
Vue.prototype.common = common; //引用common.js 公共方法
/* eslint-disable no-new */
Vue.filter("initDate", function(value) {
    return value.substr(0, 10)
});
Vue.filter("inittitle", function(value) {
    var title = "无";
    if (value && value.length) {
        title = value;
    }
    return title
})
Vue.filter("initCom", function(value) {
    var title = "无";
    if (value && value.length) {
        title = value;
    }
    return title
})
Vue.filter("initregCpt", function(value) {
    var title = "无";
    if (value && value.length) {
        title = value + "万元";
    }
    return title
})
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})