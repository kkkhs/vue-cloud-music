<script setup>
import RecommendView from './recommend/RecommendView.vue'
import SingerList from './singerList/singerList.vue'
import TopList from './topList/TopList.vue'
import { useWindowStateStore } from '@/store/windowState';

const windowState = useWindowStateStore()
// console.log(windowState.state)


</script>

<template>
  <v-card
    class=" tw-mt-10"
    variant="flat"
  >
    <v-tabs
      :elevation="0"
      color="red-lighten-2"
      v-model="windowState.state"
      class="tw-fixed tw-z-10 tw-bg-white tw-w-full"
    >
      <v-tab value="one">推荐</v-tab>
      <v-tab value="two">歌手列表</v-tab>
      <v-tab value="three">排行榜</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="windowState.state">
        <v-window-item value="one">
          <RecommendView></RecommendView>
        </v-window-item>

        <v-window-item value="two" width="100%">
          <SingerList></SingerList>
        </v-window-item>

        <v-window-item value="three">
          <TopList></TopList>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>