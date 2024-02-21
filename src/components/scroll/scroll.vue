<script setup>
import { ref } from 'vue';
import useScroll from './use-scroll';

// 拓展的点击功能
const props = defineProps({
  click: {
    type: Boolean,
    default: true
  }
})

const rootRef = ref(null)
useScroll(rootRef, props)
</script>

<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>