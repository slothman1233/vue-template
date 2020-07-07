<template>
  <div class="app-container">
    <el-button type="primary" @click="pageSomeAdd">新增栏目</el-button>
    <el-table
      :data="organizationList"
      :max-height="maxTableHeight || null"
      class="tb-box"
      border
      ref="table"
    >
      <el-table-column align="center" prop="organizationName" label="栏目顺序"></el-table-column>
      <el-table-column align="center" prop="organizationName" label="栏目名"></el-table-column>
      <el-table-column align="center" prop="organizationName" label="更新时间"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="{ row }">
          <el-button type="primary" size="small" @click="pageSomeEdit(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
       layout="prev, pager, next, total,jumper"
      :total="total"
      :page-size="pageSize"
      :current-page.sync="pageIndex"
      @current-change="getList"
      style="margin-top:20px;"
    >
    </el-pagination>
    <!-- 弹窗 -->
    <AddColumnDialog
      :show.sync="showAddDialog"
      :temp.sync="dialogTemp"
      :mode="dialogMode"
      @update="getList"
      @dialog-cancel="dialogCancel"
    />
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import AddColumnDialog from './components/add.vue'
import { getColumnListForPage, getColumnById, deleteColumn } from '@/common/services/ColumnService'
import PageSome from '@/common/mixins/page.mixin'
@Component({
  name: 'ColumnList',
  components: { AddColumnDialog },
})
export default class ColumnList extends PageSome {
  organizationList: Array<Column> = []

  async getList() {
    // 获取列表
    const res = await getColumnListForPage(this.pageParams)
    if (!res) return
    this.organizationList = res.bodyMessage?.items
    this.total = res.bodyMessage?.totalRecords || 0
  }
  // 删除
  async delColumn(organization: Column) {
    const confirm = await this.$confirm(`确定删除${organization.organizationName}吗？`).catch(
      e => e
    )
    if (confirm === 'cancel') return
    const res = await deleteColumn(organization)
    if (!res) return
    this.$message.success('操作成功')
    this.getList()
  }

  // 编辑弹窗取消后还原备份数据
  dialogCancel(data) {
    this.dialogTemp = false
    this.$set(this.organizationList, this.nowEditIndex, data)
    this.nowEditIndex = -1
  }

  // 此处重写pageSomeEdit 因为需要动态获取其他数据
  async pageSomeEdit(temp: any, index) {
    const res = await getColumnById({ id: temp.id, isMenuActionTree: true })
    if (!res) return
    const data = res.bodyMessage
    // 编辑
    this.dialogTemp = data
    this.nowEditIndex = index
    this.dialogMode = 'edit'
    this.showAddDialog = true
  }
}
interface Column {
  organizationName: string
  // 栏目名

  organizationNumber: number
  // 栏目序号

  organizationCode: string
  // 栏目代码

  weight: number
  // 权重排序

  isEnabled: boolean
  // 是否启用

  createUser: string
  // 创建人

  createTime: string
  // 创建日期

  lastUser: string
  // 最后修改人

  lastTime: string
  // 最后修改日期

  isDelete: boolean
  // 是否删除

  id: number
  // 主键
}
</script>

<style scoped lang="less">
@import '~@/common/style/listbox.less';
</style>
