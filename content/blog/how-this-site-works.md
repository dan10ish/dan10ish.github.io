I rebuilt my website using Next.js 15 with React Server Components and the App Router, focusing on performance, minimalism, and user experience. While many modern sites opt for Tailwind CSS or other CSS frameworks, I chose to use pure CSS with variables and modules for granular control and optimal performance. This decision ensures minimal CSS payload and removes unused styles. Let me walk you through how everything works.

## Core Architecture

### File Structure

The project follows a clean, modular structure optimized for Next.js 15's App Router:

```plaintext
├── app/                 # Next.js 15 app directory
│   ├── page.js          # Homepage with content switcher
│   ├── layout.js        # Root layout with theme handling
│   ├── photos/          # Photo gallery with EXIF data
│   ├── post/[slug]/     # Dynamic blog posts
├── components/          # React components
│   ├── Content.jsx      # Main content switcher
│   ├── Footer.js        # Stats and share system
│   ├── PhotoGrid.js     # Masonry photo layout
│   ├── ThemeHandler.jsx # Theme system management
├── lib/                 # Utilities
│   ├── posts.js         # Blog post management
│   ├── projects.js      # Project data storage
│   ├── supabase.js      # Database and realtime
├── content/             # Blog posts in markdown
│   ├── blog/            # Blog post content
└── public/              # Static assets
```

Each directory serves a specific purpose:

- `app/`: Contains all pages and layouts, leveraging Next.js 15's Server Components
- `components/`: Reusable React components, carefully split between client and server components
- `lib/`: Utility functions and data management
- `content/`: All blog posts in markdown format
- `public/`: Static assets like images and fonts

### Core Technologies

The site is built with a carefully selected tech stack:

- **Next.js 15**: Using the App Router with Server Components for optimal performance
- **React 19**: Leveraging the latest React features for improved performance
- **Pure CSS**: Leveraging CSS variables and modules without frameworks
- **Supabase**: Handles real-time analytics and interactions
- **SF Mono**: Custom font family for consistent typography
- **Markdown**: Enhanced content for blog posts
- **Key Libraries**:
  - framer-motion: Animations and transitions
  - recharts: Data visualization for portfolio
  - exifreader: Handling photo metadata
  - KaTeX: Math equation rendering
  - highlight.js: Code syntax highlighting
  - lucide-react: Icon system

## Content Management Workflows

### 1. Adding Blog Posts

The blog system supports rich content with a straightforward workflow:

1. Create a new markdown file in `content/blog/`:

````markdown
# New Blog Title

This is my new blog post with **rich** content.

## Code Example

```python
def hello_world():
    print("Hello, World!")
```
````

2. Add metadata to `lib/posts.js`:

```javascript
const blogPosts = [
  {
    slug: "new-post",
    title: "New Blog Title",
    date: new Date("2024-01-24"),
    tags: ["tech", "tutorial"],
    headerImage: "/header-images/new-post.jpg",
    estimatedWordCount: 1500,
    status: "completed",
    home: true, // Show on homepage
  },
  // Existing posts...
];
```

3. Add header image:

- Place image in `public/header-images/`
- Optimize for web (recommended size: 1200x630px)
- Use descriptive filename

Each blog post supports:

- Rich markdown formatting
- Math equations with KaTeX
- Code blocks with syntax highlighting
- Multi-language code tabs
- Footnotes and references
- Automatic Table of contents generation
- Reading time calculation
- Real-time views and likes
- Social sharing functionality
- Mobile-optimized layout

### 2. Project Management

Projects are managed through a structured system in `lib/projects.js`:

Add project entry:

```javascript
const projects = [
  {
    title: "New Project",
    description: "A detailed description of what the project does",
    sourceLink: "https://github.com/username/project",
    projectLink: "https://demo.link",
    tags: ["web", "ml"], // Used for filtering
    home: true, // Feature on homepage
  },
  // Existing projects...
];
```

