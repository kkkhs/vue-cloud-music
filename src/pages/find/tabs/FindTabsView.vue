<script setup>
import { ref } from 'vue'
import RecommendView from './recommend/RecommendView.vue'
import SingerList from './singerList/singerList.vue'
import { useWindowStateStore } from '@/store/windowState';

const windowState = useWindowStateStore()
console.log(windowState.state)
const tab = ref(windowState.state)

watch(tab, (nt) => {
  windowState.state = nt
  // console.log(windowState.state )
})

</script>

<template>
  <v-card
    class=" tw-mt-10"
    variant="flat"
  >
    <v-tabs
      :elevation="0"
      color="red-lighten-2"
      v-model="tab"
      class="tw-fixed tw-z-10 tw-bg-white tw-w-full"
    >
      <v-tab value="one">推荐</v-tab>
      <v-tab value="two">歌手列表</v-tab>
      <v-tab value="three">排行榜</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <RecommendView></RecommendView>
        </v-window-item>

        <v-window-item value="two" width="100%">
          <SingerList></SingerList>
        </v-window-item>

        <v-window-item value="three">
          排行榜页
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>