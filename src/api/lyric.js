import axios from "./base";

// 获取歌词数据
export const fetchLyricData = (id) => {
  return axios.get('lyric', { params: { id } },)
}