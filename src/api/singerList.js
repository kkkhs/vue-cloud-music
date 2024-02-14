import axios from "./base";

export const fetchSingerListData = (limit = 100) => {
  return axios.get('artist/list', { params: { type : -1 ,area : -1, limit} },)
}