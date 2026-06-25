import { Skill, Category, Collection, Resource, Prompt } from './types';

export const initialCategories: Category[] = [
  {
    "id": "development",
    "name": "Development",
    "iconName": "Code2",
    "skillsCount": 4,
    "description": "Code execution, databases, git integrations, sandboxes, and APIs"
  },
  {
    "id": "writing",
    "name": "Writing",
    "iconName": "PenTool",
    "skillsCount": 0,
    "description": "Content writing, editing, formatting, and translation tools"
  },
  {
    "id": "research",
    "name": "Research",
    "iconName": "BookOpen",
    "skillsCount": 1,
    "description": "Search engines, data scraping, wikipedia, and scholarly search"
  },
  {
    "id": "marketing",
    "name": "Marketing",
    "iconName": "Megaphone",
    "skillsCount": 0,
    "description": "SEO optimization, copy writing, and social media posting content solvers"
  },
  {
    "id": "design",
    "name": "Design",
    "iconName": "Palette",
    "skillsCount": 0,
    "description": "Figma automation, SVG generator, and style system interfaces"
  },
  {
    "id": "productivity",
    "name": "Productivity",
    "iconName": "Clock",
    "skillsCount": 1,
    "description": "Note-taking, scheduling, task managers, and notifications"
  },
  {
    "id": "automation",
    "name": "Automation",
    "iconName": "Cpu",
    "skillsCount": 2,
    "description": "Browser scripting, server controls, and background cron scripts"
  },
  {
    "id": "education",
    "name": "Education",
    "iconName": "GraduationCap",
    "skillsCount": 0,
    "description": "Tutorial generators, memory cards, and language tutors"
  },
  {
    "id": "business",
    "name": "Business",
    "iconName": "Briefcase",
    "skillsCount": 0,
    "description": "Financial reports, spreadsheet integrations, and CRM syncs"
  },
  {
    "id": "agents",
    "name": "Agents",
    "iconName": "Bot",
    "skillsCount": 2,
    "description": "Autonomous chains, environment loops, and self-improving nodes"
  }
];

