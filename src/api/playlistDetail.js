import axios from "./base";

export const fetchPlaylistDetailData = (id) => {
  return axios.get('playlist/detail', { params: { id } },)
}