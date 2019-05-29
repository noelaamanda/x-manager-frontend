import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
import Messaging from './components/Messaging.vue'
import CurrentChat from './components/CurrentChat'
import Inbox from './components/Inbox'
import Login from './components/Login'
import Register from './components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Register
    },
    {
      path: '/messaging',
      component: Messaging,
      children: [
        {
          path: '/',
          component: Inbox,
          children: [
            {
              path: 'chats/:sender',
              name: 'CurrentChat',
              component: CurrentChat
            },
          ]
        },
      ]
    }
  ]
})
