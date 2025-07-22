import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  base: "/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          tiptap: [
            '@tiptap/react',
            '@tiptap/starter-kit',
            '@tiptap/extension-placeholder',
            '@tiptap/extension-text-style'
          ],
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
