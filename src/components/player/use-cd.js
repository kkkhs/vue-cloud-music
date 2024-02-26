import { usePlayStateStore } from "@/store/playState";
import { computed, watch } from "vue";

export default function useCd(){
  const playState = usePlayStateStore()
  const playing = computed(() => playState.state.playing)
  const cdWrapperRef = ref(null)
  const cdRef = ref(null)

  const cdCls = computed(() => {
    return playing.value
  })

  watch(playing, (np) => {
    if(!np){ // 未播放
      syncTransform(cdWrapperRef.value, cdRef.value)  //同步父子组件旋转角度
    }
  })

  function syncTransform(wrapper, inner){
    const wrapperTransform =  getComputedStyle(wrapper).transform // 获取外层旋转角度
    const innerTransform =  getComputedStyle(inner).transform // 内层相对外层旋转角度
    wrapper.style.transform =   // 同步外层旋转角度
      (wrapperTransform === 'none' ? 
      innerTransform 
      : innerTransform.concat(' ', wrapperTransform))  // 字符串角度叠加
  }

  return{
    cdCls,
    cdWrapperRef,
    cdRef
  }
}