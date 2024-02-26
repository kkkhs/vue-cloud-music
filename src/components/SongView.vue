<script setup>
const { song, index } = defineProps({
  song: {
    type: Object, // 接收的参数类型
    default: {}, //默认值
  },
  index: {
    type: Number,
    default: 0
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
    class="tw-flex tw-items-center tw-my-4"
    @click="selectItem(song, index - 1)"
  >
    <div
      class="tw-w-12 tw-opacity-70 tw-text-center tw-text-lg"
    >{{ index }}</div>
    <div 
      class="tw-flex-1"
    >
      <div>{{ song.name }}</div>
      <div>
      <span v-if="song.fee == 1" class=" tw-text-red-400 tw-border-solid tw-border tw-text-xs tw-rounded tw-px-0.5 tw-mr-1">VIP</span>
      <span
        class="tw-text-sm tw-opacity-70"  
      >{{ song.ar[0].name }} - {{ song.al.name }}</span>
      </div>
      <div 
        v-if="song.awardName"
        class="tw-text-orange-600 tw-bg-orange-100 tw-text-[11px] tw-w-fit tw-max-w-[263px] tw-px-1 tw-leading-5 tw-rounded-sm tw-mt-1 tw-text-nowrap tw-overflow-hidden"
      >{{ song.awardName }}</div>
    </div>
    <div class="tw-opacity-35">
      <v-icon icon="mdi-play" class="tw-text-lg"></v-icon>
      <v-icon icon="mdi-dots-vertical" class="tw-mr-3 tw-ml-3"></v-icon>
    </div>
  </div>
</template>