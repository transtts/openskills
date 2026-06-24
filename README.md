<div align="center">

# 🚀 OpenSkills

### Discover, Browse & Share the Best Open-Source Skills in One Place

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-Powered-4285F4?logo=google&logoColor=white)](https://ai.google.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**A centralized directory for discovering, browsing, searching, and accessing open-source GitHub repositories and AI skills.**

[Live Demo](https://ai.studio/apps/aa671fce-0ade-4c52-8907-83c4c8220a5f) · [Report Bug](https://github.com/transtts/openskills/issues) · [Request Feature](https://github.com/transtts/openskills/issues)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔍 **Smart Search** | Instant search across skills, repos, tags, and authors with `Ctrl+K` shortcut |
| 📂 **Category Browsing** | Organized categories — Development, Data, Writing, Automation & more |
| 🏆 **Featured & Trending** | Discover featured skills and trending repos (Today / Week / Month) |
| 📑 **Curated Collections** | Handpicked editorial collections of related skills |
| 📚 **Resource Library** | Articles, tutorials, videos, and documentation guides |
| 💡 **Prompt Library** | Ready-to-use prompts for Coding, Writing, Marketing, Research & Automation |
| ➕ **Submit a Skill** | Community-driven submissions with admin approval workflow |
| 🛡️ **Admin Dashboard** | Full moderation panel — approve, reject, edit, and manage skills |
| 🔖 **Bookmarks** | Save favorite skills locally for quick access |
| 🌐 **Multi-Language** | English & Hindi (हिन्दी) language support |
| 🌗 **Dark / Light Mode** | Theme toggle with persistent preference |
| 📊 **Grid & Table Views** | Switch between card grid and compact table layouts |
| 🤖 **Gemini AI Powered** | Server-side Gemini API integration for intelligent features |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | React 19 + TypeScript |
| **Build Tool** | Vite 6 |
| **Styling** | Tailwind CSS 4 + tw-animate-css |
| **UI Components** | Radix UI, shadcn/ui, Base UI |
| **Animations** | Motion (Framer Motion) |
| **Icons** | Lucide React |
| **Charts** | Recharts |
| **AI** | Google Gemini API (`@google/genai`) |
| **Backend** | Express.js (API proxy) |
| **Typography** | Geist Font |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Gemini API Key](https://aistudio.google.com/apikey)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/transtts/openskills.git
   cd openskills
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and add your Gemini API key:
   ```env
   GEMINI_API_KEY="your_gemini_api_key_here"
   APP_URL="http://localhost:3000"
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 📁 Project Structure

```
openskills/
├── src/
│   ├── App.tsx              # Main application with routing & state
│   ├── main.tsx             # React entry point
│   ├── index.css            # Global styles & Tailwind config
│   ├── types.ts             # TypeScript interfaces
│   ├── data.ts              # Initial seed data (skills, categories, etc.)
│   ├── translations.ts      # i18n translations (EN/HI)
│   └── components/
│       ├── Header.tsx        # Navigation bar with search & language toggle
│       ├── Hero.tsx          # Landing hero section with stats
│       ├── SearchSection.tsx # Advanced search with filters
│       ├── CategoryGrid.tsx  # Category cards grid
│       ├── CollectionList.tsx    # Curated collections
│       ├── ResourceLibrary.tsx   # Learning resources
│       ├── PromptLibrary.tsx     # AI prompts library
│       ├── LatestReposTable.tsx   # Compact table view
│       ├── SkillDetailsModal.tsx  # Detailed skill documentation modal
│       ├── SubmitForm.tsx         # Community submission form
│       └── AdminDashboard.tsx     # Admin moderation panel
├── assets/                  # Static assets
├── components/              # Shared UI components (shadcn)
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
├── index.html               # HTML entry point
├── package.json             # Dependencies & scripts
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── .env.example             # Environment variables template
└── .gitignore               # Git ignore rules
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Type-check with TypeScript |
| `npm run clean` | Remove dist and build artifacts |

---

## 🤝 Contributing

Contributions make the open-source community amazing! Any contributions you make are **greatly appreciated**.

1. **Fork** the project
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

You can also **submit a skill** directly through the app using the **Submit** tab!

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 🙏 Acknowledgements

- [Google Gemini AI](https://ai.google.dev) — AI-powered features
- [React](https://react.dev) — UI framework
- [Vite](https://vitejs.dev) — Build tool
- [Tailwind CSS](https://tailwindcss.com) — Styling
- [Radix UI](https://www.radix-ui.com) — Accessible components
- [Lucide](https://lucide.dev) — Beautiful icons
- [Recharts](https://recharts.org) — Data visualization

---

<div align="center">

**⭐ Star this repo if you found it useful!**

Made with ❤️ by [TransTTS](https://github.com/transtts)

</div>
