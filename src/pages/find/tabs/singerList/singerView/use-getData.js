import { useAsync } from '@/use/useAsync';
import { fetchArtistDetailData, fetchArtistFollowCount, fetchArtistTopSong } from '@/api/artistDetail'

export default function useGetData(id){
  const { data, pending } = useAsync(() => fetchArtistDetailData(id).then(v => v.data.data), {})
  const { data: followData } = useAsync(() => fetchArtistFollowCount(id).then(v => v.data.data), {})
  const { data: TopSong, pending: pending2 } = useAsync(() => fetchArtistTopSong(id).then(v => v.data.songs), [])

  if(pending && pending2){
    return {
      data, followData, TopSong
    }
  }
}