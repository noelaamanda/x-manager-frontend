<template>
  <v-container>
    <v-chip color="blue-darken-4" text-color="white">
      <strong>{{ msgcontent }}</strong>
    <br> {{ msgauthor }} <br> {{ msgtime }}
    </v-chip>
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