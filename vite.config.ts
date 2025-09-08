import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Add CSP headers for development
    headers: {
      'Content-Security-Policy': mode === 'development' 
        ? "script-src 'self' 'unsafe-eval' 'unsafe-inline' https:; object-src 'none';"
        : "script-src 'self' 'unsafe-inline' https:; object-src 'none';"
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize bundle
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          icons: ['lucide-react'],
          // Split large components
          pages: [
            './src/pages/Index.tsx',
            './src/pages/Rooms.tsx',
            './src/pages/Services.tsx'
          ]
        }
      }
    },
    // Disable source maps in production to avoid eval
    sourcemap: false,
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable compression with safe minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production'
      },
      // Ensure no eval is used in minified code
      keep_fnames: true,
      mangle: {
        keep_fnames: true
      }
    }
  },
  // Enable CSS code splitting
  css: {
    devSourcemap: mode === 'development'
  },
  // Performance optimizations
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@radix-ui/react-dialog',
      'lucide-react'
    ]
  }
}));
