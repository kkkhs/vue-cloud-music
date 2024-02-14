import { ref, watch, nextTick } from 'vue'
export default function useFixed(props){
  const groupRef = ref(null)
  const listHeights = ref([])

  watch(() => props.data, async() => {
    await nextTick() 
    calculate()
  })

  function calculate(){
    const list = groupRef.value.children //获取每个组的dom高度
    const listHeightsVal = listHeights.value
    let height = 0

    listHeightsVal.length = 0  //清空初始化
    listHeightsVal.push(height)

    for(let i = 0; i < list.length; i ++){
      height += list[i].clientHeight //累加高度 clientHeight
      listHeightsVal.push(height)
    }
  }

  return {
    groupRef
  }
}