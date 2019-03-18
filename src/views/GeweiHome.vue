<template>
  <div id="GeweiHome">
    <el-container>
      <el-header style="height: 100px;">
        <el-row>
          <el-col :span="7">
            <div><a
                href="http://www.gewei-wh.com/"
                target="_blank>"
              >
                <img
                  src="/static/gewei_logo.jpg"
                  style="height:60px;"
                /></a>
            </div>
          </el-col>
          <el-col :span="13">
            <el-menu
              :default-active="defaultActive"
              mode="horizontal"
              @select="handleSelect"
              active-text-color="#409EFF"
              router
            >
              <template v-for="menuItem in menuList">
                <el-submenu
                  :index="menuItem.menuUrl"
                  :key="menuItem.menuId"
                >
                  <template slot="title">
                    {{menuItem.contentValue}}</template>
                  <template v-for="subItem in menuItem.children">
                    <el-menu-item
                      :index="subItem.menuUrl"
                      :key="subItem.menuId"
                    >
                      <i :class="subItem.menuIcon"></i>{{subItem.contentValue}}
                    </el-menu-item>
                  </template>
                </el-submenu>
              </template>
            </el-menu>
          </el-col>
          <el-col :span="2">
            <div style="padding:24px 0px 0px 0px;text-align: center;">
              <el-popover
                placement="left"
                width="280"
                trigger="hover"
              >
                <div style="padding:10px 0px 0px 0px; background:#FFFFCC; border:1px solid #BEBEBE; border-radius:50px 50px 50px 50px;">
                  <el-form
                    ref="userInfo"
                    label-width="120px"
                    label-suffix="："
                  >
                    <el-row>
                      <el-col>
                        <el-form-item :label="$t('message.username')">
                          <el-tag>{{ userInfo.userAccount }}</el-tag>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <el-form-item :label="$t('message.userInfo.nickName')">
                          <el-tag>{{ userInfo.nickName }}</el-tag>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <el-form-item :label="$t('message.userInfo.roleName')">
                          <el-tag>{{ userInfo.contentValue }}</el-tag>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <el-form-item :label="$t('message.userInfo.loginTime')">
                          <el-tag>{{ loginDateString }}</el-tag>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <el-form-item :label="$t('message.userInfo.currentTime')">
                          <el-tag type="success">{{ currentDateString }}</el-tag>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </div>
                <el-tag
                  size="medium"
                  slot="reference"
                  type="warning"
                ><i class="ali-iot-icon-icon_zhanghao"></i>{{ userInfo.nickName}}</el-tag>
              </el-popover>
            </div>
          </el-col>
          <el-col :span="2">
            <div style="padding:22px 0px 0px 0px;text-align: center;">
              <el-button
                type="danger"
                size="mini"
                icon="ali-iot-icon-icon_rukou"
                plain
                round
                @click="methodQuit"
              >{{$t('message.signOut')}}</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-tabs
              v-model="defaultActive"
              type="card"
              @tab-click="methodTabClick"
              @tab-remove="methodTabClose"
            >
              <el-tab-pane
                v-for="item in tabList"
                :key="item.menuUrl"
                :label="item.contentValue"
                :name="item.menuUrl"
                :closable="item.close"
              >
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="24">
            <keep-alive>
              <router-view
                :userInfo="userInfo"
                :headers="headers"
              />
            </keep-alive>
          </el-col>
        </el-row>

      </el-main>
      <el-footer class="home-footer-style">
        <el-row
          type="flex"
          justify="center"
        >
          <el-col :span="19">
            <div>
              {{ $t('message.enterpriseCopyright') }}
            </div>
            <div>
              {{ $t('message.enterpriseAddress') }}
            </div>
          </el-col>
          <el-col :span="1"><img
              :src="langInfo.flag"
              style="width:32px;"
            ></el-col>
          <el-col :span="4">
            <div style="padding: 0px 0px 40px 0px;">
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
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import {formatDateTimeString} from '../utils/FormatDateTimeString.js'
export default {
  name: 'GeweiHome',
  data () {
    return {
      currentLanguage: null, // 当前选择的国家语言
      langList: this.commonConstants.langList, // 公共常量中的语言集合
      menuList: [], // 菜单列表
      tabList: [], // 标签页列表
      menuLevelObject: {},
      defaultActive: '',
      currentDateString: null,
      loginDateString: null
    }
  },
  beforeCreate: function () {
    let log = `【主页面之beforeCreate函数】`
    let user = this.$store.getters['loginModule/getUserInfo']
    let langInfo = this.$store.getters['loginModule/getLocale']
    console.info(log + `【打印缓存中的用户信息】`, user, `【打印缓存中的国际化信息】`, langInfo)
    if (user) {
      this.userInfo = user
      this.langInfo = langInfo
      this.$i18n.locale = langInfo.value
      this.userInfo.locale = langInfo.value
      this.headers = {headers: {'Authorization': this.userInfo.authorization}}
    } else {
      this.$router.push({name: 'Gewei401'})
    }
  },
  mounted: function () {
    let log = `【主页面之mounted函数】`
    // 从VUEX中获取菜单列表，如果是空的，就重新到后台请求
    let ml = this.$store.getters['commonModule/getMenuList']
    if (ml.length === 0) {
      this.axios.post(this.commonConstants.url.getMenuByUserId, this.userInfo, this.headers
      ).then((response) => {
        let status = response.data.status
        let code = response.data.code
        if (status === this.commonConstants.status.success) {
          this.menuList = response.data.dataInfo.children
          // 发送到vuex中
          this.$store.dispatch('commonModule/actionMenuList', this.menuList)
          // 重新获取菜单等级数据
          this.menuLevelObject = this.$store.getters['commonModule/getMenuLevelObject']
          this.defaultActive = this.menuLevelObject.active
          this.tabList = this.$store.getters['commonModule/getTabList']
          console.info(
            log + `【再次获取的菜单列表数据】`, this.menuList,
            `【再次获取的菜单等级数据】`, this.menuLevelObject,
            `【再次获取的标签页列表数据】`, this.tabList)
        } else {
          this.$alert(this.$t('message.' + code), this.$t('message.msgWarn'), {type: 'warning'})
        }
      })
    } else {
      this.menuList = ml
      this.menuLevelObject = this.$store.getters['commonModule/getMenuLevelObject']
      this.defaultActive = this.menuLevelObject.active
      this.tabList = this.$store.getters['commonModule/getTabList']
      console.info(
        log + `【打印auex获取的菜单列表数据】`, this.menuList,
        `【打印auex获取的菜单等级数据】`, this.menuLevelObject,
        `【打印auex获取的标签页列表数据】`, this.tabList)
    }
    this.loginDateString = formatDateTimeString(new Date(), 'DTS')
    setInterval(this.getCurrentDate, 1000)
    let accessurl = this.$store.getters['loginModule/getAccessPath']
    if (accessurl !== null && accessurl !== '') {
      this.$router.push({name: accessurl})
    }
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
        let langInfo = this.$store.getters['loginModule/getLocale']
        this.langInfo = langInfo
        this.$i18n.locale = value
      } else {
        console.info('未选择语言')
      }
      this.$router.go(0)
    },
    handleSelect: function (key, keyPath) {
      this.defaultActive = key
      this.$store.dispatch('commonModule/actionMenuLevelObject', this.defaultActive)
      this.methodTabAdd()
    },
    methodTabAdd () {
      let have = false
      for (let i = 0; i < this.tabList.length; i++) {
        if (this.tabList[i].menuUrl === this.defaultActive) {
          have = true
          break
        }
      }
      if (have) {
        // 已经有了，不用做任何处理，直接过
      } else {
        // 增加列表后，再过
        this.$store.dispatch('commonModule/actionTabListForAdd', this.defaultActive)
        this.tabList = this.$store.getters['commonModule/getTabList']
      }
    },
    methodTabClick () {
      this.$store.dispatch('commonModule/actionMenuLevelObject', this.defaultActive)
      this.$router.push({name: this.defaultActive})
    },
    methodTabClose (target) {
      let obj = {target: target, active: this.defaultActive}
      this.$store.dispatch('commonModule/actionTabListForClose', obj)
      this.tabList = this.$store.getters['commonModule/getTabList']
      let nextTab = this.$store.getters['commonModule/getNextTab']
      if (nextTab) {
        this.defaultActive = nextTab.menuUrl
        this.methodTabClick()
      }
    },
    methodQuit () {
      this.$confirm(this.$t('message.msgQuit'), this.$t('message.msgTips'), {type: 'warning'
      }).then(() => {
        console.info(`【退出系统，清理缓存，跳回登录页面！】`)
        this.$store.dispatch('commonModule/actionMenuLevelNull', null)
        this.$store.dispatch('loginModule/quitSystem', null)
        this.$router.replace({name: 'GeweiLogin'})
      }).catch(() => {
        this.$message({type: 'info', message: this.$t('message.msgCancel')})
      })
    },
    getCurrentDate () {
      this.currentDateString = formatDateTimeString(new Date(), 'DTS')
    },
    setAccessPath (url) {
      this.$store.dispatch('loginModule/setAccessPath', url)
    }
  }
}
</script>

