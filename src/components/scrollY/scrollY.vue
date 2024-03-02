<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
  import useScrollY from './use-scrollY'
  import { ref } from 'vue'

  export default {
    name: 'scrollY',
    props: {
      click: {
        type: Boolean,
        default: true
      },
      probeType: {
        type: Number,
        default: 0
      },
      stopPropagation: {
        type: Boolean,
        default: true
      }
    },
    emits: ['scroll'],  //派发事件
    setup(props, { emit }) {
      const rootRef = ref(null)
      const scroll = useScrollY(rootRef, props, emit)

      return {
        rootRef,
        scroll  // 暴露scroll实例
      }
    }
  }
</script>
