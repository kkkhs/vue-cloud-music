<script setup>
import { usePlayStateStore } from '@/store/playState.js'

const props = defineProps({
  songs:{
    type: Array,
    default: []
  }
})

const playState = usePlayStateStore()
const playList = computed(() => playState.state.playList)
const currentSong = computed(() => playState.currentSong())

const selectItem = ({song, index}) => {
  playState.selectPlay(props.songs, index)
  // console.log(playState.state.playList)
}

const randomPlay = () => {
  playState.randomPlay(props.songs)
  // console.log(playState.state.playList)
}

const current = (song) => {
  return currentSong.value?.id === song?.id
}
</script>

<template>
  <div class="tw-bg-white tw-rounded-t-2xl tw-h-full">
    <div
      class="tw-bg-slate-200 tw-text-lg tw-leading-8 tw-pl-4 tw-py-2 tw-font-medium tw-rounded-t-2xl"
      @click="randomPlay"
    >
      <v-icon 
        icon="mdi-play-circle"
        color="red-darken-1" 
        class="tw-mr-3 tw--ml-2"
      ></v-icon>
      <span>随机播放</span>
    </div>
    <div
      class=" tw-pb-[360px] "
      :class=" {'tw-pb-12': playList.length }"
    >
      <div
        v-for="(song,index) in songs"
        :key="song.id"
        :class=" {'tw-text-red-500' : current(song) }"
      >
        <SongView :song="song" :index="index + 1"  @select="selectItem"></SongView>
      </div>
    </div>
  </div>
</template>

