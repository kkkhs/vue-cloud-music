import axios from "./base";

export const fetchSongUrl = (id) => {
  return axios.get('song/url', { params: { id }})
}