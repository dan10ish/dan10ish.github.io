import { Suspense } from "react";
import ButtonsContainer from "@/components/ButtonsContainer";
import ThemeHandler from "@/components/ThemeHandler";
import GradientOverlay from "@/components/GradientOverlay";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://danish.bio"),
  title: "Danish",
  description:
    "Danish is a mechatronics engineer exploring machine learning, robotics, and computer science. Discover his projects, writings, and technical insights.",
  keywords: [
    "Danish",
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
      "Danish's personal website featuring his engineering projects, technical writings, and insights in robotics and machine learning.",
    images: ["https://i.ibb.co/xYpLtw6/Link-Preview.png"],
  },
  openGraph: {
    type: "website",
    siteName: "Danish",
    title: "Danish",
    description:
      "Danish's personal website featuring his engineering projects, technical writings, and insights in robotics and machine learning.",
    url: "https://danish.bio",
    images: [
      {
        url: "https://i.ibb.co/xYpLtw6/Link-Preview.png",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const computedTheme = localStorage.getItem('computedTheme');
                  if (computedTheme) {
                    document.documentElement.setAttribute('data-theme', computedTheme);
                    return;
                  }
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = savedTheme || 'system';
                  const themeColors = {
                    light: '#ffffff',
                    dark: '#09090b',
                    solarized: '#002b36'
                  };
                  const effectiveTheme = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;
                  document.documentElement.setAttribute('data-theme', effectiveTheme);
                  const metaTheme = document.querySelector('meta[name="theme-color"]') || document.createElement('meta');
                  metaTheme.name = 'theme-color';
                  metaTheme.content = themeColors[effectiveTheme];
                  document.head.appendChild(metaTheme);
                  localStorage.setItem('computedTheme', effectiveTheme);
                } catch (e) {
                  console.error('Theme initialization error:', e);
                }
              })();
            `,
          }}
        />
        <link
          rel="preload"
          as="image"
          href="/icons/icon.png"
          type="image/png"
        />
        <link rel="icon" type="image/png" href="/icons/icon.png" />
        <link rel="apple-touch-icon" href="/icons/icon.png" />
        <link rel="shortcut icon" type="image/png" href="/icons/icon.png" />
        <link
          rel="preload"
          href="/fonts/GeistMono.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Sentient.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href={process.env.NEXT_PUBLIC_SUPABASE_URL}
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <GradientOverlay />
        <ThemeHandler />
        <Suspense fallback={null}>
          <ButtonsContainer />
        </Suspense>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
