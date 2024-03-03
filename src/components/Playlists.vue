<script setup>
import { brightenKeyword } from '@/utils/highlightKeyword'
import { useSearchStateStore } from '@/store/searchState';

const searchState = useSearchStateStore()
const query = computed(() => searchState.state.query)

const props = defineProps({
  playlists: {
    type: Array,
    default: []
  }
})

const router = useRouter()
const gotoPlaylistDetailPage = (id) => {
  router.push({
    name: 'playlistDetail',
    params: {
      id
    },
  })
}
</script>

<template>
  <div class="">
    <div 
      class="tw-flex tw-mr-2"
      v-for="list in playlists"
      :key="list?.id"
      @click="gotoPlaylistDetailPage(list.id)"
    >
      <img 
        class=" tw-h-16 tw-w-16 tw-rounded-xl tw-my-2"
        :src="list?.coverImgUrl"
      >
      <div class=" tw-flex tw-flex-col tw-py-1 tw-ml-3">
        <div 
          class=" tw-text-base tw-my-2 tw-line-clamp-1 tw-font-medium"
          v-html="brightenKeyword(list?.name, query)"
        ></div>
        <div class="tw-line-clamp-1">
          <span 
            v-show="list?.score !== null"
            class=" tw-inline-block tw-text-red-500 tw-text-center tw-w-8 tw-border-solid tw-border-[1px]  tw-rounded tw-text-xs tw-font-medium tw-border-red-300 tw-leading-[14px] tw-mr-1"
          >{{ list?.score }}分
          </span>
          <span
            class=" tw-text-sm tw-opacity-80"
          >{{ list?.trackCount }}首 ,by {{ list?.creator.nickname }} ,播放{{ list?.playCount }}次</span>  
        </div>
        <div v-if="list?.officialTags !== null">
          <span 
            v-for="tag in list?.officialTags"
            :key="tag.id"
            class="tw-text-orange-600 tw-bg-orange-100 tw-text-[11px] tw-w-fit tw-max-w-[263px] tw-px-1 tw-leading-5 tw-rounded-sm tw-mt-1 tw-mr-2"
          >{{ tag }}
          </span>
        </div>
        <div 
          v-else
          v-if="list?.recommendText !== null"
          class="tw-opacity-80"
          v-html="brightenKeyword(list?.recommendText, query)"
        >
        </div>
      </div>
    </div>
  </div>
</template>