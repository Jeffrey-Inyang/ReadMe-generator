"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Github, Sparkles, Download, Eye, Copy } from "lucide-react"

export default function HomePage() {
  return (
    <>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <FileText className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            AutoReadMe
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Generate professional, well-structured README.md files for your GitHub repositories with AI assistance. Save
            time and create documentation that stands out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/generator">
                <Sparkles className="mr-2 h-5 w-5" />
                Start Generating
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </a>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardHeader>
              <Github className="h-8 w-8 text-primary mb-2" />
              <CardTitle>GitHub Integration</CardTitle>
              <CardDescription>
                Connect your GitHub account to automatically fetch repository metadata and generate READMEs
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Sparkles className="h-8 w-8 text-primary mb-2" />
              <CardTitle>AI-Powered</CardTitle>
              <CardDescription>
                Leverage OpenRouter API with multiple AI models to generate high-quality content for your documentation
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Eye className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>
                See your README in real-time with our live Markdown preview as you make changes
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <FileText className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Multiple Templates</CardTitle>
              <CardDescription>
                Choose from various professional templates to match your project's style and requirements
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Copy className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Easy Export</CardTitle>
              <CardDescription>Copy to clipboard or download your generated README with a single click</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Download className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Manual & Auto</CardTitle>
              <CardDescription>
                Fill out forms manually or let us auto-populate from your GitHub repository data
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* How It Works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold text-lg">
                1
              </div>
              <h3 className="text-xl font-semibold">Choose Input Method</h3>
              <p className="text-muted-foreground">
                Either fill out project details manually or connect your GitHub account to auto-fetch repository
                information
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold text-lg">
                2
              </div>
              <h3 className="text-xl font-semibold">Generate & Customize</h3>
              <p className="text-muted-foreground">
                Select your preferred AI model and template, then generate professional README content with our AI
                assistance
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold text-lg">
                3
              </div>
              <h3 className="text-xl font-semibold">Preview & Export</h3>
              <p className="text-muted-foreground">
                Review your README with live preview, make adjustments, and export to your repository
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Create Amazing READMEs?</h2>
          <p className="text-muted-foreground mb-6">
            Join developers who are creating better documentation with AutoReadMe
          </p>
          <Button size="lg" asChild>
            <Link href="/generator">Get Started Now</Link>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-4 text-xs text-muted-foreground">
        AutoReadMe&nbsp;|&nbsp;By&nbsp;
        <a
          href="https://jeffrey-inyang.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-primary"
        >
          Jeffrey Inyang
        </a>
      </footer>
    </>
  )
}
