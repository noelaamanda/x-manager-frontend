<template>
  <v-chip color="red" text-color="white">{{ msgcontent }}
    <br> {{ msgauthor }} <v-spacer></v-spacer> {{ msgtime }}
  </v-chip>
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