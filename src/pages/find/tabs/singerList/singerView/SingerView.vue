<script setup>
import { useRoute } from 'vue-router';
import { useAsync } from '@/use/useAsync';
import { fetchArtistDetailData, fetchArtistFollowCount, fetchArtistTopSong } from '@/api/artistDetail'
import SongView from '@/components/SongView.vue';
import { usePlayStateStore } from '@/store/playState.js'
const playState = usePlayStateStore()

const route = useRoute()
const { id } = route.params
const { data, pending } = useAsync(() => fetchArtistDetailData(id).then(v => v.data.data), {})
const { data: followData } = useAsync(() => fetchArtistFollowCount(id).then(v => v.data.data), {})
const { data: TopSong, pending: pending2 } = useAsync(() => fetchArtistTopSong(id).then(v => v.data.songs), [])

const onClickLeft = () => history.back()

const selectItem = ({song, index}) => {
  playState.selectPlay(TopSong.value, index)
  console.log(playState.state.playList)
}

const randomPlay = () => {
  playState.randomPlay(TopSong.value)
  // console.log(playState.state.playList)
}

</script>

<template>
  <div class="">
    <div class="tw-flex tw-justify-between tw-fixed tw-z-10 tw-w-full tw-h-12 tw-text-white">
      <v-icon 
        size="30"
        elevation="0" 
        icon="mdi-chevron-left" 
        @click="onClickLeft" 
        class="tw-text-xl tw-mt-3 tw-ml-2"></v-icon >
      <v-icon 
        size="25"
        elevation="0" 
        icon="mdi-dots-vertical"
        class="tw-mt-3 tw-mr-3"
      ></v-icon >
    </div>
    <div>
      <div class="tw-flex tw-flex-col">
        <v-img 
          :src="data?.artist?.cover" 
          class="tw-w-full tw-z-0 tw-min-h-[316.88px]"
          cover
          
        />
        <div
          class="tw-bg-white tw-shadow tw-z-10 tw-flex tw-flex-nowrap tw-flex-col tw-items-center tw-rounded-xl tw-mx-3 tw-py-4 tw-mb-3 tw--mt-5 tw-opacity-95"
        >
          <div class=" tw-text-2xl tw-font-medium"> {{ data?.artist?.name }}</div>
          <div class="tw-text-sm">{{ data?.artist?.alias[0] }}</div>
          <div class="tw-text-base">{{ followData?.fansCnt }} <span class="tw-text-sm">粉丝</span></div>
          <div>{{ data?.identify?.imageDesc }}</div>
        </div>        
      </div>

      <div
        class="tw-bg-slate-200 tw-text-lg tw-leading-8 tw-pl-4 tw-mb-3 tw-font-medium tw-rounded-2xl"
        @click="randomPlay"
      >
        <v-icon 
          icon="mdi-play-circle"
          color="red-darken-1" 
          class="tw-mr-3 tw--ml-2"
        ></v-icon>
        <span>随机播放热门50</span>
      </div>
      <div
        v-for="(song,index) in TopSong"
        :key="song.id"
      >
        <SongView :song="song" :index="index + 1"  @select="selectItem"></SongView>
      </div>
    </div>
  </div>
</template>