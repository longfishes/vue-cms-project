<template>
  <div class="regisBody">
    <div class="regisDiv">
      <div class="regis-content">
        <h3 class="regis-title">注册</h3>
        <el-form :model="regisForm" label-width="100px"
                 :rules="rules" ref="loginForm">
          <el-form-item label="账号" prop="username">
            <el-input style="width: 200px" type="text" v-model="regisForm.username"
                      autocomplete="off" size="small"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input style="width: 200px" type="password" v-model="regisForm.password"
                      show-password autocomplete="off" size="small" @keyup.enter.native="confirm"></el-input>
          </el-form-item>
          <el-form-item label="组织" prop="organization">
            <el-input style="width: 200px" type="text" v-model="regisForm.organization"
                      autocomplete="off" size="small"></el-input>
          </el-form-item>
          <el-form-item label="你希望成为：" prop="type">
            <el-radio v-model="regisForm.type" :label=2 border>选手</el-radio>
            <el-radio v-model="regisForm.type" :label=1 border>工作人员</el-radio>
          </el-form-item>
<!--          <el-form-item style="padding-left: 50px">-->
<!--            <el-button @click="toLogin">返回</el-button>-->
          <div style="padding-left: 100px">
            <el-button type="primary" @click="confirm" :disabled="confirm_disabled"
                       style="width: 200px" size="small">注&nbsp;&nbsp;册</el-button>
          </div>
          <div style="margin-top: 20px;text-align: right;padding-right: 30px"><span>已有账号？去<a href="/">登陆</a></span>
          </div>
<!--            <el-button type="primary" @click="confirm" :disabled="confirm_disabled">注 册</el-button>-->
<!--          </el-form-item>-->

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "RegisterPart",
  data() {
    return {
      confirm_disabled: false,
      regisForm: {
        username: '',
        password: '',
        organization: '',
        type: 2,
      },
      rules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        organization: [
          {required: true, message: '请输入组织', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    toLogin() {
      this.$router.push('/')
    },
    confirm() {

      this.confirm_disabled = true;

      this.$refs.loginForm.validate((valid) => {
        if (valid) {

          this.$axios.post(this.$httpUrl + '/register', this.regisForm).then(res => res.data).then(res => {
            if (res.code === 1) {
              this.$message.success("注册成功，正在为您跳转登陆页面...")
              this.$router.replace('/');
            } else {
              this.confirm_disabled = false;
              this.$message.error('账号已存在！');
              return false;
            }
          });
        } else {
          this.confirm_disabled = false;
          return false;
        }
      });


    },


  }
}

</script>

<style scoped>
.regisBody {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #B3C0D1;
  background-image: url("../assets/bg2.jpg");
}

.regisDiv {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -250px;
  margin-left: -250px;
  width: 450px;
  height: 460px;
  background: #fff;


}

.regis-title {
  margin: 30px 55px;
  text-align: left;
}

.regis-content {
  width: 400px;
  height: 250px;
  position: absolute;
  top: 25px;
  left: 25px;
}
</style>