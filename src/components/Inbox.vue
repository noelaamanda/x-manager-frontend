<template>
  <v-container fluid fill-height>
    <v-layout fill-height="">
      <v-flex :xs12="chatlist" :xs3="!chatlist" 
      class="chatlist" align-content-center>
        <v-card color="blue-grey lighten-4" height="100%">
          <h1>Chats</h1> 
          <v-text-field v-model="searchchat"
            prepend-icon="add" append-icon="search" clear-icon="mdi-close-circle"
            clearable label="Create or search chat here" type="text"
            @click:clear="clearMessage" @click:prepend="newchat = true"
          ></v-text-field>
          <v-dialog v-model="newchat" lazy persistent width="300px">
            <v-card>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">New Chat</h3>
                  <div>
                    <v-autocomplete v-model="entry" :items="contacts" item-text="username" multiple
                    ></v-autocomplete>
                  </div>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat color="blue" @click.stop="newchat=false">Annuler</v-btn> <v-spacer></v-spacer>
                <v-btn flat color="blue" @click="save">Sauvegarder</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-list two-line v-if="chats" background-color="blue-grey lighten-4">
            <template v-for="(item, index) in chats">
              <v-list-tile :key="index" avatar ripple @click="chatpath(item.id)">
                <v-list-tile-content>
                  <v-list-tile-title> {{item.id}} </v-list-tile-title>
                  <v-list-tile-sub-title> Hey </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text> 1 min </v-list-tile-action-text>
                  <v-icon color="cyan">star_border</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            <v-divider v-if="index + 1 < chats.length" :key="`divider-$index`"></v-divider>
            </template>
          </v-list>
          <div v-else style="width: 50%; margin: 0 auto">
            <v-chip dark>
              <strong> No Chats Yet </strong>
            </v-chip>
          </div>
        </v-card>
        </v-flex>
        <v-flex :xs0="chatlist" :xs9="!chatlist">
          <router-view></router-view>    
        </v-flex>      
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
import {eventBus} from '../main';
  export default {
      name: 'Inbox',
      data() {
          return {
              chatlist: true,
              newchat: false,
              entry: null,
              contacts: [], chats: [], searchchat: '',
          }
      },
      methods: {
        save(){
          var parti = [] 
          var temp = {}
          for (var i=0; i< this.entry.length; i++){
            for (var j=0; j< this.contacts.length; j++){
              if (this.contacts[j].username == this.entry[i]){
                temp = this.contacts[j].id
              }
            } parti.push(temp)
            temp = {}
          }
          this.axios.post('http://localhost:8000/chat/create/', {"participants":parti, "messages": []}
          ).then(response =>{
          alert(response.data)
        })
        },
          chatpath(sender) {
            Vue.use(VueNativeSock, 'ws://127.0.0.1:8000' + '/ws/chat/' + sender + '/', { format: 'json' }, {
              reconnection: true,
              reconnectionAttempts: 5,
              reconnectionDelay: 3000,
            })
                this.$socket.onopen = () => { 
                  //this.fetch_messages()
                  alert('connection successful')
              }
             eventBus.$emit('chatname', sender)
             this.chatlist = false
             //alert(sender)
             this.$router.push({ name: 'CurrentChat', params: {sender} })
         },
         clearMessage(){
           this.searchchat = ''
         }
         /*fetch_messages(){
           this.$socket.sendObj({
                      'command': 'fetch_messages',
                  })
         }*/
      },
      mounted: function(){
        this.axios.get('http://localhost:8000/chat/', 
        {params: { username : this.$store.state.username}
        }).then((response) => {
          this.chats = response.data
        }).catch(error => {
          alert(error) }),
        this.axios.get('http://localhost:8000/chat/users/').then(response =>{
          this.contacts = response.data
        })
      }
  }
</script>

<style scoped>
   .chatlist {
      height: 500px;
      overflow-y: scroll;
      overscroll-behavior-y: auto;
  }
  .bg {
    background-color: blue-grey lighten-3 !important;
  }
</style>