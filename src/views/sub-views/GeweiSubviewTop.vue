<template>
    <div id="GeweiSubviewTop">
        <el-row>
            <el-col :span="24">
                <div class="home-subView-top-style">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item><span class="home-subView-font-style"><i class="ali-iot-icon-ditu-dibiao"></i></span></el-breadcrumb-item>
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
  name: 'GeweiSubviewTop',
  props: ['userInfo', 'headers'],
  data () {
    return {
      menuLevelObject: {}
    }
  },
  mounted () {
    this.getMenuLevelObject()
  },
  methods: {
    getMenuLevelObject () {
      let letThis = this
      let mlo = this.$store.getters['commonModule/getMenuLevelObject']
      if (!mlo.one) {
        console.info(`顶部面包屑延迟获取`)
        setTimeout(function () {
          letThis.getMenuLevelObject()
        }, 1000)
      } else {
        this.menuLevelObject = mlo
      }
    }
  }
}
</script>
