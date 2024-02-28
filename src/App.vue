<template>
  <v-app class="tw-h-screen">
    <v-main class="tw-h-screen">
      <router-view 
      />
      <Player ref="playerRef"/>
    </v-main>
  </v-app>
</template>

<script setup>
import Player from './components/player/player.vue';
import { usePlayStateStore } from '@/store/playState.js'
import { useRoute } from 'vue-router';

const playState = usePlayStateStore()
const playList = computed(() => playState.state.playList)
const route = useRoute()
const playerRef = ref(null)

watch(route, (nr) => {
  if((route.name === 'find' || route.name === 'podcast'|| route.name === 'my' || route.name === 'community'|| route.name === 'follow') && playerRef.value && nr ){
    playerRef.value.changeBottom(true)
  }else{
    playerRef.value.changeBottom(false)
  }
})

  //
</script>

<style>

</style>
