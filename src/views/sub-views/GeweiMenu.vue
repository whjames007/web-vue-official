<template>
  <div id="GeweiMenu">
    <!-- 顶行 -->
    <gewei-subview-top></gewei-subview-top>
    <!--中间行-->
    <el-row :gutter="gutterSize">
      <el-col :span="6">
        <div class="home-subView-condition-style">
          <el-button
            type="text"
            icon="ali-iot-icon-shuaxin"
            @click="methodTreeList"
          >
            {{$t('message.refresh')}}</el-button>
          <el-tree
            :data="menuTree"
            :props="menuProps"
            @node-click="methodNodeClick"
            node-key="menuId"
            :expand-on-click-node="false"
            default-expand-all
            highlight-current
          ></el-tree>
        </div>
      </el-col>
      <el-col :span="18">
        <el-row
          :gutter="gutterSize"
          type="flex"
          justify="center"
        >
          <el-col
            :span="8"
            :offset="4"
          >[ {{dialogData.contentValue}} ] 菜单详情</el-col>
        </el-row>
        <div class="home-subView-condition-style">
          <el-form
            label-width="160px"
            label-suffix="："
          >
            <el-row :gutter="gutterSize">
              <el-col :span="12">
                <el-form-item :label="$t('message.langName')">
                  <el-input
                    v-model="dialogData.menuName"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('message.menuInfo.menuName')">
                  <!-- <el-input v-model="dialogData.contentValue" disabled></el-input> -->
                  <el-select
                    v-model="dialogData.menuName"
                    clearable
                    :placeholder="$t('message.placeholder')"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in nameList"
                      :key="item.contentKey"
                      :label="item.contentValue"
                      :value="item.contentKey"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="gutterSize">
              <el-col :span="12">
                <el-form-item :label="$t('message.menuInfo.menuIcon')">
                  <el-input v-model="dialogData.menuIcon"></el-input>
                  <i :class="dialogData.menuIcon"></i>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('message.menuInfo.menuType')">
                  <el-select
                    v-model="dialogData.menuType"
                    clearable
                    :placeholder="$t('message.placeholder')"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in typeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  {{dialogData.menuType}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="gutterSize">
              <el-col :span="12">
                <el-form-item :label="$t('message.menuInfo.menuUrl')">
                  <el-input v-model="dialogData.menuUrl"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('message.menuInfo.parentId')">
                  <el-select
                    v-model="dialogData.parentId"
                    clearable
                    :placeholder="$t('message.placeholder')"
                    style="width: 100%"
                    :disabled="parentType"
                  >
                    <el-option
                      v-for="item in parentList"
                      :key="item.menuId"
                      :label="item.contentValue"
                      :value="item.menuId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="gutterSize">
              <el-col :span="12">
                <el-form-item :label="$t('message.langDesc')">
                  <el-input
                    v-model="dialogData.menuDesc"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('message.lastUpdateDate')">
                  <el-input
                    v-model="dialogData.lastUpdateStr"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="gutterSize">
              <el-col :span="24">
                <el-form-item :label="$t('message.menuInfo.menuDesc')">
                  <el-select
                    v-model="dialogData.menuDesc"
                    clearable
                    :placeholder="$t('message.placeholder')"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in descList"
                      :key="item.contentKey"
                      :label="item.contentValue"
                      :value="item.contentKey"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="menu-batton-style">
          <el-row :gutter="gutterSize">
            <el-col :span="8">
              <el-button
                type="success"
                size="mini"
                icon="ali-iot-icon-chucun"
                @click="methodDialogOpen"
              >
                {{$t('message.create')}}</el-button>
            </el-col>
            <el-col :span="8">
              <el-button
                type="primary"
                size="mini"
                icon="ali-iot-icon-gongdanqueren"
                :disabled="buttonStatus"
                @click="methodDialogSave(commonConstants.operation.update)"
              >
                {{$t('message.save')}}</el-button>
            </el-col>
            <el-col :span="8">
              <el-button
                type="danger"
                size="mini"
                icon="ali-iot-icon-shanchu"
                :disabled="buttonStatus"
                @click="methodDialogSave(commonConstants.operation.delete)"
              >
                {{$t('message.delete')}}</el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <!--底行-->
    <gewei-subview-bottom></gewei-subview-bottom>
    <!--对话框-->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogShow"
      width="60%"
      center
    >
      <div class="home-subView-condition-style">
        <el-form
          label-width="120px"
          label-suffix="："
          :model="dialogCreate"
          ref="dialogCreate"
          :rules="dialogRules"
        >
          <el-row :gutter="gutterSize">
            <el-col :span="11">
              <el-form-item
                :label="$t('message.menuInfo.menuName')"
                prop="menuName"
              >
                <el-select
                  v-model="dialogCreate.menuName"
                  :placeholder="$t('message.placeholder')"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in nameList"
                    :key="item.contentKey"
                    :label="item.contentValue"
                    :value="item.contentKey"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item :label="$t('message.menuInfo.menuIcon')">
                <el-input v-model="dialogCreate.menuIcon"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="gutterSize">
            <el-col :span="11">
              <el-form-item
                :label="$t('message.menuInfo.menuType')"
                prop="menuType"
              >
                <el-select
                  v-model="dialogCreate.menuType"
                  :placeholder="$t('message.placeholder')"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in typeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item
                :label="$t('message.menuInfo.menuUrl')"
                prop="menuUrl"
              >
                <el-input v-model="dialogCreate.menuUrl"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="gutterSize">
            <el-col :span="11">
              <el-form-item
                :label="$t('message.menuInfo.parentId')"
                prop="parentId"
              >
                <el-select
                  v-model="dialogCreate.parentId"
                  clearable
                  :placeholder="$t('message.placeholder')"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in parentList"
                    :key="item.menuId"
                    :label="item.contentValue"
                    :value="item.menuId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item :label="$t('message.menuInfo.menuDesc')">
                <el-select
                  v-model="dialogCreate.menuDesc"
                  clearable
                  :placeholder="$t('message.placeholder')"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in descList"
                    :key="item.contentKey"
                    :label="item.contentValue"
                    :value="item.contentKey"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-row :gutter="gutterSize">
        <el-col :span="2">
          <el-tag
            size="mini"
            type="danger"
          >注意事项</el-tag>
        </el-col>
        <el-col :span="20">
          {{$t('message.attentionFirst')}}
        </el-col>
      </el-row>
      <el-row :gutter="gutterSize">
        <el-col :span="2">
        </el-col>
        <el-col
          :span="20"
          :offset="2"
        >
          {{$t('message.attentionSecond')}}
        </el-col>
      </el-row>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          size="mini"
          @click="methodDialogOpenWithSave"
        >{{$t('message.save')}}</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="methodDialogReset"
        >{{$t('message.reset')}}</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="methodDialogClose"
        >{{$t('message.close')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import GeweiSubViewTop from './GeweiSubViewTop.vue'
import GeweiSubViewBottom from './GeweiSubViewBottom.vue'
import {formatDateTimeString} from '../../utils/FormatDateTimeString.js'
export default {
  name: 'GeweiMenu',
  props: ['userInfo', 'headers'],
  components: {
    'gewei-subview-top': GeweiSubViewTop,
    'gewei-subview-bottom': GeweiSubViewBottom
  },
  data () {
    return {
      pageName: '【菜单信息管理页面】',
      menuTree: [],
      menuProps: {
        children: 'children',
        label: 'contentValue'
      },
      collapse: true, // 自动折叠功能开关
      gutterSize: 10, // 布局间距
      dialogShow: false, // 对话框显示开关
      dialogTitle: null, // 对话框标题
      dialogData: {
        profile: this.userInfo.profile,
        locale: this.userInfo.locale
      }, // 对话框数据对象
      dialogCreate: {
      },
      nameList: [],
      descList: [],
      typeList: [{value: 'BRANCH', label: this.$t('message.branch')}, {value: 'LEAF', label: this.$t('message.leaf')}],
      parentList: [],
      parentType: true,
      buttonStatus: false,
      dialogRules: {
        menuName: [
          {required: true, message: this.$t('message.menuInfo.menuNameRule'), trigger: 'change'}
        ],
        menuType: [
          {required: true, message: '请输入用户的昵称', trigger: 'change'}
        ],
        menuUrl: [
          {required: true, message: '请输入用户的合法邮箱地址', trigger: 'blur'}
        ],
        parentId: [
          { required: true, message: '请选择用户的角色', trigger: 'change' }
        ]
      }
    }
  },
  mounted: function () {
    this.methodTreeList()
    this.methodI18nList('MENU-NAME')
    this.methodI18nList('MENU-DESC')
    this.buttonStatus = true
  },
  methods: {
    methodFormatDTS (val) {
      return formatDateTimeString(val, 'DTS')
    },
    methodTreeList () {
      // 递归树查询方法
      this.axios.post(this.commonConstants.url.menuTree, this.userInfo, this.headers
      ).then((response) => {
        let result = response.data.dataInfo
        this.menuTree = []
        this.menuTree.push(result)
        console.info(this.pageName + '【methodTreeList获取菜单树对象】', result)
      })
      this.methodParentList()
    },
    methodParentList () {
      // 更新分支节点列表
      let paramParent = {locale: this.userInfo.locale, menuType: 'BRANCH'}
      this.axios.post(this.commonConstants.url.menuParentList, paramParent, this.headers
      ).then((response) => {
        this.parentList = response.data.dataList
        // this.parentList.push({menuId: 0, contentValue: '/'})
        console.info(this.pageName + '【methodParentList获取分支节点列表】', this.parentList)
      })
    },
    methodNodeClick (data) {
      let pid = data.parentId
      if (pid === 0) {
        this.parentType = true
      } else {
        this.parentType = false
      }
      this.axios.post(this.commonConstants.url.formatMenuInfo, data, this.headers
      ).then((response) => {
        let result = response.data.dataInfo
        let last = this.methodFormatDTS(result.lastUpdateDate)
        result.lastUpdateStr = last
        this.dialogData = result
        this.dialogData.profile = this.userInfo.profile
        this.dialogData.locale = this.userInfo.locale
        this.buttonStatus = false
        console.info(this.pageName + `【methodNodeClick获取菜单树的当前节点】`, result)
      })
      // 对话框打开之前，先从后台请求数据
      this.methodI18nList('MENU-NAME')
      this.methodI18nList('MENU-DESC')
    },
    methodI18nList (flag) {
      // 动态获取菜单相关的国际化数据
      let param = {typeCode: this.userInfo.locale, contentUsed: null}
      if (flag === 'MENU-NAME') {
        param.contentGroup = 'MENU-NAME'
      } else {
        param.contentGroup = 'MENU-DESC'
      }
      this.axios.post(this.commonConstants.url.languageFind, param, this.headers
      ).then((response) => {
        console.info(`【菜单子页面之methodI18nList函数】【打印角色相关的国际化数据】`, response.data.dataList)
        if (flag === 'MENU-NAME') {
          this.nameList = response.data.dataList
        } else {
          this.descList = response.data.dataList
        }
      })
    },
    methodDialogOpen () {
      // 打开创建界面
      this.dialogShow = true
      this.dialogTitle = this.$t('message.titleCreate').format(this.$t('message.menuInfo.title'))
      this.dialogStatus = this.commonConstants.operation.create
      this.dialogCreate = {menuIcon: 'ali-iot-icon-icon_yingyongguanli'}
      // this.dialogCreate.menuType = 'BRANCH'
      // this.dialogCreate.parentId = 10
    },
    methodDialogOpenWithSave () {
      this.$refs['dialogCreate'].validate((valid) => {
        if (valid) {
          console.info('校验通过！')
          this.dialogCreate.profile = this.userInfo.profile
          this.dialogCreate.locale = this.userInfo.locale
          this.methodDialogSave(this.commonConstants.operation.create)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    methodDialogSave (val) {
      let quest = null
      let url = null
      let param = null
      let alt = null
      switch (val) {
        case this.commonConstants.operation.create:
          quest = this.$t('message.alert.createQuestion')
          url = this.commonConstants.url.addMenuInfo
          param = this.dialogCreate
          alt = this.$t('message.alert.createSuccess')
          break
        case this.commonConstants.operation.update:
          quest = this.$t('message.alert.updateQuestion')
          url = this.commonConstants.url.editMenuInfo
          param = this.dialogData
          alt = this.$t('message.alert.updateSuccess')
          break
        case this.commonConstants.operation.delete:
          quest = this.$t('message.alert.deleteQuestion')
          url = this.commonConstants.url.removeMenuInfo
          param = this.dialogData
          alt = this.$t('message.alert.deleteSuccess')
          break
      }
      this.$confirm(quest, this.$t('message.msgWarn'), {type: 'warning'}
      ).then(() => {
        this.axios.post(url, param, this.headers
        ).then((response) => {
          let status = response.data.status
          let code = response.data.code
          if (status === this.commonConstants.status.success) {
            if (val === this.commonConstants.operation.create) {
              this.methodDialogClose()
            }
            this.$alert(alt, this.$t('message.msgTips'), {type: 'success'})
            this.methodTreeList()
          } else {
            this.$alert(this.$t('message.' + code), this.$t('message.msgWarn'), {type: 'warning'})
          }
        })
      }).catch(() => {
        console.info(val, `用户放弃了菜单的操作！`)
      })
    },
    methodDialogReset () {
      if (this.dialogStatus === this.commonConstants.operation.create) {
        // 重置新增的用户数据
        this.dialogCreate = {}
      } else {
        // 重置修改的用户数据
        // let json = JSON.stringify(this.currentRow)
        // this.dialogData = JSON.parse(json)
      }
    },
    methodDialogClose () {
      this.dialogShow = false
      this.$refs['dialogCreate'].resetFields()
    },
    methodDialogDelete () {
      this.$confirm(this.$t('message.alert.deleteQuestion'), this.$t('message.msgWarn'), {type: 'warning'}
      ).then(() => {
        this.currentRow.profile = this.userInfo.profile
      }).catch(() => {
        console.info(`用户放弃了删除操作！`)
      })
    },
    handleSizeChange (val) {
      this.parameter.profile.pageSize = val
      this.methodPageList()
      console.info(this.pageName + `【handleSizeChange函数-每页 ${val} 条】`)
    },
    handleCurrentChange (val) {
      this.parameter.profile.pageNum = val
      this.methodPageList()
      console.info(this.pageName + `【handleCurrentChange函数-当前页: ${val}】`)
    }
  }
}
</script>

<style>
.menu-batton-style {
  margin: 20px 20px 20px 20px;
  text-align: center;
}
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    color: #FFFFFF;
    background-color: #409EFF;
}
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content>.el-tree-node__label {
    font-size: 16px;
}
</style>
