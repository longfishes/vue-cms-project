<template>
  <div>

    <div>
      <i class="el-icon-search"/>&nbsp;
      <el-input v-model="search" placeholder="请输入名称" style="width: 20%"></el-input>
      <el-select v-model="copType" clearable placeholder="请选择类型" style="width: 12%;padding-left: 2.5%">
        <el-option
            v-for="item in type"
            :key="item.value"
            :label="item.label"
            :value="item.copType">
        </el-option>
      </el-select>
      <el-select v-model="isFlag" clearable placeholder="报名情况" style="width: 12%;padding-left: 2.5%">
        <el-option
            v-for="item in isFull"
            :key="item.value"
            :label="item.label"
            :value="item.isFlag">
        </el-option>
      </el-select>

      <span class="demonstration"></span>
      <el-date-picker
          style="padding-left: 3%; width: 15%"
          v-model="time"
          type="date"
          placeholder="选择日期">
      </el-date-picker>
      <el-select v-model="order" clearable placeholder="排序方式"
                 style="width: 12%;padding-left: 2%;padding-right: 2%">
        <el-option
            v-for="item in orders"
            :key="item.value"
            :label="item.label"
            :value="item.order">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="clickSearch">搜索</el-button>
      <el-button type="info" @click="reset">重置</el-button>

      <br/>
      <br/>
      <!--      <el-button type="success" size="mini" @click.native="add">新增&nbsp;<i class="el-icon-circle-plus-outline"/>-->
      <!--      </el-button>-->
      <!--      <el-button type="danger" size="mini" @click.native="deleteAll">批量删除&nbsp;<i class="el-icon-remove-outline"/>-->
      <!--      </el-button>-->
      <!--      <el-button type="primary" size="mini" @click.native="imPort">导入&nbsp;<i class="el-icon-download"/></el-button>-->
      <el-button type="primary" size="mini" @click.native="exPort">导出&nbsp;<i class="el-icon-upload2"/></el-button>
    </div>
    <br/>
    <div>

      <el-table
          ref="multipleTable"
          :data="tableData"
          stripe="true"
          border="true"
          :header-cell-style="{background:'#ececec'}">
        <!--        <template slot-scope="scope">-->
        <!--        <el-table-column type="selection"></el-table-column>-->
        <!--        </template>-->
        <el-table-column prop="copName" label="比赛名称" width="180" align="center">
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
        <el-table-column prop="startDate" label="报名开始时间" width="149" align="center">
        </el-table-column>
        <el-table-column prop="endDate" label="报名结束时间" width="148" align="center">
        </el-table-column>
        <el-table-column prop="copStatus" label="状态" width="100" align="center">
          <template slot-scope="scope">
            <el-tag
                :type="scope.row.copStatus === 1 ? 'info' : scope.row.copStatus === 2 ? 'success' : 'danger'"
                disable-transitions>{{ scope.row.copStatus === 1 ? '未开始' : scope.row.copStatus === 2 ? '正在报名' : '已截止' }}
            </el-tag>
          </template>
        </el-table-column>


        <el-table-column label="操作" width="140" align="center">
          <template slot-scope="scope">
            <el-button type="success" icon="el-icon-s-flag" size="medium" @click="sign(scope.row)"
                       v-if="signable(scope.row)">
              <span>报名</span>
            </el-button>
            <el-button type="danger" icon="el-icon-close" size="medium" @click="unSign(scope.row)"
                       v-if="alreadySigned(scope.row)">
              <span>取消</span>
            </el-button>
            <el-button type="info" icon="el-icon-minus" size="medium" disabled
                       key="isOldVersion"
                       v-if="usable(scope.row)">
              <span>禁止</span>
            </el-button>
          </template>
        </el-table-column>


      </el-table>

      <el-pagination
          style="margin-top: 30px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[5, 8, 10, 20, 50, 100]"
          :page-size="8"
          layout="sizes, prev, pager, next"
          :total="total">
      </el-pagination>


    </div>
    <!--    <el-dialog-->
    <!--        title="提  示"-->
    <!--        :visible.sync="centerDialogVisible"-->
    <!--        width="30%"-->
    <!--        center="true">-->

    <!--      <el-form ref="formInsMod" :model="form" label-width="80px" prop="name">-->
    <!--        <el-form-item label="比赛名称" required="true" prop="name">-->
    <!--          <el-input v-model="form.name"></el-input>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="比赛简介" prop="info">-->
    <!--          <el-input v-model="form.info"></el-input>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="主办方" required="true" prop="helders">-->
    <!--          <el-input v-model="form.helders"></el-input>-->
    <!--        </el-form-item>-->

    <!--        <el-form-item label="比赛类型" required="true" prop="type">-->
    <!--          <el-select v-model="form.type" placeholder="请选择类型">-->
    <!--            <el-option label="个人赛" value="1"></el-option>-->
    <!--            <el-option label="团体赛" value="2"></el-option>-->
    <!--          </el-select>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="报名时间" required="true" prop="date">-->
    <!--          <div class="block">-->
    <!--            <el-date-picker-->
    <!--                style="width: 300px"-->
    <!--                v-model.trim="form.date"-->
    <!--                type="daterange"-->
    <!--                range-separator="至"-->
    <!--                start-placeholder="开始日期"-->
    <!--                end-placeholder="结束日期"-->
    <!--                value-format="yyyy-MM-dd">-->
    <!--            </el-date-picker>-->
    <!--          </div>-->
    <!--        </el-form-item>-->

    <!--        <el-form-item label="参赛名额" style="width: 300px" required="true" prop="limit">-->
    <!--          <el-input v-model="form.limit" type="number"></el-input>-->
    <!--        </el-form-item>-->


    <!--        <el-form-item style="padding-left: 32px;margin: 10px">-->
    <!--          <el-button type="primary" @click="submit">确 定</el-button>-->
    <!--          <el-button @click="centerDialogVisible = false">取 消</el-button>-->
    <!--        </el-form-item>-->
    <!--      </el-form>-->
    <!--    </el-dialog>-->

    <!--    <el-dialog-->
    <!--        title="上传"-->
    <!--        :visible.sync="dialogVisible"-->
    <!--        width="30%">-->
    <!--      <el-upload-->
    <!--          class="upload-demo"-->
    <!--          ref="upload"-->
    <!--          action="http://192.168.1.67:8080/import"-->
    <!--          :file-list="fileList"-->
    <!--          :auto-upload="false">-->
    <!--        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>-->
    <!--        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
    <!--        <br/>-->
    <!--        <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件，且不超过1MB</div>-->
    <!--      </el-upload>-->
    <!--      <span slot="footer" class="dialog-footer">-->
    <!--    <el-button @click="$nextTick(() => {loadGet}); dialogVisible = false" type="primary">完 成</el-button>-->
    <!--    <el-button @click="$nextTick(() => {loadGet}); dialogVisible = false">取 消</el-button>-->
    <!--  </span>-->
    <!--    </el-dialog>-->


  </div>
