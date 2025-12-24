<template>
  <div class = "login">
    <div class = "container">
      <div class = "login-card">
        <p class = "login-title">Emergy Monitorng System</p> 
        <el-form
          ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                label-width="auto"
            >
                <el-form-item label="User Name" prop="user">
                    <el-input v-model="ruleForm.user">
                      <template #prefix>
                        <el-icon class="el-input__icon"><User /></el-icon>
                      </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input type="password" v-model="ruleForm.password">
                      <template #prefix>
                        <el-icon class="el-input__icon"><Lock /></el-icon>
                      </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button round type="success" class = "login-button" @click="submitForm(ruleFormRef)">
                        Login
                    </el-button>
                </el-form-item>
        </el-form>
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
      Lock,
      User,
      Histogram,
      TrendCharts,
      DataLine
    } from '@element-plus/icons-vue'
    import axios from '../../api'
    import {useRouter} from 'vue-router'

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

    function submitForm(frmLogin){
      frmLogin.validate(async valid=> {
        if(valid){
          let res = await axios.post('data/login',ruleForm);
          let {code} = res.data;
          if(code == 200){
            router.push('/home');
          }else{
            alert('user name or password was wrong ... ');
          }
        }else{
          alert('fail');
        };
      })
    }
</script>