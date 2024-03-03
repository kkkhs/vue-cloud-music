import BScroll from "better-scroll";
import ObserveDOM from "@better-scroll/observe-dom";
import { onMounted, onUnmounted } from "vue";

BScroll.use(ObserveDOM)

export default function useScroll(wrapperRef, options, emit) {
  const scroll = ref(null)

  onMounted(() => {
    const scrollVal = scroll.value = new BScroll(wrapperRef.value, {
      observeDOM: true,
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

  // // 使用keep-alive组件添加
  // onActivated(() => {
  //   console.log(scroll.value)
  //   scroll.value.enable()
  //   scroll.value.refresh()
  // })
  
  // // 使用keep-alive组件添加
  // onDeactivated(() => {
  //   scroll.value.disable()
  // })

  return scroll
}