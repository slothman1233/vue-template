<template>
  <el-dialog title="用户信息" :visible.sync="v_show">

  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { dialogOutShow } from '@/common/mixins/tool.mixin'

const Dialog = dialogOutShow()
@Component({
  name: 'ViewInfoDialog',
})
export default class ViewInfoDialog extends Dialog {
  @Prop()
  info!: any
}
</script>

<style scoped lang="scss"></style>
