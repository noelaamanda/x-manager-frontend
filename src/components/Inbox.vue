<template>
  <v-container fluid fill-height>
    <v-layout fill-height>
      <v-flex :xs12="chatlist" :xs3="!chatlist" 
      class="chatlist" align-content-center>
        <v-card height="100%" class="carddisp">
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
                    <v-text-field label="Name" v-model="chatname" v-if="entry.length>1"
                    ></v-text-field>
                  </div>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat color="blue" @click.stop="newchat=false">Cancel</v-btn> <v-spacer></v-spacer>
                <v-btn flat color="blue" @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-list two-line v-if="chats" class="listing"> 
            <template v-for="(item, index) in chats">
              <v-list-tile :key="index" avatar ripple @click="chatpath(item.id)">
                <v-list-tile-content>
                  <v-list-tile-title> {{item.id}} </v-list-tile-title>
                  <v-list-tile-sub-title v-if="(item.name != '')"> {{item.name}}
                  </v-list-tile-sub-title>
                  <v-list-tile-sub-title v-else>Hey </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text> 1 min </v-list-tile-action-text>
                  <v-icon color="cyan">star_border</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            <v-divider v-if="index + 1 < chats.length"
            :key="index"></v-divider>
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
  export default {
      name: 'Inbox',
      data() {
          return {
            chatname: '',
            isGroup: false,
            chatlist: true,
            newchat: false,
            entry: '',
            contacts: [], chats: [], searchchat: '',
          }
      },
      methods: {
        save(){ 
          if (this.entry.length >1) {this.isGroup = true}
          var parti = [] 
          var temp = {}
          for (var i=0; i< this.entry.length; i++){
            for (var j=0; j< this.contacts.length; j++){
              if (this.contacts[j].username == this.entry[i]){
                temp = this.contacts[j].id
              }
            } parti.push(temp)
            temp = {}
          } this.newchat = false
          parti.push(this.$store.state.user_id)
          if (this.isGroup == false){
            this.chatname = this.entry + this.$store.state.username
          }
          if (parti.length > 1) {
            this.axios.post('http://localhost:8000/chat/create/', 
            {"participants":parti,"isGroup": this.isGroup, "name": this.chatname}
          ).then(response =>{
          console.log(response.data)
          alert('chat successfully created')
        })
          }
        this.axios.get('http://localhost:8000/chat/', 
        {params: { username : this.$store.state.username}
        }).then((response) => {
          this.chats = []
          console.log('seen')
          for (var i = 0; i< response.data.length; i++){
            if (response.data[i].isGroup == false) {
              response.data[i].name = response.data[i].name.replace(this.$store.state.username, "")
            }this.chats.push(response.data[i])
          }
        })
        },
        chatpath(sender) {
          Vue.use(VueNativeSock, 'ws://127.0.0.1:8000' + '/ws/chat/' + sender + '/', { format: 'json' }, {
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 3000,
          })
          this.$socket.onopen = () => { 
            console.log('connection successful')
             this.chatlist = false
             this.$store.commit('activechat', sender)
             this.$router.push({ name: 'CurrentChat', params: {sender} })
              }
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
          for (var i = 0; i< response.data.length; i++){
            if (response.data[i].isGroup == false) {
              response.data[i].name = response.data[i].name.replace(this.$store.state.username, "")
            console.log(response.data[i].name)
            }this.chats.push(response.data[i])
          }
        }).catch(error => {
          alert(error) }),
        this.axios.get('http://localhost:8000/chat/users/').then(response =>{
          //this.contacts = response.data
          for (var i=0; i<response.data.length; i++){
            if (this.$store.state.user_id != response.data[i].id){
              this.contacts.push(response.data[i])
            } 
          }
        })
      }
  }
</script>

<style scoped>
   .chatlist {
      height: 100%;
      overflow-y: scroll;
      overscroll-behavior-y: auto;
  }
  .carddisp {
    background-color:rgb(206, 212, 218);
  }
  .listing {
    background-color:rgb(206, 212, 218);
  }
</style>