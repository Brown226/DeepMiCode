import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [
    react(),
    // 开发模式下：将生产路径重写为源码路径；移除不需要的 vendor CSS
    {
      name: "dev-html-rewrite",
      transformIndexHtml(html: string) {
        return html
          .replace('/assets/app.js?token=__DEEPMICODE_TOKEN__', '/src/main.tsx')
          .replace('/assets/app.css?token=__DEEPMICODE_TOKEN__', '/src/styles.css');
      },
    },
  ],
  define: {
    __APP_VERSION__: JSON.stringify("0.47.2"),
  },
  resolve: {
    alias: {
      "@DEEPMICODE/core-utils/compaction": resolve(__dirname, "../packages/core-utils/src/compaction.ts"),
      "@DEEPMICODE/core-utils/derive-prefix": resolve(__dirname, "../packages/core-utils/src/derive-prefix.ts"),
      "@DEEPMICODE/core-utils": resolve(__dirname, "../packages/core-utils/src/index.ts"),
      "@tauri-apps/api/core": resolve(__dirname, "src/lib/tauri-bridge.ts"),
      "@tauri-apps/api/event": resolve(__dirname, "src/lib/tauri-bridge.ts"),
      "@tauri-apps/api/window": resolve(__dirname, "src/lib/tauri-bridge.ts"),
      "@tauri-apps/api/webview": resolve(__dirname, "src/lib/tauri-bridge.ts"),
      "@tauri-apps/plugin-dialog": resolve(__dirname, "src/lib/tauri-bridge.ts"),
      "@tauri-apps/plugin-opener": resolve(__dirname, "src/lib/tauri-bridge.ts"),
      "@tauri-apps/plugin-process": resolve(__dirname, "src/lib/tauri-bridge.ts"),
    },
  },
  build: {
    target: "es2022",
    minify: "esbuild",
    sourcemap: true,
    outDir: "dist",
    emptyOutDir: false, // 避免清空 dist 下原有的第三方资�?(�?vendor-css)
    rollupOptions: {
      input: {
        app: resolve(__dirname, "src/main.tsx")
      },
      output: {
        entryFileNames: "app.js",
        chunkFileNames: "[name].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "app.css" || assetInfo.name === "index.css") return "app.css";
          // 字体等静态文件输出到 assets/ 子目录，匹配服务�?/assets/* 路由
          if (/\.(woff2?|ttf|otf)$/.test(assetInfo.name ?? "")) return "assets/[name].[ext]";
          return "[name].[ext]";
        },
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("/katex/")) return "vendor-katex";
          if (
            id.includes("/react-markdown/") ||
            id.includes("/remark-") ||
            id.includes("/rehype-") ||
            id.includes("/mdast-") ||
            id.includes("/micromark") ||
            id.includes("/unist-") ||
            id.includes("/hast-")
          )
            return "vendor-markdown";
          if (id.includes("/prism-react-renderer/")) return "vendor-prism";
          if (id.includes("/lucide-react/")) return "vendor-icons";
          if (id.includes("/react-virtuoso/")) return "vendor-virtuoso";
          if (id.includes("/react/") || id.includes("/react-dom/") || id.includes("/scheduler/"))
            return "vendor-react";
        },
      },
    },
  },
  server: {
    host: "127.0.0.1",
    port: 3000,
    strictPort: true
  }
});
