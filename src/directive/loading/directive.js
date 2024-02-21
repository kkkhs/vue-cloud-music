/*  
  vue自定义指令
*/

import { createApp } from "vue"
import Loading from './loading.vue'

const relativeCls = 'g-relative'

const loadingDirective = {
  mounted(el, binding) {
    const app = createApp(Loading)  //app挂载到Loading
    const instance = app.mount(document.createElement('div')) //创建html-div实例
    el.instance = instance //保留instance

    const title = binding.arg //使用动态参数实现title传入loading页面
    if(typeof title !== 'undefined'){
      instance.setTitle(title)
    }
    
    if(binding.value){ // loading=true 追加
      append(el)
    }
  },
  updated(el, binding) {
    const title = binding.arg //实现title传入loading页面
    if(typeof title !== 'undefined'){
      el.instance.setTitle(title)
    }
    if(binding.value != binding.oldValue) {
      binding.value ? append(el) : remove(el)
    }
  },
}

function append(el){  // 追加函数
  const style = getComputedStyle(el)
  if (['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) {
    el.classList.add(relativeCls) //添加relative类(方便loading居中)
  }
  el.appendChild(el.instance.$el) // $el参数指向应用指令的dom
}

function remove(el){    //追加函数
    el.classList.remove(relativeCls)  //移除relative类
    el.removeChild(el.instance.$el) 
}

export default loadingDirective