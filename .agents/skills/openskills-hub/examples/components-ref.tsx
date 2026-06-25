import React from 'react';
import { Sparkles, ArrowRight, Star, Code } from 'lucide-react';

/**
 * OpenSkills Design System Component References
 * This file serves as a blueprint for standard UI styles.
 */

// 1. Premium Glassmorphic Card (Vibrant dark/light mode compatible)
export function SkillCardReference() {
  return (
    <div className="relative group overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:shadow-xl dark:border-zinc-800/80 dark:bg-zinc-900/80 dark:hover:border-indigo-500">
      {/* Decorative Gradient Background overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-indigo-950/20" />
      
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-zinc-100">SQLite File Inspector</h3>
            <span className="text-xs font-medium text-slate-500 dark:text-zinc-500">by modelcontextprotocol</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-500 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded-full">
          <Star className="h-3 w-3 fill-current" />
          <span>842</span>
        </div>
      </div>
      
      <p className="mt-4 text-sm text-slate-600 dark:text-zinc-400 line-clamp-2">
        Enables Claude instances to inspect schema definitions, execute write-safe SQLite queries, and retrieve database metadata.
      </p>
      
      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-1.5">
          <span className="rounded-md bg-slate-100 dark:bg-zinc-850 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-zinc-400">Database</span>
          <span className="rounded-md bg-slate-100 dark:bg-zinc-850 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-zinc-400">SQL</span>
        </div>
        <button className="flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:text-indigo-700 dark:text-indigo-400 dark:group-hover:text-indigo-300">
          <span>Details</span>
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}

// 2. Interactive Installation Script / Terminal Component
export function TerminalBlockReference() {
  const codeText = "npm install -g @modelcontextprotocol/server-postgres";
  
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-900 dark:bg-black">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-2 text-xs font-medium text-slate-400">
        <div className="flex items-center gap-1.5">
          <Code className="h-3.5 w-3.5" />
          <span>Quick Install</span>
        </div>
        <span className="text-[10px] text-slate-600">bash</span>
      </div>
      <div className="p-4 font-mono text-sm text-slate-200 overflow-x-auto whitespace-nowrap">
        <span className="text-indigo-400 select-none mr-2">$</span>
        {codeText}
      </div>
    </div>
  );
}
