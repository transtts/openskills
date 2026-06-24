import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Tag, 
  ArrowUpDown, 
  Grid2X2, 
  Clock, 
  Sparkles, 
  Trash2, 
  X
} from 'lucide-react';
import { Category } from '../types';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface SearchSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  categories: Category[];
  availableTags: string[];
}

export default function SearchSection({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedTag,
  setSelectedTag,
  sortBy,
  setSortBy,
  categories,
  availableTags
}: SearchSectionProps) {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('claude_hub_recent_searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const saveSearchQuery = (query: string) => {
    if (!query.trim()) return;
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item.toLowerCase() !== query.toLowerCase());
      const updated = [query, ...filtered].slice(0, 5); // Max 5 items
      localStorage.setItem('claude_hub_recent_searches', JSON.stringify(updated));
      return updated;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('claude_hub_recent_searches');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveSearchQuery(searchQuery);
    }
  };

  const trendingSearches = ['mcp', 'postgres', 'puppeteer', 'sandbox', 'planning'];

  const handleTrendingClick = (term: string) => {
    setSearchQuery(term);
    saveSearchQuery(term);
  };

  const handleClearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTag('all');
  };

  const isFiltered = searchQuery || selectedCategory !== 'all' || selectedTag !== 'all';

  return (
    <div id="filter-hub-container" className="bg-white border-b border-zinc-200/80 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Filter & Search Selection Panel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-sans">
          
          {/* Form Option 1: Category dropdown */}
          <div className="flex flex-col space-y-1.5">
            <label className="font-semibold text-zinc-500 uppercase tracking-wider text-[10px]">
              Category Filtre
            </label>
            <div className="relative">
              <Select
                value={selectedCategory}
                onValueChange={(val) => setSelectedCategory(val)}
              >
                <SelectTrigger id="filter-category" className="w-full !h-9 text-xs font-medium cursor-pointer bg-white">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Categories 🌐</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name} ({cat.skillsCount})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Form Option 2: Active Tag dropdown list */}
          <div className="flex flex-col space-y-1.5">
            <label className="font-semibold text-zinc-500 uppercase tracking-wider text-[10px]">
              Tag Selector
            </label>
            <div className="relative">
              <Select
                value={selectedTag}
                onValueChange={(val) => setSelectedTag(val)}
              >
                <SelectTrigger id="filter-tag" className="w-full !h-9 text-xs font-medium cursor-pointer bg-white">
                  <SelectValue placeholder="All Tags" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Tags 🏷️</SelectItem>
                  {availableTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      #{tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Form Option 3: Sort selector */}
          <div className="flex flex-col space-y-1.5">
            <label className="font-semibold text-zinc-500 uppercase tracking-wider text-[10px]">
              Sort Order
            </label>
            <div className="relative">
              <Select
                value={sortBy}
                onValueChange={(val) => setSortBy(val)}
              >
                <SelectTrigger id="filter-sort" className="w-full !h-9 text-xs font-medium cursor-pointer bg-white">
                  <SelectValue placeholder="Sort Order" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="stars-desc">Most Stars 🌟 (High to Low)</SelectItem>
                  <SelectItem value="stars-asc">Least Stars</SelectItem>
                  <SelectItem value="forks-desc">Most Forks ⌥</SelectItem>
                  <SelectItem value="name-asc">Alphabetical (A - Z)</SelectItem>
                  <SelectItem value="updated-desc">Recently Updated 📅</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reset button cluster */}
          <div className="flex items-end justify-end">
            {isFiltered ? (
              <Button
                id="clear-filters-btn"
                variant="outline"
                onClick={handleClearAllFilters}
                className="!h-9 w-full cursor-pointer text-xs font-semibold"
              >
                <span>Reset Filters</span>
                <X className="h-3.5 w-3.5" />
              </Button>
            ) : (
              <div className="text-[11px] text-zinc-400 italic text-center w-full pb-2.5">
                Showing all active Claude Skills
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
