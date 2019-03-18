<template>
  <div id="GeweiPrivilege">
    <!-- 顶行 -->
    <gewei-subview-top></gewei-subview-top>
    <!--中间行-->
    <el-row>
      <el-col :span="24">
        <el-collapse v-model="activeNames">
          <el-collapse-item
            name="condition"
            style="margin: 0px 0px 3px 0px;"
          >
            <template slot="title">
              <div class="home-subView-collapseDiv">
                <i class="ali-iot-icon-chaxun"></i> {{$t('message.condition')}}</div>
            </template>
            <div class="home-subView-condition-style">
              <el-form
                label-width="160px"
                label-suffix="："
              >
                <el-row :gutter="gutterSize">
                  <el-col :span="9">
                    <el-form-item :label="$t('message.privilege.privilegeName')">
                      <el-input
                        v-model="parameter.privilegeName"
                        :placeholder="$t('message.privilege.namePlaceholder')"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col
                    :span="6"
                    :offset="9"
                  >
                    <div style="text-align: center;">
                      <el-button
                        type="primary"
                        size="mini"
                        icon="ali-iot-icon-yunhang"
                        @click="methodQuery"
                        round
                      >{{$t('message.select')}}</el-button>
                      <el-button
                        type="info"
                        size="mini"
                        icon="ali-iot-icon-shangyibu1"
                        @click="methodReset"
                        round
                      >{{$t('message.reset')}}</el-button>
                    </div>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-collapse-item>
          <el-collapse-item name="result">
            <template slot="title">
              <div class="home-subView-collapseDiv">
                <i class="ali-iot-icon-biaodanzujian-biaoge1"></i> {{$t('message.result')}}</div>
            </template>
            <div class="home-subView-result-style">
              <el-table
                :data="tableData"
                @cell-click="methodTableClick"
                v-loading="tableLoading"
                :element-loading-text="$t('message.loading')"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                stripe
                border
                highlight-current-row
              >
                <el-table-column
                  prop="privilegeId"
                  label="ID"
                  v-if="columnShow"
                >
                </el-table-column>
                <el-table-column
                  type="index"
                  label="序号"
                  width="50"
                  v-if="columnShow"
                >
                </el-table-column>
                <el-table-column
                  :label="$t('message.line')"
                  width="70"
                >
                  <template slot-scope="scope">
                    <el-tag
                      type="info"
                      size="mini"
                      hit
                    >{{scope.row.itemIndex}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="contentValue"
                  :label="$t('message.privilege.privilegeName')"
                >
                </el-table-column>
                <el-table-column
                  prop="privilegeName"
                  :label="$t('message.langName')"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="contentDesc"
                  :label="$t('message.privilege.privilegeDesc')"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="privilegeDesc"
                  :label="$t('message.langDesc')"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column :label="$t('message.privilege.privilegeMatch')">
                  <template slot-scope="scope">
                    <el-tag
                      :type="scope.row.tagType"
                      size="mini"
                      hit
                    >{{scope.row.privilegeMatch}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="menuName"
                  :label="$t('message.menuInfo.menuName')"
                >
                </el-table-column>
                <el-table-column
                  prop="menuType"
                  :label="$t('message.menuInfo.menuType')"
                >
                </el-table-column>
                <el-table-column :label="$t('message.lastUpdateDate')">
                  <template slot-scope="scope">
                    {{ methodFormatDTS(scope.row.lastUpdateDate) }}
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('message.operation')"
                  width="120"
                >
                  <template slot-scope="scope">{{ scope.a }}
                    <el-dropdown
                      size="mini"
                      trigger="click"
                      @command="methodOperation"
                    >
                      <el-button
                        size="mini"
                        type="primary"
                      >{{$t('message.operationMore')}}
                        <i class="ali-iot-icon-xiajiantou"></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command="commonConstants.operation.create">
                          <el-button
                            size="mini"
                            type="success"
                            style="width: 100%"
                          ><i class="ali-iot-icon-chucun"></i>
                            {{$t('message.create')}}</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item :command="commonConstants.operation.delete">
                          <el-button
                            size="mini"
                            type="danger"
                            style="width: 100%"
                          ><i class="ali-iot-icon-shanchu"></i>
                            {{$t('message.delete')}}</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item :command="commonConstants.operation.update">
                          <el-button
                            size="mini"
                            type="warning"
                            style="width: 100%"
                          ><i class="ali-iot-icon-ceshishenqing"></i>
                            {{$t('message.update')}}</el-button>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="parameter.profile.pageNum"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="parameter.profile.pageSize"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalRows"
              >
              </el-pagination>
            </div>
          </el-collapse-item>
        </el-collapse>
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
      :before-close="methodDialogClose"
    >
      <!--对话框标签页选项卡-->
      <el-tabs
        v-model="dialogTabActive"
        tab-position="right"
      >
        <el-tab-pane
          label="数据信息"
          name="first"
        >
        <!--第一标签页：权限各属性表单-->
          <div class="home-subView-condition-style">
            <el-form
              label-width="120px"
              label-suffix="："
              :model="dialogData"
              ref="dialogData"
              :rules="dialogRules"
            >
              <el-row :gutter="gutterSize">
                <el-col :span="11">
                  <el-form-item
                    :label="$t('message.privilege.privilegeName')"
                    prop="privilegeName"
                  >
                    <el-select
                      v-model="dialogData.privilegeName"
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
                <el-col :span="11">
                  <el-form-item :label="$t('message.langName')">
                    <el-input
                      v-model="dialogData.privilegeName"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="gutterSize">
                <el-col :span="11">
                  <el-form-item
                    :label="$t('message.privilege.privilegeDesc')"
                    prop="privilegeDesc"
                  >
                    <el-select
                      v-model="dialogData.privilegeDesc"
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
                <el-col :span="11">
                  <el-form-item :label="$t('message.langDesc')">
                    <el-input
                      v-model="dialogData.privilegeDesc"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="gutterSize">
                <el-col :span="11">
                  <el-form-item
                    :label="$t('message.menuInfo.menuName')"
                    prop="menuName"
                  >
                    <el-input
                      v-model="dialogData.menuName"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-button
                    type="success"
                    @click="methodMenuChoose"
                  >菜单选择...</el-button>
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
        </el-tab-pane>
        <el-tab-pane
          label="菜单选择"
          name="second"
        >
        <!--第二标签页：菜单穿梭框-->
        <el-tag type="danger">注意：目前本系统仅支持一个权限匹配一个菜单（多个匹配或不匹配均不支持），请注意选择！</el-tag>
          <el-row>
            <el-col
              :span="18"
              :gutter="gutterSize"
            >
              <div class="home-subView-condition-style">
                <el-transfer
                  v-model="menuTarget"
                  :titles="['待选择的菜单', '已选择的菜单']"
                  :data="menuList"
                ></el-transfer>
              </div>
            </el-col>
            <el-col
              :span="6"
              :gutter="gutterSize"
            >
              <el-button type="success" :disabled="menuButtonStatus" @click="methodConfirmMenu">确定选择</el-button>
            </el-col>
          </el-row>

        </el-tab-pane>
      </el-tabs>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          size="mini"
          @click="methodDialogSaveWithValid"
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
  name: 'GeweiPrivilege',
  props: ['userInfo', 'headers'],
  components: {
    'gewei-subview-top': GeweiSubViewTop,
    'gewei-subview-bottom': GeweiSubViewBottom
  },
  data () {
    return {
      logger: `【权限管理子页面】`,
      roleList: [],
      activeNames: ['condition', 'result'], // 折叠面板名称数组
      collapse: true, // 自动折叠功能开关
      gutterSize: 10, // 布局间距
      parameter: {
        profile: this.userInfo.profile,
        locale: this.userInfo.locale,
        privilegeName: null
      },
      tableData: [], // 表格数组
      columnShow: false, // 表格隐藏列开关
      tableLoading: true, // 表格的加载开关
      dateTimeRange: [], // 日期选择插件值数组
      currentRow: {}, // 当前行
      totalRows: 0, // 总行数
      dialogShow: false, // 对话框显示开关
      dialogTitle: null, // 对话框标题
      nameList: [],
      descList: [],
      dialogTabActive: 'first',
      dialogData: {}, // 对话框数据对象
      menuTarget: [], // 穿梭框中的目标数据
      menuList: [], // 符合穿梭框数据格式的菜单列表
      menuButtonStatus: false,
      dialogRules: {
        privilegeName: [
          {required: true, message: '请选择一个权限名称', trigger: 'change'}
        ],
        privilegeDesc: [
          {required: true, message: '请选择一个权限描述', trigger: 'change'}
        ],
        menuName: [
          { required: true, message: '请选择一个此权限匹配的菜单', trigger: 'change' }
        ]
      } // 各校验对象名称要和参数名称一致
    }
  },
  mounted: function () {
    let log = `【用户信息管理页面之mounted函数】`
    this.axios.post(this.commonConstants.url.findRoleList, {locale: this.userInfo.locale}, this.headers
    ).then((response) => {
      console.info(log + '【打印角色下拉列表数据】', response.data.dataList)
      this.roleList = response.data.dataList
    })
    this.methodPageList()
  },
  watch: {
    dateTimeRange (val) {
      let log = `【用户信息管理页面watch之dateTimeRange方法】`
      console.info(log, val)
    },
    menuTarget (val) {
      let leng = this.menuTarget.length
      this.menuButtonStatus = leng !== 1
    }
  },
  methods: {
    methodFormatDTS (val) {
      return formatDateTimeString(val, 'DTS')
    },
    methodPageList () {
      // 分页查询方法
      this.axios.post(this.commonConstants.url.privilegePageList, this.parameter, this.headers
      ).then((response) => {
        let result = response.data.pageList
        result.list.forEach((item, index) => {
          item.itemIndex = (this.parameter.profile.pageNum - 1) * this.parameter.profile.pageSize + index + 1
          let mid = parseInt(item.menuId)
          if (mid > 0) {
            item.privilegeMatch = this.$t('message.matched')
            item.tagType = 'success'
          } else {
            item.privilegeMatch = this.$t('message.matchno')
            item.tagType = 'danger'
          }
        })
        console.info(`【权限子页面之methodPageList函数】【打印权限分页查询数据】`, result)
        this.totalRows = result.total
        this.tableData = result.list
        this.tableLoading = false
      })
    },
    methodQuery () {
      // 查询按钮功能
      if (this.collapse) {
        console.info('不折叠查询条件面板')
      } else {
        let array = this.activeNames
        for (let index = 0; index < array.length; index++) {
          const element = array[index]
          if (element === 'condition') {
            this.activeNames.splice(index, 1)
          }
        }
      }
      this.methodPageList()
    },
    methodReset () {
      // 重置按钮功能
      this.userInfo.profile.pageNum = 1
      this.userInfo.profile.pageSize = 10
      this.parameter = {
        profile: this.userInfo.profile,
        locale: this.userInfo.locale,
        privilegeName: null
      }
    },
    methodTableClick (row, column, cell, event) {
      // 获取当前行
      this.currentRow = row
    },
    methodOperation (command) {
      // 操作下拉菜单
      switch (command) {
        case this.commonConstants.operation.create:
          this.dialogStatus = this.commonConstants.operation.create
          this.methodDialogOpen()
          break
        case this.commonConstants.operation.update:
          this.dialogStatus = this.commonConstants.operation.update
          this.methodDialogOpen()
          break
        case this.commonConstants.operation.delete:
          this.methodDialogDelete()
          break
      }
    },
    methodDialogOpen () {
      // 对话框打开之前，先从后台请求数据
      this.methodI18nList('PRIVILEGE-NAME')
      this.methodI18nList('PRIVILEGE-DESC')
      if (this.dialogStatus === this.commonConstants.operation.create) {
        // 打开创建界面
        this.dialogTitle = this.$t('message.titleCreate').format(this.$t('message.privilege.title'))
        this.dialogData = {}
      } else {
        // 打开编辑界面
        this.dialogTitle = this.$t('message.titleUpdate').format(this.$t('message.privilege.title'))
        let json = JSON.stringify(this.currentRow)
        this.dialogData = JSON.parse(json)
        console.info(`ggggggggg`, this.dialogData)
      }
      // 由于要和对话框数据做比对，因此放在后面执行
      this.methodMenuList(this.dialogStatus)
      this.dialogShow = true
    },
    methodI18nList (flag) {
      // 动态获取权限相关的国际化数据
      let param = {typeCode: this.userInfo.locale, contentGroup: flag}
      this.axios.post(this.commonConstants.url.languageFind, param, this.headers
      ).then((response) => {
        console.info(`【权限子页面之methodI18nList函数】【打印权限相关的国际化数据】`, response.data.dataList)
        if (flag === 'PRIVILEGE-NAME') {
          this.nameList = response.data.dataList
        } else {
          this.descList = response.data.dataList
        }
      })
    },
    methodMenuList (val) {
      this.axios.post(this.commonConstants.url.menuFind, {locale: this.userInfo.locale}, this.headers
      ).then((response) => {
        let result = response.data.dataList
        this.menuList = []
        result.forEach((item, index) => {
          // 借用上级ID属性传递是否匹配的字段：所有小于0的都是未匹配的
          let pid = parseInt(item.parentId)
          let bool = (pid > 0)
          // if (val === this.commonConstants.operation.update && item.menuId === this.dialogData.menuId) {
          //   bool = false
          //   this.menuTarget = []
          //   this.menuTarget.push(item.menuId)
          //   console.info(val, this.menuTarget)
          // } else {
          //   this.menuTarget = []
          // }
          let obj = {key: item.menuId, label: item.contentValue, disabled: bool}
          this.menuList.push(obj)
        })
        console.info(`【权限子页面之methodMenuList函数】【打印权限和菜单匹配相关的数据】`, this.menuList)
      })
    },
    methodMenuChoose () {
      console.info('菜单选择。。。')
      this.dialogTabActive = 'second'
    },
    methodConfirmMenu () {
      let mid = this.menuTarget[0]
      this.menuList.forEach(i => {
        if (i.key === mid) {
          this.dialogData.menuId = mid
          this.dialogData.menuName = i.label
        }
      })
      this.dialogTabActive = 'first'
      console.info('确认菜单。。。', mid)
    },
    methodDialogSaveWithValid () {
      // 先校验表单数据
      this.$refs['dialogData'].validate((valid) => {
        if (valid) {
          console.info('校验通过！')
          this.methodDialogSave(this.dialogStatus)
        } else {
          console.log('表单数据校验未通过！')
          return false
        }
      })
    },
    methodDialogSave () {
      this.dialogData.profile = this.userInfo.profile
      let url = null
      let msg = null
      if (this.dialogStatus === this.commonConstants.operation.create) {
        url = this.commonConstants.url.privilegeAdd
        msg = this.$t('message.alert.createSuccess')
      } else {
        // 保存修改的用户数据
        url = this.commonConstants.url.privilegeEdit
        msg = this.$t('message.alert.updateSuccess')
      }
      this.axios.post(url, this.dialogData, this.headers
      ).then((response) => {
        let status = response.data.status
        let code = response.data.code
        if (status === this.commonConstants.status.success) {
          this.$alert(msg, this.$t('message.msgTips'), {type: 'success'})
          this.methodDialogClose()
          this.methodPageList()
          this.dialogData = {}
          this.menuTarget = []
        } else {
          this.$alert(this.$t('message.' + code), this.$t('message.msgWarn'), {type: 'warning'})
        }
      })
    },
    methodDialogReset () {
      if (this.dialogStatus === this.commonConstants.operation.create) {
        // 重置新增的用户数据
        this.dialogData = {}
      } else {
        // 重置修改的用户数据
        let json = JSON.stringify(this.currentRow)
        this.dialogData = JSON.parse(json)
      }
    },
    methodDialogClose () {
      console.info(this.logger + `关闭对话框`)
      this.dialogShow = false
      this.menuTarget = []
      this.$refs['dialogData'].resetFields()
    },
    methodDialogDisable () {
      this.$confirm(this.$t('message.alert.disableQuestion'), this.$t('message.msgWarn'), {type: 'warning'}
      ).then(() => {
        this.currentRow.profile = this.userInfo.profile
        this.axios.post(this.commonConstants.url.disableUserInfo, this.currentRow, this.headers
        ).then((response) => {
          this.$alert(this.$t('message.alert.disableSuccess'), this.$t('message.msgTips'), {type: 'success'})
          this.methodPageList()
        })
      }).catch(() => {
        console.info(`用户放弃了禁用操作！`)
      })
    },
    handleSizeChange (val) {
      this.parameter.profile.pageSize = val
      this.methodPageList()
      let log = `【用户信息管理页面之handleSizeChange函数】`
      console.info(log + `【每页 ${val} 条】`)
    },
    handleCurrentChange (val) {
      this.parameter.profile.pageNum = val
      this.methodPageList()
      let log = `【用户信息管理页面之handleSizeChange函数】`
      console.info(log + `【当前页: ${val}】`)
    }
  }
}
</script>

<style>
.el-table__body tr.current-row>td {
  background: rgba(185, 221, 249, .75)!important;
}
</style>
