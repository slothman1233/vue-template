<!--
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-06-01 09:34:39
 * @LastEditTime: 2020-06-01 17:00:52
-->
<template>
  <div class="action-preview">
    <div class="tag-box">
      <el-tag
        class="tag"
        v-for="({ actionName }, idx) in actionList.filter(action => action.isEnabled)"
        :key="idx"
        >{{ actionName }}</el-tag
      >
      <p class="empty" v-if="!actionList || !actionList.length">该菜单下暂无功能标签</p>
    </div>
    <div class="btn-box">
      <el-row>
        <el-button @click="actionTableShow = true">功能设置</el-button>
      </el-row>
      <el-row>
        <el-button @click="showAddDialog = true">添加功能</el-button>
      </el-row>
    </div>
    <ActionList
      :actions.sync="actionList"
      :show.sync="actionTableShow"
      @dialog-cancel="dialogCancel"
    ></ActionList>

    <AddAction :show.sync="showAddDialog" @update="$emit('update')"></AddAction>
  </div>
</template>

<script lang="ts">
import { Component, Vue, PropSync, Prop, Provide } from 'vue-property-decorator'
@Component({
  name: 'ActionPreview',
  components: {
    ActionList: () => import('./actionList.vue'),
    AddAction: () => import('./addAction.vue'),
  },
})
export default class ActionPreview extends Vue {
  @PropSync('actions', {
    default: () => [],
  })
  actionList!: Array<any>

  @Prop()
  index!: number
  @Prop()
  menu!: number

  @Provide()
  menuInfo = this.menu

  actionTableShow = false
  showAddDialog = false

  // 编辑弹窗取消后还原备份数据
  dialogCancel(data) {
    this.$emit('manually', { data, index: this.index })
  }
}
</script>

<style scoped lang="less">
.action-preview {
  .flex();
  flex: 1;
  box-sizing: border-box;
  border-left: 1px solid #ccc;
  align-items: stretch;
  align-self: stretch;
  .tag-box {
    padding: 0 20px;
    box-sizing: border-box;
    flex: 1;
    .flex(flex-start);
    flex-wrap: wrap;
    .empty {
      text-align: center;
      flex: 1;
    }
    .tag {
      margin-right: 10px;
    }
  }
  .btn-box {
    .flex(center);
    flex-direction: column;
    .el-row {
      margin-bottom: 10px;
    }
  }
}
</style>
