import { Suspense } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";
import "./globals.css";
import "highlight.js/styles/github.css";
import HamburgerMenu from "@/components/ButtonsContainer";

export const metadata = {
  metadataBase: new URL("https://danish.bio"),
  title: "Danish",
  description: "Danish's website containing his writings and projects",
  robots: "index,follow,nocache",
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="https://i.ibb.co/vYPYQd1/favicon.jpg" />
        <link
          rel="preload"
          href="/fonts/Sentient.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#ffffff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#1c1c1e"
        />
      </head>
      <body>
        <Suspense fallback={null}>
          <HamburgerMenu />
        </Suspense>
        <main className="container">{children}</main>
        <Script id="location-handler" strategy="afterInteractive">
          {`
            (function (l) {
              if (l.search[1] === '/') {
                var decoded = l.search
                  .slice(1)
                  .split('&')
                  .map(function (s) {
                    return s.replace(/~and~/g, '&');
                  })
                  .join('?');
                window.history.replaceState(
                  null,
                  null,
                  l.pathname.slice(0, -1) + decoded + l.hash
                );
              }
            })(window.location);
          `}
        </Script>
      </body>
    </html>
  );
}
