<template>
  <v-app light>
    <Header class="header"
      :menu-list="menuList"
       @MenuClicked="changeMenu"
    ></Header>
    <v-content app>
      <v-container 
       fluid class="pa-0 ma-0"
       wrap
       fill-height
      >
        <v-layout column>
          <v-flex xs12 shrink>see</v-flex>
          <v-flex xs12 grow>
            <router-view transition="fade-transition"></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Header from './Header'
  export default {
      name: 'Projman',
      data () {
        return {
          menuSelected: '',
          menuList: [
            {text:'My Tasks', list:'/projects'},
            {text:'My Projects', list:'/tasks'},
        ]
        }
      },
      methods: {
        changeMenu (menu) {
          this.menuSelected = menu.list
          this.$router.push(menu.list)
        }
      },
      components: {
          Header
      }
  }
</script>

<style scoped>
  
</style>