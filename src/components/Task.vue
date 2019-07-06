<template>
  <v-container fluid fill-height>
    <v-card>
      <v-list>
        <template v-for="(item, index) in items">
          <v-list-tile 
           :key="item.title" avatar ripple @click="toggle(index)"
          >
            <v-list-tile-content>
              <v-list-tile-title> {{item.title}} </v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon
                v-if="selected.indexOf(index) < 0"
                color="grey lighten-1"
              >
                star_border
              </v-icon>
              <v-icon v-else color="yellow darken-2">
                star
              </v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider
            v-if="index + 1 < items.length"
            :key="index"
          ></v-divider>
        </template>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
  export default {
      name: 'Task',
      data () {
        return {
          selected:[2],
          items: [
            {title : 'Soutenance'},
            {title : 'Soutenance'},
            {title : 'Soutenance'},
            {title : 'Soutenance'}
          ]
        }
      },
      methods: {
        toggle (index) {
          const i = this.selected.indexOf(index)
          if (i > -1) {
            this.selected.splice(i, 1)
          } else {
            this.selected.push(index)
          }
        }
      }
  }
</script>

<style scoped>
  
</style>