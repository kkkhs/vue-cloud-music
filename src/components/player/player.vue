<script setup>
import { computed } from 'vue'
import { usePlayStateStore } from '@/store/playState.js'
import { useAsync } from '@/use/useAsync';
import { fetchSongUrl } from '@/api/songUrl.js';
import useMode from './use-mode';
import useFavorite from './use-favorite'

const audioRef = ref(null)
const songUrl = reactive({})

// pinia
const playState = usePlayStateStore()
const fullScreen = computed(() => playState.state.fullScreen)
const currentSong = computed(() => playState.currentSong())
const playing = computed(() => playState.state.playing)
const currentIndex = computed(() => playState.state.currentIndex)
const playList = computed(() => playState.state.playList)

// hooks
const { modeIcon, changeMode } = useMode()
const { isFavorite, toggleFavorite } = useFavorite()

//根据不同的播放状态返回不同的icon
const playIcon = computed(() => { 
  return playing.value ? 'mdi-pause-circle' : 'mdi-play-circle'
})

// 当song未准备好，为Dom元素加disable样式
const disableCls = computed(() => {
  return songReady.value ? '' : 'disable'
})

watch(currentSong, (newSong) => {
  const { data, pending } = useAsync(() => fetchSongUrl(newSong.id).then((v) => {
    songUrl.value = v.data
    // console.log(songUrl.value.data[0].url)
    songReady.value = false
    const audioEl = audioRef.value
    audioEl.src = songUrl.value.data[0].url
    audioEl.play()
  }), {})
})

//控制audio播放暂停
watch(playing, (nv) => {
  if(!songReady.value){
    return
  }
  const audioEl = audioRef.value
  nv ? audioEl.play() : audioEl.pause()
})

//播放暂停切换
const togglePlay = () => {
  if(!songReady.value){
    return
  }
  playState.state.playing = !playState.state.playing
}

//当audio被强迫关闭(待机...)
const pause = () => {
  playState.state.playing = false
}

// 单曲循环
const loop = () => {
  const audioEl = audioRef.value
  audioEl.currentTime = 0
  audioEl.play()
}

// 前一首歌
const prev = () => {
  const list = playList.value
  if(!songReady.value || !list.length){
    return
  }

  if(list.length === 1) {
    loop()
  }else{
    let index = currentIndex.value - 1
    if(index === -1){
      index = list.length - 1
    }
    playState.state.currentIndex = index
    if(!playing.value) {  //当前暂停
      playState.state.playing = true  //修改为播放
    }
  }
  
}

// 下一首歌
const next = () => {
  const list = playList.value
  if(!songReady.value || !list.length){
    return
  }

  if(list.length === 1) {
    loop()
  }else{
    let index = currentIndex.value + 1
    if(index === list.length){
      index = 0
    }
    playState.state.currentIndex = index
  }
}

// 控制audio的canplay属性
const songReady = ref(false)
const ready = () => {
  if(songReady.value){  //避免多次ready
    return
  }
  songReady.value = true
}

//播放出现问题
const error = () => {
  songReady.value = true
}
</script>

<template>
  <div class=" tw-text-white">
    <div v-show="fullScreen" class="tw-fixed tw-left-0 tw-right-0 tw-top-0 tw-bottom-0 tw-z-50 tw-bg-black tw-opacity-100">
      <template v-if="currentSong">
        <div 
          class=" tw-absolute tw-left-0 tw-top-0 tw-w-full tw-h-full -tw-z-10 tw-blur-[90px] tw-scale-150"
        >
          <img class=" tw-w-full tw-h-full" :src="currentSong?.al?.picUrl">
        </div>
        <div
          @click="playState.state.fullScreen = !playState.state.fullScreen" 
          class="tw-text-xl tw-absolute tw-top-3 tw-left-3"
        >
          <v-icon icon="mdi-chevron-down"></v-icon>
        </div>
        <div ref="top">
          <h1 
            class="tw-text-center tw-text-xl tw-font-normal tw-mt-2"
          >{{ currentSong?.name }}</h1>
          <h2 
            class=" tw-text-center tw-text-lg tw-font-normal tw-opacity-60"
          >{{ currentSong?.ar[0]?.name }}</h2>
        </div>
        <div 
          ref="botom"
          class="tw-absolute tw-bottom-6 tw-w-full"
        >
        <div>

        </div>
        <div 
          ref="operators" 
          class=" tw-flex tw-justify-between tw-items-center tw-px-12"
        >
          <v-icon 
            class="tw-rounded-full" 
            size="30" @click="changeMode" :icon="modeIcon"></v-icon>
          <v-icon 
            class="tw-rounded-full" 
            size="30" v-ripple @click="prev" icon="mdi-skip-previous" :class="disableCls"
          ></v-icon>
          <v-icon 
            class="tw-text-5xl tw-rounded-full" 
            size="50"  @click="togglePlay" :icon="playIcon" :class="disableCls"
          ></v-icon>
          <v-icon 
            class="tw-rounded-full" 
            size="30" v-ripple @click="next" icon="mdi-skip-next" :class="disableCls"
          ></v-icon>
          <v-icon 
            @click="toggleFavorite(currentSong)"
            class="tw-rounded-full" 
            :class="{'favorite': isFavorite(currentSong)}"
            size="30" icon="mdi-heart"></v-icon>
        </div>
        </div>
      </template>
    </div>
  </div>
  <audio 
    @pause="pause" 
    ref="audioRef"
    @canplay="ready"
    @error="error"
  ></audio>
</template>

<style>
.disable {
  color: rgba(255, 255, 255, 0.7);
}

.favorite {
  color: rgb(235, 60, 60);
}
</style>