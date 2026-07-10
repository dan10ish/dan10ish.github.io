import type { Metadata } from "next";

import "./globals.css";

const geistSans = { variable: "--font-geist-sans" }; /* 
  variable: "--font-geist-sans",
   
 */

const geistMono = { variable: "--font-geist-mono" }; /* 
  variable: "--font-geist-mono",
   
 */

export const metadata: Metadata = {
  metadataBase: new URL("https://danishansari.co"),
  title: {
    default: "Danish",
    template: "%s | Danish",
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
    "India",
  ],
  authors: [{ name: "Danish Ansari", url: "https://danishansari.co" }],
  creator: "Danish Ansari",
  publisher: "Danish Ansari",
  icons: {
    icon: "/icon.png",
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
  alternates: { canonical: "https://danishansari.co" },
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Danish Ansari",
    alternateName: "dan10ish",
    url: "https://danishansari.co",
    image: "https://i.ibb.co/vmBrhSd/OG.png",
    jobTitle: "Mechatronics Engineer",
    description:
      "Mechatronics engineer integrating hardware and software to create applications in machine learning, robotics, and finance.",
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
    <html lang="en">
      <head>
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#161617" media="(prefers-color-scheme: dark)" />
        <link rel="alternate" href="/llms.txt" type="text/markdown" title="LLM-optimized content" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
