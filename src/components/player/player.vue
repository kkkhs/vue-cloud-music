<script setup>
import { computed } from 'vue'
import { usePlayStateStore } from '@/store/playState.js'
import { useAsync } from '@/use/useAsync';
import { fetchSongUrl } from '@/api/songUrl.js';
import { formatTime } from '@/utils/formatTime';
import { formatArtistName } from '@/utils/formatArtistsName'
import progressBar from './progress-bar.vue';
import miniPlayer from './mini-player.vue';
import useMode from './use-mode';
import useFavorite from './use-favorite'
import { PLAY_MODE } from '@/utils/const';
import scroll from '@/components/scroll/scroll.vue';
import useCd from './use-cd'
import useLyric from './use-lyric'
import useMiddleInteractive from './use-middle-interactive';
import useAnimation from './use-animation';

const audioRef = ref(null)
const songUrl = reactive({})
const currentTime = ref(0)
let progressChaning = false
const songReady = ref(false)
const barRef = ref(null)
const miniPlayerRef = ref(null)

const changeBottom = (bool) => {
  miniPlayerRef.value.changeBottom(bool)
}

// pinia
const playState = usePlayStateStore()
const fullScreen = computed(() => playState.state.fullScreen)
const currentSong = computed(() => playState.currentSong())
const playing = computed(() => playState.state.playing)
const currentIndex = computed(() => playState.state.currentIndex)
const playList = computed(() => playState.state.playList)
const playMode = computed(() => playState.state.playMode)  

// hooks
const { modeIcon, changeMode } = useMode()
const { isFavorite, toggleFavorite } = useFavorite()
const { cdCls, cdWrapperRef, cdRef } = useCd()
const { currentLyric, currentLineNum, lyricScrollRef, lyricListRef, pureMusicLyric, playingLyric, playLyric, stopLyric } = useLyric({ songReady, currentTime })
const { currentShow, middleLStyle, middleRStyle, onMiddleTouchStart, onMiddleTouchMove, onMiddleTouchEnd } = useMiddleInteractive()
const { enter, afterEnter, leave, afterLeave } = useAnimation(cdWrapperRef)

// 根据不同的播放状态返回不同的icon
const playIcon = computed(() => { 
  return playing.value ? 'mdi-pause-circle' : 'mdi-play-circle'
})

// 进度 0-1
const progress = computed(() => {
  return(currentTime.value / (currentSong.value?.dt/1000))
})

// 当song未准备好，为Dom元素加disable样式
const disableCls = computed(() => {
  return songReady.value ? '' : 'disable'
})

watch(currentSong, (newSong) => {
  if(newSong?.id){
    const { data, pending } = useAsync(() => fetchSongUrl(newSong?.id).then((v) => {
      songUrl.value = v.data
      // console.log(songUrl.value.data[0].url)
      currentTime.value = 0
      songReady.value = false
      const audioEl = audioRef.value
      audioEl.src = songUrl.value.data[0].url
      audioEl.play()
      playState.state.playing = true 
    }), {})
  }
})

// 控制audio播放暂停
watch(playing, (nv) => {
  if(!songReady.value){
    return
  }
  const audioEl = audioRef.value
  if(nv){
    audioEl.play()
    playLyric()
  }else{
    audioEl.pause()
    stopLyric()
  }
  nv ? audioEl.play() : audioEl.pause()
})

watch(fullScreen, async (newFullScreen) => {
  if(newFullScreen){
    await nextTick()  //等待下一次 DOM 更新刷新的工具方法, 在nextTick后访问dom
    barRef.value.setOffset(progress.value)  //全屏首次更新进度条宽度
  }
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
  playState.state.playing = true
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
    if(!playing.value){ //当前暂停
      playState.state.playing = true //修改为播放
    }
  }
}

// 控制audio的canplay属性
const ready = () => {
  if(songReady.value){  //避免多次ready
    return
  }
  songReady.value = true
  playLyric()
}

