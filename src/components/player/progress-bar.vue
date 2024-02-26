<script setup>
const props = defineProps({
  progress:{
    // progress: 从0-1
    type: Number,
    default: 0
  }
})

// 左侧进度条偏移量
const offset = ref(0)
const rootRef = ref(null)
const progressRef = ref(null)

watch(() => props.progress, (newProgress) => {
  // 获取整个进度条的宽度
  const barWidth = rootRef.value.clientWidth
  offset.value = barWidth * newProgress
})

// 进度条样式变化
const progressStyle = computed(() => {
  // console.log(`width:${offset.value}px`)
  return `width:${offset.value}px`
})
// 按钮样式变化
const btnStyle = computed(() => {
  return `transform:translate3d(${offset.value}px,0,0)`
})

//按钮拖动功能
const touch = reactive({})
//  派发事件
const emit = defineEmits(['progress-changing', 'progress-changed'])

const onTouchstart = (e) => {
  touch.x1 = e.touches[0].pageX
  touch.beginWidth = progressRef.value.clientWidth
}
const onTouchmove = (e) => {
  const delta = e.touches[0].pageX - touch.x1  // 偏移x轴
  const tempWidth = touch.beginWidth + delta
  const barWidth = rootRef.value.clientWidth
  const progress = Math.min(1, Math.max(tempWidth / barWidth, 0)) //进度限定在0-1
  offset.value = barWidth * progress
  emit('progress-changing', progress)
}
const onTouchend = (e) => {
  const barWidth = rootRef.value.clientWidth
  const progress = progressRef.value.clientWidth / barWidth
  emit('progress-changed', progress)
}
const onClick = (e) => {
  const rect = rootRef.value.getBoundingClientRect()  // 进度条在视口中位置
  const offsetWidth = e.pageX - rect.left
  const barWidth = rootRef.value.clientWidth
  const progress = offsetWidth/barWidth
  emit('progress-changed', progress)
}
</script>

<template>
  <div 
    ref="rootRef"
    class="tw-h-8"
    @click="onClick"
  >
    <!-- bar-inner：整个进度条 -->
    <div 
      ref="bar-inner"
      class="tw-relative tw-top-[13px] tw-h-[3px] tw-bg-[rgba(255,255,255,0.3)] tw-rounded-lg"
    >
      <!-- progress：左侧进度条 -->
      <div 
        ref="progressRef"
        class=" tw-absolute tw-h-full tw-bg-white tw-rounded-lg"
        :style="progressStyle"
      ></div>
      <div 
        ref="progress-btn-wrapper"
        class=" tw-absolute tw-leading-4 -tw-left-2 -tw-top-[5px] tw-text-6xl"
        :style="btnStyle"
        @touchstart.prevent="onTouchstart"
        @touchmove.prevent="onTouchmove"
        @touchend.prevent="onTouchend"
      >
      ·
      </div>
    </div>
  </div>
</template>