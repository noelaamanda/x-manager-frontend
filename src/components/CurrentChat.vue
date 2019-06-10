<template>
      <v-content>
          <div ref="container"></div>
          <v-text-field v-model="msg"></v-text-field>
          <span>
              <v-btn icon flat @click="sending"> <v-icon>send</v-icon> </v-btn>
          </span>
      </v-content>
</template>

<script>
import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
import Msgchip from './Msgchip.vue'
import {eventBus} from '../main';
  export default {
      name: 'CurrentChat',
      data () {
          return {
                msg: '',
                roomname: 'before'
          }
      },
      methods: {
          sending: function() {
                  this.$socket.sendObj({
                      'message':this.msg,
                      'command': 'fetch_messages'
                  })
          },
      },
      created: function () {
          this.$socket.onclose = () => {
                  alert('socket closed')
              },
           this.$socket.onmessage = ({data}) => {
                    var logs = JSON.parse(data);
                    alert(logs.message)
                    const Msgctor = Vue.extend(Msgchip)
                    var instance = new Msgctor({propsData: {msgcontent: logs.message}})
                    instance.$mount ()
                    this.$refs.container.appendChild(instance.$el)
                  } 
         alert('created')
         /*Vue.use(VueNativeSock, 'ws://127.0.0.1:8000' + '/ws/chat/' + this.roomname + '/', { format: 'json' }) 
         this.$socket.onopen = () => {
                  alert('connection successful')
              }*/
      },
      mounted: function() {
          alert ('mounted')
          
      },
      /*updated() {
          alert('updated')
      },*/
  }
</script>

<style scoped>
</style>