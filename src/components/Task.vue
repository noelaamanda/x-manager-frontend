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
              <h3 class="headline mb-0" style="color: teal">New Task</h3>
              <v-text-field label="Name" v-model="entry.name"></v-text-field>
              <v-autocomplete v-model="members" :items="contacts" item-text="username" multiple
               ></v-autocomplete>
              <v-dialog
               ref="dialog"
               v-model="modal" persistent lazy full-width 
               :return-value.sync="date"
              >
                <template v-slot:activator="{on}">
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
              <v-text-field label="Estimated time" v-model="entry.time" hint="In Days"
              ></v-text-field>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="blue" @click.stop="newtask=false">Cancel</v-btn> <v-spacer></v-spacer>
            <v-btn flat color="blue" @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-list v-if="items">
        <template v-for="(item, index) in items">
          <v-list-tile  
           :key="item.title" avatar ripple @click="taskpath(item.id)"
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
        <div v-else style="width: 50%; margin: 0 auto">
          <v-chip dark>
            <strong> No Tasks Yet </strong>
          </v-chip>
        </div>
        <v-dialog v-model="viewtask" lazy persistent width="400px">
          <v-card>
            <div>
              <v-tabs slider-color="yellow" color="teal">
                <v-tab ripple>
                  Details
                </v-tab>
                <v-tab ripple>
                  Modify
                </v-tab>
                <v-tab-item>
                  <v-text-field readonly label="Name">
                   {{activeitems.name}}
                  </v-text-field>
                  <v-text-field readonly label="Members">
                   {{activeitems.participants}}
                  </v-text-field>
                  <v-text-field readonly label="Start Date">
                   {{activeitems.start}}
                  <v-text-field readonly label="Estimated Time In Days">
                   {{activeitems.estimation}}
                  </v-text-field>
                  </v-text-field>
                </v-tab-item>
                <v-tab-item>
                  <v-card>
                    <v-card-title primary-title>
                      <div>
                        <h3 class="headline mb-0" style="color: teal">New Task</h3>
                        <v-text-field label="Name" v-model="entry.name"></v-text-field>
                        <v-autocomplete v-model="members" :items="contacts" item-text="username" multiple
                        ></v-autocomplete>
                        <v-dialog
                        ref="dialog"
                        v-model="modal" persistent lazy full-width 
                        :return-value.sync="date"
                        >
                          <template v-slot:activator="{on}">
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
                        <v-text-field label="Estimated time" v-model="entry.time" hint="In Days"
                        ></v-text-field>
                      </div>
                    </v-card-title>
                    <v-card-actions>
                    <v-btn flat color="blue" @click="modify">Apply</v-btn>
                   </v-card-actions>
                  </v-card>
              </v-tab-item>
            </v-tabs>
          </div>
          <v-card-actions>
            <v-btn flat color="blue" @click.stop="viewtask=false">Cancel</v-btn> <v-spacer></v-spacer>
            <v-btn flat color="blue" @click.stop="viewtask=false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
  export default {
      name: 'Task',
      data () {
        return {
          taskid: 0, 
          selected:[2],
          items: [], 
          newtask: false,
          entry: {},
          modal: false,
          members: null,
          date: new Date().toISOString().substr(0, 10),
          contacts: [],
          viewtask: false,
          activeitems: {}
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
          var parti = [] 
          var temp = {}
          for (var i=0; i< this.members.length; i++){
            for (var j=0; j< this.contacts.length; j++){
              if (this.contacts[j].username == this.members[i]){
                temp = this.contacts[j].id
              }
            } parti.push(temp)
            temp = {}
          } 
          parti.push(this.$store.state.user_id)
          this.axios.post('http://localhost:8000/task/create/',
          {'name' :this.entry.name, 'estimation': this.entry.time, 'participants': parti,'start': this.date}
          ).then(response =>{
          console.log(response.data)
        })
          alert('task created')
        },
        taskpath(id){
          this.viewtask = true
          this.axios.get(`http://localhost:8000/${id}`).then(response =>{
          this.activeitems = response.data
         })
          this.taskid = id
        },
        modify() {
          this.viewtask = false
          var parti = [] 
          var temp = {}
          for (var i=0; i< this.members.length; i++){
            for (var j=0; j< this.contacts.length; j++){
              if (this.contacts[j].username == this.members[i]){
                temp = this.contacts[j].id
              }
            } parti.push(temp)
            temp = {}
          } 
          parti.push(this.$store.state.user_id)
          this.axios.post(`http://localhost:8000/${this.taskid}/update/`,
          {'name' :this.entry.name, 'estimation': this.entry.time, 'participants': parti,'start': this.date}
          ).then(response =>{
          console.log(response.data)
        })
          alert('task created')
        }
      },
      mounted: function() {
        this.axios.get('http://localhost:8000/chat/users/').then(response =>{
          this.contacts = response.data
        })
        this.axios.get('http://localhost:8000/task/').then(response =>{
          this.items = response.data
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