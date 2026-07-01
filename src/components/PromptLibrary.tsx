import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Search, 
  ChevronDown,
  ChevronUp,
  FileText,
  Edit3,
  X
} from 'lucide-react';
import { Prompt } from '../types';

interface PromptLibraryProps {
  prompts: Prompt[];
  onUpdatePrompt?: (prompt: Prompt) => void;
}

export default function PromptLibrary({ prompts, onUpdatePrompt }: PromptLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<string>('');

  const categories = ['all', 'Coding', 'Writing', 'Marketing', 'Research', 'Automation'];

  const handleCopyPrompt = async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch (err) {
      console.warn('Clipboard copy failed:', err);
    }
  };

  const handleStartEdit = (id: string, initialContent: string) => {
    setEditingId(id);
    setEditingContent(initialContent);
    // Auto-expand the card when editing starts
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingContent('');
  };

  const handleSaveEdit = (id: string) => {
    const prompt = prompts.find(p => p.id === id);
    if (prompt && onUpdatePrompt) {
      onUpdatePrompt({
        ...prompt,
        content: editingContent
      });
    }
    setEditingId(null);
    setEditingContent('');
  };

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredPrompts = prompts.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="font-sans">
      
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl font-extrabold tracking-tight text-zinc-950 sm:text-3xl">
          Prompt Template Directory
        </h2>
        <p className="mt-2.5 text-sm text-zinc-500">
          Unlock optimized thinking frameworks, system persona templates, and advanced developer logic scripts ready for Claude.
        </p>
      </div>

      {/* Categories and Search Row */}
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-zinc-200 pb-5">
        
        {/* Category Horizontal list */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto no-scrollbar pb-1.5 md:pb-0">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap ${
                selectedCategory === c 
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/10' 
                  : 'text-zinc-650 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <span>{c === 'all' ? 'All Templates' : c}</span>
            </button>
          ))}
        </div>

        {/* Local Search input */}
        <div className="relative w-full md:w-80">
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            className="w-full h-9.5 pl-9.5 pr-3 rounded-lg border border-zinc-200 bg-white placeholder-zinc-400 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search prompt templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

      </div>

      {/* Stacked prompt documents — read-only for users */}
      <div className="space-y-5">
        {filteredPrompts.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-zinc-200 rounded-xl bg-white text-zinc-400">
            <span className="text-xs font-sans">No matching prompt templates found. Try resetting the category.</span>
          </div>
        ) : (
          filteredPrompts.map((p) => {
            const isExpanded = expandedIds.has(p.id);

            return (
              <div
                key={p.id}
                className="group border border-zinc-200 bg-white rounded-xl overflow-hidden transition-all hover:border-zinc-300"
                id={`prompt-card-${p.id}`}
              >
                {/* Card Header */}
                <div className="px-6 pt-5 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    {/* Left: Category + Title + Description */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <span className="capitalize px-2.5 py-0.5 rounded text-[10px] font-bold bg-zinc-100 border border-zinc-200 text-zinc-700">
                          {p.category}
                        </span>
                        <div className="flex items-center space-x-1 text-zinc-400 text-[10px] font-mono select-none">
                          <FileText className="h-3 w-3" />
                          <span>Markdown Template</span>
                        </div>
                      </div>
                      <h3 className="text-base font-bold text-zinc-900 group-hover:text-blue-600 transition-colors">
                        {p.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    {/* Right: Expand button */}
                    {editingId !== p.id && (
                      <div className="flex items-center gap-1.5 shrink-0 pt-1">
                        <button
                          onClick={() => toggleExpand(p.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[11px] font-semibold text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
                          title={isExpanded ? 'Collapse prompt' : 'Expand prompt'}
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="h-3.5 w-3.5" />
                              <span className="hidden sm:inline">Collapse</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-3.5 w-3.5" />
                              <span className="hidden sm:inline">Expand</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Prompt Content Area — markdown-style display */}
                <div className="px-6 pb-1">
                  {editingId === p.id ? (
                    <div className="relative rounded-lg border border-blue-200 overflow-hidden transition-all duration-300">
                      <div className="p-4 bg-zinc-50/50 flex items-start gap-3">
                        <div className="shrink-0 mt-2 w-1 self-stretch rounded-full bg-blue-500" />
                        <textarea
                          className="w-full min-h-[140px] p-3 text-[13px] leading-relaxed text-zinc-800 font-mono bg-white border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-y"
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                          placeholder="Edit your prompt template..."
                          autoFocus
                        />
                      </div>
                    </div>
                  ) : (
                    <div 
                      className={`relative rounded-lg border border-zinc-150 overflow-hidden transition-all duration-300 ${
                        isExpanded ? 'max-h-[600px]' : 'max-h-32'
                      }`}
                    >
                      <div 
                        className="p-4 bg-zinc-50/50 cursor-pointer"
                        onClick={() => toggleExpand(p.id)}
                      >
                        {/* Markdown-style rendering with accent bar */}
                        <div className="flex items-start gap-3">
                          <div className="shrink-0 mt-0.5 w-1 self-stretch rounded-full bg-blue-500/40" />
                          <pre className="whitespace-pre-wrap text-[13px] leading-relaxed text-zinc-700 font-sans select-all break-words flex-1">
                            {p.content}
                          </pre>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer: Tags + Copy */}
                <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-zinc-100 mt-3">
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 items-center">
                    {p.tags.map((tg) => (
                      <span 
                        key={tg} 
                        className="text-[10px] font-mono text-zinc-400 font-medium bg-zinc-50 border border-zinc-100 px-1.5 py-0.5 rounded"
                      >
                        #{tg}
                      </span>
                    ))}
                    <span className="text-[10px] text-zinc-300 ml-1 font-mono">
                      {editingId === p.id ? editingContent.length : p.content.length} chars
                    </span>
                  </div>

                  {/* Actions buttons */}
                  {editingId === p.id ? (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleCancelEdit}
                        className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-md font-semibold text-xs border border-zinc-200 bg-white text-zinc-605 hover:bg-zinc-50 hover:text-zinc-800 transition-colors cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                        <span>Cancel</span>
                      </button>
                      <button
                        onClick={() => handleSaveEdit(p.id)}
                        className="inline-flex items-center gap-1.5 h-8 px-4 rounded-md font-semibold text-xs bg-blue-600 border border-blue-700 text-white hover:bg-blue-700 transition-colors cursor-pointer shadow-sm shadow-blue-500/10"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleStartEdit(p.id, p.content)}
                        className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-md font-semibold text-xs border border-zinc-200 bg-white text-zinc-605 hover:bg-zinc-50 hover:text-zinc-800 transition-colors cursor-pointer"
                      >
                        <Edit3 className="h-3.5 w-3.5 text-zinc-500" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleCopyPrompt(p.content, p.id)}
                        className={`inline-flex items-center gap-1.5 h-8 px-4 rounded-md font-semibold text-xs transition-colors border cursor-pointer ${
                          copiedId === p.id
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                            : 'bg-zinc-900 border-zinc-950 text-white hover:bg-zinc-800'
                        }`}
                        id={`copy-prompt-btn-${p.id}`}
                      >
                        {copiedId === p.id ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copy Prompt</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
