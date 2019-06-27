<template>
  <v-container>
    <v-button round color="blue-grey lighten-3">
      <v-avatar color="teal"></v-avatar>
      <strong>{{ msgcontent }}</strong>
      <br> <br>{{ msgauthor }} <v-spacer></v-spacer> {{ msgtime }}
    </v-button>
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