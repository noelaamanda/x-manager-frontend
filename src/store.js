import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  // User
     username: '',
     user_id: '',
     chatId: ''
  },
  mutations: {
    change(state, username){
      state.username = username
    },
    LOGIN_SUCCESS(state, user_id) {
    state.user_id = user_id
   },
    activechat(state, chatId){
      state.chatId = chatId
    }
  },
  getters: {
    username: state => state.username,
    user_id: state =>state.user_id,
    chatId: state => state.chatId
  },
  actions: {

  }
})
