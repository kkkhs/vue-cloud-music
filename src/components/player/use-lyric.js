import { usePlayStateStore } from "@/store/playState";
import { computed, reactive, watch } from "vue";
import { useAsync } from "@/use/useAsync";
import { fetchLyricData } from "@/api/lyric";
import Lyric from "lyric-parser";
import { ref } from 'vue'

export default function useLyric({ songReady, currentTime }){
  const currentLyric = ref(null)
  const currentLineNum = ref(0)
  const pureMusicLyric = ref('')
  const playingLyric = ref('')
  const lyricScrollRef = ref(null)
  const lyricListRef = ref(null)

  const playState = usePlayStateStore()
  const currentSong = computed(() => playState.currentSong())
  const lyric = reactive({})

  watch(currentSong, (newSong) => {
    if(!newSong?.id){
      return 
    }
    //防止切歌歌词跳动:
    stopLyric() 
    currentLyric.value = null
    currentLineNum.value = 0
    pureMusicLyric.value = ''
    playingLyric.value = ''

    lyric.value = newSong.lyric
    if(lyric.value === undefined){   //  若没有缓存歌词再发送请求
      useAsync(() => fetchLyricData(newSong.id).then((v) => {
        lyric.value = v.data.lrc
        newSong.lyric = lyric.value  // 当前歌曲的歌词保存在pinia中

        currentLyric.value = new Lyric(lyric.value.lyric, handleLyric) // 使用lyric-parser库解析歌词
        const hasLyric = currentLyric.value.lines.length  //判断是否有歌词
        if(hasLyric){
          if(songReady.value) { //当歌曲准备好
            playLyric()
          }
        }else{
          playingLyric.value = pureMusicLyric.value = lyric.replace(/\[(\d{2}):(\d{2}).(\d{3})\]/g, '')
        }
        
      }), {})
    }else{  //歌词有缓存
      currentLyric.value = new Lyric(lyric.value.lyric, handleLyric) // 使用lyric-parser库解析歌词
      if(songReady.value) { //当歌曲准备好
        playLyric()
      }
    }
  })

  //歌词滚动函数
  function playLyric(){
    const currentLyricVal = currentLyric.value
    if(currentLyricVal){
      currentLyricVal.seek(currentTime.value * 1000)  //找到对应的歌词
    }
  }

  function stopLyric(){
    const currentLyricVal = currentLyric.value
    if(currentLyricVal){
      currentLyricVal.stop()  
    }
  }

  // 歌词处理函数
  function handleLyric({ lineNum, txt }){
    // console.log(txt)
    currentLineNum.value = lineNum
    playingLyric.value = txt //当前播放歌词
    const scrollComp = lyricScrollRef.value // 拿到Scroll组件实例
    const listEl = lyricListRef.value // 拿到list dom实例
    if(!listEl){
      return
    }
    if(lineNum > 7) {
      const lineEl = listEl.children[lineNum - 7]
      scrollComp.scroll.scrollToElement(lineEl, 1000)
    } else{
      scrollComp.scroll.scrollTo(0, 0, 1000)
    }
  }

  return{
    currentLyric,
    currentLineNum,
    lyricScrollRef,
    lyricListRef,
    pureMusicLyric,
    playingLyric,
    playLyric,
    stopLyric
  }
}