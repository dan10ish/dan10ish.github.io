"use client";

import { memo, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const LatexRenderer = dynamic(() => import('./LatexRenderer'), {
  ssr: false,
  loading: () => <div className="latex-placeholder" />
});

const CodeBlock = dynamic(() => import('./CodeBlock'), {
  ssr: true,
  loading: () => <div className="code-placeholder" />
});

const OptimizedImage = dynamic(() => import('./OptimizedImage'), {
  ssr: true
});

const BlogPost = memo(({ post }) => {
  const {
    title,
    date,
    content,
    readingTime,
    slug
  } = post;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="blog-post"
    >
      <header className="blogpost-title">
        <h1>{title}</h1>
        <div className="blogpost-meta">
          <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>
          <span>·</span>
          <span>{readingTime} min read</span>
        </div>
      </header>

      <Suspense fallback={<div className="content-placeholder" />}>
        <div className="blog-content">
          {content.map((block, index) => {
            switch (block.type) {
              case 'text':
                return <LatexRenderer key={index} content={block.content} />;
              
              case 'code':
                return (
                  <CodeBlock
                    key={index}
                    code={block.content}
                    language={block.language}
                    filename={block.filename}
                  />
                );
              
              case 'image':
                return (
                  <OptimizedImage
                    key={index}
                    src={block.src}
                    alt={block.alt}
                    width={block.width}
                    height={block.height}
                    priority={index === 0}
                  />
                );
              
              default:
                return null;
            }
          })}
        </div>
      </Suspense>
    </motion.article>
  );
});

BlogPost.displayName = 'BlogPost';

export default BlogPost; 