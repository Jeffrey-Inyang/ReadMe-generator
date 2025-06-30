import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Navigation } from "@/components/navigation"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "AutoReadMe - AI-Powered GitHub README Generator",
    template: "%s | AutoReadMe",
  },
  description:
    "Generate professional, well-structured README.md files for your GitHub repositories with AI assistance. Choose from multiple templates, connect your GitHub account, and create documentation that stands out.",
  keywords: [
    "README generator",
    "GitHub README",
    "AI documentation",
    "markdown generator",
    "GitHub tools",
    "developer tools",
    "documentation automation",
    "README templates",
    "OpenAI",
    "repository documentation",
  ],
  authors: [
    {
      name: "Jeffrey Inyang",
      url: "https://jeffrey-inyang.vercel.app",
    },
  ],
  creator: "Jeffrey Inyang",
  publisher: "AutoReadMe",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://autoreadme.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://autoreadme.dev",
    title: "AutoReadMe - AI-Powered GitHub README Generator",
    description:
      "Generate professional README.md files for your GitHub repositories with AI assistance. Multiple templates, GitHub integration, and live preview.",
    siteName: "AutoReadMe",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AutoReadMe - Generate professional README files with AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoReadMe - AI-Powered GitHub README Generator",
    description: "Generate professional README.md files for your GitHub repositories with AI assistance.",
    images: ["/og-image.png"],
    creator: "@jeffrey_inyang",
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
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.png",
        color: "#000000",
      },
    ],
  },
  manifest: "/site.webmanifest",
  category: "technology",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={<div>Loading...</div>}>
            <Navigation />
            <main className="min-h-screen bg-background">{children}</main>
            <Toaster />
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
