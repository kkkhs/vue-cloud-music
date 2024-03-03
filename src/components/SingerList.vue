<script setup>
import { brightenKeyword } from '@/utils/highlightKeyword'
import { useSearchStateStore } from '@/store/searchState';

const searchState = useSearchStateStore()
const query = computed(() => searchState.state.query)

const props = defineProps({
  singers: {
    type: Array,
    default: []
  }
})

const router = useRouter()
const gotoSingerDetail = (id) => {
  router.push({
    name: 'artist',
    params: {
      id
    },
  })
}
</script>

<template>
  <div class="tw-flex tw-flex-col">
    <div 
      v-for="singer in singers"
      :key="singer?.id"
      class="tw-flex tw-items-center tw-my-2"
      @click="gotoSingerDetail(singer?.id)"
    >
      <div>
        <img class="tw-h-14 tw-w-14 tw-rounded-full tw-mr-2" v-lazy="singer?.picUrl">
      </div>
      <div class=" tw-w-full tw-flex tw-flex-1 tw-justify-between tw-items-center tw-border-solid tw-border-t-0 tw-border-l-0 tw-border-r-0 tw-border-b-[1px] tw-border-slate-200 tw-pb-1">
        <div>
          <span 
            class="tw-text-base tw-font-medium tw-mb-1 tw-line-clamp-1"
            v-html="brightenKeyword(singer?.name, query)"
          >
          </span>
          <span 
            v-if="singer?.fansGroup !== null"
            class=" tw-text-sky-600"
          > 
            {{ singer?.fansGroup.text }} >
          </span>
        </div>
        <div>
          <div
            class="tw-transition-all tw-ease-in-out tw-text-xs tw-border-solid tw-rounded-3xl tw-border-[1px] tw-mr-8 tw-py-1 tw-px-2 tw-text-red-500"
          > + 关注</div>
        </div>
      </div>
    </div>
  </div>
</template>