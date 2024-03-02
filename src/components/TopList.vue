<!-- 排行榜 -->
<script setup>
import { useAsync } from '@/use/useAsync';
import { fetchTopListData } from '@/api/topList'
import { fetchPlaylistDetailData } from '@/api/playlistDetail';

const loadingText = '正在载入...'
const router = useRouter()
const topLists = ref([])
const { pending} = useAsync(
  () => fetchTopListData().then((v) => {
    topLists.value = v.data.list 
    for(let i = 0; i < topLists.value.length; i ++){
      useAsync(
        () => fetchPlaylistDetailData(topLists.value[i].id).then((item) => {
          topLists.value[i].top3=item.data.playlist.tracks.slice(0,3)
        }), {})
    }
  }), [])

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
  <div class=" tw-w-full tw-bg-slate-100 tw-px-4" v-loading:[loadingText]="pending">
    <div class=" tw-py-3 tw-flex tw-items-center">
      <v-icon icon="mdi-music-circle" size="32" color="red-darken-1"></v-icon>
      <span class=" tw-text-lg tw-ml-2">官方榜</span>
    </div>
    <div
      class="tw-flex tw-flex-col tw-mb-4 tw-bg-white tw-rounded-2xl tw-px-6 tw-py-2" 
      v-for="list in topLists"
      :key="list"
      @click="gotoPlaylistDetailPage(list.id)"
    >
      <div class="tw-flex tw-justify-between tw-mb-2">
        <span class="tw-text-xl"> {{ list.name }}</span>
        <span class="tw-text-xs tw-opacity-60">{{ list.updateFrequency }}</span>
      </div>
      <div class=" tw-flex">
        <img class=" tw-h-20 tw-w-20 tw-rounded-2xl tw-mr-5" :src="list.coverImgUrl">
        <div class=" tw-flex tw-flex-col tw-justify-center ">
          <div
            class="tw-my-1 tw-line-clamp-1 tw-max-w-52"
            v-for="(song, index) in list.top3"
            :key="index"
          >
            <span class=" tw-mx-2 tw-font-bold">{{ index + 1 }}</span>
            <span class="">{{ song.name }}
              <span
                class="tw-text-center tw-text-sm tw-leading-5 tw-font-normal tw-opacity-60"
              > -  {{ song?.ar[0]?.name }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>