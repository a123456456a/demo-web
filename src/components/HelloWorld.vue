<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="flex items-center justify-center flex-col">
        <img class="mx-auto h-12 w-auto" src="../assets/vue.svg" alt="Workflow">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <a-input placeholder="Email address" />
          </div>
          <div>
            <a-input placeholder="Password" type="password" />
          </div>
        </div>

        <div>
          <a-button type="primary" block>
            Sign in
          </a-button>
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
  background-image: url('../assets/images/login_background.jpeg');
  background-size: 200% 200%;
  animation: bg-scroll 30s infinite linear;
}
</style>
