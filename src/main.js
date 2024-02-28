/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import loadingDirective from '@/directive/loading/directive' //引入loading指令
import lazyPlugin from 'vue3-lazy'

const app = createApp(App)

registerPlugins(app)

app.directive('loading', loadingDirective)
app.mount('#app')
