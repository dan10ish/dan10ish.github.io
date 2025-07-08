import type { Metadata } from "next";
import localFont from "next/font/local";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sfMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
