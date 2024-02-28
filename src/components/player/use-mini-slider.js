import { usePlayStateStore } from "@/store/playState"
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

//局部注册组件
BScroll.use(Slide)

export default function useMiniSlider(){
  const sliderWrapperRef = ref(null)
  const slider = ref(null)

  const playState = usePlayStateStore()
  const fullScreen = computed(() => playState.state.fullScreen)
  const playList = computed(() => playState.state.playList)
  const currentIndex = computed(() => playState.state.currentIndex)
  
  const sliderShow = computed(() => {
    return !fullScreen.value && !!playList.value
  })

  onMounted(() => {
    let sliderVal
    watch(sliderShow, async (newSliderShow) => {
      if(newSliderShow){
        await nextTick()
        if(!sliderVal){
          sliderVal = slider.value = new BScroll(sliderWrapperRef.value, {
            click: true,
            scrollX: true,
            scrollY: false,
            momentum: false,
            bounce: false,
            probeType: 2,
            slide: {
              autoplay: false,
              loop: true
            }
          })
          sliderVal.on('slidePageChanged', (page) => {
            playState.state.currentIndex = page.pageX  // 切歌联动
          })

        }else{
          sliderVal.refresh()
        }
        sliderVal.goToPage(currentIndex.value, 0, 0)
      }
    })
    watch(currentIndex, (newIndex) => { //滚动页面
      if(sliderVal && sliderShow.value){
        sliderVal.goToPage(newIndex, 0, 0)
      }
    })
    watch(playList, async (newList) => {
      if(sliderVal && sliderShow.value && newList.length ){
        await nextTick()
        sliderVal.refresh()
      }
    })
  })
  
  onUnmounted(() => {
    if(slider.value){
      slider.value.destroy()
    }
  })

  return{
    slider,
    sliderWrapperRef
  }
}