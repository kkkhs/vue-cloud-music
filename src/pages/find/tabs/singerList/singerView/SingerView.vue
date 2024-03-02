<script setup>
import { useRoute } from 'vue-router';
import { useAsync } from '@/use/useAsync';
import { fetchArtistDetailData, fetchArtistFollowCount, fetchArtistTopSong } from '@/api/artistDetail'
import Scroll from '@/components/scroll/scroll.vue';
import MusicList from '@/components/MusicList.vue';

const loadingText = '正在载入...'
const TOP_HEIGHT = 48  // 顶部高度

let imgHeight = 0
let maxTranslateY = 0
const bgImg = ref(null)
const scrollY = ref(0)
const title = ref('')

const route = useRoute()

const { id } = route.params
const { data, pending } = useAsync(() => fetchArtistDetailData(id).then(v => v.data.data), {})
const { data: followData } = useAsync(() => fetchArtistFollowCount(id).then(v => v.data.data), {})
const { data: TopSong, pending: pending2 } = useAsync(() => fetchArtistTopSong(id).then(v => v.data.songs), [])

onMounted(() => {
  imgHeight = bgImg.value.clientHeight
  maxTranslateY = imgHeight - TOP_HEIGHT //滚动的最大距离
})

const bgImageStyle = () => {
  const scrolly = scrollY.value
  let paddingTop = '80%'
  let height = 0
  let translateZ = 0

  if(scrolly > maxTranslateY){
    translateZ = 1
  }

  let scale = 1
  if(scrolly < 0) {
    scale = 1 + Math.abs(scrolly / imgHeight)
  }
 return {
    paddingTop,
    height,
    transform: `scale(${scale})translateZ(${translateZ})`
 }
}

const TopStyle = () => {
  const scrolly = scrollY.value

  let color = 'white'
  let backgroundColor = ''
  title.value = ''

  if(scrolly > maxTranslateY){
    title.value = data.value?.artist?.name
    color = 'black'
    backgroundColor = 'white'
  }
  return {
    color,
    backgroundColor
  }
}

const scrollStyle = () => {
  console.log(imgHeight)
  return{
    top: `${imgHeight}px`
  }
}

const onClickLeft = () => history.back()

const onScroll = (pos) => {
  scrollY.value = -pos.y + 40
}

</script>

<template>
    <div class="tw-fixed tw-top-0 tw-bottom-0 tw-left-0 tw-right-0 tw-z-10 " >
     <div class="tw-relative tw-h-full">
        <div class="tw-flex tw-rounded-b-2xl tw-justify-between tw-items-center tw-absolute tw-z-50 tw-top-0 tw-left-0 tw-w-full tw-h-12 tw-text-white tw-transition-all tw-ease-in-out tw-duration-1000" 
          :style="TopStyle()"
        >
          <v-icon 
            size="30"
            elevation="0" 
            icon="mdi-chevron-left" 
            @click="onClickLeft" 
            class="tw-text-xl tw-ml-2"></v-icon >
          <span v-show="title" class=" tw-text-lg">{{ title }}</span>
          <v-icon 
            size="25"
            elevation="0" 
            icon="mdi-dots-vertical"
            class=" tw-mr-3"
          ></v-icon >
        </div>
        <div
          ref="bgImg"
          :style="bgImageStyle()"
          class="tw-relative tw-w-full tw-origin-top tw-bg-cover"
        >
          <img 
            v-if="data.artist?.cover"
            v-lazy="data.artist?.cover"  
            class="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-object-cover">
        </div>
        <Scroll 
          class="tw-absolute tw-botom-0 tw-w-full tw-z-0 tw-h-full"
          :style="scrollStyle"
          :probe-type="3"
          @scroll="onScroll"
        >
          <div class="" v-loading:[loadingText]="pending">
            <div
              class=" tw-bg-white tw-shadow-lg tw-border-solid tw-border-2 tw-border-black tw-border-opacity-15 tw-z-10 tw-flex tw-flex-nowrap tw-flex-col tw-items-center tw-rounded-xl tw-mx-3 tw-py-4 tw-mb-3 -tw-mt-10 tw-bg-opacity-90"
            >
              <div class=" tw-text-2xl tw-font-medium"> {{ data?.artist?.name }}</div>
              <div class="tw-text-sm">{{ data?.artist?.alias[0] }}</div>
              <div class="tw-text-base">{{ followData?.fansCnt }} <span class="tw-text-sm">粉丝</span></div>
              <div class=" tw-max-w-72 tw-truncate ">{{ data?.identify?.imageDesc }}</div>
            </div>      
            <div class=" tw-bg-white tw-pr-2 tw-pl-4 tw-rounded-2xl">
              <MusicList :songs="TopSong"></MusicList>
            </div>
          </div>
        </Scroll>
      </div>
    </div>
</template>
