# AutoReadMe - AI-Powered GitHub README Generator

Generate professional, well-structured README.md files for your GitHub repositories with AI assistance.

![AutoReadMe Screenshot](https://via.placeholder.com/800x400/000000/FFFFFF?text=AutoReadMe+Screenshot)

## ✨ Features

- **🤖 AI-Powered Generation**: Multiple AI models via OpenRouter API (GPT-4, Claude, Llama)
- **🔗 GitHub Integration**: Search and auto-populate from your repositories
- **📝 Manual Entry**: Complete form-based input for custom projects
- **👀 Live Preview**: Real-time markdown preview with syntax highlighting
- **🎨 Multiple Templates**: Choose from Standard, Minimal, Detailed, and Modern styles
- **📱 Responsive Design**: Works perfectly on desktop and mobile
- **🌙 Dark Mode**: Built-in theme switching
- **📋 Easy Export**: Copy to clipboard or download as README.md

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- OpenRouter API key
- GitHub Personal Access Token (optional, for GitHub integration)

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/autoreadme.git
cd autoreadme
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Add your API keys to `.env.local`:
\`\`\`env
OPENROUTER_API_KEY=your_openrouter_api_key_here
GITHUB_TOKEN=your_github_token_here
\`\`\`

5. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 API Keys Setup

### OpenRouter API Key
1. Visit [OpenRouter](https://openrouter.ai/keys)
2. Create an account and generate an API key
3. Add it to your `.env.local` file

### GitHub Token (Optional)
1. Go to [GitHub Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. Generate a new token with `public_repo` scope
3. Add it to your `.env.local` file

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + shadcn/ui
- **AI Integration**: OpenRouter API
- **GitHub API**: REST API v3
- **Markdown**: react-markdown with remark-gfm
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel

## 📖 Usage

### Manual Entry
1. Navigate to the Generator page
2. Fill out the project details form
3. Add features, technologies, and other information
4. Select your preferred AI model and template
5. Generate and preview your README

### GitHub Integration
1. Search for repositories by name or username
2. Select a repository from the results
3. Review auto-populated information
4. Choose AI model and template
5. Generate your README

## 🎨 Templates

- **Standard**: Professional, well-structured with all standard sections
- **Minimal**: Clean, essential information only
- **Detailed**: Comprehensive with extensive documentation
- **Modern**: Visually appealing with emojis and contemporary formatting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- AI powered by [OpenRouter](https://openrouter.ai/)
- Icons from [Lucide](https://lucide.dev/)

## 📧 Contact

Jeffrey Inyang - [@jeffrey_inyang](https://twitter.com/jeffrey_inyang) - [Website](https://jeffrey-inyang.vercel.app)

Project Link: [https://github.com/yourusername/autoreadme](https://github.com/yourusername/autoreadme)

---

⭐ Star this repo if you find it helpful!
