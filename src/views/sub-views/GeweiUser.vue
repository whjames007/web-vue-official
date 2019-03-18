<template>
  <div id="GeweiUser">
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
                    <el-form-item :label="$t('message.createDate')">
                      <el-date-picker
                        style="width: 100%"
                        v-model="dateTimeRange"
                        type="datetimerange"
                        align="left"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :start-placeholder="$t('message.beginDate')"
                        :end-placeholder="$t('message.endDate')"
                        :default-time="['00:00:00', '23:59:59']"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item :label="$t('message.userInfo.userAccount')">
                      <el-input
                        v-model="parameter.userAccount"
                        :placeholder="$t('message.userInfo.userAccountPlaceholder')"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
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
                <el-row :gutter="gutterSize">
                  <el-col :span="9">
                    <el-form-item :label="$t('message.userInfo.nickName')">
                      <el-input
                        v-model="parameter.nickName"
                        :placeholder="$t('message.userInfo.nickNamePlaceholder')"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item :label="$t('message.userInfo.roleName')">
                      <el-select
                        v-model="parameter.roleId"
                        clearable
                        :placeholder="$t('message.placeholder')"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="item in roleList"
                          :key="item.roleId"
                          :label="item.roleName"
                          :value="item.roleId"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <div style="text-align: center;">
                      <el-switch
                        v-model="collapse"
                        active-color="#F56C6C"
                        inactive-color="#67C23A"
                        :active-text="$t('message.collapseManual')"
                        :inactive-text="$t('message.collapseAuto')"
                      >
                      </el-switch>
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
                  prop="userId"
                  label="用户id"
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
                  prop="userAccount"
                  :label="$t('message.userInfo.userAccount')"
                >
                </el-table-column>
                <el-table-column
                  prop="userPassword"
                  :label="$t('message.userInfo.userPassword')"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="nickName"
                  :label="$t('message.userInfo.nickName')"
                >
                </el-table-column>
                <el-table-column
                  prop="userStatus"
                  :label="$t('message.userInfo.userStatus')"
                >
                </el-table-column>
                <el-table-column
                  prop="userEmail"
                  :label="$t('message.userInfo.userEmail')"
                >
                </el-table-column>
                <el-table-column
                  prop="contentValue"
                  :label="$t('message.userInfo.roleName')"
                >
                </el-table-column>
                <el-table-column :label="$t('message.firstCreateDate')">
                  <template slot-scope="scope">
                    {{ methodFormatDTS(scope.row.firstCreateDate) }}
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
                        <el-dropdown-item :command="commonConstants.operation.disable">
                          <el-button
                            size="mini"
                            type="danger"
                            style="width: 100%"
                          ><i class="ali-iot-icon-shanchu"></i>
                            {{$t('message.disable')}}</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item :command="commonConstants.operation.update">
                          <el-button
                            size="mini"
                            type="warning"
                            style="width: 100%"
                          ><i class="ali-iot-icon-ceshishenqing"></i>
                            {{$t('message.update')}}</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item :command="commonConstants.operation.init">
                          <el-button
                            size="mini"
                            type="primary"
                            style="width: 100%"
                          ><i class="ali-iot-icon-xiaoxi"></i>
                            {{$t('message.init')}}</el-button>
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
    >
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
                :label="$t('message.userInfo.userAccount')"
                prop="userAccount"
              >
                <el-input v-model="dialogData.userAccount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item :label="$t('message.userInfo.userPassword')">
                <el-input
                  v-model="dialogData.userPassword"
                  :disabled="dialogDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="gutterSize">
            <el-col :span="11">
              <el-form-item
                :label="$t('message.userInfo.nickName')"
                prop="nickName"
              >
                <el-input v-model="dialogData.nickName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item
                :label="$t('message.userInfo.userEmail')"
                prop="userEmail"
              >
                <el-input v-model="dialogData.userEmail"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="gutterSize">
            <el-col :span="11">
              <el-form-item
                :label="$t('message.userInfo.roleName')"
                prop="roleId"
              >
                <el-select
                  v-model="dialogData.roleId"
                  clearable
                  :placeholder="$t('message.placeholder')"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in roleList"
                    :key="item.roleId"
                    :label="item.roleName"
                    :value="item.roleId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item
                :label="$t('message.userInfo.userStatus')"
                prop="userStatus"
              >
                <el-input
                  v-model="dialogData.userStatus"
                  disabled
                ></el-input>
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
          @click="methodDialogSave"
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
  name: 'GeweiUser',
  props: ['userInfo', 'headers'],
  components: {
    'gewei-subview-top': GeweiSubViewTop,
    'gewei-subview-bottom': GeweiSubViewBottom
  },
  data () {
    return {
      roleList: [],
      activeNames: ['condition', 'result'], // 折叠面板名称数组
      collapse: false, // 自动折叠功能开关
      gutterSize: 10, // 布局间距
      parameter: {
        profile: this.userInfo.profile,
        locale: this.userInfo.locale,
        userAccount: null,
        userPassword: null,
        nickName: null,
        roleId: null
      },
      tableData: [], // 表格数组
      columnShow: false, // 表格隐藏列开关
      tableLoading: true, // 表格的加载开关
      dateTimeRange: [], // 日期选择插件值数组
      currentRow: {}, // 当前行
      totalRows: 0, // 总行数
      dialogShow: false, // 对话框显示开关
      dialogTitle: null, // 对话框标题
      dialogDisabled: true,
      dialogData: {}, // 对话框数据对象
      dialogRules: {
        userAccount: [
          {required: true, message: '请输入用户的账号', trigger: 'blur'}
        ],
        nickName: [
          {required: true, message: '请输入用户的昵称', trigger: 'blur'}
        ],
        userEmail: [
          {required: true, type: 'email', message: '请输入用户的合法邮箱地址', trigger: 'change'}
        ],
        roleId: [
          { required: true, message: '请选择用户的角色', trigger: 'change' }
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
      if (val && val.length > 1) {
        let begin = val[0]
        let end = val[1]
        this.parameter.beginDate = formatDateTimeString(begin, 'STD')
        this.parameter.endDate = formatDateTimeString(end, 'STD')
        // console.info(log, this.parameter.beginDate, this.parameter.endDate)
      }
    }
  },
  methods: {
    methodFormatDTS (val) {
      return formatDateTimeString(val, 'DTS')
    },
    methodPageList () {
      // 分页查询方法
      this.axios.post(this.commonConstants.url.pageUserList, this.parameter, this.headers
      ).then((response) => {
        let result = response.data.pageList
        result.list.forEach((item, index) => {
          item.itemIndex = (this.parameter.profile.pageNum - 1) * this.parameter.profile.pageSize + index + 1
        })
        console.info(`【用户信息管理页面之methodPageList函数】【打印用户信息分页查询数据】`)
        console.info(result)
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
        userAccount: null,
        roleId: null
      }
      this.dateTimeRange = []
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
        case this.commonConstants.operation.disable:
          this.methodDialogDisable()
          break
        case this.commonConstants.operation.update:
          this.dialogStatus = this.commonConstants.operation.update
          this.methodDialogOpen()
          break
        case this.commonConstants.operation.init:
          this.methodDialogInit()
          break
      }
    },
    methodDialogOpen () {
      if (this.dialogStatus === this.commonConstants.operation.create) {
        // 打开创建界面
        this.dialogDisabled = false
        this.dialogTitle = this.$t('message.titleCreate').format(this.$t('message.userInfo.title'))
        this.dialogData.userStatus = this.commonConstants.operation.enable
      } else {
        // 打开编辑界面
        this.dialogDisabled = true
        this.dialogTitle = this.$t('message.titleUpdate').format(this.$t('message.userInfo.title'))
        let json = JSON.stringify(this.currentRow)
        this.dialogData = JSON.parse(json)
      }
      this.dialogShow = true
    },
    methodDialogSave () {
      this.dialogData.profile = this.userInfo.profile
      if (this.dialogStatus === this.commonConstants.operation.create) {
        // 保存新增的用户数据
        if (!this.dialogData.userPassword) {
          this.dialogData.userPassword = '123456'
        }
        this.axios.post(this.commonConstants.url.addUserInfo, this.dialogData, this.headers
        ).then((response) => {
          let status = response.data.status
          let code = response.data.code
          if (status === this.commonConstants.status.success) {
            this.$alert(this.$t('message.alert.createSuccess'), this.$t('message.msgTips'), {type: 'success'})
            this.methodDialogClose()
            this.methodPageList()
            this.dialogData = {}
          } else {
            this.$alert(this.$t('message.' + code), this.$t('message.msgWarn'), {type: 'warning'})
          }
        })
      } else {
        // 保存修改的用户数据
        this.axios.post(this.commonConstants.url.editUserInfo, this.dialogData, this.headers
        ).then((response) => {
          let status = response.data.status
          let code = response.data.code
          if (status === this.commonConstants.status.success) {
            this.$alert(this.$t('message.alert.updateSuccess'), this.$t('message.msgTips'), {type: 'success'})
            this.methodDialogClose()
            this.methodPageList()
            this.dialogData = {}
          } else {
            let content = this.$t('message.' + code).format(this.dialogData.userAccount)
            this.$alert(content, this.$t('message.msgWarn'), {type: 'warning'})
          }
        })
      }
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
      this.dialogShow = false
      this.dialogDisabled = false
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
    methodDialogInit () {
      this.$confirm(this.$t('message.alert.userInitQuestion'), this.$t('message.msgWarn'), {type: 'warning'}
      ).then(() => {
        this.currentRow.profile = this.userInfo.profile
        this.axios.post(this.commonConstants.url.initUserInfo, this.currentRow, this.headers
        ).then((response) => {
          this.$alert(this.$t('message.alert.userInitSuccess'), this.$t('message.msgTips'), {type: 'success'})
          this.methodPageList()
        })
      }).catch(() => {
        console.info(`用户放弃了初始化操作！`)
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
