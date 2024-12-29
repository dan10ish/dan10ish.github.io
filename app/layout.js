import { Suspense } from "react";
import ButtonsContainer from "@/components/ButtonsContainer";
import ThemeHandler from "@/components/ThemeHandler";
import GradientOverlay from "@/components/GradientOverlay";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://danish.bio"),
  title: "Danish",
  description: "Danish's website containing his writings and projects",
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
  twitter: {
    card: "summary_large_image",
    site: "@dan10ish",
    creator: "@dan10ish",
    title: "Danish's Website",
    description: "Danish's personal website",
    images: ["https://i.ibb.co/xYpLtw6/Link-Preview.png"],
  },
  openGraph: {
    type: "website",
    siteName: "Danish",
    title: "Danish",
    description: "Danish's website containing his writings and projects",
    url: "https://danish.bio",
    images: [
      {
        url: "https://i.ibb.co/xYpLtw6/Link-Preview.png",
        width: 1200,
        height: 675,
        type: "image/png",
      },
    ],
  },
  other: { "profile:username": "dan10ish" },
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
                function setTheme() {
                  try {
                    const savedTheme = localStorage.getItem('theme');
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
                    const themeColors = { light: '#ffffff', dark: '#09090b', solarized: '#002b36' };
                    document.documentElement.setAttribute('data-theme', theme);

                    let metaTheme = document.querySelector('meta[name="theme-color"]');
                    if (!metaTheme) {
                      metaTheme = document.createElement('meta');
                      metaTheme.name = 'theme-color';
                      document.head.appendChild(metaTheme);
                    }
                    metaTheme.content = themeColors[theme];
                  } catch (e) {
                    console.error('Theme initialization error:', e);
                  }
                }
                setTheme();
                document.addEventListener('DOMContentLoaded', setTheme);
              })();
            `,
          }}
        />
        <link
          rel="preload"
          href="/fonts/GeistMonoVF.woff2"
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
