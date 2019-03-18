<template>
  <div id="GeweiSuggestion">
    <el-row>
      <el-col :span="24">
        <div class="home-subView-top-style">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <template v-for="(item, index) in menuNameArray">
              <el-breadcrumb-item :key="index">
                <span class="home-subView-font-style">{{item}}</span>
              </el-breadcrumb-item>
            </template>
          </el-breadcrumb>
        </div>
      </el-col>
    </el-row>
    <div style="text-align:center;">
    <el-row>
      <el-col :span="12" :push=numPush>
        <el-input type="text" v-model="suggestionInfoWhat.suggestionName" placeholder="请输入标题"></el-input>
      </el-col>
    </el-row>
    <hr class="hr">
    <br>
    <el-row>
      <el-col :span="12" :push=numPush>
        <el-input type="textarea" :rows="5" v-model="suggestionInfoWhat.suggestionContent" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col>
        <el-button type="success" @click="addComment()">发表意见</el-button>
        <el-button type="success" @click="resetComment">重置</el-button>
      </el-col>
    </el-row>
    </div>
    <hr class="hr">
    <br>
    <br>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="suggestTable"
      style="width: 100%">
       <el-table-column
       v-if="showId"
        prop="suggestionId"
        label="建议id"
        width="180">
      </el-table-column>
      <el-table-column
       v-if="showId"
        prop="suggestionStatus"
        label="建议状态"
        width="180">
      </el-table-column>
      <el-table-column
        prop="nickName"
        label="用户"
        width="90">
      </el-table-column>
      <el-table-column
        prop="suggestionDate"
        label="评论时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="suggestionName"
        label="评论标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="suggestionContent"
        label="评论内容">
      </el-table-column>
      <el-table-column>
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="success"
          icon="el-icon-edit"
          round
          @click="showAnswer(scope.$index, scope.row)">回复</el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          round
          @click="deleteAnswer(scope.$index, scope.row)">删除</el-button>
          <el-button
          size="mini"
          type="success"
          icon="el-icon-edit"
          round
          @click="showComments(scope.$index, scope.row)">查看评论</el-button>
          <el-button v-if="showCloseComment"
          size="mini"
          type="success"
          icon="el-icon-edit"
          round
          @click="closeComments(scope.$index, scope.row)">关闭评论</el-button>
      </template>
      </el-table-column>
    </el-table>

<div class="block parent">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalRows">
    </el-pagination>
  </div>

      <el-dialog title="评论区" :visible.sync="dialogTableVisible">
  <el-table :data="answerTable">
    <el-table-column property="nickName" label="回复人" width="150"></el-table-column>
    <el-table-column property="answerDate" label="日期" width="200"></el-table-column>
    <el-table-column property="answerContent" label="内容"></el-table-column>
  </el-table>
</el-dialog>
  <el-dialog title="回复内容" :visible.sync="dialogCommentVisible">
   <el-row>
      <el-col >
        <el-input type="text" v-model="suggestionAnswer.answerContent" placeholder="请输入回复内容"></el-input>
      </el-col>
    </el-row>
     <br>
      <el-col>
        <el-button
          size="mini"
          type="success"
          icon="el-icon-edit"
          round
          @click="addAnswer()">回复</el-button>
      </el-col>
