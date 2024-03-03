<script setup>
import { useAsync } from '@/use/useAsync';
import { fetchPlaylistDetailData } from '@/api/playlistDetail';
import MusicList from '../MusicList.vue';
import scroll from '../scroll/scroll.vue';

const TOP_HEIGHT = 56  // 顶部高度

let imgHeight = 0
let maxTranslateY = 0
const middleRef = ref(null)
const scrollY = ref(0)
const title = ref('歌单')
const loadingText = '正在载入...'

const route = useRoute()
const id = route.params.id
const { data, pending} = useAsync(() => fetchPlaylistDetailData(id).then(v => {
  return v.data.playlist
}), {})

onMounted(() => {
  imgHeight = middleRef.value.clientHeight
  maxTranslateY = imgHeight - TOP_HEIGHT //滚动的最大距离
})

const TopStyle = () => {
  const scrolly = scrollY.value

  let color = 'white'
  let backgroundColor = ''
  title.value = '歌单'

  if(scrolly > maxTranslateY){
    title.value = data.value?.name
    color = 'black'
    backgroundColor = 'white'
  }
  return {
    color,
    backgroundColor
  }
}

const onClickLeft = () => history.back()

const onScroll = (pos) => {
  scrollY.value = -pos.y
}
</script>

<template>
  <div class=" tw-fixed tw-top-0 tw-bottom-0 tw-left-0 tw-right-0 tw-bg-white" >
    <div class="tw-fixed tw-top-0 tw-bottom-1/2 tw-left-0 tw-right-0 tw-bg-red-400 -tw-z-10"></div>
    <div 
      class="tw-flex tw-rounded-b-2xl tw-justify-between tw-items-center tw-absolute tw-z-50 tw-top-0 tw-left-0 tw-w-full tw-h-14 tw-text-white tw-transition-all tw-ease-in-out tw-duration-1000" 
      :style="TopStyle()"
    >
      <v-icon 
        size="30"
        elevation="0"
        icon="mdi-chevron-left" 
        @click="onClickLeft" 
        class="tw-text-xl tw-ml-2 tw-mr-3"
      ></v-icon >
      <span class="tw-text-lg tw-flex-1 tw-line-clamp-1 tw-pr-3">{{ title }}</span>
      <v-icon 
        size="25"
        elevation="0" 
        icon="mdi-dots-vertical"
        class=" tw-mr-3"
      ></v-icon >
    </div>
    <scroll 
      class=" tw-h-full"
      :probe-type="3"
      @scroll="onScroll"
    >
      <div>
        <div ref="middleRef" class="middle tw-pt-20 tw-text-white tw-px-4">
          <div class=" tw-flex tw-mb-3 tw-min-h-28">
            <img 
              v-if="data.coverImgUrl"
              class=" tw-h-28 tw-w-28 tw-rounded-2xl" 
              v-lazy="data.coverImgUrl"
            >
            <div class=" tw-flex tw-flex-col tw-ml-3">
              <div class=" tw-mb-3">
                <span class="tw-line-clamp-2 tw-w-56">{{ data?.name }}</span>
              </div>
              <div class=" tw-flex tw-items-center">
                <img 
                  v-if="data.creator?.avatarUrl"
                  class="tw-h-8 tw-w-8 tw-rounded-full tw-border-solid tw-mr-2" 
                  v-lazy="data.creator?.avatarUrl"
                >
                <span class=" tw-text-sm tw-opacity-80">{{ data?.creator?.nickname }}</span>
              </div>
            </div>
          </div>
          <div class=" tw-line-clamp-1 tw-text-sm tw-opacity-80"> {{ data?.description }}</div>
          <div class="tw-flex tw-justify-between tw-my-5">
            <div class="tw-h-10 tw-bg-white rounded-pill tw-w-[105px] tw-bg-opacity-45 tw-justify-center tw-flex tw-items-center">
              <v-icon class=" tw--mt-1" size="30" icon="mdi-share"></v-icon>
              <span class=" tw-text-sm">{{ data?.shareCount }}</span>
            </div>
            <div class="tw-h-10 tw-bg-white rounded-pill tw-w-[105px] tw-bg-opacity-45 tw-flex tw-items-center tw-justify-center">
              <v-icon icon="mdi-chat-processing"></v-icon>
              <span class="tw-text-sm tw-ml-1">{{ data?.commentCount }}</span>
            </div>
            <div class="tw-h-10 tw-bg-red-500 rounded-pill tw-w-[105px] tw-justify-center tw-flex tw-items-center">
              <v-icon icon="mdi-plus-box-multiple"></v-icon>
              <span class=" tw-text-sm tw-ml-1">{{ data?.subscribedCount }}</span>
            </div>
          </div>
        </div>
        <div 
          class="bottom tw-h-full tw-px-3 tw-bg-white tw-rounded-t-2xl" 
          v-loading:[loadingText]="pending"
        >
          <MusicList :songs="data.tracks"></MusicList>
        </div>
      </div>
    </scroll>
  </div>
</template>