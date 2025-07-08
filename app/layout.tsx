import type { Metadata, Viewport } from "next";
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
  title: "Danish Ansari",
  description: "Mechatronics Engineer",
  icons: {
    icon: '/icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f8f8' },
    { media: '(prefers-color-scheme: dark)', color: '#171717' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sfMono.variable} antialiased bg-[#f8f8f8] text-[#171717] dark:bg-[#171717] dark:text-[#f8f8f8] transition-colors`}
      >
        <ThemeProvider>
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
