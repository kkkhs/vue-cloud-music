
export default function useFixed(props){
  const TITLE_HEIGHT = 32
  const groupRef = ref(null)
  const listHeights = ref([]) // 存放高度数组
  const scrollY = ref(0)
  const currentIndex = ref(0)
  const distance = ref(0) //当前滑动位置与bottom的距离

  // 获取title
  const fixedTitle = computed(() => {
    if(scrollY.value < 0){
      return ''
    }
    const currentGroup = props.singers[currentIndex.value]
    return currentGroup ? currentGroup.title : ''
  })

  const fixedStyle = computed(() => {
    const distanceVal = distance.value
    const diff = (distanceVal > 0 && distanceVal < TITLE_HEIGHT) ? distanceVal - TITLE_HEIGHT : 0
    return {
      transform: `translate3d(0, ${diff}px, 0)`
    }
  })

  // 当dom发生变化,计算height
  watch(() => props.singers, async() => {
    await nextTick() 
    calculate()
  })

  watch(scrollY, (newY) => {
    // console.log(newY)
    const listHeightsVal = listHeights.value
    // 遍历高度数组
    for(let i = 0; i < listHeightsVal.length - 1; i ++){
      const heightTop = listHeightsVal[i]
      const heightBottom = listHeightsVal[i + 1]
      // console.log(heightTop, heightBottom)
      if(newY >= heightTop && newY <= heightBottom){
        currentIndex.value = i
        distance.value = heightBottom - newY
      }
    }
  })

  function calculate(){
    const list = groupRef.value.children //获取每个组的dom高度

    const listHeightsVal = listHeights.value
    let height = 0

    listHeightsVal.length = 0  //清空初始化
    listHeightsVal.push(height)

    //遍历数组lsit
    for(let i = 0; i < list.length; i ++){
      height += list[i].clientHeight //累加高度 clientHeight
      listHeightsVal.push(height)
    }
  }

  function onScroll(pos){
    scrollY.value = -pos.y  //接收到派发的滚动高度
  }

  return {
    groupRef,
    fixedTitle,
    fixedStyle,
    currentIndex,
    onScroll
  }
}