</el-dialog>
    <el-row>
      <el-col :span="24">
        <div class="home-subView-top-style">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <template v-for="(item, index) in menuNameArray">
              <el-breadcrumb-item :key="index">
                <span class="home-subView-font-style">{{item}}</span>
              </el-breadcrumb-item>
            </template>
          </el-breadcrumb>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'GeweiSuggestion',
  data () {
    return {
      loading: true,
      currentPage: 1,
      pageSize: 10,
      totalRows: 0,
      showCloseComment: false,
      numPush: 6,
      showId: false,
      dialogTableVisible: false,
      dialogCommentVisible: false,
      commentShow: false,
      show: false,
      userInfo: {
        userAccount: '张三'
      },
      suggestionAnswer: {
        suggestionId: '',
        answerUserId: '',
        answerContent: ''
      },
      suggestionInfo: {
        suggestionDate: '2017-08-12 14:02:33',
        suggestionName: '',
        suggestionType: '测试类型',
        suggestionContent: '测试内容'
      },
      suggestionInfoWhat: {
        suggestionId: '',
        suggestionName: '',
        suggestionType: '',
        suggestionContent: '',
        suggestionStatus: ''
      },
      suggestTable: [],
      answerTable: [],
      msg: '页面建设中。。。'
    }
  },
  beforeCreate () {
    this.menuNameArray = this.$store.getters['commonModule/getMenuNameArray']
  },
  mounted: function () {
    this.suggestionList()
  },
  methods: {
    suggestionList () {
      let userInfo = this.$store.getters['commonModule/getUserInfo']
      let url = this.$store.getters['urlModule/getSuggestionList']
      userInfo.profile.pageSize = this.pageSize
      userInfo.profile.pageNum = this.currentPage
      if (userInfo.roleId === 1) {
        url = this.$store.getters['urlModule/getSuggestionAllList']
        this.showCloseComment = true
      }
      console.info('开始page------------------')
      console.info(url)
      this.axios.post(url, userInfo, {
        headers: {
          'Authorization': userInfo.authorization
        }
      }).then((response) => {
        let result = response.data.pageList
        result.list.forEach((item, index) => {
          let date1 = item.suggestionDate
          item.suggestionDate = date1
        })
        this.suggestTable = result.list
        this.totalRows = result.total
        this.loading = false
      })
    },
    showComments (index, row) {
      this.dialogTableVisible = true
      let userInfo = this.$store.getters['commonModule/getUserInfo']
      let url = this.$store.getters['urlModule/getSuggestionAnswerList']
      console.info('开始了回复评论------------------')
      this.suggestionAnswer.suggestionId = row.suggestionId
      console.info(url)
      this.axios.post(url, this.suggestionAnswer, {
        headers: {
          'Authorization': userInfo.authorization
        }
      }).then((response) => {
        let result = response.data.dataList
        result.forEach((item, index) => {
          let date1 = item.answerDate
          item.answerDate = date1
        })
        this.answerTable = result
      })
    },
    addComment () {
      let userInfo = this.$store.getters['commonModule/getUserInfo']
      let addCommentUrl = this.$store.getters['urlModule/getAddSuggestionInfo']
      this.suggestionInfoWhat.suggestUserId = userInfo.userId
      this.axios.post(addCommentUrl, this.suggestionInfoWhat, {
        headers: {
          'Authorization': userInfo.authorization
        }
      }).then((response) => {
        this.$message({
          type: 'success',
          message: '您已评论成功！'
        })
        this.suggestionList()
        this.resetComment()
      })
    },
    showAnswer (index, row) {
      let status = row.suggestionStatus
      if (status === 'OPEN') {
        this.dialogCommentVisible = true
        this.suggestionInfoWhat.suggestionId = row.suggestionId
      }
      if (status === 'CLOSE') {
        this.$message({
          type: 'warning',
          message: '您的意见已被管理员关闭，目前不能回复！'
        })
      }
    },
    addAnswer () {
      let userInfo = this.$store.getters['commonModule/getUserInfo']
      let url = this.$store.getters['urlModule/getAddsuggestionAnswer']
      this.suggestionAnswer.suggestionId = this.suggestionInfoWhat.suggestionId
      this.suggestionAnswer.answerUserId = userInfo.userId
      this.axios.post(url, this.suggestionAnswer, {
        headers: {
          'Authorization': userInfo.authorization
        }
      }).then((response) => {
        this.$message({
          type: 'success',
          message: '您已回复评论成功！'
        })
        this.suggestionList()
        this.resetComment()
        this.dialogCommentVisible = false
      })
    },
    deleteAnswer (index, row) {
      let userInfo = this.$store.getters['commonModule/getUserInfo']
      let url = this.$store.getters['urlModule/getDeleteSuggestionInfo']
      this.suggestionInfoWhat.suggestionId = row.suggestionId
      this.axios.post(url, this.suggestionInfoWhat, {
        headers: {
          'Authorization': userInfo.authorization
        }
      }).then((response) => {
        this.$message({
          type: 'success',
          message: '您已删除评论成功！'
        })
        this.suggestionList()
      })
    },
    closeComments (index, row) {
      let suggestionId = row.suggestionId
      let suggestionStatus = 'CLOSE'
      let suggestionInfo = {'suggestionId': suggestionId, 'suggestionStatus': suggestionStatus}
      let userInfo = this.$store.getters['commonModule/getUserInfo']
      let url = this.$store.getters['urlModule/getEditSuggestionInfo']
      this.axios.post(url, suggestionInfo, {
        headers: {
          'Authorization': userInfo.authorization
        }
      }).then((response) => {
        this.$message({
          type: 'success',
          message: '您已关闭评论成功'
        })
        this.suggestionList()
      })
    },
    resetComment () {
      this.suggestionInfoWhat.suggestionContent = ''
      this.suggestionInfoWhat.suggestionName = ''
      this.suggestionAnswer.answerContent = ''
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.suggestionList()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.suggestionList()
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #F2F6FC;
  }
  .bg-purple {
    background: #F2F6FC;
  }
  .bg-purple-light {
    background: #F2F6FC;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    text-align: center
  }
</style>
