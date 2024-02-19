<script setup>
import { useAsync } from '@/use/useAsync';
import {fetchRecommendedPlayListData} from '@/api/RecommendedPlayList'
import { useRouter } from 'vue-router';

const router = useRouter()
const {data, pending} = useAsync(
  () => fetchRecommendedPlayListData(6).then((v) => v.data.result), [])

const GotoRecommendedListPage = () => {
  router.push({name: 'recommendedListPage'})
}
</script>

<template>
  <div @touchstart.stop @touchend.stop>
    <div class="tw-mb-2">
      <span class=" tw-text-base tw-font-medium" @click="GotoRecommendedListPage">推荐歌单 &gt;</span>
    </div>
    <v-lazy transition="fade-transition">
      <v-card 
        :loading="pending" 
        class="mb-n3" 
        variant="flat"
      >
        <div
          class="tw-flex tw-overflow-x-scroll tw-overflow-y-hidden tw-overscroll-none"
        >
          <div
            class="tw-h-50 tw-flex tw-flex-col tw-mr-5 tw-justify-center tw-pb-3"
            v-for="item in data"
            :key="item.id"
          >
            <v-img 
              lazy-src="https://picsum.photos/id/11/100/60"
              class="tw-h-32 tw-w-32 tw-rounded-xl tw-mb-1" 
              :src="item.picUrl"
              cover
            />
            <span class="tw-h-9 tw-text-[12px]">{{ item.name }}</span>
          </div>
        </div>
      </v-card>
    </v-lazy>
  </div>
</template>