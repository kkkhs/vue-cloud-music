<!-- 
  歌曲简略
 -->

<script setup>
import { formatArtistName } from '@/utils/formatArtistsName'
const { song, index } = defineProps({
  song: {
    type: Object, // 接收的参数类型
    default: {}, //默认值
  },
  index: {
    type: Number,
    default: 0
  },
  hasIndex: {
    type: Boolean,
    default: true
  }
})
//派发事件
const emit = defineEmits(['select'])
const selectItem = (song, index) => {
  emit('select', { song, index })
  // console.log(currentSongId.value)
}

</script>

<template>
  <div 
    class="tw-flex tw-items-center tw-mt-2 tw-mb-2 tw-pb-2  tw-border-solid tw-border-slate-200 tw-border-t-0 tw-border-l-0 tw-border-r-0 tw-border-[1px]"
    :class="{'tw-pt-1': !hasIndex}"
    @click="selectItem(song, index - 1)"
  >
    <div
      v-if="hasIndex"
      class=" tw-mr-3 tw-opacity-70 tw-text-lg tw-text-left"
    >{{ index }}</div>
    <div 
      class="tw-flex-1"
    >
      <div class="tw-line-clamp-1 tw-max-w-64">{{ song.name }}</div>
      <div class="tw-line-clamp-1 tw-max-w-60">
        <span v-if="song.fee == 1" class=" tw-text-red-400 tw-border-solid tw-border tw-text-xs tw-rounded tw-px-0.5 tw-mr-1">VIP</span>
        <span
          class="tw-text-sm tw-opacity-70 "  
        >{{ formatArtistName(song.ar) }} - {{ song.al.name }}
        </span>
      </div>
      <div 
        v-if="song.awardName"
        class="tw-text-orange-600 tw-bg-orange-100 tw-text-[11px] tw-w-fit tw-max-w-[263px] tw-px-1 tw-leading-5 tw-rounded-sm tw-mt-1 tw-text-nowrap tw-overflow-hidden"
      >{{ song.awardName }}</div>
    </div>
    <div class="tw-opacity-35">
      <v-icon icon="mdi-music-circle-outline" size="30" class="tw-text-lg"></v-icon>
      <v-icon icon="mdi-dots-vertical" class="tw-mr-2 tw-ml-3"></v-icon>
    </div>
  </div>
</template>