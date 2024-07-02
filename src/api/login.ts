import request from '@/utils/request'
import { LoginForm } from '@/types';

// 获取验证码
export function getCaptcha() {
  return request({
    url: '/api/login/captcha',
    method: 'get'
  })
}

// 登录
export function login(params: LoginForm) {
  return request({
    url: '/api/login',
    method: 'post',
    data: params
  })
}
