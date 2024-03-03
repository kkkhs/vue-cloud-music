<script setup>
import { useSearchStateStore } from '@/store/searchState';
import useSearchHistory from './use-search-history' 

const searchState = useSearchStateStore()
const searchHistory = computed(() => searchState.state.searchHistory)
const isSearch = computed(() => searchState.state.isSearch)
const query = computed(() => searchState.state.query)
const dialog = ref(false)

//hooks
const { saveSearch, clearSearch } = useSearchHistory()

// 监听isSeach, 保存searchHistory
watch(isSearch, (newIsSearch) => {
  // console.log(newIsSearch)
  if(newIsSearch === true){
    // console.log(query.value)
    saveSearch(query.value)
  }
})

const addQuery = (s) => {
  searchState.state.query = s
  searchState.state.isSearch = true
}

// 清空
const clear = () => {
  searchState.state.searchHistory = []
  clearSearch()
  dialog.value = false
}
</script>

<template>
  <div class="tw-w-full tw-flex tw-justify-between">
    <span class="tw-font-semibold">搜索历史</span>
    <v-icon 
      class=" tw-opacity-50" icon="mdi-trash-can-outline"
      @click="dialog = true"  
    ></v-icon>
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        class="rounded-xl tw-text-center"
        width="200"
        height="100"
        text="是否清空搜索历史"
      >
        <div class="tw-flex tw-justify-center">
          <v-btn
            class="tw-flex-1"
            text="取消"
            @click="dialog = false"
          ></v-btn>
          <v-btn
            class="tw-flex-1"
            text="清空"
            @click="clear"
          ></v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>

  <div class="tw-flex tw-flex-wrap tw-pl-2 tw-w-full">
    <div 
      class="tw-mr-2 tw-my-2 tw-rounded-3xl tw-px-3 tw-bg-opacity-80 tw-bg-white tw-py-[2px] tw-max-w-40 tw-truncate tw-text-sm"
      v-for="item in searchHistory"
      @click="addQuery(item)"
    >
      {{ item }}
    </div>
  </div>
</template>