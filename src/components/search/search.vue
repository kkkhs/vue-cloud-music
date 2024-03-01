<script setup>
import searchInput from './search-input.vue';
import suggest from './suggest.vue';
import { useAsync } from '@/use/useAsync';
import { fetchSearchHotData } from '@/api/search'

const query = ref(null)

watch(query, (nq) => {
  console.log(nq)
})

// api
const { data:hotLists, pending:pending1} = useAsync(() => fetchSearchHotData().then( v => v.data.data),{})

const addQuery = (s) => {
  query.value = s
}

</script>

<template>
  <div class="tw-fixed tw-top-0 tw-bottom-0 tw-left-0 tw-right-0 tw-bg-slate-200 tw-flex tw-flex-col">
    <div class="tw-fixed tw-left-0 tw-top-0 tw-right-0 tw-h-14">
      <searchInput v-model:count="query" ></searchInput>
    </div>
    <div class="search-content tw-flex-1" v-show="!query">
      <div class="hot tw-mt-20 tw-bg-white tw-rounded-2xl tw-mx-5 tw-px-4 py-4">
        <div class=" tw-pb-3 tw-border-b-[1px] tw-border-t-0 tw-border-l-0 tw-border-r-0 tw-border-solid tw-border-b-slate-200">
          <span class=" tw-font-bold tw-text-xl"> 热搜榜 </span>
        </div>
        <div>
          <div
            class=" tw-my-2 tw-flex tw-items-center"
            v-for="(list, index) in hotLists"
            :key="index"
            @click="addQuery(list.searchWord)"
          >
            <span 
              class="tw-text-xl tw-text-opacity-80 tw-w-8"
              :class="{'tw-text-red-500 tw-font-bold' : index < 3}"
            >{{ index + 1 }}</span>
            <span 
              class="tw-mr-1"
              :class="{'tw-font-bold' : index < 3}"
            >{{ list.searchWord }}</span>
            <img 
              class="tw-h-4" 
              :src="list.iconUrl">
          </div>
        </div>
      </div>
    </div>
    
    <div class="search-suggest tw-flex-1" v-show="query">
      <suggest :query="query"></suggest>
    </div>
  </div>
</template>