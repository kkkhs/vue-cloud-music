<script setup>

const router = useRouter()
const gotoSearch = () => {
  router.push({
    name: 'search'
  })
}
</script>

<template>
  <v-app-bar :elevation="0" height="50" style="z-index: 10;">
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>发现</v-app-bar-title>
      <template v-slot:append>

        <v-btn icon="mdi-magnify" @click="gotoSearch"></v-btn>

        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
  </v-app-bar>
</template>