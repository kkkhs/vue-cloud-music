<script setup>
const router = useRouter()
const gotoPlayHistoryPage = () => {
  router.push({
    name: 'playHistory'
  }) 
}

const gotoMyFavoritesPage = () => {
  router.push({
    name: 'myFavorites'
  }) 
}

</script>

<template>
  <div class="tw-fixed tw-top-0 tw-bottom-14 tw-left-0 tw-right-0 tw-bg-slate-200">
    <div
      class="header tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-h-12  tw-flex tw-justify-between"
    >
      <v-btn variant="text" size="48" class="pl-3">
        <v-icon size="24" icon="mdi-menu"></v-icon>
      </v-btn>
      <div>
        <v-btn variant="text" size="48" class="tw-pr-2">
          <v-icon size="24" icon="mdi-dots-vertical"></v-icon>
        </v-btn>
      </div>
    </div>

    <div class="tw-mt-14 tw-px-3">
      <span 
        class=" tw-text-black tw-bg-white tw-text-opacity-70 tw-px-4 tw-py-3 tw-mr-4 tw-rounded-2xl"
        @click="gotoPlayHistoryPage"  
      >
        <v-icon icon="mdi-clock-time-three"></v-icon>
        最近播放
      </span>
      <span 
        class=" tw-text-black tw-bg-white tw-text-opacity-70 tw-px-4 tw-py-3 tw-rounded-2xl"
        @click="gotoMyFavoritesPage"  
      >
        <v-icon icon="mdi-clock-time-three"></v-icon>
        我的喜欢
      </span>
    </div>
  </div>
</template>