<script setup>
import pinyin from '@/utils/vue-py'
import IndexList from './index-list/index-list.vue'
import { fetchSingerListData } from '@/api/singerList.js';
import { useAsync } from '@/use/useAsync';
const { data, pending } = useAsync(() => fetchSingerListData(100).then((v) => {
  const singers = v.data.artists
  // 构造歌手 Map 数据结构
  const HOT_NAME = '热'
  const singerMap = {
    hot: {
      title: HOT_NAME,
      list: singers.slice(0,10)
    }
  }

  singers.forEach((item) =>{
    // 获取歌手名拼音的首字母
    const p = pinyin.chineseToPinYin(item.name).toUpperCase().slice(0,1)
    if (!p || !p.length) {
      return
    }
    // 获取歌手名拼音的首字母
    const key = p
    if (key) {
      if (!singerMap[key]) {
          singerMap[key] = {
              title: key,
              list: []
          }
      }
      // 每个字母下面会有多名歌手
      singerMap[key].list.push(item)
    }
  })

  // 热门歌手
  const hot = []
  // 字母歌手
  const letter = []

  // 遍历处理 singerMap，让结果有序
  for (const key in singerMap) {
    const item = singerMap[key]
    if (item.title.match(/[a-zA-Z]/)) {
      letter.push(item)
    } else if (item.title === HOT_NAME) {
      hot.push(item)
    }
  }

  // 按字母顺序排序
  letter.sort((a, b) => {
    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
  })

  return hot.concat(letter) 
})
, [])

const loadingText = '正在载入...'
</script>

<template>
  <div class="tw-fixed tw-w-full tw-left-0 tw-top-24 tw-bottom-14" v-loading:[loadingText]="pending">
    <IndexList :singers="data"></IndexList>
  </div>
</template>