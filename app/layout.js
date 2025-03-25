import "./globals.css";

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
  alternates: { canonical: "https://danish.bio" },
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
      "Danish's personal website featuring his projects, technical writings, and insights in robotics and machine learning.",
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

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover",
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
          // Set theme only on initial page load - no listeners for changes
          document.documentElement.setAttribute("data-theme", window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        })()`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
          const metaThemeColor = document.createElement('meta');
          metaThemeColor.name = 'theme-color';
          metaThemeColor.content = document.documentElement.dataset.theme === 'dark' ? '#141414' : '#ffffff';
          document.head.appendChild(metaThemeColor);
        })()`,
          }}
        />
        <link
          rel="preload"
          href="/fonts/SFMono-Regular.woff2"
          as="font"
          type="font/woff2"
          fetchPriority="high"
          crossOrigin="anonymous"
        />
        <link rel="icon" type="image/png" href="/icons/icon.png" />
      </head>
      <body>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
