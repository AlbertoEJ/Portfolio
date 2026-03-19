import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = "https://albertoej.com";

export const metadata: Metadata = {
  title: {
    default: "Alberto Espinosa — AI/ML Engineer & Researcher",
    template: "%s | Alberto Espinosa",
  },
  description:
    "PhD candidate in Computer Science specializing in deep learning, computer vision, NLP, and LLM solutions. Building intelligent systems that see, read, and understand.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Alberto Espinosa", url: siteUrl }],
  creator: "Alberto Espinosa",
  keywords: [
    "AI engineer",
    "ML engineer",
    "machine learning",
    "deep learning",
    "computer vision",
    "NLP",
    "LLM",
    "PhD researcher",
    "Alberto Espinosa",
    "portfolio",
    "software engineer",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Alberto Espinosa",
    title: "Alberto Espinosa — AI/ML Engineer & Researcher",
    description:
      "PhD candidate building intelligent systems with deep learning, computer vision, NLP, and LLMs.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Alberto Espinosa — AI/ML Engineer & Researcher",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alberto Espinosa — AI/ML Engineer & Researcher",
    description:
      "PhD candidate building intelligent systems with deep learning, computer vision, NLP, and LLMs.",
    images: ["/og-image.png"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
