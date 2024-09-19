import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export default defineConfig({
  plugins: [react()],
  base: "/",
  assetsInclude: ["**/*.md"],
  optimizeDeps: {
    include: ["remark-gfm", "rehype-slug", "rehype-autolink-headings"],
  },
});
