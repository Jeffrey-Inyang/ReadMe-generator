"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ManualForm } from "@/components/manual-form"
import { GitHubForm } from "@/components/github-form"
import { ReadmePreview } from "@/components/readme-preview"
import { FileText, Github } from "lucide-react"

export default function GeneratorPage() {
  const [generatedReadme, setGeneratedReadme] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">README Generator</h1>
          <p className="text-muted-foreground">Create professional README files for your GitHub repositories</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Tabs defaultValue="manual" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="manual" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Manual Entry
                </TabsTrigger>
                <TabsTrigger value="github" className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  GitHub Repo
                </TabsTrigger>
              </TabsList>

              <TabsContent value="manual">
                <Card>
                  <CardHeader>
                    <CardTitle>Manual Project Details</CardTitle>
                    <CardDescription>Fill out the form below with your project information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ManualForm
                      onGenerate={setGeneratedReadme}
                      isGenerating={isGenerating}
                      setIsGenerating={setIsGenerating}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="github">
                <Card>
                  <CardHeader>
                    <CardTitle>GitHub Repository</CardTitle>
                    <CardDescription>Search and select from your GitHub repositories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <GitHubForm
                      onGenerate={setGeneratedReadme}
                      isGenerating={isGenerating}
                      setIsGenerating={setIsGenerating}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <ReadmePreview
              content={generatedReadme}
              isGenerating={isGenerating}
              onRegenerate={() => {
                // This will be handled by the active form
              }}
            />
          </div>
        </div>
      </div>

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
