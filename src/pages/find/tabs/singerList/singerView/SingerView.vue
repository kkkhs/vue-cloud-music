<script setup>
import { useRoute } from 'vue-router';
import { useAsync } from '@/use/useAsync';
import { fetchArtistDetailData, fetchArtistFollowCount, fetchArtistTopSong } from '@/api/artistDetail'
import SongView from '@/components/SongView.vue';
import { usePlayStateStore } from '@/store/playState.js'
import Scroll from '@/components/scroll/scroll.vue';

const TOP_HEIGHT = 48  // 顶部高度

const playState = usePlayStateStore()
let imgHeight = 0
let maxTranslateY = 0
const bgImg = ref(null)
const scrollY = ref(0)
const title = ref('')

const route = useRoute()
const playList = computed(() => playState.state.playList)
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

const selectItem = ({song, index}) => {
  playState.selectPlay(TopSong.value, index)
  // console.log(playState.state.playList)
}

const randomPlay = () => {
  playState.randomPlay(TopSong.value)
  // console.log(playState.state.playList)
}

</script>

<template>
    <div class="tw-fixed tw-top-0 tw-bottom-0 tw-left-0 tw-right-0 tw-z-10 " >
     <div class="tw-relative tw-h-full">
        <div class="tw-flex tw-rounded-b-2xl tw-justify-between tw-items-center tw-absolute tw-z-50 tw-top-0 tw-left-0 tw-w-full tw-h-12 tw-text-white" 
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
            :src="data?.artist?.cover"  
            class="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-object-cover">
        </div>
        <Scroll 
          class="tw-absolute tw-botom-0 tw-w-full tw-z-0 tw-h-full"
          :style="scrollStyle"
          :probe-type="3"
          @scroll="onScroll"
        >
          <div class="">
            <div
              class=" tw-bg-white tw-shadow-lg tw-border-solid tw-border-2 tw-border-black tw-border-opacity-15 tw-z-10 tw-flex tw-flex-nowrap tw-flex-col tw-items-center tw-rounded-xl tw-mx-3 tw-py-4 tw-mb-3 -tw-mt-10 tw-bg-opacity-90"
            >
              <div class=" tw-text-2xl tw-font-medium"> {{ data?.artist?.name }}</div>
              <div class="tw-text-sm">{{ data?.artist?.alias[0] }}</div>
              <div class="tw-text-base">{{ followData?.fansCnt }} <span class="tw-text-sm">粉丝</span></div>
              <div class=" tw-px-3 ">{{ data?.identify?.imageDesc }}</div>
            </div>      
            <div class=" tw-bg-slate-100">
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
                :class=" {'tw-pb-12': playList.length }"
              >
                <div
                  v-for="(song,index) in TopSong"
                  :key="song.id"
                >
                  <SongView :song="song" :index="index + 1"  @select="selectItem"></SongView>
                </div>
              </div>
            </div>
          </div>
        </Scroll>
      </div>
    </div>
</template>
