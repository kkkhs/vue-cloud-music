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

const app = createApp(App)

registerPlugins(app)

app.directive('loading', loadingDirective)

// 实现不同设备的适配
const rootValue = 16     // 1rem
const rootWidth = 390    //设计宽度
const deviceWidth = document.documentElement.clientWidth  //用户宽度
document.documentElement.style.fontSize = (deviceWidth * rootValue) / rootWidth + 'px'

app.mount('#app')