export const initialSkills: Skill[] = [
  {
    "id": "postgres",
    "name": "Database Connection MCP",
    "description": "Enables Claude instances to safely inspect Postgres databases and run secure SQL SELECT command flows.",
    "category": "development",
    "tags": [
      "database",
      "postgres",
      "sql",
      "development"
    ],
    "stars": 842,
    "forks": 129,
    "updated": "2026-06-20",
    "author": "modelcontextprotocol",
    "repoUrl": "https://github.com/modelcontextprotocol/servers/tree/main/src/postgres",
    "installation": "npm install -g @openskills/postgres\n# Run using:\n# npx -y @openskills/postgres",
    "usage": "Use standard Model Context command cues.",
    "examples": [],
    "changelog": [],
    "featured": false,
    "trendingToday": false,
    "trendingWeek": false,
    "trendingMonth": false,
    "status": "approved",
    "bookmarksCount": 0
  },
  {
    "id": "art",
    "name": "Algorithmic Art Generator",
    "description": "A Claude skill that generates stunning algorithmic art patterns using mathematical functions, fractals, and generative design techniques.",
    "category": "development",
    "tags": [
      "art",
      "generative",
      "fractal",
      "svg",
      "creative"
    ],
    "stars": 1250,
    "forks": 185,
    "updated": "2026-06-24",
    "author": "anthropics",
    "repoUrl": "https://github.com/anthropics/skills/blob/main/skills/algorithmic-art/SKILL.md",
    "installation": "npm install -g @openskills/art\n# Run using:\n# npx -y @openskills/art",
    "usage": "Use standard Model Context command cues.",
    "examples": [],
    "changelog": [],
    "featured": true,
    "trendingToday": false,
    "trendingWeek": false,
    "trendingMonth": false,
    "status": "approved",
    "bookmarksCount": 0
  },
  {
    "id": "sequential",
    "name": "Sequential Thinking Skill Framework",
    "description": "Advanced logical reasoning framework for step-by-step evaluation inside agentic nodes.",
    "category": "agents",
    "tags": [
      "planning",
      "logic",
      "agentic",
      "mcp"
    ],
    "stars": 2314,
    "forks": 387,
    "updated": "2026-06-18",
    "author": "claudelabs",
    "repoUrl": "https://github.com/claudelabs/sequential-thinking",
    "installation": "npm install -g @openskills/sequential\n# Run using:\n# npx -y @openskills/sequential",
    "usage": "Use standard Model Context command cues.",
    "examples": [],
    "changelog": [],
    "featured": true,
    "trendingToday": false,
    "trendingWeek": false,
    "trendingMonth": false,
    "status": "approved",
    "bookmarksCount": 0
  },
  {
    "id": "postgres-mcp",
    "name": "PostgreSQL MCP Connector",
    "description": "Enables Claude to securely connect, inspect, query, and modify PostgreSQL databases with intelligent schema inspection.",
    "longDescription": "This skill provides a standard Model Context Protocol (MCP) interface to PostgreSQL databases. It allows Claude to safely inspect tables, run select queries, understand relational keys, and edit records based on user guidance. Safety filters prevent dangerous truncate / drop actions unless explicitly overridden by double-approval parameters.",
    "category": "development",
    "tags": [
      "database",
      "postgres",
      "mcp",
      "sql"
    ],
    "stars": 842,
    "forks": 129,
    "updated": "2026-06-20",
    "author": "modelcontextprotocol",
    "repoUrl": "https://github.com/modelcontextprotocol/servers/tree/main/src/postgres",
    "installation": "npm install -g @modelcontextprotocol/server-postgres\n# Or configure via Claude Desktop App config:\n{\n  \"mcpServers\": {\n    \"postgres\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"@modelcontextprotocol/server-postgres\", \"postgresql://localhost/mydb\"]\n    }\n  }\n}",
    "usage": "Simply ask Claude to find specific database schemas, query top records, or answer questions like: \"Show me the users table schema and write a query to display most active commenters.\"",
    "examples": [
      {
        "title": "Inspecting Schema",
        "code": "Claude: I will inspect the PostgreSQL database schema.\nResult: Found 4 tables: `users`, `posts`, `comments`, `likes`."
      },
      {
        "title": "Running a SQL query",
        "code": "SELECT u.email, COUNT(p.id) AS post_count\nFROM users u\nJOIN posts p ON u.id = p.author_id\nGROUP BY u.email\nORDER BY post_count DESC LIMIT 5;"
      }
    ],
    "changelog": [
      {
        "version": "v1.2.0",
        "date": "2026-05-15",
        "changes": [
          "Added support for read-only replica connection strings",
          "Optimized large schema fetch queries"
        ]
      },
      {
        "version": "v1.1.0",
        "date": "2026-04-01",
        "changes": [
          "Added autocomplete schema suggestions",
          "Fixed local host credential parsing issues"
        ]
      }
    ],
    "featured": true,
    "trendingToday": true,
    "trendingWeek": true,
    "trendingMonth": true,
    "status": "approved",
    "bookmarksCount": 312
  },
  {
    "id": "puppeteer-browser",
    "name": "Puppeteer Browser Control",
    "description": "Gives Claude web-scraping and automated web interaction capabilities to browse and render pages visually.",
    "longDescription": "Equip your local Claude Agent with full Puppeteer browser access. Claude can launch chromium, navigate to dynamic single-page applications, wait for selectors, click buttons, submit text inputs, and take screenshots of any webpage to verify visual layouts.",
    "category": "automation",
    "tags": [
      "scraping",
      "browser",
      "automation",
      "puppeteer"
    ],
    "stars": 1205,
    "forks": 245,
    "updated": "2026-06-22",
    "author": "anthropic",
    "repoUrl": "https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer",
    "installation": "npm install -g @modelcontextprotocol/server-puppeteer\n# In config.json:\n{\n  \"mcpServers\": {\n    \"puppeteer\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"@modelcontextprotocol/server-puppeteer\"]\n    }\n  }\n}",
    "usage": "Ask Claude to: \"Go to news.ycombinator.com, capture the top 10 articles, click the More link to get the next page, and summarize the discussion hot-topics.\"",
    "examples": [
      {
        "title": "Scrape dynamic lists",
        "code": "Claude: Let me browse the news page. Initiated chromium session.\nSuccessfully selected article rows and returned 30 headings."
      }
    ],
    "changelog": [
      {
        "version": "v2.1.0",
        "date": "2026-06-01",
        "changes": [
          "Integrated screenshot rendering inline as message blocks",
          "Added proxy routing support for scraping blocks"
        ]
      }
    ],
    "featured": true,
    "trendingToday": true,
    "trendingWeek": false,
    "trendingMonth": true,
    "status": "approved",
    "bookmarksCount": 520
  },
  {
    "id": "sequential-thinking",
    "name": "Sequential Thinking Skill",
    "description": "Enables Claude to think logically, dynamic-size and step through complex reasoning chains before outputting replies.",
    "longDescription": "A systematic prompt-and-function skill that guides Claude to use a dynamic \"scratchpad\" step, evaluate hypotheses, check for logical contradictions, and self-correct on mathematics, coding, or complex architectural planning questions.",
    "category": "agents",
    "tags": [
      "planning",
      "logic",
      "reasoning",
      "agentic"
    ],
    "stars": 2314,
    "forks": 387,
    "updated": "2026-06-21",
    "author": "claudelabs",
    "repoUrl": "https://github.com/claudelabs/sequential-thinking",
    "installation": "# Clone skill prompts directly, or enable thinking mode in custom system agents:\n# Copy the system guidelines template into Claude Desktop Custom Instructions.",
    "usage": "Instruct Claude to solve a difficult logic puzzle, such as parsing nested compiler algorithms, and it will automatically lay out thinking states first.",
    "examples": [
      {
        "title": "Mental Scratchpad Loop",
        "code": "[Thinking Loop Stage 1]: Analyzing edge cases for the cache invalidation scheduler...\n[Thinking Loop Stage 2]: Oh, the lock might fail during race conditions. Redesigned locking mechanics...\n[Thinking Loop Stage 3]: System design confirmed. Displaying final architecture..."
      }
    ],
    "changelog": [
      {
        "version": "v1.0.1",
        "date": "2026-05-10",
        "changes": [
          "Improved fallback for shorter context models",
          "Reduced system prompt token overhead"
        ]
      }
    ],
    "featured": true,
    "trendingToday": false,
    "trendingWeek": true,
    "trendingMonth": true,
    "status": "approved",
    "bookmarksCount": 940
  },
  {
    "id": "github-api-mcp",
    "name": "GitHub Agent Suite",
    "description": "Provides Claude with capabilities to search code, list pull requests, create issues, and commit edits directly to GitHub repos.",
    "longDescription": "This Model Context Protocol server links Claude with personal or organizational GitHub repositories. The model can inspect commits, list issues matching criteria, write feedback on pull requests, review changes, and submit code edits seamlessly.",
    "category": "development",
    "tags": [
      "github",
      "vcs",
      "git",
      "mcp"
    ],
    "stars": 1530,
    "forks": 210,
    "updated": "2026-05-18",
    "author": "modelcontextprotocol",
    "repoUrl": "https://github.com/modelcontextprotocol/servers/tree/main/src/github",
    "installation": "npx -y @modelcontextprotocol/server-github\n# Needs a GITHUB_PERSONAL_ACCESS_TOKEN env variable injected.",
    "usage": "Ask Claude: \"Find all unresolved issues in my repos labeled bug, write a short summary, and create a draft PR fixing the easiest type check error you can identify.\"",
    "examples": [
      {
        "title": "Reviewing active Pull Requests",
        "code": "Claude: Let me query active pull requests...\nFound PR #42: \"Fix router memory leak\". Displaying diff lines..."
      }
    ],
    "changelog": [
      {
        "version": "v3.0.0",
        "date": "2026-05-01",
        "changes": [
          "Added support for multi-file commit groupings",
          "Integrated fine-grainted repository white-lists"
        ]
      }
    ],
    "featured": false,
    "trendingToday": true,
    "trendingWeek": true,
    "trendingMonth": false,
    "status": "approved",
    "bookmarksCount": 450
  },
  {
    "id": "brave-search-mcp",
    "name": "Brave Real-Time Search",
    "description": "Allows Claude to retrieve high-quality web-search organic results and local search listings without trackers.",
    "longDescription": "Integrate the power of Brave Search directly into your AI workflows. This skill enables Claude to perform keyword queries, get snippets of recent articles, extract instant answer cards, and keep up to date with news happening right this minute.",
    "category": "research",
    "tags": [
      "search",
      "web",
      "brave",
      "realtime"
    ],
    "stars": 924,
    "forks": 110,
    "updated": "2026-06-19",
    "author": "brave-agency",
    "repoUrl": "https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search",
    "installation": "npx -y @modelcontextprotocol/server-brave-search\n# Export standard BRAVE_API_KEY.",
    "usage": "Ask: \"What is the latest status of the React 19 final release and who was appointed the lead developer last week?\"",
    "examples": [
      {
        "title": "Realtime Search Query",
        "code": "Claude: Querying Brave Search for \"React 19 release timeline\".\nResult: 5 snippet matches, pointing to key changelogs."
      }
    ],
    "changelog": [
      {
        "version": "v1.0.4",
        "date": "2026-05-20",
        "changes": [
          "Improved regional geographic query parameters",
          "Reduced response parse latency by 12%"
        ]
      }
    ],
    "featured": false,
    "trendingToday": false,
    "trendingWeek": true,
    "trendingMonth": true,
    "status": "approved",
    "bookmarksCount": 228
  },
  {
    "id": "docker-sandbox",
    "name": "Docker Code Executor",
    "description": "A sandboxed developer runtime allowing Claude to run node, python, or bash scripts safely in micro-containers.",
    "longDescription": "An exceptional development companion that boots isolated, ephemeral Docker containers locally. When Claude writes a code snippet, it can execute the file, inspect stdout/stderr logs, retrieve graph charts, and ensure compiling validity before marking tasks done.",
    "category": "automation",
    "tags": [
      "sandbox",
      "docker",
      "terminal",
      "coding"
    ],
    "stars": 1845,
    "forks": 310,
    "updated": "2026-06-10",
    "author": "dockertools-ai",
    "repoUrl": "https://github.com/dockertools-ai/mcp-docker-executor",
    "installation": "docker pull dockertools-ai/mcp-agent-box\nnpx -y mcp-docker-executor",
    "usage": "Simply prompt Claude: \"Write a python script that downloads the stock prices JSON and plots the moving average. Run the script and show me the chart image.\"",
    "examples": [
      {
        "title": "Running Sandbox Node-Script",
        "code": "Claude: Executing `node index.js` inside secure Alpine sandbox.\nStdout: [Express Server listening on Port 1324]"
      }
    ],
    "changelog": [
      {
        "version": "v0.8.0",
        "date": "2026-04-18",
        "changes": [
          "Added isolated python virtualenv cache supports",
          "Limit filesystem size limits to 128MB per agent"
        ]
      }
    ],
    "featured": false,
    "trendingToday": true,
    "trendingWeek": false,
    "trendingMonth": false,
    "status": "approved",
    "bookmarksCount": 402
  },
  {
    "id": "gmail-calendar-connector",
    "name": "Google Workspace Connector",
    "description": "Read and draft Gmail communications, search Google Drive files, and coordinate calendar appointments directly.",
    "longDescription": "Perfect assistant integrator that exposes Google Calendar calendar schedules, contacts lists, spreadsheet tables, and Gmail draft generators. Perfect for delegating administrative, email newsletters, and work routing workflows directly within Claude Desktop.",
    "category": "productivity",
    "tags": [
      "google",
      "gmail",
      "calendar",
      "mcp"
    ],
    "stars": 720,
    "forks": 98,
    "updated": "2026-06-12",
    "author": "modelcontextprotocol",
    "repoUrl": "https://github.com/modelcontextprotocol/servers/tree/main/src/google-maps",
    "installation": "npx -y @modelcontextprotocol/server-gcal-gmail",
    "usage": "Prompt Claude: \"Search my email drafts for anything mentioning vishwas, draft a polite RSVP to the meeting, and check if tomorrow at 2 PM is free on my schedule.\"",
    "examples": [
      {
        "title": "Check Free/Busy Schedule",
        "code": "Claude: Calling Calendar FreeBusy query...\nStatus: 2:00 PM - 3:15 PM is currently free. Setting provisional marker."
      }
    ],
    "changelog": [
      {
        "version": "v1.1.2",
        "date": "2026-06-02",
        "changes": [
          "Optimized OAuth token refreshes handles",
          "Support recurring events calculations"
        ]
      }
    ],
    "featured": false,
    "trendingToday": false,
    "trendingWeek": true,
    "trendingMonth": false,
    "status": "approved",
    "bookmarksCount": 198
  }
];

