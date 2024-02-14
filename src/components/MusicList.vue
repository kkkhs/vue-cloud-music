<template>
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
</template>