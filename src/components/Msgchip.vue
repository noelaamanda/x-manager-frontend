<template>
  <v-container>
    <div>
      <v-chip color="white">
        <v-avatar>
          <img src="../assets/user.png">
        </v-avatar>
        {{ msgauthor }}
      </v-chip>
      <div style="background-color: cyan darken-2">
        <strong>{{ msgcontent }}</strong>
      </div>
      <br>{{ msgtime }}
    </div>
  </v-container> 
</template>

<script>
  export default {
      name: 'Msgchip',
      data() {
          return {

          }
      },
      props: ['msgcontent', 'msgauthor', 'msgtime']
  }
</script>
<style scoped>
 div {
   border-radius: 25px !important;
   text-align: left;
   color: steelblue;
 }
</style>