<template>
  <div class="register">
    <el-form
      ref="registerRef"
      :model="registerForm"
      :rules="registerRules"
      class="register-form"
    >
      <h3 class="title">{{ t('register.title') }}</h3>
      <el-form-item prop="username">
        <el-input
          v-model="registerForm.username"
          type="text"
          size="large"
          auto-complete="off"
          :placeholder="t('register.username.placeholder')"
        >
          <template #prefix>
            <svg-icon icon-class="user" class="el-input__icon input-icon" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="registerForm.password"
          type="password"
          size="large"
          auto-complete="off"
          :placeholder="t('register.password.placeholder')"
          @keyup.enter="handleRegister"
        >
          <template #prefix>
            <svg-icon icon-class="password" class="el-input__icon input-icon" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input
          v-model="registerForm.confirmPassword"
          type="password"
          size="large"
          auto-complete="off"
          :placeholder="t('register.confirmPassword.placeholder')"
          @keyup.enter="handleRegister"
        >
          <template #prefix>
            <svg-icon icon-class="password" class="el-input__icon input-icon" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaEnabled">
        <el-input
          v-model="registerForm.code"
          size="large"
          auto-complete="off"
          :placeholder="t('register.captcha.placeholder')"
          style="width: 63%"
          @keyup.enter="handleRegister"
        >
          <template #prefix>
            <svg-icon icon-class="validCode" class="el-input__icon input-icon" />
          </template>
        </el-input>
        <div class="register-code">
          <img :src="codeUrl" @click="getCode" class="register-code-img" />
        </div>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="large"
          type="primary"
          style="width: 100%"
          @click.prevent="handleRegister"
        >
          <span v-if="!loading">{{ t('register.button.register') }}</span>
          <span v-else>{{ t('register.button.registering') }}</span>
        </el-button>
        <div style="float: right">
          <router-link class="link-type" :to="'/login'">
            {{ t('register.button.login') }}
          </router-link>
        </div>
      </el-form-item>
    </el-form>
    <div class="el-register-footer">
      <span>{{ t('register.footer.copyright') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ElMessageBox } from "element-plus";
import { getCodeImg, register } from "@/api/login";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const router = useRouter();
const { proxy } = getCurrentInstance();

const registerForm = ref({
  username: "",
  password: "",
  confirmPassword: "",
  code: "",
  uuid: "",
});

const equalToPassword = (rule, value, callback) => {
  if (registerForm.value.password !== value) {
    callback(new Error(t('register.password.notMatch')));
  } else {
    callback();
  }
};

const registerRules = {
  username: [
    { required: true, trigger: "blur", message: t('register.username.required') },
    {
      min: 2,
      max: 20,
      message: t('register.username.length'),
      trigger: "blur",
    },
  ],
  password: [
    { required: true, trigger: "blur", message: t('register.password.required') },
    {
      min: 5,
      max: 20,
      message: t('register.password.length'),
      trigger: "blur",
    },
    {
      pattern: /^[^<>"'|\\]+$/,
      message: t('register.password.invalid'),
      trigger: "blur",
    },
  ],
  confirmPassword: [
    { required: true, trigger: "blur", message: t('register.confirmPassword.required') },
    { required: true, validator: equalToPassword, trigger: "blur" },
  ],
  code: [{ required: true, trigger: "change", message: t('register.captcha.required') }],
};

const codeUrl = ref("");
const loading = ref(false);
const captchaEnabled = ref(true);

function handleRegister() {
  proxy.$refs.registerRef.validate((valid) => {
    if (valid) {
      loading.value = true;
      register(registerForm.value)
        .then((res) => {
          const username = registerForm.value.username;
          ElMessageBox.alert(
            t('register.success.message', { username }),
            t('register.success.title'),
            {
              dangerouslyUseHTMLString: true,
              type: "success",
            },
          )
            .then(() => {
              router.push("/login");
            })
            .catch(() => {});
        })
        .catch(() => {
          loading.value = false;
          if (captchaEnabled) {
            getCode();
          }
        });
    }
  });
}

function getCode() {
  getCodeImg().then((res) => {
    captchaEnabled.value =
      res.captchaEnabled === undefined ? true : res.captchaEnabled;
    if (captchaEnabled.value) {
      codeUrl.value = "data:image/gif;base64," + res.img;
      registerForm.value.uuid = res.uuid;
    }
  });
}

getCode();
</script>

<style lang="scss" scoped>
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.register-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 40px;
    input {
      height: 40px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
  }
}
.register-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.register-code {
  width: 33%;
  height: 40px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-register-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.register-code-img {
  height: 40px;
  padding-left: 12px;
}
</style>
