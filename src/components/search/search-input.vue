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
  },
  isFocused: {  // 从父组件传递的聚焦
    type: Boolean,
    default: false
  }
})
const query = ref(props.count)
const internalIsFocused = ref(false);   //是否聚焦

//派发事件
const emit = defineEmits(['update:count', 'update:isFocused'])

// 防抖节流
watch(query, debounce(300, (newQuery) => {
  emit('update:count', newQuery.trim())
}))

watch(() => props.count, (nv) => {
  query.value = nv
})
watch(() => props.isFocused, (newValue) => {
  internalIsFocused.value = newValue;
});

const clear = () => {
  query.value = ''
}

const handleFocus = () => {
  internalIsFocused.value = true;
  emit('update:isFocused', true); // 触发自定义事件并传递值给父组件
};

const handleBlur = () => {
  internalIsFocused.value = false;
  emit('update:isFocused', false); // 触发自定义事件并传递值给父组件
};

const onClickLeft = () => {
  if(!query.value){
    history.back()
  }else{
    clear()
    emit('update:count', '')  // 立马清空
  }
}

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
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <span v-show="query">
        <v-icon 
          size="23" icon="mdi-close-circle" class=" tw-opacity-30"
          @click="clear"
        ></v-icon>
      </span>
      
    </div>
    <span class="tw-text-lg tw-ml-1 tw-text-nowrap">搜索</span>
  </div>
</template>