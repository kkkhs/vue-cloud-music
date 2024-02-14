import axios from "./base";

export const fetchRecommendedPlayListData = (limit = 30) => {
  return axios.get('personalized', { params: { limit } },)
}