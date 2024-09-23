import { remark } from "remark";
import html from "remark-html";
import math from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";

export async function markdownToHtml(markdown) {
  const result = await remark()
    .use(math)
    .use(html, { sanitize: false })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeHighlight)
    .process(markdown);
  return result.toString();
}
