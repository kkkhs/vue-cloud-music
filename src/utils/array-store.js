import storage from 'good-storage'

// 插入数组
function inertArray(arr, val, compare, maxLen){
  //判断val是否在arr中
  const index = arr.findIndex(compare)
  if(index > -1){
    return
  }
  // 插入到数组的前面
  arr.unshift(val)

  // 判断是否超过最大长度
  if(maxLen && arr.length > maxLen){
    arr.pop() //先进先出
  }
}

// 从数组移除
function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if(index > -1){
    arr.splice(index, 1)
  }
}

// 保存到localStorage
export function save(item, key, compare, maxLen){
  const items = storage.get(key, [])
  inertArray(items, item, compare, maxLen)
  storage.set(key, items)
  return items
}

// 从localStorage移除
export function remove(key, compare){
  const items = storage.get(key, [])
  deleteFromArray(items, compare)
  storage.set(key, items)
  return items
}

// 初始加载的数据
export function load(key){
  return storage.get(key, [])
}

// 清空
export function clear(key){
  storage.remove(key)
  return []
}