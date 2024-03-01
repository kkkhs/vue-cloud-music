// 数字格式化
export function formatNumber(artists) {
  
  let result = ''
  for (let i = 0; i < artists.length; i++) {
    const name = artists[i].name
    if(i === 0 ){
      result += name
    } else{
      result += '/' + name
    }
  }
  return result
}