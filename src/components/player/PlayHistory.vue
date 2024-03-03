<script setup>

import { usePlayStateStore } from '@/store/playState.js'
import MusicList from '../MusicList.vue';
import scroll from '../scroll/scroll.vue';

const playState = usePlayStateStore()
const playHistory = computed(() => playState.state.playHistory)

const onClickLeft = () => history.back()
</script>

<template>
  <div class="tw-fixed tw-top-0 tw-bottom-0 tw-left-0 tw-right-0">
    <v-app-bar class="mx-n2" elevation="0" height="50" >
      <template v-slot:prepend>
        <v-btn icon="mdi-arrow-left" @click="onClickLeft"></v-btn>
      </template>
      <v-app-bar-title class="ml-0">最近播放</v-app-bar-title>
    </v-app-bar>
    <div class=" tw-mt-14 tw-w-full tw-pl-5 tw-h-full">
      <scroll class=" tw-h-full">
        <div class="tw-pb-14">
          <MusicList :songs="playHistory" :has-index="false"> </MusicList>
        </div>
      </scroll>
    </div>
  </div>
</template>