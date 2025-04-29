import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./ThemeProvider";
import { HeaderControls } from "./components/HeaderControls";

const sfMono = localFont({
  src: [
    {
      path: '../public/fonts/SFMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/SFMono-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/SFMono-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/SFMono-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sf-mono',
  display: 'swap',
  fallback: ['monospace'],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://danish.bio"),
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

export const viewport: Viewport = {
  themeColor: '#1c1c1c',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>

      </head>
      <body className={`${sfMono.variable}`}>
        <ThemeProvider>
          <HeaderControls />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
