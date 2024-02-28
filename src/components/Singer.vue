<!-- 歌手简略 -->
<script setup>
const { singer } = defineProps({
  singer: {
    type: Object, // 接收的参数类型
    default: {}, //默认值
  },
})

</script>

<template>
  <div
    class="tw-flex tw-justify-start tw-pl-2 tw-mb-3 tw-items-center tw-min-h-12"
  >
  <img 
      v-lazy="singer.picUrl" 
      class="tw-bg-cover tw-object-cover tw-h-14 tw-w-14 tw-rounded-full">
    <span 
      class="tw-flex-1 tw-py-0 tw-ml-3 tw-text-sm">{{ singer.name }}</span>
  </div>
</template>