<style>
/* 标签列表中当前标签页的字体颜色 */
.el-tabs__item.is-active {
    color: #409EFF;
}
.home-footer-style {
  padding: 20px 0px 0px 20px;
  background: #E4E7ED;
  line-height: 20px;
  color:#909399;
}
/* 子页面主标题顶部样式 */
.home-subView-top-style {
  border-radius: 20px 20px 0px 0px;
  margin: 0px 21px 2px 0px;
  padding: 5px 0px 5px 20px;
  background: #409EFF;
}
/* 子页面主标题底部样式 */
.home-subView-bottom-style {
  border-radius: 0px 0px 20px 20px;
  margin: 3px 21px 0px 0px;
  padding: 5px 10px 5px 20px;
  background: #409EFF;
}
/* 子页面主标题字体样式 */
.home-subView-font-style {
  font-size: 14px;
  color: #ffffff;
}
/* 子页面手风琴标题样式 */
.home-subView-collapseDiv {
  width: 100%;
  font-size: 14px;
  padding : 0px 40px 0px 20px;
  color: #ffffff;
  background: #409EFF;
}
/* 子页面查询条件DIV样式 */
.home-subView-condition-style {
  border: 2px solid #409EFF;
  background: #C0C4CC;
  margin: 3px 20px 0px 0px;
  padding: 20px 10px 10px 10px;
}
/* 子页面查询结果DIV样式 */
.home-subView-result-style {
  border: 2px solid #409EFF;
  margin: 3px 20px 0px 0px;
  padding: 0px 0px 0px 0px;
  text-align: center;
}
/* 子页面普通标题样式 */
.home-subView-normalTitleDiv {
  height: 28px;
  font-size: 14px;
  border-radius: 20px 20px 0 0;
  margin: 0px 0px 0px 0px;
  padding : 15px 10px 5px 20px;
  color: #cccccc;
  background: #67C23A;
}
.home-subView-container-header {
  padding : 13px 10px 7px 20px;
  color: #FFFFFF;
  background: #67C23A;
  border-radius: 20px 20px 0 0;
  border:1px solid #FFFFFF;
  text-align: center;
}
.home-subView-container-aside {
  background: #E0E0E0;
  border:1px solid #FFFFFF;
  text-align: center;
  line-height: 200px;
}
.home-subView-container-main {
  color: #FFFFFF;
  background: #FFD9EC;
  border:1px solid #FFFFFF;
}
.home-subView-container-footer {
  margin: 0px 0px 20px 0px;
  padding : 10px 10px 10px 10px;
  color: #FFFFFF;
  border-radius: 0 0 20px 20px;
  background: #67C23A;
  border:1px solid #FFFFFF;
  text-align: center;
}
.home-subView-red-star {
  color: #F56C6C;
}
.el-collapse-item__header {
  height: 24px;
  line-height: 24px;
}
</style>
