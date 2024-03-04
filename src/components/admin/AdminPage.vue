<template>


  <div>
    <el-button type="success" size="mini" @click.native="add">新增&nbsp;<i class="el-icon-circle-plus-outline"/>
    </el-button>
    <el-button type="danger" size="mini" @click.native="deleteAll">批量删除&nbsp;<i class="el-icon-remove-outline"/>
    </el-button>
    <br/>
    <br/>

    <el-table
        ref="multipleTable"
        :data="tableData"
        @selection-change="handleSelectionChange"
        stripe="true"
        border="true"
        :header-cell-style="{background:'#ececec'}">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="username" label="用户名" align="center">
      </el-table-column>
      <el-table-column prop="organization" label="组织" align="center">
      </el-table-column>
      <el-table-column prop="type" label="类型" align="center">
        <template slot-scope="scope">
          <el-tag
              :type="scope.row.type === 1 ? 'warning' : scope.row.type === 2 ? 'success' : 'danger'"
              disable-transitions>{{ scope.row.type === 1 ? '工作人员' : scope.row.type === 2 ? '选手' : '管理员' }}
          </el-tag>
        </template>
      </el-table-column>


      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle size="medium" @click="modify(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="medium" @click="drop(scope.row)"></el-button>
        </template>
      </el-table-column>


    </el-table>

    <el-pagination
        style="margin-top: 30px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[5, 8, 10, 20, 50, 100]"
        :page-size="10"
        layout="sizes, prev, pager, next"
        :total="total">
    </el-pagination>


    <el-dialog
        title="提  示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center="true">

      <el-form ref="formInsMod" :model="form" label-width="80px" prop="name">
        <el-form-item label="用户名" required="true" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" show-password="true"></el-input>
        </el-form-item>
        <el-form-item label="组织" required="true" prop="organization">
          <el-input v-model="form.organization"></el-input>
        </el-form-item>

        <el-form-item label="角色" required="true" prop="type">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option label="工作人员" value="1"></el-option>
            <el-option label="选手" value="2"></el-option>
            <el-option label="管理员" value="3"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item style="padding-left: 32px;margin: 10px">
          <el-button type="primary" @click="submit">确 定</el-button>
          <el-button @click="centerDialogVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


  </div>
</template>

<script>
let p = 1;
let ps = 10;

