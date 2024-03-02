<!-- 歌曲列表 -->
<script setup>
import { usePlayStateStore } from '@/store/playState.js'

const props = defineProps({
  songs:{
    type: Array,
    default: []
  },
  hasIndex: {
    type: Boolean,
    default: true
  }
})

const playState = usePlayStateStore()
const playList = computed(() => playState.state.playList)
const currentSong = computed(() => playState.currentSong())

const selectItem = ({song, index}) => {
  playState.selectPlay(props.songs, index)
  // console.log(playState.state.playList)
}

const selectPlay = () => {
  playState.selectPlay(props.songs, 0)
  // console.log(playState.state.playList)
}

const current = (song) => {
  return currentSong.value?.id === song?.id
}
</script>

<template>
  <div class="tw-bg-white">
    <div
      class="tw-bg-white tw-text-lg tw-leading-8 tw-pl-2 tw-py-2 tw-font-medium tw-border-solid tw-border-t-0 tw-border-l-0 tw-border-slate-200 tw-border-r-0 tw-border-[1px] tw-rounded-t-2xl"
      @click="selectPlay"
    >
      <v-icon 
        icon="mdi-play-circle"
        color="red-darken-1" 
        class="tw-mr-3 tw--ml-2"
      ></v-icon>
      <span>播放全部</span>
    </div>
    <div
      class="tw-pb-24 "
      :class=" {'tw-pb-12': playList.length }"
    >
      <div
        v-for="(song,index) in songs"
        :key="song.id"
        :class=" {'tw-text-red-500' : current(song) }"
      >
        <SongView :song="song" :index="index + 1" :hasIndex="hasIndex"  @select="selectItem"></SongView>
      </div>
    </div>
  </div>
</template>

