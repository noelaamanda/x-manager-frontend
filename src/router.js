import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
import Messaging from './components/Messaging.vue'
import CurrentChat from './components/CurrentChat'
import Inbox from './components/Inbox'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
