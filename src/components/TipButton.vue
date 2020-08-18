<!--
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-07-13 10:25:47
 * @LastEditTime: 2020-07-15 10:11:53
-->
<template>
  <el-tooltip :content="tipContent" placement="bottom">
    <el-button
      size="mini"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot />
    </el-button>
  </el-tooltip>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  name: 'TipButton',
})
export default class TipButton extends Vue {
  @Prop()
  tipContent!: string
}
</script>

<style scoped lang="scss"></style>
