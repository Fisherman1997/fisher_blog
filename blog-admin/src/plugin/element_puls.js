import { 
    ElForm, 
    ElFormItem, 
    ElButton, 
    ElInput, 
    ElRow, 
    ElCol, 
    ElContainer, 
    ElAside, 
    ElHeader, 
    ElMain, 
    ElScrollbar,
    ElMenu, 
    ElSubMenu,
    ElMenuItem,
    ElMenuItemGroup,
    ElIcon,
    ElAvatar,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElTable,
    ElTableColumn,
    ElTag,
    ElSwitch,
    ElRadioButton,
    ElRadioGroup,
    ElSpace,
    ElSelect,
    ElOption,
    ElInputNumber,
    ElPopconfirm,
    ElPagination,
    ElTree,
    ElUpload,
    ElCard
 } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const ElComponents = [
    ElForm,
    ElFormItem,
    ElButton,
    ElInput,
    ElRow,
    ElCol,
    ElContainer,
    ElAside,
    ElHeader,
    ElMain,
    ElScrollbar,
    ElMenu,
    ElSubMenu,
    ElMenuItem,
    ElIcon,
    ElMenuItemGroup,
    ElAvatar,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElTable,
    ElTableColumn,
    ElTag,
    ElSwitch,
    ElRadioButton,
    ElRadioGroup,
    ElSpace,
    ElSelect,
    ElOption,
    ElInputNumber,
    ElPopconfirm,
    ElPagination,
    ElTree,
    ElUpload,
    ElCard
]

export const setElComponents = (app) => {
    ElComponents.forEach(element => {
        app.component(element.name, element)
    })
    setIocnComponents(app)
}

const setIocnComponents = (app) => {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
    }
}