<script setup>
import { ref } from 'vue';
import { useAsync } from '@/use/useAsync';
import { fetchAnonimousData } from '@/api/login'

const phone = ref('')
const captcha = ref('')
const router = useRouter()

const sentCaptcha = () => {
  console.log('sentCaptcha')
}

const login = () => {
  console.log('login')
}

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
    <div class="login-container tw-flex tw-flex-col tw-w-3/5 tw-absolute tw-top-1/3 tw-left-1/2 tw--translate-x-1/2">
      <form 
        class=" tw-flex tw-flex-col tw-justify-center tw-items-center tw-w-full tw-mb-2"
      >
        <div 
          class="form-group tw-flex tw-items-center tw-my-3 tw-bg-slate-200 tw-h-12 tw-rounded-lg tw-w-full"
        >
          <v-icon class="tw-text-red-700 tw-ml-1 tw-mr-1" icon="mdi-cellphone"></v-icon>
          <input
            class="tw-outline-none tw-text-lg"
            type="text" id="phone" v-model="phone" placeholder="输入手机号" required
          >
        </div>
        <div class="form-group tw-h-12 tw-w-full tw-flex tw-justify-between">
          <input
            class=" tw-bg-slate-200 tw-min-w-0 tw-text-lg tw-outline-none tw-h-full tw-rounded-lg tw-mr-2 tw-pl-2"
            type="text" id="captcha" v-model="captcha" placeholder="输入验证码" required
          >
          <button 
            class="tw-rounded-lg tw-bg-red-500 tw-text-white tw-h-full tw-w-40"
            @click="sentCaptcha"
          >发送验证码</button>
        </div>
        <button 
          class="tw-rounded-2xl tw-bg-red-500 tw-w-full tw-h-10 tw-text-white tw-mt-3"
          @click="login"
        >
          登录
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

