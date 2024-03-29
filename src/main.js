import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios' 




Vue.use(VueAxios, axios);
Window.encryptor = require('file-encryptor')
Window.Cryptr = require('cryptr')
//import libsignal from '../node_modules/libsignal-protocol-javascript/dist/libsignal-protocol.js'
//window.Cookies = require('js-cookie');
/*import Cookies from 'js-cookie'
var csrftoken = Cookies.get('csrftoken');
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrftoken;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";*/
Vue.prototype.$userStore = new window.SignalProtocolStore();
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
