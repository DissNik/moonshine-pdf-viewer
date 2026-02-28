import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
    root: __dirname,
    base: '/vendor/moonshine-pdf-viewer/',
    build: {
        outDir: 'public',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                script: resolve(__dirname, 'resources/js/script.js'),
                stylesheet: resolve(__dirname, 'resources/css/stylesheet.css'),
            },
            output: {
                entryFileNames: 'js/[name].js',
                chunkFileNames: 'js/chunks/[name]-[hash].js',
                assetFileNames: ({ name }) => {
                    if (name?.endsWith('.css')) {
                        return 'css/[name].css'
                    }

                    return 'js/assets/[name]-[hash][extname]'
                },
            },
        },
    },
})
