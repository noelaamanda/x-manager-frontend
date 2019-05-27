<template>
  <v-container>
    <v-layout>
      <v-flex :xs12="chatlist" :xs3="!chatlist"
      class="chatlist" align-content-center>
        <v-card>
          <h1>Chats</h1> 
          <v-list two-line>
            <template v-for="(item, index) in items">
              <v-list-tile :key="index" avatar ripple @click="chatpath(item.chatname)">
                <v-list-tile-content>
                  <v-list-tile-title> {{item.chatname}} </v-list-tile-title>
                  <v-list-tile-sub-title> {{item.msgcontent}} </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text> {{item.time}} </v-list-tile-action-text>
                  <v-icon color="cyan">star_border</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            <v-divider v-if="index + 1 < items.length" :key="`divider-$index`"></v-divider>
            </template>
          </v-list>
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
              count: 0,
              items: [
                 {
                     time: '1 min',
                     chatname: 'Lucas',
                     msgcontent: 'Hey, wanna hang out this weekend?'
                 },
                 {
                     time: '1 min',
                     chatname: 'Lucas',
                     msgcontent: 'Hey, wanna hang out this weekend?'
                 },
                 {
                     time: '1 min',
                     chatname: 'Lucas',
                     msgcontent: 'Hey, wanna hang out this weekend?'
                 },
                 {
                     time: '1 min',
                     chatname: 'Lucas',
                     msgcontent: 'Hey, wanna hang out this weekend?'
                 },
                  {
                     time: '1 min',
                     chatname: 'Lucas',
                     msgcontent: 'Hey, wanna hang out this weekend?'
                 },
                  {
                     time: '1 min',
                     chatname: 'Lucas',
                     msgcontent: 'Hey, wanna hang out this weekend?'
                 },
                  {
                     time: '1 min',
                     chatname: 'Lucas',
                     msgcontent: 'Hey, wanna hang out this weekend?'
                 },
                  {
                     time: '1 min',
                     chatname: 'Lucas',
                     msgcontent: 'Hey, wanna hang out this weekend?'
                 },
                  {
                     time: '1 min',
                     chatname: 'Lucas',
                     msgcontent: 'Hey, wanna hang out this weekend?'
                 },
                  {
                     time: '1 min',
                     chatname: 'Lucas',
                     msgcontent: 'Hey, wanna hang out this weekend?'
                 },
                  {
                     time: '1 min',
                     chatname: 'John',
                     msgcontent: 'Hey, wanna hang out this weekend?'
                 },
             ]
          }
      },
      methods: {
          chatpath(sender) {
            this.count++
            if (this.count > 1) {
              this.$socket.close()
            }
            Vue.use(VueNativeSock, 'ws://127.0.0.1:8000' + '/ws/chat/' + sender + '/', { format: 'json' }, {
              reconnection: true,
              reconnectionAttempts: 5,
              reconnectionDelay: 3000,
            })
                this.$socket.onopen = () => {
                alert('connection successful')
              }
             eventBus.$emit('chatname', sender)
             this.chatlist = false
             //alert(sender)
             this.$router.push({ name: 'CurrentChat', params: {sender} })
         }
      }
  }
</script>

<style scoped>
   .chatlist {
      height: 500px;
      overflow-y: scroll;
      overscroll-behavior-y: auto;
  }
</style>