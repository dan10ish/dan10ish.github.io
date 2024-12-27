import { Suspense } from "react";
import ButtonsContainer from "@/components/ButtonsContainer";
import ThemeHandler, { ThemeButton } from "@/components/ThemeHandler";
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
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @font-face {
              font-family: "Geist Mono";
              src: url("/fonts/GeistMonoVF.woff2") format("woff2-variations");
              font-weight: 100 900;
              font-stretch: 75% 125%;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: "Sentient";
              src: url("/fonts/Sentient.woff2") format("woff2-variations");
              font-weight: 100 900;
              font-style: normal;
              font-display: swap;
            }
            :root {
              --font-normal: "Geist Mono", ui-monospace, monospace;
              --font-heading: "Sentient", system-ui, sans-serif;
              --color-bg: #ffffff;
              --color-text: #18181b;
              --color-link: #2563eb;
            }
            @media (prefers-color-scheme: dark) {
              :root {
                --color-bg: #09090b;
                --color-text: #fafafa;
                --color-link: #3b82f6;
              }
            }
            body {
              font-family: var(--font-normal);
              color: var(--color-text);
              background: var(--color-bg);
              margin: 0;
              padding: 0 20px 40px;
            }
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{const e=window.matchMedia("(prefers-color-scheme: dark)").matches,t=document.documentElement,o=e?"#09090b":"#ffffff";t.setAttribute("data-theme",e?"dark":"light"),t.style.backgroundColor=o,t.style.color=e?"#fafafa":"#18181b"}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <div className="gradient-overlay" />
        <ThemeHandler />
        <Suspense fallback={null}>
          <ButtonsContainer />
        </Suspense>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
