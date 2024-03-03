import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { PLAY_MODE, FAVORITE_KEY } from '@/utils/const';
import { shuffle } from '@/utils/shuffle';
import { load } from '@/utils/array-store';

export const usePlayStateStore = defineStore('playState', () => {
  const state = reactive({
    sequenceList: [],  //原始列表
    playList: [], //播放列表
    playing: false, 
    playMode: PLAY_MODE.sequence,
    currentIndex: 0,    //当前播放索引
    fullScreen: false,   //是否全屏
    favoriteList: load(FAVORITE_KEY)  //喜欢列表
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

  // 移除歌曲
  const removeSong = (song) => {
    const sequenceList = state.sequenceList.slice()
    const playlist = state.playList.slice()

    const sequenceIndex = findIndex(sequenceList, song)
    const playIndex = findIndex(playlist, song)
    if (sequenceIndex < 0 || playIndex < 0) {
      return
    }
    sequenceList.splice(sequenceIndex, 1)
    playlist.splice(playIndex, 1)

    let currentIndex = state.currentIndex
    if (playIndex < currentIndex || currentIndex === playlist.length) {
      currentIndex--
    }

    state.sequenceList = sequenceList
    state.playList = playlist
    state.currentIndex = currentIndex
    if (!playlist.length) {
      state.playing = false
    }
  }

  // 添加歌曲
  const addSong = (song) => {
    const playlist = state.playList.slice()
    const sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex
    const playIndex = findIndex(playlist, song)

    if(playIndex > -1){
      currentIndex = playIndex
    }else {
      playlist.push(song)
      currentIndex = playlist.length - 1
    }

    const sequenceIndex = findIndex(sequenceList, song)
    if(sequenceIndex === -1){
      sequenceList.push(song)
    }

    state.sequenceList = sequenceList
    state.playList = playlist
    state.currentIndex = currentIndex
    state.playing = true
    state.fullScreen = true
  }

  //清空歌曲列表
  const clearSongList = () => {
    state.sequenceList = []
    state.playList = []
    state.currentIndex = 0
    state.playing = false
  }

  function findIndex(list, song) {
    return list.findIndex((item) => {
      return item.id === song.id
    })
  }

  return{
    state,
    selectPlay,
    randomPlay,
    currentSong,
    changeMode,
    removeSong,
    addSong,
    clearSongList 
  }
})