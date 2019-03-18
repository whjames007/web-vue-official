<template>
  <div id="GeweiPersonPass">
    <el-row>
      <el-col :span="24">
        <div class="home-subView-top-style">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item><span class="home-subView-font-style">{{menuLevelObject.one}}</span></el-breadcrumb-item>
            <el-breadcrumb-item><span class="home-subView-font-style">{{menuLevelObject.two}}</span></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" push="8">
        <div style="text-align:center;">
           <el-form :model="passForm" status-icon  ref="passForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="原始密码：" prop="password">
                <el-input type="password" v-model="passForm.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码：" prop="pass">
                <el-input type="password" v-model="passForm.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码：" prop="checkPass">
                <el-input type="password" v-model="passForm.checkPass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item >
                <el-button type="primary" @click="submitForm()">提交</el-button>
                <el-button @click="resetForm()">重置</el-button>
              </el-form-item>
            </el-form>
        </div>
      </el-col>
    </el-row>
<el-row>
      <el-col :span="24">
        <div class="home-subView-foot-style">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item><span class="home-subView-font-style">{{menuLevelObject.one}}</span></el-breadcrumb-item>
            <el-breadcrumb-item><span class="home-subView-font-style">{{menuLevelObject.two}}</span></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'GeweiPersonPass',
  data () {
    return {
      passForm: {
        pass: '',
        checkPass: '',
        password: ''
      }
    }
  },
  beforeCreate () {
    this.menuLevelObject = this.$store.getters['commonModule/getMenuLevelObject']
  },
  methods: {
    submitForm () {
      if (this.passForm.password === '' || this.passForm.password === null) {
        this.$message({
          type: 'error',
          message: '您输入的原始密码不能为空！'
        })
      }
      if (this.passForm.pass === '' || this.passForm.pass === null || this.passForm.checkPass === '' || this.passForm.checkPass === null) {
        this.$message({
          type: 'error',
          message: '您输入的修改密码不能为空！'
        })
      }
      if (this.passForm.pass !== this.passForm.checkPass) {
        this.$message({
          type: 'warning',
          message: '您两次输入的密码不一致！'
        })
      }
      let userInfo = this.$store.getters['commonModule/getUserInfo']
      userInfo.userPassword = this.passForm.password
      console.info('这个user开始了')
      console.info(userInfo)
      let checkPassUrl = this.$store.getters['urlModule/getCheckPass']
      let modifyPassUrl = this.$store.getters['urlModule/getEditUserInfo']
      this.axios.post(checkPassUrl, userInfo, {
        headers: {
          'Authorization': userInfo.authorization
        }
      }).then((response) => {
        let code = response.data.code
        if (code === 'GEWEI_10000') {
          userInfo.userPassword = this.passForm.checkPass
          this.axios.post(modifyPassUrl, userInfo, {
            headers: {
              'Authorization': userInfo.authorization
            }
          }).then((response) => {
            this.$message({
              type: 'success',
              message: '您修改密码成功!'
            })
          })
        }
        if (code === 'GEWEI_10002') {
          this.$message({
            type: 'error',
            message: '您输入的原始密码错误！'
          })
        }
      })
    },
    resetForm () {
      this.passForm.pass = ''
      this.passForm.checkPass = ''
      this.passForm.password = ''
    }
  }
}
</script>
