/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import TabsView from '@/components/TabsView.vue'
import FindView from '@/pages/find/FindView.vue'
import PodcastView from '@/pages/podcast/PodcastView.vue'
import MyView from '@/pages/my/MyView.vue'
import FollowView from '@/pages/follow/FollowView.vue'
import CommunityView from '@/pages/community/CommunityView.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/find'
    },
    {
      path: '/tabs',
      name: 'tabs',
      component: TabsView,
      children: [
        { name: 'find', path: '/find', component: FindView },
        { name: 'podcast', path: '/podcast', component: PodcastView },
        { name: 'my', path: '/my', component: MyView },
        { name: 'follow', path: '/follow', component: FollowView },
        { name: 'community', path: '/community', component: CommunityView }
      ]
    },{
      path: '/recommendedList',
      name: 'recommendedListPage',
      component: () => import('@/pages/find/RecommendedListPage/RecommendedListPage.vue')
    },{
      path: '/singerList',
      name: 'singerList',
      component: () => import('@/pages/find/tabs/singerList/singerList.vue')
    },{
      path: '/artist/:id',
      name: 'artist',
      component: () => import('@/pages/find/tabs/singerList/singerView/SingerView.vue')
    }
  ]
})

export default router
