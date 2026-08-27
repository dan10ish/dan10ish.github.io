import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeToggleButton } from "./components/ThemeToggleButton";

const sfMono = localFont({
  src: [
    { path: "../public/fonts/SFMono-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/SFMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/SFMono-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/SFMono-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/SFMono-Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/SFMono-Heavy.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const BASE_URL = "https://danishansari.co";
const OG_IMAGE = `${BASE_URL}/ogimage.png`;
const ICON = `${BASE_URL}/icon.png`;
const DESCRIPTION =
  "Mechatronics engineer integrating hardware and software to create applications in machine learning, robotics, and finance.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Danish",
    template: "%s | Danish",
  },
  description: DESCRIPTION,
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
    "India",
  ],
  authors: [{ name: "Danish Ansari", url: BASE_URL }],
  creator: "Danish Ansari",
  publisher: "Danish Ansari",
  icons: {
    icon: [{ url: ICON, type: "image/png" }],
    apple: [{ url: ICON, type: "image/png" }],
    shortcut: ICON,
  },
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
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Danish Ansari",
    title: "Danish Ansari",
    description: DESCRIPTION,
    url: BASE_URL,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
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
    description: DESCRIPTION,
    images: [OG_IMAGE],
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Danish Ansari",
    alternateName: "dan10ish",
    url: BASE_URL,
    image: OG_IMAGE,
    jobTitle: "Mechatronics Engineer",
    description: DESCRIPTION,
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Robotics",
      "Mechatronics",
      "Finance",
      "Software Development",
    ],
    sameAs: [
      "https://github.com/dan10ish",
      "https://linkedin.com/in/dan10ish",
      "https://x.com/dan10ish",
      "https://instagram.com/dan10ish",
      "https://snapchat.com/add/dan10ish",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="shortcut icon" href="/icon.png" type="image/png" />

        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Danish Ansari Portfolio Preview" />

        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />

        <link rel="alternate" href="/llms.txt" type="text/markdown" title="LLM-optimized content" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${sfMono.variable} font-sans antialiased min-h-svh relative`}
      >
        <ThemeProvider attribute="data-theme" defaultTheme="gray" themes={["gray", "green", "onyx", "solarized"]}>
          {children}
          <ThemeToggleButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
