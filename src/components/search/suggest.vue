<script setup>
import { useAsync } from '@/use/useAsync';
import { fetchSearchSuggestData } from '@/api/search'

const props = defineProps({
  query: {
    type: String,
    default: ''
  },
  showSinger: {
    type: Boolean,
    default: true
  }
})

const loadingText = '正在载入...'
const suggest = reactive({})

watch(() => props.query, (newQuery) => {
  if(!newQuery){
    return
  }
  console.log(newQuery)
  const { pending } = useAsync(() => fetchSearchSuggestData(props.query).then(v => {
    suggest.value = v.data.result.allMatch
  }), {})  
})

</script>

<template>
  <div class=" tw-bg-slate-100 tw-h-full tw-w-full tw-flex tw-flex-col tw-mt-20">
    <div 
      v-for="item in suggest.value"
      :key="item.keyword"
    >
      <v-icon size="23" icon="mdi-magnify" class=" tw-opacity-60 tw-mr-2"></v-icon>
      <span>{{ item.keyword }}</span>
    </div>
  </div>
</template>