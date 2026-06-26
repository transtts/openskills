import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  GitFork,
  Star,
  Layers,
  BookOpen,
  FileCode,
  CornerDownRight,
  Eye,
  Edit3,
  Columns,
  PlusCircle,
  Save,
  Trash2,
  Copy,
  Check,
  Sparkles,
  Globe,
  Lock,
  EyeOff,
  Search,
  RefreshCw,
  History,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  Play,
  Table as TableIcon,
  Image as ImageIcon,
  Tag,
  Info,
  AlertTriangle,
  ThumbsUp,
  LayoutGrid,
  Trash,
  Plus,
  ArrowUpDown,
  SearchCode,
  Calendar,
  Compass,
  ArrowLeft,
  Settings,
  Flame,
  Shield,
  HelpCircle,
  ExternalLink,
  Undo,
  Redo,
  Folder,
  FolderPlus,
  FolderOpen
} from 'lucide-react';
import { Skill, Prompt, Resource, Category, Collection } from '../types';

interface AdminContentEditorProps {
  skills: Skill[];
  categories: Category[];
  collections: Collection[];
  resources: Resource[];
  prompts: Prompt[];
  onAddSkill: (newSkill: Skill) => void;
  onUpdateSkill: (updatedSkill: Skill) => void;
  onDeleteSkill: (skillId: string) => void;
  onAddCategory: (newCategory: Category) => void;
  onUpdateCategory: (updatedCategory: Category) => void;
  onDeleteCategory: (categoryId: string) => void;
  onAddCollection: (newCollection: Collection) => void;
  onUpdateCollection: (updatedCollection: Collection) => void;
  onDeleteCollection: (collectionId: string) => void;
  onAddResource: (newResource: Resource) => void;
  onUpdateResource: (updatedResource: Resource) => void;
  onDeleteResource: (resourceId: string) => void;
  onAddPrompt: (newPrompt: Prompt) => void;
  onUpdatePrompt: (updatedPrompt: Prompt) => void;
  onDeletePrompt: (promptId: string) => void;
  onClose: () => void;
}

// Default content template list
interface CMSContentItem {
  id: string;
  type: 'Skill' | 'GitHub Repository' | 'Prompt' | 'Tutorial' | 'Collection' | 'Resource' | 'Documentation' | 'Workflow' | 'AI Agent' | 'Template' | 'Category';
  title: string;
  description: string;
  markdownContent: string;
  status: 'Draft' | 'Review' | 'Published' | 'Archived';
  category: string;
  tags: string[];
  slug: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  keywords: string;
  featured: boolean;
  pinned: boolean;
  visibility: 'Public' | 'Private' | 'Internal';
  publishDate: string;
  lastUpdated: string;

  // GitHub Block Fields
  githubName?: string;
  githubUrl?: string;
  githubStars?: number;
  githubForks?: number;
  githubLicense?: string;

  // Prompt Block Fields
  promptTitle?: string;
  promptCategory?: string;
  promptContent?: string;
  promptVariables?: string[]; // comma separated

  // Embed elements
  videoEmbedUrl?: string;
  imageUrl?: string;
  imageCaption?: string;

  // Folder organization
  folderId?: string;
}

const updateMarkdownHeading = (markdown: string, newTitle: string): string => {
  const headingRegex = /^#\s+(.+)$/m;
  if (headingRegex.test(markdown)) {
    return markdown.replace(headingRegex, `# ${newTitle}`);
  } else {
    return `# ${newTitle}\n\n${markdown}`;
  }
};

