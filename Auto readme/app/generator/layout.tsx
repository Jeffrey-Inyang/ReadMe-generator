import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "README Generator",
  description:
    "Generate professional README.md files for your GitHub repositories. Choose between manual entry or GitHub integration with AI-powered content generation.",
  openGraph: {
    title: "README Generator - AutoReadMe",
    description: "Generate professional README.md files for your GitHub repositories with AI assistance.",
    url: "https://autoreadme.dev/generator",
  },
  twitter: {
    title: "README Generator - AutoReadMe",
    description: "Generate professional README.md files for your GitHub repositories with AI assistance.",
  },
}

export default function GeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
