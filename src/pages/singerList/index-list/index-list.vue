<script setup>
import { defineProps } from 'vue'
import useFixed from './use-fixed'
import useFixed from './use-fixed';
const { singers, pending } = defineProps({
  singers: {
    type: Array, // 接收的参数类型
    default: [], //默认值
  },
  pending: {
    type: Boolean, // 接收的参数类型
    default: false, //默认值
  },
})

const { groupRef, onScroll} = useFixed(props)
</script>

<template>
  <div id="scroll-target">
    <div 
      v-for="group in singers"
      :key="group.title"
    >
    <h2
      class="tw-bg-slate-200 tw-text-lg tw-leading-8 tw-pl-3 tw-mb-3 tw-font-semibold"
    >{{ group.title }}</h2>
    <div
      v-for="item in group.list"
      :key="item.id"
      class="tw-flex tw-justify-start tw-pl-6 tw-mb-3 tw-items-center"
    >
      <img 
        :src="item.picUrl" 
        class="tw-bg-cover tw-object-cover tw-h-14 tw-w-14 tw-rounded-full">
      <span 
       class="tw-flex-1 tw-py-0 tw-ml-3 tw-text-sm">{{ item.name }}</span>
    </div>

    </div>
  </div>
</template>



