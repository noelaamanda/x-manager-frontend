<template>
  <v-container fluid fill-height>
    <v-card height="100%" class="carddisp">
      <div>
        <v-btn color="teal" @click ="newtask=true">Add Task</v-btn>
      </div>
      <v-dialog v-model="newtask" lazy persistent width="400px">
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">New Task</h3>
                  <div>
                    <v-text-field label="Name" v-model="entry.name"></v-text-field>
                    <v-autocomplete v-model="members" :items="contacts" item-text="username" multiple
                    ></v-autocomplete>
                    <v-dialog
                     ref="dialog"
                     v-model="modal" persistent lazy full-width 
                     :return-value.sync="date"
                    >
                      <template v-slot:activator="{on}"
                      >
                        <v-text-field v-model="date" label="start Date" readonly
                        prepend-icon="event" v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" scrollable color="teal">
                        <v-spacer></v-spacer>
                        <v-btn color="teal" flat @click="modal=false">Cancel</v-btn>
                        <v-btn color="teal" flat @click="$refs.dialog.save(date)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                    <v-text-field label="Estimated time" v-model="entry.time"></v-text-field>
                  </div>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat color="blue" @click.stop="newtask=false">Cancel</v-btn> <v-spacer></v-spacer>
                <v-btn flat color="blue" @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
          ], 
          newtask: false,
          entry: {},
          modal: false,
          members: null,
          date: new Date().toISOString().substr(0, 10),
          contacts: []
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
        },
        save() {
          this.newtask = false
          alert('task created')
        }
      },
      mounted: function() {
        this.axios.get('http://localhost:8000/chat/users/').then(response =>{
          this.contacts = response.data
        })
      }
  }
</script>

<style scoped>
 .carddisp {
    width: 100%;
  }  
  .listing {
    background-color:rgb(206, 212, 218);
  }
</style>