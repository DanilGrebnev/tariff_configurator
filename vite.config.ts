import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import stylelint from 'vite-plugin-stylelint'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr(), stylelint({ fix: true, cache: false })],
    css: {
        preprocessorOptions: {
            scss: {
                implements: 'scss',
            },
        },
    },

    resolve: {
        alias: [
            { find: '@', replacement: path.resolve(__dirname, 'src') },
            { find: 'shared', replacement: path.resolve(__dirname, 'src/shared') },
            { find: 'widgets', replacement: path.resolve(__dirname, 'src/widgets') },
        ],
    },
})
