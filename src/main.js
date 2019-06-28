import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import idb from './idb'



export var eventBus = new Vue();

Vue.use(VueAxios, axios);
//import libsignal from '../node_modules/libsignal-protocol-javascript/dist/libsignal-protocol.js'
//window.Cookies = require('js-cookie');
/*import Cookies from 'js-cookie'
var csrftoken = Cookies.get('csrftoken');
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrftoken;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";*/

Vue.config.productionTip = false

new Vue({
  router,
  store,
  idb,
  render: h => h(App)
}).$mount('#app')
