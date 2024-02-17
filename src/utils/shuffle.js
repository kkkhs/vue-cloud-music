// 随机打乱歌单功能(洗牌算法)

export function shuffle(source){
  // console.log(source.value)
  const arr = source.slice()
  for(let i = 0; i < arr.length; i ++){
    const j = getRandomInt(i)
    swap(arr, i, j)
  }
  return arr
}

function getRandomInt(max){
  // floor向下取整
  return Math.floor(Math.random() * (max + 1))
}

function swap(arr, i, j){
  const t = arr[i]
  arr[i] = arr[j]
  arr[j] = t
}