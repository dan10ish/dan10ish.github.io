# Introduction

I rebuilt my website with `Next.js 14`, focusing on minimalism and performance while keeping powerful features like math rendering, syntax highlighting, and dynamic theming. Let me walk you through how everything works.

## File Structure

Here's the simplified structure of the project:

```plaintext
├── app/
│   ├── page.js                 # Homepage
│   ├── layout.js              # Root layout
│   └── post/[slug]/page.js    # Blog post pages
├── components/
│   ├── BlogList.js            # Blog listing
│   ├── Navigation.js          # Navigation menu
│   ├── ProjectsSection.js     # Projects grid
│   ├── LatexRenderer.js       # Math rendering
│   └── HighlightCode.js       # Code highlighting
├── lib/
│   ├── api.js                # Data handling
│   └── mdxutils.js           # Markdown processing
├── content/
│   └── blog/                 # Markdown blog posts
└── public/
    ├── fonts/               # Custom fonts
    └── images/              # Static images
```

## Core Technologies

The site is built using `Next.js 14` with React Server Components for better performance and SEO. Instead of using a CSS framework like Tailwind, I opted for pure CSS with variables for maximum control over styling and animations. All content is written in Markdown and processed using a combination of remark and rehype plugins for features like math equations and syntax highlighting.

For typography, I'm using a combination of Geist Mono (for code and general text) and Sentient (for headings) to create a clean, readable interface that works well for both articles and code.

## Blog System

The blog system is built around markdown files with a robust processing pipeline. Each post is processed through remark and rehype, which handle various transformations. Here's how posts are defined:

```javascript
// lib/api.js
const blogPosts = [
  {
    slug: "probability",
    title: "Probability",
    date: new Date("2024-09-19"),
    tags: ["machine learning", "math"],
    headerImage: "/header-images/probability.jpg",
    estimatedWordCount: 3000,
  },
];
```

## Theme System

The site supports three carefully chosen themes: light, dark, and solarized dark. The system uses CSS variables for instant theme switching:

```css
[data-theme="light"] {
  --color-bg: #ffffff;
  --color-text: #333333;
  --color-link: #0070f3;
}

[data-theme="dark"] {
  --color-bg: #000000;
  --color-text: #ffffff;
  --color-link: #0096fa;
}

[data-theme="solarized-dark"] {
  --color-bg: #00212b;
  --color-text: #bfc9cc;
  --color-link: #2ebdff;
}
```

## Navigation System

The navigation is designed to be unobtrusive yet accessible. It includes a smart navbar that automatically hides when scrolling down:

```javascript
const handleScroll = () => {
  const currentScrollY = window.scrollY;
  const scrollDelta = lastScrollY.current - currentScrollY;

  if (scrollDelta > 10 || currentScrollY < 20) {
    setIsVisible(true);
  } else if (scrollDelta < 0 && currentScrollY > 20) {
    setIsVisible(false);
  }
};
```

## Project Showcase

Projects are displayed in a responsive grid layout. Each project is defined with metadata:

```javascript
const projects = [
  {
    title: "Pathfinder",
    description: "Visualize path algorithms",
    sourceLink: "github-url",
    projectLink: "demo-url",
    tags: ["web"],
    gradient: "linear-gradient(...)",
  },
];
```

## Special Features

### Mathematics Support

The site uses `KaTeX` for rendering math equations. The `LaTeX` content is processed during markdown conversion and styled to match the current theme.

### Code Highlighting

Code blocks use `highlight.js` with theme-aware styling. Each block includes language detection and a copy button for better user experience.

### Dynamic Table of Contents

The TOC component automatically generates a navigation menu from the post's headings:

```javascript
const generateTOC = () => {
  const headers = document.querySelectorAll("h2, h3, h4, h5, h6");
  return Array.from(headers).map((header) => ({
    id: header.id,
    text: header.textContent,
    level: parseInt(header.tagName.charAt(1)),
  }));
};
```

### Performance Optimizations

Several techniques keep the site fast and responsive:

1. Server Components for improved initial load times
2. Dynamic imports for features not needed immediately
3. Font optimization with preloading and subsetting
4. Responsive images with lazy loading
5. Code splitting to reduce initial bundle size

## Development and Deployment

To run the site locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Future Plans

I'm working on several improvements:

- Improved image optimization with next/image
- Full-text search functionality
- Reading progress indicator
- Theme-specific images for dark/light modes

## Contributing

The site is open source and available on GitHub. Feel free to explore the source code or reach out with questions or suggestions!
