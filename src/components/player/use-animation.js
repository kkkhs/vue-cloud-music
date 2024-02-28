/*
  实现cd过渡动画
*/

import animations from 'create-keyframe-animation'

export default function useAnimation(cdWrapperRef) {
  let entering = false
  let leaving = false

  function enter(el, done) {
    if (leaving) {
      afterLeave()
    }
    entering = true
    const { x, y, scale } = getPosAndScale()

    const animation = {
      0: {
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      },
      100: {
        transform: 'translate3d(0, 0, 0) scale(1)'
      }
    }

    animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 400,
        easing: 'cubic-bezier(0.45, 0, 0.55, 1)'
      }
    })

    animations.runAnimation(cdWrapperRef.value, 'move', done)
  }

  function afterEnter() {
    entering = false
    animations.unregisterAnimation('move')
    cdWrapperRef.value.style.animation = ''
  }

  function leave(el, done) {
    if (entering) {
      afterEnter()  // 手动处理防止过渡时间冲突
    }
    leaving = true
    const { x, y, scale } = getPosAndScale()
    const cdWrapperEl = cdWrapperRef.value

    cdWrapperEl.style.transition = 'all .4s cubic-bezier(0.45, 0, 0.55, 1)'
    cdWrapperEl.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
    cdWrapperEl.addEventListener('transitionend', next)

    function next() {
      cdWrapperEl.removeEventListener('transitionend', next)
      done()
    }
  }

  function afterLeave() {
    leaving = false
    const cdWrapperEl = cdWrapperRef.value

    cdWrapperEl.style.transition = ''
    cdWrapperEl.style.transform = ''
  }

  function getPosAndScale(){
    const targetWidth = 48  //小唱片宽度
    const paddingLeft = 48 
    const paddingBottom = 28
    const paddingTop = 303  // 圆心距顶部距离
    const width = window.innerWidth * 0.8 // 大唱片宽度
    const x = -(window.innerWidth / 2 - paddingLeft) // x偏移量
    const y = window.innerHeight - paddingTop - paddingBottom
    const scale = targetWidth / width // 缩放

    return {
      x,
      y,
      scale
    }
  }

  return {
    cdWrapperRef,
    enter,
    afterEnter,
    leave,
    afterLeave
  }
}
