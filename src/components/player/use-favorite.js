import { usePlayStateStore } from "@/store/playState";
import { remove, save } from "@/utils/array-store";
import { FAVORITE_KEY } from '@/utils/const'

export default function useFavorite() {
  const playState = usePlayStateStore()
  const favoriteList = computed(() => playState.state.favoriteList)
  const maxLen = 100

  // 喜欢处理
  function toggleFavorite(song){
    let list
    if(isFavorite(song)){
      list = remove(FAVORITE_KEY, compare)
    }else{
      list = save(song, FAVORITE_KEY, compare, maxLen)
    }
    playState.state.favoriteList = list
    // console.log(playState.state.favoriteList)

    function compare(item){
      return item.id === song.id
    }
  }

  function FavoriteIcon(song){
    return isFavorite(song) ? 'mdi-heart' : 'mdi-heart-outline'
  }

  // 查询是否喜欢
  function isFavorite(song){
    return favoriteList.value.findIndex((item) => {
      return item.id === song.id
    }) > - 1
  }

  return {
    isFavorite,
    toggleFavorite,
    FavoriteIcon
  }
}