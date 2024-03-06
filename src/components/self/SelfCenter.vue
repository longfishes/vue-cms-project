<template>
  <div style="text-align: left;background-color: #f1f1f3;height: 100%;padding: 0;margin: 0;">
    <br/>
    <h1 style="font-size: 20px;padding-left: 50px">个人中心</h1>
    <br/>
    <br/>

    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username" style="width: 500px">
        <el-input v-model="form.username" disabled=""></el-input>
        <span style="font-size: 12px;color: red">&nbsp;用户名是您的唯一凭证，不支持修改</span>
      </el-form-item>
      <el-form-item label="旧密码" prop="password" style="width: 500px">
        <el-input v-model="form.password" show-password="true"
                  placeholder="**********" style="font-size: 20px"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password" style="width: 500px">
        <el-input v-model="form.newPassword" show-password="true"
                  placeholder="**********" style="font-size: 20px"></el-input>
      </el-form-item>
      <el-form-item label="组织" prop="organization" style="width: 500px">
        <el-input v-model="form.organization"></el-input>
      </el-form-item>
      <el-form-item label="个性签名" prop="signature" style="padding-right: 20px">
        <el-input
            type="textarea"
            :rows="4"
            style="font-size: 20px"
            v-model="form.signature"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">立即保存</el-button>
        <el-button @click="back()">返回</el-button>
      </el-form-item>
    </el-form>


  </div>
</template>

<script>
export default {
  name: 'SelfCenter',

  data() {
    return {
      form: {
        username: JSON.parse(sessionStorage.getItem('CurUser')).username,
        password: '',
        newPassword: '',
        organization: JSON.parse(sessionStorage.getItem('CurUser')).organization,
        signature: JSON.parse(sessionStorage.getItem('CurUser')).signature,
        id: JSON.parse(sessionStorage.getItem('CurUser')).id,
        regisTime: JSON.parse(sessionStorage.getItem('CurUser')).regisTime,
      },
      rules: {
        username: [
          {required: true, message: '用户名不能为空', trigger: 'blur'},
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // password: [
        //   { required: true, message: '请输入密码', trigger: 'blur' }
        // ],
        // oldPassword: [
        //   { required: true, message: '请输入密码', trigger: 'blur' }
        // ],
        organization: [
          {required: true, message: '组织不能为空', trigger: 'blur'}
        ],

      }
    };
  },
  methods: {
    flush() {
      sessionStorage.setItem("CurUser",JSON.stringify({
        username: this.form.username,
        organization: this.form.organization,
        signature: this.form.signature,
        password: this.form.newPassword,
        id: JSON.parse(sessionStorage.getItem('CurUser')).id,
        jwt: JSON.parse(sessionStorage.getItem('CurUser')).jwt,
        type: JSON.parse(sessionStorage.getItem('CurUser')).type,
        regisTime: JSON.parse(sessionStorage.getItem('CurUser')).regisTime,
      }));
      this.form.newPassword = ''
      this.form.password = ''
      if (this.form.signature === '')
      this.form.signature = JSON.parse(sessionStorage.getItem('CurUser')).signature
    },
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if ((this.form.password === '' && this.form.newPassword === '') && valid) {
          // this.$message.warning('不修改密码的保存!');
          this.$axios({
            method: 'put',
            url: '/user/update',
            data: {
              username: this.form.username,
              organization: this.form.organization,
              signature: this.form.signature,
              id: this.form.id,
              type: JSON.parse(sessionStorage.getItem('CurUser')).type
            },
            headers: {
              'token': JSON.parse(sessionStorage.getItem('CurUser')).jwt
            }
          }).then(res => res.data).then(res => {
            if (res.code === 1) {
              this.$message.success("保存成功");
              this.flush();
            } else {
              this.$message.error("保存失败，请检查网络");
            }
          })


        } else {
          // this.$message.warning('修改密码的保存！');
          if (this.form.newPassword === '' || !valid) this.$message.error('保存失败')
          else {
            this.$axios({
              method: 'put',
              url: '/user/update',
              data: {
                username: this.form.username,
                organization: this.form.organization,
                signature: this.form.signature,
                password: this.form.password,
                newPassword: this.form.newPassword,
                id: JSON.parse(sessionStorage.getItem('CurUser')).id,
                type: JSON.parse(sessionStorage.getItem('CurUser')).type
              },
              headers: {
                'token': JSON.parse(sessionStorage.getItem('CurUser')).jwt
              }
            }).then(res => res.data).then(res => {
              if (res.code === 1) {
                this.$message.success("保存成功");
                this.flush();
              } else {
                if (valid)
                  this.$message.error("密码错误");
                else
                  this.$message.error('组织不能为空')
              }
            })
          }
        }
      });
    },

    back() {
      this.$router.push('/home')
    }

  }
}
</script>

<style scoped>

</style>
