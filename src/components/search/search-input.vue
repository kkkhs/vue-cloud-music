<script setup>
import { debounce } from 'throttle-debounce'

const props = defineProps({
  count:{
    type: String,
    default: '',
  },
  placeholder:{
    type: String,
    default: '搜索歌曲、歌手'
  }
})
const query = ref(props.count)

//派发事件
const emit = defineEmits(['update:count'])

// 防抖节流
watch(query, debounce(300, (newQuery) => {
  emit('update:count', newQuery.trim())
}))

watch(() => props.count, (nv) => {
  query.value = nv
})

const clear = () => {
  query.value = ''
}

const onClickLeft = () => history.back()

</script>

<template>
  <div class=" tw-flex tw-h-full tw-items-center tw-px-3">
    <v-icon
      size="30" icon="mdi-arrow-left"
      @click="onClickLeft"
    ></v-icon>
    <div class="tw-flex tw-flex-1 tw-bg-white tw-mx-2 tw-h-8 tw-items-center tw-rounded-2xl tw-px-3">
      <v-icon size="23" icon="mdi-magnify" class="tw-opacity-60 tw-mr-2"></v-icon>
      <input 
        class="tw-flex-1 tw-box-border tw-outline-none tw-text-lg" 
        :placeholder="placeholder"
        v-model="query"
      >
      <span v-show="query">
        <v-icon 
          size="23" icon="mdi-close-circle" class=" tw-opacity-30"
          @click="clear"
        ></v-icon>
      </span>
      
        
    </div>
    <span class="tw-text-xl tw-text-nowrap">搜索</span>
  </div>
</template>