<script setup>
import { usePlayStateStore } from '@/store/playState.js'
import useCd from './use-cd';
import ProgressCircle from './progress-circle.vue';
import useMiniSlider from './use-mini-slider';
import Playlist from './playlist.vue';

const props = defineProps({
  progress: {
    type: Number,
    default: 0
  },
  togglePlay: { // 函数类型传递
    type: Function,
  }
})
const playlistRef = ref(null)
const playState = usePlayStateStore()
const fullScreen = computed(() => playState.state.fullScreen)
const currentSong = computed(() => playState.currentSong())
const playList = computed(() => playState.state.playList)
const playing = computed(() => playState.state.playing)
const miniPlayer = ref(null)

// hooks
const { cdCls, cdWrapperRef, cdRef } = useCd()
const { sliderWrapperRef } = useMiniSlider()

const showNormalPlayer = () => {
  playState.state.fullScreen = true
}

const showPlaylist = () => {
  playlistRef.value.show()
}

// 根据不同的播放状态返回不同的icon
const playIcon = computed(() => { 
  return playing.value ? 'mdi-pause' : 'mdi-play'
})

const changeBottom = (bool) => {
  if(bool){
    miniPlayer.value.style['bottom'] = '52px'
  }else{
    miniPlayer.value.style['bottom'] = '0'
  }
}

defineExpose({ changeBottom })
</script>

<template>
  <transition name="mini">
    <div 
      ref="miniPlayer"
      class="mini-player tw-text-black tw-z-50 tw-flex tw-items-center tw-fixed tw-bottom-0 tw-bg-white tw-shadow-inner tw-h-14 tw-left-0 tw-right-0 tw-pl-4 transition-transform"
      v-show="!fullScreen"
      @click="showNormalPlayer"
    >
      <div 
        ref="cdWrapperRef"
        class="tw-h-14 tw-w-14"
      >
        <div
          ref="cdRef"
          class=" tw-flex tw-items-center tw-justify-center tw-h-full tw-w-full"
          :class="{'tw-animate-spin-slow': cdCls}"
        >
          <img 
            class=" tw-h-12 tw-w-12 tw-rounded-full tw-mx-0 tw-my-auto"
            :src="currentSong?.al?.picUrl"
          >
        </div>
      </div>
      <div
        ref="sliderWrapperRef" 
        class="slider-wrapper"
      >
        <div class="slider-group">
          <div 
            class="slider-page"
            v-for="song in playList"
            :key="song.id"
          >
            <p
              class="tw-text-base tw-leading-5 tw-font-normal tw-truncate tw-max-w-52"
            >
              <span v-if="song.fee == 1" class=" tw-text-red-400 tw-border-solid tw-border tw-text-xs tw-rounded tw-px-0.5 tw-mr-1">VIP</span>
            {{ song?.name }}
              <span
                class="tw-text-center tw-text-sm tw-leading-5 tw-font-normal tw-opacity-60"
              > -  {{ song?.ar[0]?.name }}</span>
            </p>
            
          </div>
        </div>
      </div>
      
      <div class=" tw-flex tw-w-24 tw-mt-2 item">
        <ProgressCircle :radius="32" :progress="progress">
          <div 
            class="tw-absolute tw-left-0 tw-top-0 tw-h-8 tw-w-8 tw-flex tw-justify-center tw-items-center"
            @click.stop="togglePlay"
          >
            <v-icon :icon="playIcon" size="24"></v-icon>
          </div>
        </ProgressCircle>
        <v-icon 
          @click.stop="showPlaylist"
          class=" tw-ml-5"
          size="34"
          icon="mdi-playlist-play"
        >
        </v-icon>
      </div>
      <Playlist ref="playlistRef"></Playlist>
    </div>
  </transition>
</template>

<style scoped>
.mini-player{
  .slider-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    .slider-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slider-page {
        padding-top: 5px;
        padding-left: 8px;
        display: inline-block;
        width: 100%;
        overflow: hidden;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
      }
    }
  }
  &.mini-enter-active, &.mini-leave-active {
    transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
  }
  &.mini-enter-from, &.mini-leave-to {
    opacity: 0;
    transform: translate3d(0, 100%, 0)
  }
}

</style>