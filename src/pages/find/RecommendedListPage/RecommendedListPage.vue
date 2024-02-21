<script setup>
import { useAsync } from '@/use/useAsync';
import {fetchRecommendedPlayListData} from '@/api/RecommendedPlayList'
import { useRouter } from 'vue-router';
import Scroll  from '@/components/scroll/scroll.vue'

const router = useRouter()
const {data, pending} = useAsync(
  () => fetchRecommendedPlayListData().then((v) => v.data.result), [])

const onClickLeft = () => history.back()
const loadingText = '正在载入...'
</script>

<template>
  <div class="tw-h-screen" v-loading:[loadingText]="pending">
    <v-app-bar class="mx-n2" elevation="0" height="50" >
      <template v-slot:prepend>
        <v-btn icon="mdi-arrow-left" @click="onClickLeft"></v-btn>
      </template>
      <v-app-bar-title class="ml-0">歌单广场</v-app-bar-title>
    </v-app-bar>
    <Scroll class="tw-h-full">
      <div class="tw-ml-5">
        <v-card 
          :loading="pending" 
          variant="flat"
        >
          <div>
            <div class="tw-mb-2 tw-mt-2">
              <span class="tw-font-semibold tw-text-xl">你的宝藏歌单</span>
            </div>
            <v-lazy transition="fade-transition">
              <v-card 
                variant="flat"
              >
                <div
                  class="tw-flex tw-flex-wrap tw-mb-12"
                >
                  <div
                    class="tw-h-50 tw-w-28 tw-flex tw-flex-col tw-mr-2 tw-justify-center tw-pb-5"
                    v-for="item in data"
                    :key="item.id"
                  >
                    <v-img 
                      lazy-src="https://picsum.photos/id/11/100/60"
                      class="tw-h-28 tw-w-28 tw-rounded-xl tw-mb-1" 
                      :src="item.picUrl"
                      cover
                    />
                    <span class="tw-h-9 tw-text-[13px]">{{ item.name }}</span>
                  </div>
                </div>
              </v-card>
            </v-lazy>
          </div>
        </v-card>
        
      </div>
    </Scroll>
    
  </div>
</template>

<style>
.g-relative{
  position: relative;
}
</style>