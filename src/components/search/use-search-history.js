/*
  将searchHistory存储到localStorage
*/
import { remove, save, clear } from "@/utils/array-store";
import { SEARCH_KEY } from '@/utils/const'
import { useSearchStateStore } from '@/store/searchState';

export default function useSearchHistory(){
  const maxLen = 10
  const searchState = useSearchStateStore()

  // 保存
  function saveSearch(query){
    const seaches = save(query, SEARCH_KEY, (item) => {
      return item === query
    }, maxLen)
    searchState.state.searchHistory = seaches
  }

  // 移除某项
  function deleteSearch(query){
    const seaches = remove(SEARCH_KEY, (item) => {
      return item === query
    })
    searchState.state.searchHistory = seaches
  }

  //清空全部
  function clearSearch(){
    clear(SEARCH_KEY)
  }

  return{
    saveSearch,
    deleteSearch,
    clearSearch
  }
}