import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeToggle from "./ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://danishansari.co"),
  title: {
    default: "Danish Ansari",
    template: "%s | Danish Ansari",
  },
  description:
    "Mechatronics engineer integrating hardware and software to create applications in machine learning, robotics, and finance.",
  generator: "Next.js",
  applicationName: "Danish Ansari",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Danish Ansari",
    "dan10ish",
    "mechatronics engineer",
    "machine learning engineer",
    "robotics engineer",
    "artificial intelligence",
    "finance",
    "software developer",
    "portfolio",
    "projects",
    "Mumbai",
    "Dar es Salaam",
    "Tanzania",
    "Africa",
    "India"
  ],
  authors: [{ name: "Danish Ansari", url: "https://danishansari.co" }],
  creator: "Danish Ansari",
  publisher: "Danish Ansari",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: "https://danishansari.co" },
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Danish Ansari",
    title: "Danish Ansari",
    description:
      "Mechatronics engineer integrating hardware and software to create applications in machine learning, robotics, and finance.",
    url: "https://danishansari.co",
    images: [
      {
        url: "https://i.ibb.co/vmBrhSd/OG.png",
        width: 1200,
        height: 675,
        type: "image/png",
        alt: "Danish Ansari Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dan10ish",
    creator: "@dan10ish",
    title: "Danish Ansari",
    description:
      "Mechatronics engineer integrating hardware and software to create applications in machine learning, robotics, and finance.",
    images: ["https://i.ibb.co/vmBrhSd/OG.png"],
  },
  other: {
    "profile:username": "dan10ish",
    "profile:first_name": "Danish",
    "profile:last_name": "Ansari",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#f5f5f7" />
        <link
          rel="preload"
          href="/fonts/Garamond.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t);var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',t==='dark'?'#161618':'#f5f5f7');var c=document.querySelector('meta[name="color-scheme"]');if(c)c.setAttribute('content',t)}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>{children}</main>
        <ThemeToggle />
      </body>
    </html>
  );
}

