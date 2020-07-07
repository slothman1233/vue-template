<template>
  <div class="app-container">
    <el-select class="search-item" v-model="feedbackState" placeholder="请选择处理状态">
      <el-option
        v-for="item in feedbackOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-date-picker
      class="search-item"
      v-model="dateInfo"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
    >
    </el-date-picker>
    <el-input
      placeholder="反馈ID/用户ID/反馈内容"
      v-model="keyword"
      class="search-inp"
      @keyup.enter.native="keySearch"
    >
      <el-button slot="append" icon="el-icon-search" @click="keySearch"></el-button>
    </el-input>
    <el-table
      :data="groupList"
      :max-height="maxTableHeight || null"
      class="tb-box"
      border
      ref="table"
    >
      <el-table-column align="center" prop="groupName" label="反馈ID"></el-table-column>
      <el-table-column align="center" prop="weight" label="用户信息" width="80px">
      </el-table-column>
      <el-table-column align="center" prop="createUser" label="反馈内容"> </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="反馈图片"
        :formatter="pageSomeTimeFormat"
      >
      </el-table-column>
      <el-table-column align="center" label="类型">
        <template slot-scope="{ row }">
          <p>操作人: {{ row.lastUser }}</p>
          <p>时间: {{ pageSomeTimeFormat(null, null, row.lastTime) }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="联系方式">
        <template slot-scope="{ row }">
          <el-switch v-model="row.isEnabled"></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="反馈时间">
      </el-table-column>
      <el-table-column align="center" label="处理时间">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="{ row }">
          <el-button type="primary" size="small" @click="pageSomeEdit(row)">详情</el-button>
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
    <AddFeedbackDialog
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
import AddFeedbackDialog from './components/add.vue'
import {
  getFeedbackListForPage,
  getFeedbackById,
  deleteFeedback,
} from '@/common/services/FeedbackService'
import PageSome from '@/common/mixins/page.mixin'
import { pickerOptions } from '@/utils'
@Component({
  name: 'FeedbackList',
  components: { AddFeedbackDialog },
})
export default class FeedbackList extends PageSome {
  groupList: Array<Feedback> = []

  async getList() {
    // 获取列表
    const res = await getFeedbackListForPage(this.pageParams)
    if (!res) return
    this.groupList = res.bodyMessage?.items
    this.total = res.bodyMessage?.totalRecords || 0
  }
  // 删除
  async delFeedback(group: Feedback) {
    const confirm = await this.$confirm(`确定删除${group.groupName}吗？`).catch(e => e)
    if (confirm === 'cancel') return
    const res = await deleteFeedback(group)
    if (!res) return
    this.$message.success('操作成功')
    this.getList()
  }

  // 编辑弹窗取消后还原备份数据
  dialogCancel(data) {
    this.dialogTemp = false
    this.$set(this.groupList, this.nowEditIndex, data)
    this.nowEditIndex = -1
  }

  // 此处重写pageSomeEdit 因为需要动态获取其他数据
  async pageSomeEdit(temp: any, index) {
    const res = await getFeedbackById({ id: temp.id, isMenuActionTree: true })
    if (!res) return
    const data = res.bodyMessage
    // 编辑
    this.dialogTemp = data
    this.nowEditIndex = index
    this.dialogMode = 'edit'
    this.showAddDialog = true
  }

  pickerOptions = Object.freeze(pickerOptions())
  // 禁言状态
  feedbackState: string | number = ''
  // 禁言状态选项
  feedbackOptions = [
    { label: '已处理', value: 0 },
    { label: '未处理', value: 1 },
  ]
  // 时间区间
  dateInfo = ''
}
interface Feedback {
  groupName: string
  // 组织名

  groupNumber: number
  // 组织序号

  groupCode: string
  // 组织代码

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
