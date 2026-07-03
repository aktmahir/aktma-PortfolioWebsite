import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteSitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    viteSitemap({
      hostname: 'https://aktma.dev',
      routes: [
        { url: '/', changefreq: 'weekly', priority: 1.0 },
        { url: '/#about', changefreq: 'monthly', priority: 0.8 },
        { url: '/#expertise', changefreq: 'monthly', priority: 0.8 },
        { url: '/#experience', changefreq: 'monthly', priority: 0.8 },
        { url: '/#projects', changefreq: 'weekly', priority: 0.9 },
        { url: '/#contact', changefreq: 'monthly', priority: 0.8 },
      ],
      robots: [
        { userAgent: '*', allow: '/' },
        { userAgent: '*', disallow: '/private/' },
        { userAgent: '*', disallow: '/api/' },
        { sitemap: 'https://aktma.dev/sitemap.xml' },
      ],
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion')) {
            return 'framer';
          }
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor';
          }
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
    css: true,
  },
});
