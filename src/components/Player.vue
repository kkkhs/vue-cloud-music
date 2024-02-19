<script setup>
import { computed } from 'vue'
import { usePlayStateStore } from '@/store/playState.js'
import { useAsync } from '@/use/useAsync';
import { fetchSongUrl } from '@/api/songUrl.js';

const playState = usePlayStateStore()
const fullScreen = computed(() => playState.state.fullScreen)
const currentSong = computed(() => playState.currentSong())
const songUrl = reactive({})
const audioRef = ref(null)

watch(currentSong, (newSong) => {
  const { data, pending } = useAsync(() => fetchSongUrl(newSong.id).then((v) => {
    songUrl.value = v.data
    // console.log(songUrl.value.data[0].url)
    const audioEl = audioRef.value
    audioEl.src = songUrl.value.data[0].url
    audioEl.play()
  }), {})
})
</script>

<template>
  <div class=" tw-text-white">
    <div v-show="fullScreen" class="tw-fixed tw-left-0 tw-right-0 tw-top-0 tw-bottom-0 tw-z-50 tw-bg-black tw-opacity-100">
      <template v-if="currentSong">
        <div class=" tw-absolute tw-left-0 tw-top-0 tw-w-full tw-h-full -tw-z-10 tw-blur-[90px] tw-scale-150">
          <img class=" tw-w-full tw-h-full" :src="currentSong?.al?.picUrl">
        </div>
        <div
          @click="playState.state.fullScreen = !playState.state.fullScreen" 
          class="tw-text-xl tw-absolute tw-top-3 tw-left-3"
        >
          <v-icon icon="mdi-chevron-down"></v-icon>
        </div>
        <h1 
          class="tw-text-center tw-text-xl tw-font-normal tw-mt-2"
        >{{ currentSong?.name }}</h1>
        <h2 
          class=" tw-text-center tw-text-lg tw-font-normal tw-opacity-60"
        >{{ currentSong?.ar[0]?.name }}</h2>
      </template>
    </div>
  </div>
  <audio ref="audioRef"></audio>
</template>