import axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  baseURL: '/api',
  timeout: 10000
})

// 请求头加token
// instance.interceptors.request.use((config) => {
//   const { value: token } = useLocalStorage('token', '')
//   if (config.headers && token.value) {
//     config.headers['x-token'] = token.value
//   }
//   return config
// })

//添加拦截器
// instance.interceptors.response.use(
//   (response) => {
//     const { data: _data } = response
//     const { data, code, msg } = _data
//     if (code !== 0) {
//       showDialog({
//         message: msg
//       }).then(() => {
//         // 关闭弹窗的逻辑
//       })
//       return Promise.reject(msg)
//     }
//     return data
//   },
//   (err) => {
//     // 没有权限的情况
//     if (err.response && err.response.status === 401) {
//       showDialog({
//         message: '请登录'
//       }).then(() => {
//         // 关闭弹窗的逻辑
//       })
//     }
//   }
// )

// export const get = (url, params = {}) => {
//   return new Promise((resolve, reject) => {
//     instance.get(url, { params }).then((response) => {
//       resolve(response.data)
//     }, err => {
//       reject(err)
//     })
//   })
// }

// export const post = (url, data = {}) => {
//   return new Promise((resolve, reject) => {
//     instance.post(url, data, {
//       headers: {
//         'Content-Type': 'application/json' // 配置请求头content-type
//       }
//     }).then((response) => { // Promise兑现时的回调函数
//       resolve(response.data)
//     }, err => { // Promise拒绝时的回调函数
//       reject(err)
//     })
//   })
// }
export default instance
