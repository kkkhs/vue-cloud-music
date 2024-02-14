/*  
  vue自定义指令
*/

import { createApp } from "vue"
import Loading from './loading.vue'

const loadingDirective = {
  mounted(el, binding) {
    const app = createApp(Loading)  //app挂载到Loading
    const instance = app.mount(document.createElement('div')) //创建html-div实例
    el.instance = instance //保留instance
    
    if(binding.value){ // loading=true 追加
      append(el)
    }
  },
  updated(el, binding) {
    if(binding.value != binding.oldValue) {
      binding.value ? append(el) : remove(el)
    }
  },
}

function append(el){  // 追加函数
  el.appendChild(el.instance.$el) // $el参数指向应用指令的dom
}

function remove(el){  
  el.removeChild(el.instance.$el) 
}

export default loadingDirective