export const initialCollections: Collection[] = [
  {
    "id": "best-coding-skills",
    "name": "Best Coding Skills",
    "description": "Transform Claude into a senior-level full-stack programmer with shell runtimes, database layers, and git push/pull suites.",
    "colorTheme": "blue",
    "skillsCount": 3,
    "skillIds": [
      "postgres-mcp",
      "github-api-mcp",
      "docker-sandbox"
    ]
  },
  {
    "id": "best-agent-skills",
    "name": "Ultimate Agent Suites",
    "description": "Supercharge independent problem-solving loops, self-evaluation systems, and visual scrapers for complex systems.",
    "colorTheme": "purple",
    "skillsCount": 2,
    "skillIds": [
      "sequential-thinking",
      "puppeteer-browser"
    ]
  },
  {
    "id": "research-excellence",
    "name": "Productive Research Stack",
    "description": "Empower high-fidelity truth lookup engines, dynamic webpage analysis, and lightning-fast search indexing.",
    "colorTheme": "zinc",
    "skillsCount": 2,
    "skillIds": [
      "brave-search-mcp",
      "puppeteer-browser"
    ]
  }
];

export const initialResources: Resource[] = [
  {
    "id": "resource-mcp-guide",
    "title": "Model Context Protocol (MCP) Quickstart Manual",
    "description": "A comprehensive guide on configuring, deploying, and debugging custom MCP connectors in Claude Desktop or custom agents.",
    "type": "Documentation",
    "readTime": "8 min read",
    "author": "Anthropic Developer Relations",
    "url": "https://modelcontextprotocol.io/quickstart"
  },
  {
    "id": "resource-sandbox-deploy",
    "title": "How to Build an Ephemeral Docker Execution Sandbox",
    "description": "Secure sandbox patterns for letting Claude agent instances compile and evaluate untrusted files under absolute local quarantine.",
    "type": "Guide",
    "readTime": "12 min read",
    "author": "DevOps & LLM Security Lab",
    "url": "https://github.com/modelcontextprotocol/servers"
  },
  {
    "id": "resource-prompting-agents",
    "title": "Supercharging Claude thinking pathways with XML anchors",
    "description": "An expert walkthrough explaining how Claude interacts with structured schemas, tags, tool approvals, and sequence reasoning loops.",
    "type": "Article",
    "readTime": "6 min read",
    "author": "Sara Jenkins, Senior AI Engineer",
    "url": "https://anthropic.com/news/claude-3-5-sonnet"
  },
  {
    "id": "resource-mcp-video",
    "title": "Video: Setting up Claude memory servers in 5 minutes",
    "description": "A visual tutorial demonstrating graph database configurations allowing custom memory prompts inside Claude Desktop.",
    "type": "Video",
    "readTime": "5 min watch",
    "author": "Alex Martinez",
    "url": "https://youtube.com"
  }
];

