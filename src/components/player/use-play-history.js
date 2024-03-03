/*
  将playHistory存储到localStorage
*/
import { remove, save, clear } from "@/utils/array-store";
import { PLAY_KEY } from '@/utils/const'
import { usePlayStateStore } from '@/store/playState';

export default function usePlayHistory(){
  const maxLen = 200
  const playState = usePlayStateStore()

  // 保存
  function savePlay(song){
    const songs = save(song, PLAY_KEY, (item) => {
      return item.id === song.id
    }, maxLen)
    playState.state.playHistory = songs
  }

  // 移除某项
  function deletePlay(song){
    const songs = remove(PLAY_KEY, (item) => {
      return item.id === song.id
    })
    playState.state.playHistory = songs
  }

  //清空全部
  function clearPlay(){
    clear(PLAY_KEY)
  }

  return{
    savePlay,
    deletePlay,
    clearPlay
  }
}