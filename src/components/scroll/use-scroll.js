import BScroll from "better-scroll";
import ObserveDOM from "@better-scroll/observe-dom";
import { onMounted, onUnmounted } from "vue";

BScroll.use(ObserveDOM) //检测dom变化自动刷新

export default function useScroll(wrapperRef, options){
  const scroll = ref(null)

  onMounted(() => {
    scroll.value = new BScroll(wrapperRef.value, {
      observeDOM: true,
      ...options  //扩展运算符
    })
  })

  onUnmounted(() => {
    scroll.value.destroyed()
  })
}