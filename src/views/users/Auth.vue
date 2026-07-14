<script setup lang="ts">
import {reactive, ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {UserStore} from '@/stores/users'
import {ElMessage, type FormInstance, type FormItemRule} from "element-plus";

const router = useRouter()
const route = useRoute()
const userStore = UserStore()
const activeForm = ref('login')
const authForm = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  agreement: false,
})
const loginFormRef = ref<FormInstance | null>(null)
const registerFormRef = ref<FormInstance | null>(null)
const loading = ref(false)

const checkPassword = (_rule: FormItemRule, value: string, callback: (error?: Error) => void) => {
  if (value === authForm.password) {
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
const onSubmit = async () => {
  const isLogin = activeForm.value === 'login'
  const formRef = isLogin ? loginFormRef.value : registerFormRef.value
  await formRef?.validate();  // validate 返回 Promise，校验失败会自动中断，无需 if(!valid) return
  loading.value = true;
  // 因为拦截器已经统一处理了报错弹窗，这里直接 await 即可！
  // 如果失败，拦截器会弹窗并 reject，这里的后续代码不会执行，也不会导致页面崩溃
  try {
    if (isLogin) {
    const ret=await userStore.login(authForm.username, authForm.password);
    ElMessage.success(ret.msg)
    const target = (route.query.redirect as string) || '/dashboard';
    router.push(target);
    } else {
    const ret=await userStore.register(authForm.username, authForm.password);
    ElMessage.success(ret.msg)
    activeForm.value = 'login';
    }
  } catch (error) {
    // 拦截器已经包揽了所有弹窗提示，这里不需要再写 ElMessage
    // catch 块主要用于：重置状态、记录前端日志、或者做特殊的失败回滚
    console.error('操作失败:', error);
  } finally {
    loading.value = false;
  }
};
const onClick = () => {
  ElMessage.warning('请联系管理员重置密码')
}
</script>

<template>
  <div class="container">
    <div class="box">
      <div v-if="activeForm === 'login'">
        <h2 class="title">登录</h2>
        <el-form :model="authForm" :rules="loginRules" ref="loginFormRef" @keyup.enter="onSubmit" label-width="70px"
                 label-position="right">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="authForm.username" placeholder="请输入用户名" clearable/>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="authForm.password" clearable show-password placeholder="请输入密码"/>
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
      <div v-else>
        <h2 class="title">注册</h2>
        <el-form ref="registerFormRef" :model="authForm" :rules="registerRules" @keyup.enter="onSubmit" label-width="90px"
                 label-position="right">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="authForm.username" clearable placeholder="请输入用户名"/>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="authForm.password" show-password clearable placeholder="请输入密码"/>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="authForm.confirmPassword" show-password clearable placeholder="再次输入密码"/>
          </el-form-item>
          <el-form-item prop="agreement">
            <el-checkbox v-model="authForm.agreement">
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
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
}
.box {
  width: 380px;
  padding: 30px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 24px;
  color: #303133;
}

.btn {
  width:100%;
  margin: 0 auto;
  display: block;
}

.tip {
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
  color: #666;
}

a {
  color: #419fff;
}
</style>