//播放出现问题
const error = () => {
  songReady.value = true
}

//更新播放时间
const updateTime = (e) => {
  if(!progressChaning){
    currentTime.value =  e.target.currentTime
  }
}

// 进度条拖动ing
const onProgressChanging = (progress) => {
  progressChaning = true
  // 左侧实时改变
  currentTime.value = (currentSong.value.dt/1000) * progress
  playLyric() //歌词实时同步
  stopLyric()
}
//歌曲播放时间改变后
const onProgressChanged = (progress) => {
  progressChaning = false
  audioRef.value.currentTime = currentTime.value = (currentSong.value.dt/1000) * progress
  if(!playing.value){
    playState.state.playing = true
  }
  playLyric()
}
// 播放结束
const end = () => {
  currentTime.value = 0
  if(playMode.value === PLAY_MODE.loop){
    loop()
  } else {
    next()
  }
}

const test = () => {
  console.log(currentLyric.value)
  console.log(currentLineNum.value)
  console.log(currentTime.value)
}

defineExpose({ changeBottom })
</script>

<template>
  <div 
    class="player tw-text-white" 
    v-show="playList.length"
  >
    <transition 
      name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div 
        v-show="fullScreen" 
        class="normal-player tw-fixed tw-left-0 tw-right-0 tw-top-0 tw-bottom-0 tw-z-[9999] tw-bg-black tw-opacity-100"
      >
        <template v-if="currentSong">
          <div 
            class=" tw-absolute tw-left-0 tw-top-0 tw-w-full tw-h-full -tw-z-10 tw-blur-[90px] tw-scale-150"
          >
            <img
              v-if="currentSong.al" 
              class=" tw-w-full tw-h-full" :src="currentSong?.al?.picUrl"
            >
            <img
              v-if="currentSong.al" 
              class=" tw-w-full tw-h-full" :src="currentSong?.al?.picUrl"
            >
          </div>
          <div
            @click="playState.state.fullScreen = !playState.state.fullScreen" 
            class="tw-text-xl tw-absolute tw-top-3 tw-left-3"
          >
            <v-icon icon="mdi-chevron-down"></v-icon>
          </div>
          <div ref="top">
            <h1 
            @click="test"
              class="tw-text-center tw-text-xl tw-font-normal tw-mt-2 tw-max-w-72 tw-line-clamp-1 tw-mx-auto"
            >{{ currentSong?.name }}</h1>
            <h2 
              class=" tw-text-center tw-text-lg tw-font-normal tw-opacity-60"
            >{{ formatArtistName(currentSong.ar)}}</h2>
          </div>
          <div
            ref="middle"
            class="tw-fixed tw-w-full tw-top-20 tw-bottom-40 tw-whitespace-nowrap"  
            @touchstart.prevent="onMiddleTouchStart"
            @touchmove.prevent="onMiddleTouchMove"
            @touchend.prevent="onMiddleTouchEnd"
          >
            <div
              ref="middle-l"
              class="tw-inline-block tw-relative tw-w-full tw-h-0 tw-pt-[80%] tw-mt-24"
              :style="middleLStyle"
            >
              <div
                ref="cdWrapperRef"
                class= "tw-absolute tw-left-[10%] tw-top-0 tw-w-4/5 tw-box-border tw-h-full"
              >
                <div
                  ref="cdRef"
                  class="tw-w-full tw-h-full tw-rounded-full"  
                  :class="{'tw-animate-spin-slow': cdCls}"
                >
                  <img 
                    class=" tw-absolute tw-left-0 tw-top-0  tw-w-full tw-h-full tw-box-border tw-rounded-full  tw-border-solid tw-border-opacity-10  tw-border-[10px] tw-border-slate-50"
                    src="../../../public/R.png"
                  >
                  <img 
                    class="tw-absolute tw-left-1/2 tw-top-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2  tw-w-3/5 tw-h-3/5 tw-box-border tw-rounded-full tw-border-solid tw-border-opacity-20  tw-border-8 tw-border-black"
                    :src="currentSong.al.picUrl"
                  >
                </div>  
              </div>
              <div class=" tw-w-4/5 tw-mt-20 tw-mr-auto tw-mb-0 tw-ml-auto tw-overflow-hidden tw-text-center">
                <div class=" tw-h-5 tw-leading-5 tw-text-white/50 tw-text-lg">
                  {{ playingLyric }}
                </div>
              </div>
            </div>
            <scroll 
              ref="lyricScrollRef"
              class="tw-inline-block tw-align-top tw-w-full tw-h-full tw-overflow-hidden"
              :style="middleRStyle"
            >
              <div
                ref="lyric-wrapper"
                class="tw-w-4/5 tw-my-0 tw-mx-auto tw-overflow-hidden tw-text-center"
              >
                <div v-if="currentLyric" ref="lyricListRef">
                  <p
                    class=" tw-leading-8 tw-text-white/50 tw-text-lg tw-my-2"
                    :class="{'current': currentLineNum === index}"
                    v-for="(line, index) in currentLyric.lines"
                    :key="line.num"
                  >
                    {{ line.txt }}
                  </p>
                </div>
                <div class="tw-pt-[50%]  tw-leading-8 tw-text-white/50 tw-text-lg" v-show="pureMusicLyric">
                  <p>{{ pureMusicLyric }}</p>
                </div>
              </div>
            </scroll>
          </div>

          <div 
            ref="botom"
            class="tw-absolute tw-bottom-6 tw-w-full"
          >
            <div 
              class="tw-text-center"
              ref="dotWrapper"
            >
              <span 
                class="tw-inline-block tw-align-middle tw-my-0 tw-mx-1 tw-w-2 tw-h-2 tw-rounded-full tw-bg-opacity-50 tw-bg-white"
                ref="dot" :class="{'active': currentShow === 'cd'}"></span>
              <span 
                class=" tw-inline-block tw-align-middle tw-my-0 tw-mx-1 tw-w-2 tw-h-2 tw-rounded-full tw-bg-opacity-50 tw-bg-white"
                ref="dot" :class="{'active': currentShow === 'lyric'}"></span>
            </div>
            <div 
              class=" tw-flex tw-items-center tw-w-full tw-my-0 tw-mx-auto tw-py-2 tw-px-4">
              <span 
                class=" tw-w-11 tw-grow-0 tw-shrink-0 tw-basis-11 tw-text-sm tw-text-left"
              >{{ formatTime(currentTime) }}</span>
              <div class=" tw-flex-1">
                <progressBar
                  ref="barRef"
                  :progress="progress" 
                  @progress-changing="onProgressChanging"
                  @progress-changed="onProgressChanged"
                ></progressBar>
              </div>
              <span 
                class=" tw-w-11 tw-grow-0 tw-shrink-0  tw-basis-11 tw-text-right tw-text-sm"
              >{{  formatTime(currentSong.dt/1000) }}</span>
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
    </transition>
    <miniPlayer ref="miniPlayerRef" :progress="progress" :toggle-play="togglePlay"></miniPlayer>
    <audio 
      ref="audioRef"
      @pause="pause" 
      @canplay="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
    ></audio>
    
  </div>
    
</template>

<style scoped>
.disable {
  color: rgba(255, 255, 255, 0.7);
}

.favorite {
  color: rgb(235, 60, 60);
}

.current {
  color: rgba(255, 255, 255, 1);
}

.active{
  width: 20px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.8);
}

/* 过渡动画 */
.normal-player{
  &.normal-enter-active, &.normal-leave-active {
    transition: all .6s; 
    .top, .bottom {
      transition: all .6s cubic-bezier(0.45, 0, 0.55, 1);
    }
  }
  &.normal-enter-from, &.normal-leave-to {
    opacity: 0;
    .top {
      transform: translate3d(0, -100px, 0);
    }
    .bottom {
      transform: translate3d(0, 100px, 0)
    }
  }
}

</style>