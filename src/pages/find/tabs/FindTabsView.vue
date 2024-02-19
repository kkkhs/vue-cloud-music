<script setup>
import { ref } from 'vue'
import RecommendView from './recommend/RecommendView.vue'
import SingerList from './singerList/singerList.vue'
const tab = ref(null)
</script>

<template>
  <v-card
    class=" tw-mt-10"
    variant="flat"
  >
    <v-tabs
      :elevation="0"
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

        <v-window-item value="two">
          <SingerList></SingerList>
        </v-window-item>

        <v-window-item value="three">
          排行榜页
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>