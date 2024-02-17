<script setup>
import { computed } from 'vue'
import { usePlayStateStore } from '@/store/playState.js'
const playState = usePlayStateStore()
const fullScreen = computed(() => store.state.fullScreen)
const currentSong = computed(() => store.currentSong)

</script>

<template>
  <div>
    <div v-show="fullScreen">
      <div>
        <img src="#" alt="">
      </div>
      <div>
        <v-icon></v-icon>
      </div>
      <h1>{{ currentSong.name }}</h1>
      <h2>{{ currentSong.singer }}</h2>
    </div>
  </div>
  <audio src=""></audio>
</template>