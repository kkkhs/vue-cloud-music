import axios from "./base";

export const fetchBannerData = (type = 0) => {
  return axios.get('banner', { params: { type } },)
}