export const initialPrompts: Prompt[] = [
  {
    "id": "prompt-sequential-reasoning",
    "title": "Sequential Logic Reasoning Loop",
    "description": "Enforces rigorous, multi-step validation checks before answering complicated architecture or math tasks.",
    "content": "Define <thinking_process> and resolve all potential branch edge-cases sequentially step-by-step. Do not rush to output a finalized answer unless you have evaluated self-contradictions.",
    "category": "Coding",
    "tags": [
      "logic",
      "thinking",
      "expert"
    ]
  },
  {
    "id": "prompt-api-robustness",
    "title": "Frictionless API Router Generator",
    "description": "A production prompt that generates highly secure, clean, typesafe typescript router nodes with rate limits.",
    "content": "Generate a standard typescript service using Elysia or Express. Always include graceful error catchers, custom error types, request validation constraints, and lightweight rate-limiting shields.",
    "category": "Coding",
    "tags": [
      "api",
      "typescript",
      "backend"
    ]
  },
  {
    "id": "prompt-writing-concise",
    "title": "SaaS Tech-Writer Tone Setter",
    "description": "Ensures written explanations are direct, beautifully formatted, technical, and carry pure clarity with no marketing fluff.",
    "content": "You write documentation for high-performing software engineers. Use zero filler verbs, zero hyperbole (never use \"revolutionary\", \"stellar\", \"game-changing\"), use active voice, and supply literal code examples.",
    "category": "Writing",
    "tags": [
      "editorial",
      "voice",
      "docs"
    ]
  },
  {
    "id": "prompt-market-audience",
    "title": "Developer Audience Persona Analyst",
    "description": "Reviews feature releases and creates developer-friendly release logs highlighting real value instead of corporate speak.",
    "content": "Analyze this feature diff. Explain exactly what changed, what files might be affected, how it scales the developer workflow, and list the exact CLI or code snippets needed to run it.",
    "category": "Marketing",
    "tags": [
      "releases",
      "dev-relations",
      "copywriting"
    ]
  }
];
