<template>
  <div class="app-container">
    <div>
      <el-select class="search-item" v-model="bannedState" placeholder="请选择禁言状态">
        <el-option
          v-for="item in banedOptions"
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
        placeholder="请输入关键字"
        v-model="keyword"
        class="search-inp"
        @keyup.enter.native="keySearch"
      >
        <el-button slot="append" icon="el-icon-search" @click="keySearch"></el-button>
      </el-input>
    </div>

    <el-table
      :data="userList"
      :max-height="maxTableHeight || null"
      class="tb-box"
      border
      ref="table"
    >
      <el-table-column align="center" prop="userName" label="用户ID" type="expand" width="140px">
        <template>
          <section>
            <h2 class="detail-title">第三方账户信息:</h2>
            <div class="detail-box">
              <div class="detail-item">
                <img src="./icon/wechat.png" alt="微信" />
                <span>未绑定</span>
              </div>
              <div class="detail-item">
                <img src="./icon/ios.svg" alt="IOS" />
                <span>未绑定</span>
              </div>
              <div class="detail-item">
                <img src="./icon/qq.png" alt="QQ" />
                <span>未绑定</span>
              </div>
              <div class="detail-item">
                <img src="./icon/weibo.png" alt="微博" />
                <span>未绑定</span>
              </div>
            </div>
          </section>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="汇聊号"></el-table-column>
      <el-table-column align="center" prop="mobile" label="用户昵称"></el-table-column>
      <el-table-column align="center" prop="createUser" label="头像">
        <template>
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别" width="40px"> </el-table-column>
      <el-table-column align="center" label="注册手机" width="120px"> </el-table-column>
      <el-table-column align="center" label="注册来源" width="100px"> </el-table-column>
      <el-table-column align="center" label="全局禁言时长" width="120px"> </el-table-column>
      <el-table-column align="center" label="注册时间" width="160px"> </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="{ row }">
          <el-button icon="el-icon-s-check" @click="baned(row)" title="禁言"></el-button>
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
    <!-- <ViewInfoDialog :show.sync="showViewInfoDialog" :temp.sync="dialogTemp" :info="{}" /> -->
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import ViewInfoDialog from './components/viewInfo.vue'
import { getUserListForPage, getUserById } from '@/common/services/UserService'
import PageSome from '@/common/mixins/page.mixin'
import { pickerOptions } from '@/utils'
@Component({
    name: 'UserList',
    components: { ViewInfoDialog },
})
export default class UserList extends PageSome {
  pickerOptions = Object.freeze(pickerOptions())
  // 禁言状态
  bannedState: string | number = ''
  // 禁言状态选项
  banedOptions = [
      { label: '正常用户', value: 0 },
      { label: '禁言用户', value: 1 },
  ]
  // 时间区间
  dateInfo = ''

  userList: Array<any> = [{}]
  async getList() {
      // 获取列表
      const res = await getUserListForPage(this.pageParams)
      if (!res) {return}
      this.userList = res.bodyMessage?.items
      this.total = res.bodyMessage?.TotalRecords || 0
  }

  // 编辑弹窗取消后还原备份数据
  dialogCancel(data) {
      this.dialogTemp = false
      this.$set(this.userList, this.nowEditIndex, data)
      this.nowEditIndex = -1
  }

  // 此处重写pageSomeEdit 因为需要动态获取其他数据
  async pageSomeEdit(temp: any, index) {
      const res = await getUserById({ id: temp.id, isMenuActionTree: true })
      if (!res) {return}
      const data = res.bodyMessage
      data.organizationIds = data.organizations.map(organization => organization.id)
      data.jobIds = data.jobs.map(job => job.id)
      data.groupIds = data.groups.map(group => group.id)
      // 编辑
      this.dialogTemp = data
      this.nowEditIndex = index
      this.dialogMode = 'edit'
      this.showAddDialog = true
  }

  showViewInfoDialog = true
  // 查看用户
  showUserInfo(info) {
      this.showViewInfoDialog = true
      this.dialogTemp = info
  }
  // 展示禁言
  baned(info) {
      console.log(info)
  }
}
</script>

<style scoped lang="less">
@import '~@/common/style/listbox.less';
.detail-title{
  margin:10px 0;
}
.detail-box {
  .flex(flex-start);
  .detail-item {
    .flex(flex-start);
    margin-right: 10px;
    img {
      margin-right: 10px;
      width: 40px;
      height: 40px;
    }
  }
}
</style>
