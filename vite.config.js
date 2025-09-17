import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'generate-sitemap',
      writeBundle: async () => {
        const { default: generateSitemap } = await import('./scripts/generate-sitemap.js');
        await generateSitemap();
      }
    }
  ],
})
