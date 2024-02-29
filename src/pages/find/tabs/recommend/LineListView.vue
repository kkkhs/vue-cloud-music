<script setup>
import { useAsync } from '@/use/useAsync';
import { fetchRecommendedPlayListData } from '@/api/RecommendedPlayList'
import { useRouter } from 'vue-router';
import BScroll from '@better-scroll/core'
import ObserveDOM from "@better-scroll/observe-dom";
BScroll.use(ObserveDOM)

const scroll = ref(null)
const bs = ref(null)
const router = useRouter()
const {data, pending} = useAsync(
  () => fetchRecommendedPlayListData(6).then((v) => v.data.result), [])

const GotoRecommendedListPage = () => {
  router.push({name: 'recommendedListPage'})
}

onMounted(() => {
  bs.value = new BScroll(scroll.value, {
    observeDOM: true,
    scrollY: false,
    scrollX: true,
    click: true,
  })
})

onUnmounted(() => {
  bs.value.destroy()
})

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
  <div @touchstart.stop @touchend.stop>
    <div class="tw-mb-2">
      <span class=" tw-text-base tw-font-medium" @click="GotoRecommendedListPage">推荐歌单 &gt;</span>
    </div>
    <div 
      ref="scroll"
      @click="test"
      class="tw-relative tw-w-full tw-overflow-hidden  white-space nowrap" 
    >
      <div class="tw-inline-block tw-w-auto">
        <v-lazy transition="fade-transition">
          <div
            class="tw-flex tw-w-fit"
          >
            <div
              class="tw-h-50 tw-w-32 tw-flex tw-flex-col tw-mr-5 tw-justify-center tw-pb-3"
              v-for="item in data"
              :key="item.id"
              @click="gotoPlaylistDetailPage(item.id)"
            >
              <v-img 
                lazy-src="https://picsum.photos/id/11/100/60"
                class="tw-h-32 tw-w-32 tw-rounded-xl tw-mb-1" 
                :src="item.picUrl"
                cover
              />
              <span class="tw-h-9 tw-text-[12px] tw-line-clamp-2 ">{{ item.name }}</span>
            </div>
          </div>
        </v-lazy>
      </div>
    </div>
  </div>
</template>