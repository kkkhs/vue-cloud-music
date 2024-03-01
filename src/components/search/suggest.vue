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
const suggest = ref([])

const { pending, execute } = useAsync(() => fetchSearchSuggestData(props.query).then(v => {
  suggest.value = v.data.result.allMatch
}), [])  

watch(() => props.query, (newQuery) => {
  if(!newQuery){
    return
  }
  suggest.value = []
})

watch(() => props.query, (newQuery) => {
  if (newQuery) {
    execute();
  }
})

</script>

<template>
  <div class="tw-h-full tw-w-full tw-flex tw-flex-col tw-mt-14" v-loading:[loadingText]="pending">
    <div v-show="!suggest && !pending" class="tw-ml-6 tw-text-lg tw-mt-3">暂无搜索建议...</div>
    <div 
      class=" tw-h-12 tw-flex tw-items-center"
      v-for="item in suggest"
      :key="item.keyword"
    >
      <v-icon size="23" icon="mdi-magnify" class="tw-opacity-60 tw-ml-5 tw-mr-2"></v-icon>
      <span class=" tw-flex-1 tw-border-solid tw-border-t-0 tw-border-l-0 tw-border-r-0 tw-border-slate-300 tw-border-b-[1px] tw-text-lg tw-leading-10 tw-line-clamp-1">{{ item.keyword }}</span>
    </div>
  </div>
</template>