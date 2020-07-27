<template>
  <div id="page-login" class="login-container">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="login"
      class="login-form"
          size="large"
      @keyup.enter.native="submitForm"
    >
      <div class="title-container">
        <h3 class="title">汇魂管理系统登录</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="pwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.pwd"
          :type="passwordType"
          placeholder="Password"
          name="pwd"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="submitForm"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button style="width:100%;" :loading="loginLoading" type="primary" @click="submitForm"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { power } from '@/router'
import http from '../utils/http'
@Component({
  components: {},
})
export default class Login extends Vue {
  loginForm = {
    username: 'admin0',
    pwd: '123456',
  }

  rules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
  }

  loginLoading = false

  async submitForm() {
    const valid = await (this.$refs['login'] as any).validate().catch(e => console.log(e))
    if (!valid || this.loginLoading) return
    this.loginLoading = true
    const res = await power.login(this.loginForm)
    this.loginLoading = false
    if (!res) return
    this.$router.replace('/').catch(e => console.log(e))
  }
  passwordType = 'password'
  showPwd() {
    if (this.passwordType === 'password') {
      this.passwordType = ''
    } else {
      this.passwordType = 'password'
    }
    this.$nextTick(() => {
      (this.$refs.password as HTMLElement).focus()
    })
  }

  redirect = undefined
  @Watch('$route', {
    immediate: true,
  })
  function(route) {
    this.redirect = route.query && route.query.redirect
  }
}
</script>

<style lang="less" scoped>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

@bg: #283443;
@light_gray: #fff;
@cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: @cursor)) {
  /deep/ .login-container .el-input input {
    color: @cursor;
  }
}

/* reset element-ui css */
/deep/ .el-input {
  display: inline-block;
  height: 47px;
  width: 85%;

  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: @light_gray;
    height: 47px;
    caret-color: @cursor;

    &:-webkit-autofill {
      box-shadow: 0 0 0px 1000px @bg inset !important;
      -webkit-text-fill-color: @cursor !important;
    }
  }
}

/deep/ .el-form-item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #454545;
}
</style>

<style lang="less" scoped>
@bg: #2d3a4b;
@dark_gray: #889aa4;
@light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: @bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 450px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: @dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: @light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: @dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
