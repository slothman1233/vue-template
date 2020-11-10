<template>
    <el-dialog
        title="曝光详情"
        :visible.sync="v_show"
        :before-close="beforeClose"
        :close="selfReset"
        fullscreen
        append-to-body
    >
        <el-tabs v-model="nowTab">
            <el-tab-pane label="曝光详情" name="detail" :disabled="tabDisable">
                <ExposeDetail
                    v-if="v_show && nowTab === 'detail'"
                    :temp="tempData"
                    :img-list.sync="imgs"
                    :video-list.sync="videos"
                    @changeTabDisable="changeTabDisable"
                    ref="detail"
                ></ExposeDetail>
            </el-tab-pane>
            <el-tab-pane label="曝光进度" name="precess" :disabled="tabDisable">
                <ExposePrecess :temp="tempData" v-if="v_show && nowTab === 'precess'" ref="precess"></ExposePrecess>
            </el-tab-pane>
            <el-tab-pane label="追回资金" name="recover" :disabled="tabDisable">
                <Recover :temp="tempData"  v-if="v_show && nowTab === 'recover'" ref="recover"></Recover>
            </el-tab-pane>
            <el-tab-pane label="转至投诉" name="transform" :disabled="tabDisable">
                <TransformToCom
                    v-if="v_show && nowTab === 'transform'"
                    :temp="tempData"
                    :img-list.sync="imgs"
                    :video-list.sync="videos"
                    @changeTabDisable="changeTabDisable"
                    ref="transform"
                ></TransformToCom>
            </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeSelf">取 消</el-button>
            <el-button type="primary" @click="saveOverwrite" :loading="saveLoading">保存</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
/*
dialog+tabs+destory-on-close === 卡死
2020年09月30日14:30:26查询：还是open
https://github.com/ElemeFE/element/issues/16746
*/
import { Component, ProvideReactive, Ref, Watch } from 'vue-property-decorator'
import { generatorAEDialog } from '@/common/mixins/dialog.mixin'
import { getExposureTypes, TypesModel } from '@/common/services/RemoteService'
import TransformToCom from './TransformToCom.vue'
import ExposeDetail from './ExposeDetail.vue'
import Recover from './Recover.vue'
import ExposePrecess from './ExposePrecess.vue'
import { getPlatform } from '@/utils'
const AEDialog = generatorAEDialog()
@Component({
    name: 'EditExpose',
    components: {
        TransformToCom,
        ExposeDetail,
        Recover,
        ExposePrecess,
    },
})
export default class EditExpose extends AEDialog {
    imgs: any[] = []
    videos: any[] = []

    @Watch('v_show')
    fileSet(show) {
        if (!show) {
            return
        }
        this.imgs = this.tempData?.fileSet?.imageSet || []
        this.videos = this.tempData?.fileSet?.videoSet || []
    }
    created() {
        this.getPlatform()
    }
    /*
    投诉详情 detail
    曝光进度 process
    追回资金 recover
    转至曝光 trnasform
    */
    nowTab = 'detail'
    selfReset() {
        this.nowTab = 'detail'
    }

    exposeTypeOptions = [
        { value: 1, label: '交易问题' },
        { value: 2, label: '资金安全' },
        { value: 3, label: '代理商佣金就分' },
        { value: 4, label: '虚假宣传' },
    ]
    platformOpts: SelectModel[] = []
    async getPlatform() {
        const {entId, entName} = this.tempData
        // 获取平台
        const res = await getPlatform(entId, entName)
        if (!res) {
            return this.$message.error('获取平台失败')
        }
        this.platformOpts = res
    }
    checkList = []

    @Ref() readonly detail
    @Ref() readonly recover
    @Ref() readonly precess
    @Ref() readonly transform
    changeTabDisable(flag) {
        this.tabDisable = flag
    }
    tabDisable = false
    async saveOverwrite() {
        const fn = this[this.nowTab].save
        if (fn) {
            const res = await fn().catch(e => e)
            res && this.closeSelf('update')
        }
    }
}
</script>

<style scoped lang="less"></style>
