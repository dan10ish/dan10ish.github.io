import { remark } from "remark";
import html from "remark-html";
import math from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";

export async function markdownToHtml(markdown) {
  const result = await remark()
    .use(math)
    .use(html, { sanitize: false })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeKatex)
    .use(() => (tree) => {
      const visit = (node) => {
        if (node.type === "element" && node.tagName === "pre") {
          const codeNode = node.children[0];
          if (codeNode && codeNode.tagName === "code") {
            const className = codeNode.properties.className || [];
            const language = className[0]?.split("-")[1];
            if (language) {
              codeNode.properties.className = [`language-${language}`];
            }
          }
        }
        if (node.children) {
          node.children.forEach(visit);
        }
      };
      visit(tree);
    })
    .process(markdown);
  return result.toString();
}
