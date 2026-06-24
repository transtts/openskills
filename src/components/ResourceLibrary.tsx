import React, { useState } from 'react';
import { 
  BookOpen, 
  ExternalLink,
  Search,
  Video,
  FileText,
  Compass,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { Resource } from '../types';

interface ResourceLibraryProps {
  resources: Resource[];
}

export default function ResourceLibrary({ resources }: ResourceLibraryProps) {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const types = ['all', 'Documentation', 'Guide', 'Article', 'Video'];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video': 
        return <Video className="h-4 w-4 text-rose-500" />;
      case 'Documentation': 
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case 'Guide': 
        return <Compass className="h-4 w-4 text-emerald-500" />;
      case 'Article': 
        return <FileText className="h-4 w-4 text-purple-500" />;
      default: 
        return <GraduationCap className="h-4 w-4 text-zinc-500" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'Video': return 'bg-rose-50 border-rose-100 text-rose-700';
      case 'Documentation': return 'bg-blue-50 border-blue-100 text-blue-700';
      case 'Guide': return 'bg-emerald-50 border-emerald-100 text-emerald-700';
      case 'Article': return 'bg-purple-50 border-purple-100 text-purple-700';
      default: return 'bg-zinc-100 border-zinc-200 text-zinc-700';
    }
  };

  const filteredResources = resources.filter((res) => {
    const matchesType = selectedType === 'all' || res.type === selectedType;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="font-sans">
      
      {/* Title block */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl font-extrabold tracking-tight text-zinc-950 sm:text-3xl">
          Resource Library
        </h2>
        <p className="mt-2.5 text-zinc-505 text-sm text-zinc-500">
          Supercharge your skills with official documentation, tutorial guides, webinars, and developer walkthroughs.
        </p>
      </div>

      {/* Filter and Search Action Row */}
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-zinc-200 pb-5">
        
        {/* Horizontal tabs list of types */}
        <div className="flex items-center space-x-1 overflow-x-auto w-full md:w-auto no-scrollbar pb-1.5 md:pb-0">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors whitespace-nowrap ${
                selectedType === t 
                  ? 'bg-zinc-950 text-white shadow-sm' 
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <span className="capitalize">{t}</span>
            </button>
          ))}
        </div>

        {/* Local Search box */}
        <div className="relative w-full md:w-80">
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-zinc-200 bg-white placeholder-zinc-400 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Filter library articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredResources.length === 0 ? (
          <div className="col-span-full py-16 text-center border border-dashed border-zinc-200 rounded-xl bg-white text-zinc-400">
            <span className="text-xs">No documentation matches filter. Try another keyword.</span>
          </div>
        ) : (
          filteredResources.map((res) => (
            <div
              key={res.id}
              className="group border border-zinc-205 border-zinc-200 bg-white rounded-xl p-5 hover:border-zinc-400 hover:shadow-xs transition-all flex flex-col justify-between"
              id={`resource-card-${res.id}`}
            >
              <div className="space-y-3.5">
                
                {/* Visual Upper Type Badge block */}
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md border text-[10px] font-bold ${getTypeBadgeColor(res.type)}`}>
                    {getTypeIcon(res.type)}
                    <span>{res.type}</span>
                  </span>
                  <span className="text-[11px] text-zinc-400 select-none font-medium">
                    {res.readTime}
                  </span>
                </div>

                {/* Title & info description */}
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 group-hover:text-blue-600 transition-colors">
                    {res.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed font-sans line-clamp-2">
                    {res.description}
                  </p>
                </div>

              </div>

              {/* Bottom author and action */}
              <div className="mt-6 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-400">
                <span className="truncate max-w-[200px]">
                  by {res.author}
                </span>
                
                <a
                  href={res.url}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded font-semibold text-[11px] transition-colors"
                >
                  <span>Open Resource</span>
                  <ExternalLink className="h-3 w-3 text-zinc-500" />
                </a>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
