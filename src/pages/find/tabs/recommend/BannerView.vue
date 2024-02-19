<script setup>
import { fetchBannerData } from '@/api/banner.js'
import { useAsync } from '@/use/useAsync.js'
import slider from '@/components/slider/slider.vue';

const { data, pending } = useAsync(
  () => fetchBannerData(2).then((v) => v.data.banners.slice(0,9)), [])

</script>

<template>
  <div @touchstart.stop class="slider-wrapper tw-rounded-2xl">
    <div class="slider-content">
      <slider v-if="data.length" :sliders="data"></slider>
    </div>
  </div>
</template>

<style scoped>
.slider-wrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 40%;
  overflow: hidden;
  .slider-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>