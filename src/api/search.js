import axios from "./base";

// 热搜
export const fetchSearchHotData = () => {
  return axios.get('search/hot/detail')
}

// 搜索建议
export const fetchSearchSuggestData = (keywords) => {
  return axios.get('search/suggest', { params: { keywords, type:'mobile' }})
}

// 搜索结果
export const fetchSearchResultData = (keywords, type,limit = 30, offset = 0) => {
  console.log(type)
  return axios.get('search/', { params: { 
    keywords, 
    limit,
    offset,
    type
  }})
}