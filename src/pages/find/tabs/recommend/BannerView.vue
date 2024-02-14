<script setup>
import { fetchBannerData } from '@/api/banner.js'
import { useAsync } from '@/use/useAsync.js'

const { data, pending } = useAsync(
  () => fetchBannerData(2).then((v) => v.data.banners.slice(0,9)), [])
</script>

<template>
  <v-skeleton-loader type="image" v-if="pending" class="h-25 tw-mx-auto tw-w-96 tw-mb-0.5"/>
    <div 
      v-else
      class="tw-h-auto tw-w-auto tw-rounded-3xl tw-mb-3"
    >
      <v-carousel 
        cycle 
        :continuous="false"
        :show-arrows="false"
        hide-delimiter-background
        class="h-25 tw-rounded-3xl"
        size="30"
      >
        <v-carousel-item
          v-for="banner in data"
          :key="banner.targetId"
          :src="banner.pic"
          height="139.22"
          cover
        >
        </v-carousel-item>
      </v-carousel>
    </div>
</template>