<script setup>
import { defineProps } from 'vue'
import useFixed from './use-fixed.js'
import { useRouter } from 'vue-router';
import Scroll from '@/components/scroll/scroll.vue';
import useShortcut from './use-shortcut'

const props = defineProps({
  singers: {
    type: Array, // 接收的参数类型
    default: [], //默认值
  },
})
const router = useRouter()

// hooks
const { groupRef, fixedTitle, fixedStyle, currentIndex, onScroll } = useFixed(props)
const { shortcutList, scrollRef, onShortcutTouchMove, onShortcutTouchStart } = useShortcut(props, groupRef)

// functions
const gotoDetail = (id) => {
  router.push({
    name: 'artist',
    params: {
      id
    },
  })
}

</script>

<template>
  <Scroll 
    ref="scrollRef"
    :probeType="3"
    @scroll="onScroll"
    class=" tw-relative tw-w-full tw-h-full tw-overflow-hidden tw-px-5"
  >
    <ul ref="groupRef">
      <li 
        class="group tw-list-none"
        v-for="group in singers"
        :key="group.title"
      >
        <h2
          class="tw-min-h-5 tw-bg-slate-200 tw-text-lg tw-leading-8 tw-pl-4 tw-mb-3 tw-font-medium tw-rounded-b-2xl"
        >{{ group.title }}</h2>
        <ul
          class=" "
          v-for="item in group.list"
          :key="item.id"
          @click="gotoDetail(item.id)"
        >
          <li class="tw-list-none tw-flex tw-justify-start tw-pl-2 tw-pb-2 tw-pt-1 tw-items-center tw-h-16">
            <!-- <Singer :singer="item"></Singer> -->
            <img 
              class="tw-bg-cover tw-object-cover tw-h-14 tw-w-14 tw-rounded-full" 
              v-lazy="item.img1v1Url"
            >
            <span class="tw-flex-1 tw-flex tw-items-center tw-py-0 tw-ml-3 tw-text-sm tw-h-full tw-border-solid tw-border-t-0 tw-border-l-0 tw-border-r-0 tw-border-b-[1px] tw-border-slate-300">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div 
      v-show="fixedTitle"
      class="fixed tw-absolute tw-top-0 tw-left-0 tw-w-full"
      :style="fixedStyle"
    >
      <div 
        class="fixed-title tw-min-h-5 tw-bg-slate-200 tw-text-lg tw-leading-8 tw-pl-4 tw-mb-3 tw-font-medium tw-rounded-b-2xl tw-mx-5"
      > 
        {{ fixedTitle }}
      </div>
    </div>
    <div 
      ref="shortcut"
      @click.stop
      @touchstart.stop.prevent="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove"
      @touchend.stop.prevent="onShortcutTouchEnd"
      class="tw-absolute tw-right-1 tw-top-1/2 -tw-translate-y-1/2 tw-w-6 tw-py-5 tw-px-0 tw-rounded-lg tw-text-center tw-bg-slate-300">
        <ul>
          <li 
            class=" tw-list-none tw-p-1 tw-leading-none tw-text-opacity-50 tw-text-black tw-text-sm "
            v-for="(item, index) in shortcutList"  
            :key="item"
            :data-index="index"
            :class="{'tw-text-red-500' : currentIndex === index}"
          >
              {{ item }}
          </li>
        </ul>
      </div>
  </Scroll>
</template>



