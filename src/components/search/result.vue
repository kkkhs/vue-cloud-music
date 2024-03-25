<script setup>
import { useAsync } from '@/use/useAsync';
import { fetchSearchResultData } from '@/api/search';
import { fetchSongDetailData } from '@/api/songDetail';
import MusicList from '../MusicList.vue';
import Playlists from '../Playlists.vue';
import Singerlist from '../SingerList.vue';
import usePullUpLoad from './use-pull-up-load';

const loadingText = '正在载入...'
const tab = ref('1')
const offset = ref(0)
const songs = ref([])
const playlists = ref([])
const artists = ref([])
const hasMore = ref(false)
const preventPullUpLoad = ref(false)

const props = defineProps({
  query:{
    type: String,
    default: ''
  }
})

// hooks
const { rootRef, isPullUpLoad } = usePullUpLoad(searchMore, preventPullUpLoad)

const {data, pending, execute} = useAsync(() => fetchSearchResultData(props.query, tab.value, offset.value)
    .then(v => {
      //歌曲详情数据
      if(tab.value === '1'){
        let songIds = ''
        for (let index = 0; index < v.data.result.songs.length; index++) {
          const id = v.data.result.songs[index].id + '';
          if(index === 0){
            songIds += id
          }else{
            songIds += ',' +id
          }
        }
        useAsync(() => fetchSongDetailData(songIds).then(hv => {
          songs.value = hv.data.songs
        }))
      }else if(tab.value === '1000'){
        playlists.value = v.data.result.playlists
      }else if(tab.value === '100') {
        artists.value = v.data.result.artists
      }
      
      // 获取hasMore的值
      hasMore.value = v.data.result.hasMore
      // console.log(hasMore.value)

      return v.data.result
    })
, {}, false)

onMounted(() => {
  //首次加载
  execute()
})

watch(tab, (newTab) => {
  if(newTab) {
    offset.value = 0    
    execute()
  }
})
</script>

<template>
  <div class="tw-h-full" v-loading:[loadingText]="pending">
    <v-card class="h-100">
      <div class="tw-z-50 tw-bg-white">
        <v-tabs
          color="red-lighten-2"
          height="30"
          v-model="tab"
          bg-color="white"
        >
          <v-tab value="1">单曲</v-tab>
          <v-tab value="1000">歌单</v-tab>
          <v-tab value="100">歌手</v-tab>
          <v-tab value="1002">用户</v-tab>
        </v-tabs>
      </div>
      <div class="tw-h-full">
        <div class="tw-w-full tw-h-full tw-bg-white">
          <v-card-text 
            class="pl-5 pr-0 h-100 py-0"
          >
            <v-window class="h-100"  v-model="tab">
              <v-window-item class="h-100" value="1">
                <div ref="rootRef" class="scroll MusicList tw-pt-1 tw-h-full">
                  <div class=" tw-pb-8">
                    <MusicList :songs="songs" :has-index="false" :isHightLight="true" :keyWord="query"
                    ></MusicList>
                    <div 
                      class="tw-w-full tw-h-8 tw-text-black tw-text-center tw-text-base" 
                      v-if="isPullUpLoad && hasMore"
                    >
                      正在载入...
                    </div>
                  </div>
                </div>
              </v-window-item>

              <v-window-item class="h-100" value="1000">
                <div ref="rootRef" class="scroll playlists tw-pt-1 tw-h-full">
                  <div class="tw-pb-8">
                    <playlists :playlists="playlists"> </playlists>
                    <div 
                      class="tw-w-full tw-h-8 tw-text-black tw-text-center tw-text-base" 
                      v-show="isPullUpLoad && hasMore"
                    >
                      正在载入...
                    </div>
                  </div>
                </div>
              </v-window-item>

              <v-window-item class="h-100" value="100">
                <div ref="rootRef" class="scroll Singerlist tw-pt-1 tw-h-full">
                  <div class=" tw-pb-8">
                    <Singerlist :singers="artists"></Singerlist>
                    <div 
                      class="tw-w-full tw-h-8 tw-text-black tw-text-center tw-text-base" 
                      v-show="isPullUpLoad && hasMore"
                    >
                      正在载入...
                    </div>
                  </div>
                </div>
              </v-window-item>

              <v-window-item value="1002">
                待探索...
              </v-window-item>
            </v-window>
          </v-card-text>
        </div>
      </div>
    </v-card>
  </div>
</template>

<style>
.highlight {
  color: green;
}
</style>