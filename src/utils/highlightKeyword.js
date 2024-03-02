//获取需要标红的文字
function getKeyWords(contentText, keyword) {
  let keywordArray = Array.isArray(keyword) ? keyword : [keyword]; // 如果关键字是数组，则直接使用，否则将其放入一个数组中
  let wordsArray = [];
  for(let key of keywordArray){
    if(typeof key === 'string') {
      if(contentText.includes(key)){
        wordsArray.push(key)
      }
    } else if (typeof key === 'number' || typeof key === 'boolean') {
      let keyStr = key.toString();
      if(contentText.includes(keyStr)){
        wordsArray.push(keyStr);
      }
    }
  }
  return wordsArray;
}

//将文字高亮
export function brightenKeyword(contentText, keyword) {
  let wordsArray = getKeyWords(contentText, keyword);
  let res = contentText;  //res的初始值是不带任何红色格式的
  //遍历相同字数组，
  for(let word of wordsArray){
    const Reg = new RegExp(word, 'i');
    //替换每一个相同字
    res = res.replace(Reg, `<span style="color: #0284c7;">${word}</span>`);
  }
  return res;//此时的res里已经将需要标红的字体带上了格式（<span style="color:red"></span>）
}
