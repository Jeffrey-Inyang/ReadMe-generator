import { type NextRequest, NextResponse } from "next/server"

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

interface GenerateRequest {
  projectName: string
  description: string
  features?: string[]
  installation?: string
  usage?: string
  contributing?: string
  license?: string
  technologies?: string[]
  model: string
  template: string
  githubData?: {
    url: string
    stars: number
    forks: number
    created: string
    updated: string
  }
}

function getTemplatePrompt(template: string): string {
  const templates = {
    standard:
      "Create a professional, well-structured README with all standard sections including installation, usage, and contributing guidelines.",
    minimal:
      "Create a clean, minimal README focusing on essential information only - description, installation, and basic usage.",
    detailed:
      "Create a comprehensive, detailed README with extensive documentation, examples, troubleshooting, and advanced usage scenarios.",
    modern:
      "Create a modern, visually appealing README with emojis, badges, and contemporary formatting that stands out on GitHub.",
  }

  return templates[template as keyof typeof templates] || templates.standard
}

function buildPrompt(data: GenerateRequest): string {
  const templateInstruction = getTemplatePrompt(data.template)

  let prompt = `${templateInstruction}

Project Details:
- Name: ${data.projectName}
- Description: ${data.description}`

  if (data.technologies && data.technologies.length > 0) {
    prompt += `\n- Technologies: ${data.technologies.join(", ")}`
  }

  if (data.features && data.features.length > 0) {
    prompt += `\n- Key Features: ${data.features.join(", ")}`
  }

  if (data.installation) {
    prompt += `\n- Installation: ${data.installation}`
  }

  if (data.usage) {
    prompt += `\n- Usage: ${data.usage}`
  }

  if (data.contributing) {
    prompt += `\n- Contributing: ${data.contributing}`
  }

  if (data.license) {
    prompt += `\n- License: ${data.license}`
  }

  if (data.githubData) {
    prompt += `\n- GitHub URL: ${data.githubData.url}
- Stars: ${data.githubData.stars}
- Forks: ${data.githubData.forks}
- Created: ${new Date(data.githubData.created).toLocaleDateString()}
- Last Updated: ${new Date(data.githubData.updated).toLocaleDateString()}`
  }

  prompt += `\n\nGenerate a complete README.md file in markdown format. Include appropriate sections like:
- Project title and description
- Features (if provided)
- Technologies used
- Installation instructions
- Usage examples
- Contributing guidelines (if provided)
- License information (if provided)

Make sure the README is professional, well-formatted, and follows GitHub README best practices. Use proper markdown syntax and include relevant badges if appropriate.`

  return prompt
}

export async function POST(request: NextRequest) {
  try {
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ error: "OpenRouter API key not configured" }, { status: 500 })
    }

    const data: GenerateRequest = await request.json()

    if (!data.projectName || !data.description) {
      return NextResponse.json({ error: "Project name and description are required" }, { status: 400 })
    }

    const prompt = buildPrompt(data)

    // Map our model names to OpenRouter's expected format
    const modelMap: Record<string, string> = {
      "openai/gpt-3.5-turbo": "openai/gpt-3.5-turbo",
      "openai/gpt-4": "openai/gpt-4o-mini",
      "anthropic/claude-3-haiku": "anthropic/claude-3-haiku",
      "meta-llama/llama-3.1-8b-instruct": "meta-llama/llama-3.1-8b-instruct:free",
    }

    const actualModel = modelMap[data.model] || "openai/gpt-4o-mini"

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://autoreadme.dev",
        "X-Title": "AutoReadMe",
      },
      body: JSON.stringify({
        model: actualModel,
        messages: [
          {
            role: "system",
            content:
              "You are a professional technical writer specializing in creating high-quality README files for GitHub repositories. Generate clear, comprehensive, and well-structured README content in markdown format.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("OpenRouter API error:", response.status, errorData)
      throw new Error(`OpenRouter API error: ${response.status}`)
    }

    const result = await response.json()

    if (!result.choices || !result.choices[0] || !result.choices[0].message) {
      throw new Error("Invalid response from OpenRouter API")
    }

    const readme = result.choices[0].message.content

    return NextResponse.json({ readme })
  } catch (error) {
    console.error("README generation error:", error)
    return NextResponse.json({ error: "Failed to generate README" }, { status: 500 })
  }
}
