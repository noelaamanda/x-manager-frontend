import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  // User
     username: '',
     token: ''
  },
  mutations: {
    change(state, username){
      state.username = username
    },
    LOGIN_SUCCESS(state, response) {
    state.token = response.token
   }
  },
  getters: {
    username: state => state.username,
    token: state =>state.token
  },
  actions: {

  }
})
