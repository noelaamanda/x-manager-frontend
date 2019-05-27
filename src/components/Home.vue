<template>
  <v-container fluid class="content pt-0">
    <v-layout row fill-height wrap>
      <v-flex xs8 fill-height>
          <img src="../assets/xmanager.svg" class="logo">
          <img src="../assets/bg_image.png" class="bg_img">
          <v-text-area readonly class="img-text white--text hidden-md-down">
            Xmanager distinguishes itself by its exceptional abilty to adapt to your 
            management requirements thanks to its numerous modules and customisable functions.
          </v-text-area>
      </v-flex>
      <v-flex xs4>
        <v-layout justify-center fill-height wrap row>
          <v-flex xs12>
            <div class="horizontal">
              <span class="module pt-4">The solution to your management needs</span>
            </div>
          </v-flex>
          <v-flex xs12> 
            <div class="horizontal">
              <hr width="25%">
              <span class="module">Your Modules</span>
              <hr width="25%">
            </div>
            </v-flex>
            <v-flex xs12>
            <div class="horizontal">
              <router-link top to="/messaging">
                <v-btn primary large class="agenda"
                  v-on:mouseover="showCustomTooltip('Agenda')" @mouseleave="tooltipShow = false"
                >
                  <v-icon large dark>event</v-icon>
                </v-btn> <br>
                <span class="white--text">Messaging</span>
              </router-link>
              <router-link top to="/messaging">
                <v-btn primary large class="tasks"
                  v-on:mouseover="showCustomTooltip('My Tasks')" @mouseleave="tooltipShow = false"
                >
                  <v-icon large light>school</v-icon>
                </v-btn> <br>
                <span class="white--text">My Tasks</span>
              </router-link>
              <router-link top to="/messaging">
                <v-btn primary class="audit" large
                  v-on:mouseover="showCustomTooltip('Audit')" @mouseleave="tooltipShow = false"
                >
                  <v-icon large light>group</v-icon>
                </v-btn> <br>
                <span class="white--text">Audit</span>
              </router-link>
            </div>
            <div class="horizontal">
              <router-link top to="/messaging">
                <v-btn primary large class="accounting"
                  v-on:mouseover="showCustomTooltip('Accounting')" @mouseleave="tooltipShow = false"
                >
                  <v-icon large light>forum</v-icon>
                </v-btn> <br>
                <span class="white--text">Messaging</span>
              </router-link>
              <router-link top to="/messaging">
                <v-btn primary class="agenda" large
                  v-on:mouseover="showCustomTooltip('Messaging')" @mouseleave="tooltipShow = false"
                >
                  <v-icon large light>group</v-icon>
                </v-btn> <br>
                <span class="white--text">Messaging</span>
              </router-link>
              <router-link top to="/messaging">
                <v-btn primary class="audit" large
                  v-on:mouseover="showCustomTooltip('Audit')" @mouseleave="tooltipShow = false"
                >
                  <v-icon large light>school</v-icon>
                </v-btn> <br>
                <span class="white--text">Audit</span>
              </router-link>
            </div>
              <v-tooltip
                  v-model="tooltipShow"
                  bottom
                  transition="slide-y-reverse-transition"
              >
                <span slot="activator"></span>
                <span>{{ tooltipMessage }}</span>
              </v-tooltip>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'home',
    data: () => ({
      tooltipShow: false,
      tooltipMessage: '',
    }),
    methods: {
      showCustomTooltip (msg) {
        this.tooltipShow = true
        this.tooltipMessage = msg
      }
    }
  }
</script>

<style scoped>
.content {
  background-image: linear-gradient(to right, #78909C, #09081E);
} 
.bg_img {
  z-index: 3;
  width: 65%;
  height: 99%;
  /*object-fit: contain;*/
}
.logo {
  z-index: 1;
  top: 1%;
}
.img-text {
  z-index: 4;
  position: absolute;
  top: 55%;
  left: 20%;
  color: white;
  font-weight: bold;
  font-size: 150%;
  height:30%;
  width: 25%
}
img {
  position: absolute;
}
.line {
    width: 300px;
    height: 10px;
    display: inline-block;
    color: white !important;

  }
.module {
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    font-family: Roboto,serif;
    font-size: 20px;
    line-height: 1.6;
    letter-spacing: normal;
    text-align: center;
    color: white;
  }

.horizontal {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
  }
a {
    text-decoration: none;
    }
.agenda {
  background-image: linear-gradient(122deg, #ffd9a7, #f39200);
}
.tasks {
  background-image: linear-gradient(122deg, #669df5, #3f7ed2 38%, #2e70c2 55%, #2569ba 64%, #1f64b5 69%, #004b98);
}
.audit {
  background-image: linear-gradient(122deg, #D81B60, #C2185B, #AD1457)
}
.accounting {
  background-image: linear-gradient(122deg, #2979FF, #2962FF)
}

</style>
