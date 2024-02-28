/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import { createPinia } from 'pinia'
import router from '@/router'
import lazyPlugin from 'vue3-lazy'

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
    .use(createPinia())
    .use(lazyPlugin, {
      loading:  'https://static.infinitytab.com/infinity-official/img/IMG-LOGO@2x.png'
    })
}
