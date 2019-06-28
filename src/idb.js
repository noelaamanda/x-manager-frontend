import Vue from 'vue'
import VueIdb from 'vue-idb'
 
Vue.use(VueIdb)
 
export default new VueIdb({
  version: 1,
  database: 'Keyserver',
  schemas: [
    { user: 'id, prekeybundle' }
  ]
})