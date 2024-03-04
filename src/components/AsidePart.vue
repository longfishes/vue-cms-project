<template>

  <el-menu style="height: 100%"
           background-color="#545c64"
           text-color="#fff"
           active-text-color=""
           default-active="/Home"
           router="true">
    <el-menu-item index="/Home">
      <i class="el-icon-s-home"></i>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="/Admin" v-if="check2()">
      <i class="el-icon-s-custom"></i>
      <span>用户管理</span>
    </el-menu-item>
    <el-menu-item index="/Worker" v-if="check() || check2()">
      <i class="el-icon-trophy"></i>
      <span>比赛信息</span>
    </el-menu-item>
    <el-menu-item index="/User" v-if="!check() || check2()">
      <i class="el-icon-trophy"></i>
      <span>比赛信息</span>
    </el-menu-item>
    <el-menu-item index="/More">
      <i class="el-icon-more"></i>
      <span>更多</span>
    </el-menu-item>

  </el-menu>

</template>

<script>
export default {
  name: "AsidePart",
  methods: {
    check(){
      return JSON.parse(sessionStorage.getItem('CurUser')).type === 1;

    },
    check2(){
      return JSON.parse(sessionStorage.getItem('CurUser')).type === 3;

    },

  },

}
</script>

<style scoped>

.el-menu-item.is-active {

  background-color: rgb(231, 235, 240) !important;

}

</style>