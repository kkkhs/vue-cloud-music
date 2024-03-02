<script setup>
import { useAsync } from '@/use/useAsync';
import { fetchSearchResultData } from '@/api/search';
import { fetchSongDetailData } from '@/api/songDetail';
import MusicList from '../MusicList.vue';
import scroll from '../scroll/scroll.vue';
import Playlists from '../Playlists.vue';
import Singerlist from '../SingerList.vue';

const loadingText = '正在载入...'
const tab = ref('1')
const songs = ref([])
const props = defineProps({
  query:{
    type: String,
    default: ''
  }
})

const {data, pending, execute} = useAsync(() => fetchSearchResultData(props.query, tab.value)
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
      }
      return v.data.result
    })
, {}, false)

onMounted(() => {
  //首次加载
  execute()
})

watch(tab, (newTab) => {
  if(newTab) {
    execute()
  }
})

</script>

<template>
  <div class=" tw-h-full" v-loading:[loadingText]="pending">
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
                <scroll class="scroll tw-pt-1 tw-h-full">
                  <MusicList :songs="songs" :has-index="false"></MusicList>
                </scroll>
              </v-window-item>

              <v-window-item class="h-100" value="1000">
                <scroll class="scroll tw-pt-1 tw-h-full">
                  <playlists :playlists="data.playlists"> </playlists>
                </scroll>
              </v-window-item>

              <v-window-item class="h-100" value="100">
                <scroll class="scroll tw-pt-1 tw-h-full">
                  <Singerlist :singers="data.artists"></Singerlist>
                </scroll>
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