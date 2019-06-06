<template>
  <v-toolbar fixed app dark class="header elevation-0" color="#142841">
    <v-toolbar-title class="mr-5">
      <router-link to="/">
        <v-icon large class="mr-2">home</v-icon>
        <img src="../assets/xmanager.svg">
      </router-link>
    </v-toolbar-title>
    <div
     v-for="(data, item) in menuList"
     :key="item"
     class="Rectangle-2"
     @click="gotoMenu(data)"
    >
      {{ data.text }}
    </div>
    <v-spacer></v-spacer>
    <div class="notifications_div">
      <v-btn overlap flat icon style="margin-right: 15px;">
        <v-badge overlap color="red" icon>
          <span slot="badge">3</span>
          <v-icon color="white">notifications</v-icon>
        </v-badge>
      </v-btn>
      <v-btn overlap flat icon style="margin-right: 15px;">
        <v-badge overlap color="red" icon>
          <span slot="badge">10</span>
          <v-icon color="white">chat</v-icon>
        </v-badge>
      </v-btn>
    </div>
    <div class="user_div">
          <v-menu offset-y v-model="menu">
            <v-btn flat slot="activator" :ripple="false">
              <v-avatar class="userimg">
                <img src="../assets/user.png" alt="user">
              </v-avatar>
              <span class="username">Ashdown X..</span>
            </v-btn>
            <v-list>
              <v-list-tile @click="profile">
                <v-list-tile-title>
                  <span class="pa-2"><v-icon>account_box</v-icon></span>Profile
                </v-list-tile-title>
              </v-list-tile>
              <v-divider/>
              <v-list-tile @click="logout">
                <v-list-tile-title>
                  <span class="pa-2"><v-icon>logout</v-icon></span>Sign out
                </v-list-tile-title>
              </v-list-tile>
              <v-divider/>
              <v-list-tile @click="admin">
                <v-list-tile-title>
                  <span class="pa-2"><v-icon>card_membership</v-icon></span>register
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </div>
  </v-toolbar>
</template>

<script>
  export default {
    name: 'Header',
    data () {
      return {
        menu: false,
      }
    },
    methods: {
      gotoMenu (data) {
          this.$emit('MenuClicked', data)
        },
      profile() {alert('No data available')},
      logout() {
        this.axios.get("http://localhost:8000/api/logout/").then((response) => {
          alert(response.data)
        })
      },
      admin() {
        this.$router.push({path: '/admin'})
      }
    },
    props: ['menuList']
  }
</script>

<style scoped>
  .notifications_div {
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .user_div {
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .username {
    padding-left: 5px;
  }

  .Rectangle-2 {
    padding: 3px 25px 15px 25px;
    margin: 30px 40px 0px 0px;
    border-radius: 3px;
    font-family: Roboto,serif;
    font-size: 15px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.8;
    letter-spacing: normal;
    text-align: center;
    background-color: transparent;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    }
</style>