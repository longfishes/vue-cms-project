<template>
  <div>
    <div style="display: flex;line-height: 60px;font-size: x-large;">
      <div style="flex: 10;text-align: center;"><span>欢迎来到比赛报名管理系统</span></div>

      <div style="flex: 1px">
        <el-dropdown>
          <span>选项&nbsp;</span><i class="el-icon-arrow-down" style="margin-right: 5px;"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="toUser">个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="logout">退 出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

    </div>


  </div>
</template>

<script>
export default {
  name: "HeaderPart",
  methods: {

    toUser() {
      this.$router.push("/self")

    },
    logout() {
      this.$confirm('是否确认退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push('/')
        sessionStorage.clear()

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });

    },
  },

  created() {
    this.$router.push("/Home")
  }

}
</script>

<style scoped>


</style>