import {defineConfig} from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            imports: ['vue'],
        }),
        Components({
            dirs: ['src/components/*/*'], // 组件所在目录
            extensions: ['vue'],
            deep: true,
        }),
    ],
    resolve: {
        extensions: ['.vue', '.json', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    }
})