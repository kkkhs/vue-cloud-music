import axios from "./base";

export const fetchSongDetailData = (ids) => {
  return axios.get('song/detail', { params: { ids} })
}