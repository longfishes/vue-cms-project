<template>
    <div class="loginBody">
        <div class="loginDiv">
            <div class="login-content">
                <h3 class="login-title">登录</h3>
                <el-form :model="loginForm" label-width="100px"
                         :rules="rules" ref="loginForm">
                    <el-form-item label="账号" prop="username">
                        <el-input style="width: 200px" type="text" v-model="loginForm.username"
                                  autocomplete="off" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input style="width: 200px" type="password" v-model="loginForm.password"
                                  show-password autocomplete="off" size="small" @keyup.enter.native="confirm"></el-input>
                    </el-form-item>
<!--                    <el-form-item style="padding-left: 0">-->
                    <div style="padding-left: 100px">
                      <el-button type="primary" @click="confirm" :disabled="confirm_disabled"
                                 style="width: 200px" size="small">登&nbsp;&nbsp;录</el-button>
                    </div>
                  <div style="margin-top: 20px;text-align: right;padding-right: 30px"><span>没有账号？去<a href="/register">注册</a></span>
                  </div>
<!--                    </el-form-item>-->
<!--                  <el-button @click="toRegis">注册</el-button>-->

                </el-form>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: "LoginPart",
        data(){
            return{
                confirm_disabled:false,
                loginForm:{
                    username:'',
                    password:''
                },
                rules:{
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
          toRegis(){
            this.$router.push("/register")
          },

            confirm(){
                this.confirm_disabled=true;
                this.$refs.loginForm.validate((valid) => {
                    if (valid) { //valid成功为true，失败为false
                        //去后台验证用户名密码
                        this.$axios.post('/login',this.loginForm).then(res=>res.data).then(res=>{
                            // console.log(res)
                            if(res.code === 1){
                              try {


                                sessionStorage.setItem("CurUser", JSON.stringify(res.data));

                                // localStorage.setItem('token',res.data.jwt);
                                // console.log(res.data)
                                // this.$store.commit("setMenu",res.data.type)
                                //跳转到主页
                                this.$router.replace('/index');
                                //存储
                              }catch (e) {
                                console.log(e);
                              }
                            }else{
                                this.confirm_disabled=false;
                                this.$message.error('用户名或密码有误！');
                                return false;
                            }
                        });
                    } else {
                        this.confirm_disabled = false;
                        return false;
                    }
                });

            }
        },
      // beforeMount() {
      //   console.log(location);
      // }
    }
</script>

<style scoped>
    .loginBody {
        position: absolute;
        width: 100%;
        height: 100%;
        /*background-color: #B3C0D1;*/
        background-image: url("../assets/bg2.jpg");
    }
    .loginDiv {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -200px;
        margin-left: -250px;
        width: 450px;
        height: 340px;
        background: #ffffff;
        /*background-image: url("../assets/bg.jpg");*/
        /*border-radius: 5%;*/

    }
    .login-title {
        margin: 30px 0;
        padding-left: 50px;
        text-align: left;
    }
    .login-content {
        width: 400px;
        height: 250px;
        position: absolute;
        top: 25px;
        left: 25px;
    }
</style>
