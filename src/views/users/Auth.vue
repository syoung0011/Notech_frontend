<script setup lang="ts">
import {ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {UserStore} from '@/stores/users'
import {ElMessage, type FormInstance, type FormItemRule} from "element-plus";

const router = useRouter()
const route = useRoute()
const store = UserStore()
const activeForm = ref('login')
const form = store.form
const loginFormRef = ref<FormInstance | null>(null)
const registerFormRef = ref<FormInstance | null>(null)
const loading = ref(false)

const checkPassword = (_rule: FormItemRule, value: string, callback: (error?: Error) => void) => {
  if (value === form.password) {
    callback()
  } else {
    const error = new Error('两次输入密码不一致')
    callback(error)
  }
}
const loginRules = {
  username: [
    {required: true, message: '账号不能为空'},
    {min: 1, max: 8, message: '账号1-8位字符'}
  ],
  password: [
    {required: true, message: '密码不能为空'},
    {min: 3, max: 32, message: '密码3-32位字符'}
  ]
}
const registerRules = {
  ...loginRules,
  confirmPassword: [
    {required: true, message: '请确认密码'},
    {validator: checkPassword}
  ],
  agreement: [
    {
      validator: (_rule: FormItemRule, value: boolean, callback: (error?: Error) => void) => {
        if (!value) {
          const error = new Error('请同意用户协议')
          return callback(error)
        }
        return callback()
      },
    },
  ],
}
const onSubmit = () => {
  if(activeForm.value === 'login'){
    loginFormRef.value?.validate(async (valid) => {
      if (valid) {
        loading.value = true
        if (activeForm.value === 'login') {
          const ok = await store.login(form.username, form.password)
          const target = (route.query.redirect as string) || '/dashboard'
          if (ok){
            ElMessage.success('登录成功')
            router.push(target)
          }
          else
          {
            ElMessage.error('登录失败')
          }
        }
        loading.value = false
      }
    })
  }
  else{
    registerFormRef.value?.validate(async (valid) => {
      if (valid) {
        loading.value = true
        const ok = await store.register(form.username, form.password)
        if (ok){
          ElMessage.success('注册成功')
          activeForm.value = 'login'
        }
        else
        {
          ElMessage.error('注册失败')
        }
        loading.value = false
      }
    })
  }
}
const onClick = () => {
  ElMessage.warning('请联系管理员重置密码')
}
</script>

<template>
  <div class="container">
    <div v-if="activeForm === 'login'" class="box">
      <h2 class="title">登录</h2>
      <el-form :model="form" :rules="loginRules" ref="loginFormRef" @keyup.enter="onSubmit" label-width="70px"
               label-position="right">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" clearable/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" clearable show-password placeholder="请输入密码"/>
        </el-form-item>
        <el-button type="primary" class="btn" :loading="loading" @click="onSubmit">登录</el-button>
        <div class="tip">
          没有账号？
          <el-link type="primary" @click="activeForm = 'register'">去注册</el-link>
          <div style="text-align: right">
            <el-link @click="onClick">忘记密码</el-link>
          </div>
        </div>
      </el-form>
    </div>
    <div v-else class="box">
      <h2 class="title">注册</h2>
      <el-form ref="registerFormRef" :model="form" :rules="registerRules" @keyup.enter="onSubmit" label-width="90px"
               label-position="right">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" clearable placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" show-password clearable placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" show-password clearable placeholder="再次输入密码"/>
        </el-form-item>
        <el-form-item prop="agreement">
          <el-checkbox v-model="form.agreement">
            我已阅读并同意《用户协议》
          </el-checkbox>
        </el-form-item>
        <el-button type="primary" class="btn" :loading="loading" @click="onSubmit">注册</el-button>
        <div class="tip">
          已有账号？
          <el-link type="primary" @click="activeForm = 'login'">去登录</el-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style scoped>

</style>