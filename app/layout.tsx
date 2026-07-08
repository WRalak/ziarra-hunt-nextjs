import type { Metadata, Viewport } from "next";
import "./globals.css";
import { HuntShell } from "@/components/HuntShell";

export const metadata: Metadata = {
  title: "Ziarra Scavenger Hunt",
  description: "Explore campus. Solve clues. Win big - the Ziarra Scavenger Hunt.",
  icons: {
    icon: "/ziarra-logo.jpg",
    shortcut: "/ziarra-logo.jpg",
    apple: "/ziarra-logo.jpg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <HuntShell>{children}</HuntShell>
      </body>
    </html>
  );
}
