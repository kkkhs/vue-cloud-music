import { defineStore } from 'pinia';
import { load } from '@/utils/array-store';
import { SEARCH_KEY } from '@/utils/const'

export const useSearchStateStore = defineStore('searchState', () => {
  const state = reactive({
    query : '',
    isSearch : false,
    searchHistory: load(SEARCH_KEY)
  })

  return{
    state
  }
})