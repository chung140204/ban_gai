import type { Metadata, Viewport } from "next";
import { Quicksand, Baloo_2 } from "next/font/google";
import "./globals.css";
import { content } from "@/config/content";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
};

export const viewport: Viewport = {
  themeColor: "#ff8fb8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,        // cho phép pinch-zoom trên iOS
  viewportFit: "cover",   // full-bleed + safe-area trên iPhone có notch
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${quicksand.variable} ${baloo.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
