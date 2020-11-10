<!--
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-10-09 15:31:48
 * @LastEditTime: 2020-11-04 09:16:27
-->
<template>
    <div id="safeguardAdminExposePrecess">
        <el-divider content-position="left">曝光进度</el-divider>
        <div v-for="_ in processData" :key="_.id" class="answer">
            <div class="answer-item">
                <el-avatar
                    class="ava"
                    shape="square"
                    :size="50"
                    :src="
                        _.fromUser
                            ? _.fromUser.headImg_48
                            : 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
                    "
                ></el-avatar>
                <h3>{{ _.fromUser && _.fromUser.nickName }} / {{ _.createTime | timeFormat }}</h3>
                <section class="content">
                    <article v-html="_.content"></article>
                    <div v-if="_.fileSet && _.fileSet.imageSet.length" class="img-box">
                        <el-image
                            v-for="files in _.fileSet.imageSet"
                            :key="files.url"
                            style="width: 100px; height: 100px"
                            :src="files.url"
                            :preview-src-list="_.fileSet.imageSet.map(img => img.url)"
                        ></el-image>
                    </div>
                </section>
            </div>
            <div>
                <el-button type="primary" @click="changeContent(_)">修改</el-button>
                <el-button type="primary" @click="del(_)">删除</el-button>
            </div>
        </div>

        <el-button type="primary" @click="changeContent(1)">填写进度信息</el-button>
        <ProcessEditor
            :editor="nowEditor"
            :show.sync="showEditor"
            :processMode="1"
            @update="getProcess"
        ></ProcessEditor>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, PropSync, Inject, Provide } from 'vue-property-decorator'
import { getAllProcess, delAnswer } from '@/common/services/RemoteService'
import ProcessEditor from '@/components/ProcessEditor.vue'
import { timeFormat } from '@/common/filters/statusToUI'
@Component({
    name: 'ExposePrecess',
    components: { ProcessEditor },
    filters: { timeFormat },
})
export default class ExposePrecess extends Vue {
    showEditor = false
    @PropSync('temp', {
        default: () => {},
    })
    @Provide()
    tempData!: any
    created() {
        this.getProcess()
    }
    async getProcess() {
        const res = await getAllProcess({
            themeId: this.tempData.autoId,
            customerServiceType: 0,
            answerType: 2,
            limit: 100,
        })
        if (!res) {
            this.$message.error('获取曝光进度失败')
            return
        }
        this.processData = res.bodyMessage
    }
    async save() {
        return true
    }
    processData: any[] = []
    nowEditor = {}
    changeContent(row) {
        this.nowEditor = row !== 1 ? row : {}
        this.showEditor = true
    }
    async del(row) {
        const confirm = await this.$confirm(`确定删除本条记录吗？`).catch(e => e)
        if (confirm === 'cancel') {
            return
        }
        const res = await delAnswer({
            id: row.id,
            status: 3,
        })
        if (!res) {
            return this.$message.error('删除失败')
        }
        this.$message.success('操作成功')
        this.getProcess()
    }
}
</script>

<style scoped lang="less">
#safeguardAdminExposePrecess {
    .answer {
        margin: 20px 0;
    }
    .answer-item {
        display: grid;
        grid-template-columns: minmax(50px, max-content) auto;
        margin-bottom: 20px;
        grid-gap: 16px;
        .ava {
            grid-row: ~'1 / span 2';
        }
        .img-box {
            margin-top: 10px;
        }
    }
}
</style>
