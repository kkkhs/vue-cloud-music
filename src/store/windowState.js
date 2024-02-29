import { defineStore } from 'pinia';

export const useWindowStateStore = defineStore('windowState', () => {
  const state = ref('one')
  return{
    state
  }
})