import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import styleImport from 'vite-plugin-style-import'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        vueDevTools(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        // styleImport({
        //     libs: [
        //         {
        //             libraryName: 'element-plus',
        //             esModule: true,
        //             resolveStyle: (name: string) => `element-plus/theme-chalk/${name}.css`,
        //         },
        //     ],
        // }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/api/, '') // 可选：路径重写
            },
            '/imgS': {
                target: 'http://localhost:5000',
                changeOrigin: true,
            },
        },
    },
    build: {
        assetsDir: 'admin',
    },
})
