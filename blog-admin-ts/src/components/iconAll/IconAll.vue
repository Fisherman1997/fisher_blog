<template>
    <div class="icon-all">
        <ElAlert title="双击选择图标" type="info" show-icon />
        <el-row :gutter="0">
            <el-col
                v-for="(item, index) in iconList"
                :key="index + item"
                @dblclick="selectIcon(item)"
            >
                <el-icon>
                    <component :is="item" />
                </el-icon>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { ElAlert } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const iconList = Object.keys(ElementPlusIconsVue)

const emit = defineEmits<{
    (e: 'close', payload: (typeof iconList)[number]): void
}>()

const selectIcon = (icon: (typeof iconList)[number]) => {
    emit('close', icon)
}
</script>

<style scoped>
.el-icon {
    width: 100%;
    font-size: 26px;
    vertical-align: middle;
}
.el-row {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: flex-start;
    justify-content: flex-start;
}
.el-col {
    cursor: pointer;
    max-width: 50px;
    box-shadow: 0 0 0.8px rgba(0, 0, 0, 0.8);
    line-height: 50px;
}
.el-col:hover {
    background-color: rgba(115, 222, 255, 0.3);
}
</style>
