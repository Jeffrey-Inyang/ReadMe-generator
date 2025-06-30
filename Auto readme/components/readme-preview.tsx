"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Copy, Download, Eye, Code, Loader2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface ReadmePreviewProps {
  content: string
  isGenerating: boolean
  onRegenerate: () => void
}

export function ReadmePreview({ content, isGenerating, onRegenerate }: ReadmePreviewProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("preview")

  const copyToClipboard = async () => {
    if (!content) {
      toast({
        title: "No Content",
        description: "Generate a README first to copy it.",
        variant: "destructive",
      })
      return
    }

    try {
      await navigator.clipboard.writeText(content)
      toast({
        title: "Copied!",
        description: "README content copied to clipboard.",
      })
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy content to clipboard.",
        variant: "destructive",
      })
    }
  }

  const downloadReadme = () => {
    if (!content) {
      toast({
        title: "No Content",
        description: "Generate a README first to download it.",
        variant: "destructive",
      })
      return
    }

    const blob = new Blob([content], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "README.md"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Downloaded!",
      description: "README.md file has been downloaded.",
    })
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              README Preview
            </CardTitle>
            <CardDescription>Preview and export your generated README</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={copyToClipboard} disabled={!content || isGenerating}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={downloadReadme} disabled={!content || isGenerating}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isGenerating ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="text-muted-foreground">Generating your README...</p>
            </div>
          </div>
        ) : content ? (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="markdown" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Markdown
              </TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="mt-4">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
              </div>
            </TabsContent>

            <TabsContent value="markdown" className="mt-4">
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto max-h-96 whitespace-pre-wrap">
                {content}
              </pre>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Your generated README will appear here</p>
            <p className="text-sm">Fill out the form and click generate to get started</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