</template>

<script>


let p = 1;
let ps = 8;
// let VARID = 0;
export default {
  name: "UserPage",

  data() {

    return {

      pickerOptions: {},

      form: {
        id: '',
        name: '',
        info: '',
        helders: '',
        type: '',
        date: '',
        limit: '',
        mod: false
      },

      currentPage: 1,
      tableData: [],
      type: [{
        copType: '1',
        label: '个人赛'
      }, {
        copType: '2',
        label: '团体赛'

      }],

      isFull: [{
        isFlag: '1',
        label: '未报满'
      }, {
        isFlag: '2',
        label: '已报满',

      }],
      orders: [{
        order: '1',
        label: '最多报名'
      }, {
        order: '2',
        label: '最少报名',
      }, {
        order: '3',
        label: '开始日期',

      }, {
        order: '4',
        label: '截止日期',

      }],
      centerDialogVisible: false,
      dialogVisible: false,
      copType: '',
      isFlag: '',
      time: '',
      search: '',
      order: '',
      fileList: [],
      multipleSelection: []
    }
  },
  methods: {
    // submitUpload() {
    //   this.$refs.upload.submit()
    //
    // },
    loadGet() {

      this.$axios({
        method: 'get',
        url: '/competitions?page=' +
            p + '&' + 'pageSize=' + ps + '&copName=' + this.search +
            '&type=' + this.copType + '&isFull=' + this.isFlag +
            '&date=' + this.time + '&order=' + this.order + '&username=' +
            JSON.parse(sessionStorage.getItem('CurUser')).username,
        headers: {
          'token': JSON.parse(sessionStorage.getItem('CurUser')).jwt
        }
      })
          .then(res => res.data).then(res => {
        if (res.code === 1) {
          this.tableData = res.data.rows;
          this.total = res.data.total;

        } else {
          this.$message.error("网络错误")
        }
      })
    },
    clickSearch(){
      this.handleCurrentChange(1);
      this.loadGet();
    },
    handleSizeChange(val) {
      ps = val;
      this.loadGet();
    },
    handleCurrentChange(val) {
      p = val;
      this.loadGet();
    },
    signable(row) {
      if (this.usable(row)) return false;
      return !this.alreadySigned(row);
    },
    alreadySigned(row) {
      if (this.usable(row)) return false;
      return !!row.sign;

    },
    reset(){
      this.search = '';
      this.copType = '';
      this.isFlag = '';
      this.time = '';
      this.order = '';
    },
    usable(row) {
      if (row.copStatus !== 2) return true;
      if(row.sign) return false;
      return row.participated === row.limitation;
    },
    sign(row) {

      this.$axios({
        method: 'post',
        url: '/sign',
        data: {
          username: JSON.parse(sessionStorage.getItem('CurUser')).username,
          copId: row.id
        },
        headers: {
          token: JSON.parse(sessionStorage.getItem('CurUser')).jwt
        }
      }).then(res => res.data).then(res => {
        if (res.code === 1) {
          this.$message.success("报名成功！");
          this.loadGet();
        } else {
          this.$message.error("报名失败，请检查网络或再试一次");
          this.loadGet();
        }
      })
      // console.log(row);
      // VARID = row.id;
      // this.centerDialogVisible = true;
      //
      // this.$nextTick(() => {
      //
      //   this.form.mod = true;
      //
      //   this.form.id = row.id;
      //   this.form.name = row.copName;
      //   this.form.info = row.info;
      //   this.form.helders = row.organizers;
      //   this.form.limit = row.limitation;
      //   this.form.type = row.type + '';
      //
      //
      //   let tmpArr = []
      //   tmpArr.push(new Date(row.startDate))
      //   tmpArr.push(new Date(row.endDate))
      //
      //   this.form.date = tmpArr;
      //
      //
      // })

    },
    unSign(row) {

      this.$confirm('是否确认取消报名?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$axios({
          method: 'post',
          url: '/unSign',
          data: {
            username: JSON.parse(sessionStorage.getItem('CurUser')).username,
            copId: row.id
          },
          headers: {
            token: JSON.parse(sessionStorage.getItem('CurUser')).jwt
          }
        }).then(res => res.data).then(res => {
          if (res.code === 1) {
            this.$message.warning("取消成功");
            this.loadGet();
          } else {
            this.$message.error("取消失败，请检查网络或再试一次");
            this.loadGet();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
      // this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   this.$axios({
      //     method: 'delete',
      //     url: '/competitions/' + row.id,
      //     headers: {
      //       'token': JSON.parse(sessionStorage.getItem('CurUser')).jwt
      //     }
      //   }).then(res => res.data).then(res => {
      //     if (res.code === 1) {
      //       this.$message.success('删除成功');
      //       this.loadGet()
      //     } else
      //       this.$message.error("删除失败")
      //   })
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除'
      //   });
      // });

    },
    // add() {
    //   this.centerDialogVisible = true;
    //   this.$nextTick(() => {
    //     this.$refs.formInsMod.resetFields();
    //     this.form.mod = false;
    //   })
    // },
    // deleteAll() {
    //   if (this.multipleSelection.length === 0)
    //     this.$message.warning("未选中任何比赛")
    //   else {
    //     this.$confirm('此操作将永久删除这些记录, 是否继续?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       let tempStr = '';
    //       for (let i = 0; i < this.multipleSelection.length - 1; i++) {
    //         tempStr += this.multipleSelection[i].id + ',';
    //       }
    //       tempStr += this.multipleSelection[this.multipleSelection.length - 1].id;
    //       this.$axios({
    //         method: 'delete',
    //         url: '/competitions/' + tempStr,
    //         headers: {
    //           'token': JSON.parse(sessionStorage.getItem('CurUser')).jwt
    //         }
    //       }).then(res => res.data).then(res => {
    //         if (res.code === 1) {
    //           this.$message.success('删除成功');
    //           this.loadGet();
    //         } else this.$message.error('删除失败');
    //       })
    //     }).catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       });
    //     });
    //   }
    // },
    //
    // imPort() {
    //   this.dialogVisible = true;
    // },
    exPort() {
      this.$confirm('导出比赛信息？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        // location.href = '/export';
        this.$axios({
          method: 'get',
          url: '/export',
          responseType: 'blob',
          headers: {
            'token':JSON.parse(sessionStorage.getItem('CurUser')).jwt
          }
        }).then(res => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', '比赛信息.xlsx');
          document.body.appendChild(link);
          link.click();
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });

    },
    // submit() {
    //   if (this.form.name === '')
    //     this.$message.error("名称不能为空")
    //   else if (this.form.helders === '')
    //     this.$message.error("主办方不能为空")
    //   else if (this.form.type === '')
    //     this.$message.error("请选择比赛类型")
    //   else if (this.form.date === '')
    //     this.$message.error("请选择报名时间")
    //   else if (this.form.limit === '')
    //     this.$message.error("参赛名额不能为空")
    //
    //   else {
    //     if (!this.form.mod) {
    //       this.$axios({
    //         method: 'post',
    //         url: '/competitions',
    //         data: {
    //           copName: this.form.name,
    //           info: this.form.info,
    //           organizers: this.form.helders,
    //           type: this.form.type,
    //           limitation: this.form.limit,
    //           startDate: this.form.date[0],
    //           endDate: this.form.date[1],
    //         },
    //         headers: {
    //           'token': JSON.parse(sessionStorage.getItem('CurUser')).jwt
    //         }
    //
    //
    //       }).then(res => res.data).then(res => {
    //         if (res.code === 1) {
    //           this.$message.success("添加成功");
    //           this.centerDialogVisible = false;
    //           this.loadGet()
    //
    //         } else
    //           this.$message.error("添加失败，网络异常或填写内容有误")
    //       })
    //     } else {
    //       this.$axios({
    //         method: 'put',
    //         url: '/competitions',
    //         data: {
    //           id: VARID,
    //           copName: this.form.name,
    //           info: this.form.info,
    //           organizers: this.form.helders,
    //           type: this.form.type,
    //           limitation: this.form.limit,
    //           startDate: this.form.date[0],
    //           endDate: this.form.date[1],
    //         },
    //         headers: {
    //           'token': JSON.parse(sessionStorage.getItem('CurUser')).jwt
    //         }
    //       }).then(res => res.data).then(res => {
    //         if (res.code === 1) {
    //           this.$message.success("修改成功");
    //           this.centerDialogVisible = false;
    //           this.loadGet()
    //
    //         } else
    //           this.$message.error("修改失败，网络异常或填写内容有误")
    //       })
    //     }
    //
    //   }
    //
    // },


  },
  beforeMount() {
    p = 1;
    ps = 8;
    this.currentPage = 1;

    this.loadGet();
  }
}
</script>

<style scoped>

</style>
