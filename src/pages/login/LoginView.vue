<script setup>
import { useAsync } from '@/use/useAsync';
import createToast from "@/components/toast/create-toast"
import { fetchAnonimousData, fetchCaptchaData } from '@/api/login'

const phoneNumberPattern = /^1[3456789]\d{9}$/;
const phone = ref('')
const captcha = ref('')
const disabled = ref(false)
const buttonText = ref('获取验证码')
const countdown =  ref(60)
const router = useRouter()

// 正则匹配是否为大陆手机号
function isPhoneNumber(phoneNumber) {
  return phoneNumberPattern.test(phoneNumber);
}

// 发送验证码
const sentCaptcha = () => {
   // 模拟发送验证码逻辑
   console.log('发送验证码');

  disabled.value = true;
  buttonText.value = `${countdown.value}`

  let timer = setInterval(() => {
  countdown.value --
  buttonText.value = `${countdown.value}`
    if (countdown.value === 0) {

      clearInterval(timer);

      disabled.value = false;
      countdown.value = 60;
      buttonText.value = '获取验证码';
    }
  }, 1000);
}

// 登陆(需要先验证)
const login = () => {
  if(!isPhoneNumber(phone.value)){
    createToast('请输入正确的手机号')
  }else{
    console.log('login')
  }
}

// 游客登陆
const anonimousLogin = () => {
  useAsync(() => fetchAnonimousData().then(() => {
    router.push({
      path: '/'
    })
  }), {})
}

</script>

<template>
  <div class="tw-h-full tw-w-full tw-bg-gradient-to-b tw-from-red-200 tw-to-red-300 tw-via-white">
    <div class="login-container tw-flex tw-flex-col tw-w-4/5 tw-absolute tw-top-1/3 tw-left-1/2 tw--translate-x-1/2">
      <form 
        class=" tw-flex tw-flex-col tw-justify-center tw-items-center tw-w-full tw-mb-2"
        @submit.prevent="login"
      >
        <div 
          class="form-group tw-flex tw-items-center tw-mb-4 tw-bg-white tw-h-12 tw-rounded-lg tw-w-full tw-border-solid tw-border-[1px] tw-border-red-200"
        >
          <v-icon class="tw-text-red-700 tw-ml-1 tw-mr-1" icon="mdi-cellphone"></v-icon>
          <input
            class="tw-outline-none tw-text-lg "
            type="text" id="phone" v-model="phone" placeholder="输入手机号" required
          >
        </div>
        <div class="form-group tw-h-12 tw-w-full tw-flex tw-justify-between">
          <input
            class=" tw-bg-white tw-border-solid tw-border-[1px] tw-border-red-200 tw-min-w-0 tw-text-lg tw-outline-none tw-h-full tw-rounded-lg tw-mr-2 tw-pl-2"
            type="text" id="captcha" v-model="captcha" placeholder="输入验证码" required
          >
          <button 
            :disabled="disabled"
            class="tw-rounded-lg tw-bg-red-500 tw-text-white tw-h-full tw-w-40"
            :class="{'tw-opacity-40 tw-text-xl': disabled}"
            @click="sentCaptcha"
          >{{ buttonText }}</button>
        </div>
        <button 
          class="tw-rounded-2xl tw-bg-red-500 tw-w-2/3 tw-h-10 tw-text-white tw-mt-5"
          type="submit"
        >
          <span class="tw-text-white">登陆</span>
        </button>
      </form>

      <button
        class=" tw-text-opacity-80 tw-text-black"
        @click="anonimousLogin"
      >
        游客登入>
      </button>
    </div>
  </div>
  
</template>

