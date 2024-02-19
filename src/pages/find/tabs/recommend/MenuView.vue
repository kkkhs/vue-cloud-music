<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
const menus = [
  {
    id: 1,
    icon: 'mdi-calendar-heart',
    name: '每日推荐'
  },{
    id: 2,
    icon: 'mdi-radio',
    name: '私人漫游'
  },{
    id: 3,
    icon: 'mdi-music-box-multiple',
    name: '歌单',
    Fn: () => { router.push({ name: 'recommendedListPage' })}
  },{
    id: 4,
    icon: 'mdi-list-box',
    name: '排行榜'
  },{
    id: 5,
    icon: 'mdi-book-play',
    name: '有声书'
  }
]
</script>

<template>
  <div class="tw-flex tw-h-16 tw-flex-nowrap tw-overflow-x-hiden tw-mb-1 tw-mt-2">
    <div 
      v-for="item in menus"
      :key="item.id"
      class="tw-flex tw-flex-col tw-items-center tw-min-w-10 tw-mx-4"
      @click="item.Fn"
    >
        <v-icon size="35" class="h-20 w-50" color="red-darken-1">{{ item.icon }}</v-icon>
      <span class="tw-text-[12px] tw-w-14 tw-text-center">{{ item.name }}</span>
    </div>
  </div>
</template>