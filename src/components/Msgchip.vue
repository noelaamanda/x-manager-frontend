<template>
  <v-chip color="red" text-color="white">{{ msgcontent }}</v-chip>
</template>

<script>
  export default {
      name: 'Msgchip',
      data() {
          return {

          }
      },
      props: ['msgcontent']
  }
</script>