# Danish's Website

This repository contains the source code for my [personal website](https://dan10ish.github.io), built with Next.js and featuring a modern, responsive design.

## Project Structure

### Core Directories

- `/app` - Next.js 13+ app directory containing the main application routes and pages
  - `/api` - API routes and endpoints
  - `/planes` - Aviation-related content
  - `/notes` - Personal notes and documentation
  - `/photos` - Photo gallery and visual content
  - `/finance` - Financial-related content
  - `/post` - Blog post pages

- `/components` - Reusable React components
  - Content rendering components (Content.jsx, BlogPost.jsx)
  - UI components (Footer.js, ThemeHandler.jsx)
  - Code highlighting (HighlightCode.js, CodeBlock.jsx)
  - Photo gallery components (PhotoGrid.js, Gallery.jsx)
  - Navigation and UI elements (ScrollToTop.js, TOCButton.jsx)

- `/lib` - Utility functions and data management
  - MDX utilities for content processing
  - Supabase integration for backend services
  - Data management for posts, projects, and library content

- `/content` - Content management
  - `/blog` - Blog post content in MDX format

### Features

- Modern Next.js 13+ App Router implementation
- MDX support for content creation
- Responsive design with dark/light theme support
- Photo gallery with grid layout
- Code syntax highlighting
- Blog post system with MDX support
- Supabase integration for backend services
- SEO optimization with sitemap generation
- Smooth page transitions and animations

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Fill in required environment variables
4. Run the development server:
   ```bash
   npm run dev
   ```

## Technologies Used

- Next.js 13+
- React
- MDX
- Supabase
- Tailwind CSS
- Various UI components and utilities

## License

This project is private and proprietary.
