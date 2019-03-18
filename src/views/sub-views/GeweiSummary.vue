<template>
  <div id="GeweiSummary">
    <!-- 顶行 -->
    <gewei-subview-top></gewei-subview-top>
    <el-row>
      <el-col :span="24">
        <div>
          <h3>&emsp;&emsp;武汉正维电子技术有限公司成立于2003年，是一家专注于射频技术、移动通信产品研发、生产、销售及服务的高新技术企业。产品包括移动通信功率放大器，射频拉远单元，TETRA专网设备，网络优化设备，物联网(IoT)解决方案，微功率，小功率无线通信自组网模块等设计，生产和销售服务等。
            公司获得ISO9001质量管理体系认证、ISO14001环境管理体系认证，2013年通过OHSAS18001职业健康安全体系和安全生产体系认证。2012年公司导入ERP(SAP)系统，2013年第三季度启动了基于IPD高效研发管理体系认证、2014年通过了CMMI3认证。
            公司自成立以来，正维人秉承“对事负责，心态平和；专业精神，成就他人；系统思维，团队运作”的管理理念，依靠为客户提供优质的产品和服务，为员工提供良好的工作和生活环境，为社会承担更多的企业责任．
          </h3>
          <el-button
            type="success"
            @click="aaa"
          >代码测试按钮</el-button>
        </div>
        <div>
          <el-transfer
            v-model="value1"
            :data="data1"
          ></el-transfer>
        </div>
      </el-col>
    </el-row>
    <!--底行-->
    <gewei-subview-bottom></gewei-subview-bottom>
  </div>
</template>

<script>
import GeweiSubViewTop from './GeweiSubViewTop.vue'
import GeweiSubViewBottom from './GeweiSubViewBottom.vue'
export default {
  props: ['userInfo', 'headers'],
  components: {
    'gewei-subview-top': GeweiSubViewTop,
    'gewei-subview-bottom': GeweiSubViewBottom
  },
  data () {
    return {
      data1: [],
      value1: [1, 4]
    }
  },
  mounted () {
    for (let i = 1; i < 11; i++) {
      let obj = {key: i, label: `备选项` + i}
      this.data1.push(obj)
    }
  },
  methods: {
    aaa () {
      console.info(window)
      let websocket = null
      var websocketAddress = 'ws://127.0.0.1:8080/xxx'
      // 判断当前浏览器是否支持WebSocket
      if ('WebSocket' in window) {
        console.info(111)
        websocket = new WebSocket(websocketAddress)
        console.info(websocket)
      } else {
        console.info('当前浏览器不支持WebSocket')
      }
      // 连接成功时的回调方法
      websocket.onopen = function (event) {
        console.log(event)
      }
      websocket.send(555)
    }
  }
}
</script>
