<template>
  <el-container style="height: 100%; border: 1px solid #eee">

    <el-aside width="200px" style="height: 100vh; background-image: url('../assets/bg2.jpg'); background-color: #545c64">
      <AsidePart></AsidePart>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px; height: 56px">
        <HeaderPart></HeaderPart>
      </el-header>

      <el-main>
<!--        <MainPart></MainPart>-->
        <router-view></router-view>
      </el-main>
    </el-container>


  </el-container>
</template>



<script>
import AsidePart from "@/components/AsidePart";
import HeaderPart from "@/components/HeaderPart";
export default {
  name: "IndexVue",
  components: {HeaderPart, AsidePart},

};
</script>




<style>
.el-header {
  /*background-color: #ffffff;*/
  background-image: url("../assets/bg2.jpg");
  color: #333;
  line-height: 60px;
}

.el-aside {
  /*color: #333;*/
  background-image: url("../assets/bg2.jpg");
}
</style>
