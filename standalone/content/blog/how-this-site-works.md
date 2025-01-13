I rebuilt my website using `Next.js 14` with React Server Components, focusing on performance, minimalism, and user experience while incorporating powerful features. Here's a detailed breakdown of how everything works.

## Core Architecture

### File Structure

```plaintext
├── app/                  # Next.js 14 app directory
│   ├── page.js           # Homepage
│   ├── layout.js         # Root layout
│   ├── post/[slug]/      # Dynamic blog routes
│   ├── library/          # Library section
│   └── projects/         # Projects section
├── components/           # React components
├── lib/                  # Utilities and data
├── content/              # Markdown content
└── public/               # Static assets
```

### Core Technologies

- Next.js 14 with React Server Components
- Pure CSS with CSS Variables (no frameworks)
- Supabase for real-time features
- Custom fonts (Geist Mono & Sentient)

## Feature Implementations

### 1. Dynamic Theming

Automatically detects system preferences and applies themes using CSS variables:

```javascript
// ThemeHandler.jsx
export default function ThemeHandler() {
  useEffect(() => {
    const setTheme = (e) => {
      document.documentElement.setAttribute(
        "data-theme",
        e.matches ? "dark" : "light",
      );
    };
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(mediaQuery);
    mediaQuery.addEventListener("change", setTheme);
    return () => mediaQuery.removeEventListener("change", setTheme);
  }, []);
}
```

Theme variables:

```css
[data-theme="light"] {
  --color-bg: #ffffff;
  --color-text: #18181b;
  --color-link: #2563eb;
}

[data-theme="dark"] {
  --color-bg: #09090b;
  --color-text: #fafafa;
  --color-link: #3b82f6;
}
```

### 2. Real-time Statistics

Each page tracks views and likes with efficient caching:

```javascript
// supabase.js
export async function getStats(pageId) {
  const cached = statsCache.get(pageId);
  if (cached && Date.now() - cached.timestamp < CACHE_TIME) {
    return cached.data;
  }

  try {
    const { data } = await supabase
      .from("page_stats")
      .select("views, likes")
      .eq("id", pageId)
      .single();

    // Cache and return results
    const result = data || { views: 0, likes: 0 };
    statsCache.set(pageId, { data: result, timestamp: Date.now() });
    return result;
  } catch {
    return { views: 0, likes: 0 };
  }
}
```

### 3. Library System

Interactive book showcase with 3D effects:

```javascript
const BookCard = ({ book }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`book-card ${isActive ? "touch-active" : ""}`}
      onTouchStart={() => setIsActive(true)}
      onTouchEnd={() => setIsActive(false)}
    >
      <div
        className="book-cover"
        style={{
          "--book-color": book.coverColor,
          color: shouldUseWhiteText(book.coverColor) ? "#fff" : "#000",
        }}
      >
        <div className="book-content">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">{book.author}</p>
        </div>
      </div>
    </div>
  );
};
```

### 4. Code Block System

Multi-language support with syntax highlighting:

```javascript
const TabsCodeBlock = memo(({ blocks }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="code-block-container">
      <div className="tabs-code-header">
        <div className="code-tabs">
          {blocks.map((block, index) => (
            <CodeTab
              key={block.language}
              language={block.language}
              isActive={activeTab === index}
              onClick={() => setActiveTab(index)}
            />
          ))}
        </div>
        <CopyButton code={blocks[activeTab].code} />
      </div>
      {/* Content rendering logic */}
    </div>
  );
});
```

### 5. LaTeX Support

Mathematics rendering with KaTeX:

```javascript
const LatexRenderer = ({ content }) => {
  useEffect(() => {
    const mathElements = containerRef.current.querySelectorAll(
      ".math:not(.katex-rendered)",
    );

    mathElements.forEach((elem) => {
      katex.render(elem.textContent, elem, {
        displayMode: elem.classList.contains("math-display"),
        throwOnError: false,
      });
    });
  }, [content]);
};
```

### 6. Dynamic Table of Contents

Smart TOC with scroll tracking:

```javascript
const TOCButton = () => {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%" },
    );

    // Observe headings
    document.querySelectorAll("h2, h3, h4").forEach((heading) => {
      if (heading.id) observer.observe(heading);
    });

    return () => observer.disconnect();
  }, []);
};
```

### 7. Project Showcase

Filterable project grid:

```javascript
export default function ProjectsSection({ showAll = false }) {
  const [selectedTags, setSelectedTags] = useState([]);

  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return projects;
    return projects.filter((project) =>
      selectedTags.some((tag) => project.tags.includes(tag)),
    );
  }, [selectedTags]);

  return (
    <section className="projects-section">
      <FilterComponent
        options={tags}
        activeFilters={selectedTags}
        onFilterChange={setSelectedTags}
      />
      <div className="projects-table">
        {filteredProjects.map((project) => (
          <ProjectRow key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
```

## Workflows

### Adding a New Blog Post

1. Create markdown file in `/content/blog/your-post.md`:

```markdown
[Demo](demo-link) | [Source Code](source-code-link)

# Title

## Introduction

Content here...
```

2. Register in `/lib/posts.js`:

```javascript
const blogPosts = [
  {
    slug: "your-post",
    title: "Your Post Title",
    date: new Date("2024-12-19"),
    tags: ["tag1", "tag2"],
    headerImage: "/header-images/your-image.jpg",
    estimatedWordCount: 1000,
    status: "completed", // or "development" or "draft"
    home: false,
  },
];
```

### Adding a New Project

Update `/lib/projects.js`:

```javascript
const projects = [
  {
    title: "Your Project",
    description: "Project description",
    sourceLink: "https://github.com/username/project",
    projectLink: "https://demo-link.com",
    tags: ["web"],
    home: true,
  },
];
```

### Adding Library Resources

Update `/app/library/page.js`:

```javascript
const books = [
  {
    title: "Book Title",
    author: "Author Name",
    coverColor: "#hex-color",
    tags: ["Category"],
    description: "Description",
  },
];

const resources = [
  {
    title: "Resource Name",
    category: "YouTube", // or "Papers" or "Tools"
    link: "https://resource-link.com",
  },
];
```

## Development Workflow

1. **Local Development**

```bash
npm run dev
npm run build && npm run start # Preview production
```

2. **Deployment**

```bash
npm run deploy
```

3. **Testing Checklist**

- Verify markdown rendering
- Test in both themes
- Check mobile responsiveness
- Verify real-time features
- Run performance audits
- Test with slow network

## Performance Optimizations

1. Dynamic Imports

```javascript
const HighlightCode = dynamic(() => import("./HighlightCode"), {
  ssr: false,
});
```

2. Asset Optimization

```javascript
<link
  rel="preload"
  href="/fonts/GeistMonoVF.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
```

3. Efficient Caching

```javascript
const cached = statsCache.get(pageId);
if (cached && now - cached.timestamp < CACHE_TIME) {
  return cached.data;
}
```

## Future Plans

1. Full-text search implementation
2. Enhanced image optimization
3. Advanced animation system
4. Expanded interactive visualizations
5. PWA features
6. Advanced caching strategies

<br>

The site remains open source and continuously evolving. Feel free to explore the [source code](https://github.com/dan10ish/dan10ish.github.io) or reach out with suggestions!
