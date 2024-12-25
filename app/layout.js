import { Suspense } from "react";
import Script from "next/script";
import ButtonsContainer from "@/components/ButtonsContainer";
import ThemeHandler from "@/components/ThemeHandler";
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
  other: {
    "profile:username": "dan10ish",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                (function() {
                  try {
                    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    const root = document.documentElement;
                    const themeColor = isDark ? '#09090b' : '#ffffff';
                    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
                    root.style.backgroundColor = themeColor;
                    root.style.color = isDark ? '#fafafa' : '#18181b';
                    const meta = document.createElement('meta');
                    meta.name = 'theme-color';
                    meta.content = themeColor;
                    document.getElementsByTagName('head')[0].appendChild(meta);
                  } catch (e) {}
                })();
              `,
          }}
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
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
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/github.css"
          as="style"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
      </head>
      <body>
        <div className="gradient-overlay" />
        <ThemeHandler />
        <Suspense fallback={null}>
          <ButtonsContainer />
        </Suspense>
        <main className="container">{children}</main>
        <Script id="location-handler" strategy="afterInteractive">
          {`(function(l){if(l.search[1]==='/'){var decoded=l.search.slice(1).split('&').map(function(s){return s.replace(/~and~/g,'&')}).join('?');window.history.replaceState(null,null,l.pathname.slice(0,-1)+decoded+l.hash)}}(window.location))`}
        </Script>
      </body>
    </html>
  );
}
