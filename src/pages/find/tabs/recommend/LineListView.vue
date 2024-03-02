<script setup>
import { useAsync } from '@/use/useAsync';
import { fetchRecommendedPlayListData } from '@/api/RecommendedPlayList'
import { useRouter } from 'vue-router';
import scrollY from '@/components/scrollY/scrollY.vue'

const router = useRouter()
const {data, pending} = useAsync(
  () => fetchRecommendedPlayListData(6).then((v) => v.data.result), [])

const GotoRecommendedListPage = () => {
  router.push({name: 'recommendedListPage'})
}

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
  <div>
    <div class="tw-mb-2">
      <span class=" tw-text-base tw-font-medium" @click="GotoRecommendedListPage">推荐歌单 &gt;</span>
    </div>
    <scrollY class="scroll tw-w-full">
      <div class="tw-inline-block">
        <v-lazy transition="fade-transition">
          <div
            class="tw-flex"
          >
            <div
              class="tw-h-50 tw-w-32 tw-flex tw-flex-col tw-mr-5 tw-justify-center tw-pb-3"
              v-for="item in data"
              :key="item.id"
              @click="gotoPlaylistDetailPage(item.id)"
            >
              <v-img
                lazy-src="https://static.infinitytab.com/infinity-official/img/IMG-LOGO@2x.png"
                class="tw-h-32 tw-w-32 tw-rounded-xl tw-mb-1" 
                :src="item.picUrl"
                cover
              />
              <span class="tw-h-9 tw-text-[12px] tw-line-clamp-2 ">{{ item.name }}</span>
            </div>
          </div>
        </v-lazy>
      </div>
    </scrollY>
      
  </div>
</template>