export default {
  name: "AdminPage",
  data() {

    return {

      pickerOptions: {},

      form: {
        id: '',
        username: '',
        password: '',
        organization: '',
        type: '',
      },

      currentPage: 1,
      tableData: [],


      centerDialogVisible: false,
      dialogVisible: false,
      copType: '',
      isFlag: '',
      time: '',
      search: '',
      order: '',
      fileList: [],
      multipleSelection: [],
      total: 0,
    }
  },
  methods: {
    submit() {
      if (this.form.username === '')
        this.$message.error("用户名不能为空")
      else if (this.form.helders === '')
        this.$message.error("组织不能为空")
      else if (this.form.type === '')
        this.$message.error("请选择角色")
      else {

        if (this.form.id !== '' && this.form.password === ''){
          this.$axios({
            method: 'put',
            url: this.$httpUrl + '/user/update',
            data: {
              id: this.form.id,
              username: this.form.username,
              organization: this.form.organization,
              type: this.form.type,
            },
            headers: {
              'token':JSON.parse(sessionStorage.getItem('CurUser')).jwt
            }
          }).then(res => res.data).then(res => {
            if (res.code === 1) {
              this.$message.success("修改成功");
              this.centerDialogVisible = false;
              this.loadGet()

            } else
              this.$message.error("修改失败，网络异常或填写内容有误")
          })

        }else if (this.form.id !== '' && this.form.password !== ''){
          this.$axios({
            method: 'put',
            url: this.$httpUrl + '/user/update',
            data: {
              id: this.form.id,
              username: this.form.username,
              password: this.form.password,
              organization: this.form.organization,
              type: this.form.type,
            },
            headers: {
              'token':JSON.parse(sessionStorage.getItem('CurUser')).jwt
            }
          }).then(res => res.data).then(res => {
            if (res.code === 1) {
              this.$message.success("修改成功");
              this.centerDialogVisible = false;
              this.loadGet()

            } else
              this.$message.error("修改失败，网络异常或填写内容有误")
          })
        }else if (this.form.password !== ''){
          this.$axios({
            method:'post',
            url: this.$httpUrl + '/user/insert',
            data:{
              username: this.form.username,
              password: this.form.password,
              organization: this.form.organization,
              type: this.form.type,
            },
            headers: {
              'token':JSON.parse(sessionStorage.getItem('CurUser')).jwt
            }


          }).then(res => res.data).then(res => {
            if (res.code === 1) {
              this.$message.success("添加成功");
              this.centerDialogVisible = false;
              this.loadGet()

            } else
              this.$message.error("用户已存在")
          })
        }else{
          this.$axios({
            method:'post',
            url: this.$httpUrl + '/user/insert',
            data:{
              username: this.form.username,
              organization: this.form.organization,
              type: this.form.type,
            },
            headers: {
              'token':JSON.parse(sessionStorage.getItem('CurUser')).jwt
            }


          }).then(res => res.data).then(res => {
            if (res.code === 1) {
              this.$message.success("添加成功");
              this.centerDialogVisible = false;
              this.loadGet()

            } else
              this.$message.error("用户已存在")
          })
        }
      }

    },
    loadGet() {
      this.$axios({
        method:'get',
        url: this.$httpUrl + '/user/list?page=' +
            p + '&' + 'pageSize=' + ps,
        headers: {
          'token':JSON.parse(sessionStorage.getItem('CurUser')).jwt
        }
      }).then(res => res.data).then(res => {
        if (res.code === 1) {
          this.tableData = res.data.rows;
          this.total = res.data.total;

        } else {
          this.$message.error("网络错误")
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      ps = val;
      this.loadGet();
    },
    handleCurrentChange(val) {
      p = val;
      this.loadGet();
    },
    modify(row) {
      this.centerDialogVisible = true;

      this.$nextTick(() => {

        this.form.id = row.id;
        this.form.username = row.username;
        this.form.password = '';
        this.form.organization = row.organization;
        this.form.type = row.type + '';


      })

    },
    drop(row) {

      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method:'delete',
          url:this.$httpUrl + '/user/' + row.id,
          headers:{
            'token':JSON.parse(sessionStorage.getItem('CurUser')).jwt
          }
        }).then(res => res.data).then(res => {
          if (res.code === 1) {
            this.$message.success('删除成功');
            if (p === Math.ceil(this.total / ps) && this.tableData.length === 1){

              // this.currentPage--;
              p--;
            }

            this.loadGet()
          } else
            this.$message.error("删除失败")
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    add() {
      this.centerDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.formInsMod.resetFields();
      })
      this.form.id = ''
    },
    deleteAll() {
      if (this.multipleSelection.length === 0)
        this.$message.warning("未选中任何用户")
      else {
        this.$confirm('此操作将永久删除这些记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let tempStr = '';
          for (let i = 0; i < this.multipleSelection.length - 1; i++) {
            tempStr += this.multipleSelection[i].id + ',';
          }
          tempStr += this.multipleSelection[this.multipleSelection.length - 1].id;
          this.$axios({
            method:'delete',
            url:this.$httpUrl + '/user/' + tempStr,
            headers: {
              'token':JSON.parse(sessionStorage.getItem('CurUser')).jwt
            }
          }).then(res => res.data).then(res => {
            if (res.code === 1) {
              this.$message.success('删除成功');
              if (p === Math.ceil(this.total / ps) && this.tableData.length === this.multipleSelection.length){

                this.currentPage--;
                p--;
              }
              this.loadGet();

            } else this.$message.error('删除失败');
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
  },
  beforeMount() {
    p = 1;
    ps = 10;
    this.currentPage = 1;

    this.loadGet();
  }


}
</script>

<style scoped>

</style>
