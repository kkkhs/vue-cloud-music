<script setup>
import { defineProps } from 'vue'
import useFixed from './use-fixed.js'
import Singer from '@/components/Singer.vue'
import { useRouter } from 'vue-router';

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

// const { groupRef } = useFixed(props)
const router = useRouter()
const gotoDetail = (id) => {
  console.log(id)
  router.push({
    name: 'artist',
    params: {
      id
    },
  })
}

</script>

<template>
  <div class="tw-overflow-scroll tw-mt-12 tw-max-h-[680px]">
    <v-lazy transition="fade-transition">
      <div>
        <div 
          v-for="group in singers"
          :key="group.title"
        >
          <h2
            class=" tw-min-h-5 tw-bg-slate-200 tw-text-lg tw-leading-8 tw-pl-4 tw-mb-3 tw-font-medium tw-rounded-2xl"
          >{{ group.title }}</h2>
          <div
            v-for="item in group.list"
            :key="item.id"
            @click="gotoDetail(item.id)"
          >
            <Singer :singer="item"></Singer>
          </div>
        </div>
      </div>
    </v-lazy>
  </div>
  
</template>



