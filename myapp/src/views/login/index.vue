<template>
  <div class="login">
    <div class="container">
      <div class="login-card">
        <p class="login-title">Energy Monitoring System</p>

        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="auto"
          @submit.prevent
        >
          <el-form-item label="User Name" prop="user">
            <el-input
              v-model="ruleForm.user"
              @keyup.enter="submitForm"
            />
          </el-form-item>

          <el-form-item label="Password" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              @keyup.enter="submitForm"
            />
          </el-form-item>

          <el-form-item>
            <el-button
              type="success"
              class="login-button"
              native-type="button"
              @click="submitForm"
            >
              Login
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

import { authApi, getCurrentUser } from '../../api';
import { useAuthStore } from '../../stores/auth';
import { isViewer } from '../../utils/permission';

/* ----------------------
 * 表单状态（❗之前丢失的部分）
 * ---------------------- */
const ruleFormRef = ref(null);

const ruleForm = reactive({
  user: '',
  password: ''
});

const rules = {
  user: [
    { required: true, message: 'Please input User name', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' }
  ]
};

/* ----------------------
 * 登录逻辑
 * ---------------------- */
const router = useRouter();
const store = useAuthStore();

async function submitForm() {
  if (!ruleFormRef.value) return;

  const valid = await ruleFormRef.value.validate().catch(() => false);
  if (!valid) return;

  const res = await authApi.login(ruleForm.user, ruleForm.password);

  if (res?.access_token?.length > 0) {
    store.setAuthFromLogin(res);

    const user = store.user;
    const target = isViewer(user)
      ? '/tv/dashboard?fullscreen=1'
      : '/app/dashboard';

    await router.replace(target);
  }else {
    alert('user name or password was wrong ...');
  }
}
</script>
