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
            'command': 'new_message',
            'from': this.$store.getters.username,
            'chatId': 1
            })
          },
      },
      mounted: function () { alert('mounted')
        this.$socket.onclose = () => {
            alert('socket closed')
            },
        this.$socket.onopen = () => {
            this.$socket.sendObj({
                'command': 'fetch_messages',
                'chatId': 1
            })
        }
        this.$socket.onmessage = ({data}) => {
            var logs = JSON.parse(data);
            if (logs.command === 'messages'){
              if (logs.messages == 'no message yet'){
                this.$refs.container.appendChild(document.createTextNode('No messages yet'))
              } else {
                for( let i = 0; i<logs.messages.length; i++){
                var sender = logs.messages[i].author
                const Msgctor = Vue.extend(Msgchip)
                var instance = new Msgctor({
                propsData: {
                    msgcontent: logs.messages[i].content, 
                    msgauthor: logs.messages[i].timestamp, 
                    msgtime: logs.messages[i].timestamp
                    }
                }) 
                instance.$mount()
                if (sender== this.$store.getters.username){ 
                 this.$refs.container.appendChild(instance.$el).setAttribute("align", "right")
                } else {this.$refs.container.appendChild(instance.$el).setAttribute("align", "left")
                      }
                    }
              }
               } else if (logs.command === 'new_message') {
                 sender = logs.message.author
                   const Msgctor = Vue.extend(Msgchip)
                    instance = new Msgctor({
                    propsData: {
                        msgcontent: logs.message.content, 
                        msgauthor: logs.message.author, 
                        msgtime: logs.message.timestamp
                        }
                    })
                    instance.$mount ()
                    this.$refs.container.appendChild(instance.$el)
                    if (sender== this.$store.getters.username){
                        this.$refs.container.style.textAlign = "right"
                    } else {this.$refs.container.style.textAlign = "left"}
               }
                  } 
         /*Vue.use(VueNativeSock, 'ws://127.0.0.1:8000' + '/ws/chat/' + this.roomname + '/', { format: 'json' }) 
         this.$socket.onopen = () => {
                  alert('connection successful')
              }*/
      },
      /*mounted: function() {
          //this.$refs.container.appendChild(document.createTextNode("it worked"))
          alert (this.$store.getters.username)
          
      },*/
      /*updated() {
          alert('updated')
      },*/
  }
</script>

<style scoped>
</style>