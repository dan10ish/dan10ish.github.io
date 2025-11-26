import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "./context/ThemeContext";
import "./globals.css";
import Navigation from "./components/Navigation";

const sfProDisplay = localFont({
  src: [
    {
      path: "../public/fonts/SF-Pro-Display-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/SF-Pro-Display-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/SF-Pro-Display-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/SF-Pro-Display-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/SF-Pro-Display-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/SF-Pro-Display-Heavy.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/SF-Pro-Display-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
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
    <html lang="en" className={`${sfProDisplay.variable} !h-dvh !antialiased p-8! tracking-widest font-medium text-lg`}>
      <body>
        <ThemeProvider>
          {children}
        <Navigation />
        </ThemeProvider>
      </body>
    </html>
  );
}
