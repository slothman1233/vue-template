<template>
  <div class="app-container">
    <el-button type="primary" @click="pageSomeAdd">新增作者</el-button>
    <!-- <el-input placeholder="请输入关键字" v-model="keyword" class="search-inp" @keyup.enter.native="keySearch">
      <el-button slot="append" icon="el-icon-search" @click="keySearch"></el-button>
    </el-input> -->
    <el-table
      :data="roleList"
      :max-height="maxTableHeight || null"
      class="tb-box"
      border
      ref="table"
    >
      <el-table-column align="center" prop="roleName" label="作者ID"> </el-table-column>
      <el-table-column align="center" prop="moduleId" label="作者名称" width="80px">
      </el-table-column>
      <el-table-column align="center" prop="weight" label="作者头像" width="80px">
      </el-table-column>
      <el-table-column align="center" prop="createUser" label="性别"> </el-table-column>
      <el-table-column align="center" prop="createTime" label="联系方式"> </el-table-column>
      <el-table-column align="center" prop="createTime" label="文章列表"> </el-table-column>
      <el-table-column align="center" prop="createTime" label="备注"> </el-table-column>
      <el-table-column align="right" label="操作">
        <template slot-scope="{ row, $index }">
          <el-button
            type="primary"
            icon="el-icon-edit-outline"
            @click="pageSomeEdit(row, $index)"
          ></el-button>
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
    <AddAuthorDialog
      ref="AddAuthorDialog"
      :show.sync="showAddDialog"
      :temp.sync="dialogTemp"
      :mode="dialogMode"
      @update="getList"
      @dialog-cancel="dialogCancel"
    />
  </div>
</template>

<script lang="ts">
import { Component, Ref } from 'vue-property-decorator'
import AddAuthorDialog from './components/add.vue'
import {
  getAuthorListForPage,
  getAuthorById,
  deleteAuthor,
  AuthorMenuAction,
} from '@/common/services/AuthorService'
import PageSome from '@/common/mixins/page.mixin'
@Component({
  name: 'AuthorList',
  components: { AddAuthorDialog },
})
export default class AuthorList extends PageSome {
  roleList: Array<Author> = []

  async getList() {
    // 获取列表
    const res = await getAuthorListForPage(this.pageParams)
    if (!res) return
    this.roleList = res.bodyMessage?.items
    this.total = res.bodyMessage?.totalRecords || 0
  }
  // 删除
  async delAuthor(role: Author) {
    const confirm = await this.$confirm(`确定删除${role.roleName}吗？`).catch(e => e)
    if (confirm === 'cancel') return
    const res = await deleteAuthor(role)
    if (!res) return
    this.$message.success('操作成功')
    this.getList()
  }

  // 编辑弹窗取消后还原备份数据
  dialogCancel(data) {
    this.dialogTemp = false
    this.$set(this.roleList, this.nowEditIndex, data)
    this.nowEditIndex = -1
  }

  @Ref()
  readonly AddAuthorDialog

  // 此处重写pageSomeEdit 因为需要动态获取其他数据
  async pageSomeEdit(temp: any, index) {
    const res = await getAuthorById({ id: temp.id, isMenuActionTree: true })
    if (!res) return
    const data = res.bodyMessage
    const menuIds: Array<number> = []
    let roleMenuAction: Array<AuthorMenuAction> = []
    data.menuActionTree.forEach((item: any) => {
      menuIds.push(item.id)
      // roleMenuAction = item.action.map(action => ({ menuId: item.id, actionId: action.id }))
      roleMenuAction = [...roleMenuAction, ...item.action.map(action => `${item.id}-${action.id}`)]
    })
    // 编辑
    await this.AddAuthorDialog.searchMenu(temp.moduleId)
    this.dialogTemp = Object.assign(data, { menuIds })
    this.AddAuthorDialog.menusChange(menuIds)
    this.AddAuthorDialog.roleMenuActionify = roleMenuAction
    this.nowEditIndex = index
    this.dialogMode = 'edit'
    this.showAddDialog = true
  }

  showAddDialog = true
}

interface Author {
  id: number
  moduleId: number
  // 作者Id

  roleName: string
  // maxLength: 20
  // minLength: 2
  // 作者名
  roleMenuAction: Array<AuthorMenuAction>
  // 关联菜单导航功能Id集合

  isEnabled: boolean
  // 是否启用

  weight: number
  // maximum: 99999999
  // minimum: 0
  // 权重排序

  menuIds: Array<number>
  // 关联菜单Id集合
}
</script>

<style scoped lang="less">
@import '~@/common/style/listbox.less';
</style>
