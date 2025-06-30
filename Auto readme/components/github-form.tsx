"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Github, Search, Sparkles, ExternalLink } from "lucide-react"

interface Repository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  language: string | null
  topics: string[]
  created_at: string
  updated_at: string
  stargazers_count: number
  forks_count: number
}

interface GitHubFormProps {
  onGenerate: (readme: string) => void
  isGenerating: boolean
  setIsGenerating: (generating: boolean) => void
}

export function GitHubForm({ onGenerate, isGenerating, setIsGenerating }: GitHubFormProps) {
  const { toast } = useToast()
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [model, setModel] = useState("openai/gpt-4")
  const [template, setTemplate] = useState("standard")

  const searchRepositories = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search Query Required",
        description: "Please enter a repository name or username to search.",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)

    try {
      const response = await fetch(`/api/github/search?q=${encodeURIComponent(searchQuery)}`)

      if (!response.ok) {
        throw new Error("Failed to search repositories")
      }

      const data = await response.json()
      setRepositories(data.repositories)

      if (data.repositories.length === 0) {
        toast({
          title: "No Repositories Found",
          description: "Try a different search term or check the repository name.",
        })
      }
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Failed to search repositories. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSearching(false)
    }
  }

  const generateFromRepo = async () => {
    if (!selectedRepo) {
      toast({
        title: "No Repository Selected",
        description: "Please select a repository first.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate-readme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName: selectedRepo.name,
          description: selectedRepo.description || "",
          technologies: selectedRepo.language ? [selectedRepo.language] : [],
          features: selectedRepo.topics || [],
          model,
          template,
          githubData: {
            url: selectedRepo.html_url,
            stars: selectedRepo.stargazers_count,
            forks: selectedRepo.forks_count,
            created: selectedRepo.created_at,
            updated: selectedRepo.updated_at,
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate README")
      }

      const data = await response.json()
      onGenerate(data.readme)

      toast({
        title: "README Generated!",
        description: "Your README has been generated from the repository data.",
      })
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate README. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <div className="space-y-4">
        <Label htmlFor="search">Search GitHub Repositories</Label>
        <div className="flex gap-2">
          <Input
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter repository name or username..."
            onKeyPress={(e) => e.key === "Enter" && searchRepositories()}
          />
          <Button onClick={searchRepositories} disabled={isSearching} variant="outline">
            {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Repository Results */}
      {repositories.length > 0 && (
        <div className="space-y-4">
          <Label>Select Repository</Label>
          <div className="grid gap-3 max-h-96 overflow-y-auto">
            {repositories.map((repo) => (
              <Card
                key={repo.id}
                className={`cursor-pointer transition-colors ${
                  selectedRepo?.id === repo.id ? "ring-2 ring-primary" : "hover:bg-muted/50"
                }`}
                onClick={() => setSelectedRepo(repo)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        {repo.name}
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {repo.description || "No description available"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        {repo.language}
                      </span>
                    )}
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🍴 {repo.forks_count}</span>
                  </div>
                  {repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                      {repo.topics.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{repo.topics.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Selected Repository Details */}
      {selectedRepo && (
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Github className="h-5 w-5" />
              Selected: {selectedRepo.name}
            </CardTitle>
            <CardDescription>{selectedRepo.description || "No description available"}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Language:</strong> {selectedRepo.language || "Not specified"}
              </div>
              <div>
                <strong>Stars:</strong> {selectedRepo.stargazers_count}
              </div>
              <div>
                <strong>Forks:</strong> {selectedRepo.forks_count}
              </div>
              <div>
                <strong>Updated:</strong> {new Date(selectedRepo.updated_at).toLocaleDateString()}
              </div>
            </div>
            {selectedRepo.topics.length > 0 && (
              <div className="mt-4">
                <strong className="text-sm">Topics:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedRepo.topics.map((topic) => (
                    <Badge key={topic} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Generation Options */}
      {selectedRepo && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="model">AI Model</Label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai/gpt-4">GPT-4o Mini (Recommended)</SelectItem>
                <SelectItem value="anthropic/claude-3-haiku">Claude 3 Haiku</SelectItem>
                <SelectItem value="meta-llama/llama-3.1-8b-instruct">Llama 3.1 8B (Free)</SelectItem>
                <SelectItem value="openai/gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="template">Template Style</Label>
            <Select value={template} onValueChange={setTemplate}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
                <SelectItem value="detailed">Detailed</SelectItem>
                <SelectItem value="modern">Modern</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Generate Button */}
      {selectedRepo && (
        <Button onClick={generateFromRepo} className="w-full" disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating README...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate README from Repository
            </>
          )}
        </Button>
      )}
    </div>
  )
}
