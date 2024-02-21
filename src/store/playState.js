import { defineStore, setActivePinia } from 'pinia';
import { reactive } from 'vue';
import { PLAY_MODE } from '@/utils/const';
import { shuffle } from '@/utils/shuffle';

export const usePlayStateStore = defineStore('playState', () => {
  const state = reactive({
    sequenceList: [],  //原始列表
    playList: [], //播放列表
    playing: false, 
    playMode: PLAY_MODE.sequence,
    currentIndex: 0,    //当前播放索引
    fullScreen: false,   //是否全屏
    favoriteList: []  //喜欢列表
  })

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

  // 改变播放模式
  const changeMode = (mode) => {
    const currentId = currentSong().id
    if(mode === PLAY_MODE.random){
      state.playList = shuffle(state.sequenceList)
    }else {
      state.playList = state.sequenceList
    }

    //找到切换前的歌曲在列表切换后的index
    const index = state.playList.findIndex((song) => {
      return song.id === currentId
    })
    state.currentIndex = index
    state.playMode = mode
  }

  return{
    state,
    selectPlay,
    randomPlay,
    currentSong,
    changeMode
  }
})