<template>
  <v-app light>
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
  export default {
      name: 'Task',
      data () {
        return {
          menuSelected: '',
          menuList: [
              {text:'My Projects', list:'/projects'},
            {text:'My Tasks', list:'/tasks'},
        ]
        }
      },
      methods: {
        changeMenu (menu) {
          this.menuSelected = menu.list
          this.$router.push(menu.list)
        }
      }
  }
</script>

<style scoped>
  
</style>