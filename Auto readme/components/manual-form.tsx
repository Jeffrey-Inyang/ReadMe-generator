"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Sparkles, X } from "lucide-react"

interface ManualFormProps {
  onGenerate: (readme: string) => void
  isGenerating: boolean
  setIsGenerating: (generating: boolean) => void
}

export function ManualForm({ onGenerate, isGenerating, setIsGenerating }: ManualFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    features: [] as string[],
    installation: "",
    usage: "",
    contributing: "",
    license: "",
    technologies: [] as string[],
    model: "openai/gpt-4", // Changed default to GPT-4o Mini
    template: "standard",
  })

  const [newFeature, setNewFeature] = useState("")
  const [newTech, setNewTech] = useState("")

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }))
      setNewFeature("")
    }
  }

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))
  }

  const addTechnology = () => {
    if (newTech.trim()) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()],
      }))
      setNewTech("")
    }
  }

  const removeTechnology = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.projectName || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the project name and description.",
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
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to generate README")
      }

      const data = await response.json()
      onGenerate(data.readme)

      toast({
        title: "README Generated!",
        description: "Your README has been generated successfully.",
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="projectName">Project Name *</Label>
          <Input
            id="projectName"
            value={formData.projectName}
            onChange={(e) => setFormData((prev) => ({ ...prev, projectName: e.target.value }))}
            placeholder="My Awesome Project"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="A brief description of what your project does..."
            required
          />
        </div>
      </div>

      <Separator />

      {/* Features */}
      <div className="space-y-4">
        <Label>Features</Label>
        <div className="flex gap-2">
          <Input
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Add a feature..."
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
          />
          <Button type="button" onClick={addFeature} variant="outline">
            Add
          </Button>
        </div>
        {formData.features.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {feature}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeFeature(index)} />
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Technologies */}
      <div className="space-y-4">
        <Label>Technologies Used</Label>
        <div className="flex gap-2">
          <Input
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            placeholder="React, Node.js, etc..."
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
          />
          <Button type="button" onClick={addTechnology} variant="outline">
            Add
          </Button>
        </div>
        {formData.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.technologies.map((tech, index) => (
              <Badge key={index} variant="outline" className="flex items-center gap-1">
                {tech}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeTechnology(index)} />
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Additional Sections */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="installation">Installation Instructions</Label>
          <Textarea
            id="installation"
            value={formData.installation}
            onChange={(e) => setFormData((prev) => ({ ...prev, installation: e.target.value }))}
            placeholder="npm install my-project"
          />
        </div>

        <div>
          <Label htmlFor="usage">Usage Examples</Label>
          <Textarea
            id="usage"
            value={formData.usage}
            onChange={(e) => setFormData((prev) => ({ ...prev, usage: e.target.value }))}
            placeholder="How to use your project..."
          />
        </div>

        <div>
          <Label htmlFor="contributing">Contributing Guidelines</Label>
          <Textarea
            id="contributing"
            value={formData.contributing}
            onChange={(e) => setFormData((prev) => ({ ...prev, contributing: e.target.value }))}
            placeholder="How others can contribute to your project..."
          />
        </div>

        <div>
          <Label htmlFor="license">License</Label>
          <Input
            id="license"
            value={formData.license}
            onChange={(e) => setFormData((prev) => ({ ...prev, license: e.target.value }))}
            placeholder="MIT, Apache 2.0, etc."
          />
        </div>
      </div>

      <Separator />

      {/* Generation Options */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="model">AI Model</Label>
          <Select value={formData.model} onValueChange={(value) => setFormData((prev) => ({ ...prev, model: value }))}>
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
          <Select
            value={formData.template}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, template: value }))}
          >
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

      <Button type="submit" className="w-full" disabled={isGenerating}>
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating README...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate README
          </>
        )}
      </Button>
    </form>
  )
}
