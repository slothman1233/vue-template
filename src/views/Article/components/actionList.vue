<!--
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-06-01 11:27:41
 * @LastEditTime: 2020-06-01 15:43:39
-->
<template>
  <el-dialog title="功能列表" :visible.sync="v_show" :before-close="beforeClose">
    <el-table :data="actionList" border>
      <el-table-column align="center" label="功能名">
        <template slot-scope="{ row }">
          <el-input v-model="row.actionName"></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="moduleId" label="模块ID"></el-table-column>
      <el-table-column align="center" prop="menuId" label="菜单ID" width="80px"> </el-table-column>
      <el-table-column align="center" prop="icon" label="图标">
        <template slot-scope="{ row }">
          <el-input v-model="row.icon"></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="weight" label="权重排序" width="80px">
        <template slot-scope="{ row }">
          <el-input v-model="row.weight"></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否启用">
        <template slot-scope="{ row }">
          <el-switch v-model="row.isEnabled"></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="{ row }">
          <el-button type="primary" size="small" @click="saveUpdate(row)">更新</el-button>
          <el-button type="danger" size="small" @click="delAction(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script lang="ts">
import { Component, PropSync, Mixins } from 'vue-property-decorator'
import { dialogOutShow, dialogBackup } from '@/common/mixins/tool.mixin'
import { deleteAction, editAction } from '@/common/services/ActionService'
const DialogOutShow = dialogOutShow()
const DialogBackup = dialogBackup('actionList')
const BaseDialog = Mixins(DialogOutShow,DialogBackup)
@Component({
  name: 'ActionList',
})
export default class ActionList extends BaseDialog {
  @PropSync('actions', {
    default: () => [],
  })
  actionList!: Array<any>

  async saveUpdate(row) {
    row.editLoading = true
    const res = await editAction(row)
    row.editLoading = false
    if (!res) return
    this.$message.success('保存成功')
  }

  async delAction(row) {
    const confirm = await this.$confirm(`确认删除${row.actionName}此功能吗?`).catch(e => e)
    if (confirm === 'cancel') return
    const res = await deleteAction(row)
    if (!res) return
    this.$message.success('删除成功')
  }
}
</script>

<style scoped lang="scss"></style>
