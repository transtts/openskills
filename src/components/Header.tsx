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
  const [desktopBookmarksOpen, setDesktopBookmarksOpen] = useState(false);
  const [mobileBookmarksOpen, setMobileBookmarksOpen] = useState(false);

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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left branding */}
        <a 
          href="https://www.openskills.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex cursor-pointer items-center group no-underline"
          id="branding-logo"
        >
          <svg
            viewBox="0 0 2583.89 477.85"
            className="h-7 w-auto text-zinc-950 dark:text-white transition-transform group-hover:scale-105"
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
        </a>

        {/* Center Nav Link Items (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-1">
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
        <div className="hidden lg:flex items-center space-x-3 font-sans">
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
          <DropdownMenu open={desktopBookmarksOpen} onOpenChange={setDesktopBookmarksOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                id="toolbar-bookmarks-btn"
                aria-label="View saved bookmarks"
                variant="outline"
                size="icon"
                className={`relative h-9 w-9 cursor-pointer transition-colors ${
                  desktopBookmarksOpen 
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
                        setDesktopBookmarksOpen(false);
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
        <div className="flex lg:hidden items-center space-x-1.5">
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
          <DropdownMenu open={mobileBookmarksOpen} onOpenChange={setMobileBookmarksOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="View saved bookmarks"
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
                        setMobileBookmarksOpen(false);
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

          {/* Dark / Light Mode Switcher for mobile/tablet */}
          <Button
            id="theme-toggle-btn-mobile"
            variant="ghost"
            size="icon"
            aria-label="Toggle theme mode"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 text-zinc-550 hover:text-zinc-900 cursor-pointer shrink-0"
            title={theme === 'light' ? (language === 'en' ? "Switch to Dark Mode" : "डार्क मोड चालू करें") : (language === 'en' ? "Switch to Light Mode" : "लाइट मोड चालू करें")}
          >
            {theme === 'light' ? (
              <Moon className="h-4.5 w-4.5 text-zinc-600" />
            ) : (
              <Sun className="h-4.5 w-4.5 text-amber-500 fill-amber-500" />
            )}
          </Button>
          
          {/* Mobile Sheet Nav trigger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
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


                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
