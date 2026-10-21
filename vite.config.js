import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  base: '/artraw/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    minify: 'esbuild',
    target: 'es2019',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        manualChunks(id) {
          // keep the big data modules out of the entry chunk
          if (id.includes('/src/data/services.js')) return 'data-services';
          if (id.includes('/src/data/contact.js')) return 'data-contact';
          if (id.includes('/src/data/portfolio.js')) return 'data-portfolio';
        }
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: false
  }
});