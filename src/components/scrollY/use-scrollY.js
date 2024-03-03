import BScroll from "better-scroll";
import ObserveDOM from "@better-scroll/observe-dom";
import { onMounted, onUnmounted } from "vue";

BScroll.use(ObserveDOM)

export default function useScrollY(wrapperRef, options, emit) {
  const scroll = ref(null)

  onMounted(() => {
    const scrollVal = scroll.value = new BScroll(wrapperRef.value, {
      observeDOM: true,
      scrollX: true,
      scrollY: false,
      ...options
    })

    // 滚动配置probeType
    if (options.probeType > 0) {
      scrollVal.on('scroll', (pos) => {
        emit('scroll', pos) //派发位置信息
      })
    }
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })

  // onActivated(() => {
  //   console.log(scroll.value)
  //   scroll.value.enable()
  //   scroll.value.refresh()
  // })

  // onDeactivated(() => {
  //   scroll.value.disable()
  // })

  return scroll
}