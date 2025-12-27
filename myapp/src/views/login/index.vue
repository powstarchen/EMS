<template>
  <div class="login-box">
    <!-- /.login-logo -->
    <div class="card card-outline card-primary">
      <div class="card-header text-center">
        <a href="../../index2.html" class="h1"><b>EMA</b>EMS</a>
      </div>
      <div class="card-body">
        <p class="login-box-msg">Sign in to start your session</p>

        <form action="../../index3.html" method="post">
          <div class="input-group mb-3">
            <input type="email" class="form-control" placeholder="Email">
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-envelope"></span>
              </div>
            </div>
          </div>
          <div class="input-group mb-3">
            <input type="password" class="form-control" placeholder="Password">
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-lock"></span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-8">
              <div class="icheck-primary">
                <input type="checkbox" id="remember">
                <label for="remember">
                  Remember Me
                </label>
              </div>
            </div>
            <!-- /.col -->
            <div class="col-4">
              <button type="submit" class="btn btn-primary btn-block">Sign In</button>
            </div>
            <!-- /.col -->
          </div>
        </form>

        <p class="mb-1">
          <a href="forgot-password.html">I forgot my password</a>
        </p>
        <p class="mb-0">
          <a href="register.html" class="text-center">Register a new membership</a>
        </p>
      </div>
      <!-- /.card-body -->
    </div>
    <!-- /.card -->
  </div>
  <div class = "login">
    <div class = "container">
      <div class = "card card1">
        <i><el-icon><Monitor /></el-icon></i>
        <p>Energy Monitoring Platform</p>
      </div>
      <div class = "card card2">
        <i><el-icon><Tools /></el-icon></i>
        <p>Energy Monitoring Platform</p>
      </div>
      <div class = "login-card">
        <p class = "login-title">Emergy Monitorng Sysytem</p> 
        <el-form
          ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                label-width="auto"
            >
                <el-form-item label="User Name" prop="user">
                    <el-input v-model="ruleForm.user" />
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input type="password" v-model="ruleForm.password" />
                </el-form-item>
                <el-form-item>
                    <el-button type="success" class = "login-button" @click="submitForm">
                        Login
                    </el-button>
                </el-form-item>
        </el-form>
      </div>
      <div class = "card card4">
        <i><el-icon><DataLine /></el-icon></i>
        <p>Energy Monitoring Platform</p>
      </div>
      <div class = "card card5">
        <i><el-icon><Histogram /></el-icon></i>
        <p>Energy Monitoring Platform</p>
      </div>
    </div>
  </div>
</template>

<script setup>
    import {ref, reactive} from 'vue'
    import '../../assets/css/login.css'
    import {
      Monitor,
      Tools,
      Menu,
      Grid,
      Histogram,
      TrendCharts,
      DataLine
    } from '@element-plus/icons-vue'
    //import axios from '../../api'
    import {useRouter} from 'vue-router'
    import {authApi} from '../../api'

    const router = useRouter();
    const ruleFormRef = ref();
    const ruleForm = reactive ({
      user: 'admin123',
      password:'admin123'
    });

    const rules = reactive({
      user: [
        { required: true, message: 'Please input User name', trigger: 'blur' },
        { min: 3, max: 18, message: 'Length should be 3 to 18', trigger: 'blur' },
      ],
      password: [
        { required: true, message: 'Please input password', trigger: 'blur' },
        { min: 4, max: 10, message: 'Length should be 4 to 10', trigger: 'blur' },
      ],
    });

    async function submitForm(){
      if (!ruleFormRef.value) return;

      await ruleFormRef.value.validate(async (valid) => {
        if (!valid) return;

        const res = await authApi.login(ruleForm.user, ruleForm.password);

        if (res.access_token?.length > 0) {
          router.push('/app/dashboard');
        } else {
          alert('user name or password was wrong ... ');
        }
      });
    }
</script>