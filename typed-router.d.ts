/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

/// <reference types="unplugin-vue-router/client" />

import type {
  // type safe route locations
  RouteLocationTypedList,
  RouteLocationResolvedTypedList,
  RouteLocationNormalizedTypedList,
  RouteLocationNormalizedLoadedTypedList,
  RouteLocationAsString,
  RouteLocationAsRelativeTypedList,
  RouteLocationAsPathTypedList,

  // helper types
  // route definitions
  RouteRecordInfo,
  ParamValue,
  ParamValueOneOrMore,
  ParamValueZeroOrMore,
  ParamValueZeroOrOne,

  // vue-router extensions
  _RouterTyped,
  RouterLinkTyped,
  RouterLinkPropsTyped,
  NavigationGuard,
  UseLinkFnTyped,

  // data fetching
  _DataLoader,
  _DefineLoaderOptions,
} from 'unplugin-vue-router/types'

declare module 'vue-router/auto/routes' {
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/community/CommunityView': RouteRecordInfo<'/community/CommunityView', '/community/CommunityView', Record<never, never>, Record<never, never>>,
    '/find/FindView': RouteRecordInfo<'/find/FindView', '/find/FindView', Record<never, never>, Record<never, never>>,
    '/find/header/HeaderView': RouteRecordInfo<'/find/header/HeaderView', '/find/header/HeaderView', Record<never, never>, Record<never, never>>,
    '/find/tabs/FindTabsView': RouteRecordInfo<'/find/tabs/FindTabsView', '/find/tabs/FindTabsView', Record<never, never>, Record<never, never>>,
    '/find/tabs/recommend/BannerView': RouteRecordInfo<'/find/tabs/recommend/BannerView', '/find/tabs/recommend/BannerView', Record<never, never>, Record<never, never>>,
    '/find/tabs/recommend/LineListView': RouteRecordInfo<'/find/tabs/recommend/LineListView', '/find/tabs/recommend/LineListView', Record<never, never>, Record<never, never>>,
    '/find/tabs/recommend/MenuView': RouteRecordInfo<'/find/tabs/recommend/MenuView', '/find/tabs/recommend/MenuView', Record<never, never>, Record<never, never>>,
    '/find/tabs/recommend/RecommendView': RouteRecordInfo<'/find/tabs/recommend/RecommendView', '/find/tabs/recommend/RecommendView', Record<never, never>, Record<never, never>>,
    '/find/tabs/singerList/index-list/index-list': RouteRecordInfo<'/find/tabs/singerList/index-list/index-list', '/find/tabs/singerList/index-list/index-list', Record<never, never>, Record<never, never>>,
    '/find/tabs/singerList/singerList': RouteRecordInfo<'/find/tabs/singerList/singerList', '/find/tabs/singerList/singerList', Record<never, never>, Record<never, never>>,
    '/find/tabs/singerList/singerView/SingerView': RouteRecordInfo<'/find/tabs/singerList/singerView/SingerView', '/find/tabs/singerList/singerView/SingerView', Record<never, never>, Record<never, never>>,
    '/find/tabs/topList/TopList': RouteRecordInfo<'/find/tabs/topList/TopList', '/find/tabs/topList/TopList', Record<never, never>, Record<never, never>>,
    '/follow/FollowView': RouteRecordInfo<'/follow/FollowView', '/follow/FollowView', Record<never, never>, Record<never, never>>,
    '/login/LoginView': RouteRecordInfo<'/login/LoginView', '/login/LoginView', Record<never, never>, Record<never, never>>,
    '/my/MyFavorites': RouteRecordInfo<'/my/MyFavorites', '/my/MyFavorites', Record<never, never>, Record<never, never>>,
    '/my/MyView': RouteRecordInfo<'/my/MyView', '/my/MyView', Record<never, never>, Record<never, never>>,
    '/podcast/PodcastView': RouteRecordInfo<'/podcast/PodcastView', '/podcast/PodcastView', Record<never, never>, Record<never, never>>,
  }
}

declare module 'vue-router/auto' {
  import type { RouteNamedMap } from 'vue-router/auto/routes'

  export type RouterTyped = _RouterTyped<RouteNamedMap>

  /**
   * Type safe version of `RouteLocationNormalized` (the type of `to` and `from` in navigation guards).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationNormalized<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationNormalizedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocationNormalizedLoaded` (the return type of `useRoute()`).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationNormalizedLoaded<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocationResolved` (the returned route of `router.resolve()`).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationResolved<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationResolvedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocation` . Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocation<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocationRaw` . Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationRaw<Name extends keyof RouteNamedMap = keyof RouteNamedMap> =
    | RouteLocationAsString<RouteNamedMap>
    | RouteLocationAsRelativeTypedList<RouteNamedMap>[Name]
    | RouteLocationAsPathTypedList<RouteNamedMap>[Name]

  /**
   * Generate a type safe params for a route location. Requires the name of the route to be passed as a generic.
   */
  export type RouteParams<Name extends keyof RouteNamedMap> = RouteNamedMap[Name]['params']
  /**
   * Generate a type safe raw params for a route location. Requires the name of the route to be passed as a generic.
   */
  export type RouteParamsRaw<Name extends keyof RouteNamedMap> = RouteNamedMap[Name]['paramsRaw']

  export function useRouter(): RouterTyped
  export function useRoute<Name extends keyof RouteNamedMap = keyof RouteNamedMap>(name?: Name): RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[Name]

  export const useLink: UseLinkFnTyped<RouteNamedMap>

  export function onBeforeRouteLeave(guard: NavigationGuard<RouteNamedMap>): void
  export function onBeforeRouteUpdate(guard: NavigationGuard<RouteNamedMap>): void

  export const RouterLink: RouterLinkTyped<RouteNamedMap>
  export const RouterLinkProps: RouterLinkPropsTyped<RouteNamedMap>

  // Experimental Data Fetching

  export function defineLoader<
    P extends Promise<any>,
    Name extends keyof RouteNamedMap = keyof RouteNamedMap,
    isLazy extends boolean = false,
  >(
    name: Name,
    loader: (route: RouteLocationNormalizedLoaded<Name>) => P,
    options?: _DefineLoaderOptions<isLazy>,
  ): _DataLoader<Awaited<P>, isLazy>
  export function defineLoader<
    P extends Promise<any>,
    isLazy extends boolean = false,
  >(
    loader: (route: RouteLocationNormalizedLoaded) => P,
    options?: _DefineLoaderOptions<isLazy>,
  ): _DataLoader<Awaited<P>, isLazy>

  export {
    _definePage as definePage,
    _HasDataLoaderMeta as HasDataLoaderMeta,
    _setupDataFetchingGuard as setupDataFetchingGuard,
    _stopDataFetchingScope as stopDataFetchingScope,
  } from 'unplugin-vue-router/runtime'
}

declare module 'vue-router' {
  import type { RouteNamedMap } from 'vue-router/auto/routes'

  export interface TypesConfig {
    beforeRouteUpdate: NavigationGuard<RouteNamedMap>
    beforeRouteLeave: NavigationGuard<RouteNamedMap>

    $route: RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[keyof RouteNamedMap]
    $router: _RouterTyped<RouteNamedMap>

    RouterLink: RouterLinkTyped<RouteNamedMap>
  }
}
