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
//import { resolve } from 'dns';
//import { Promise } from 'q';
  export default {
    name: 'CurrentChat',
    data () {
      return {
        msg: '',
        upload: false,
        file: '',
        roomname: 'before',
        receiver: '',
        userSessionCipher: '',
        cryptr : new Window.Cryptr('bluffkey')
          }
      },
    methods: {
      fileupload(){
        this.file = this.$refs.file.files[0]
      },
      submitfile(){
        this.upload = false
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
        //var cryptr = new Window.Cryptr('bluffkey')
        var cipher = this.cryptr.encrypt(this.msg)
        console.log(cipher)
         this.$socket.sendObj({
                  'message': cipher,
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
          } 
          this.axios.get("http://localhost:8000/api/getkeys/", {params: {user_id: this.receiver}}).then((response)=>{
          console.log(response.data)
          var identityKey = this.str2ab(response.data.bundle[0])
          var preKey = {
            'keyId' : parseInt(response.data.bundle[1]),
            'publicKey' : this.str2ab(response.data.bundle[2])
          }
          var registrationId = parseInt(response.data.bundle[3])
          var signedPreKey = {
            'keyId' :parseInt(response.data.bundle[4]),
            'publicKey' : this.str2ab(response.data.bundle[5]),
            'signature' : this.str2ab(response.data.bundle[6])
          }
          var preKeyBundle = {
            identityKey: identityKey,
            preKey: preKey,
            registrationId: registrationId,
            signedPreKey: signedPreKey
          }
          console.log(preKeyBundle)
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
                var cryptr = new Window.Cryptr('bluffkey')
                var decipher = cryptr.decrypt(logs.messages[i].content)
                console.log(decipher)
                const Msgctor = Vue.extend(Msgchip)
                var instance = new Msgctor({
                propsData: {
                    msgcontent: decipher, 
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
                 //var cryptr = new Window.Cryptr('bluffkey')
                 var newdecipher = this.cryptr.decrypt(logs.message.content)
                 console.log(newdecipher)
                   const Msgctor = Vue.extend(Msgchip)
                    instance = new Msgctor({
                    propsData: {
                        msgcontent: newdecipher, 
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