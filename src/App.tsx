import React, { useState, useEffect, useMemo } from 'react';
import { 
  Bot, 
  Github, 
  Star, 
  GitFork, 
  Bookmark, 
  TrendingUp, 
  LayoutGrid,
  Table,
  Award
} from 'lucide-react';

import Header from './components/Header';
import Hero from './components/Hero';
import SkillDetailsModal from './components/SkillDetailsModal';
import SearchSection from './components/SearchSection';
import LatestReposTable from './components/LatestReposTable';
import CategoryGrid from './components/CategoryGrid';
import CollectionList from './components/CollectionList';
import ResourceLibrary from './components/ResourceLibrary';
import PromptLibrary from './components/PromptLibrary';
import SubmitForm from './components/SubmitForm';
import AdminDashboard from './components/AdminDashboard';

import { translations } from './translations';

import { Skill, Category, Collection, Resource, Prompt, Submission } from './types';
import { 
  initialCategories, 
  initialSkills, 
  initialCollections, 
  initialResources, 
  initialPrompts 
} from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(() => {
    return window.location.hash === '#admin' ? 'admin' : 'browse';
  });

  // Listen for URL hash changes to open admin page via secret URL
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setActiveTab('admin');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Language translation state
  const [language, setLanguage] = useState<'en' | 'hi'>(() => {
    return (localStorage.getItem('openskills_lang') as 'en' | 'hi') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('openskills_lang', language);
  }, [language]);

  // Theme translation state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('openskills_theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('openskills_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  // Data lists with localStorage persistence
  const [skills, setSkills] = useState<Skill[]>(() => {
    const saved = localStorage.getItem('claude_hub_skills_2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialSkills;
      }
    }
    return initialSkills;
  });

  const [submissions, setSubmissions] = useState<Submission[]>(() => {
    const saved = localStorage.getItem('claude_hub_submissions_2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback to default submissions
      }
    }
    // Seed initial pending demo submissions
    return [
      {
        id: 'sub-sqlite-1',
        name: 'SQLite File Inspector MCP',
        repoUrl: 'github.com/modelcontextprotocol/servers/tree/main/src/sqlite',
        description: 'Enables Claude instances to inspect schema definitions, execute write-safe SQLite queries, and retrieve table headers from local database files.',
        category: 'development',
        tags: ['mcp', 'sqlite', 'sql', 'database'],
        submittedBy: 'mcp-team-alpha',
        date: '2026-06-21',
        status: 'pending'
      },
      {
        id: 'sub-writing-2',
        name: 'Technical Editor Tooling',
        repoUrl: 'github.com/anthropic/servers/tree/main/src/writing',
        description: 'Advanced markup, spelling, grammar revision helper that translates formatting layouts and checks readability scores directly.',
        category: 'writing',
        tags: ['prose', 'editing', 'grammar'],
        submittedBy: 'claude-writer',
        date: '2026-06-22',
        status: 'pending'
      }
    ];
  });

  const [bookmarks, setBookmarks] = useState<Skill[]>(() => {
    const saved = localStorage.getItem('claude_hub_bookmarks_2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [prompts, setPrompts] = useState<Prompt[]>(() => {
    const saved = localStorage.getItem('claude_hub_prompts_2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialPrompts;
      }
    }
    return initialPrompts;
  });

  // Categories status (reflects active approved skills counts)
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('openskills_categories_2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return initialCategories;
  });

  useEffect(() => {
    localStorage.setItem('openskills_categories_2', JSON.stringify(categories));
  }, [categories]);

  // Collections state
  const [collections, setCollections] = useState<Collection[]>(() => {
    const saved = localStorage.getItem('openskills_collections_2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return initialCollections;
  });

  useEffect(() => {
    localStorage.setItem('openskills_collections_2', JSON.stringify(collections));
  }, [collections]);

  // Resources state
  const [resources, setResources] = useState<Resource[]>(() => {
    const saved = localStorage.getItem('openskills_resources_2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return initialResources;
  });

  useEffect(() => {
    localStorage.setItem('openskills_resources_2', JSON.stringify(resources));
  }, [resources]);

  // Search/Filter states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('stars-desc');

  // Sub tab filters inside public browse directory
  const [browseSectionTab, setBrowseSectionTab] = useState<'all' | 'featured' | 'trending'>('all');
  const [trendingPeriod, setTrendingPeriod] = useState<'today' | 'week' | 'month'>('today');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'table'>('grid');

  // Detail Modal trigger state
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  // Note: Ctrl+K keyboard shortcut is handled in Header component

  // Save changes to local storage whenever states alter
  useEffect(() => {
    localStorage.setItem('claude_hub_skills_2', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('claude_hub_submissions_2', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('claude_hub_bookmarks_2', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('claude_hub_prompts_2', JSON.stringify(prompts));
  }, [prompts]);

  // Reset selected skill when changing tabs
  useEffect(() => {
    setSelectedSkill(null);
  }, [activeTab]);

  // Scroll to skill details container when a skill is selected
  useEffect(() => {
    if (selectedSkill) {
      setTimeout(() => {
        const element = document.getElementById('skill-details-container');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 80);
    }
  }, [selectedSkill]);

  // Recalculate dynamic skillsCount mapping for category items
  useEffect(() => {
    setCategories(prev => {
      return prev.map(cat => {
        const matchingApproved = skills.filter(s => s.category === cat.id && s.status === 'approved').length;
        return {
          ...cat,
          skillsCount: matchingApproved
        };
      });
    });
  }, [skills]);

  // Dynamic SEO Injection inside document <head>
  useEffect(() => {
    let title = "openSkills - AI Skills, MCP Servers & Claude Skills Hub";
    let description = "Discover AI Skills, MCP Servers, Claude Skills, Open Source Repositories, Tools and Resources.";
    let canonical = "https://www.openskills.in";
    let keywords = "ai skills, mcp servers, claude skills, model context protocol, developer tools";
    let ogImage = "https://www.openskills.in/og-image.png";

    if (selectedSkill) {
      title = selectedSkill.seo?.metaTitle || `${selectedSkill.name} - AI Skill & MCP Server`;
      description = selectedSkill.seo?.metaDescription || selectedSkill.description;
      canonical = selectedSkill.seo?.canonicalUrl || `https://openskills.in/skills/${selectedSkill.id}`;
      keywords = selectedSkill.tags?.join(', ') || '';
      ogImage = selectedSkill.seo?.activeOgImage || (selectedSkill.seo?.ogImages && selectedSkill.seo.ogImages[0]) || "https://www.openskills.in/og-image.png";
    } else {
      switch (activeTab) {
        case 'browse':
          if (selectedCategory !== 'all') {
            const cat = categories.find(c => c.id === selectedCategory);
            if (cat) {
              title = cat.seo?.metaTitle || `${cat.name} AI Skills & MCP Servers - openSkills`;
              description = cat.seo?.metaDescription || cat.description || `Browse curated AI Skills and MCP Servers in the ${cat.name} category.`;
              canonical = cat.seo?.canonicalUrl || `https://openskills.in/categories/${cat.id}`;
              keywords = `${cat.name}, mcp server, ai skill, openskills`;
            }
          } else if (selectedTag !== 'all') {
            title = `Browse AI Skills tagged #${selectedTag} - openSkills`;
            description = `Find premium MCP servers and AI developer tools tagged with #${selectedTag} on openSkills.`;
            canonical = `https://openskills.in/tags/${selectedTag}`;
            keywords = `${selectedTag}, mcp server, ai skill, openskills`;
          }
          break;
        case 'categories':
          title = "Categories - openSkills AI Directory";
          description = "Browse AI Skills, Claude Skills, and Model Context Protocol (MCP) servers grouped by category.";
          canonical = "https://openskills.in/categories";
          keywords = "categories, ai categories, mcp directory";
          break;
        case 'collections':
          title = "Curated Collections - openSkills";
          description = "Hand-picked collections of top AI skills and MCP servers for developer productivity.";
          canonical = "https://openskills.in/collections";
          keywords = "collections, curated ai, mcp collections";
          break;
        case 'resources':
          title = "Resource Library - openSkills";
          description = "Tutorials, documentation, and guides to build and run Model Context Protocol (MCP) integrations.";
          canonical = "https://openskills.in/resources";
          keywords = "resources, mcp documentation, mcp tutorials, guides";
          break;
        case 'prompts':
          title = "Prompt Library - openSkills";
          description = "Premium prompt library and templates optimized for Claude Desktop and agentic workflows.";
          canonical = "https://openskills.in/prompts";
          keywords = "prompts, claude prompts, system prompts, prompt library";
          break;
        case 'submit':
          title = "Submit a Skill - openSkills AI Directory";
          description = "Contribute your open-source Model Context Protocol (MCP) servers or AI skills to openSkills.";
          canonical = "https://openskills.in/submit";
          keywords = "submit mcp, register skill, open source mcp";
          break;
        case 'admin':
          title = "CMS Admin Console - openSkills";
          description = "Manage openSkills content assets, categories, collections, and submissions.";
          canonical = "https://openskills.in/admin";
          keywords = "admin, cms, manage";
          break;
        default:
          break;
      }
    }

    // 1. Update Title
    document.title = title;

    // Helper to update/create meta tag
    const updateOrCreateMeta = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Update Standard SEO meta tags
    updateOrCreateMeta('description', description);
    updateOrCreateMeta('keywords', keywords);

    // 3. Update Canonical URL
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute('href', canonical);

    // 4. Update OpenGraph (Social/Search Engine) Meta Tags
    updateOrCreateMeta('og:title', title, true);
    updateOrCreateMeta('og:description', description, true);
    updateOrCreateMeta('og:url', canonical, true);
    updateOrCreateMeta('og:image', ogImage, true);
    updateOrCreateMeta('og:type', 'website', true);
  }, [selectedSkill, activeTab, selectedCategory, selectedTag, categories]);

  // Extract all unique tags dynamically (memoized)
  const availableTags: string[] = useMemo(() => {
    const tagsSet = new Set<string>();
    skills
      .filter(s => s.status === 'approved')
      .forEach(s => {
        if (s.tags) {
          s.tags.forEach(t => tagsSet.add(t));
        }
      });
    return Array.from(tagsSet).sort();
  }, [skills]);

  // Handle bookmarks toggling
  const handleToggleBookmark = (skill: Skill) => {
    const isSaved = bookmarks.some(b => b.id === skill.id);
    if (isSaved) {
      setBookmarks(prev => prev.filter(b => b.id !== skill.id));
    } else {
      setBookmarks(prev => [...prev, skill]);
    }
  };

  // Submission handles: user creates one
  const handleUserCreateSubmission = (newSub: {
    name: string;
    repoUrl: string;
    description: string;
    category: string;
    tags: string[];
    author: string;
  }) => {
    const created: Submission = {
      id: `submission-${Date.now()}`,
      name: newSub.name,
      repoUrl: newSub.repoUrl,
      description: newSub.description,
      category: newSub.category,
      tags: newSub.tags,
      submittedBy: newSub.author,
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setSubmissions(prev => [created, ...prev]);
  };

  // Admin approves submission
  const handleAdminApproveSubmission = (subId: string) => {
    const match = submissions.find(s => s.id === subId);
    if (!match) return;

    // 1. Create active verified skill
    const approvedSkill: Skill = {
      id: `approved-${Date.now()}`,
      name: match.name,
      description: match.description,
      category: match.category,
      tags: match.tags,
      author: match.submittedBy,
      repoUrl: match.repoUrl.startsWith('http') ? match.repoUrl : `https://${match.repoUrl}`,
      stars: Math.floor(Math.random() * 150) + 12,
      forks: Math.floor(Math.random() * 30) + 3,
      updated: new Date().toISOString().split('T')[0],
      installation: `npm install -g @mcp/${match.name.toLowerCase().replace(/\s+/g, '-')}\n# Or boot via npx:\nnpx @mcp/${match.name.toLowerCase().replace(/\s+/g, '-')}`,
      usage: `Ask Claude about: "${match.name}" and trigger its execution.`,
      examples: [
        {
          title: 'Direct Invocation',
          code: `Claude: Triggered local tool "${match.name}". Successfully compiled inputs.`
        }
      ],
      changelog: [
        { version: 'v1.0.0', date: new Date().toISOString().split('T')[0], changes: ['Initial verified open source release.'] }
      ],
      featured: false,
      trendingToday: true,
      trendingWeek: false,
      trendingMonth: false,
      status: 'approved',
      bookmarksCount: 0
    };

    setSkills(prev => [approvedSkill, ...prev]);

    // 2. Mark submission approved
    setSubmissions(prev => 
      prev.map(sub => sub.id === subId ? { ...sub, status: 'approved' } : sub)
    );
  };

  // Admin rejects submission
  const handleAdminRejectSubmission = (subId: string) => {
    setSubmissions(prev => 
      prev.map(s => s.id === subId ? { ...s, status: 'rejected' } : s)
    );
  };

  // Admin directly creates verified skill
  const handleAdminAddSkillDirectly = (addedSkill: Skill) => {
    setSkills(prev => [addedSkill, ...prev]);
  };

  // Admin updates skill inline
  const handleAdminUpdateSkill = (updated: Skill) => {
    setSkills(prev => prev.map(s => s.id === updated.id ? updated : s));
  };

  // Admin deletes skill
  const handleAdminDeleteSkill = (id: string) => {
    setSkills(prev => prev.filter(s => s.id !== id));
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  // Admin Category callbacks
  const handleAdminAddCategory = (newCat: Category) => {
    setCategories(prev => [...prev, newCat]);
  };
  const handleAdminUpdateCategory = (updated: Category) => {
    setCategories(prev => prev.map(c => c.id === updated.id ? updated : c));
  };
  const handleAdminDeleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  // Admin Collection callbacks
  const handleAdminAddCollection = (newCol: Collection) => {
    setCollections(prev => [...prev, newCol]);
  };
  const handleAdminUpdateCollection = (updated: Collection) => {
    setCollections(prev => prev.map(c => c.id === updated.id ? updated : c));
  };
  const handleAdminDeleteCollection = (id: string) => {
    setCollections(prev => prev.filter(c => c.id !== id));
  };

  // Admin Resource callbacks
  const handleAdminAddResource = (newRes: Resource) => {
    setResources(prev => [...prev, newRes]);
  };
  const handleAdminUpdateResource = (updated: Resource) => {
    setResources(prev => prev.map(r => r.id === updated.id ? updated : r));
  };
  const handleAdminDeleteResource = (id: string) => {
    setResources(prev => prev.filter(r => r.id !== id));
  };

  // Admin Prompt callbacks
  const handleAdminAddPrompt = (newPrompt: Prompt) => {
    setPrompts(prev => [...prev, newPrompt]);
  };
  const handleAdminDeletePrompt = (id: string) => {
    setPrompts(prev => prev.filter(p => p.id !== id));
  };

  // Route back directly from landing headers
  const handleSelectMenuCategoryPage = (catId: string) => {
    setSelectedCategory(catId);
    setActiveTab('browse');
    setBrowseSectionTab('all');
  };

  // Filter skills corpus dynamically to display on "browse"
  const filteredSkills = skills.filter((item) => {
    // 1. Must be approved/active in live store
    if (item.status !== 'approved') return false;

    // 2. Search box string matching
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    // 3. Category selector
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

    // 4. Tag selector
    const matchesTag = selectedTag === 'all' || item.tags.includes(selectedTag);

    // 5. Featured tab filters
    if (browseSectionTab === 'featured') {
      if (!item.featured) return false;
    }

    // 6. Trending tab filters (Today, Week, Month)
    if (browseSectionTab === 'trending') {
      if (trendingPeriod === 'today' && !item.trendingToday) return false;
      if (trendingPeriod === 'week' && !item.trendingWeek) return false;
      if (trendingPeriod === 'month' && !item.trendingMonth) return false;
    }

    return matchesSearch && matchesCategory && matchesTag;
  });

  // Sort logic mapping
  const sortedSkills = [...filteredSkills].sort((a, b) => {
    switch (sortBy) {
      case 'stars-asc':
        return a.stars - b.stars;
      case 'forks-desc':
        return b.forks - a.forks;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'updated-desc':
        return new Date(b.updated).getTime() - new Date(a.updated).getTime();
      case 'stars-desc':
      default:
        return b.stars - a.stars;
    }
  });

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans antialiased text-zinc-950 selection:bg-blue-600/10 selection:text-blue-600">
      

      {/* Dynamic Header Component */}
      {activeTab !== 'admin' && (
        <Header 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          bookmarks={bookmarks}
          onOpenBookmark={(sk) => {
            setSelectedSkill(sk);
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          language={language}
          setLanguage={setLanguage}
          theme={theme}
          setTheme={setTheme}
        />
      )}

      {/* Main Container Core */}
      <main className="flex-1">
        
        {/* Render Hero element solely on main Browse and Landing views */}
        {activeTab === 'browse' && (
          <Hero 
            onBrowseClick={() => {
              const el = document.getElementById('browse-directory-anchor');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onSubmitSkillClick={() => setActiveTab('submit')}
            totalSkills={skills.filter(s => s.status === 'approved').length}
            totalCategories={categories.length}
            language={language}
          />
        )}

        {/* Dynamic Pages wrapper */}
        <div className={activeTab === 'admin' ? "fixed inset-0 z-50 w-screen h-screen bg-white flex flex-col min-h-0" : "mx-auto max-w-7xl px-4 pt-8 pb-10 sm:px-6 lg:px-8"}>
          
          {selectedSkill ? (
            <div id="skill-details-container" className="scroll-mt-20 animate-in fade-in duration-200">
              <SkillDetailsModal 
                key={selectedSkill?.id}
                skill={selectedSkill}
                allSkills={skills}
                onClose={() => {
                  setSelectedSkill(null);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                onSelectSkill={(sims) => {
                  setSelectedSkill(sims);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                isBookmarked={bookmarks.some(b => b.id === selectedSkill.id)}
                onToggleBookmark={handleToggleBookmark}
              />
            </div>
          ) : (
            <>
              {/* TAB 1: Main Browse list */}
              {activeTab === 'browse' && (
            <div id="browse-directory-anchor" className="space-y-8 animate-in fade-in duration-200">
              
              {/* Search Control Board */}
              <SearchSection 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
                sortBy={sortBy}
                setSortBy={setSortBy}
                categories={categories}
                availableTags={availableTags}
              />

              {/* Sub tabs filtering selector inside directory */}
              <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] border-t border-b border-zinc-200/80 bg-white dark:bg-zinc-950 py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-row items-center justify-between gap-4">
                  
                  {/* Visual directory subtabs */}
                  <div className="flex-1 min-w-0 overflow-x-auto no-scrollbar">
                    <div className="flex items-center space-x-1.5 bg-zinc-100 p-1 rounded-lg w-fit">
                      <button
                        onClick={() => setBrowseSectionTab('all')}
                        className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap ${
                          browseSectionTab === 'all' 
                            ? 'bg-white text-zinc-950 shadow-sm' 
                            : 'text-zinc-500 hover:text-zinc-900'
                        }`}
                      >
                        <span>{language === 'en' ? "Browse All" : "सभी ब्राउज़ करें"}</span>
                      </button>

                      <button
                        onClick={() => setBrowseSectionTab('featured')}
                        className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap ${
                          browseSectionTab === 'featured' 
                            ? 'bg-white text-zinc-950 shadow-sm font-bold text-blue-600' 
                            : 'text-zinc-500 hover:text-zinc-900'
                        }`}
                      >
                        <Award className="h-3.5 w-3.5 mr-0.5 text-blue-500" />
                        <span>{language === 'en' ? "Featured Claude Skills" : "चुनिंदा क्लॉड स्किल्स"}</span>
                      </button>

                      <button
                        onClick={() => setBrowseSectionTab('trending')}
                        className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap ${
                          browseSectionTab === 'trending' 
                            ? 'bg-white text-zinc-950 shadow-sm font-bold text-amber-600' 
                            : 'text-zinc-500 hover:text-zinc-900'
                        }`}
                      >
                        <TrendingUp className="h-3.5 w-3.5 mr-0.5 text-amber-500" />
                        <span>{language === 'en' ? "Trending Repos" : "ट्रेंडिंग रिपोजिटरी"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Optional controllers based on subtab */}
                  <div className="flex items-center space-x-4 shrink-0 ml-auto">
                    
                    {/* If in trending mode, render sub-tab filtersToday/Week/Month */}
                    {browseSectionTab === 'trending' && (
                      <div className="flex items-center space-x-1 border-r border-zinc-200 pr-4">
                        {(['today', 'week', 'month'] as const).map((period) => (
                          <button
                            key={period}
                            onClick={() => setTrendingPeriod(period)}
                            className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded cursor-pointer transition-all ${
                              trendingPeriod === period 
                                ? 'bg-amber-100 text-amber-800 font-bold border border-amber-200' 
                                : 'text-zinc-550 border border-transparent hover:text-zinc-950'
                            }`}
                          >
                            {period}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Grid/Table visual layout switches */}
                    <div className="flex items-center border border-zinc-200 rounded-lg p-0.5 bg-zinc-100">
                      <button
                        onClick={() => setLayoutMode('grid')}
                        className={`p-1.5 rounded-md transition-all ${
                          layoutMode === 'grid' 
                            ? 'bg-white text-zinc-900 shadow-sm' 
                            : 'text-zinc-400 hover:text-zinc-700'
                        }`}
                        title="Card block view layout grid"
                      >
                        <LayoutGrid className="h-3.5 w-3.5" />
                      </button>
                      
                      <button
                        onClick={() => setLayoutMode('table')}
                        className={`p-1.5 rounded-md transition-all ${
                          layoutMode === 'table' 
                            ? 'bg-white text-zinc-900 shadow-sm' 
                            : 'text-zinc-400 hover:text-zinc-700'
                        }`}
                        title="Compact table visual index overview"
                      >
                        <Table className="h-3.5 w-3.5" />
                      </button>
                    </div>

                  </div>

                </div>
              </div>

              {/* RENDER LOGIC DIRECTORY: Grid visual Cards layout vs Compact Table list */}
              {layoutMode === 'table' ? (
                <LatestReposTable 
                  skills={sortedSkills} 
                  onOpenDetails={(sk) => setSelectedSkill(sk)} 
                />
              ) : (
                <>
                  {sortedSkills.length === 0 ? (
                    <div className="py-20 text-center rounded-2xl border border-dashed border-zinc-200/80 bg-white">
                      <div className="max-w-xs mx-auto space-y-2">
                        <p className="text-zinc-900 font-bold">No active skills matches filters.</p>
                        <p className="text-zinc-450 text-xs text-zinc-400">
                          Try adjusting search triggers or clear tag badges. Submissions can be force approved in the Admin console.
                        </p>
                        <button
                          onClick={() => {
                            setSelectedCategory('all');
                            setSelectedTag('all');
                            setSearchQuery('');
                          }}
                          className="mt-4 px-3 py-1 bg-zinc-90 w-auto hover:bg-zinc-100 border border-zinc-200 text-xs font-semibold rounded text-zinc-700 font-sans"
                        >
                          Clear Filters
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
                      {sortedSkills.map((skill) => {
                        const isSaved = bookmarks.some((b) => b.id === skill.id);
                        return (
                          <div
                            key={skill.id}
                            className="group relative rounded-xl border border-zinc-200 bg-white p-5 hover:border-zinc-350 transition-all duration-200 flex flex-col justify-between"
                            id={`skill-card-${skill.id}`}
                          >
                            
                            {/* Card Content parameters */}
                            <div className="space-y-3.5">
                              
                              {/* Header category badge and bookmark action */}
                              <div className="flex items-center justify-between">
                                <span className="capitalize px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-zinc-100 border border-zinc-200 text-zinc-700 select-none">
                                  {skill.category}
                                </span>
                                
                                <button
                                  onClick={() => handleToggleBookmark(skill)}
                                  className="text-zinc-400 hover:text-blue-600 transition-colors"
                                  title={isSaved ? "Remove Bookmark" : "Save Skill"}
                                >
                                  <Bookmark className={`h-4.5 w-4.5 ${isSaved ? 'fill-blue-500 text-blue-500' : ''}`} />
                                </button>
                              </div>

                              {/* Title description block info */}
                              <div>
                                <h2 className="text-sm font-extrabold text-zinc-950 group-hover:text-blue-600 transition-colors flex items-center">
                                  <span>{skill.name}</span>
                                </h2>
                                <p className="text-xs text-zinc-500 leading-relaxed font-sans mt-1.5 line-clamp-2">
                                  {skill.description}
                                </p>
                              </div>

                              {/* tags labels array list */}
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {skill.tags.slice(0, 3).map((tag) => (
                                  <span 
                                    key={tag}
                                    onClick={() => setSelectedTag(tag)}
                                    className="font-mono text-[9px] uppercase font-bold text-zinc-400 hover:text-zinc-600 cursor-pointer"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>

                            </div>

                            {/* Card footer details stats buttons indicators */}
                            <div className="mt-6 pt-3.5 border-t border-zinc-100/80 flex items-center justify-between text-xs">
                              
                              {/* Git metrics stars count */}
                              <div className="flex items-center space-x-3 text-zinc-400 font-mono font-medium text-[11px]">
                                <span className="flex items-center space-x-1 text-zinc-900 font-bold">
                                  <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                                  <span>{skill.stars.toLocaleString()}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <GitFork className="h-3 w-3" />
                                  <span>{skill.forks}</span>
                                </span>
                              </div>

                              {/* Action buttons views details and branch repo */}
                              <div className="flex items-center space-x-1.5">
                                <button
                                  onClick={() => setSelectedSkill(skill)}
                                  className="px-3 py-1 bg-zinc-900 border border-zinc-950 text-white rounded font-semibold text-[11px] hover:bg-zinc-800 transition-all"
                                >
                                  View Docs
                                </button>
                                <a
                                  href={skill.repoUrl}
                                  target="_blank"
                                  referrerPolicy="no-referrer"
                                  rel="noreferrer"
                                  className="p-1 px-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-transparent hover:border-zinc-200 rounded text-[11px]"
                                  title="Browse source code branch"
                                >
                                  <Github className="h-3.5 w-3.5" />
                                </a>
                              </div>

                            </div>

                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}

            </div>
          )}

          {/* TAB 2: Categories index dashboard */}
          {activeTab === 'categories' && (
            <div className="animate-in fade-in duration-200">
              <CategoryGrid 
                categories={categories} 
                onSelectCategory={handleSelectMenuCategoryPage} 
              />
            </div>
          )}

          {/* TAB 3: Curated editorial Collections list */}
          {activeTab === 'collections' && (
            <div className="animate-in fade-in duration-200">
              <CollectionList 
                collections={collections} 
                skills={skills} 
                onOpenSkillDetails={(sk) => setSelectedSkill(sk)} 
              />
            </div>
          )}

          {/* TAB 4: Helpful documentation Resource library list */}
          {activeTab === 'resources' && (
            <div className="animate-in fade-in duration-200">
              <ResourceLibrary resources={resources} />
            </div>
          )}

          {/* TAB 5: Writing / Coding Prompts checklist copy layout */}
          {activeTab === 'prompts' && (
            <div className="animate-in fade-in duration-200">
              <PromptLibrary 
                prompts={prompts} 
                onUpdatePrompt={(updatedPrompt) => {
                  setPrompts(prev => prev.map(p => p.id === updatedPrompt.id ? updatedPrompt : p));
                }}
              />
            </div>
          )}

          {/* TAB 6: Submit a Skill input forms */}
          {activeTab === 'submit' && (
            <div className="animate-in fade-in duration-200">
              <SubmitForm 
                categories={categories} 
                onSubmitCreate={handleUserCreateSubmission} 
              />
            </div>
          )}

          {/* TAB 7: Admin Dashboard (hidden, accessible via #admin URL) */}
          {activeTab === 'admin' && (
            <div className="animate-in fade-in duration-200 flex-1 flex flex-col min-h-0">
              <AdminDashboard 
                skills={skills}
                submissions={submissions}
                categories={categories}
                collections={collections}
                resources={resources}
                prompts={prompts}
                onApproveSubmission={handleAdminApproveSubmission}
                onRejectSubmission={handleAdminRejectSubmission}
                onAddSkill={handleAdminAddSkillDirectly}
                onUpdateSkill={handleAdminUpdateSkill}
                onDeleteSkill={handleAdminDeleteSkill}
                onAddCategory={handleAdminAddCategory}
                onUpdateCategory={handleAdminUpdateCategory}
                onDeleteCategory={handleAdminDeleteCategory}
                onAddCollection={handleAdminAddCollection}
                onUpdateCollection={handleAdminUpdateCollection}
                onDeleteCollection={handleAdminDeleteCollection}
                onAddResource={handleAdminAddResource}
                onUpdateResource={handleAdminUpdateResource}
                onDeleteResource={handleAdminDeleteResource}
                onAddPrompt={handleAdminAddPrompt}
                onUpdatePrompt={(updatedPrompt) => {
                  setPrompts(prev => prev.map(p => p.id === updatedPrompt.id ? updatedPrompt : p));
                }}
                onDeletePrompt={handleAdminDeletePrompt}
                onClose={() => { setActiveTab('browse'); window.location.hash = ''; }}
              />
            </div>
          )}
            </>
          )}

        </div>
      </main>

      {/* Footer Divider Line */}
      {activeTab !== 'admin' && (
        <div className="w-full border-t border-zinc-200/80 mb-10" />
      )}

      {/* Modern Boxed Footer */}
      {activeTab !== 'admin' && (
        <footer className="mx-auto max-w-7xl w-full px-4 pb-10 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-white border border-zinc-200 shadow-sm rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* 1px Particle Dot Grid Background (Fades to left) */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-80"
              style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><rect x='6' y='6' width='1' height='1' fill='%2360a5fa' opacity='0.8'/><rect x='18' y='6' width='1' height='1' fill='%23a78bfa' opacity='0.95'/><rect x='30' y='6' width='1' height='1' fill='%23818cf8' opacity='0.75'/><rect x='42' y='6' width='1' height='1' fill='%2338bdf8' opacity='0.9'/><rect x='6' y='18' width='1' height='1' fill='%23818cf8' opacity='0.9'/><rect x='18' y='18' width='1' height='1' fill='%2338bdf8' opacity='0.7'/><rect x='30' y='18' width='1' height='1' fill='%23a78bfa' opacity='0.85'/><rect x='42' y='18' width='1' height='1' fill='%2360a5fa' opacity='0.95'/><rect x='6' y='30' width='1' height='1' fill='%23a78bfa' opacity='0.85'/><rect x='18' y='30' width='1' height='1' fill='%2360a5fa' opacity='0.9'/><rect x='30' y='30' width='1' height='1' fill='%2338bdf8' opacity='0.8'/><rect x='42' y='30' width='1' height='1' fill='%23818cf8' opacity='0.95'/><rect x='6' y='42' width='1' height='1' fill='%2338bdf8' opacity='0.95'/><rect x='18' y='42' width='1' height='1' fill='%23818cf8' opacity='0.8'/><rect x='30' y='42' width='1' height='1' fill='%2360a5fa' opacity='0.9'/><rect x='42' y='42' width='1' height='1' fill='%23a78bfa' opacity='0.85'/></svg>")`,
                backgroundSize: '48px 48px',
                maskImage: 'linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 70%)',
                WebkitMaskImage: 'linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 70%)',
              }}
            />

            <div className="relative z-10 flex flex-col items-center md:items-start space-y-2">
              <div className="flex items-center">
                <svg
                  viewBox="0 0 2583.89 477.85"
                  className="h-6 w-auto text-zinc-950 dark:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon fill="#7C3AED" points="172.95,29.01 47.82,364.95 -0,364.95 125.21,29.01" />
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M439.51 237.71c0,21.09 -2.82,39.83 -8.39,56.14 -5.57,16.23 -13.57,30.02 -23.99,41.39 -10.43,11.29 -23.05,19.84 -37.86,25.71 -14.82,5.8 -31.36,8.7 -49.63,8.7 -17.09,0 -32.85,-2.9 -47.35,-8.7 -14.5,-5.88 -26.97,-14.42 -37.55,-25.71 -10.58,-11.37 -18.81,-25.17 -24.69,-41.47 -5.88,-16.31 -8.78,-35.05 -8.78,-56.21 0,-27.99 4.78,-51.67 14.35,-71.03 9.64,-19.44 23.36,-34.26 41.31,-44.45 17.96,-10.27 39.28,-15.37 63.98,-15.37 23.36,0 43.9,5.09 61.54,15.37 17.8,10.19 31.67,25.01 41.79,44.45 10.19,19.37 15.29,43.04 15.29,71.19zm-186.35 0c0,18.81 2.35,35.05 6.97,48.69 4.78,13.56 12.08,23.91 22.03,31.13 9.96,7.21 22.73,10.82 38.26,10.82 15.52,0 28.3,-3.61 38.26,-10.82 9.96,-7.21 17.25,-17.57 21.95,-31.13 4.63,-13.64 6.98,-29.87 6.98,-48.69 0,-19.05 -2.43,-35.2 -7.21,-48.45 -4.78,-13.25 -12.07,-23.44 -21.95,-30.42 -9.88,-7.06 -22.66,-10.59 -38.34,-10.59 -23.52,0 -40.53,7.84 -51.11,23.44 -10.59,15.6 -15.84,37.55 -15.84,66.01zm376.39 -131c30.34,0 54.88,10.97 73.46,32.85 18.58,21.8 27.91,54.49 27.91,98.16 0,28.69 -4.31,52.92 -12.85,72.68 -8.55,19.68 -20.54,34.5 -35.83,44.46 -15.29,9.88 -33.17,14.81 -53.63,14.81 -12.62,0 -23.84,-1.64 -33.56,-5.02 -9.64,-3.37 -17.87,-7.76 -24.69,-13.01 -6.82,-5.33 -12.62,-11.13 -17.56,-17.48l-3.06 0c0.71,5.56 1.41,12.15 2.04,19.76 0.7,7.6 1.02,14.42 1.02,20.46l0 103.49 -50.49 0 0 -366.44 41.16 0 7.05 33.95 2.28 0c4.94,-7.14 10.82,-13.65 17.72,-19.52 6.9,-5.88 15.13,-10.59 24.77,-14.04 9.72,-3.37 21.17,-5.09 34.26,-5.09zm-12.31 41.39c-15.45,0 -27.91,2.98 -37.24,9.01 -9.33,5.96 -16.07,14.97 -20.39,26.97 -4.23,12 -6.51,27.21 -6.82,45.55l0 7.84c0,19.45 1.96,35.91 5.96,49.39 4,13.49 10.74,23.75 20.39,30.73 9.56,7.06 22.58,10.58 39.04,10.58 13.88,0 25.24,-3.84 34.18,-11.45 9.02,-7.76 15.68,-18.42 19.99,-32.06 4.47,-13.64 6.66,-29.56 6.66,-47.67 0,-27.67 -5.01,-49.31 -15.05,-65.07 -10.04,-15.91 -25.64,-23.83 -46.73,-23.83zm277.14 -41.39c22.34,0 41.55,4.62 57.55,13.95 16.07,9.33 28.46,22.5 37.08,39.67 8.7,17.17 13.01,37.47 13.01,61.07l0 27.68 -170.44 0c0.63,25.79 7.45,45.63 20.46,59.35 13.09,13.72 31.36,20.62 54.8,20.62 16.15,0 30.58,-1.56 43.27,-4.62 12.78,-3.06 25.95,-7.6 39.51,-13.64l0 41.78c-12.7,5.88 -25.56,10.19 -38.57,12.93 -13.01,2.75 -28.54,4.16 -46.57,4.16 -24.38,0 -46.02,-4.86 -64.83,-14.5 -18.74,-9.72 -33.4,-24.22 -43.98,-43.51 -10.59,-19.37 -15.84,-43.2 -15.84,-71.66 0,-28.38 4.78,-52.45 14.35,-72.21 9.56,-19.83 22.97,-34.97 40.14,-45.39 17.25,-10.43 37.24,-15.68 60.05,-15.68zm-0.08 38.89c-17.8,0 -31.98,5.72 -42.57,17.25 -10.66,11.37 -17.01,27.75 -18.97,49l118.85 0c0,-13.17 -2.12,-24.61 -6.35,-34.42 -4.16,-9.88 -10.43,-17.64 -18.82,-23.29 -8.39,-5.72 -19.05,-8.54 -32.14,-8.54zm298.7 -38.89c29.32,0 51.9,7.37 67.66,22.03 15.76,14.66 23.68,38.26 23.68,70.95l0 165.27 -50.25 0 0 -157.82c0,-19.76 -4.16,-34.5 -12.47,-44.3 -8.23,-9.8 -21.33,-14.74 -39.2,-14.74 -25.79,0 -43.59,7.68 -53.39,23.13 -9.72,15.29 -14.58,37.4 -14.58,66.17l0 127.55 -50.49 0 0 -253.54 39.82 0 7.13 33.87 2.82 0c5.57,-8.86 12.54,-16.07 20.77,-21.72 8.31,-5.72 17.49,-10.04 27.52,-12.78 9.96,-2.74 20.3,-4.08 30.97,-4.08zm384.24 156.17c0,18.19 -4.63,35.44 -13.96,51.75 -9.17,16.31 -23.36,29.56 -42.65,39.75 -19.37,10.19 -44.38,15.29 -75.19,15.29 -15.29,0 -28.61,-0.7 -40.14,-2.2 -11.37,-1.33 -22.19,-3.6 -32.3,-6.74 -10.04,-3.14 -20.38,-7.21 -30.97,-12.16l0 -80.98c18.19,9.09 36.53,16.07 54.95,21.01 18.58,4.78 35.36,7.21 50.41,7.21 9.17,0 16.54,-1.1 22.11,-3.22 5.64,-2.2 9.88,-5.17 12.7,-8.93 2.82,-3.84 4.23,-8.08 4.23,-12.78 0,-5.96 -2.04,-10.97 -6.19,-15.05 -4,-4.16 -10.43,-8.39 -19.29,-12.7 -8.7,-4.39 -20.46,-9.88 -35.2,-16.46 -12.62,-5.64 -23.91,-11.6 -33.95,-17.88 -9.96,-6.27 -18.5,-13.33 -25.56,-21.17 -7.05,-7.92 -12.47,-17.09 -16.23,-27.52 -3.76,-10.51 -5.64,-22.97 -5.64,-37.32 0,-21.72 5.33,-39.83 15.99,-54.33 10.66,-14.66 25.48,-25.64 44.45,-33.01 18.97,-7.45 41,-11.13 66.17,-11.13 21.87,0 41.63,2.43 59.11,7.37 17.64,4.78 33.32,10.35 47.12,16.62l-27.67 70.17c-14.51,-6.59 -28.69,-11.84 -42.65,-15.68 -13.88,-4 -26.81,-5.96 -38.81,-5.96 -7.76,0 -14.19,0.94 -19.29,2.82 -5.1,1.8 -8.78,4.39 -11.13,7.68 -2.27,3.29 -3.45,6.98 -3.45,11.13 0,5.33 2.04,10.03 6.12,14.19 4.16,4 10.9,8.47 20.38,13.41 9.56,4.78 22.65,10.98 39.28,18.5 16.31,7.21 30.18,15.13 41.63,23.76 11.45,8.7 20.23,18.89 26.34,30.65 6.19,11.69 9.25,26.34 9.25,43.9zm136.89 -114.78c0,10.66 -0.47,22.42 -1.49,35.28 -0.86,12.86 -2.12,24.62 -3.68,35.28l1.88 0c2.51,-3.76 5.33,-8.08 8.47,-12.86 3.14,-4.94 6.43,-9.88 9.88,-14.82 3.45,-5.09 6.58,-9.33 9.4,-12.78l58.33 -73.38 100.19 0 -90.32 110.46 95.96 149.67 -102.55 0 -56.91 -93.14 -29.17 22.03 0 71.11 -90.32 0 0 -357.5 90.32 0 0 140.65zm309.99 -43.28l0 260.13 -89.93 0 0 -260.13 89.93 0zm-44.61 -104.82c12.86,0 23.99,2.67 33.48,8 9.56,5.25 14.35,15.92 14.35,31.91 0,15.29 -4.78,25.72 -14.35,31.28 -9.48,5.49 -20.62,8.23 -33.48,8.23 -13.17,0 -24.38,-2.74 -33.71,-8.23 -9.25,-5.56 -13.88,-15.99 -13.88,-31.28 0,-15.99 4.62,-26.65 13.88,-31.91 9.33,-5.33 20.54,-8 33.71,-8zm197.02 364.95l-89.85 0 0 -357.5 89.85 0 0 357.5zm151.94 0l-89.85 0 0 -357.5 89.85 0 0 357.5zm255.42 -79.97c0,16.31 -3.68,30.89 -11.13,43.82 -7.29,12.86 -19.05,22.89 -35.2,30.03 -16.23,7.21 -37.48,10.82 -63.74,10.82 -18.5,0 -35.04,-1.02 -49.63,-3.06 -14.58,-2.04 -29.4,-5.88 -44.45,-11.52l0 -71.97c16.62,7.6 33.4,13.01 50.25,16.31 17.01,3.29 30.42,4.94 40.14,4.94 10.04,0 17.41,-1.1 22.03,-3.37 4.78,-2.2 7.13,-5.49 7.13,-9.88 0,-3.76 -1.57,-7.05 -4.7,-9.88 -3.14,-2.82 -8.7,-5.96 -16.78,-9.41 -8,-3.45 -19.37,-8.15 -34.1,-14.11 -14.42,-5.96 -26.42,-12.46 -35.98,-19.52 -9.56,-7.05 -16.7,-15.52 -21.48,-25.4 -4.63,-9.88 -6.98,-21.87 -6.98,-35.91 0,-25.48 9.8,-44.61 29.4,-57.47 19.6,-12.86 45.55,-19.29 77.85,-19.29 17.25,0 33.4,1.88 48.37,5.64 15.05,3.76 30.73,9.25 47.04,16.39l-24.46 57.94c-12.86,-6.04 -25.87,-10.74 -39.04,-14.19 -13.17,-3.37 -23.68,-5.1 -31.44,-5.1 -6.9,0 -12.31,0.94 -16.23,2.82 -3.84,1.8 -5.8,4.55 -5.8,8.08 0,3.06 1.33,5.8 3.92,8.39 2.67,2.51 7.76,5.33 15.21,8.47 7.6,3.13 18.58,7.68 33.01,13.64 15.05,6.04 27.52,12.54 37.4,19.52 9.88,7.05 17.25,15.52 22.11,25.4 4.86,9.88 7.29,22.5 7.29,37.86z"
                  />
                </svg>
              </div>
              <p className="text-[11px] text-zinc-500 max-w-sm text-center md:text-left leading-relaxed">
                {language === 'en' 
                  ? "Unified Model Context Protocol (MCP) directory and premium AI developer utility hub."
                  : "यूनिफाइड मॉडल कॉन्टेक्स्ट प्रोटोकॉल (MCP) निर्देशिका और प्रीमियम AI डेवलपर उपयोगिता हब।"}
              </p>
            </div>
            
            <div className="relative z-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-zinc-500">
              <button onClick={() => { setSelectedSkill(null); setActiveTab('browse'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-600 transition-colors cursor-pointer">
                {language === 'en' ? "Browse" : "ब्राउज़"}
              </button>
              <button onClick={() => { setSelectedSkill(null); setActiveTab('categories'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-600 transition-colors cursor-pointer">
                {language === 'en' ? "Categories" : "श्रेणियां"}
              </button>
              <button onClick={() => { setSelectedSkill(null); setActiveTab('collections'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-600 transition-colors cursor-pointer">
                {language === 'en' ? "Collections" : "संग्रह"}
              </button>
              <button onClick={() => { setSelectedSkill(null); setActiveTab('resources'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-600 transition-colors cursor-pointer">
                {language === 'en' ? "Resources" : "संसाधन"}
              </button>
              <button onClick={() => { setSelectedSkill(null); setActiveTab('prompts'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-600 transition-colors cursor-pointer">
                {language === 'en' ? "Prompts" : "प्रॉम्प्ट्स"}
              </button>
            </div>
            
            <div className="relative z-10 flex flex-col items-center md:items-end text-[10px] text-zinc-400 space-y-1 shrink-0">
              <span>
                &copy; {new Date().getFullYear()} openSkills. All rights reserved.
              </span>
              <span>
                Made for the AI community.
              </span>
            </div>
          </div>
        </footer>
      )}

    </div>
  );
}
