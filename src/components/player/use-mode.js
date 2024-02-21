import { usePlayStateStore } from '@/store/playState.js'
import { computed } from 'vue'

const Icons = [ 'mdi-reload', 'mdi-sync', 'mdi-all-inclusive' ]

export default function useMode() {
  const playState = usePlayStateStore()
  const playMode = computed(() => playState.state.playMode)  

  const modeIcon = computed(() => {
    return Icons[playMode.value]
  })

  function changeMode () {
    const mode = (playMode.value + 1) % 3
    playState.changeMode(mode)
  }

  return {
    modeIcon,
    changeMode
  }
}