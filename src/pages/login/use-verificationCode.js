export function sendVerificationCode() {
  const disabled = ref(false)
  const buttonText = '获取验证码'
  const countdown =  ref(60)
  // 模拟发送验证码逻辑
  console.log('发送验证码');

  // 禁用按钮
  disabled.value = true;

  // 设置倒计时
  let timer = setInterval(() => {
    this.countdown--;
    this.buttonText = `${this.countdown} 秒后重新发送`;
    if (this.countdown === 0) {
      // 清除定时器
      clearInterval(timer);
      // 恢复按钮状态
      this.disabled = false;
      this.countdown = 60;
      this.buttonText = '获取验证码';
    }
  }, 1000);
}