<template>
    <div class="layout-header">
        <div class="layout-left-back" @click="changeLfState(!lefState)">
            <el-icon v-if="lefState"><Fold /></el-icon>
            <el-icon v-else><Expand /></el-icon>
        </div>
<!--        <div class="layout-conter">-->
<!--            <span v-for="(item,index) in routeList.list" :key="item.path" :class="{ 'select-route': route.path === item.path  }">-->
<!--                <router-link :to="item.path">{{ item.title }}</router-link>-->
<!--                <el-icon @click="closeRoute({...item, index})"><Close /></el-icon>-->
<!--            </span>-->
<!--        </div>-->
        <div class="layout-personal">
            <el-avatar v-if="portrait">
                <img :src="portrait" />
            </el-avatar>
            <el-avatar v-else :icon="UserFilled" />
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    {{ userInfo.name }} - 
                    {{ userInfo.code }}
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="changeUserInfo">
                        <el-icon><User /></el-icon>
                        个人信息
                    </el-dropdown-item>
                    <el-dropdown-item @click="changePasswordFun">
                        <el-icon><Edit /></el-icon>
                        修改密码
                    </el-dropdown-item>
                    <el-dropdown-item @click="signOutFun">
                        <el-icon><SwitchButton /></el-icon>
                        退出登录
                    </el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { reactive, watch, onMounted, computed, defineProps, defineEmits } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import { UserFilled } from '@element-plus/icons-vue'
import { deleteStoreRouter } from '@/routers/router.store'
import { delStorageItme } from '@/utils/storage'
import { useUserStore } from '@/store/user.store'
import customDialog from '@/components/customDialog'
import InsertAndUpdateUser from '@/views/userManage/modula/InsertAndUpdateUser'
import ChangePassword from '@/views/userManage/modula/ChangePassword'


const userInfo = useUserStore()
const route = useRoute()
const router = useRouter()
const routeList = reactive({list: []})
const { lefState } = defineProps({
    lefState: Boolean
})

const portrait = computed(() => {
    // return userInfo.portrait && (process.env.VUE_APP_BASE_URL + userInfo.portrait[0])
    return userInfo.portrait && userInfo.portrait[0]
})

const emit = defineEmits(['changeLfState'])
const changeLfState = (value) => emit('changeLfState',value)

const changeUserInfo = () => {
    customDialog({
        title: '用户个人信息',
        modal: false,
        component: InsertAndUpdateUser,
        componentProps: {
            type: 'update',
            row: userInfo.info
        },
        open: result => {
            if (!result) return
            location.reload()
        }
    })
}

const changePasswordFun = () => {
    customDialog({
        title: '修改用户密码',
        modal: false,
        component: ChangePassword,
        componentProps: { userId: userInfo.id },
        open: result => {
            if (!result) return
            delStorageItme('token')
            deleteStoreRouter()
            location.reload()
        }
    })
}

const signOutFun = () => {
    delStorageItme('token')
    deleteStoreRouter()
    ElNotification.success({
        title: '提示',
        message: '用户已退出'
    })
    setTimeout(() => {
        location.replace('/admin/login')
    }, 500)
}

// const closeRoute = (closeItem) => {
//     if (route.path === closeItem.path) {
//         if (routeList.list.length === 1) return
//         if (closeItem.index === 0) router.push(routeList.list[1].path)
//         else router.push(routeList.list[closeItem.index - 1].path)
//     }
//     routeList.list = routeList.list.filter(element => element.path !== closeItem.path)
// }

watch(() => route.path, () => {
    const el = routeList.list.find(itme => itme.path === route.path)
    if (el) return
    const { path, meta } = router.getRoutes().find(item => item.path === route.path)
    routeList.list.push({ path, title: meta.title })
})

onMounted(() => {
    const { path, meta } = router.getRoutes().find(item => item.path === route.path)
    routeList.list.push({ path, title: meta.title })
})

</script>

<style scoped>
.layout-header{
    justify-content: space-between;
    align-items: flex-end;
    display: flex;
    padding-top: 15px;
}
.layout-left-back{
    cursor: pointer;
    padding: 3px;
    line-height: 32px;
    font-size: 32px;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .3);
}
.layout-personal{
    display: flex;
    align-items: center;
    padding: 0 15px;
    line-height: 50px;
    height: 50px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .3);
}
.layout-personal .el-avatar {
    margin-right: 10px;
}
.layout-personal  .el-dropdown{
    cursor: pointer;
}

.layout-conter{
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    flex: 1;
    margin: 0 20px;
    height: 40px;
    overflow-x: auto;
    overflow-y: hidden;
    box-shadow: 0 0 5px rgba(0, 0, 0, .3);
    border-radius: 3px;
}


.layout-conter>span {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 10px 15px;
    box-shadow: 0 0 1px rgba(42, 86, 97, 0.8);
    animation-name: fade-out;
    animation-duration: .3s;
    animation-timing-function: linear;
    white-space: nowrap;
}

.layout-conter>span .el-icon {
    cursor: pointer;
    margin-left: 10px;
}
.layout-conter > span.select-route{
    background-color: #409eff;
}
.layout-conter > span.select-route .router-link-active,
.layout-conter>span.select-route .el-icon{
    color: #fff !important;
}

@keyframes fade-out {
    0%{
        transform: translateY(40px);
        opacity: 0;
    }
    100%{
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
