<template>
  <div>
  <div align="right" style="padding-right: 80px;margin-top: 20px"><el-button @click="back">返回</el-button></div>
    <br/>
  <el-table
      ref="signedTable"
      :data="tableData"
      stripe="true"
      border="true"
      :header-cell-style="{background:'#ececec'}">
    <el-table-column label="已报名" align="center" width="80px">
      <i class="el-icon-success"></i>
    </el-table-column>
    <el-table-column prop="copName" label="比赛名称" width="160" align="center">
    </el-table-column>
    <el-table-column prop="info" label="简介" width="300" align="center">
    </el-table-column>
    <el-table-column prop="organizers" label="主办方" width="300" align="center">
    </el-table-column>
    <el-table-column prop="type" label="类型" width="100" align="center">
      <template slot-scope="scope">
        <el-tag
            :type="scope.row.type === 1 ? 'warning' : 'primary'"
            disable-transitions>{{ scope.row.type === 1 ? '个人赛' : '团体赛' }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="limitation" label="参赛名额/名" width="100" align="center">
    </el-table-column>
    <el-table-column prop="participated" label="已报/名" width="100" align="center">
    </el-table-column>
    <el-table-column prop="startDate" label="报名开始时间" width="135" align="center">
    </el-table-column>
    <el-table-column prop="endDate" label="报名结束时间" width="135" align="center">
    </el-table-column>
    <el-table-column prop="copStatus" label="状态" width="100" align="center">
      <template slot-scope="scope">
        <el-tag
            :type="scope.row.copStatus === 1 ? 'info' : scope.row.copStatus === 2 ? 'success' : 'danger'"
            disable-transitions>{{ scope.row.copStatus === 1 ? '未开始' : scope.row.copStatus === 2 ? '正在报名' : '已截止' }}
        </el-tag>
      </template>
    </el-table-column>


  </el-table>
  </div>
</template>

<script>
export default {
  name: "SignedForm",
  data() {

    return {
      tableData: [],
    }
  },
  methods: {
    loadGet() {
      this.$axios({
        method: 'get',
        url: '/competitions/user?username=' +
            JSON.parse(sessionStorage.getItem('CurUser')).username,
        headers: {
          'token': JSON.parse(sessionStorage.getItem('CurUser')).jwt
        }
      })
          .then(res => res.data).then(res => {
        if (res.code === 1) {
          this.tableData = res.data;

        } else {
          this.$message.error("网络错误")
        }
      })
      // console.log(this.tableData);
    },
    back(){
      this.$router.push('/Home')
    },


  },

  beforeMount() {

    this.loadGet()


  },

}
</script>

<style scoped>
.el-table {
  width: 93%;

  margin: 0 auto;
  text-align: center;
}

</style>
