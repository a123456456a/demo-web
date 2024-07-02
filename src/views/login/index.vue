<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { getCaptcha, login } from '@/api/login.ts';
import { LoginForm } from '@/types';

// define the svg captcha
const svgCaptcha = ref('');
// 获取验证码
const getCaptchaSvg = async () => {
  const { data } = await getCaptcha();
  svgCaptcha.value = data.data;
};
// define the login form
const loginForm = reactive<LoginForm>({
  username: '',
  password: '',
  captcha: '',
});
// 登录
const handleLogin = async () => {
  const { data } = await login(loginForm);
  console.log(data);
};

onMounted(() => {
  getCaptchaSvg();
});
</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="flex items-center justify-center flex-col">
        <img alt="Workflow" class="mx-auto h-12 w-auto" src="../../assets/vue.svg" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">{{ $t('loginTitle') }}</h2>
      </div>
      <form action="#" class="mt-8 space-y-6" method="POST">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <a-input v-model:value="loginForm.username" :placeholder="$t('username')" allow-clear size="large" />
          </div>
          <div>
            <a-input-password v-model:value="loginForm.password" :placeholder="$t('password')" size="large" />
          </div>
          <!--          验证码-->
          <div class="flex items-center space-x-1">
            <a-input v-model:value="loginForm.captcha" :placeholder="$t('captcha')" allow-clear size="large" />
            <div @click="getCaptchaSvg" v-html="svgCaptcha" />
          </div>
        </div>

        <div>
          <a-button block size="large" type="primary" @click="handleLogin">{{ $t('sign') }}</a-button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
@keyframes bg-scroll {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 100%;
  }
}

.min-h-screen {
  background-image: url('../../assets/images/login_background.jpeg');
  animation: bg-scroll 30s infinite linear;
}
</style>
