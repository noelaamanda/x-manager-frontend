<template>
  <v-container fluid class="main">
    <v-layout column align-content-space-around>
      <div class="logo">
        <img src="../assets/xmanager.svg" height="50" alt="">
      </div>
      <div class="center">
        <div class="login-form">
          <div class="email">
            <div>
              <span>Email</span>
            </div>
            <v-text-field class="email_input" solo name="email" v-model="username"></v-text-field>
          </div>
          <div class="password">
            <div>
              <span>Mot de passe</span>
            </div>
            <v-text-field solo name="password" v-model="password" hint="At least 8 characters" min="8" :append-icon="show ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (show = !show)" class="input-group--focused" :type="show ? 'password' : 'text'"></v-text-field>
          </div>
          <div class="forget">
            <span>Mot de passe oublie?</span>
          </div>
          <v-btn class="login-button" @click.native.prevent="handleLogin">Login</v-btn>
          <div class="remember">
            <v-checkbox label="Se souvenir de moi" v-model="remember"></v-checkbox>
          </div>
        </div>
        <div class="description">
          <span class="description-header">The platform for managing your daily business</span>
          <span class="description-footer">Lorem ipsum dolor sit amet, ne tota dictas invenire eos, saepe timeam an duo, minim scriptorem cu quo. Saepe appareat cu eam, eu vix liber dictas dicunt</span>
        </div>
      </div>
      <div class="login-footer">
        <v-btn class="contact-button">Contact Us</v-btn>
        <!--<span class="footer-text">Lorem ipsum dolor sit amet, ne tota dictas invenire eos, saepe timeam an duo, minim scriptorem cu quo. Saepe appareat cu eam, eu vix liber dictas dicunt</span>-->
      </div>
    </v-layout>
  </v-container>
</template>

<script>

  //import Api from '../Api'

export default {
  name: 'Login',
  data () {
    return {
      show: true,
      username: 'admin',
      password: 'admin',
      remember: false,
      entry: {}
    }
  },
  methods: {
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin () {
      /*this.$store.dispatch('Login', {
        username: this.username,
        password: this.password
      }).then(() => {
        this.$router.push({
          path: '/home'
        })
      }).catch(err => {
        console.log('error : ', err)
      })*/ this.entry.username = this.username
      this.entry.password = this.password
      let uri = "http://localhost:8000/api/login/"
      this.axios.post(uri, this.entry).then((response) => {
                 localStorage.setItem('token', response.data.token)
                 this.$router.push({path: '/home'})
              }).catch(error => {
                alert(error)
            });
    }
  },
}
</script>

<style scoped type="text/css">
.main {
	background-image: url('../assets/login-background-min.png');
}

.icons {
	display: inline;
}

.logo {
	width: 256px;
	height: 64px;
  margin: 5px 0px 10px 50px;
}

.center {
	display: flex;
	align-items: center;
	justify-content: center;

}

.login-form {
	width: 320px;
	height: 400px;
	border-radius: 6px;
	background-color: #ffffff;
	box-shadow: 0 5px 10px 0 rgba(24, 24, 24, 0.4);
	border: solid 1px rgba(207, 216, 220, 0.2);
  margin-bottom: 100px;
}

.email {
	margin: 30px;
}

.password {
	margin: 0px 30px 5px 30px;
}

.forget {
	display: flex;
	justify-content: flex-end;
	margin: 0px 30px 20px 30px;
}

.login-button {
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 4px;
	background-image: linear-gradient(99deg, #79bfff, #448aff);
	margin: 0px 30px 28px 30px;
	width: 260px;
}

.remember {
  width: 320px;
  height: 45px;
  opacity: 1;
  border-radius: 6px;
  background-color: #ebeff0;
  padding: 8px 30px 0px 30px;
}

.description {
  width: 650px;
  height: 400px;
  margin-left: 50px;
  font-family: ProximaNova;
  text-align: left;
  color: #ffffff;
}

.description-header {
  font-size: 50px;
  font-weight: 600;
}

.description-footer {
  display: block;
  font-size: 18px;
  font-weight: 600;
}

.login-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.contact-button {
  width: 200px;
  height: 40px;
  border-radius: 100px;
  background-color: #ffffff;
  font-size: 24px;
  text-transform: capitalize;
  color: #6CAAF4;
}

.footer-text {
  font-family: HelveticaNeue;
  color: #ffffff;
  font-size: 18px;
  width: 900px;
  text-align: center;
}

</style>
