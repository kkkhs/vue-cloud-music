import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { PLAY_MODE } from '@/utils/const';
import { shuffle } from '@/utils/shuffle';
import { useAsync } from '@/use/useAsync';
import { fetchSongUrl } from '@/api/songUrl.js';

export const usePlayStateStore = defineStore('playState', () => {
  const state = reactive({
    sequenceList: [],  //原始列表
    playList: [], //播放列表
    playing: false, 
    playMode: PLAY_MODE.sequence,
    currentIndex: 0,    //当前播放索引
    fullScreen: false   //是否全屏
  })

  // set函数
  const mutations = {
    setPlayingState (playing){
      state.playing = playing
    },
    setSequenceList(list){
      state.sequence = list
    },
    setPlaylist(list){
      state.playList = list
    },
    setPlayMode(mode){
      state.playMode = mode
    },
    setCurrentIndex(index){
      state.currentIndex = index
    },
    setFullScreen(fullScreen){
      state.fullScreen = fullScreen
    }
  }
  
  //默认播放
  const selectPlay = (list, index) => {
    state.sequenceList = list
    state.playList = list
    state.playing = true
    state.playMode = PLAY_MODE.sequence
    state.currentIndex = index
    state.fullScreen = true
  }

  //随机播放
  const randomPlay = (list) => {
    state.sequenceList = list
    state.playList = shuffle(list)
    state.playing = true
    state.playMode = PLAY_MODE.random
    state.currentIndex = 0
    state.fullScreen = true
  }

  //当前播放歌曲
  const currentSong = () => {
    // console.log(state.playList[state.currentIndex])
    return state.playList[state.currentIndex]
  }

  return{
    state,
    mutations,
    selectPlay,
    randomPlay,
    currentSong
  }
})