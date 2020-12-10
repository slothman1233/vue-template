<!--
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-07-07 09:36:15
 * @LastEditTime: 2020-07-08 17:56:20
-->
<template>
    <section class="power-home" v-loading="loading">
        <h1 class="power-title">维权中心待办</h1>
        <section class="home-item">
            <h3>待审核:</h3>
            <div class="item-con" @click="jumpToList('/qs/list')">
                <p>问答</p>
                <p>{{ dataForm.waitQuestion }}</p>
            </div>
            <div class="item-con" @click="jumpToList('/expose/list')">
                <p>曝光</p>
                <p>{{ dataForm.waitExposure }}</p>
            </div>
            <div class="item-con" @click="jumpToList('/complaints/list')">
                <p>投诉</p>
                <p>{{ dataForm.waitComplaints }}</p>
            </div>
        </section>
        <section class="home-item">
            <h3>用户补充投诉待跟进:</h3>
            <div class="item-con" @click="jumpToList('/complaints/list', {workType: '1'})">
                <p>投诉</p>
                <p>{{ dataForm.waitComplaintsProgress }}</p>
            </div>
        </section>
    </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { power } from '@/router'
import { getAdminIndexData } from '@/common/services/ConfigService'
import { HomeData } from '@/common/type/ConfigData'
import { LoadingD } from '@/common/decorators/preposition.fn.decorator'

@Component({
    name: 'Home',
})
export default class Home extends Vue {
    created() {
        this.getData()
    }
    dataForm: HomeData = {
        waitQuestion: 0, // 待回答问答
        waitExposure: 0, // 待审核曝光
        waitComplaints: 0, // 待审核投诉
        waitComplaintsProgress: 0, // 补充材料待处理
    }

    loading = false

    @LoadingD('loading', 'getDataNext')
    async getData() {
        return await getAdminIndexData().catch((e) => console.log(e))
    }
    getDataNext(res) {
        if (!res) {
            this.$message.error('获取工作台数据失败')
            return
        }
        this.dataForm = res.bodyMessage
    }
    jumpToList(path, oth?:any) {
        const query =  { isFromHome: 'work' }
        oth && Object.assign(query, oth)
        this.$router.push({ path, query })
    }
}
</script>

<style scoped lang="less">
.power-title {
    font-size: 24px;
    font-weight: 500;
}
.home-item {
    margin-top: 15px;
    h3 {
        width: 180px;
        text-align: right;
    }
    .flex(flex-start);
    .item-con {
        margin-left: 30px;
        padding: 20px 30px;
        background: #409eff;
        border-radius: 4px;
        cursor: pointer;
        .flex();
        transition: 0.3s;
        &:hover {
            background: #2267ac;
            box-shadow: 0 4px 5px rgba(0, 0, 0, 0.4);
        }
        &:active{
            transform: scale(.9,.9);
        }
        p {
            color: #fff;
            font-size: 16px;
            font-weight: 500;
            &:last-child {
                margin-left: 12px;
                font-size: 26px;
                font-weight: 700;
            }
        }
    }
}
</style>
