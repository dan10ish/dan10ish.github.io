import { Suspense } from 'react';
import ThemeHandler from '@/components/ThemeHandler';
import "./globals.css";
import GradientOverlay from '@/components/GradientOverlay';
export const metadata = {
  metadataBase: new URL("https://danish.bio"),
  title: "Danish",
  description:
    "Danish is a mechatronics engineer exploring machine learning, robotics and finance. Discover his projects, writings, and technical insights.",
  keywords: [
    "Danish",
    "ai",
    "artificial intelligence",
    "Danish Ansari",
    "Danish Mumbai",
    "mechatronics",
    "robotics",
    "machine learning",
    "developer",
    "engineer",
    "portfolio",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://danish.bio",
  },
  twitter: {
    card: "summary_large_image",
    site: "@dan10ish",
    creator: "@dan10ish",
    title: "Danish",
    description:
      "Danish's personal website featuring his projects, technical writings, and insights in robotics and machine learning.",
    images: ["https://i.ibb.co/vmBrhSd/OG.png"],
  },
  openGraph: {
    type: "website",
    siteName: "Danish",
    title: "Danish",
    description:
      "Danish's personal website featuring his projects, technical writings, and insights in robotics and machine learning..",
    url: "https://danish.bio",
    images: [
      {
        url: "https://i.ibb.co/vmBrhSd/OG.png",
        width: 1200,
        height: 675,
        type: "image/png",
        alt: "Danish's Portfolio Preview",
      },
    ],
  },
  other: {
    "profile:username": "dan10ish",
    "profile:first_name": "Danish",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="" />
        <link
          rel="preload"
          href="/fonts/SFMono-Regular.woff2"
          as="font"
          type="font/woff2"
          fetchPriority="high"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://github.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://api.github.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://api.github.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                try {
                  const theme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                  document.querySelector('meta[name="theme-color"]').content = 
                    theme === 'dark' ? '#1c1c1c' : '#ffffff';
                } catch(e) {}
              })()
            `,
          }}
        />
        <link rel="icon" type="image/png" href="/icons/icon.png" />
      </head>
      <body>
        <GradientOverlay />
        <Suspense fallback={null}>
          <ThemeHandler />
        </Suspense>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
