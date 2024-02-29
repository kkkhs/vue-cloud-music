<script setup>
import TopList from '@/components/TopList.vue';
import Scroll  from '@/components/scroll/scroll.vue'

</script>

<template>
  <div class="tw-fixed tw-w-full tw-left-0 tw-top-24 tw-bottom-14">
    <Scroll class=" tw-h-full">
      <TopList></TopList>
    </Scroll>
  </div>
</template>