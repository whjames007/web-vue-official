<template>
  <div id="GeweiLogin">
    <el-row
      type="flex"
      justify="center"
    >
      <el-col :span="20">
        <div class="title-div-style">{{ $t('message.productName') }}</div>
      </el-col>
      <el-col :span="4">
        <div style="margin:30px 0px 0px 0px;">
          <el-select
            clearable
            v-model="currentLanguage"
            :placeholder="$t('message.selectCountry')"
            @change="changeLanguage"
          >
            <el-option
              v-for="item in langList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <img
                :src="item.flag"
                style="width:24px;"
              ><span>{{ item.label }}</span>
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row
      type="flex"
      justify="center"
    >
      <el-col :span="10"><img
          src="/static/christmas_tree.png"
          style="margin: 80px 0px 0px 0px;"
        ></el-col>
      <el-col :span="5">
        <img
          src="/static/gewei_logo.jpg"
          style="margin: 140px 0px 0px 0px; width: 100%;"
        />
        <div style="margin: 30px 0px 0px 0px;">
          <el-form
            ref="form"
            :model="loginForm"
            label-width="0px"
          >
            <el-form-item>
              <el-input
                prefix-icon="icon ali-iot-icon-icon_zhanghao"
                v-model="loginForm.userAccount"
                :placeholder="$t('message.usernamePlease')"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                prefix-icon="icon ali-iot-icon-miwen"
                type="password"
                v-model="loginForm.userPassword"
                :placeholder="$t('message.passwordPlease')"
              ></el-input>
            </el-form-item>
            <div style="margin: 30px 0px 0px 0px;">
              <el-button
                type="primary"
                style="width:70%"
                @click="loginWithUserInfo"
                icon="icon ali-iot-icon-renjijiaohu"
                round
              >{{$t('message.signIn')}}</el-button>
            </div>
            <div style="margin: 30px 0px 0px 0px;">
              <el-button
                type="danger"
                style="width:70%"
                @click="centerDialogVisible = true"
                icon="icon ali-iot-icon-icon_yiwenkongxin"
                round
                plain
              >{{$t('message.ForgotPassword')}}</el-button>
            </div>
          </el-form>
        </div>

      </el-col>
    </el-row>
    <el-row
      type="flex"
      justify="center"
    >
      <el-col :span="18">
        <div style="margin:0px 0px 10px 0px; color:#FFFFFF;">
          {{ $t('message.enterpriseCopyright') }}
        </div>
        <div style="margin:10px 0px 10px 0px; color:#FFFFFF;">
          {{ $t('message.enterpriseAddress') }}
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'GeweiLogin',
  data () {
    return {
      currentLanguage: null, // 当前选择的国家语言
      langList: this.commonConstants.langList, // 公共常量中的语言集合
      verifyName: '发送验证码',
      isDisabled: false,
      time: 60,
      centerDialogVisible: false, // 显示或隐藏忘记密码对话框
      loginForm: {
        locale: null,
        userAccount: 'aaa',
        userPassword: 'bbb'
      } // 登录系统的账号和密码
    }
  },
  mounted () {
    let langInfo = this.$store.getters['loginModule/getLocale']
    this.$i18n.locale = langInfo.value
    this.currentLanguage = langInfo.value
    this.loginForm.locale = langInfo.value
  },
  methods: {
    changeLanguage () {
      let value = this.currentLanguage
      if (value) {
        console.info(`当前选择的语言：` + value)
        let obj = {
          lang: value,
          list: this.langList
        }
        this.$store.dispatch('loginModule/localeAction', obj)
        this.$i18n.locale = value
      } else {
        console.info('未选择语言')
      }
    },
    loginWithUserInfo: function () {
      const loading = this.$loading({
        lock: true,
        text: this.$t('message.loading'),
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.axios.post(this.commonConstants.url.userLogin, this.loginForm).then((response) => {
        let status = response.data.status
        console.info(response)
        if (status === this.commonConstants.status.success) {
          this.$store.dispatch('loginModule/loginAction', response.data.dataInfo)
          this.$store.dispatch('commonModule/actionMenuList', response.data.requestParam.children)
          this.$router.push({name: 'GeweiHome'})
          loading.close()
        } else {
          loading.close()
          this.loginWithAlert('java', response.data.code)
        }
      }).catch((error) => {
        loading.close()
        this.loginWithAlert('web', error.response.data)
      })
    },
    loginWithAlert: function (flag, code) {
      let msg = null
      if (flag === 'java') {
        msg = this.$t('message.' + code)
      } else {
        msg = code
      }
      this.$alert(msg, this.$t('message.msgWarn'), {
        type: 'error',
        showClose: false,
        confirmButtonText: this.$t('message.confirm'),
        callback: action => {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
/* background: url(../assets/bluewater05.jpg) repeat; */
#GeweiLogin {
  width: 100%;
  height: 100%;
  text-align: center;
  background: url(/static/bluewater05.jpg) repeat;
}
.title-div-style {
  margin:50px 0px 0px 0px;
  color:#ffffff;
  font-size: 40px;
}
.forget-span-style {
  color: #409EFF;
  border-bottom:1px dashed #409EFF;
}
</style>
