# Danish's Website

This repository contains the source code for my [personal website](https://dan10ish.github.io), built with Next.js and featuring a modern, responsive design.

## Project Structure

### Core Directories

- `/app` - Next.js 13+ app directory containing the main application routes and pages
  - `/api` - API routes and endpoints
    - `/photos` - Photo gallery API endpoints
  - `/photos` - Photo gallery and visual content

- `/components` - Reusable React components
  - `Content.jsx` - Main content rendering component
  - `PhotoGrid.js` - Photo gallery grid layout
  - `ProjectModal.jsx` - Modal for displaying project details
  - `PhotoModal.jsx` - Modal for displaying photos
  - `ScrollToTop.js` - Navigation component to scroll back to top
  - `ButtonsContainer.jsx` - Container for navigation buttons
  - `PageTransition.jsx` - Component for smooth page transitions
  - `ScrollIndicator.jsx` - Visual scroll progress indicator
  - `HomeButton.jsx` - Navigation button for returning home
  - `GradientOverlay.js` - Gradient overlay component for visual effects

- `/hooks` - Custom React hooks
  - `useScrollAnimation.js` - Hook for scroll-based animations

- `/lib` - Utility functions and data management
  - `projects.js` - Project data management
  - `photo-meta.js` - Photo metadata utilities

- `/public` - Static assets
  - `/photos` - Photo assets
  - `/icons` - Icon assets
  - `/fonts` - Font assets
  - `/notes` - Static note assets
  - `/project-videos` - Project video assets

### Features

- Modern Next.js 13+ App Router implementation
- Responsive design with visual animations
- Photo gallery with grid layout
- Project showcase with detailed modals
- Code syntax highlighting
- Smooth page transitions and animations
- SEO optimization with sitemap generation
- Custom error and 404 pages

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
- Tailwind CSS (based on globals.css)
- Custom React Hooks
- Modern JavaScript features

## License

This project is private and proprietary.
