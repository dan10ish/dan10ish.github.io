import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Captures | Danish",
  description: "Danish's captures page featuring photos and videos showcasing moments and visual stories.",
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
  ],
  authors: [{ name: 'Danish', url: 'https://danish.cv' }],
  alternates: {
    canonical: "https://danish.cv/captures",
  },
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    type: "website",
    title: "Captures | Danish",
    description: "Danish's captures page featuring photos and videos showcasing moments and visual stories.",
    url: "https://danish.cv/captures",
    siteName: 'Danish',
    images: [
      {
        url: "https://i.ibb.co/LzvcgKNC/og.png",
        width: 1200,
        height: 675,
        type: "image/png",
        alt: "Danish's Captures Preview",
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: "summary_large_image",
    title: "Captures | Danish",
    description: "Danish's captures page featuring photos and videos showcasing moments and visual stories.",
    site: "@dan10ish",
    creator: "@dan10ish",
    images: ["https://i.ibb.co/LzvcgKNC/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function CapturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
