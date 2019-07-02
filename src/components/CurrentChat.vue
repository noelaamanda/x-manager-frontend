<template>
      <v-content>
          <div ref="container"></div>
          <v-text-field prepend-icon="attach_file" v-model="msg" @click:prepend="upload = true">
          </v-text-field>
          <v-dialog v-model="upload">
            <v-card lazy persistent v-model="upload" height="500px">
              <input type="file" id="file" ref="file" v-on:change="fileupload()"/>
              <v-card-actions>
                <v-btn color="primary" @click="upload=false">Annuler</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="submitfile()">Send</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <span>
              <v-btn icon flat @click="sending"> <v-icon>send</v-icon> </v-btn>
          </span>
      </v-content>
</template>

<script>
import Vue from 'vue'
import Msgchip from './Msgchip.vue'
import { Promise } from 'q';
  export default {
    name: 'CurrentChat',
    data () {
      return {
        msg: '',
        upload: false,
        file: '',
        roomname: 'before',
        receiver: ''
          }
      },
    methods: {
      fileupload(){
        this.file = this.$refs.file.files[0]
      },
      submitfile(){
        let formData = new FormData();
        formData.append('file', this.file); 
        formData.append('author', 1);
        formData.append('chatdoc', 1);
        this.axios.post('http://localhost:8000/chat/docs/',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            ).then(function(data){
              console.log(data.data);
            })
            .catch(function(){
              console.log('FAILURE!!');
            });
      },
      str2ab(str) {
      var buf = new ArrayBuffer(str.length); // 2 bytes for each char
      var bufView = new Uint8Array(buf);
      for (var i=0, strLen=str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      } 
      return buf;
      },
      sending: function() {
        this.$socket.sendObj({
            'message':this.msg,
            'command': 'new_message',
            'from': this.$store.state.username,
            'chatId': this.$store.state.chatId
            })
          },
      },
      mounted: function () {  var chatId = this.$store.state.chatId
        this.axios.get(`http://localhost:8000/chat/${chatId}`).then(response =>{
          for (var i=0; i<2; i++){
            if (this.$store.state.user_id != response.data.participants[i]){
              this.receiver = response.data.participants[i]
            } 
          }  console.log(this.$store.state.user_id)
          this.axios.get("http://localhost:8000/api/getkeys/", {params: {user_id: this.receiver}}).then((response)=>{
          console.log(response.data)
          var preKeyBundle = []
          preKeyBundle.push({'identityKey': this.str2ab(response.data.bundle[0])})
          var preKey = []
          preKey.push({'keyId' : response.data.bundle[1]}),
          preKey.push({'publicKey' : this.str2ab(response.data.bundle[2])})
          preKeyBundle.push(preKey) 
          preKeyBundle.push({'registrationId' :response.data.bundle[3]})
          var signedPreKey = []
          signedPreKey.push({'keyId' :response.data.bundle[4]})
          signedPreKey.push({'publicKey' : this.str2ab(response.data.bundle[5])})
          signedPreKey.push({'signature' : this.str2ab(response.data.bundle[6])})
          preKeyBundle.push(signedPreKey)
          console.log(preKeyBundle)
          var Alice_ADDRESS=new window.libsignal.SignalProtocolAddress("yyyyyyyyyyyyy", 1)
          var builder = new window.libsignal.SessionBuilder(this.$userStore, Alice_ADDRESS)
          return builder.processPreKey(preKeyBundle).then(function() {
            var originalMessage = "success! it worked oh."
            var userSessionCipher = new window.libsignal.SessionCipher(this.$userStore, user_ADDRESS)
            userSessionCipher.encrypt(originalMessage).then(function(ciphertext) {
            console.log(ciphertext)
              })
          })
        })
      })
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
              if (logs.messages == 'No message yet'){
                this.$refs.container.appendChild(document.createTextNode('No messages yet'))
              } else {
                for( let i = 0; i<logs.messages.length; i++){
                var sender = logs.messages[i].author
                const Msgctor = Vue.extend(Msgchip)
                var instance = new Msgctor({
                propsData: {
                    msgcontent: logs.messages[i].content, 
                    msgauthor: logs.messages[i].author, 
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
      },
  }
</script>

<style scoped>
</style>