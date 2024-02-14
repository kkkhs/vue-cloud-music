/*
    处理简单的开关状态
*/

import { ref } from 'vue';

export function useToggle(initState) {
  const state = ref(initState);

  // toggle 函数用于切换布尔值的状态
  const toggle = function () {
    state.value = !state.value;
  };

  // 返回一个包含状态和切换函数的数组
  return [state, toggle];
}
