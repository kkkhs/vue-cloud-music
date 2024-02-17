import axios from "./base";

export const fetchArtistDetailData = (id) => {
  return axios.get('artist/detail', { params: { id } },)
}

export const fetchArtistFollowCount = (id) => {
  return axios.get('artist/follow/count', { params: { id } },)
}

export const fetchArtistTopSong = (id) => {
  return axios.get('artist/top/song', { params: { id } },)
}

