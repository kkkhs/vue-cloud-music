import axios from "./base";

// 游客登陆
export const fetchAnonimousData = (id) => {
  return axios.get('register/anonimous', { params: { id } },)
}

// 获取验证码
export const fetchCaptchaData = (phone) => {
  return axios.get('captcha/sent', { params: { phone } },)
}

// 登陆
export const fetchLoginData = (phone, captcha) => {
  return axios.get('login/cellphone', { params: { phone, captcha } },)
}

// 验证码校验
export const fetchCaptchaVertifyData = (phone, captcha) => {
  return axios.get('captcha/verify', { params: { phone, captcha } },)
}


