import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dan10ish.github.io"),
  title: "Danish",
  description:
    "Danish is a mechatronics engineer exploring machine learning, robotics and finance. This is his personal website.",
  icons: {
    icon: "/icon.png",
  },
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
  alternates: { canonical: "https://dan10ish.github.io" },
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
    url: "https://dan10ish.github.io",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/Garamond.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}

