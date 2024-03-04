import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css';
import axios from "axios";
import moment from 'moment'
import VueRouter from "vue-router";

Vue.prototype.moment = moment
Vue.prototype.$axios = axios;
Vue.prototype.$httpUrl = 'http://139.155.138.49:25677'
Vue.use(VueRouter)

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')
