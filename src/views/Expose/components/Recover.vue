<!--
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-09-29 14:07:32
 * @LastEditTime: 2020-11-03 17:16:57
-->
<template>
    <div id="safeguardAdminExposeRecover">
        <el-form :model="tempData" :rules="rules" ref="form" label-width="120px">
            <el-form-item label="追回资金：" prop="recoverFunds">
                <el-input
                    v-model.number="tempData.recoverFunds"
                    autocomplete="off"
                    maxlength="25"
                    type="number"
                    class="mini-inp"
                >
                <template slot="append">(美元)</template>
                </el-input>
            </el-form-item>
            <el-form-item label="追回日期：" prop="recoverDate">
                <el-date-picker
                    v-model="tempData.recoverDate"
                    type="datetime"
                    placeholder="选择日期时间"
                    class="mini-inp"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="追回资金说明：" prop="recoverDesc">
                <el-input
                    v-model="tempData.recoverDesc"
                    type="textarea"
                    autocomplete="off"
                    class="mini-inp"
                ></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="save" :loading="saveLoading">保存资金追回记录</el-button>
    </div>
</template>

<script lang="ts">
import { Component, PropSync, Ref, Vue } from 'vue-property-decorator'
import { editRecover, EditRecoverParams } from '@/common/services/ExposeService'
@Component({
    name: 'Recover',
})
export default class Recover extends Vue {
    @Ref() readonly form: any
    saveLoading = false
    @PropSync('temp', {
        default: () => {},
    })
    tempData!: any

    get rules() {
        const rule = {
            recoverFunds: [{ required: true, message: '请填写追回资金', trigger: 'blur' }],
            recoverDate: [{ required: true, message: '请选择追回时间', trigger: 'blur' }],
        }
        return rule
    }
    async save() {
        const valid = await this.form.validate().catch(e => e)
        if (!valid) {
            return
        }
        const { recoverFunds, recoverDate, recoverDesc } = this.tempData
        const params: any = {
            id: this.tempData.autoId,
            recoverFunds,
            recoverDate,
            recoverDesc,
        }
        const res = await editRecover(params)
        if (!res) {
            return
        }
        this.$message.success('保存成功')
        return true
    }
}
</script>

<style scoped lang="less">
#safeguardAdminExposeRecover {
    .mini-inp {
        width: 250px;
    }
}
</style>
