import React, { useState } from 'react';
import { 
  Bot, 
  Search, 
  Bookmark, 
  PlusCircle, 
  Menu, 
  X, 
  Terminal, 
  ShieldAlert, 
  BookOpen, 
  FolderHeart,
  Grid,
  Globe,
  Sun,
  Moon
} from 'lucide-react';
import { Skill } from '../types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { translations } from '../translations';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookmarks: Skill[];
  onOpenBookmark: (skill: Skill) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export default function Header({ 
  activeTab, 
  setActiveTab, 
  bookmarks, 
  onOpenBookmark,
  searchQuery,
  setSearchQuery,
  language,
  setLanguage,
  theme,
  setTheme
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookmarksDrawerOpen, setBookmarksDrawerOpen] = useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const input = document.getElementById('header-search-input');
        input?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const t = translations[language];

  const navItems = [
    { id: 'browse', label: t.skills, icon: CompassIcon },
    { id: 'categories', label: t.categories, icon: Grid },
    { id: 'collections', label: t.collections, icon: FolderHeart },
    { id: 'resources', label: t.resources, icon: BookOpen },
    { id: 'prompts', label: t.prompts, icon: Terminal },
  ];

  function CompassIcon(props: any) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left branding */}
        <a 
          href="https://www.openskills.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex cursor-pointer items-center space-x-2.5 group no-underline"
          id="branding-logo"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm ring-1 ring-blue-500">
            <Bot className="h-5.5 w-5.5 text-white" />
          </div>
          <span className="font-sans font-bold tracking-tight text-zinc-950 text-lg group-hover:text-blue-600 transition-colors">
            openSkills
          </span>
        </a>

        {/* Center Nav Link Items (Desktop) */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Button
                key={item.id}
                id={`nav-${item.id}`}
                variant={isActive ? "secondary" : "ghost"}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 h-8 text-xs font-semibold cursor-pointer`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Button>
            );
          })}
        </nav>

        {/* Right Nav Options (Desktop) */}
        <div className="hidden md:flex items-center space-x-3 font-sans">
          <div className="relative">
            <Input
              id="header-search-input"
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'browse') {
                  setActiveTab('browse');
                }
              }}
              className="w-48 lg:w-56 h-9 pl-8 pr-7 bg-zinc-50 hover:bg-zinc-100 focus:bg-white text-xs font-medium transition-all duration-200"
            />
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400 pointer-events-none" />
            {searchQuery ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-2 h-full w-4 text-zinc-400 hover:text-zinc-700 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            ) : (
              <kbd className="absolute right-2 top-2.5 hidden lg:inline-flex h-4 select-none items-center gap-0.5 rounded border border-zinc-150 bg-white px-1 font-mono text-[8px] font-medium text-zinc-400">
                ⌘K
              </kbd>
            )}
          </div>

          {/* Bookmarks Toggle with Badge */}
          <DropdownMenu open={bookmarksDrawerOpen} onOpenChange={setBookmarksDrawerOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                id="toolbar-bookmarks-btn"
                variant="outline"
                size="icon"
                className={`relative h-9 w-9 cursor-pointer transition-colors ${
                  bookmarksDrawerOpen 
                    ? 'border-zinc-900 bg-zinc-50 text-zinc-950' 
                    : 'border-zinc-200 bg-white text-zinc-700'
                }`}
              >
                <Bookmark className={`h-4.5 w-4.5 ${bookmarks.length > 0 ? 'fill-blue-500 text-blue-500' : ''}`} />
                {bookmarks.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 font-sans text-[10px] font-bold text-white shadow-sm animate-pulse">
                    {bookmarks.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent id="bookmarks-dropdown-drawer" align="end" className="w-80 p-4 bg-white">
              <DropdownMenuLabel className="flex items-center justify-between font-normal pb-2 mb-2 border-b border-zinc-105 p-0">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  {t.savedSkills} ({bookmarks.length})
                </span>
              </DropdownMenuLabel>
              {bookmarks.length === 0 ? (
                <div className="py-6 text-center text-zinc-400 text-xs">
                  {t.noBookmarked}
                </div>
              ) : (
                <div className="max-h-60 overflow-y-auto space-y-2.5">
                  {bookmarks.map((skill) => (
                    <DropdownMenuItem 
                      key={skill.id}
                      onClick={() => {
                        onOpenBookmark(skill);
                        setBookmarksDrawerOpen(false);
                      }}
                      className="group flex flex-col items-start p-2 hover:bg-zinc-50 border border-transparent hover:border-zinc-100 rounded-md cursor-pointer transition-colors focus:bg-zinc-50 focus:text-zinc-950"
                    >
                      <span className="text-xs font-medium text-zinc-900 group-hover:text-blue-600 transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-[10px] text-zinc-400 truncate">
                        by {skill.author}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </div>
              )}
              {bookmarks.length > 0 && (
                <>
                  <DropdownMenuSeparator className="my-2" />
                  <div className="text-center text-[10px] text-zinc-400">
                    {t.savedLocalSession}
                  </div>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dark / Light Mode Switcher */}
          <Button
            id="theme-toggle-btn"
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="h-9 w-9 cursor-pointer border-zinc-200 text-zinc-700 hover:text-zinc-900 transition-colors shrink-0"
            title={theme === 'light' ? (language === 'en' ? "Switch to Dark Mode" : "डार्क मोड चालू करें") : (language === 'en' ? "Switch to Light Mode" : "लाइट मोड चालू करें")}
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4 text-zinc-600" />
            ) : (
              <Sun className="h-4 w-4 text-amber-500 fill-amber-500" />
            )}
          </Button>

          {/* Language Switcher */}
          <Button
            id="language-translator-btn"
            variant="outline"
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center justify-center h-9 px-3.5 text-xs font-semibold rounded-md cursor-pointer border-zinc-200 text-zinc-700 hover:text-zinc-900 gap-1.5 select-none"
            title={language === 'en' ? "हिंदी में अनुवाद करें" : "Translate to English"}
          >
            <Globe className="h-3.5 w-3.5 text-zinc-400 mr-1 shrink-0" />
            <span className={language === 'en' ? 'text-zinc-950 font-black' : 'text-zinc-400'}>EN</span>
            <span className="text-zinc-300">|</span>
            <span className={language === 'hi' ? 'text-zinc-950 font-black' : 'text-zinc-400'}>HI</span>
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center space-x-1.5">
          {/* Quick Search input for mobile inline style */}
          <div className="relative max-w-[100px] xs:max-w-[120px]">
            <Input
              id="header-search-input-mobile"
              type="text"
              placeholder={language === 'en' ? "Search..." : "खोजें..."}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'browse') {
                  setActiveTab('browse');
                }
              }}
              className="w-full h-8 pl-6 pr-5 bg-zinc-50 text-[11px] font-medium transition-all focus:bg-white"
            />
            <Search className="absolute left-1.5 top-2.5 h-3 w-3 text-zinc-400 pointer-events-none" />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-1.5 h-full w-4 text-zinc-400 hover:text-zinc-700 cursor-pointer animate-in fade-in"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          {/* Bookmarks Dropdown for mobile */}
          <DropdownMenu open={bookmarksDrawerOpen} onOpenChange={setBookmarksDrawerOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="p-2 text-zinc-500 hover:text-zinc-900 relative cursor-pointer"
              >
                <Bookmark className={`h-4.5 w-4.5 ${bookmarks.length > 0 ? 'fill-blue-500 text-blue-500' : ''}`} />
                {bookmarks.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-600" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent id="bookmarks-dropdown-drawer-mobile" align="end" className="w-64 p-3 bg-white">
              <DropdownMenuLabel className="text-xs font-semibold uppercase tracking-wider text-zinc-500 pb-2 mb-2 border-b">
                {t.savedSkills} ({bookmarks.length})
              </DropdownMenuLabel>
              {bookmarks.length === 0 ? (
                <div className="py-4 text-center text-zinc-400 text-xs">{language === 'en' ? "No saved bookmarks." : "कोई बुकमार्क नहीं।"}</div>
              ) : (
                <div className="space-y-2">
                  {bookmarks.map(skill => (
                    <DropdownMenuItem 
                      key={skill.id}
                      onClick={() => {
                        onOpenBookmark(skill);
                        setBookmarksDrawerOpen(false);
                      }}
                      className="p-2 bg-zinc-50 rounded-md text-xs font-medium text-zinc-800 cursor-pointer focus:bg-zinc-50 focus:text-zinc-950"
                    >
                      {skill.name} <span className="text-[10px] text-zinc-400">({skill.author})</span>
                    </DropdownMenuItem>
                  ))}
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Mobile Sheet Nav trigger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="p-2 text-zinc-500 hover:text-zinc-950 cursor-pointer"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-6 bg-white">
              <SheetHeader className="border-b pb-4 mb-4">
                <SheetTitle className="text-left font-bold text-zinc-900">{language === 'en' ? "Navigation Menu" : "नेविगेशन मेनू"}</SheetTitle>
              </SheetHeader>
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? "secondary" : "ghost"}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full justify-start space-x-3 px-3 py-2 text-sm font-semibold rounded-md text-left cursor-pointer`}
                    >
                      <Icon className="h-4 w-4 text-zinc-500" />
                      <span>{item.label}</span>
                    </Button>
                  );
                })}
                
                <div className="border-t border-zinc-150 pt-4 mt-4 space-y-2.5 flex flex-col">
                  {/* Mobile Language Selector Toggle */}
                  <div className="flex items-center justify-between text-xs font-semibold px-1 py-1 text-zinc-500">
                    <span>{language === 'en' ? "Language / भाषा:" : "भाषा / Language:"}</span>
                    <div className="flex bg-zinc-100 p-0.5 rounded-lg border border-zinc-200">
                      <button
                        onClick={() => setLanguage('en')}
                        className={`px-2 py-1 rounded text-[10px] cursor-pointer font-bold ${
                          language === 'en' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-400'
                        }`}
                      >
                        EN
                      </button>
                      <button
                        onClick={() => setLanguage('hi')}
                        className={`px-2 py-1 rounded text-[10px] cursor-pointer font-bold ${
                          language === 'hi' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-400'
                        }`}
                      >
                        HI
                      </button>
                    </div>
                  </div>

                  {/* Mobile Theme Selector Toggle */}
                  <div className="flex items-center justify-between text-xs font-semibold px-1 py-1 text-zinc-500">
                    <span>{language === 'en' ? "Theme / थीम:" : "थीम / Theme:"}</span>
                    <div className="flex bg-zinc-100 p-0.5 rounded-lg border border-zinc-200">
                      <button
                        onClick={() => setTheme('light')}
                        className={`px-2 py-1 rounded text-[10px] cursor-pointer font-bold ${
                          theme === 'light' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-400'
                        }`}
                      >
                        LIGHT
                      </button>
                      <button
                        onClick={() => setTheme('dark')}
                        className={`px-2 py-1 rounded text-[10px] cursor-pointer font-bold ${
                          theme === 'dark' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-400'
                        }`}
                      >
                        DARK
                      </button>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      setActiveTab('submit');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full space-x-2 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-md text-xs font-semibold cursor-pointer"
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span>{t.submitSkill}</span>
                  </Button>


                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
