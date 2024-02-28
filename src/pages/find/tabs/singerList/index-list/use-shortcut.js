export default function useShortcut(props, groupRef){
  const ANCHOR_HEIGHT = 24
  const scrollRef = ref(null)

  const shortcutList = computed(() => {
    return props.singers.map((group) => {  // 原数组被“映射”成对应新数组
      return group.title
    })
  })

  const touch = {}

  function onShortcutTouchStart(e) {
    const anchorIndex = parseInt(e.target.dataset.index)  // 获取索引
    touch.y1 = e.touches[0].pageY
    touch.anchorIndex = anchorIndex

    scrollTo(anchorIndex)
  }

  function onShortcutTouchMove(e){
    touch.y2 = e.touches[0].pageY
    const delta = (touch.y2 - touch.y1) / ANCHOR_HEIGHT | 0  // 偏移索引(整数|0向下取整)
    const anchorIndex = touch.anchorIndex + delta   // 滚动后的索引

    scrollTo(anchorIndex)
  }

  // 方法封装
  function scrollTo(index){
    index = Math.max(0, Math.min(shortcutList.value.length-1, index)) // 限制区间
    const targetEl = groupRef.value.children[index]  // 获取目标元素
    const scroll = scrollRef.value.scroll
    scroll.scrollToElement(targetEl, 0)
  }

  return {
    shortcutList,
    scrollRef,
    onShortcutTouchStart,
    onShortcutTouchMove
  }
}