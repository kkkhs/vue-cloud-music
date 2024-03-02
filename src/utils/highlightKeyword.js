//获取需要标红的文字
function getKeyWords(contentText, keyword) {
  let keywordArray = keyword.split('');
  let wordsArray = [];
  for(let key of keywordArray){
    if(contentText.includes(key)){
      wordsArray.push(key)
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
