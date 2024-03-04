<template>
  <div style="text-align: center;background-color: #f1f1f3;height: 88vh;padding: 0;margin-top: 0;">
    <!--    <h1 style="font-size: 50px;">{{ '欢迎你！' + user.username }}</h1>-->

<!--    <div class="noticeDiv">-->
<!--      <div class="notice-content">-->
<!--        <h3 class="notice-title">公告</h3>-->

<!--      </div>-->
<!--    </div>-->


    <br/>
    <div align="right" style="padding-right: 70px">
    <el-button @click="toSigned">我的报名</el-button>
    </div>




    <el-descriptions title="个人简介" :column="2" size="40" border style="margin-top: 0">

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-s-custom"></i>
          账号
        </template>
        {{ user.username }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          组织
        </template>
        {{ user.organization }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i>
          注册时间
        </template>
        {{ user.regisTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          角色
        </template>
        <el-tag
            :type="user.type === 1 ? 'warning' : user.type === 2 ? 'success' : 'danger'"
            disable-transitions>{{ user.type === 1 ? '工作人员' : user.type === 2 ? '选手' : '管理员'}}
        </el-tag>

      </el-descriptions-item>
    </el-descriptions>
    <br/>
    <span style="font-size: 40px;">当前还有{{total}}个比赛正在报名，快去参加吧！</span>
<!--    <br/>-->
<!--    <br/>-->
    <div style=" background-color: #ffffff;height: 20%;width: 100%;margin-top: 6%">
      <div @click="dialogVisible = true">
        <img src="../assets/notice.png" width="100%" height="100%">

      </div>

    </div>

    <el-dialog
        style="text-align: left"
        title="公告"
        :visible.sync="dialogVisible"
        width="30%">
      这里是由@longfish制作的比赛报名管理系统网站<br/><br/>
      目前处于测试阶段&nbsp;更新时间：2023-12-12<br/><br/>
      本站为比赛工作人员与选手两种身份提供支持<br/><br/>
      比赛选手可以通过添加各种各样的筛选对系统中的比赛进行查找，支持四种排序方式。同时可以对系统中的可报名比赛进行报名，在比赛报名截至之前可以自行取消。现在支持导出比赛信息到excel用于查看<br/><br/>
      工作人员可以对系统中任意比赛进行增删改，同样支持查询功能。 工作人员新增功能：批量删除、通过excel批量导入导出比赛信息<br/><br/>
      本站还为用户提供了简洁易操作的个人信息查看与修改功能，当修改个人信息时不需要用户校验，当您需要更改密码时，需提供旧密码以验证您的身份。<br/><br/>
      暂不支持密码找回功能，请妥善保管好您的账号密码信息，用户名是您的唯一凭证<br/><br/>
      任何网站相关的技术问题请联系19065029907<br/><br/>
      &copy;版权所有：@longfish
    </el-dialog>
    <!--    <DateUtils></DateUtils>-->



  </div>
</template>

<script>

// import DateUtils from "./DateUtils";


export default {
  name: "HomeVue",
  components: {},

  data() {

    return {
      tableData: [],
      user: {},
      dialogVisible: false,
      total: 0
    }
  },
  computed: {},
  methods: {
    init() {
      this.user = JSON.parse(sessionStorage.getItem('CurUser'))
    },
    toSigned(){
      this.$router.push('/Signed')
    },



  },
  beforeCreate() {
    if (typeof (sessionStorage.getItem('CurUser')) === "object")
      this.$router.push("/")

  },
  created() {
    this.init()

  },
  beforeMount() {
    this.$axios({
      method: 'get',
      url: this.$httpUrl + '/competitions/avai',
      headers: {
        'token':JSON.parse(sessionStorage.getItem('CurUser')).jwt
      }
    }).then(res => res.data).then(res => {
      if (res.code === 1) this.total = res.data;
      else this.$message.error("网络错误")
    })
  }


}
</script>

<style scoped>
.el-descriptions {
  width: 90%;

  margin: 0 auto;
  text-align: center;
}



/*.noticeBody {*/
/*  position: relative;*/
/*  width: 100%;*/
/*  height: 100%;*/
/*  !*background-color: #B3C0D1;*!*/
/*  background-image: url("../assets/bg2.jpg");*/
/*}*/

/*.noticeDiv {*/
/*  position: relative;*/
/*  top: 22%;*/
/*  left: 50%;*/
/*  margin-top: -300px;*/
/*  margin-bottom: 60px;*/
/*  margin-left: -550px;*/
/*  width: 1100px;*/
/*  height: 200px;*/
/*  background: #ffffff;*/
/*  !*background-image: url("../assets/bg.jpg");*!*/
/*  !*border-radius: 5%;*!*/

/*}*/

/*.notice-title {*/
/*  margin: 30px 0;*/
/*  padding-left: 50px;*/
/*  text-align: left;*/
/*}*/

/*.notice-content {*/
/*  width: 400px;*/
/*  height: 250px;*/
/*  position: relative;*/
/*  top: 25px;*/
/*  left: 25px;*/
/*}*/
</style>
