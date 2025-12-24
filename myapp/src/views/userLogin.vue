<template>
    <div class = "login">
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
                    <el-button type="primary" class = "login-button" @click="submitForm(ruleFormRef)">
                        Login
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
    import {ref, reactive} from 'vue'
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

<style>
    @import '../assets/css/login.css';
</style>