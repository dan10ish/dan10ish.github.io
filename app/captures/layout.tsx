import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://danish.cv"),
  title: "Captures | Danish",
  description: "Danish's captures page featuring photos and videos showcasing moments and visual stories.",
  authors: [{ name: "Danish", url: "https://danish.cv" }],
  icons: {
    icon: "/icon.png",
  },
  keywords: [
    "Danish",
    "captures",
    "photos",
    "videos",
    "photography",
    "visual stories",
    "portfolio",
    "moments",
    "Danish Ansari",
    "Danish Mumbai",
    "mechatronics",
    "robotics",
    "machine learning",
    "developer",
    "engineer",
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
  alternates: { canonical: "https://danish.cv/captures" },
  twitter: {
    card: "summary_large_image",
    site: "@dan10ish",
    creator: "@dan10ish",
    title: "Captures | Danish",
    description: "Danish's captures page featuring photos and videos showcasing moments and visual stories.",
    images: ["https://i.ibb.co/LzvcgKNC/og.png"],
  },
  openGraph: {
    type: "website",
    siteName: "Danish",
    title: "Captures | Danish",
    description: "Danish's captures page featuring photos and videos showcasing moments and visual stories.",
    url: "https://danish.cv/captures",
    images: [
      {
        url: "https://i.ibb.co/LzvcgKNC/og.png",
        width: 1200,
        height: 675,
        type: "image/png",
        alt: "Danish's Captures Preview",
      },
    ],
  },
  other: {
    "profile:username": "dan10ish",
    "profile:first_name": "Danish",
  },
};

export const viewport: Viewport = {
};

export default function CapturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
