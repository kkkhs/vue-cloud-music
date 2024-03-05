/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHashHistory } from 'vue-router'
import TabsView from '@/components/TabsView.vue'
import FindView from '@/pages/find/FindView.vue'
import PodcastView from '@/pages/podcast/PodcastView.vue'
import MyView from '@/pages/my/MyView.vue'
import FollowView from '@/pages/follow/FollowView.vue'
import CommunityView from '@/pages/community/CommunityView.vue'

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/find',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login/LoginView.vue')
    },
    {
      path: '/tabs',
      name: 'tabs',
      meta: { requiresAuth: true }, // 添加 meta 字段表示该页面需要登录认证，
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
      component: () => import('@/components/RecommendedListPage/RecommendedListPage.vue')
    },{
      path: '/singerList',
      name: 'singerList',
      component: () => import('@/pages/find/tabs/singerList/singerList.vue')
    },{
      path: '/artist/:id',
      name: 'artist',
      component: () => import('@/pages/find/tabs/singerList/singerView/SingerView.vue')
    },{
      path: '/playlist/detail/:id',
      name: 'playlistDetail',
      component: () => import('@/components/playlistDetail/PlaylistDetailPage.vue')
    },{
      path: '/search',
      name: 'search',
      component: () => import('@/components/search/search.vue')
    },{
      path: '/playHistory',
      name: 'playHistory',
      component: () => import('@/components/player/PlayHistory.vue')
    },{
      path: '/myFavorites',
      name: 'myFavorites',
      component: () => import('@/pages/my/MyFavorites.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  // 检查页面是否需要登录认证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 如果用户未登录，则跳转到登录页
    if (!isLoggedIn()) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

// 模拟检查用户是否已经登录的函数
function isLoggedIn() {
  // 这里可以根据实际情况检查用户的登录状态，例如检查 localStorage 中是否有登录信息等
  return checkCookie(); // 返回 true 表示用户已经登录
}

// 检查页面的 cookie
function checkCookie() {
  // 获取当前页面的所有 cookie
  const cookies = document.cookie;
  
  if (!cookies) {
    return false;
  }
  
  return true;
}

export default router