Projects feature:

- Tag-based filtering system (web, ml, rbtx, notes)
- Source code access via GitHub links
- Live demo links when available
- Featured status for important projects
- Sort by tags functionality
- Responsive preview cards
- Home page prioritization

### 3. Photo Management System

The photo system combines aesthetics with technical metadata:

1. Photo Processing Workflow:

```javascript
const processPhoto = async (src, index) => {
  const fileResponse = await fetch(src);
  const buffer = await fileResponse.blob().arrayBuffer();
  const tags = await ExifReader.load(buffer);

  // Process EXIF data
  const image = new Image();
  await new Promise((resolve) => {
    image.onload = resolve;
    image.src = src;
  });

  return {
    src,
    index,
    meta: formatMetadata(tags, photoMetadata[src] || {}),
    dimensions: {
      width: image.naturalWidth,
      height: image.naturalHeight,
    },
  };
};
```

2. Custom metadata in `photo-meta.js` (Only for fallback):

```javascript
export const photoMetadata = {
  "/photos/photo-1.jpg": {
    camera: "Camera Model",
    lens: "Lens Details",
    iso: "400",
    focalLength: "50mm",
    exposure: "+1 ev",
    aperture: "f/2.8",
    shutterspeed: "1/100",
  },
  // More photos...
};
```

The photo gallery includes:

- Responsive masonry layout
- Automatic EXIF data extraction and display
- Camera settings visualization
- Progressive loading system
- Skeleton states for loading
- Touch-optimized navigation
- Automatic image optimization
- Layout recalculation on resize

## Core Features

### 1. Theme System

The theme system supports multiple modes: Light, Dark, and System:

```javascript
const effectiveTheme = sessionTheme || (prefersDark ? "dark" : "light");
document.documentElement.setAttribute("data-theme", effectiveTheme);

const themeColors = {
  light: "#ffffff",
  dark: "#1c1c1c",
};
```

Theme implementation uses CSS variables for consistent styling:

```css
[data-theme="light"] {
  --color-bg: #ffffff;
  --color-text: #18181b;
  --color-link: #2563eb;
  --blockquote-color: #64748b;
  --code-background-color: #edf2f7;
  --syntax-comment: #64748b;
  --syntax-keyword: #2563eb;
  /* Additional syntax highlighting variables */
}
```

The system:

- Persists theme preference
- Respects system preferences
- Smooth transitions
- No flash of wrong theme
- Consistent syntax highlighting
- System status bar colors

### 2. Analytics System

Real-time analytics using Supabase with optimistic updates:

1. View tracking:

```javascript
const trackView = async (pageId) => {
  if (viewedPages.has(pageId)) return;

  viewedPages.add(pageId);
  setIsUpdating(true);

  const { data } = await supabase.rpc("increment_views", {
    row_id: pageId,
  });

  if (data) {
    setStats(data);
    window?.sessionStorage?.setItem(`viewed-${pageId}-${getDateStr()}`, "true");
  }

  setIsUpdating(false);
};
```

2. Like system:

```javascript
const handleLike = async () => {
  if (hasLiked || isUpdating) return;

  setIsUpdating(true);
  setHasLiked(true);

  try {
    const { data } = await supabase.rpc("increment_likes", {
      row_id: pageId,
    });

    if (data) {
      setStats(data);
      window?.sessionStorage?.setItem(`liked-${pageId}`, "true");
    }
  } catch (error) {
    setHasLiked(false);
    console.error("Error liking:", error);
  } finally {
    setIsUpdating(false);
  }
};
```

Features include:

- Accurate view counting
- Like functionality
- Real-time updates
- Session tracking
- Cache management
- Optimistic updates
- Error handling
- Rate limiting

### 3. Animation and Transitions

The site utilizes Framer Motion for smooth animations:

```javascript
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.div>
  );
};
```

Animation features:

