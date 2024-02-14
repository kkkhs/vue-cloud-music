/*
    处理异步操作的简单的 Vue 3 Composition API 自定义 Hook
*/

import { ref } from 'vue';

export function useAsync(asyncFn, initValue, immediate = true) {
  const pending = ref(false);   //表示异步操作是否进行中的布尔值
  const data = ref(initValue); //保存异步操作的结果数据
  const error = ref(null); //保存异步操作的错误信息

  const execute = function () { //一个函数，用于触发执行异步操作的逻辑
    pending.value = true;
    error.value = null;
    return asyncFn()
      .then((res) => {
        data.value = res;
        pending.value = false;
      })
      .catch((err) => {
        error.value = err;
        pending.value = false;
      });
  };

  if (immediate) {  //用于控制是否在组件创建时立即执行异步操作
    execute();
  }

  return {
    pending,
    data,
    error,
    execute,
  };
}
