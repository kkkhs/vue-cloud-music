<script setup>
import { debounce } from 'throttle-debounce'
import { useSearchStateStore } from '@/store/searchState';

const searchState = useSearchStateStore()
const props = defineProps({
  placeholder:{
    type: String,
    default: '搜索歌曲、歌手'
  }
})

const inputValue = ref(searchState.state.query)

// 防抖节流
watch(inputValue, debounce(300, (newQuery) => {
  // console.log(' searchIput------', newQuery)
  searchState.state.query = newQuery
}))

// 监听 Pinia 中数据的变化，并更新输入框的值
watchEffect(() => {
  inputValue.value = searchState.state.query;
});

const clear = () => {
  searchState.state.query = ''
  searchState.state.isSearch = false
  inputValue.value = ''
}

const onClickLeft = () => {
  if(!inputValue.value){
    history.back()
    searchState.state.isSearch = false
  }else{
    clear()
  }
}

const search = () => {
  if(inputValue.value){
    searchState.state.isSearch = true
  }
}

const handleFocus = () => {
  searchState.state.isSearch = false
}
</script>

<template>
  <div class=" tw-flex tw-h-full tw-items-center tw-px-3">
    <v-icon
      size="30" icon="mdi-arrow-left"
      @click="onClickLeft"
    ></v-icon>
    <div class="tw-flex tw-flex-1 tw-bg-white tw-mx-2 tw-h-8 tw-items-center tw-rounded-2xl tw-px-3 tw-border-solid tw-border-[1px] tw-border-slate-300">
      <v-icon size="23" icon="mdi-magnify" class="tw-opacity-60 tw-mr-2"></v-icon>
      <input 
        class="tw-flex-1 tw-box-border tw-outline-none tw-text-lg" 
        :placeholder="placeholder"
        v-model="inputValue"
        @focus="handleFocus"
      >
      <span v-show="inputValue">
        <v-icon 
          size="23" icon="mdi-close-circle" class=" tw-opacity-30"
          @click="clear"
        ></v-icon>
      </span>
      
    </div>
    <span class="tw-text-lg tw-ml-1 tw-text-nowrap" @click="search">搜索</span>
  </div>
</template>