export default function AdminContentEditor({
  skills,
  categories,
  collections,
  resources,
  prompts,
  onAddSkill,
  onUpdateSkill,
  onDeleteSkill,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  onAddCollection,
  onUpdateCollection,
  onDeleteCollection,
  onAddResource,
  onUpdateResource,
  onDeleteResource,
  onAddPrompt,
  onUpdatePrompt,
  onDeletePrompt,
  onClose
}: AdminContentEditorProps) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('openskills_admin_auth') === 'true';
  });
  const [authUsername, setAuthUsername] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // CMS Content database state stored in local storage
  const [contents, setContents] = useState<CMSContentItem[]>(() => {
    const saved = localStorage.getItem('openskills_cms_contents_3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    // Return seed contents
    return [
      {
        id: 'content-sequential',
        type: 'Skill',
        title: 'Sequential Thinking Skill Framework',
        description: 'Advanced logical reasoning framework for step-by-step evaluation inside agentic nodes.',
        markdownContent: `# Sequential Thinking Skill\n\nEnables Claude to think logically, dynamically sizing and stepping through complex reasoning chains before outputting responses.\n\n## Core Integration Guidelines\nUse this module as a standardized custom instruction template.\n\n### Benefits of Sequential Nodes\n1. Eliminates immediate-answer hallucinations\n2. Breaks down complex algorithms visually\n3. Encourages self-correction loops\n\n> "A systematic prompt-and-function skill that guides Claude to use a dynamic scratchpad."`,
        status: 'Published',
        category: 'agents',
        tags: ['planning', 'logic', 'agentic', 'mcp'],
        slug: 'sequential-thinking-framework',
        metaTitle: 'Sequential Thinking Framework - openSkills Directory',
        metaDescription: 'Learn how to equip Claude Desktop with sequential thinking structures and step-by-step trace pipelines.',
        canonicalUrl: 'https://openskills.in/skills/sequential-thinking',
        keywords: 'claude, mcp, reasoning, agents',
        featured: true,
        pinned: true,
        visibility: 'Public',
        publishDate: '2026-06-18',
        lastUpdated: '2026-06-23T02:15:00',
        githubName: 'claudelabs/sequential-thinking',
        githubUrl: 'https://github.com/claudelabs/sequential-thinking',
        githubStars: 2314,
        githubForks: 387,
        githubLicense: 'MIT',
        promptTitle: 'Sequential Planner Guide',
        promptCategory: 'Research',
        promptContent: 'Before answering the following query, output a thinking state listing: 1) What we know, 2) Constraints, 3) Step-by-step logical check. [QUERY]: {{query}}',
        promptVariables: ['query'],
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
        imageCaption: 'Sequential multi-layered feedback loop dashboard rendering nodes.',
        folderId: 'folder-skills'
      },
      {
        id: 'content-postgres',
        type: 'GitHub Repository',
        title: 'PostgreSQL MCP Connector',
        description: 'Enables Claude instances to safely inspect Postgres databases and run secure SQL SELECT command flows.',
        markdownContent: `# Database Connection MCP\n\nThis is the premier Postgres Model Context Protocol system.\n\n## Setup Instructions\nDeploy locally inside the Claude Desktop application config:\n\n\`\`\`json\n{\n  "postgres": {\n    "command": "npx",\n    "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]\n  }\n}\n\`\`\`\n\nEnsure client ports are exposed and accessible on localhost!`,
        status: 'Published',
        category: 'development',
        tags: ['database', 'postgres', 'sql', 'development'],
        slug: 'postgres-mcp-connector',
        metaTitle: 'PostgreSQL MCP Connector for Claude Desktop',
        metaDescription: 'Guide on how to hook up local database engines dynamically to Sonnet instances.',
        canonicalUrl: 'https://openskills.in/repo/postgres-mcp',
        keywords: 'postgres, database, mcp, sql',
        featured: false,
        pinned: false,
        visibility: 'Public',
        publishDate: '2026-06-20',
        lastUpdated: '2026-06-22T19:40:00',
        githubName: 'modelcontextprotocol/server-postgres',
        githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/postgres',
        githubStars: 842,
        githubForks: 129,
        githubLicense: 'Apache-2.0',
        folderId: 'folder-mcp'
      },
      {
        id: 'content-art',
        type: 'GitHub Repository',
        title: 'Algorithmic Art Generator',
        description: 'A Claude skill that generates stunning algorithmic art patterns using mathematical functions, fractals, and generative design techniques.',
        markdownContent: `# Algorithmic Art Generator\n\nThis skill enables Claude to create beautiful algorithmic art using mathematical functions, fractals, and generative design patterns.\n\n## Features\n- Generate fractal patterns (Mandelbrot, Julia sets)\n- Create geometric tessellations\n- Produce color gradient compositions\n- SVG and Canvas output support\n\n## Installation\n\`\`\`bash\nnpm install -g @anthropics/algorithmic-art\n# Or add to Claude Desktop config:\n{\n  "algorithmic-art": {\n    "command": "npx",\n    "args": ["-y", "@anthropics/algorithmic-art"]\n  }\n}\n\`\`\`\n\n## Usage\nAsk Claude to generate art:\n> "Create a colorful Mandelbrot fractal with a deep zoom at coordinates (-0.75, 0.1)"\n\n## Examples\n- Spirograph patterns with custom parameters\n- Voronoi diagram landscapes\n- L-system tree generation\n- Perlin noise terrain maps`,
        status: 'Published',
        category: 'development',
        tags: ['art', 'generative', 'fractal', 'svg', 'creative'],
        slug: 'algorithmic-art-generator',
        metaTitle: 'Algorithmic Art Generator - openSkills Directory',
        metaDescription: 'Generate stunning algorithmic art patterns using Claude with mathematical functions, fractals, and generative design techniques.',
        canonicalUrl: 'https://openskills.in/skills/algorithmic-art-generator',
        keywords: 'algorithmic art, fractal, generative, claude skill, svg',
        featured: true,
        pinned: false,
        visibility: 'Public',
        publishDate: '2026-06-24',
        lastUpdated: '2026-06-24T12:00:00',
        githubName: 'anthropics/skills',
        githubUrl: 'https://github.com/anthropics/skills/blob/main/skills/algorithmic-art/SKILL.md',
        githubStars: 1250,
        githubForks: 185,
        githubLicense: 'MIT',
        promptTitle: 'Algorithmic Art Prompt',
        promptContent: 'Generate a {{style}} algorithmic art piece using {{technique}} with colors {{palette}}',
        promptVariables: ['style', 'technique', 'palette'],
        folderId: 'folder-dev'
      }
    ];
  });

  // Current Active Selected Content in CMS
  const [selectedContentId, setSelectedContentId] = useState<string>(() => {
    return localStorage.getItem('openskills_cms_selected_id') || 'content-sequential';
  });

  // Editor Workspace preference states (saved in localStorage)
  const [viewMode, setViewMode] = useState<'editor' | 'split' | 'preview'>(() => {
    return (localStorage.getItem('openskills_cms_view_mode') as any) || 'split';
  });

  // Sidebar organization filter
  const [sidebarFilter, setSidebarFilter] = useState<string>('all');
  const [cmsSearch, setCmsSearch] = useState<string>('');

  // Active form items for selected item
  const currentItem = contents.find(c => c.id === selectedContentId) || contents[0];

  const [formType, setFormType] = useState<CMSContentItem['type']>('Skill');
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formMarkdown, setFormMarkdown] = useState('');
  const [formStatus, setFormStatus] = useState<CMSContentItem['status']>('Draft');
  const [formCategory, setFormCategory] = useState('development');
  const [formTags, setFormTags] = useState<string[]>([]);
  const [formKeywords, setFormKeywords] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formMetaTitle, setFormMetaTitle] = useState('');
  const [formMetaDescription, setFormMetaDescription] = useState('');
  const [formCanonicalUrl, setFormCanonicalUrl] = useState('');
  const [formVisibility, setFormVisibility] = useState<CMSContentItem['visibility']>('Public');
  const [formFeatured, setFormFeatured] = useState(false);
  const [formPinned, setFormPinned] = useState(false);
  const [formPublishDate, setFormPublishDate] = useState('');

  // Custom blocks fields
  const [formGithubName, setFormGithubName] = useState('');
  const [formGithubUrl, setFormGithubUrl] = useState('');
  const [formGithubStars, setFormGithubStars] = useState(0);
  const [formGithubForks, setFormGithubForks] = useState(0);
  const [formGithubLicense, setFormGithubLicense] = useState('MIT');

  const [formPromptTitle, setFormPromptTitle] = useState('');
  const [formPromptCategory, setFormPromptCategory] = useState('Coding');
  const [formPromptContent, setFormPromptContent] = useState('');
  const [formPromptVariables, setFormPromptVariables] = useState<string[]>([]);
  const [newVariableInput, setNewVariableInput] = useState('');

  // Video embeds & Image Block attributes
  const [formVideoUrl, setFormVideoUrl] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formImageCaption, setFormImageCaption] = useState('');
  const [imageUploadProgress, setImageUploadProgress] = useState<number | null>(null);

  // Table State variables (custom blocks)
  interface CMSGridTable {
    headers: string[];
    rows: string[][];
  }
  const [formTable, setFormTable] = useState<CMSGridTable>({
    headers: ['Command/Variable', 'Type', 'Description'],
    rows: [
      ['mcp_host_url', 'string', 'Network address to bound protocol execution nodes'],
      ['api_key', 'secret', 'Secret credential token for downstream servers'],
      ['timeout_sec', 'integer', 'Maximum retry length threshold limits']
    ]
  });

  // Slash commands state
  const [slashMenuOpen, setSlashMenuOpen] = useState(false);
  const [slashMenuSearch, setSlashMenuSearch] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Autosave simulation state
  const [autosaveStatus, setAutosaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [lastSavedTime, setLastSavedTime] = useState<string>(new Date().toLocaleTimeString());

  // Revision History State
  interface ContentRevision {
    timestamp: string;
    version: string;
    title: string;
    markdownContent: string;
    author: string;
    logMessage: string;
  }
  const [revisions, setRevisions] = useState<ContentRevision[]>([
    {
      timestamp: '2026-06-23 02:00:00',
      version: 'v2.0 (Active)',
      title: 'Sequential Thinking Skill Framework',
      markdownContent: `# Sequential Thinking Skill\n\nEnables Claude to think logically...`,
      author: 'Admin Controller',
      logMessage: 'Major schema and performance indices updates.'
    },
    {
      timestamp: '2026-06-22 17:30:00',
      version: 'v1.1',
      title: 'Sequential Thinking Core Node',
      markdownContent: `# Sequential thinking is modular...`,
      author: 'Admin Controller',
      logMessage: 'Initial framework creation block commit.'
    }
  ]);
  // Folder organization state
  const [folders, setFolders] = useState<{ id: string; name: string; parentId?: string }[]>(() => {
    const saved = localStorage.getItem('openskills_cms_folders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return [
      { id: 'folder-mcp', name: 'MCP Servers' },
      { id: 'folder-skills', name: 'Claude Skills' },
      { id: 'folder-dev', name: 'Development' }
    ];
  });
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['folder-mcp', 'folder-skills', 'folder-dev']);
  const [formFolderId, setFormFolderId] = useState<string>('');

  const [revisionSidebarOpen, setRevisionSidebarOpen] = useState(false);
  const [isCreateDropdownOpen, setIsCreateDropdownOpen] = useState(false);
  const [isEmptyCreateDropdownOpen, setIsEmptyCreateDropdownOpen] = useState(false);
  const [isToolbarCreateDropdownOpen, setIsToolbarCreateDropdownOpen] = useState(false);

  // Selected tag input state
  const [newTagInput, setNewTagInput] = useState('');

  // Toast notices state
  const [toastMessage, setToastMessage] = useState<string | null>(null);



  // Move Item Modal state
  const [moveItemModal, setMoveItemModal] = useState<{
    isOpen: boolean;
    itemType: 'file' | 'folder';
    itemId: string;
    itemName: string;
  }>({
    isOpen: false,
    itemType: 'file',
    itemId: '',
    itemName: ''
  });

  // Undo/Redo history states
  const [history, setHistory] = useState<string[]>(['']);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const isUndoRedoRef = useRef(false);

  // Audit Logs simulation dataset
  const [auditLogs] = useState([
    { id: '1', user: 'admin@openskills.in', action: 'Published Item', target: 'Sequential Thinking Framework', time: '10 mins ago', ip: '192.168.1.45' },
    { id: '2', user: 'admin@openskills.in', action: 'Created Draft', target: 'PostgreSQL MCP Connector', time: '1 hour ago', ip: '192.168.1.45' },
    { id: '3', user: 'admin@openskills.in', action: 'Saved SEO parameters', target: 'Sequential Thinking Framework', time: '3 hours ago', ip: '192.168.1.45' },
    { id: '4', user: 'guest_user', action: 'Attempted Root Command Access (Blocked)', target: 'Terminal Access System', time: '4 hours ago', ip: '45.120.33.109' }
  ]);

  // Ensure "Development" folder and "Algorithmic Art Generator" content exist on mount (for backward compatibility if localStorage is present)
  useEffect(() => {
    setFolders(prev => {
      const foldersList = prev || [];
      if (!foldersList.some(f => f.id === 'folder-dev')) {
        return [...foldersList, { id: 'folder-dev', name: 'Development' }];
      }
      return foldersList;
    });

    setContents(prev => {
      let contentsList = prev || [];
      // Migrate existing "Create new" items to "GitHub Repository" type
      contentsList = contentsList.map(c => {
        if (c.title === 'Create new' && c.type === 'Skill') {
          return { ...c, type: 'GitHub Repository' };
        }
        return c;
      });
      const hasArt = contentsList.some(c => c.id === 'content-art' || c.title === 'Algorithmic Art Generator');
      let finalContentsList = [...contentsList];
      if (hasArt) {
        finalContentsList = finalContentsList.map(c => {
          if ((c.id === 'content-art' || c.title === 'Algorithmic Art Generator') && c.folderId !== 'folder-dev') {
            return { ...c, folderId: 'folder-dev' };
          }
          return c;
        });
      } else {
        const newArtItem: CMSContentItem = {
          id: 'content-art',
          type: 'GitHub Repository',
          title: 'Algorithmic Art Generator',
          description: 'A Claude skill that generates stunning algorithmic art patterns using mathematical functions, fractals, and generative design techniques.',
          markdownContent: `# Algorithmic Art Generator\n\nThis skill enables Claude to create beautiful algorithmic art using mathematical functions, fractals, and generative design patterns.\n\n## Features\n- Generate fractal patterns (Mandelbrot, Julia sets)\n- Create geometric tessellations\n- Produce color gradient compositions\n- SVG and Canvas output support\n\n## Installation\n\`\`\`bash\nnpm install -g @anthropics/algorithmic-art\n# Or add to Claude Desktop config:\n{\n  "algorithmic-art": {\n    "command": "npx",\n    "args": ["-y", "@anthropics/algorithmic-art"]\n  }\n}\n\`\`\`\n\n## Usage\nAsk Claude to generate art:\n> "Create a colorful Mandelbrot fractal with a deep zoom at coordinates (-0.75, 0.1)"\n\n## Examples\n- Spirograph patterns with custom parameters\n- Voronoi diagram landscapes\n- L-system tree generation\n- Perlin noise terrain maps`,
          status: 'Published',
          category: 'development',
          tags: ['art', 'generative', 'fractal', 'svg', 'creative'],
          slug: 'algorithmic-art-generator',
          metaTitle: 'Algorithmic Art Generator - openSkills Directory',
          metaDescription: 'Generate stunning algorithmic art patterns using Claude with mathematical functions, fractals, and generative design techniques.',
          canonicalUrl: 'https://openskills.in/skills/algorithmic-art-generator',
          keywords: 'algorithmic art, fractal, generative, claude skill, svg',
          featured: true,
          pinned: false,
          visibility: 'Public',
          publishDate: '2026-06-24',
          lastUpdated: '2026-06-24T12:00:00',
          githubName: 'anthropics/skills',
          githubUrl: 'https://github.com/anthropics/skills/blob/main/skills/algorithmic-art/SKILL.md',
          githubStars: 1250,
          githubForks: 185,
          githubLicense: 'MIT',
          promptTitle: 'Algorithmic Art Prompt',
          promptContent: 'Generate a {{style}} algorithmic art piece using {{technique}} with colors {{palette}}',
          promptVariables: ['style', 'technique', 'palette'],
          folderId: 'folder-dev'
        };
        finalContentsList = [newArtItem, ...finalContentsList];
      }

      // Align all titles with their markdown H1 headings on mount
      return finalContentsList.map(c => {
        const headingMatch = (c.markdownContent || '').match(/^#\s+(.+)$/m);
        if (headingMatch && headingMatch[1]) {
          const parsed = headingMatch[1].trim();
          if (parsed && parsed !== c.title) {
            return {
              ...c,
              title: parsed,
              slug: parsed.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
              metaTitle: `${parsed} - Curated openSkills`
            };
          }
        }
        return c;
      });
    });
  }, []);

  // Sync state whenever active item changes
  useEffect(() => {
    if (currentItem) {
      setFormType(currentItem.type);
      setFormTitle(currentItem.title);
      setFormDescription(currentItem.description || '');
      setFormMarkdown(currentItem.markdownContent || '');
      setFormStatus(currentItem.status || 'Draft');
      setFormCategory(currentItem.category || 'development');
      setFormTags(currentItem.tags || []);
      setFormKeywords(currentItem.keywords || '');
      setFormSlug(currentItem.slug || '');
      setFormMetaTitle(currentItem.metaTitle || '');
      setFormMetaDescription(currentItem.metaDescription || '');
      setFormCanonicalUrl(currentItem.canonicalUrl || '');
      setFormVisibility(currentItem.visibility || 'Public');
      setFormFeatured(!!currentItem.featured);
      setFormPinned(!!currentItem.pinned);
      setFormPublishDate(currentItem.publishDate || new Date().toISOString().split('T')[0]);
      setFormFolderId(currentItem.folderId || '');

      // blocks files
      setFormGithubName(currentItem.githubName || '');
      setFormGithubUrl(currentItem.githubUrl || '');
      setFormGithubStars(currentItem.githubStars || 0);
      setFormGithubForks(currentItem.githubForks || 0);
      setFormGithubLicense(currentItem.githubLicense || 'MIT');

      setFormPromptTitle(currentItem.promptTitle || '');
      setFormPromptCategory(currentItem.promptCategory || 'Coding');
      setFormPromptContent(currentItem.promptContent || '');
      setFormPromptVariables(currentItem.promptVariables || []);

      setFormVideoUrl(currentItem.videoEmbedUrl || '');
      setFormImageUrl(currentItem.imageUrl || '');
      setFormImageCaption(currentItem.imageCaption || '');

      // Initialize undo/redo history for the newly selected item
      setHistory([currentItem.markdownContent || '']);
      setHistoryIndex(0);

      setAutosaveStatus('saved');
    } else {
      // Reset form states if current active item is not defined (empty state)
      setFormType('Skill');
      setFormTitle('');
      setFormDescription('');
      setFormMarkdown('');
      setFormStatus('Draft');
      setFormCategory('development');
      setFormTags([]);
      setFormKeywords('');
      setFormSlug('');
      setFormMetaTitle('');
      setFormMetaDescription('');
      setFormCanonicalUrl('');
      setFormVisibility('Public');
      setFormFeatured(false);
      setFormPinned(false);
      setFormPublishDate('');
      setFormGithubName('');
      setFormGithubUrl('');
      setFormGithubStars(0);
      setFormGithubForks(0);
      setFormGithubLicense('MIT');
      setFormPromptTitle('');
      setFormPromptCategory('Coding');
      setFormPromptContent('');
      setFormPromptVariables([]);
      setFormVideoUrl('');
      setFormImageUrl('');
      setFormImageCaption('');
      setFormFolderId('');

      setHistory(['']);
      setHistoryIndex(0);
    }
  }, [selectedContentId]);

  // Auto-update title when markdown contains # Heading
  useEffect(() => {
    const match = formMarkdown.match(/^#\s+(.+)$/m);
    if (match && match[1]) {
      const parsedTitle = match[1].trim();
      if (parsedTitle && parsedTitle !== formTitle) {
        setFormTitle(parsedTitle);
        setFormSlug(parsedTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
        setFormMetaTitle(`${parsedTitle} - Curated openSkills`);
      }
    }
  }, [formMarkdown, formTitle]);

  // Automatically sync titles of all files in contents with their markdown headings
  useEffect(() => {
    let changed = false;
    const updated = contents.map(c => {
      const match = (c.markdownContent || '').match(/^#\s+(.+)$/m);
      if (match && match[1]) {
        const parsed = match[1].trim();
        if (parsed && parsed !== c.title) {
          changed = true;
          return {
            ...c,
            title: parsed,
            slug: parsed.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
            metaTitle: `${parsed} - Curated openSkills`
          };
        }
      }
      return c;
    });

    if (changed) {
      setContents(updated);
    }
  }, [contents]);

  // Save current active workspace preferences
  useEffect(() => {
    localStorage.setItem('openskills_cms_view_mode', viewMode);
  }, [viewMode]);

  // Save CMS Content store to local storage
  useEffect(() => {
    localStorage.setItem('openskills_cms_contents_3', JSON.stringify(contents));
  }, [contents]);

  // Save Folders store to local storage
  useEffect(() => {
    localStorage.setItem('openskills_cms_folders', JSON.stringify(folders));
  }, [folders]);

  // Synchronize any active skills from the directory into the CMS database automatically
  useEffect(() => {
    setContents(prev => {
      const updated = [...prev];
      let changed = false;

      skills.forEach(skill => {
        const hasMatch = updated.some(c =>
          c.id === skill.id ||
          c.id === `content-${skill.id}` ||
          (c.type === 'Skill' && c.title.toLowerCase() === skill.name.toLowerCase())
        );

        if (!hasMatch) {
          updated.push({
            id: `content-${skill.id}`,
            type: skill.repoUrl ? 'GitHub Repository' : 'Skill',
            title: skill.name,
            description: skill.description,
            markdownContent: `# ${skill.name}\n\n${skill.longDescription || skill.description}\n\n## Installation Guidelines\n\`\`\`bash\n${skill.installation}\n\`\`\`\n\n## Usage Instructions\n${skill.usage}`,
            status: 'Published',
            category: skill.category,
            tags: skill.tags,
            slug: skill.id,
            metaTitle: skill.seo?.metaTitle || `${skill.name} - openSkills Directory`,
            metaDescription: skill.seo?.metaDescription || skill.description,
            canonicalUrl: skill.seo?.canonicalUrl || `https://openskills.in/skills/${skill.id}`,
            keywords: skill.tags.join(', '),
            featured: skill.featured,
            pinned: false,
            visibility: 'Public',
            publishDate: skill.updated || new Date().toISOString().split('T')[0],
            lastUpdated: new Date().toISOString(),
            githubName: skill.repoUrl ? skill.repoUrl.replace('https://github.com/', '') : '',
            githubUrl: skill.repoUrl || '',
            githubStars: skill.stars,
            githubForks: skill.forks,
            githubLicense: 'MIT'
          });
          changed = true;
        }
      });

      return changed ? updated : prev;
    });
  }, [skills]);

  // Synchronize Categories on mount
  useEffect(() => {
    setContents(prev => {
      const updated = [...prev];
      let changed = false;
      categories.forEach(cat => {
        const hasMatch = updated.some(c =>
          c.id === cat.id ||
          c.id === `content-cat-${cat.id}` ||
          (c.type === 'Category' && c.title.toLowerCase() === cat.name.toLowerCase())
        );
        if (!hasMatch) {
          updated.push({
            id: `content-cat-${cat.id}`,
            type: 'Category',
            title: cat.name,
            description: cat.description,
            markdownContent: `# ${cat.name}\n\n${cat.description}`,
            status: 'Published',
            category: cat.id,
            tags: [cat.iconName],
            slug: cat.id,
            metaTitle: `${cat.name} Category - openSkills`,
            metaDescription: cat.description,
            canonicalUrl: `https://openskills.in/categories/${cat.id}`,
            keywords: cat.name,
            featured: false,
            pinned: false,
            visibility: 'Public',
            publishDate: new Date().toISOString().split('T')[0],
            lastUpdated: new Date().toISOString(),
          });
          changed = true;
        }
      });
      return changed ? updated : prev;
    });
  }, [categories]);

  // Synchronize Collections on mount
  useEffect(() => {
    setContents(prev => {
      const updated = [...prev];
      let changed = false;
      collections.forEach(col => {
        const hasMatch = updated.some(c =>
          c.id === col.id ||
          c.id === `content-col-${col.id}` ||
          (c.type === 'Collection' && c.title.toLowerCase() === col.name.toLowerCase())
        );
        if (!hasMatch) {
          updated.push({
            id: `content-col-${col.id}`,
            type: 'Collection',
            title: col.name,
            description: col.description,
            markdownContent: `# ${col.name}\n\n${col.description}\n\nTheme: ${col.colorTheme}\n\nSkills: ${col.skillIds.join(', ')}`,
            status: 'Published',
            category: 'development',
            tags: col.skillIds,
            slug: col.id,
            metaTitle: `${col.name} Collection - openSkills`,
            metaDescription: col.description,
            canonicalUrl: `https://openskills.in/collections/${col.id}`,
            keywords: col.name,
            featured: false,
            pinned: false,
            visibility: 'Public',
            publishDate: new Date().toISOString().split('T')[0],
            lastUpdated: new Date().toISOString(),
            githubLicense: col.colorTheme,
          });
          changed = true;
        }
      });
      return changed ? updated : prev;
    });
  }, [collections]);

  // Synchronize Resources on mount
  useEffect(() => {
    setContents(prev => {
      const updated = [...prev];
      let changed = false;
      resources.forEach(res => {
        const hasMatch = updated.some(c =>
          c.id === res.id ||
          c.id === `content-res-${res.id}` ||
          (c.type === 'Resource' && c.title.toLowerCase() === res.title.toLowerCase())
        );
        if (!hasMatch) {
          updated.push({
            id: `content-res-${res.id}`,
            type: 'Resource',
            title: res.title,
            description: res.description,
            markdownContent: `# ${res.title}\n\n${res.description}\n\nLink: ${res.url}`,
            status: 'Published',
            category: 'development',
            tags: [res.type],
            slug: res.id,
            metaTitle: `${res.title} - openSkills Resource`,
            metaDescription: res.description,
            canonicalUrl: res.url,
            keywords: res.type,
            featured: false,
            pinned: false,
            visibility: 'Public',
            publishDate: new Date().toISOString().split('T')[0],
            lastUpdated: new Date().toISOString(),
            githubName: res.author,
            githubUrl: res.url,
            githubLicense: res.readTime,
          });
          changed = true;
        }
      });
      return changed ? updated : prev;
    });
  }, [resources]);

  // Synchronize Prompts on mount
  useEffect(() => {
    setContents(prev => {
      const updated = [...prev];
      let changed = false;
      prompts.forEach(p => {
        const hasMatch = updated.some(c =>
          c.id === p.id ||
          c.id === `content-prompt-${p.id}` ||
          (c.type === 'Prompt' && c.title.toLowerCase() === p.title.toLowerCase())
        );
        if (!hasMatch) {
          updated.push({
            id: `content-prompt-${p.id}`,
            type: 'Prompt',
            title: p.title,
            description: p.description,
            markdownContent: `# ${p.title}\n\n${p.description}\n\n\`\`\`\n${p.content}\n\`\`\``,
            status: 'Published',
            category: p.category.toLowerCase(),
            tags: p.tags,
            slug: p.id,
            metaTitle: `${p.title} Prompt - openSkills`,
            metaDescription: p.description,
            canonicalUrl: `https://openskills.in/prompts/${p.id}`,
            keywords: p.tags.join(', '),
            featured: false,
            pinned: false,
            visibility: 'Public',
            publishDate: new Date().toISOString().split('T')[0],
            lastUpdated: new Date().toISOString(),
            promptTitle: p.title,
            promptCategory: p.category,
            promptContent: p.content,
            promptVariables: [],
          });
          changed = true;
        }
      });
      return changed ? updated : prev;
    });
  }, [prompts]);

  // Reverse sync: Push Published CMS items to the live website automatically
  useEffect(() => {
    contents.forEach(item => {
      if (item.status !== 'Published') return;

      const generatedId = item.id.replace('content-cat-', '').replace('content-col-', '').replace('content-res-', '').replace('content-prompt-', '').replace('content-', '');

      // 1. Skill
      if (item.type === 'Skill' || item.type === 'GitHub Repository') {
        const alreadyExists = skills.some(s =>
          s.id === item.id ||
          s.id === generatedId ||
          `content-${s.id}` === item.id ||
          s.name.toLowerCase() === item.title.toLowerCase()
        );
        if (!alreadyExists) {
          onAddSkill({
            id: generatedId,
            name: item.title,
            description: item.description,
            category: item.category,
            tags: item.tags,
            stars: item.githubStars || 50,
            forks: item.githubForks || 10,
            updated: item.publishDate || new Date().toISOString().split('T')[0],
            author: item.githubName ? item.githubName.split('/')[0] : 'admin_curator',
            repoUrl: item.githubUrl || `https://github.com/openskills/${item.title.toLowerCase().replace(/\s+/g, '-')}`,
            installation: `npm install -g @openskills/${generatedId}\n# Run using:\n# npx -y @openskills/${generatedId}`,
            usage: 'Use standard Model Context command cues.',
            examples: [],
            changelog: [],
            featured: item.featured,
            trendingToday: false,
            trendingWeek: false,
            trendingMonth: false,
            status: 'approved',
            bookmarksCount: 0,
            seo: {
              metaTitle: item.metaTitle,
              metaDescription: item.metaDescription,
              canonicalUrl: item.canonicalUrl
            }
          });
        }
      }
      // 2. Category
      else if (item.type === 'Category') {
        const alreadyExists = categories.some(c =>
          c.id === item.id ||
          c.id === generatedId ||
          `content-cat-${c.id}` === item.id ||
          c.name.toLowerCase() === item.title.toLowerCase()
        );
        if (!alreadyExists) {
          onAddCategory({
            id: generatedId,
            name: item.title,
            iconName: item.tags[0] || 'Code2',
            skillsCount: 0,
            description: item.description,
            seo: {
              metaTitle: item.metaTitle,
              metaDescription: item.metaDescription,
              canonicalUrl: item.canonicalUrl
            }
          });
        }
      }
      // 3. Collection
      else if (item.type === 'Collection') {
        const alreadyExists = collections.some(c =>
          c.id === item.id ||
          c.id === generatedId ||
          `content-col-${c.id}` === item.id ||
          c.name.toLowerCase() === item.title.toLowerCase()
        );
        if (!alreadyExists) {
          onAddCollection({
            id: generatedId,
            name: item.title,
            description: item.description,
            colorTheme: (item.githubLicense as Collection['colorTheme']) || 'blue',
            skillsCount: item.tags.length,
            skillIds: item.tags,
            seo: {
              metaTitle: item.metaTitle,
              metaDescription: item.metaDescription,
              canonicalUrl: item.canonicalUrl
            }
          });
        }
      }
      // 4. Resource
      else if (item.type === 'Resource') {
        const alreadyExists = resources.some(r =>
          r.id === item.id ||
          r.id === generatedId ||
          `content-res-${r.id}` === item.id ||
          r.title.toLowerCase() === item.title.toLowerCase()
        );
        if (!alreadyExists) {
          onAddResource({
            id: generatedId,
            title: item.title,
            description: item.description,
            type: (item.tags[0] as Resource['type']) || 'Documentation',
            readTime: item.githubLicense || '5 min read',
            author: item.githubName || 'Admin Curator',
            url: item.githubUrl || 'https://modelcontextprotocol.io/quickstart',
            seo: {
              metaTitle: item.metaTitle,
              metaDescription: item.metaDescription,
              canonicalUrl: item.canonicalUrl
            }
          });
        }
      }
      // 5. Prompt
      else if (item.type === 'Prompt') {
        const alreadyExists = prompts.some(p =>
          p.id === item.id ||
          p.id === generatedId ||
          `content-prompt-${p.id}` === item.id ||
          p.title.toLowerCase() === item.title.toLowerCase()
        );
        if (!alreadyExists) {
          onAddPrompt({
            id: generatedId,
            title: item.title,
            description: item.description,
            content: item.promptContent || '',
            category: (item.promptCategory as Prompt['category']) || 'Coding',
            tags: item.tags,
            seo: {
              metaTitle: item.metaTitle,
              metaDescription: item.metaDescription,
              canonicalUrl: item.canonicalUrl
            }
          });
        }
      }
    });
  }, [contents]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      isUndoRedoRef.current = true;
      const nextIndex = historyIndex - 1;
      setHistoryIndex(nextIndex);
      setFormMarkdown(history[nextIndex]);
      showToast('⏪ Undone last edit');
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      isUndoRedoRef.current = true;
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setFormMarkdown(history[nextIndex]);
      showToast('⏩ Redone edit');
    }
  };

  // Debounce history pushes for Undo/Redo
  useEffect(() => {
    if (isUndoRedoRef.current) {
      isUndoRedoRef.current = false;
      return;
    }
    if (contents.length === 0) return;

    const handler = setTimeout(() => {
      if (history[historyIndex] !== formMarkdown) {
        const nextHistory = history.slice(0, historyIndex + 1);
        setHistory([...nextHistory, formMarkdown]);
        setHistoryIndex(nextHistory.length);
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [formMarkdown]);

  // Real-time synchronization hook to update contents array instantly on any form state change
  useEffect(() => {
    if (!selectedContentId || !currentItem) return;

    // Check if the form state actually differs from the database item to prevent infinite state updates
    const hasChanges =
      currentItem.type !== formType ||
      currentItem.title !== formTitle ||
      currentItem.description !== formDescription ||
      currentItem.markdownContent !== formMarkdown ||
      currentItem.status !== formStatus ||
      currentItem.category !== formCategory ||
      JSON.stringify(currentItem.tags) !== JSON.stringify(formTags) ||
      currentItem.keywords !== formKeywords ||
      currentItem.slug !== formSlug ||
      currentItem.metaTitle !== formMetaTitle ||
      currentItem.metaDescription !== formMetaDescription ||
      currentItem.canonicalUrl !== formCanonicalUrl ||
      currentItem.visibility !== formVisibility ||
      currentItem.featured !== formFeatured ||
      currentItem.pinned !== formPinned ||
      currentItem.publishDate !== formPublishDate ||
      currentItem.githubName !== formGithubName ||
      currentItem.githubUrl !== formGithubUrl ||
      currentItem.githubStars !== formGithubStars ||
      currentItem.githubForks !== formGithubForks ||
      currentItem.githubLicense !== formGithubLicense ||
      currentItem.promptTitle !== formPromptTitle ||
      currentItem.promptCategory !== formPromptCategory ||
      currentItem.promptContent !== formPromptContent ||
      JSON.stringify(currentItem.promptVariables) !== JSON.stringify(formPromptVariables) ||
      currentItem.videoEmbedUrl !== formVideoUrl ||
      currentItem.imageUrl !== formImageUrl ||
      currentItem.imageCaption !== formImageCaption ||
      currentItem.folderId !== formFolderId;

    if (hasChanges) {
      setContents(prev => prev.map(c => {
        if (c.id === selectedContentId) {
          return {
            ...c,
            type: formType,
            title: formTitle,
            description: formDescription,
            markdownContent: formMarkdown,
            status: formStatus,
            category: formCategory,
            tags: formTags,
            keywords: formKeywords,
            slug: formSlug,
            metaTitle: formMetaTitle,
            metaDescription: formMetaDescription,
            canonicalUrl: formCanonicalUrl,
            visibility: formVisibility,
            featured: formFeatured,
            pinned: formPinned,
            publishDate: formPublishDate,
            githubName: formGithubName,
            githubUrl: formGithubUrl,
            githubStars: formGithubStars,
            githubForks: formGithubForks,
            githubLicense: formGithubLicense,
            promptTitle: formPromptTitle,
            promptCategory: formPromptCategory,
            promptContent: formPromptContent,
            promptVariables: formPromptVariables,
            videoEmbedUrl: formVideoUrl,
            imageUrl: formImageUrl,
            imageCaption: formImageCaption,
            folderId: formFolderId,
            lastUpdated: new Date().toISOString()
          };
        }
        return c;
      }));
      setAutosaveStatus('saved');
      setLastSavedTime(new Date().toLocaleTimeString());
    }
  }, [
    selectedContentId, formType, formTitle, formDescription, formMarkdown,
    formStatus, formCategory, formTags, formKeywords, formSlug, formMetaTitle, formMetaDescription,
    formCanonicalUrl, formVisibility, formFeatured, formPinned, formPublishDate,
    formGithubName, formGithubUrl, formGithubStars, formGithubForks, formGithubLicense,
    formPromptTitle, formPromptCategory, formPromptContent, formPromptVariables,
    formVideoUrl, formImageUrl, formImageCaption, formFolderId
  ]);

  // Autosave Simulator (triggers every 10 seconds if any properties became unsaved)
  useEffect(() => {
    const interval = setInterval(() => {
      if (autosaveStatus === 'unsaved' && currentItem) {
        setAutosaveStatus('saving');
        setTimeout(() => {
          setContents(prev => prev.map(c => {
            if (c.id === selectedContentId) {
              return {
                ...c,
                type: formType,
                title: formTitle,
                description: formDescription,
                markdownContent: formMarkdown,
                status: formStatus,
                category: formCategory,
                tags: formTags,
                keywords: formKeywords,
                slug: formSlug,
                metaTitle: formMetaTitle,
                metaDescription: formMetaDescription,
                canonicalUrl: formCanonicalUrl,
                visibility: formVisibility,
                featured: formFeatured,
                pinned: formPinned,
                publishDate: formPublishDate,

                githubName: formGithubName,
                githubUrl: formGithubUrl,
                githubStars: formGithubStars,
                githubForks: formGithubForks,
                githubLicense: formGithubLicense,

                promptTitle: formPromptTitle,
                promptCategory: formPromptCategory,
                promptContent: formPromptContent,
                promptVariables: formPromptVariables,

                videoEmbedUrl: formVideoUrl,
                imageUrl: formImageUrl,
                imageCaption: formImageCaption,
                lastUpdated: new Date().toISOString(),
                folderId: formFolderId
              };
            }
            return c;
          }));

          setLastSavedTime(new Date().toLocaleTimeString());
          setAutosaveStatus('saved');
        }, 800);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [
    autosaveStatus, selectedContentId, formType, formTitle, formDescription, formMarkdown,
    formStatus, formCategory, formTags, formKeywords, formSlug, formMetaTitle, formMetaDescription,
    formCanonicalUrl, formVisibility, formFeatured, formPinned, formPublishDate,
    formGithubName, formGithubUrl, formGithubStars, formGithubForks, formGithubLicense,
    formPromptTitle, formPromptCategory, formPromptContent, formPromptVariables,
    formVideoUrl, formImageUrl, formImageCaption, formFolderId, folders
  ]);

  const handleFieldChange = (fn: () => void) => {
    fn();
    setAutosaveStatus('unsaved');
  };

  const handleCmsSaveRaw = () => {
    if (!currentItem) return;
    setAutosaveStatus('saving');

    // Check if this editing item is of type 'Skill' and should propagate back to main skills state!
    if (formType === 'Skill' || formType === 'GitHub Repository') {
      const existingSkill = skills.find(s => s.name.toLowerCase() === formTitle.toLowerCase() || s.id === selectedContentId || s.id === selectedContentId.replace('content-', ''));
      const updatedSkillObj = {
        id: existingSkill ? existingSkill.id : (selectedContentId.startsWith('content-') ? selectedContentId.replace('content-', '') : selectedContentId),
        name: formTitle,
        description: formDescription,
        category: formCategory,
        tags: formTags,
        stars: formGithubStars || (existingSkill ? existingSkill.stars : 0),
        forks: formGithubForks || (existingSkill ? existingSkill.forks : 0),
        updated: formPublishDate || (existingSkill ? existingSkill.updated : new Date().toISOString().split('T')[0]),
        repoUrl: formGithubUrl || (existingSkill ? existingSkill.repoUrl : ''),
        author: formGithubName ? formGithubName.split('/')[0] : (existingSkill ? existingSkill.author : 'admin_curator'),
        installation: `npm install -g @mcp/${formTitle.toLowerCase().replace(/\s+/g, '-')}\n# Or use via Claude config:\n{\n  "${formTitle.toLowerCase().replace(/\s+/g, '_')}": {\n    "command": "npx",\n    "args": ["-y", "${formGithubName || '@mcp/server'}", "${formVideoUrl}"]\n  }\n}`,
        usage: 'Simply prompt Claude with: ' + formDescription,
        examples: existingSkill ? existingSkill.examples : [],
        changelog: existingSkill ? existingSkill.changelog : [],
        featured: formFeatured,
        trendingToday: existingSkill ? existingSkill.trendingToday : false,
        trendingWeek: existingSkill ? existingSkill.trendingWeek : false,
        trendingMonth: existingSkill ? existingSkill.trendingMonth : false,
        status: (formStatus === 'Published' ? 'approved' : 'pending') as 'approved' | 'pending',
        bookmarksCount: existingSkill ? existingSkill.bookmarksCount : 0,
        seo: {
          metaTitle: formMetaTitle,
          metaDescription: formMetaDescription,
          canonicalUrl: formCanonicalUrl,
          ogImages: existingSkill?.seo?.ogImages || [],
          activeOgImage: existingSkill?.seo?.activeOgImage || '',
        }
      };
      if (existingSkill) {
        onUpdateSkill(updatedSkillObj);
      } else {
        onAddSkill(updatedSkillObj);
      }
    }
    // Check if Category
    else if (formType === 'Category') {
      const cleanedId = selectedContentId.replace('content-cat-', '').replace('content-', '');
      const existingCat = categories.find(c => c.id === cleanedId || c.name.toLowerCase() === formTitle.toLowerCase());
      const updatedCatObj = {
        id: existingCat ? existingCat.id : (formSlug || cleanedId),
        name: formTitle,
        iconName: formTags[0] || 'Code2', // Use tags[0] for iconName
        skillsCount: existingCat ? existingCat.skillsCount : 0,
        description: formDescription,
        seo: {
          metaTitle: formMetaTitle,
          metaDescription: formMetaDescription,
          canonicalUrl: formCanonicalUrl
        }
      };
      if (existingCat) {
        onUpdateCategory(updatedCatObj);
      } else {
        onAddCategory(updatedCatObj);
      }
    }
    // Check if Collection
    else if (formType === 'Collection') {
      const cleanedId = selectedContentId.replace('content-col-', '').replace('content-', '');
      const existingCol = collections.find(c => c.id === cleanedId || c.name.toLowerCase() === formTitle.toLowerCase());
      const updatedColObj = {
        id: existingCol ? existingCol.id : (formSlug || cleanedId),
        name: formTitle,
        description: formDescription,
        colorTheme: (formGithubLicense as Collection['colorTheme']) || 'blue', // Use githubLicense for colorTheme
        skillsCount: formTags.length,
        skillIds: formTags, // Use tags for skillIds
        seo: {
          metaTitle: formMetaTitle,
          metaDescription: formMetaDescription,
          canonicalUrl: formCanonicalUrl
        }
      };
      if (existingCol) {
        onUpdateCollection(updatedColObj);
      } else {
        onAddCollection(updatedColObj);
      }
    }
    // Check if Resource
    else if (formType === 'Resource') {
      const cleanedId = selectedContentId.replace('content-res-', '').replace('content-', '');
      const existingRes = resources.find(r => r.id === cleanedId || r.title.toLowerCase() === formTitle.toLowerCase());
      const updatedResObj = {
        id: existingRes ? existingRes.id : (formSlug || cleanedId),
        title: formTitle,
        description: formDescription,
        type: (formTags[0] as Resource['type']) || 'Documentation', // Use tags[0] for type
        readTime: formGithubLicense || '5 min read', // Use githubLicense for readTime
        author: formGithubName || 'Admin Curator', // Use githubName for author
        url: formGithubUrl || 'https://modelcontextprotocol.io/quickstart', // Use githubUrl for url
        seo: {
          metaTitle: formMetaTitle,
          metaDescription: formMetaDescription,
          canonicalUrl: formCanonicalUrl
        }
      };
      if (existingRes) {
        onUpdateResource(updatedResObj);
      } else {
        onAddResource(updatedResObj);
      }
    }
    // Check if Prompt
    else if (formType === 'Prompt') {
      const cleanedId = selectedContentId.replace('content-prompt-', '').replace('content-', '');
      const existingPrompt = prompts.find(p => p.id === cleanedId || p.title.toLowerCase() === formTitle.toLowerCase());
      const updatedPromptObj = {
        id: existingPrompt ? existingPrompt.id : (formSlug || cleanedId),
        title: formTitle,
        description: formDescription,
        content: formPromptContent || '',
        category: (formPromptCategory as Prompt['category']) || 'Coding',
        tags: formTags,
        seo: {
          metaTitle: formMetaTitle,
          metaDescription: formMetaDescription,
          canonicalUrl: formCanonicalUrl
        }
      };
      if (existingPrompt) {
        onUpdatePrompt(updatedPromptObj);
      } else {
        onAddPrompt(updatedPromptObj);
      }
    }

    setContents(prev => prev.map(c => {
      if (c.id === selectedContentId) {
        return {
          ...c,
          type: formType,
          title: formTitle,
          description: formDescription,
          markdownContent: formMarkdown,
          status: formStatus,
          category: formCategory,
          tags: formTags,
          keywords: formKeywords,
          slug: formSlug,
          metaTitle: formMetaTitle,
          metaDescription: formMetaDescription,
          canonicalUrl: formCanonicalUrl,
          visibility: formVisibility,
          featured: formFeatured,
          pinned: formPinned,
          publishDate: formPublishDate,
          githubName: formGithubName,
          githubUrl: formGithubUrl,
          githubStars: formGithubStars,
          githubForks: formGithubForks,
          githubLicense: formGithubLicense,
          promptTitle: formPromptTitle,
          promptCategory: formPromptCategory,
          promptContent: formPromptContent,
          promptVariables: formPromptVariables,
          videoEmbedUrl: formVideoUrl,
          imageUrl: formImageUrl,
          imageCaption: formImageCaption,
          lastUpdated: new Date().toISOString(),
          folderId: formFolderId
        };
      }
      return c;
    }));

    // Add version revision block
    const newRev: ContentRevision = {
      timestamp: new Date().toLocaleString(),
      version: `v2.${revisions.length + 1} (Saved)`,
      title: formTitle,
      markdownContent: formMarkdown,
      author: 'Admin Controller',
      logMessage: `Manual curation save trigger & live production index sync.`
    };
    setRevisions(prev => [newRev, ...prev]);

    setTimeout(() => {
      setLastSavedTime(new Date().toLocaleTimeString());
      setAutosaveStatus('saved');
      showToast('🎉 Content synchronized and published live to directories!');
    }, 600);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Login authentication validator
  const handleAdminAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authUsername === 'admin' && authPassword === 'openskills2026') {
      setIsAuthenticated(true);
      localStorage.setItem('openskills_admin_auth', 'true');
      setAuthError('');
      showToast('🔓 Welcome Back! Accessing secure administration console.');
    } else {
      setAuthError('Error: Invalid administration token or secret username credentials.');
    }
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('openskills_admin_auth');
    showToast('🔒 Safely logged out of editing workstation.');
  };

  // Create new blank content asset template
  const handleCreateNewContentAsset = (type: CMSContentItem['type'] = 'GitHub Repository') => {
    const newId = `content-${Date.now()}`;

    let title = 'Create new';
    let markdownContent = `# Create new\n\nStart writing here...`;
    let description = 'A new draft document in openskills CMS.';
    let tags: string[] = ['new'];
    let category = 'development';
    let githubLicense = '';
    let githubName = '';
    let githubUrl = '';
    let promptTitle = '';
    let promptContent = '';
    let promptCategory = '';

    if (type === 'Category') {
      title = 'New Category';
      markdownContent = `# New Category\n\nCategory description here.`;
      description = 'A new Category.';
      tags = ['Code2'];
      category = 'development';
    } else if (type === 'Collection') {
      title = 'New Collection';
      markdownContent = `# New Collection\n\nCollection description here.`;
      description = 'A new Collection.';
      tags = [];
      category = 'development';
      githubLicense = 'blue';
    } else if (type === 'Resource') {
      title = 'New Resource';
      markdownContent = `# New Resource\n\nResource description here.`;
      description = 'A new Resource.';
      tags = ['Documentation'];
      category = 'development';
      githubLicense = '5 min read';
      githubName = 'Admin Curator';
      githubUrl = 'https://modelcontextprotocol.io/quickstart';
    } else if (type === 'Prompt') {
      title = 'New Prompt';
      markdownContent = `# New Prompt\n\nPrompt description here.`;
      description = 'A new Prompt.';
      tags = ['new'];
      category = 'development';
      promptTitle = 'New Prompt';
      promptContent = 'Enter prompt template here.';
      promptCategory = 'Coding';
    }

    const newAsset: CMSContentItem = {
      id: newId,
      type: type,
      title: title,
      description: description,
      markdownContent: markdownContent,
      status: 'Draft',
      category: category,
      tags: tags,
      slug: `new-asset-${Date.now()}`,
      metaTitle: `${title} - openSkills Directory`,
      metaDescription: `A newly created ${type.toLowerCase()} draft.`,
      canonicalUrl: `https://openskills.in/${type.toLowerCase()}/new`,
      keywords: `new, ${type.toLowerCase()}`,
      featured: false,
      pinned: false,
      visibility: 'Public',
      publishDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString(),
      promptTitle: promptTitle,
      promptCategory: promptCategory,
      promptContent: promptContent,
      promptVariables: [],
      githubLicense: githubLicense,
      githubName: githubName,
      githubUrl: githubUrl
    };

    setContents(prev => [newAsset, ...prev]);
    setSelectedContentId(newId);
    showToast(`📝 Created new ${type} drafting board workspace.`);
  };

  // Duplicate current active item
  const handleDuplicateCurrent = () => {
    if (!currentItem) return;
    const duplicated: CMSContentItem = {
      ...currentItem,
      id: `content-copy-${Date.now()}`,
      title: `${currentItem.title} (Duplicate)`,
      slug: `${currentItem.slug}-copy`,
      status: 'Draft',
      lastUpdated: new Date().toISOString()
    };
    setContents(prev => [duplicated, ...prev]);
    setSelectedContentId(duplicated.id);
    showToast('📋 Duplicated current template asset.');
  };

  // Folder creation function
  const handleCreateNewFolder = () => {
    const folderName = window.prompt("Enter new folder name:");
    if (!folderName || !folderName.trim()) return;

    const newFolder = {
      id: `folder-${Date.now()}`,
      name: folderName.trim()
    };

    setFolders(prev => [...prev, newFolder]);
    setExpandedFolders(prev => [...prev, newFolder.id]);
    showToast(`📁 Created folder "${newFolder.name}"`);
  };

  // Helper to propagate deletions of Content items to top level App state
  const propagateCmsDelete = (assetId: string, assetTitle: string, assetType?: string) => {
    const cleanedId = assetId.replace('content-cat-', '').replace('content-col-', '').replace('content-res-', '').replace('content-prompt-', '').replace('content-', '');
    const typeToCheck = assetType || formType;
    if (typeToCheck === 'Skill' || typeToCheck === 'GitHub Repository') {
      const matched = skills.find(s => s.id === assetId || s.id === cleanedId || s.name.toLowerCase() === assetTitle.toLowerCase());
      if (matched) onDeleteSkill(matched.id);
    } else if (typeToCheck === 'Category') {
      const matched = categories.find(c => c.id === assetId || c.id === cleanedId || c.name.toLowerCase() === assetTitle.toLowerCase());
      if (matched) onDeleteCategory(matched.id);
    } else if (typeToCheck === 'Collection') {
      const matched = collections.find(c => c.id === assetId || c.id === cleanedId || c.name.toLowerCase() === assetTitle.toLowerCase());
      if (matched) onDeleteCollection(matched.id);
    } else if (typeToCheck === 'Resource') {
      const matched = resources.find(r => r.id === assetId || r.id === cleanedId || r.title.toLowerCase() === assetTitle.toLowerCase());
      if (matched) onDeleteResource(matched.id);
    } else if (typeToCheck === 'Prompt') {
      const matched = prompts.find(p => p.id === assetId || p.id === cleanedId || p.title.toLowerCase() === assetTitle.toLowerCase());
      if (matched) onDeletePrompt(matched.id);
    }
  };

  // Delete current selected item
  const handleDeleteCurrent = () => {
    if (!currentItem) return;

    const deletingId = selectedContentId;
    const deletingTitle = currentItem.title;

    const idx = contents.findIndex(c => c.id === deletingId);
    const filtered = contents.filter(c => c.id !== deletingId);
    setContents(filtered);

    // select another item
    const nextItem = filtered[idx === 0 ? 0 : idx - 1] || filtered[0];
    setSelectedContentId(nextItem ? nextItem.id : '');

    // Propagate deletion to top level state so skills lists are accurate
    propagateCmsDelete(deletingId, deletingTitle);

    showToast('🗑️ Asset moved to terminal archive.');
  };

  // Tags modifiers
  const handleAddNewTag = () => {
    if (!newTagInput.trim()) return;
    if (formTags.includes(newTagInput.trim().toLowerCase())) {
      setNewTagInput('');
      return;
    }
    handleFieldChange(() => {
      setFormTags(prev => [...prev, newTagInput.trim().toLowerCase()]);
      setNewTagInput('');
    });
  };

  const handleRemoveTag = (tagToRemove: string) => {
    handleFieldChange(() => {
      setFormTags(prev => prev.filter(t => t !== tagToRemove));
    });
  };

  // Prompt variable helpers
  const handleAddPromptVariable = () => {
    if (!newVariableInput.trim()) return;
    const clean = newVariableInput.trim().replace(/[{}]/g, '');
    if (formPromptVariables.includes(clean)) {
      setNewVariableInput('');
      return;
    }
    handleFieldChange(() => {
      setFormPromptVariables(prev => [...prev, clean]);
      setNewVariableInput('');
    });
  };

  const handleRemovePromptVariable = (variable: string) => {
    handleFieldChange(() => {
      setFormPromptVariables(prev => prev.filter(v => v !== variable));
    });
  };

  // Markdown live formatter / slash commands insert helper
  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
      if (e.shiftKey) {
        e.preventDefault();
        handleRedo();
      } else {
        e.preventDefault();
        handleUndo();
      }
    } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'y') {
      e.preventDefault();
      handleRedo();
    } else if (e.key === '/') {
      setSlashMenuOpen(true);
      setSlashMenuSearch('');
      if (textareaRef.current) {
        setCursorPosition(textareaRef.current.selectionStart);
      }
    } else if (slashMenuOpen) {
      if (e.key === 'Escape' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        // Simple trap to close popovers
        setSlashMenuOpen(false);
      }
    }
  };

  const insertSlashCommand = (type: string) => {
    if (!textareaRef.current) return;
    const text = formMarkdown;
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;

    let textToInsert = '';
    switch (type) {
      case 'heading-1':
        textToInsert = '\n# Class Premium Heading 1\n';
        break;
      case 'heading-2':
        textToInsert = '\n## Core Integration Section\n';
        break;
      case 'callout-info':
        textToInsert = '\n:::info\n💡 **Tip**: Remember to authenticate port 3000 to fetch schemas securely!\n:::\n';
        break;
      case 'callout-warning':
        textToInsert = '\n:::warning\n⚠️ **Caution**: Never expose your high-ranking secret variables client-side.\n:::\n';
        break;
      case 'code':
        textToInsert = '\n```typescript\n// Auto-synchronized server connection wrapper\nconst syncProject = async () => {\n  console.log("Connecting database...");\n};\n```\n';
        break;
      case 'table':
        textToInsert = '\n| Node Module | Port Connection | Access Level |\n| :--- | :--- | :--- |\n| PostgreSQL | 5432 | Read-Only Schema |\n| SQLite | Native | Full Access |\n';
        break;
      case 'checklist':
        textToInsert = '\n- [x] Configure server permissions\n- [ ] Deploy client-side API proxies\n- [ ] Seed SQLite telemetry values\n';
        break;
      case 'image':
        textToInsert = '\n![Curation Showcase Image](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80)\n';
        break;
    }

    const valueBeforeSlash = text.substring(0, start).lastIndexOf('/');
    const cleanStart = valueBeforeSlash !== -1 ? valueBeforeSlash : start;

    handleFieldChange(() => {
      const updatedValue = text.substring(0, cleanStart) + textToInsert + text.substring(end);
      setFormMarkdown(updatedValue);
      setSlashMenuOpen(false);
    });

    // Refocus
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.selectionStart = cleanStart + textToInsert.length;
        textareaRef.current.selectionEnd = cleanStart + textToInsert.length;
      }
    }, 100);
  };

  // Image upload simulator (Drag & Drop or screenshots pasting)
  const simulateImageDrop = () => {
    setImageUploadProgress(10);
    const interval = setInterval(() => {
      setImageUploadProgress(prev => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setImageUploadProgress(null);
            handleFieldChange(() => {
              setFormImageUrl('https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=600&auto=format&fit=crop');
              setFormImageCaption('Dynamic multi-threaded workspace diagram');
            });
            showToast('📸 Image loaded & optimized successfully (compressed as webp).');
          }, 300);
          return 100;
        }
        return prev + 30;
      });
    }, 150);
  };

  // Automatic GitHub Repo details simulation helper
  const simulateGithubMetadataFetch = () => {
    if (!formGithubUrl) {
      showToast('⚠️ Specify a repository GitHub URL first.');
      return;
    }
    showToast('Fetching telemetry from api.github.com/repos...');
    setTimeout(() => {
      handleFieldChange(() => {
        const repoName = formGithubUrl.replace('https://github.com/', '').replace('www.github.com/', '');
        setFormGithubName(repoName || 'claudelabs/new-mcp-server');
        setFormGithubStars(Math.floor(Math.random() * 1500) + 400);
        setFormGithubForks(Math.floor(Math.random() * 300) + 80);
        setFormGithubLicense('MIT License');
      });
      showToast('📊 Repository statistics fetched successfully!');
    }, 800);
  };

  // Meta dynamic SEO Analyzer Score calculator
  const calculateSEOScore = () => {
    let score = 20;
    if (formTitle.length > 10) score += 20;
    if (formSlug.length > 5) score += 15;
    if (formMetaDescription.length > 30) score += 20;
    if (formKeywords.trim().length > 4) score += 15;
    if (formCanonicalUrl.startsWith('http')) score += 10;
    return score;
  };

  // Render simulated callouts or grids cleanly in Preview Mode
  const formatMarkdownPreviewHTML = (text: string) => {
    if (!text) return <p className="text-zinc-400 italic">No instructions curated.</p>;

    // Split into lines and parse standard blocks simply (Markdown simulator)
    const lines = text.split('\n');
    let parsedLines: React.ReactNode[] = [];

    let inCode = false;
    let codeBlockText: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith('```')) {
        if (inCode) {
          // Closed code block
          const blockContent = codeBlockText.join('\n');
          parsedLines.push(
            <div key={`code-${i}`} className="my-4 border border-zinc-200 rounded-md overflow-hidden bg-zinc-950 text-zinc-100 font-mono text-xs">
              <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900 text-[10px] text-zinc-400">
                <span>TS/JSON CONFIG</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(blockContent);
                    showToast('📋 Copied instructions code block!');
                  }}
                  className="hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="h-2.5 w-2.5" />
                  <span>Copy</span>
                </button>
              </div>
              <pre className="p-4 overflow-x-auto whitespace-pre leading-relaxed text-emerald-400">
                <code>{blockContent}</code>
              </pre>
            </div>
          );
          codeBlockText = [];
          inCode = false;
        } else {
          inCode = true;
        }
        continue;
      }

      if (inCode) {
        codeBlockText.push(line);
        continue;
      }

      // Headers
      if (line.startsWith('# ')) {
        parsedLines.push(<h1 key={i} className="text-xl sm:text-2xl font-extrabold text-zinc-950 mt-5 mb-2 font-sans tracking-tight">{line.replace('# ', '')}</h1>);
      } else if (line.startsWith('## ')) {
        parsedLines.push(<h2 key={i} className="text-base sm:text-lg font-bold text-zinc-900 mt-4 mb-2 font-sans tracking-tight">{line.replace('## ', '')}</h2>);
      } else if (line.startsWith('### ')) {
        parsedLines.push(<h3 key={i} className="text-sm font-bold text-zinc-850 mt-3.5 mb-1.5 font-sans">{line.replace('### ', '')}</h3>);
      }
      // Info logs
      else if (line.startsWith(':::info') || line.startsWith(':::warning')) {
        let blockLines = [];
        let type = line.startsWith(':::info') ? 'info' : 'warning';
        i++; // skip start
        while (i < lines.length && !lines[i].startsWith(':::')) {
          blockLines.push(lines[i]);
          i++;
        }
        parsedLines.push(
          <div key={i} className={`p-3.5 my-3.5 border-l-3 rounded-r-lg font-sans text-xs ${type === 'info'
              ? 'bg-blue-50 border-blue-500 text-blue-900'
              : 'bg-amber-50 border-amber-500 text-amber-900'
            }`}>
            <div className="flex">
              {type === 'info' ? <Info className="h-4 w-4 shrink-0 mr-2 mt-0.5" /> : <AlertTriangle className="h-4 w-4 shrink-0 mr-2 mt-0.5" />}
              <div className="space-y-1">
                {blockLines.map((bl, bidx) => (
                  <p key={bidx} className="leading-relaxed">{bl.replace(/^[*\s]+/, '')}</p>
                ))}
              </div>
            </div>
          </div>
        );
      }
      // Checklists
      else if (line.startsWith('- [ ] ') || line.startsWith('- [x] ')) {
        const checked = line.startsWith('- [x] ');
        parsedLines.push(
          <div key={i} className="flex items-center space-x-2 my-1 text-xs text-zinc-700">
            <input type="checkbox" checked={checked} readOnly className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500 pointer-events-none" />
            <span className={checked ? 'line-through text-zinc-400' : ''}>{line.substring(6)}</span>
          </div>
        );
      }
      // Unordered lists
      else if (line.startsWith('- ') || line.startsWith('* ')) {
        parsedLines.push(<li key={i} className="list-disc list-inside ml-4 my-1 text-xs text-zinc-700 leading-relaxed">{line.substring(2)}</li>);
      }
      // blockquotes
      else if (line.startsWith('> ')) {
        parsedLines.push(<blockquote key={i} className="border-l-4 border-zinc-200 pl-4 py-1.5 my-3.5 italic text-zinc-500 text-xs tracking-wide">{line.substring(2)}</blockquote>);
      } else if (line.trim() === '') {
        parsedLines.push(<div key={i} className="h-2.5" />);
      } else {
        parsedLines.push(<p key={i} className="text-xs text-zinc-700 leading-relaxed font-sans mt-1">{line}</p>);
      }
    }

    return <div className="space-y-1.5">{parsedLines}</div>;
  };

  // Filter content items by category / status
  const filteredContents = contents.filter(c => {
    const s = cmsSearch.toLowerCase();
    const matchesSearch = c.title.toLowerCase().includes(s) ||
      c.tags.some(t => t.includes(s)) ||
      (c.githubName || '').toLowerCase().includes(s);
    if (!matchesSearch) return false;
    if (sidebarFilter === 'all') return true;
    if (sidebarFilter === 'drafts') return c.status === 'Draft';
    if (sidebarFilter === 'published') return c.status === 'Published';
    if (sidebarFilter === 'archived') return c.status === 'Archived';
    return c.type.toLowerCase() === sidebarFilter.toLowerCase() ||
      c.category.toLowerCase() === sidebarFilter.toLowerCase();
  });

  // SEO dynamic color meter
  const seoScore = calculateSEOScore();
  const getScoreColor = (sc: number) => {
    if (sc < 40) return 'bg-red-500';
    if (sc < 70) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const getScoreLabel = (sc: number) => {
    if (sc < 40) return 'Needs Tuning';
    if (sc < 70) return 'Intermediate Good';
    return 'Excellent SEO';
  };

  const renderFileExplorerItem = (asset: CMSContentItem) => {
    const isSelected = asset.id === selectedContentId;

    // Choose file icon based on type
    let FileIconComponent = FileText;
    if (asset.type === 'GitHub Repository' || asset.type === 'Skill') FileIconComponent = GitFork;
    if (asset.type === 'Prompt') FileIconComponent = Sparkles;
    if (asset.type === 'Tutorial') FileIconComponent = BookOpen;
    if (asset.type === 'Collection') FileIconComponent = Layers;
    if (asset.type === 'Category') FileIconComponent = Tag;
    if (asset.type === 'Resource') FileIconComponent = ExternalLink;

    const handleRenameFile = () => {
      const currentTitle = isSelected ? formTitle : asset.title;
      const newName = window.prompt("Rename file:", currentTitle);
      if (newName && newName.trim()) {
        const trimmedName = newName.trim();
        if (isSelected) {
          setFormTitle(trimmedName);
          setFormSlug(trimmedName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
          setFormMetaTitle(`${trimmedName} - Curated openSkills`);

          const updatedMarkdown = updateMarkdownHeading(formMarkdown, trimmedName);
          setFormMarkdown(updatedMarkdown);
        }
        setContents(prev => prev.map(c => {
          if (c.id === asset.id) {
            const updatedMd = updateMarkdownHeading(c.markdownContent || '', trimmedName);
            return {
              ...c,
              title: trimmedName,
              markdownContent: updatedMd
            };
          }
          return c;
        }));
        showToast(`✏️ Renamed file to "${trimmedName}"`);
      }
    };

    return (
      <div
        key={asset.id}
        onClick={() => {
          setSelectedContentId(asset.id);
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          handleRenameFile();
        }}
        className={`group p-1.5 flex items-center justify-between rounded-md cursor-pointer transition-colors border border-transparent text-[11px] ${isSelected
            ? 'bg-blue-600 text-white font-semibold shadow-sm'
            : 'hover:bg-zinc-100 dark:hover:bg-[#16161a] hover:border-zinc-200 dark:hover:border-[#222228] text-zinc-700 dark:text-zinc-300'
          }`}
      >
        <div className="flex items-center space-x-1.5 truncate flex-1 min-w-0" title={asset.title}>
          <FileIconComponent className={`h-3.5 w-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-zinc-400 dark:text-zinc-500'}`} />
          <span className="truncate" title={asset.title}>{asset.title}</span>
        </div>

        <div className="flex items-center space-x-1 shrink-0">
          {/* Small status dot instead of large status text */}
          <span className={`h-1.5 w-1.5 rounded-full ${asset.status === 'Published'
              ? 'bg-emerald-500'
              : asset.status === 'Draft'
                ? 'bg-orange-500'
                : 'bg-zinc-400 dark:bg-zinc-600'
            }`} title={asset.status} />

          {/* Rename File Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleRenameFile();
            }}
            className={`p-0.5 rounded transition-all opacity-0 group-hover:opacity-100 hover:scale-105 cursor-pointer ${isSelected ? 'text-zinc-200 hover:bg-blue-700' : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-[#202028]'
              }`}
            title="Rename file"
          >
            <Edit3 className="h-2.5 w-2.5" />
          </button>

          {/* Move File Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMoveItemModal({
                isOpen: true,
                itemType: 'file',
                itemId: asset.id,
                itemName: asset.title
              });
            }}
            className={`p-0.5 rounded transition-all opacity-0 group-hover:opacity-100 hover:scale-105 cursor-pointer ${isSelected ? 'text-zinc-200 hover:bg-blue-700' : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-[#202028]'
              }`}
            title="Move file"
          >
            <ArrowUpDown className="h-2.5 w-2.5" />
          </button>

          {/* Delete File Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const confirmDelete = window.confirm(`Are you sure you want to delete "${asset.title}"?`);
              if (!confirmDelete) return;
              const idx = contents.findIndex(c => c.id === asset.id);
              const filtered = contents.filter(c => c.id !== asset.id);
              setContents(filtered);
              if (selectedContentId === asset.id) {
                const nextItem = filtered[idx === 0 ? 0 : idx - 1] || filtered[0];
                setSelectedContentId(nextItem ? nextItem.id : '');
              }
              propagateCmsDelete(asset.id, asset.title, asset.type);
              showToast('🗑️ Asset moved to terminal archive.');
            }}
            className={`p-0.5 rounded transition-all opacity-0 group-hover:opacity-100 hover:scale-105 cursor-pointer ${isSelected ? 'text-red-200 hover:bg-blue-700' : 'text-red-500 dark:text-red-400 hover:bg-zinc-200 dark:hover:bg-[#202028]'
              }`}
            title="Delete file"
          >
            <Trash className="h-2.5 w-2.5" />
          </button>
        </div>
      </div>
    );
  };

  const renderSidebarFolder = (folder: typeof folders[0], depth: number = 0) => {
    const isExpanded = expandedFolders.includes(folder.id);
    const folderFiles = filteredContents.filter(c => c.folderId === folder.id);
    const subfolders = folders.filter(f => f.parentId === folder.id);

    const handleRenameFolder = () => {
      const newName = window.prompt("Rename folder:", folder.name);
      if (newName && newName.trim()) {
        setFolders(prev => prev.map(f => f.id === folder.id ? { ...f, name: newName.trim() } : f));
        showToast(`✏️ Renamed folder to "${newName.trim()}"`);
      }
    };

    return (
      <div key={folder.id} className="space-y-0.5">
        {/* Folder Header */}
        <div
          onClick={() => {
            setExpandedFolders(prev =>
              isExpanded ? prev.filter(id => id !== folder.id) : [...prev, folder.id]
            );
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            handleRenameFolder();
          }}
          className="group flex items-center justify-between p-1.5 hover:bg-zinc-100 dark:hover:bg-[#16161a] rounded-md cursor-pointer text-xs font-semibold text-zinc-700 dark:text-zinc-300 select-none transition-colors"
        >
          <div className="flex items-center space-x-1.5 truncate">
            {isExpanded ? (
              <FolderOpen className="h-3.5 w-3.5 text-blue-500 shrink-0" />
            ) : (
              <Folder className="h-3.5 w-3.5 text-blue-500 shrink-0" />
            )}
            <span className="truncate">{folder.name}</span>
          </div>

          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[9px] font-mono font-normal bg-zinc-200 dark:bg-[#202028] px-1 rounded text-zinc-550 dark:text-zinc-400">
              {folderFiles.length + subfolders.length}
            </span>
            {/* Rename Folder trigger */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRenameFolder();
              }}
              className="p-0.5 rounded text-zinc-550 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-[#202028] cursor-pointer"
              title="Rename Folder"
            >
              <Edit3 className="h-2.5 w-2.5" />
            </button>
            {/* Move Folder trigger */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMoveItemModal({
                  isOpen: true,
                  itemType: 'folder',
                  itemId: folder.id,
                  itemName: folder.name
                });
              }}
              className="p-0.5 rounded text-zinc-550 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-[#202028] cursor-pointer"
              title="Move Folder"
            >
              <ArrowUpDown className="h-2.5 w-2.5" />
            </button>
            {/* Delete Folder trigger */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm(`Delete folder "${folder.name}"? Files and subfolders inside will be moved to Root/Parent level.`)) {
                  setFolders(prev => prev.map(f => f.parentId === folder.id ? { ...f, parentId: undefined } : f).filter(f => f.id !== folder.id));
                  setContents(contents => contents.map(c => c.folderId === folder.id ? { ...c, folderId: '' } : c));
                  showToast(`🗑️ Deleted folder "${folder.name}"`);
                }
              }}
              className="p-0.5 rounded text-red-500 dark:text-red-400 hover:bg-zinc-200 dark:hover:bg-[#202028] cursor-pointer"
              title="Delete Folder"
            >
              <Trash className="h-2.5 w-2.5" />
            </button>
          </div>
        </div>

        {/* Folder Children (Subfolders & Files, Indented) */}
        {isExpanded && (
          <div className="ml-4 border-l border-zinc-200 dark:border-[#222228] pl-2 space-y-0.5 animate-in fade-in slide-in-from-left-1 duration-100">
            {/* Subfolders first */}
            {subfolders.map(sub => renderSidebarFolder(sub, depth + 1))}
            {/* Files in folder */}
            {folderFiles.map(asset => renderFileExplorerItem(asset))}
            {folderFiles.length === 0 && subfolders.length === 0 && (
              <div className="py-1 pl-5 text-[10px] text-zinc-400 dark:text-zinc-650 italic">
                Empty folder
              </div>
            )}
          </div>
        )}
      </div>
    );
  };



  // Authentic Authorization Box (Rendering before anything else if regular users enter)
  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-md my-16 bg-[#ffffff] dark:bg-[#121214] border border-zinc-200 dark:border-[#1e1e24] rounded-xl p-6.5 shadow-sm font-sans text-zinc-950 dark:text-zinc-550">
        <div className="text-center mb-6">
          <div className="mx-auto h-12 w-12 rounded-full bg-amber-50/10 dark:bg-amber-500/10 border border-amber-200/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-3.5">
            <Shield className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">CMS Admin Protection Shield</h2>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 max-w-xs mx-auto">
            This module contains core publishing nodes. To update openSkills indices, authenticate with your administration ID.
          </p>
        </div>

        <form onSubmit={handleAdminAuthSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
              Administrator ID
            </label>
            <input
              type="text"
              placeholder="e.g. admin"
              value={authUsername}
              onChange={(e) => setAuthUsername(e.target.value)}
              className="w-full h-9 px-3 rounded-md border border-zinc-200 dark:border-[#22222a] bg-[#ffffff] dark:bg-[#16161a] text-zinc-900 dark:text-zinc-100 text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-550 mb-1">
              Gateway Secret Password
            </label>
            <input
              type="password"
              placeholder="openskills2026"
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
              className="w-full h-9 px-3 rounded-md border border-zinc-200 dark:border-[#22222a] bg-[#ffffff] dark:bg-[#16161a] text-zinc-900 dark:text-zinc-100 text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none"
              required
            />
          </div>

          {authError && (
            <div className="flex gap-2 p-2.5 rounded bg-red-50 dark:bg-red-950/20 border border-red-150 dark:border-red-900/30 text-[11px] text-red-700 dark:text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-[#16161a] border border-transparent dark:border-[#222228] rounded-lg p-2.5">
            <span>Demo credentials:</span>
            <span className="font-mono bg-zinc-200 dark:bg-[#22222a] text-zinc-700 dark:text-zinc-300 px-1 py-0.5 rounded font-bold">admin / openskills2026</span>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 h-9 p-2 border border-zinc-200 dark:border-[#222228] hover:bg-zinc-50 dark:hover:bg-[#1c1c22] bg-[#ffffff] dark:bg-[#16161a] text-zinc-700 dark:text-zinc-300 rounded-md text-xs font-semibold cursor-pointer transition-colors"
            >
              Exit Console
            </button>
            <button
              type="submit"
              className="w-1/2 h-9 p-2 bg-blue-600 text-white rounded-md text-xs font-semibold hover:bg-blue-700 cursor-pointer transition-colors shadow-md shadow-blue-600/10"
            >
              Unlock Terminal
            </button>
          </div>
        </form>
      </div>
    );
  }

  const getFolderDepth = (folderId: string): number => {
    let depth = 0;
    let current = folders.find(f => f.id === folderId);
    while (current && current.parentId) {
      depth++;
      current = folders.find(f => f.id === current.parentId);
      if (depth > 5) break; // prevent infinite loop
    }
    return depth;
  };

  const isDescendant = (parentFolderId: string, childFolderId: string): boolean => {
    let current = folders.find(f => f.id === childFolderId);
    while (current && current.parentId) {
      if (current.parentId === parentFolderId) return true;
      current = folders.find(f => f.id === current.parentId);
    }
    return false;
  };

  const getSortedFolders = (): typeof folders => {
    const result: typeof folders = [];
    const visit = (parentId: string | undefined) => {
      const children = folders.filter(f => f.parentId === parentId);
      children.forEach(child => {
        result.push(child);
        visit(child.id);
      });
    };
    visit(undefined);
    return result;
  };

  const formatTimeOrDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    try {
      const date = new Date(dateStr);
      const now = new Date();
      if (date.toDateString() === now.toDateString()) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      return date.toLocaleDateString([], { day: 'numeric', month: 'short' });
    } catch (e) {
      return dateStr;
    }
  };

  const formatDateOnly = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  };



  return (
    <div className="w-full bg-[#fafafa] dark:bg-[#09090b] h-screen overflow-hidden flex select-none font-sans relative text-zinc-900 dark:text-zinc-100">

      {/* Toast Notice rendering */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-[100] max-w-sm bg-zinc-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center space-x-3 text-xs font-sans">
          <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SIDEBAR NAVIGATION PANEL */}
      <aside className="w-64 border-r border-zinc-200 dark:border-[#1a1a20] bg-[#ffffff] dark:bg-[#0c0c0e] flex flex-col shrink-0">

        {/* Branding header in workspace */}
        <div className="h-14 px-4 border-b border-zinc-150 dark:border-[#1a1a20] flex items-center bg-[#fcfcfd] dark:bg-[#0c0c0e]">
          <div className="flex items-center space-x-1.5 min-w-0">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-blue-600 text-[10px] text-white font-bold font-mono">
              OS
            </span>
            <span className="text-xs font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 font-sans truncate">
              openSkills CMS
            </span>
          </div>
        </div>

        {/* Profile metadata bar */}
        <div className="h-10 px-3 border-b border-zinc-100 dark:border-[#1a1a20] flex items-center justify-between text-[11px]">
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center font-bold text-[9px] text-yellow-500 uppercase">
              A
            </div>
            <span className="font-semibold text-zinc-700 dark:text-zinc-300 truncate max-w-[120px]">admin@openskills.in</span>
          </div>
          <button
            onClick={handleAdminLogout}
            className="text-[10px] text-red-500 hover:text-red-400 hover:underline font-semibold cursor-pointer"
          >
            Sign out
          </button>
        </div>

        {/* Categories / Organization Filters */}
        <div className="p-3">
          <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-550 mb-2 px-1">
            Library Catalog Filters
          </div>
          <nav className="space-y-0.5 text-xs text-zinc-700 dark:text-zinc-300">
            <button
              onClick={() => setSidebarFilter('all')}
              className={`w-full flex items-center justify-between p-2 rounded-md cursor-pointer ${sidebarFilter === 'all' ? 'bg-zinc-100 dark:bg-[#1a1a20] font-bold text-zinc-950 dark:text-white' : 'hover:bg-zinc-50 dark:hover:bg-[#141418]'
                }`}
            >
              <span className="flex items-center"><LayoutGrid className="mr-2 h-3.5 w-3.5 text-zinc-400" /> All Curated Files</span>
              <span className="font-mono text-[10px] text-zinc-450 dark:text-zinc-400 bg-zinc-100 dark:bg-[#202028] px-1.5 rounded">{contents.length}</span>
            </button>

            <button
              onClick={() => setSidebarFilter('drafts')}
              className={`w-full flex items-center justify-between p-2 rounded-md cursor-pointer ${sidebarFilter === 'drafts' ? 'bg-zinc-100 dark:bg-[#1a1a20] font-bold text-zinc-950 dark:text-white' : 'hover:bg-zinc-50 dark:hover:bg-[#141418]'
                }`}
            >
              <span className="flex items-center"><Edit3 className="mr-2 h-3.5 w-3.5 text-orange-500" /> Drafts Queue</span>
              <span className="font-mono text-[10px] text-zinc-450 dark:text-zinc-400 bg-zinc-100 dark:bg-[#202028] px-1.5 rounded">{contents.filter(c => c.status === 'Draft').length}</span>
            </button>

            <button
              onClick={() => setSidebarFilter('published')}
              className={`w-full flex items-center justify-between p-2 rounded-md cursor-pointer ${sidebarFilter === 'published' ? 'bg-zinc-100 dark:bg-[#1a1a20] font-bold text-zinc-950 dark:text-white' : 'hover:bg-zinc-50 dark:hover:bg-[#141418]'
                }`}
            >
              <span className="flex items-center"><Globe className="mr-2 h-3.5 w-3.5 text-emerald-500" /> Live Published</span>
              <span className="font-mono text-[10px] text-zinc-455 dark:text-zinc-400 bg-zinc-100 dark:bg-[#202028] px-1.5 rounded">{contents.filter(c => c.status === 'Published').length}</span>
            </button>

            <button
              onClick={() => setSidebarFilter('archived')}
              className={`w-full flex items-center justify-between p-2 rounded-md cursor-pointer ${sidebarFilter === 'archived' ? 'bg-zinc-100 dark:bg-[#1a1a20] font-bold text-zinc-950 dark:text-white' : 'hover:bg-zinc-50 dark:hover:bg-[#141418]'
                }`}
            >
              <span className="flex items-center"><Lock className="mr-2 h-3.5 w-3.5 text-zinc-400" /> Archived Vault</span>
              <span className="font-mono text-[10px] text-zinc-450 dark:text-zinc-400 bg-zinc-100 dark:bg-[#202028] px-1.5 rounded">{contents.filter(c => c.status === 'Archived').length}</span>
            </button>
          </nav>
        </div>

        {/* Content Type Filter sets */}
        <div className="p-3 border-t border-zinc-100 dark:border-[#1a1a20]">
          <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-550 mb-1.5 px-1">
            Filter by Type
          </div>
          <div className="space-y-0.5 text-xs text-zinc-600 dark:text-zinc-400">
            {['Skill', 'GitHub Repository', 'Prompt', 'Tutorial', 'Collection', 'Resource', 'Category'].map((type) => (
              <button
                key={type}
                onClick={() => setSidebarFilter(type)}
                className={`w-full flex items-center p-1.5 rounded-md text-left cursor-pointer ${sidebarFilter === type ? 'bg-zinc-100 dark:bg-[#1a1a20] font-bold text-zinc-900 dark:text-white' : 'hover:bg-zinc-50 dark:hover:bg-[#141418]'
                  }`}
              >
                <ChevronRight className="h-3 w-3 text-zinc-300 mr-1" />
                <span>{type}s</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active documents listing space */}
        <div className="flex-1 flex flex-col min-h-0 border-t border-zinc-100 dark:border-[#1a1a20] bg-zinc-50/20 dark:bg-transparent">
          <div className="p-3 border-b border-zinc-100 dark:border-[#1a1a20] flex items-center justify-between gap-2 shrink-0 bg-[#ffffff] dark:bg-[#0c0c0e]">
            <div className="relative flex-1">
              <input
                type="text"
                value={cmsSearch}
                onChange={(e) => setCmsSearch(e.target.value)}
                placeholder="Lookup records..."
                className="w-full text-[11px] h-8 pl-6 bg-[#ffffff] dark:bg-[#16161a] border border-zinc-250 dark:border-[#22222a] text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-600 rounded-md animate-all"
              />
              <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-zinc-400" />
            </div>

            <button
              onClick={handleCreateNewFolder}
              className="h-8 px-2 border border-zinc-200 dark:border-[#222228] hover:border-zinc-300 dark:hover:border-[#2e2e36] bg-[#fafafa] dark:bg-[#16161a] hover:bg-zinc-100 dark:hover:bg-[#202028] rounded-md flex items-center gap-1 text-[10px] font-bold text-zinc-650 dark:text-zinc-300 cursor-pointer transition-colors"
              title="Create New Folder"
            >
              <FolderPlus className="h-3.5 w-3.5 text-zinc-550 dark:text-zinc-400" />
              <span>+ Folder</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2 select-none">

            {/* 1. Folders Render */}
            <div className="space-y-1">
              {folders.filter(f => !f.parentId).map(folder =>
                renderSidebarFolder(folder, 0)
              )}
            </div>

            {/* 2. Root/Unassigned Files Render */}
            <div className="space-y-0.5 pt-1.5 border-t border-zinc-200 dark:border-[#1a1a20]">
              <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-550 px-1.5 py-0.5">
                Root Directory
              </div>
              {filteredContents.filter(c => !c.folderId || !folders.some(f => f.id === c.folderId)).map(asset =>
                renderFileExplorerItem(asset)
              )}
              {filteredContents.length === 0 && (
                <div className="py-8 text-center text-zinc-400 text-xs">
                  No files matching filters.
                </div>
              )}
            </div>

          </div>
        </div>



      </aside>

      {/* CORE WORKSPACE PANEL */}
      <main className="flex-1 flex flex-col bg-[#ffffff] dark:bg-[#0c0c0e] overflow-hidden">
        {contents.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#fafafa]/50 dark:bg-[#0c0c0e]/50 text-center">
            <div className="max-w-md p-8 bg-[#ffffff] dark:bg-[#121214] border border-zinc-200 dark:border-[#222228] rounded-2xl shadow-sm flex flex-col items-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-[#fafafa] dark:bg-[#16161a] border border-zinc-150 dark:border-[#222228] flex items-center justify-center text-zinc-400 dark:text-zinc-500">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold text-zinc-950 dark:text-zinc-100">Your CMS catalog is empty</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                There are no content items in your CMS database. Create a new draft asset to start writing documentation, prompts, or integrations.
              </p>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsEmptyCreateDropdownOpen(!isEmptyCreateDropdownOpen)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shadow-md shadow-blue-600/10"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Create New Draft</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isEmptyCreateDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isEmptyCreateDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40 bg-transparent"
                      onClick={() => setIsEmptyCreateDropdownOpen(false)}
                    />
                    <div className="absolute top-11 left-1/2 -translate-x-1/2 w-48 bg-[#ffffff] dark:bg-[#121214] border border-zinc-200 dark:border-[#222228] rounded-md shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <button
                        type="button"
                        onClick={() => {
                          handleCreateNewContentAsset('GitHub Repository');
                          setIsEmptyCreateDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-[#1c1c22] flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <GitFork className="h-3.5 w-3.5 text-zinc-400" />
                        <span>Create Skill</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleCreateNewContentAsset('Category');
                          setIsEmptyCreateDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-[#1c1c22] flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <Tag className="h-3.5 w-3.5 text-zinc-400" />
                        <span>Create Category</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleCreateNewContentAsset('Collection');
                          setIsEmptyCreateDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-[#1c1c22] flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <Layers className="h-3.5 w-3.5 text-zinc-400" />
                        <span>Create Collection</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleCreateNewContentAsset('Resource');
                          setIsEmptyCreateDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-[#1c1c22] flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
                        <span>Create Resource</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleCreateNewContentAsset('Prompt');
                          setIsEmptyCreateDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-[#1c1c22] flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-zinc-400" />
                        <span>Create Prompt</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* TOP TOOLBAR */}
            <header className="h-14 border-b border-zinc-200 dark:border-[#1a1a20] px-4 flex items-center justify-between bg-[#ffffff] dark:bg-[#121214] shrink-0">

              {/* Left panel: Type selection dropdown */}
              <div className="flex items-center space-x-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-550 hidden lg:inline">
                  Type:
                </label>
                <div className="relative inline-flex items-center">
                  <select
                    value={formType}
                    onChange={(e) => handleFieldChange(() => setFormType(e.target.value as any))}
                    className="bg-[#fafafa] dark:bg-[#16161a] border border-zinc-200 dark:border-[#22222a] hover:border-zinc-300 dark:hover:border-[#2e2e36] text-zinc-800 dark:text-zinc-200 rounded-md pl-2 pr-7 py-1 text-xs font-semibold focus:outline-none cursor-pointer appearance-none min-w-[140px]"
                  >
                    <option value="Skill">Claude Skill</option>
                    <option value="GitHub Repository">GitHub Repository</option>
                    <option value="Prompt">AI Prompt template</option>
                    <option value="Category">Category Directory</option>
                    <option value="Tutorial">Development Tutorial</option>
                    <option value="Collection">Curated Collection</option>
                    <option value="Resource">External Resource</option>
                    <option value="Documentation">Technical Docs</option>
                    <option value="Workflow">Automations Workflow</option>
                    <option value="AI Agent">Autonomous Node</option>
                    <option value="Template">Starter template</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500 pointer-events-none" />
                </div>

                <span className="text-zinc-250 font-light">•</span>

                {/* Quick status button indicators */}
                <div className="relative inline-flex items-center">
                  <select
                    value={formStatus}
                    onChange={(e) => handleFieldChange(() => setFormStatus(e.target.value as any))}
                    className="bg-transparent text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase pr-6 pl-1 focus:outline-none cursor-pointer appearance-none"
                  >
                    <option value="Draft">Draft Mode</option>
                    <option value="Review">In Review</option>
                    <option value="Published">Published Live</option>
                    <option value="Archived">Archived Vault</option>
                  </select>
                  <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-405 text-zinc-400 pointer-events-none" />
                </div>
              </div>

              {/* Center Dynamic Content Title input box */}
              <div className="flex-1 max-w-md mx-4">
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => handleFieldChange(() => {
                    const newTitle = e.target.value;
                    setFormTitle(newTitle);
                    setFormSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                    setFormMetaTitle(`${newTitle} - Curated openSkills`);

                    const updatedMarkdown = updateMarkdownHeading(formMarkdown, newTitle);
                    setFormMarkdown(updatedMarkdown);
                  })}
                  placeholder="Give this content asset a title..."
                  className="w-full text-center h-8 bg-[#fafafa] dark:bg-[#16161a] focus:bg-[#ffffff] dark:focus:bg-[#1e1e24] border border-zinc-250 dark:border-[#222228] focus:border-zinc-300 dark:focus:border-[#2a2a32] focus:outline-none text-xs font-bold text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 font-mono rounded transition-all"
                />
              </div>

              {/* Right Action panel */}
              <div className="flex items-center space-x-2 font-sans">

                {/* View Mode Switches */}
                <div className="flex items-center bg-[#f0f0f2] dark:bg-[#16161a] p-1 border border-zinc-150 dark:border-[#222228] rounded-lg text-zinc-400">
                  <button
                    onClick={() => setViewMode('editor')}
                    className={`p-1 rounded cursor-pointer ${viewMode === 'editor' ? 'bg-[#ffffff] dark:bg-[#222228] text-zinc-800 dark:text-zinc-200 shadow-sm' : 'text-zinc-400 dark:text-zinc-550 hover:text-zinc-650 dark:hover:text-zinc-300'}`}
                    title="Editor Only View"
                  >
                    <Edit3 className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => setViewMode('split')}
                    className={`p-1 rounded cursor-pointer ${viewMode === 'split' ? 'bg-[#ffffff] dark:bg-[#222228] text-zinc-800 dark:text-zinc-200 shadow-sm' : 'text-zinc-400 dark:text-zinc-550 hover:text-zinc-650 dark:hover:text-zinc-300'}`}
                    title="Split Side-by-Side Live View"
                  >
                    <Columns className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => setViewMode('preview')}
                    className={`p-1 rounded cursor-pointer ${viewMode === 'preview' ? 'bg-[#ffffff] dark:bg-[#222228] text-zinc-800 dark:text-zinc-200 shadow-sm' : 'text-zinc-400 dark:text-zinc-550 hover:text-zinc-650 dark:hover:text-zinc-300'}`}
                    title="Preview Only Mode"
                  >
                    <Eye className="h-3 w-3" />
                  </button>
                </div>

                <span className="text-zinc-250 font-light">•</span>

                {/* Save trigger */}
                <button
                  onClick={handleCmsSaveRaw}
                  className="flex items-center space-x-1.5 h-8 px-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer transition-all shrink-0 shadow-md shadow-blue-600/10"
                >
                  <Save className="h-3 w-3 text-white" />
                  <span className="hidden sm:inline">Sync & Publish</span>
                </button>

                {/* Quick action menu */}
                <div className="relative">
                  <button
                    onClick={() => {
                      const el = document.getElementById('cms-toolbar-actions-dropdown');
                      if (el) el.classList.toggle('hidden');
                    }}
                    className="p-1 px-2 border border-zinc-200 dark:border-[#222228] rounded-md bg-[#ffffff] dark:bg-[#16161a] hover:bg-zinc-50 dark:hover:bg-[#202028] text-zinc-650 dark:text-zinc-300 h-8 text-xs font-semibold select-none flex items-center justify-center shrink-0 cursor-pointer transition-colors"
                  >
                    Actions
                  </button>
                  <div
                    id="cms-toolbar-actions-dropdown"
                    className="absolute right-0 mt-1.5 w-40 rounded-md bg-[#ffffff] dark:bg-[#16161a] border border-zinc-200 dark:border-[#222228] shadow-lg p-1 z-40 text-left hidden font-medium text-xs text-zinc-650 dark:text-zinc-300"
                  >
                    <button
                      onClick={() => {
                        handleDuplicateCurrent();
                        document.getElementById('cms-toolbar-actions-dropdown')?.classList.add('hidden');
                      }}
                      className="w-full flex items-center px-2 py-1.5 hover:bg-zinc-50 dark:hover:bg-[#202028] text-zinc-700 dark:text-zinc-300 rounded-md hover:text-zinc-950 dark:hover:text-white text-left cursor-pointer"
                    >
                      <Copy className="h-3.5 w-3.5 mr-2 text-zinc-400" />
                      <span>Duplicate Asset</span>
                    </button>
                    <button
                      onClick={() => {
                        setRevisionSidebarOpen(true);
                        document.getElementById('cms-toolbar-actions-dropdown')?.classList.add('hidden');
                      }}
                      className="w-full flex items-center px-2 py-1.5 hover:bg-zinc-50 dark:hover:bg-[#202028] text-zinc-700 dark:text-zinc-300 rounded-md hover:text-zinc-950 dark:hover:text-white text-left cursor-pointer"
                    >
                      <History className="h-3.5 w-3.5 mr-2 text-indigo-500" />
                      <span>Revisions History</span>
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteCurrent();
                        document.getElementById('cms-toolbar-actions-dropdown')?.classList.add('hidden');
                      }}
                      className="w-full flex items-center px-2 py-1.5 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-650 hover:text-red-750 rounded-md text-left cursor-pointer border-t border-zinc-100 dark:border-zinc-800"
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-2 text-red-400" />
                      <span>Move to Trash</span>
                    </button>
                  </div>
                </div>
              </div>
            </header>

            {/* WORKSPACE SUB-METADATA TOOLBAR */}
            <div className="h-10 bg-[#fafafa] dark:bg-[#0c0c0e] border-b border-zinc-150 dark:border-[#1a1a20] px-4 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 shrink-0 select-none">

              {/* File category and visibility details */}
              <div className="flex items-center space-x-3.5">
                <span className="flex items-center">
                  <Tag className="h-3 w-3 text-zinc-400 mr-1 shrink-0" />
                  Category:
                  <div className="relative inline-flex items-center ml-1">
                    <select
                      value={formCategory}
                      onChange={(e) => handleFieldChange(() => setFormCategory(e.target.value))}
                      className="bg-transparent border-0 font-bold text-zinc-700 dark:text-zinc-200 py-0 pl-1 pr-6 focus:outline-none focus:ring-0 cursor-pointer appearance-none text-[11px]"
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 h-3 w-3 text-zinc-450 pointer-events-none" />
                  </div>
                </span>

                <span>•</span>

                <span className="flex items-center">
                  <Lock className="h-3 w-3 text-zinc-400 mr-1 shrink-0" />
                  Visibility:
                  <div className="relative inline-flex items-center ml-1">
                    <select
                      value={formVisibility}
                      onChange={(e) => handleFieldChange(() => setFormVisibility(e.target.value as any))}
                      className="bg-transparent border-0 font-bold text-zinc-700 dark:text-zinc-200 py-0 pl-1 pr-6 focus:outline-none focus:ring-0 cursor-pointer text-[10px] appearance-none"
                    >
                      <option value="Public">Public Access</option>
                      <option value="Private">Private Admin Only</option>
                      <option value="Internal">Internal Development Only</option>
                    </select>
                    <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 h-3 w-3 text-zinc-500 pointer-events-none" />
                  </div>
                </span>

                <span>•</span>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsToolbarCreateDropdownOpen(!isToolbarCreateDropdownOpen)}
                    className="flex items-center justify-center space-x-1.5 h-7 px-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-[10px] font-semibold cursor-pointer transition-colors shadow-sm"
                    title="Create a new draft asset"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Create New</span>
                    <ChevronDown className={`h-2.5 w-2.5 transition-transform ${isToolbarCreateDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isToolbarCreateDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40 bg-transparent"
                        onClick={() => setIsToolbarCreateDropdownOpen(false)}
                      />
                      <div className="absolute top-8 left-0 w-44 bg-[#ffffff] dark:bg-[#16161a] border border-zinc-200 dark:border-[#222228] rounded-md shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <button
                          type="button"
                          onClick={() => {
                            handleCreateNewContentAsset('GitHub Repository');
                            setIsToolbarCreateDropdownOpen(false);
                          }}
                          className="w-full text-left px-2.5 py-1.5 text-[11px] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-[#202028] flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <GitFork className="h-3 w-3 text-zinc-400" />
                          <span>Create Skill</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            handleCreateNewContentAsset('Category');
                            setIsToolbarCreateDropdownOpen(false);
                          }}
                          className="w-full text-left px-2.5 py-1.5 text-[11px] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-[#202028] flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <Tag className="h-3 w-3 text-zinc-400" />
                          <span>Create Category</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            handleCreateNewContentAsset('Collection');
                            setIsToolbarCreateDropdownOpen(false);
                          }}
                          className="w-full text-left px-2.5 py-1.5 text-[11px] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-[#202028] flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <Layers className="h-3 w-3 text-zinc-400" />
                          <span>Create Collection</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            handleCreateNewContentAsset('Resource');
                            setIsToolbarCreateDropdownOpen(false);
                          }}
                          className="w-full text-left px-2.5 py-1.5 text-[11px] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-[#202028] flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <ExternalLink className="h-3 w-3 text-zinc-400" />
                          <span>Create Resource</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            handleCreateNewContentAsset('Prompt');
                            setIsToolbarCreateDropdownOpen(false);
                          }}
                          className="w-full text-left px-2.5 py-1.5 text-[11px] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-[#202028] flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <Sparkles className="h-3 w-3 text-zinc-400" />
                          <span>Create Prompt</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (currentItem) {
                        const newName = window.prompt("Rename file:", formTitle);
                        if (newName && newName.trim()) {
                          const trimmedName = newName.trim();
                          setFormTitle(trimmedName);
                          setFormSlug(trimmedName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                          setFormMetaTitle(`${trimmedName} - Curated openSkills`);
                          const updatedMarkdown = updateMarkdownHeading(formMarkdown, trimmedName);
                          setFormMarkdown(updatedMarkdown);
                          setContents(prev => prev.map(c => {
                            if (c.id === currentItem.id) {
                              const updatedMd = updateMarkdownHeading(c.markdownContent || '', trimmedName);
                              return {
                                ...c,
                                title: trimmedName,
                                markdownContent: updatedMd
                              };
                            }
                            return c;
                          }));
                          showToast(`✏️ Renamed file to "${trimmedName}"`);
                        }
                      }
                    }}
                    className="flex items-center space-x-1 hover:bg-zinc-200 dark:hover:bg-[#202028] px-1.5 py-0.5 rounded cursor-pointer transition-colors text-zinc-650 dark:text-zinc-400 text-zinc-600 hover:text-zinc-900 dark:hover:text-white"
                    title="Rename active file"
                  >
                    <Edit3 className="h-3 w-3" />
                    <span>Rename</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (currentItem) {
                        setMoveItemModal({
                          isOpen: true,
                          itemType: 'file',
                          itemId: currentItem.id,
                          itemName: currentItem.title
                        });
                      }
                    }}
                    className="flex items-center space-x-1 hover:bg-zinc-200 dark:hover:bg-[#202028] px-1.5 py-0.5 rounded cursor-pointer transition-colors text-zinc-650 dark:text-zinc-400 text-zinc-600 hover:text-zinc-900 dark:hover:text-white"
                    title="Move active file to folder"
                  >
                    <ArrowUpDown className="h-3 w-3" />
                    <span>Move</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (currentItem) {
                        const confirmDelete = window.confirm(`Are you sure you want to delete "${currentItem.title}"?`);
                        if (confirmDelete) {
                          handleDeleteCurrent();
                        }
                      }
                    }}
                    className="flex items-center space-x-1 hover:bg-red-50 dark:hover:bg-red-950/20 px-1.5 py-0.5 rounded cursor-pointer transition-colors text-red-500 hover:text-red-650"
                    title="Delete active file"
                  >
                    <Trash className="h-3 w-3" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              {/* Autosave simulated log text */}
              <div className="flex items-center space-x-2 font-mono text-xs">
                {autosaveStatus === 'unsaved' && <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />}
                {autosaveStatus === 'saving' && <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping" />}
                {autosaveStatus === 'saved' && <span className="flex h-2 w-2 rounded-full bg-emerald-500" />}

                <span className="font-semibold text-zinc-400 dark:text-zinc-500">
                  {autosaveStatus === 'unsaved' && 'Unsaved modifications'}
                  {autosaveStatus === 'saving' && 'Syncing client draft...'}
                  {autosaveStatus === 'saved' && `Cloud Synced at ${lastSavedTime}`}
                </span>
              </div>
            </div>

            {/* DOUBLE PANEL / NOTION SPLIT VIEW */}
            <div id="cms-main-panels-container" className="flex-1 flex min-h-0 relative">

              {/* EDITOR AREA (LEFT/SPLIT PANEL) */}
              {(viewMode === 'editor' || viewMode === 'split') && (
                <div className="flex-1 flex flex-col border-r border-zinc-200 dark:border-[#1a1a20] bg-[#ffffff] dark:bg-[#121214] min-w-0 h-full relative">

                  <div className="p-4.5 border-b border-zinc-100 dark:border-[#1a1a20] bg-[#fafafa] dark:bg-[#0c0c0e] space-y-3 shrink-0 max-h-[320px] overflow-y-auto">
                    <input
                      type="text"
                      value={formDescription}
                      onChange={(e) => handleFieldChange(() => setFormDescription(e.target.value))}
                      placeholder="Insert bullet points summarizing this tool integration capability..."
                      className="w-full text-xs font-medium text-zinc-600 dark:text-zinc-300 bg-transparent border-b border-transparent hover:border-zinc-150 dark:hover:border-zinc-800 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-none pb-1 font-sans"
                    />

                    {/* Sub-block based on active Content Type */}
                    <div className="border border-zinc-200/80 dark:border-[#222228] rounded-lg p-3 bg-[#ffffff] dark:bg-[#16161a] space-y-2 text-xs">
                      <div className="flex items-center justify-between font-bold text-zinc-400 dark:text-zinc-500 text-[10px] uppercase mb-1">
                        <span>{formType} Rich attributes & components</span>
                        <span className="text-[9px] bg-indigo-50/10 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-200/20 px-1 py-0.5 rounded font-bold font-mono">Custom Input Node</span>
                      </div>

                      {/* GitHub Repo Details form */}
                      {(formType === 'Skill' || formType === 'GitHub Repository') && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">Repository URL</label>
                            <div className="flex gap-1.5">
                              <input
                                type="text"
                                value={formGithubUrl}
                                onChange={(e) => handleFieldChange(() => setFormGithubUrl(e.target.value))}
                                placeholder="https://github.com/anthropics/skills/blob/main/skills/algorithmic-art/SKILL.md"
                                className="bg-[#fafafa] dark:bg-[#1c1c22] px-2 py-1 border border-zinc-200 dark:border-[#2a2a32] rounded text-xs w-full text-zinc-800 dark:text-zinc-200 focus:bg-[#ffffff] dark:focus:bg-[#16161a] focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={simulateGithubMetadataFetch}
                                className="px-2 py-1 bg-zinc-200 dark:bg-[#2c2c35] hover:bg-zinc-300 dark:hover:bg-[#383842] rounded text-[10px] font-bold cursor-pointer text-zinc-700 dark:text-zinc-200 inline-flex items-center gap-1 border border-transparent dark:border-[#3c3c45]"
                                title="Auto Fetch stars/forks from api"
                              >
                                <RefreshCw className="h-3 w-3 shrink-0" />
                                <span>Fetch</span>
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-1">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">Stars</label>
                              <input
                                type="number"
                                value={formGithubStars}
                                onChange={(e) => handleFieldChange(() => setFormGithubStars(Number(e.target.value)))}
                                className="bg-[#fafafa] dark:bg-[#1c1c22] px-1 py-1 border border-zinc-200 dark:border-[#2a2a32] rounded text-xs w-full text-center text-zinc-850 dark:text-zinc-200 focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">Forks</label>
                              <input
                                type="number"
                                value={formGithubForks}
                                onChange={(e) => handleFieldChange(() => setFormGithubForks(Number(e.target.value)))}
                                className="bg-[#fafafa] dark:bg-[#1c1c22] px-1 py-1 border border-zinc-200 dark:border-[#2a2a32] rounded text-xs w-full text-center text-zinc-850 dark:text-zinc-200 focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">License</label>
                              <input
                                type="text"
                                value={formGithubLicense}
                                onChange={(e) => handleFieldChange(() => setFormGithubLicense(e.target.value))}
                                className="bg-[#fafafa] dark:bg-[#1c1c22] px-1.5 py-1 border border-zinc-200 dark:border-[#2a2a32] rounded text-xs w-full text-center text-zinc-850 dark:text-zinc-200 focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* AI Prompt parameters */}
                      {formType === 'Prompt' && (
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={formPromptTitle}
                              onChange={(e) => handleFieldChange(() => setFormPromptTitle(e.target.value))}
                              placeholder="Prompt template name..."
                              className="w-1/2 bg-[#fafafa] dark:bg-[#1c1c22] p-1 px-1.5 border border-zinc-200 dark:border-[#2a2a32] text-zinc-800 dark:text-zinc-200 rounded text-xs focus:outline-none"
                            />
                            <div className="relative w-1/2 inline-flex items-center">
                              <select
                                value={formPromptCategory}
                                onChange={(e) => handleFieldChange(() => setFormPromptCategory(e.target.value))}
                                className="w-full bg-[#fafafa] dark:bg-[#1c1c22] border border-zinc-200 dark:border-[#2a2a32] text-zinc-800 dark:text-zinc-200 p-1 pl-2 pr-7 rounded text-xs focus:outline-none cursor-pointer appearance-none"
                              >
                                <option value="Coding">Coding</option>
                                <option value="Writing">Writing</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Research">Research</option>
                                <option value="Automation">Automation</option>
                              </select>
                              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500 pointer-events-none" />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 flex items-center justify-between">
                              <span>Prompt Variable Injectors</span>
                              <span className="text-[9px] text-zinc-400 dark:text-zinc-550 lowercase">use double curly braces {"{{variable}}"}</span>
                            </label>
                            <div className="flex flex-wrap items-center gap-1.5 bg-[#fafafa] dark:bg-[#1c1c22] border border-zinc-200 dark:border-[#2a2a32] p-1.5 rounded-lg">
                              {formPromptVariables.map((v) => (
                                <span
                                  key={v}
                                  className="font-mono text-[9px] font-semibold text-blue-800 dark:text-blue-300 bg-blue-50/10 dark:bg-blue-500/10 border border-blue-200/30 dark:border-blue-800/30 px-1.5 py-0.5 rounded-md flex items-center gap-1"
                                >
                                  <span>{`{{${v}}}`}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleRemovePromptVariable(v)}
                                    className="text-red-500 hover:text-red-700 cursor-pointer"
                                  >
                                    &times;
                                  </button>
                                </span>
                              ))}
                              <div className="flex items-center gap-1 ml-auto">
                                <input
                                  type="text"
                                  value={newVariableInput}
                                  onChange={(e) => setNewVariableInput(e.target.value)}
                                  placeholder="e.g. query"
                                  className="w-16 h-5 p-0.5 px-1 font-mono text-[9px] bg-white dark:bg-[#121214] border border-zinc-300 dark:border-[#2c2c35] text-zinc-800 dark:text-zinc-200 rounded focus:outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={handleAddPromptVariable}
                                  className="p-1 px-1.5 bg-zinc-200 dark:bg-[#2c2c35] hover:bg-zinc-300 dark:hover:bg-[#383842] hover:text-zinc-950 dark:hover:text-white font-bold text-[9px] border border-zinc-300 dark:border-[#3c3c45] rounded cursor-pointer"
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Category Directory Attributes */}
                      {formType === 'Category' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">Category ID / Slug</label>
                            <input
                              type="text"
                              value={formSlug}
                              onChange={(e) => handleFieldChange(() => setFormSlug(e.target.value.toLowerCase().replace(/\s+/g, '-')))}
                              placeholder="e.g. development"
                              className="bg-[#fafafa] dark:bg-[#1c1c22] px-2 py-1 border border-zinc-200 dark:border-[#2a2a32] rounded text-xs w-full text-zinc-800 dark:text-zinc-200 focus:bg-[#ffffff] dark:focus:bg-[#16161a] focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">Lucide Icon Name</label>
                            <div className="relative inline-flex items-center w-full">
                              <select
                                value={formTags[0] || 'Code2'}
                                onChange={(e) => handleFieldChange(() => setFormTags([e.target.value]))}
                                className="bg-[#fafafa] dark:bg-[#1c1c22] border border-zinc-200 dark:border-[#2a2a32] text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-[#383842] rounded-md pl-2 pr-7 py-1 text-xs font-semibold focus:outline-none cursor-pointer appearance-none w-full"
                              >
                                <option value="Code2">Code2 (Development)</option>
                                <option value="PenTool">PenTool (Writing)</option>
                                <option value="BookOpen">BookOpen (Research)</option>
                                <option value="Megaphone">Megaphone (Marketing)</option>
                                <option value="Palette">Palette (Design)</option>
                                <option value="Clock">Clock (Productivity)</option>
                                <option value="Cpu">Cpu (Automation)</option>
                                <option value="GraduationCap">GraduationCap (Education)</option>
                                <option value="Briefcase">Briefcase (Business)</option>
                                <option value="Bot">Bot (Agents)</option>
                              </select>
                              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500 pointer-events-none" />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Collection Attributes */}
                      {formType === 'Collection' && (
                        <div className="space-y-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">Collection ID / Slug</label>
                              <input
                                type="text"
                                value={formSlug}
                                onChange={(e) => handleFieldChange(() => setFormSlug(e.target.value.toLowerCase().replace(/\s+/g, '-')))}
                                placeholder="e.g. best-coding-skills"
                                className="bg-[#fafafa] dark:bg-[#1c1c22] px-2 py-1 border border-zinc-200 dark:border-[#2a2a32] rounded text-xs w-full text-zinc-800 dark:text-zinc-200 focus:bg-[#ffffff] dark:focus:bg-[#16161a] focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">Color Theme Badge</label>
                              <div className="relative inline-flex items-center w-full">
                                <select
                                  value={formGithubLicense || 'blue'}
                                  onChange={(e) => handleFieldChange(() => setFormGithubLicense(e.target.value))}
                                  className="bg-[#fafafa] dark:bg-[#1c1c22] border border-zinc-200 dark:border-[#2a2a32] text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-[#383842] rounded-md pl-2 pr-7 py-1 text-xs font-semibold focus:outline-none cursor-pointer appearance-none w-full"
                                >
                                  <option value="blue">Blue</option>
                                  <option value="purple">Purple</option>
                                  <option value="zinc">Zinc</option>
                                  <option value="green">Green</option>
                                  <option value="indigo">Indigo</option>
                                  <option value="amber">Amber</option>
                                  <option value="rose">Rose</option>
                                  <option value="teal">Teal</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500 pointer-events-none" />
                              </div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">Select Included Skills</label>
                            <div className="max-h-24 overflow-y-auto border border-zinc-200 dark:border-[#222228] rounded-lg p-2 space-y-1 bg-[#fafafa] dark:bg-[#16161a] text-zinc-850 dark:text-zinc-200">
                              {skills.map(s => {
                                const isChecked = formTags.includes(s.id);
                                return (
                                  <label key={s.id} className="flex items-center space-x-2 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => {
                                        handleFieldChange(() => {
                                          if (isChecked) {
                                            setFormTags(prev => prev.filter(t => t !== s.id));
                                          } else {
                                            setFormTags(prev => [...prev, s.id]);
                                          }
                                        });
                                      }}
                                      className="rounded border-zinc-300 dark:border-zinc-700 bg-transparent text-blue-600 focus:ring-blue-500"
                                    />
                                    <span>{s.name}</span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Resource Attributes */}
                      {formType === 'Resource' && (
                        <div className="space-y-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">Resource ID / Slug</label>
                              <input
                                type="text"
                                value={formSlug}
                                onChange={(e) => handleFieldChange(() => setFormSlug(e.target.value.toLowerCase().replace(/\s+/g, '-')))}
                                placeholder="e.g. resource-mcp-guide"
                                className="bg-[#fafafa] dark:bg-[#1c1c22] px-2 py-1 border border-zinc-200 dark:border-[#2a2a32] rounded text-xs w-full text-zinc-800 dark:text-zinc-200 focus:bg-[#ffffff] dark:focus:bg-[#16161a] focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">Resource Type</label>
                              <div className="relative inline-flex items-center w-full">
                                <select
                                  value={formTags[0] || 'Documentation'}
                                  onChange={(e) => handleFieldChange(() => setFormTags([e.target.value]))}
                                  className="bg-[#fafafa] dark:bg-[#1c1c22] border border-zinc-200 dark:border-[#2a2a32] text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-[#383842] rounded-md pl-2 pr-7 py-1 text-xs font-semibold focus:outline-none cursor-pointer appearance-none w-full"
                                >
                                  <option value="Documentation">Documentation</option>
                                  <option value="Guide">Guide</option>
                                  <option value="Article">Article</option>
                                  <option value="Video">Video</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500 pointer-events-none" />
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <div className="space-y-1 sm:col-span-2">
                              <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">External URL Link</label>
                              <input
                                type="text"
                                value={formGithubUrl}
                                onChange={(e) => handleFieldChange(() => setFormGithubUrl(e.target.value))}
                                placeholder="https://..."
                                className="bg-[#fafafa] dark:bg-[#1c1c22] px-2 py-1 border border-zinc-200 dark:border-[#2a2a32] rounded text-xs w-full text-zinc-800 dark:text-zinc-200 focus:bg-[#ffffff] dark:focus:bg-[#16161a] focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">Read / Watch Time</label>
                              <input
                                type="text"
                                value={formGithubLicense}
                                onChange={(e) => handleFieldChange(() => setFormGithubLicense(e.target.value))}
                                placeholder="e.g. 5 min read"
                                className="bg-[#fafafa] dark:bg-[#1c1c22] px-2 py-1 border border-zinc-200 dark:border-[#2a2a32] rounded text-xs w-full text-zinc-800 dark:text-zinc-200 focus:bg-[#ffffff] dark:focus:bg-[#16161a] focus:outline-none"
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">Author Name</label>
                            <input
                              type="text"
                              value={formGithubName}
                              onChange={(e) => handleFieldChange(() => setFormGithubName(e.target.value))}
                              placeholder="e.g. Anthropic Developer Relations"
                              className="bg-[#fafafa] dark:bg-[#1c1c22] px-2 py-1 border border-zinc-200 dark:border-[#2a2a32] rounded text-xs w-full text-zinc-800 dark:text-zinc-200 focus:bg-[#ffffff] dark:focus:bg-[#16161a] focus:outline-none"
                            />
                          </div>
                        </div>
                      )}

                      {/* Image Blocks and embed video elements */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-zinc-100 dark:border-[#222228]">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
                            <span>Image Attachments (Drag/Drop)</span>
                            {formImageUrl && <button onClick={() => { setFormImageUrl(''); setFormImageCaption(''); }} className="text-red-500 dark:text-red-400 font-bold text-[9px] hover:underline cursor-pointer">Clear</button>}
                          </label>

                          {imageUploadProgress !== null ? (
                            <div className="w-full bg-[#fafafa] dark:bg-[#16161a] h-8 rounded border border-dashed border-zinc-250 dark:border-[#2a2a32] flex items-center px-3 gap-2">
                              <span className="animate-spin h-3.5 w-3.5 border-2 border-zinc-500 border-t-transparent rounded-full" />
                              <div className="flex-1 bg-zinc-200 dark:bg-[#202028] rounded-full h-1.5">
                                <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${imageUploadProgress}%` }} />
                              </div>
                              <span className="text-[9px] font-mono font-bold text-zinc-500 dark:text-zinc-400">{imageUploadProgress}%</span>
                            </div>
                          ) : formImageUrl ? (
                            <div className="flex flex-col gap-2 bg-[#fafafa] dark:bg-[#16161a] border border-zinc-200 dark:border-[#222228] rounded-lg p-2.5 shadow-sm animate-in fade-in duration-200">
                              <div className="aspect-[16/10] w-full overflow-hidden rounded-md border border-zinc-150 dark:border-zinc-800 bg-zinc-100 dark:bg-[#0c0c0e]">
                                <img
                                  src={formImageUrl}
                                  alt="preview"
                                  referrerPolicy="no-referrer"
                                  className="h-full w-full object-cover hover:scale-[1.02] transition-transform duration-300"
                                />
                              </div>
                              <div className="flex items-center gap-2 px-0.5">
                                <span className="text-[9px] uppercase tracking-wider font-extrabold text-zinc-400 dark:text-zinc-500 shrink-0">Caption:</span>
                                <input
                                  type="text"
                                  value={formImageCaption}
                                  onChange={(e) => handleFieldChange(() => setFormImageCaption(e.target.value))}
                                  placeholder="Captions text..."
                                  className="bg-transparent border-0 p-0 text-[10px] w-full focus:ring-0 focus:outline-none italic text-zinc-700 dark:text-zinc-300 font-medium"
                                />
                              </div>
                            </div>
                          ) : (
                            <div
                              onClick={simulateImageDrop}
                              className="h-8 border border-dashed border-zinc-250 dark:border-[#2a2a32] hover:border-zinc-400 dark:hover:border-[#3c3c45] bg-[#fafafa] dark:bg-[#16161a] rounded flex items-center justify-center gap-1 text-[10px] text-zinc-450 dark:text-zinc-500 cursor-pointer select-none transition-colors"
                            >
                              <ImageIcon className="h-3.5 w-3.5 text-zinc-405 text-zinc-400" />
                              <span>Drag screenshot / click to load</span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">Video Demonstration Link Embed (Vimeo/Yt)</label>
                          <input
                            type="text"
                            value={formVideoUrl}
                            onChange={(e) => handleFieldChange(() => setFormVideoUrl(e.target.value))}
                            placeholder="https://youtube.com/watch?v=..."
                            className="bg-[#fafafa] dark:bg-[#1c1c22] px-2 py-1 border border-zinc-200 dark:border-[#2a2a32] text-zinc-800 dark:text-zinc-250 rounded text-[10px] w-full focus:bg-[#ffffff] dark:focus:bg-[#16161a] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* EDITOR TEXTAREA WORKSPACE */}
                  <div className="flex-1 flex flex-col p-4 bg-[#fafafa] dark:bg-[#0c0c0e] relative">

                    {/* Slash Command floating helper menu */}
                    {slashMenuOpen && (
                      <div
                        className="absolute left-6 bottom-40 w-52 rounded-lg border border-zinc-200 dark:border-[#222228] bg-[#ffffff] dark:bg-[#121214] shadow-xl ring-1 ring-zinc-950/5 p-1.5 z-55 text-left animate-in slide-in-from-bottom-2 duration-100"
                      >
                        <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 px-2 py-1 border-b border-zinc-100 dark:border-[#222228]">
                          Notion Slash commands
                        </div>
                        <div className="max-h-52 overflow-y-auto mt-1 text-xs">
                          <button
                            onClick={() => insertSlashCommand('heading-1')}
                            className="w-full flex items-center p-1 px-2 hover:bg-zinc-50 dark:hover:bg-[#1c1c22] text-zinc-700 dark:text-zinc-300 rounded text-left gap-2 cursor-pointer transition-colors"
                          >
                            <span className="font-bold text-zinc-500">H1</span>
                            <span className="font-semibold text-zinc-800 dark:text-zinc-200">Heading Large</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => insertSlashCommand('heading-2')}
                            className="w-full flex items-center p-1 px-2 hover:bg-zinc-50 dark:hover:bg-[#1c1c22] text-zinc-700 dark:text-zinc-300 rounded text-left gap-2 cursor-pointer transition-colors"
                          >
                            <span className="font-bold text-zinc-500 text-[10px]">H2</span>
                            <span className="font-semibold text-zinc-800 dark:text-zinc-200">Heading Section</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => insertSlashCommand('callout-info')}
                            className="w-full flex items-center p-1 px-2 hover:bg-zinc-50 dark:hover:bg-[#1c1c22] text-zinc-700 dark:text-zinc-300 rounded text-left gap-2 cursor-pointer transition-colors"
                          >
                            <Info className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                            <span className="font-semibold text-zinc-800 dark:text-zinc-200">Callout Tip Box</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => insertSlashCommand('callout-warning')}
                            className="w-full flex items-center p-1 px-2 hover:bg-zinc-50 dark:hover:bg-[#1c1c22] text-zinc-700 dark:text-zinc-300 rounded text-left gap-2 cursor-pointer transition-colors"
                          >
                            <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                            <span className="font-semibold text-zinc-800 dark:text-zinc-200">Callout Caution</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => insertSlashCommand('code')}
                            className="w-full flex items-center p-1 px-2 hover:bg-zinc-50 dark:hover:bg-[#1c1c22] text-zinc-700 dark:text-zinc-300 rounded text-left gap-2 cursor-pointer transition-colors"
                          >
                            <FileCode className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                            <span className="font-semibold text-zinc-800 dark:text-zinc-200">TS Code Block</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => insertSlashCommand('table')}
                            className="w-full flex items-center p-1 px-2 hover:bg-zinc-50 dark:hover:bg-[#1c1c22] text-zinc-700 dark:text-zinc-300 rounded text-left gap-2 cursor-pointer transition-colors"
                          >
                            <TableIcon className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                            <span className="font-semibold text-zinc-800 dark:text-zinc-200">Markdown Table</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => insertSlashCommand('checklist')}
                            className="w-full flex items-center p-1 px-2 hover:bg-zinc-50 dark:hover:bg-[#1c1c22] text-zinc-700 dark:text-zinc-300 rounded text-left gap-2 cursor-pointer transition-colors"
                          >
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                            <span className="font-semibold text-zinc-800 dark:text-zinc-200">Task Checklist</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => insertSlashCommand('image')}
                            className="w-full flex items-center p-1 px-2 hover:bg-zinc-50 dark:hover:bg-[#1c1c22] text-zinc-700 dark:text-zinc-300 rounded text-left gap-2 cursor-pointer transition-colors"
                          >
                            <ImageIcon className="h-3.5 w-3.5 text-purple-500 shrink-0" />
                            <span className="font-semibold text-zinc-800 dark:text-zinc-200">Card Showcase Image</span>
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1 font-mono px-1">
                      <div className="flex items-center space-x-3">
                        <span>Markdown documentation body editor (Support slash command)</span>
                        <span className="text-zinc-300">|</span>
                        <div className="flex items-center space-x-1.5">
                          <button
                            type="button"
                            onClick={handleUndo}
                            disabled={historyIndex === 0}
                            className={`p-0.5 rounded cursor-pointer transition-colors ${historyIndex === 0
                                ? 'text-zinc-300 cursor-not-allowed'
                                : 'text-zinc-650 hover:text-zinc-950 hover:bg-zinc-100'
                              }`}
                            title="Undo (Ctrl+Z)"
                          >
                            <Undo className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={handleRedo}
                            disabled={historyIndex >= history.length - 1}
                            className={`p-0.5 rounded cursor-pointer transition-colors ${historyIndex >= history.length - 1
                                ? 'text-zinc-300 cursor-not-allowed'
                                : 'text-zinc-650 hover:text-zinc-950 hover:bg-zinc-100'
                              }`}
                            title="Redo (Ctrl+Y)"
                          >
                            <Redo className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <span>{formMarkdown.length} chars</span>
                    </div>

                    <textarea
                      ref={textareaRef}
                      value={formMarkdown}
                      onChange={(e) => handleFieldChange(() => setFormMarkdown(e.target.value))}
                      onKeyDown={handleTextareaKeyDown}
                      placeholder="Type '/' to trigger Notion Commands menu instantly..."
                      className="w-full flex-1 p-4 rounded-xl border border-zinc-200/90 dark:border-[#2a2a32] focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-300 text-xs text-zinc-800 dark:text-zinc-100 leading-relaxed font-mono resize-y bg-[#ffffff] dark:bg-[#16161a] shadow-inner"
                    />

                    <div className="text-[10px] text-zinc-400 mt-2 italic px-1 flex justify-between">
                      <span>Shortcuts: Press '⌘K' or 'Ctrl K' to quickly focus primary lookup search tags.</span>
                      <span>Tips: Wrap your callout containers nicely using :::info.</span>
                    </div>

                  </div>

                </div>
              )}

              {/* SPLIT LIVE PREVIEW / MARKDOWN RENDER PANEL */}
              {(viewMode === 'split' || viewMode === 'preview') && (
                <div className="flex-1 overflow-y-auto p-6 bg-[#ffffff] dark:bg-[#121214] border-l border-zinc-200 dark:border-[#1e1e24] min-w-0 h-full">

                  <div className="max-w-2xl mx-auto space-y-6">

                    {/* Visual Document Heading card */}
                    <span className="text-[9px] font-extrabold uppercase bg-[#fafafa] dark:bg-[#1c1c22] border border-zinc-250 dark:border-[#2a2a32] text-zinc-700 dark:text-zinc-300 px-2 py-1 rounded">
                      Live View: {formType}
                    </span>

                    <div className="space-y-2 mt-2">
                      <h1 className="font-sans font-black tracking-tight text-xl sm:text-3xl text-zinc-950 dark:text-zinc-50 leading-tight">
                        {formTitle || <span className="text-zinc-300 dark:text-zinc-700">Untitled Core Module</span>}
                      </h1>

                      {formDescription && (
                        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl italic">
                          {formDescription}
                        </p>
                      )}
                    </div>

                    {/* Sub-rendered visual widget blocks */}

                    {/* Custom Block: GitHub style repo card */}
                    {formGithubUrl && (
                      <div className="border border-zinc-200/90 dark:border-[#222228] rounded-xl overflow-hidden bg-[#fafafa] dark:bg-[#16161a] p-4 font-sans hover:shadow-sm transition-all duration-205">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center bg-zinc-950 dark:bg-zinc-800 rounded text-white text-[10px] font-bold uppercase font-mono">
                              GH
                            </span>
                            <div>
                              <div className="text-xs font-bold text-zinc-950 dark:text-zinc-50 hover:underline hover:text-blue-600 dark:hover:text-blue-400 truncate max-w-xs flex items-center">
                                {formGithubName || 'claudelabs/repository'}
                                <ExternalLink className="h-2.5 w-2.5 ml-1 inline text-zinc-450 dark:text-zinc-500" />
                              </div>
                              <span className="text-[10px] text-zinc-400 dark:text-zinc-550 block -mt-0.5 font-mono">MIT license configured</span>
                            </div>
                          </div>

                          <span className="text-[10px] font-bold bg-[#ffffff] dark:bg-[#121214] text-zinc-650 dark:text-zinc-350 px-2.5 py-1 rounded-md border border-zinc-150 dark:border-[#222228] flex items-center gap-1 shrink-0 font-mono">
                            <CheckCircle className="h-3 w-3 text-emerald-500 mr-0.5" />
                            Verified Repo
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 py-2 text-center text-zinc-700 dark:text-zinc-300 border-t border-zinc-150 dark:border-[#222228]">
                          <div>
                            <div className="font-mono text-xs font-black text-zinc-900 dark:text-zinc-100 flex items-center justify-center gap-0.5">
                              <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500 shrink-0" />
                              <span>{(formGithubStars ?? 142).toLocaleString()}</span>
                            </div>
                            <span className="text-[9px] text-zinc-450 dark:text-zinc-500 uppercase font-semibold">Stars repository</span>
                          </div>
                          <div className="border-x border-zinc-150 dark:border-[#222228]">
                            <div className="font-mono text-xs font-black text-zinc-900 dark:text-zinc-100 flex items-center justify-center gap-0.5">
                              <GitFork className="h-3.5 w-3.5 text-zinc-550 dark:text-zinc-500 shrink-0" />
                              <span>{(formGithubForks ?? 24).toLocaleString()}</span>
                            </div>
                            <span className="text-[9px] text-zinc-450 dark:text-zinc-500 uppercase font-semibold">Forks branch</span>
                          </div>
                          <div>
                            <div className="font-mono text-[10px] font-black text-zinc-900 dark:text-zinc-100 truncate px-1">
                              {formGithubLicense}
                            </div>
                            <span className="text-[9px] text-zinc-450 dark:text-zinc-500 uppercase font-semibold">Usage License</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Custom Block: Image block formatting */}
                    {formImageUrl && (
                      <figure className="my-5 space-y-1.5 font-sans">
                        <img
                          src={formImageUrl}
                          alt="Curated preview graphic"
                          className="w-full h-44 object-cover rounded-xl border border-zinc-100 dark:border-[#222228] shadow"
                        />
                        {formImageCaption && (
                          <figcaption className="text-center text-[10px] text-zinc-400 dark:text-zinc-550 italic">
                            {formImageCaption}
                          </figcaption>
                        )}
                      </figure>
                    )}

                    {/* Custom Block: Special prompt card block */}
                    {formType === 'Prompt' && (
                      <div className="border border-zinc-200/90 dark:border-[#222228] rounded-xl overflow-hidden bg-[#fafafa] dark:bg-[#16161a] font-sans shadow-sm">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 px-4 py-2 flex items-center justify-between border-b border-zinc-150 dark:border-[#222228]">
                          <span className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300 tracking-wider flex items-center">
                            <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 mr-1 shrink-0" />
                            AI MODEL INTEGRATOR PANEL
                          </span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(formPromptContent || '');
                              showToast('📋 Prompt instruction copied to clipboard!');
                            }}
                            className="text-[10px] font-bold text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer bg-white dark:bg-[#121214] px-2 py-0.5 border border-blue-200 dark:border-blue-900/50 rounded"
                          >
                            <Copy className="h-2.5 w-2.5" />
                            Copy template
                          </button>
                        </div>

                        <div className="p-4 bg-[#ffffff] dark:bg-[#121214] space-y-3">
                          <div>
                            <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100 text-xs block">{formPromptTitle || 'Standard General Assistant instruction'}</span>
                            <span className="text-[9px] text-zinc-405 dark:text-zinc-500 block -mt-0.5">Category: {formPromptCategory} prompt guidelines</span>
                          </div>

                          <div className="bg-[#fafafa] dark:bg-[#16161a] rounded-lg p-3 text-xs leading-relaxed border border-zinc-200 dark:border-[#222228] text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap font-mono">
                            {formPromptContent || <span className="text-zinc-300 dark:text-zinc-700">Set prompt content variables in editor...</span>}
                          </div>

                          {formPromptVariables.length > 0 && (
                            <div className="pt-2 border-t border-zinc-100 dark:border-[#222228] space-y-2">
                              <span className="text-[10px] font-bold text-zinc-450 dark:text-zinc-550 uppercase tracking-wide">Interactive variables checklist:</span>
                              <div className="flex flex-wrap gap-1.5">
                                {formPromptVariables.map(v => (
                                  <span key={v} className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-[#1c1c22] border border-zinc-200 dark:border-[#2a2a32]">
                                    {v}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Markdown text elements wrapper */}
                    <article id="rendered-markdown-root" className="prose prose-zinc dark:prose-invert max-w-none prose-sm text-zinc-800 dark:text-zinc-100">
                      {formatMarkdownPreviewHTML(formMarkdown)}
                    </article>

                    {/* Tags cluster */}
                    {formTags.length > 0 && (
                      <div className="pt-4 border-t border-zinc-100 dark:border-[#222228] flex flex-wrap items-center gap-1.5 text-xs text-zinc-650 dark:text-zinc-400">
                        <span className="font-bold text-[10px] uppercase text-zinc-400 dark:text-zinc-500">Attached tags:</span>
                        {formTags.map(tag => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] font-bold text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-[#16161a] py-0.5 px-2 rounded border border-zinc-200 dark:border-[#222228] flex items-center gap-1"
                          >
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Fictitious Embedded video preview widget layout */}
                    {formVideoUrl && (
                      <div className="border border-zinc-150 dark:border-[#222228] rounded-lg overflow-hidden bg-zinc-950 p-2 font-sans relative my-4">
                        <div className="aspect-video w-full rounded bg-zinc-900 flex items-center justify-center border border-zinc-800 text-center flex-col shrink-0">
                          <div className="h-10 w-10 bg-red-600 text-white rounded-full flex items-center justify-center animate-pulse mb-2 shadow cursor-pointer">
                            <Play className="h-5 w-5 fill-white text-white ml-0.5" />
                          </div>
                          <span className="text-[10px] font-bold text-zinc-450 dark:text-zinc-400 uppercase font-mono">Dynamic Video Embed Player Block</span>
                          <span className="text-[9px] text-zinc-550 dark:text-zinc-500 truncate max-w-xs mt-0.5">{formVideoUrl}</span>
                        </div>
                      </div>
                    )}

                  </div>

                </div>
              )}

              {/* EDIT SIDEBAR / SEO / SETTINGS ACCORDION */}
              <aside className="w-80 border-l border-zinc-200 dark:border-[#1e1e24] bg-[#fafafa] dark:bg-[#0c0c0e] flex flex-col shrink-0 overflow-y-auto">

                {/* SEO SETTINGS HEADER */}
                <div className="p-4 border-b border-zinc-200 dark:border-[#1e1e24] bg-[#ffffff] dark:bg-[#121214] shadow-sm flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-950 dark:text-zinc-550 uppercase flex items-center">
                    <Settings className="h-4 w-4 mr-1.5 text-zinc-550 dark:text-zinc-400 shrink-0" />
                    SEO & Release Controls
                  </span>
                  <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded ${getScoreColor(seoScore)}`}>
                    Score: {seoScore}/100
                  </span>
                </div>

                {/* SEO Side panel Inputs card */}
                <div className="p-4 space-y-4 text-xs font-sans">

                  <div className="bg-[#ffffff] dark:bg-[#121214] border border-zinc-200 dark:border-[#222228] rounded-lg p-3 space-y-3">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-450 dark:text-zinc-500 mb-1 flex justify-between">
                      <span>SEO Score Diagnostics</span>
                      <span className="font-mono text-zinc-400 dark:text-zinc-500 font-normal">{getScoreLabel(seoScore)}</span>
                    </div>
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                      <div className={`h-1.5 rounded-full ${getScoreColor(seoScore)}`} style={{ width: `${seoScore}%` }} />
                    </div>
                  </div>

                  {/* Tag Selection suggestions panel */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                      Tags system keywords
                    </label>
                    <div className="flex flex-wrap gap-1 bg-[#ffffff] dark:bg-[#121214] p-2 border border-zinc-200 dark:border-[#222228] rounded-lg min-h-12 items-center">
                      {formTags.map(t => (
                        <span key={t} className="bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200 dark:border-[#2a2a32] rounded text-[10px] font-mono px-1.5 py-0.5 flex items-center gap-1 text-zinc-700 dark:text-zinc-300">
                          <span>{t}</span>
                          <button onClick={() => handleRemoveTag(t)} className="text-red-500 hover:text-red-750 font-bold font-sans">&times;</button>
                        </span>
                      ))}
                      {formTags.length === 0 && <span className="text-[10px] text-zinc-400 dark:text-zinc-500 italic">No tags selected.</span>}
                    </div>

                    <div className="flex gap-1.5 pt-0.5">
                      <input
                        type="text"
                        value={newTagInput}
                        onChange={(e) => setNewTagInput(e.target.value)}
                        placeholder="Add tags, e.g. sql"
                        className="w-full bg-[#ffffff] dark:bg-[#121214] text-zinc-805 dark:text-zinc-100 px-1.5 py-1 border border-zinc-250 dark:border-[#2a2a32] focus:outline-none focus:ring-1 focus:ring-blue-600 rounded text-xs"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddNewTag();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleAddNewTag}
                        className="px-2 py-1 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded text-[10px] font-extrabold cursor-pointer border border-zinc-300 dark:border-[#2a2a32]"
                      >
                        Add
                      </button>
                    </div>

                    <div className="flex gap-1 mt-1 flex-wrap">
                      {['mcp', 'automation', 'sql', 'agentic', 'database', 'tools'].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            if (!formTags.includes(tag)) {
                              handleFieldChange(() => setFormTags(prev => [...prev, tag]));
                            }
                          }}
                          className="text-[9px] font-mono bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200 dark:border-[#2a2a32] rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-650 dark:text-zinc-300 px-1 py-0.5"
                        >
                          +{tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Parent Folder Selector */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                      Parent Folder
                    </label>
                    <div className="relative inline-flex items-center w-full">
                      <select
                        value={formFolderId}
                        onChange={(e) => handleFieldChange(() => setFormFolderId(e.target.value))}
                        className="w-full bg-[#ffffff] dark:bg-[#121214] text-zinc-800 dark:text-zinc-100 px-3 py-1.5 pr-8 border border-zinc-200 dark:border-[#2a2a32] focus:outline-none focus:ring-1 focus:ring-blue-600 rounded-md text-xs appearance-none cursor-pointer"
                      >
                        <option value="">(Root Directory)</option>
                        {folders.map(f => (
                          <option key={f.id} value={f.id}>{f.name}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-550 dark:text-zinc-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* Dynamic URL parameters Slug box */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                      Metadata URL Slug
                    </label>
                    <input
                      type="text"
                      value={formSlug}
                      onChange={(e) => handleFieldChange(() => setFormSlug(e.target.value.toLowerCase().replace(/\s+/g, '-')))}
                      className="w-full bg-[#ffffff] dark:bg-[#121214] text-zinc-805 dark:text-zinc-100 px-3 py-1.5 border border-zinc-205 dark:border-[#2a2a32] focus:outline-none focus:ring-1 focus:ring-blue-600 rounded-md font-mono text-[11px]"
                      placeholder="e.g. sequential-thinking-skill"
                    />
                  </div>

                  {/* Dynamic SEO Meta Title */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                      SEO Meta Title Value
                    </label>
                    <input
                      type="text"
                      value={formMetaTitle}
                      onChange={(e) => handleFieldChange(() => setFormMetaTitle(e.target.value))}
                      className="w-full bg-[#ffffff] dark:bg-[#121214] text-zinc-805 dark:text-zinc-100 px-3 py-1.5 border border-zinc-200 dark:border-[#2a2a32] focus:outline-none focus:ring-1 focus:ring-blue-600 rounded-md text-xs font-semibold"
                      placeholder="Insert meta tag title..."
                    />
                    <span className="text-[9px] text-zinc-400 dark:text-zinc-500 block text-right">{formMetaTitle.length}/60 chars recommended</span>
                  </div>

                  {/* Dynamic SEO Description */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                      SEO Meta Description guidelines
                    </label>
                    <textarea
                      value={formMetaDescription}
                      onChange={(e) => handleFieldChange(() => setFormMetaDescription(e.target.value))}
                      rows={3}
                      className="w-full bg-[#ffffff] dark:bg-[#121214] text-zinc-805 dark:text-zinc-100 px-3 py-1.5 border border-zinc-200 dark:border-[#2a2a32] focus:outline-none focus:ring-1 focus:ring-blue-600 rounded-md text-xs leading-relaxed resize-none"
                      placeholder="Enter detailed description summarizing search query items..."
                    />
                    <span className="text-[9px] text-zinc-400 dark:text-zinc-500 block text-right">{formMetaDescription.length}/160 chars</span>
                  </div>

                  {/* Canonical URL address */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                      Canonical URL Address
                    </label>
                    <input
                      type="text"
                      value={formCanonicalUrl}
                      onChange={(e) => handleFieldChange(() => setFormCanonicalUrl(e.target.value))}
                      className="w-full bg-[#ffffff] dark:bg-[#121214] text-zinc-805 dark:text-zinc-100 px-3 py-1.5 border border-zinc-200 dark:border-[#2a2a32] focus:outline-none focus:ring-1 focus:ring-blue-600 rounded-md font-mono text-[10px]"
                      placeholder="https://openskills.in/skill/..."
                    />
                  </div>

                  {/* Canonical Keywords */}
                  <div className="space-y-1 animate-in fade-in">
                    <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                      Target Search Keywords
                    </label>
                    <input
                      type="text"
                      value={formKeywords}
                      onChange={(e) => handleFieldChange(() => setFormKeywords(e.target.value))}
                      className="w-full bg-[#ffffff] dark:bg-[#121214] text-zinc-805 dark:text-zinc-100 px-3 py-1.5 border border-zinc-200 dark:border-[#2a2a32] focus:outline-none focus:ring-1 focus:ring-blue-600 rounded-md text-[11px]"
                      placeholder="postgres, sql, mcp, claude"
                    />
                  </div>

                  {/* Publishing Schedule Parameters */}
                  <div className="pt-3 border-t border-zinc-250 dark:border-[#222228] space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-1">
                      Scheduled release targets
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-zinc-450 dark:text-zinc-500 block">Scheduled Publication Date</span>
                      <div className="relative">
                        <input
                          type="date"
                          value={formPublishDate}
                          onChange={(e) => handleFieldChange(() => setFormPublishDate(e.target.value))}
                          className="w-full bg-[#ffffff] dark:bg-[#121214] text-zinc-600 dark:text-zinc-300 px-3 py-1.5 border border-zinc-200 dark:border-[#2a2a32] focus:outline-none focus:ring-1 focus:ring-blue-600 rounded-md text-xs font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-2">
                      <label className="flex items-center space-x-2 text-[11px] text-zinc-700 dark:text-zinc-300 font-semibold cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formFeatured}
                          onChange={(e) => handleFieldChange(() => setFormFeatured(e.target.checked))}
                          className="rounded border-zinc-300 dark:border-zinc-700 bg-transparent text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                        />
                        <span>Featured Content</span>
                      </label>

                      <label className="flex items-center space-x-2 text-[11px] text-zinc-700 dark:text-zinc-300 font-semibold cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formPinned}
                          onChange={(e) => handleFieldChange(() => setFormPinned(e.target.checked))}
                          className="rounded border-zinc-300 dark:border-zinc-700 bg-transparent text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                        />
                        <span>Pin to top</span>
                      </label>
                    </div>
                  </div>

                  {/* GOOGLE WEB SNIPPET CARD SIMULATOR */}
                  <div className="bg-[#ffffff] dark:bg-[#121214] border border-zinc-200 dark:border-[#222228] rounded-xl p-3 space-y-1 text-xs">
                    <span className="text-[9px] font-bold uppercase text-zinc-400 dark:text-zinc-550">Google SERP Preview simulation</span>
                    <span className="text-blue-700 dark:text-blue-400 font-sans font-bold hover:underline block truncate max-w-xs">{formMetaTitle || formTitle || 'openSkills Curated Guides'}</span>
                    <span className="text-zinc-650 dark:text-zinc-450 text-[10px] block font-mono">openskills.in/skill/{formSlug || 'new-slug'}</span>
                    <span className="text-zinc-600 dark:text-zinc-400 text-[10px] line-clamp-2 leading-normal">{formMetaDescription || 'Equip your local Sonnet setups with database inspectors, web servers, and automation logic...'}</span>
                  </div>

                </div>

              </aside>

            </div>
          </>
        )}
      </main>

      {/* REVISIONS HISTORY & VERSIONS SIDEPANEL DRAWER */}
      {revisionSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-zinc-950/20 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          <div className="w-80 bg-white shadow-xl h-full border-l border-zinc-250 p-4.5 flex flex-col justify-between animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between border-b border-zinc-150 pb-3 mb-4 font-sans">
                <span className="text-xs font-bold uppercase text-zinc-500 tracking-wider flex items-center">
                  <History className="h-4 w-4 mr-1.5 text-indigo-505 text-indigo-500" />
                  Version Revision History
                </span>
                <button
                  onClick={() => setRevisionSidebarOpen(false)}
                  className="text-zinc-400 hover:text-zinc-700 cursor-pointer"
                >
                  &times;
                </button>
              </div>

              <div className="text-[11px] text-zinc-400 mb-3 leading-relaxed">
                We auto-save local backups of your draft templates every 10 seconds. Select a restore point below.
              </div>

              <div className="space-y-3 overflow-y-auto max-h-[450px] p-0.5">
                {revisions.map((rev, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-zinc-50 hover:bg-zinc-100/80 border border-zinc-200 rounded-lg group text-xs text-zinc-750 transition-colors"
                  >
                    <div className="flex items-center justify-between font-bold text-zinc-800">
                      <span>{rev.version}</span>
                      <span className="text-[9px] text-zinc-400 font-semibold">{rev.timestamp.split(' ')[1] || rev.timestamp}</span>
                    </div>
                    <div className="text-[10px] text-zinc-400 truncate mt-0.5">{rev.title}</div>
                    <div className="text-[10px] text-zinc-455 text-zinc-500 leading-normal mt-1 italic">
                      "{rev.logMessage}"
                    </div>
                    <div className="mt-2.5 flex gap-1.5 justify-end">
                      <button
                        onClick={() => {
                          const confirm = window.confirm('Revert content layout back to this revision draft?');
                          if (confirm) {
                            handleFieldChange(() => {
                              setFormMarkdown(rev.markdownContent);
                              setFormTitle(rev.title);
                            });
                            showToast(`⏪ Reverted active document back to ${rev.version}!`);
                          }
                        }}
                        className="p-1 px-2.5 bg-zinc-950 text-white rounded text-[10px] font-bold hover:bg-zinc-800 cursor-pointer"
                      >
                        Restore Draft
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3.5 pt-3 border-t border-zinc-100 font-sans text-xs">
              <span className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Secure CMS Audit Logs:</span>
              <div className="space-y-1.5 bg-zinc-50 border border-zinc-150 rounded-lg p-2.5 text-[10px]">
                {auditLogs.slice(0, 3).map(al => (
                  <div key={al.id} className="flex justify-between items-start leading-tight">
                    <span className="text-zinc-650 text-zinc-400 font-semibold">{al.action}</span>
                    <span className="text-zinc-400 text-right">{al.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MOVE ITEM MODAL */}
      {moveItemModal.isOpen && (
        <div
          className="fixed inset-0 z-[120] bg-zinc-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setMoveItemModal(prev => ({ ...prev, isOpen: false }))}
        >
          <div
            className="w-full max-w-md bg-white rounded-xl border border-zinc-200 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-zinc-150 bg-zinc-50 flex items-center justify-between shrink-0">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Move {moveItemModal.itemType === 'file' ? 'File' : 'Folder'}
              </span>
              <button
                onClick={() => setMoveItemModal(prev => ({ ...prev, isOpen: false }))}
                className="text-zinc-400 hover:text-zinc-700 cursor-pointer h-7 w-7 rounded-full hover:bg-zinc-200 flex items-center justify-center text-lg font-bold"
              >
                &times;
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto max-h-[50vh] space-y-4">
              <div className="text-xs text-zinc-500">
                Move <strong className="text-zinc-800 font-bold">{moveItemModal.itemName}</strong> to:
              </div>

              <div className="space-y-1">
                {/* 1. Root Directory option */}
                <button
                  onClick={() => {
                    if (moveItemModal.itemType === 'file') {
                      setContents(prev => prev.map(c => c.id === moveItemModal.itemId ? { ...c, folderId: '' } : c));
                      showToast(`Moved file "${moveItemModal.itemName}" to Root Directory`);
                    } else {
                      setFolders(prev => prev.map(f => f.id === moveItemModal.itemId ? { ...f, parentId: undefined } : f));
                      showToast(`Moved folder "${moveItemModal.itemName}" to Root Directory`);
                    }
                    setMoveItemModal(prev => ({ ...prev, isOpen: false }));
                  }}
                  className="w-full text-left px-3 py-2 rounded hover:bg-zinc-100 text-xs font-semibold text-zinc-700 flex items-center gap-2 border border-zinc-100"
                >
                  <Folder className="h-4 w-4 text-zinc-400 shrink-0" />
                  <span>(Root Directory / Top Level)</span>
                </button>

                {/* 2. Folders options list */}
                {getSortedFolders()
                  .filter(f => {
                    // If moving a folder, exclude itself and any of its descendant folders to prevent cycle
                    if (moveItemModal.itemType === 'folder') {
                      return f.id !== moveItemModal.itemId && !isDescendant(moveItemModal.itemId, f.id);
                    }
                    return true;
                  })
                  .map(f => {
                    const depth = getFolderDepth(f.id);
                    return (
                      <button
                        key={f.id}
                        onClick={() => {
                          if (moveItemModal.itemType === 'file') {
                            setContents(prev => prev.map(c => c.id === moveItemModal.itemId ? { ...c, folderId: f.id } : c));
                            showToast(`Moved file "${moveItemModal.itemName}" to "${f.name}"`);
                          } else {
                            setFolders(prev => prev.map(old => old.id === moveItemModal.itemId ? { ...old, parentId: f.id } : old));
                            showToast(`Moved folder "${moveItemModal.itemName}" to "${f.name}"`);
                          }
                          setMoveItemModal(prev => ({ ...prev, isOpen: false }));
                        }}
                        className="w-full text-left px-3 py-2 rounded hover:bg-zinc-100 text-xs font-semibold text-zinc-700 flex items-center gap-2 border border-zinc-50"
                        style={{ paddingLeft: `${depth * 12 + 12}px` }}
                      >
                        <Folder className="h-4 w-4 text-blue-500 shrink-0" />
                        <span>{f.name}</span>
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-zinc-150 bg-zinc-50 flex justify-end">
              <button
                onClick={() => setMoveItemModal(prev => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 border border-zinc-200 hover:bg-zinc-100 rounded-lg text-xs font-bold text-zinc-650 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
