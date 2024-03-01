import axios from "./base";

// 热搜
export const fetchSearchHotData = () => {
  return axios.get('search/hot/detail')
}
// 搜索建议
export const fetchSearchSuggestData = (keywords) => {
  return axios.get('/search/suggest', { params: { keywords, type:'mobile' }})
}