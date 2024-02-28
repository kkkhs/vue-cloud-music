<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
  import useScroll from './use-scroll'
  import { ref } from 'vue'

  export default {
    name: 'scroll',
    props: {
      click: {
        type: Boolean,
        default: true
      },
      probeType: {
        type: Number,
        default: 0
      }
    },
    emits: ['scroll'],  //派发事件
    setup(props, { emit }) {
      const rootRef = ref(null)
      const scroll = useScroll(rootRef, props, emit)

      return {
        rootRef,
        scroll  // 暴露scroll实例
      }
    }
  }
</script>
