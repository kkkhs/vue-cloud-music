<script setup>
import { useAsync } from '@/use/useAsync';
import { fetchSearchSuggestData } from '@/api/search'
import { brightenKeyword } from '@/utils/highlightKeyword'
import { useSearchStateStore } from '@/store/searchState';

const searchState = useSearchStateStore()
const query = computed(() => searchState.state.query)

const loadingText = '正在载入...'
const suggest = ref([])

const { pending, execute } = useAsync(() => fetchSearchSuggestData(query.value).then(v => {
  suggest.value = v.data.result.allMatch
}), [], false)  

onMounted(() => {
  execute();
})

watch(query, (newQuery) => {
  // console.log(' searchSuggest------', newQuery)

  if(!newQuery){
    return
  }
  searchState.state.query = newQuery
  suggest.value = []
  execute();
})

const handleClick = (word) => {
  searchState.state.query = word;
  searchState.state.isSearch = true;
};

const back = () => {
  searchState.state.query = ''
}
</script>

<template>
  <div class="tw-h-full tw-w-full tw-flex tw-flex-col tw-mt-14" v-loading:[loadingText]="pending">
    <div v-show="!suggest && !pending" class="tw-ml-6 tw-text-lg tw-mt-3">暂无搜索建议...</div>
    <div 
      class=" tw-h-12 tw-flex tw-items-center"
      v-for="item in suggest"
      :key="item.keyword"
      @click="handleClick(item.keyword)"
    >
      <v-icon size="23" icon="mdi-magnify" class="tw-opacity-60 tw-ml-5 tw-mr-2"></v-icon>
      <span 
        class=" tw-flex-1 tw-border-solid tw-border-t-0 tw-border-l-0 tw-border-r-0 tw-border-slate-300 tw-border-b-[1px] tw-text-lg tw-leading-10 tw-line-clamp-1"
        v-html="brightenKeyword(item.keyword, query)"
      ></span>
    </div>
    <div 
      class="tw-w-full tw-flex-1"
      @click="back()"  
    ></div>
  </div>
</template>