<script setup lang="ts">
import { onMounted } from 'vue';

// get captcha
const getCaptcha = () => {
  console.log('get captcha');
};

onMounted(() => {
  getCaptcha();
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
            <a-input :placeholder="$t('username')" />
          </div>
          <div>
            <a-input :placeholder="$t('password')" type="password" />
          </div>
          <!--          验证码-->
          <div class="flex items-center">
            <a-input :placeholder="$t('captcha')" />
            <img alt="" src="../../assets/vue.svg" />
          </div>
        </div>

        <div>
          <a-button block type="primary">{{ $t('sign') }}</a-button>
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
