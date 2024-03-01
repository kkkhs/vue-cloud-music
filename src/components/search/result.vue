<script setup>
import { useAsync } from '@/use/useAsync';
import { fetchSearchResultData } from '@/api/search';
import MusicList from '../MusicList.vue';

const tab = ref('1')
const props = defineProps({
  query:{
    type: String,
    default: ''
  }
})

const {data, pending, execute} = useAsync(() => fetchSearchResultData(props.query, tab.value)
    .then(v => {
      if(tab.value === 1){

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
  <div>
    <v-card class="h-100">
      <v-tabs
        height="30"
        v-model="tab"
      >
        <v-tab value="1">单曲</v-tab>
        <v-tab value="1000">歌单</v-tab>
        <v-tab value="100">歌手</v-tab>
        <v-tab value="1002">用户</v-tab>
      </v-tabs>

      <v-card-text class="h-100 px-5 py-0">
        <v-window  v-model="tab">
          <v-window-item  value="1">
            <MusicList :songs="data.songs" :has-index="false"></MusicList>
          </v-window-item>

          <v-window-item value="1000">
            歌单
          </v-window-item>

          <v-window-item value="100">
            歌手
          </v-window-item>

          <v-window-item value="1002">
            歌手
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
    {{ data }}
  </div>
</template>