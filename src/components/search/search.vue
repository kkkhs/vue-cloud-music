<script setup>
import searchInput from './search-input.vue';
import suggest from './suggest.vue';
import result from './result.vue'
import { useAsync } from '@/use/useAsync';
import { fetchSearchHotData } from '@/api/search'
import scroll from '../scroll/scroll.vue';

const query = ref(null)
const isFocused = ref(false);

watch(isFocused, (nq) => {
  console.log(nq)
})

const updateIsFocused = (value) => {
  isFocused.value = value; // 更新父组件中的 isFocused 变量
};

// api
const { data:hotLists, pending:pending1} = useAsync(() => fetchSearchHotData().then( v => v.data.data),{})

const addQuery = (s) => {
  query.value = s
}

</script>

<template>
  <div class="tw-fixed tw-top-0 tw-bottom-0 tw-left-0 tw-right-0 tw-bg-slate-200 tw-flex tw-flex-col">
    <div 
      class="tw-fixed tw-left-0 tw-top-0 tw-right-0 tw-h-14 tw-z-50 tw-bg-slate-200"
      :class="{ 'tw-bg-white' : query && !isFocused }"
    >
      <searchInput 
        v-model:count="query"
        :is-focused="isFocused" 
        @update:is-focused="updateIsFocused"  
      ></searchInput>
    </div>
    <div class="search-content tw-h-full" v-show="!query">
      <scroll class="tw-h-full">
        <div class="tw-h-fit tw-pt-20 ">
          <div class="hot tw-bg-white tw-rounded-2xl tw-mx-5 tw-px-4 py-4">
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
      </scroll>
      
    </div>
    <div class="search-suggest tw-h-full" v-show="query && isFocused">
      <suggest :query="query"></suggest>
    </div>

    <div class="search-result tw-h-full" v-if="query && !isFocused">
      <div class="wrapper tw-pt-14 tw-h-fit">
        <result :query="query"></result>
      </div>
    </div>
  </div>
</template>