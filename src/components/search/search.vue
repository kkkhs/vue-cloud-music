<script setup>
import searchInput from './search-input.vue';
import suggest from './suggest.vue';
import result from './result.vue'
import SearchHistory from './search-history.vue'
import scroll from '../scroll/scroll.vue';
import { useAsync } from '@/use/useAsync';
import { fetchSearchHotData } from '@/api/search'
import { useSearchStateStore } from '@/store/searchState';

const searchHistory = computed(() => searchState.state.searchHistory)
const searchState = useSearchStateStore()
const query = computed(() => searchState.state.query)
const isSearch = computed(() => searchState.state.isSearch)

watch(query, (newQuery) => {
  // console.log(' search------', newQuery)
  searchState.state.query = newQuery
})

// api
const { data:hotLists, pending:pending1} = useAsync(() => fetchSearchHotData().then( v => v.data.data),{})

const addQuery = (s) => {
  searchState.state.query = s
  searchState.state.isSearch = true
}

</script>

<template>
  <div class="tw-fixed tw-top-0 tw-bottom-0 tw-left-0 tw-right-0 tw-bg-slate-200 tw-flex tw-flex-col">
    <div 
      class="tw-fixed tw-left-0 tw-top-0 tw-right-0 tw-h-14 tw-z-50 tw-bg-slate-200"
      :class="{ 'tw-bg-white' : query && isSearch }"
    >
      <searchInput></searchInput>
    </div>
    <div class="search-content tw-h-full" v-show="!query">
      <scroll class="scroll tw-h-full">
        <div class="tw-h-fit tw-pt-12 tw-pb-2 ">
          <transition-group appear tag="">
            <div 
              key="'searchHistory'"
              class="tw-mx-5 tw-pt-4"
              v-show="searchHistory.length"
            >
              <SearchHistory></SearchHistory>
            </div>
            <div
              key="'hot'"
              class="hot tw-bg-white tw-rounded-2xl tw-mx-5 tw-px-4 tw-pb-1 tw-pt-4 tw-mt-4"
            >
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
          </transition-group>
        </div>
      </scroll>
      
    </div>
    <div class="search-suggest tw-h-full" v-show="query && !isSearch">
      <suggest></suggest>
    </div>

    <div class="search-result tw-h-full" v-if="isSearch">
      <div class="wrapper tw-pt-14 tw-h-full">
        <result :query="query"></result>
      </div>
    </div>
  </div>
</template>

<style scoped>

.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

/* 移除元素比较突兀，所以使用v-move设置没被移除元素的动画，v-move要配置v-leave-active:{position:absolute} */
.v-move {
  transition: all 0.5s ease;
}
.v-leave-active {
  position: absolute;
}

</style>