I rebuilt my website using Next.js 15 with React Server Components and the App Router, focusing on performance, minimalism, and user experience. Unlike typical portfolio sites that use frameworks like Tailwind CSS, this site uses pure CSS with variables and modules for better performance and control. Here's a detailed breakdown of how everything works.

## Core Architecture

### File Structure

```plaintext
├── app/                  # Next.js 15 app directory
│   ├── page.js           # Homepage (Server Component)
│   ├── layout.js         # Root layout with theme handling
│   ├── ml/               # Machine Learning section
│   ├── robotics/         # Robotics section
│   ├── finance/          # Finance section
│   ├── planes/           # Flight tracking dashboard
│   ├── photos/           # Dynamic photo gallery
│   ├── books/            # Interactive book showcase
│   ├── notes/            # PDF note viewer
│   ├── post/[slug]/      # Dynamic blog routes
│   └── resources/        # Categorized resources
├── components/           # React components
├── lib/                  # Utilities and data
├── content/              # Markdown content
└── public/               # Static assets
```

### Core Technologies

- Next.js 15 with App Router and Server Components
- CSS Variables for theming (no external frameworks)
- Supabase for real-time analytics
- Specialized fonts: Geist Mono & Sentient
- Integration libraries:
  - recharts for data visualization
  - exifreader for photo metadata
  - KaTeX for mathematical equations
  - highlight.js for code highlighting

## Feature Implementations

### 1. Theme System

The site features a sophisticated theme system with four options: Light, Dark, System, and Solarized. The implementation uses CSS variables and maintains consistency across page reloads:

```javascript
const themes = {
  system: {
    icon: <Monitor size={18} />,
    colors: ["#fafafa", "#18181b"],
  },
  light: {
    icon: <Sun size={18} />,
    colors: ["#ffffff"],
    bg: "#ffffff",
  },
  dark: {
    icon: <Moon size={18} />,
    colors: ["#09090b"],
    bg: "#09090b",
  },
  solarized: {
    icon: <Palette size={18} />,
    colors: ["#002b36"],
    bg: "#002b36",
  },
};
```

Each theme maintains its own color palette, affecting everything from text to code blocks to UI components. The system automatically detects user preferences and handles theme switching seamlessly.

### 2. Real-time Analytics

Every page incorporates an analytics system using Supabase's real-time capabilities:

```javascript
export async function getStats(pageId) {
  const cached = getStatsFromCache(pageId);
  if (cached) return cached;

  try {
    const { data } = await supabase
      .from("page_stats")
      .select("views, likes")
      .eq("id", pageId)
      .single();

    const result = data || { views: 0, likes: 0 };
    statsCache.set(pageId, {
      data: result,
      timestamp: Date.now(),
    });
    return result;
  } catch {
    return { views: 0, likes: 0 };
  }
}
```

The system includes:

- Real-time view counting
- Like functionality with optimistic updates
- Efficient caching with timestamp-based invalidation
- Multi-level storage (memory, localStorage, and database)
- Debounced updates to prevent spam

### 3. Interactive Book Display

The book section features a unique 3D book visualization system:

```javascript
const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <div
        className="book-cover"
        style={{
          "--book-color": book.coverColor,
          color: shouldUseWhiteText(book.coverColor) ? "#ffffff" : "#000000",
        }}
      >
        <div
          className="book-spine"
          style={{ backgroundColor: book.coverColor }}
        />
        <div className="book-spine-edge" />
        <div className="book-content">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">{book.author}</p>
        </div>
        <div className="book-right-edge" />
      </div>
    </div>
  );
};
```

Features include:

- Dynamic 3D transformations on hover
- Realistic spine and edge effects
- Color-adaptive text
- Touch-optimized interactions
- Category filtering

### 4. Aviation Dashboard

The planes section integrates with the Infinite Flight API to provide real-time flight statistics:

```javascript
const fetchFlightStats = async () => {
  const response = await fetch(
    "https://api.infiniteflight.com/public/v2/users",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_INFINITE_FLIGHT_API_KEY}`,
      },
      body: JSON.stringify({
        discourseNames: ["username"],
      }),
    },
  );
  // Process flight data
};
```

Dashboard features:

- Real-time flight tracking
- Historical flight data analysis
- Interactive metrics display
- Automatic data refresh
- Beautiful stat cards

### 5. Photo Gallery

A sophisticated photo management system:

```javascript
const processPhoto = async (src, index) => {
  try {
    const fileResponse = await fetch(src);
    const buffer = await fileResponse.blob().arrayBuffer();
    const tags = await ExifReader.load(buffer);

    return {
      src,
      index,
      meta: formatMetadata(tags, photoMetadata[src] || {}),
    };
  } catch (error) {
    return {
      src,
      index,
      meta: formatMetadata({}, photoMetadata[src] || {}),
    };
  }
};
```

Features:

- EXIF data extraction and display
- Responsive masonry layout
- Lazy loading
- Skeleton loading states
- Touch-optimized interaction

### 6. Finance Visualization

The finance section uses recharts for Treemap data visualization:

```javascript
const CustomTreemap = () => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <Treemap
        data={treemapData}
        dataKey="value"
        ratio={4 / 3}
        stroke="#fff"
        fill="#8884d8"
      />
    </ResponsiveContainer>
  );
};
```

Includes:

- Portfolio visualization with treemaps
- Real-time data updates
- Custom color schemes
- Responsive layouts
- Interactive tooltips

### 7. Code Block System

Advanced code block handling with multiple features:

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
    </div>
  );
});
```

Features:

- Multi-language support
- Syntax highlighting
- Copy functionality
- Line numbers
- Language tabs

### 8. Share System

Advanced sharing functionality:

```javascript
const shareButtons = [
  {
    name: "X",
    Icon: XIcon,
    action: () => {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `Check out this post by @dan10ish\n\n${url}`,
        )}`,
        "_blank",
      );
    },
  },
  // More share options...
];
```

Includes:

- Multiple platform support
- Copy to clipboard
- Link sharing
- Platform-specific formatting
- Success animations

## Performance Optimizations

1. Server Components

- Static page generation where possible
- Streaming for dynamic content
- Selective hydration
- Edge runtime support

2. Resource Loading

```javascript
<link
  rel="preload"
  href="/fonts/GeistMono.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
```

3. Advanced Caching

```javascript
const CACHE_TIME = 60000;
const statsCache = new Map();

const getStatsFromCache = (pageId) => {
  const cached = statsCache.get(pageId);
  return cached && Date.now() - cached.timestamp < CACHE_TIME
    ? cached.data
    : null;
};
```

4. Image Optimization

- Responsive sizing
- Format optimization
- Lazy loading
- Loading priority

## Development Workflow

1. Local Development

```bash
npm run dev
```

2. Production Build

```bash
npm run build && npm run start  # Preview production
```

3. Deployment

```bash
npm run deploy  # Builds, generates sitemap, and deploys
```

## Future Plans

1. AI-powered search
2. Advanced caching with Redis
3. Enhanced analytics dashboard
4. PWA implementation
5. WebAssembly optimizations
6. Additional visualization libraries

<br>

The site remains open source and continuously evolving. Feel free to explore the [source code](https://github.com/dan10ish/dan10ish.github.io) or [reach out](https://x.com/dan10ish) with suggestions!
