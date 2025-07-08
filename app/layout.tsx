import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeToggle } from './components/ThemeToggle';
import "./globals.css";

const sfMono = localFont({
  src: [
    { path: '../public/fonts/SFMono-Light.woff2', weight: '300' },
    { path: '../public/fonts/SFMono-Regular.woff2', weight: '400' },
    { path: '../public/fonts/SFMono-Medium.woff2', weight: '500' },
    { path: '../public/fonts/SFMono-Semibold.woff2', weight: '600' },
    { path: '../public/fonts/SFMono-Bold.woff2', weight: '700' },
    { path: '../public/fonts/SFMono-Heavy.woff2', weight: '800' },
  ],
  variable: "--font-sf-mono",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dan10ish.github.io"),
  title: "Danish Ansari",
  description:
  "Danish is a mechatronics engineer exploring machine learning, robotics and finance. This is his personal website.",
  icons: {
    icon: '/icon.png',
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
      "Danish's personal website featuring his projects and insights in robotics and machine learning.",
    images: ["https://i.ibb.co/vmBrhSd/OG.png"],
  },
  openGraph: {
    type: "website",
    siteName: "Danish",
    title: "Danish",
    description:
      "Danish's personal website featuring his projects and insights in robotics and machine learning.",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = theme === 'dark' || (!theme && systemDark);
                  
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  }
                  
                  var meta = document.createElement('meta');
                  meta.name = 'theme-color';
                  meta.content = isDark ? '#171717' : '#f8f8f8';
                  document.head.appendChild(meta);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${sfMono.variable} antialiased bg-[rgb(var(--background))] text-[rgb(var(--foreground))] transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
