<template>
  <el-dialog :title="`${title}作者`" :visible.sync="v_show" :before-close="beforeClose">
    <el-form :model="tempData" :rules="rules" ref="form" label-width="80px" v-if="tempData">
      <el-form-item label="作者头像" prop="roleName">
        <el-upload
          :limit="1"
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="作者名" prop="moduleId">
        <el-input type="number" v-model.number="tempData.weight" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="menuIds">
        <el-select v-model="tempData.fatherId" placeholder="请选择性别">
          <el-option label="男" :value="0"> </el-option>
          <el-option label="女" :value="1"> </el-option>
        </el-select>
      </el-form-item>
     <el-form-item label="手机号" prop="moduleId">
        <el-input type="number" v-model.number="tempData.weight" autocomplete="off"></el-input>
      </el-form-item>
       <el-form-item label="备注" prop="moduleId">
        <el-input type="number" v-model.number="tempData.weight" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeSelf">取 消</el-button>
      <el-button type="primary" @click="save" :loading="saveLoading">保存</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator'
import { generatorAEDialog } from '@/common/mixins/dialog.mixin'
import { addAuthor, editAuthor } from '@/common/services/AuthorService'
import { getWeeklyList, EditWeeklyParams } from '@/common/services/WeeklyService'
import { EditMenuParams, getMenuTree } from '@/common/services/ArticleService'
import { checkNumberRange } from '@/utils'
// 基础数据模型
const baseAuthor = {
  isEnabled: true,
  weight: 0,
  roleName: '',
  moduleId: '',
  menuIds: [],
  roleMenuAction: [],
}
// 添加与编辑弹窗mixin
const AEDialog = generatorAEDialog(addAuthor, editAuthor, { temp: baseAuthor })
@Component({
  name: 'AddAuthorDialog',
})
export default class AddAuthorDialog extends AEDialog {
  created() {
    this.getWeekly()
  }

  rules = {
    weight: [
      {
        validator: checkNumberRange(0, 99999999),
        trigger: 'blur',
      },
    ],
    roleName: [
      { required: true, message: '请输入作者名', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在2-20个字符', trigger: 'blur' },
    ],
  }

  //菜单列表
  menus: Array<EditMenuParams> = []
  get menusIsShow() {
    return this.tempData?.moduleId && this.menus?.length
  }
  // 选中的菜单
  nowSelMenus: Array<any> = []

  moduleLoading = false
  // 模块信息
  moduleOptions: Array<EditWeeklyParams> = []
  searchWeekly(keyword) {
    this.getWeekly(keyword)
  }

  async getWeekly(keyword?: string) {
    this.moduleLoading = true
    const res = await getWeeklyList({
      keyword,
    })
    this.moduleLoading = false
    if (!res) return
    const data = res.bodyMessage
    this.moduleOptions = Array.isArray(data) ? data : [data]
  }

  moduleChange(moduleId) {
    this.searchMenu(moduleId)
  }

  async searchMenu(moduleId) {
    const res = await getMenuTree({ moduleId })
    if (!res) return
    this.menus = res.bodyMessage
    // 切换模块时 重置菜单选择与功能选择
    if (this.tempData) {
      this.tempData.menuIds = []
      this.roleMenuActionify = []
    }
  }

  menusChange(menuIds) {
    this.filterActions(menuIds)
  }

  // 筛选出当前选择菜单的所属功能
  filterActions(menuIds) {
    this.nowSelMenus = this.menus.filter(menu => menuIds.includes(menu.id))
    this.roleMenuActionify = this.roleMenuActionify.filter(roleMenuAction =>
      menuIds.includes(+roleMenuAction[0])
    )
  }
  // 选中的功能集合
  roleMenuActionify = []

  // 监听功能选中
  @Watch('roleMenuActionify')
  parseSelAction(val) {
    this.tempData.roleMenuAction = val.map(ids => {
      const opts = ids.split('-')
      return {
        menuId: opts[0],
        actionId: opts[1],
      }
    })
  }
}
</script>

<style scoped lang="scss"></style>
