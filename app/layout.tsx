import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
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
    icon: "/danish.jpeg",
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
        <meta name="theme-color" content="#f5f5f7" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
      </head>
      <body
        className={`${manrope.variable} ${manrope.className} antialiased`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}

