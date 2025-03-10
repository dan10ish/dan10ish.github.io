import { remark } from "remark";
import html from "remark-html";
import math from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import GithubSlugger from "github-slugger";

export async function extractTOC(markdown) {
  const headingRegex = /^(#{2,6})\s+(.+)$/gm;
  const toc = [];
  let match;
  const slugger = new GithubSlugger();
  
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = slugger.slug(text);
      
    if (text.toLowerCase() !== "table of contents" && 
        text.toLowerCase() !== "footnotes") {
      toc.push({ id, text, level });
    }
  }
  
  return toc;
}

export async function markdownToHtml(markdown) {
  markdown = markdown.replace(/```tabs\n([\s\S]*?)```/g, (match, content) => {
    const blocks = content.split(/\n---/).filter(Boolean);
    const processedBlocks = blocks.map((block) => {
      const cleanBlock = block.trim().replace(/^---/, "");
      const [language, ...codeLines] = cleanBlock.split("\n");
      return {
        language: language.trim(),
        code: codeLines.join("\n").trim(),
      };
    });

    return `<div class="tabs-code-block" data-blocks='${JSON.stringify(
      processedBlocks,
    ).replace(/'/g, "&apos;")}'></div>`;
  });

  const result = await remark()
    .use(math)
    .use(remarkGfm)
    .use(html, { sanitize: false, footnoteLabel: "" })
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
