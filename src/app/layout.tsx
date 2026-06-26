import type { Metadata } from "next";
import { Inter, Sora, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://dinh-hieu-trong.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Đinh Hiếu Trọng — Software Engineer & Backend Developer",
    template: "%s · Đinh Hiếu Trọng",
  },
  description:
    "Portfolio của Đinh Hiếu Trọng — Software Engineer chuyên Backend với PHP, Laravel, Node.js, NestJS. Xây dựng hệ thống ổn định, dễ mở rộng với kiến trúc sạch và best practices.",
  keywords: [
    "Đinh Hiếu Trọng",
    "Dinh Hieu Trong",
    "Software Engineer",
    "Backend Developer",
    "PHP Developer",
    "Laravel Developer",
    "Node.js Developer",
    "NestJS",
    "Portfolio",
    "Backend Vietnam",
    "API Developer",
  ],
  authors: [{ name: "Đinh Hiếu Trọng", url: siteUrl }],
  creator: "Đinh Hiếu Trọng",
  publisher: "Đinh Hiếu Trọng",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteUrl,
    title: "Đinh Hiếu Trọng — Software Engineer & Backend Developer",
    description:
      "Portfolio của Đinh Hiếu Trọng — Software Engineer chuyên Backend với PHP, Laravel, Node.js, NestJS. Xây dựng hệ thống ổn định, dễ mở rộng.",
    siteName: "Đinh Hiếu Trọng Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Đinh Hiếu Trọng — Software Engineer & Backend Developer",
    description:
      "Portfolio của Đinh Hiếu Trọng — Software Engineer chuyên Backend với PHP, Laravel, Node.js, NestJS.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1116" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${sora.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <SonnerToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
