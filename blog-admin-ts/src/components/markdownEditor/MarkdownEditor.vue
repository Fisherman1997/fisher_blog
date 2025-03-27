<template>
    <div id="markdown-editor">
        <VueMarkdownEditor v-model="text" width="100%" height="400px" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

import Prism from 'prismjs'

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
})

const text = ref()
// const { textValue } = defineProps({
//     textValue: { type: String, default: '' },
// })
const emit = defineEmits(['changeText'])

watch(
    () => text.value,
    () => {
        emit('changeText', text.value)
    },
)

// const parentSetText = () => {
//     text.value = textValue
// }
</script>

<style scoped>
#markdown-editor {
    width: 100%;
}
/* .markdown-editor-content{
	min-height: 250px;
	max-height: 300px;
} */
</style>
