<template>
  <v-app light>
    <Header class="header"
      :menu-list="menuList"
       @MenuClicked="changeMenu"
    ></Header>
    <v-content fluid class="main">
      <v-layout column align-content-space-around>
      <div class="center">
        <div class="login-form">
          <div class="header_info">
            <div class="user_profile">
              <span class="image-preview" v-if="imageData.length > 0">
              <img class="preview" :src="imageData">
              </span><br>
              <input type="file" name="Modifier" @change="previewImage" accept="image/*">
            </div>
            <div class="user_name">
              <span class="pos"><v-text-field label="Name" v-model="user.name"></v-text-field></span>
            </div>
          </div>
          <div>
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1">Personal Information</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 2" step="2">Professional Information</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 3" step="3">Preview</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">
                <div style="float: left; width: 40%">
                  <div>
                    <span>Date Of Birth</span>
                  </div>
                  <v-text-field solo v-model="user.dob"></v-text-field>
                  <div>
                    <span>Telephone</span>
                  </div>
                  <v-text-field solo v-model="user.tel"></v-text-field>
                </div>
                <div style="margin-left: 60%; width:50%">
                  <div>
                    <span>Email</span>
                  </div>
                  <v-text-field solo v-model="user.email"></v-text-field>
                  <div>
                    <span>Password</span>
                  </div>
                  <v-text-field solo v-model="user.pwd"></v-text-field>
                </div>
                <div>
                  <v-btn color="primary" @click="e1 = 2">Next</v-btn>
                  <v-btn>Cancel</v-btn>
                </div>
              </v-stepper-content>
              <v-stepper-content step="2">
                <div style="float: left; width: 40%">
                  <div>
                    <span>Nationality</span>
                  </div>
                  <v-text-field solo v-model="user.nat"></v-text-field>
                  <div>
                    <span>Work email</span>
                  </div>
                  <v-text-field solo v-model="user.wkemail"></v-text-field>
                </div>
                <div style="margin-left: 60%; width:50%">
                  <div>
                    <span>Department</span>
                  </div>
                  <v-text-field solo v-model="user.dept"></v-text-field>
                  <div>
                    <span>Post Occupied</span>
                  </div>
                  <v-text-field solo v-model="user.pstocc"></v-text-field>
                </div>
                <div>
                  <v-btn color="primary" @click="e1 = 3">Next</v-btn>
                  <v-btn @click="e1=1">Previous</v-btn>
                </div>
              </v-stepper-content>
              <v-stepper-content step="3">
                <v-text-field readonly></v-text-field>
                <div>
                  <v-btn color="primary" @click="register">Next</v-btn>
                  <v-btn @click="e1=2">Previous</v-btn>
                </div>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </div>
        </div>
      </div>
    </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import Header from './Header'
export default {
  name: 'Register',
  data() {
    return {
      menuSelected: '',
      menuList: [
        {text:'Register', list:'/admin'},
        ],
        imageData: require("../assets/user.png"),
        e1 : 1,
        user: {}
    }
  },
  methods: {
    changeMenu (menu) {
      this.menuSelected = menu.list
      this.$router.push(menu.list)
    },
    register() {
        alert('ok')
        /*var KeyHelper = libsignal.KeyHelper;

        var registrationId = KeyHelper.generateRegistrationId();
        // Store registrationId somewhere durable and safe.

        KeyHelper.generateIdentityKeyPair().then(function(identityKeyPair) {
            // keyPair -> { pubKey: ArrayBuffer, privKey: ArrayBuffer }
            // Store identityKeyPair somewhere durable and safe.
        });

        KeyHelper.generatePreKey(keyId).then(function(preKey) {
            store.storePreKey(preKey.keyId, preKey.keyPair);
        });

        KeyHelper.generateSignedPreKey(identityKeyPair, keyId).then(function(signedPreKey) {
            store.storeSignedPreKey(signedPreKey.keyId, signedPreKey.keyPair);
        });

        // Register preKeys and signedPreKey with the server*/
    },
    previewImage: function(event) {
        var input = event.target;
        if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.imageData = e.target.result;
              }
          reader.readAsDataURL(input.files[0]);
          }
        }
  },
  components: {
    Header
  }
}
</script>

<style scoped>
 .main {
	background-image: url('../assets/body-bg.jpg');
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
    margin-top: 5%;
	display: flex;
	align-items: center;
	justify-content: center;

}

.login-form {
	width: 70%;
	height: 400px;
	border-radius: 6px;
	background-color: #ffffff;
	box-shadow: 0 5px 10px 0 rgba(24, 24, 24, 0.4);
	border: solid 1px rgba(207, 216, 220, 0.2);
    margin-bottom: 100px;
}

 .user_profile {
     width: 50%;
     height: 100px;
     float: left;
 }
  .user_name {
     width: 50%;
     height: 100px;
     margin-left: 50%;
     text-align: left;
     position: relative;
 }
 .pos {
     position: absolute;
     bottom: 0;
     right: 0;
 }
.email {
	margin: 30px;
}

.password {
	margin: 0px 30px 5px 30px;
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

 .header_info {
     margin-bottom: 20px;
     margin-top: 15px;
 }

.description-footer {
  display: block;
  font-size: 18px;
  font-weight: 600;
}

.preview{
    width: 75px;
    height: 75px;
    border-radius: 75px;
  }
</style>