<template>
  <div id="GeweiPersonInfo">
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
      <el-col
        :span="8"
        :push="8"
      >
        <div style="text-align:center;">
          <el-form
            label-width="100px"
            :model="userInfo"
          >
            <el-form-item label="账户">
              <el-input v-model="userInfo.userAccount"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="userInfo.nickName"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm()"
              >提交</el-button>
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
  name: 'GeweiPersonInfo',
  data () {
    return {
      userInfo: {
        profile: '',
        userId: '',
        userAccount: '',
        nickName: ''
      }
    }
  },
  beforeCreate () {
    this.menuLevelObject = this.$store.getters['commonModule/getMenuLevelObject']
  },
  mounted () {
    this.findPersonerMessage()
  },
  methods: {
    findPersonerMessage () {
      let u = this.$store.getters['loginModule/getUserInfo']
      this.userInfo.userId = u.userId
      this.userInfo.profile = u.profile
      this.userInfo.userAccount = u.userAccount
      this.userInfo.nickName = u.nickName
    },
    submitForm () {
      if (this.userInfo.userAccount === '' || this.userInfo.userAccount === null) {
        this.$message({
          type: 'warning',
          message: '您输入的账户不能为空'
        })
        return null
      }
      if (this.userInfo.nickName === '' || this.userInfo.nickName === null) {
        this.$message({
          type: 'warning',
          message: '您输入的昵称不能为空'
        })
        return null
      }
      let userInfo = this.$store.getters['commonModule/getUserInfo']
      console.info(userInfo)
      this.userInfo.userId = userInfo.userId
      this.axios.post(this.$store.getters['urlModule/getEditUserInfo'], this.userInfo, {
        headers: {
          'Authorization': userInfo.authorization
        }
      }).then((response) => {
        console.info(response)
        if (response.data.code === 'GEWEI_10001') {
          this.$message({
            type: 'warning',
            message: '您输入的用户账户已存在'
          })
        } else {
          this.$message({
            type: 'success',
            message: '恭喜你修改个人信息成功！'
          })
        }
      })
    },
    resetForm () {
      this.findPersonerMessage()
    }
  }
}
</script>