- Page transitions
- Component mount/unmount animations
- Scroll-based animations
- Hover effects
- Performance optimizations
- Reduced motion support

### 4. Code Highlighting System

The code highlighting system supports multiple languages and features:

```javascript
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

const HighlightCode = ({ code, language }) => {
  useEffect(() => {
    hljs.highlightAll();
  }, [code]);

  return (
    <pre>
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
};
```

Code features include:

- Syntax highlighting for multiple languages
- Copy code button
- Language tabs
- Line numbering
- Theme-compatible styling
- Responsive layout
- Overflow handling

## Performance Optimizations

### 1. Server Components

Leveraging Next.js 15's Server Components for performance:

```javascript
// Server Component
export default async function BlogPost({ params }) {
  const post = await getBlogPost(params.slug);
  const contentHtml = await markdownToHtml(post.content);
  return <MDXContent content={contentHtml} />;
}

// Client Component
"use client";
const PostStats = ({ slug }) => {
  const [stats, setStats] = useState({ views: 0, likes: 0 });
  // Realtime updates...
  return <StatsDisplay {...stats} />;
};
```

### 2. Asset Optimization

Careful resource loading:

```javascript
<link
  rel="preload"
  href="/fonts/SFMono-Regular.woff2"
  as="font"
  type="font/woff2"
  fetchPriority="high"
  crossOrigin="anonymous"
/>
```

### 3. State Management

Efficient React state handling:

```javascript
const [stats, setStats] = useState({ views: null, likes: null });
const [hasLiked, setHasLiked] = useState(false);
const [isUpdating, setIsUpdating] = useState(false);
```

## Development Workflow

### 1. Adding New Features

When adding new features:

1. Plan implementation

- Determine server/client components
- Design data structure
- Plan UI/UX flow

2. Create components

- Place in appropriate directory
- Add necessary types
- Implement error boundaries

3. Test thoroughly

- Check mobile responsiveness
- Verify dark mode
- Test error states

### 2. Development Process

Local development workflow:

```bash
npm run dev     # Start development server
npm run build   # Test production build
npm run start   # Preview production build
```

### 3. Deployment Process

Deployment to GitHub Pages:

```bash
npm run deploy  # Builds and deploys site
```

The deploy script:

- Builds the site
- Generates sitemap
- Updates meta tags
- Deploys to GitHub Pages

## Future Improvements

1. AI-powered search system
2. Enhanced analytics dashboard
3. Advanced content organization
4. Improved visualization options
5. Additional interaction features
6. Extended photo management

## Beyond the Tech

Every feature, from the theme system to the photo gallery, is designed with the user in mind. The minimal design lets content take center stage, while subtle animations and interactions make the site feel alive.

The decision to use pure CSS instead of a framework like Tailwind wasn't just about performance – it was about having complete control over the styling system. This allows for pixel-perfect implementations and smooth animations without the overhead of unused utilities.

<br>

The site remains open source and continuously evolving. Each feature has been implemented with careful consideration for both user experience and maintainability. I've designed the codebase to be modular and well-documented, making it easy to add new features and make improvements.

The workflows I've established for adding content - whether it's blog posts, projects, or photos - are streamlined yet flexible. This makes it easy to keep the site updated without compromising on quality or performance. Each section of the site serves a specific purpose:

- **Blog**: Technical writing and project documentation
- **Notes**: Academic and learning resources
- **Photos**: Visual storytelling and photography

The combination of Next.js 15's Server Components with careful client-side hydration has resulted in a site that's both fast and interactive. The real-time features powered by Supabase provide dynamic content without sacrificing performance.

I'm particularly proud of the theme system and typography choices. The SF Mono font family, combined with carefully chosen colors and spacing, creates a consistent and readable experience across all devices and themes.

Feel free to explore the [source code](https://github.com/dan10ish/dan10ish.github.io) for implementation details or [reach out](https://x.com/dan10ish) with questions and suggestions. I'm always looking for ways to improve and evolve this site!
