import { defineStore } from 'pinia';

export const useSearchStateStore = defineStore('searchState', () => {
  const state = reactive({
    query : '',
    isSearch : false
  })

  return{
    state
  }
})