import React, { useState } from 'react';
import { 
  X, 
  Github, 
  Star, 
  GitFork, 
  History, 
  BookOpen, 
  Terminal, 
  Copy, 
  Check, 
  Layers, 
  User, 
  Calendar,
  ExternalLink,
  Info,
  ChevronRight,
  Code
} from 'lucide-react';
import { Skill } from '../types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

interface SkillDetailsModalProps {
  skill: Skill | null;
  allSkills: Skill[];
  onClose: () => void;
  onSelectSkill: (skill: Skill) => void;
  isBookmarked: boolean;
  onToggleBookmark: (skill: Skill) => void;
}

export default function SkillDetailsModal({ 
  skill, 
  allSkills, 
  onClose, 
  onSelectSkill,
  isBookmarked,
  onToggleBookmark
}: SkillDetailsModalProps) {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'installation' | 'usage' | 'examples'>('overview');
  const [copiedText, setCopiedText] = useState<'install' | 'usage' | string | null>(null);

  if (!skill) return null;

  const handleCopy = async (text: string, identifier: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(identifier);
      setTimeout(() => setCopiedText(null), 1800);
    } catch (err) {
      console.warn('Clipboard copy failed:', err);
    }
  };

  // Find 3 related items in identical or near category
  const relatedSkills = allSkills
    .filter(item => item.id !== skill.id && item.status === 'approved' && (item.category === skill.category || item.tags.some(tag => skill.tags.includes(tag))))
    .slice(0, 3);

  const parsedSubTabs: { id: 'overview' | 'installation' | 'usage' | 'examples', label: string, icon: any }[] = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'installation', label: 'Installation', icon: Terminal },
    { id: 'usage', label: 'Usage Guidelines', icon: Code },
    { id: 'examples', label: 'Live Examples', icon: BookOpen }
  ];

  return (
    <div className="w-full bg-white border border-zinc-200 shadow-sm rounded-xl overflow-hidden flex flex-col min-h-[calc(100vh-7.5rem)] animate-in fade-in duration-200">
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50/50 px-6 py-4">
          <div className="flex items-center space-x-3 text-sm">
            <span className="capitalize px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 border border-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/30">
              {skill.category}
            </span>
            <span className="text-zinc-400">/</span>
            <span className="font-mono text-zinc-650 font-semibold">{skill.author}</span>
          </div>
          <div className="flex items-center space-x-2">
            
            {/* Bookmark button */}
            <Button
              onClick={() => onToggleBookmark(skill)}
              variant="outline"
              size="sm"
              className={`h-8.5 px-3 text-xs font-medium border transition-colors ${
                isBookmarked 
                  ? 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 dark:border-blue-900/30 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-900/60 dark:hover:text-blue-200' 
                  : 'border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white'
              }`}
            >
              <Star className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-blue-500 text-blue-500' : ''}`} />
              <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </Button>

            {/* Close button */}
            <Button 
              onClick={onClose} 
              variant="outline"
              size="icon-sm"
              className="flex h-8.5 w-8.5 items-center justify-center rounded-md border border-zinc-200 hover:border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-500 hover:text-zinc-800 transition-colors"
            >
              <X className="h-4.5 w-4.5" />
            </Button>
          </div>
        </div>

        {/* Modal App Header Block */}
        <div className="border-b border-zinc-100 bg-white px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-sans text-2xl font-extrabold tracking-tight text-zinc-950 md:text-3xl">
              {skill.name}
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-zinc-500 max-w-3xl leading-relaxed">
              {skill.description}
            </p>
          </div>
          <div className="flex items-center space-x-3.5 shrink-0 self-start md:self-center">
            <Button 
              asChild
              className="flex items-center space-x-2 h-9 px-4 rounded-md text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-white transition-all shadow-sm"
            >
              <a 
                href={skill.repoUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                <span>GitHub Repository</span>
                <ExternalLink className="h-3 w-3 text-zinc-400" />
              </a>
            </Button>
          </div>
        </div>

        {/* Dynamic Inner Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 flex-1">
          
          {/* LEFT SIDEBAR: Repository Metrics */}
          <div className="border-b lg:border-b-0 lg:border-r border-zinc-200 bg-zinc-50/40 p-5 space-y-6 text-xs">
            
            {/* Stats list */}
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 font-sans mb-3">
                Repository Information
              </h3>
              <div className="space-y-3 font-medium text-zinc-700 text-[13px]">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Owner</span>
                  <span className="font-mono text-zinc-900 bg-zinc-150/50 px-1.5 py-0.5 rounded text-xs">{skill.author}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">License</span>
                  <span className="text-zinc-900">Apache-2.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Released URL</span>
                  <a href={skill.repoUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center select-all">
                    Src <ExternalLink className="h-3 w-3 ml-1 inline text-zinc-400" />
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Updated</span>
                  <span className="text-zinc-900">{skill.updated}</span>
                </div>
              </div>
            </div>

            {/* Stars count / Forks count block */}
            <div className="border-t border-zinc-200/80 pt-5">
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 font-sans mb-3">
                GitHub Metrics
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-lg border border-zinc-200/60 bg-white flex flex-col">
                  <div className="flex items-center space-x-1 text-zinc-400 mb-1">
                    <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-[10px] font-sans">Stars</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-zinc-900">{skill.stars}</span>
                </div>
                <div className="p-2.5 rounded-lg border border-zinc-200/60 bg-white flex flex-col">
                  <div className="flex items-center space-x-1 text-zinc-400 mb-1">
                    <GitFork className="h-3.5 w-3.5 text-blue-500" />
                    <span className="text-[10px] font-sans">Forks</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-zinc-900">{skill.forks}</span>
                </div>
              </div>
            </div>

            {/* Tags block */}
            <div className="border-t border-zinc-200/80 pt-5">
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 font-sans mb-2.5">
                Associated Tags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skill.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="font-mono text-[10px] text-zinc-650 bg-zinc-100 hover:bg-zinc-200 transition-colors uppercase py-0.5 px-2 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* MAIN TAB CONTENT */}
          <div className="lg:col-span-2 p-6 flex flex-col min-h-[400px]">
            <Tabs value={activeSubTab} onValueChange={(val) => setActiveSubTab(val as any)} className="w-full flex-1 flex flex-col">
              {/* Tabs top selectors */}
              <TabsList variant="line" className="flex border-b border-zinc-200 overflow-x-auto select-none no-scrollbar pb-px bg-transparent h-auto rounded-none justify-start w-full">
                {parsedSubTabs.map((subTab) => {
                  const TabIcon = subTab.icon;
                  return (
                    <TabsTrigger
                      key={subTab.id}
                      value={subTab.id}
                      className="flex items-center space-x-1.5 py-2.5 border-b-2 font-medium text-xs whitespace-nowrap mr-5 transition-all outline-none rounded-none data-active:border-blue-600 data-active:text-blue-600 data-active:font-semibold text-zinc-500 hover:text-zinc-800 border-transparent bg-transparent data-active:bg-transparent"
                    >
                      <TabIcon className="h-3.5 w-3.5" />
                      <span>{subTab.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {/* Tab content renderer */}
              <div className="mt-4 flex-1 text-sm text-zinc-700">
                {/* Tab 1: Overview */}
                <TabsContent value="overview" className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <h4 className="text-zinc-900 font-bold mb-2 text-base">Description & Blueprint</h4>
                    <p className="text-zinc-650 leading-relaxed">
                      {skill.longDescription || skill.description}
                    </p>
                  </div>
                  
                  <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4.5">
                    <h5 className="text-blue-900 font-semibold flex items-center text-xs mb-2">
                      <Layers className="h-4 w-4 mr-2 text-blue-600" />
                      Model Context Protocol Benefits
                    </h5>
                    <p className="text-blue-800 text-xs leading-relaxed">
                      This connector enforces absolute sandboxed client-only security execution. 
                      Claude queries the database entirely via secure local MCP channels, meaning actual 
                      credentials never exit your device or connect directly to any third-party clouds.
                    </p>
                  </div>

                  {skill.examples && skill.examples.length > 0 && (
                    <div>
                      <h4 className="text-zinc-900 font-bold mb-2.5 text-xs uppercase text-zinc-400 tracking-wider">
                        Feature Highlights
                      </h4>
                      <ul className="space-y-2 text-xs">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2 mt-0.5 font-bold">✓</span>
                          <span>Complete local schema inspection parsing including foreign key tracking links</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2 mt-0.5 font-bold">✓</span>
                          <span>Auto-configured syntax query limit controls to prevent massive tokens flooding</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2 mt-0.5 font-bold">✓</span>
                          <span>Developer friendly copy command scripts and interactive tests</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </TabsContent>

                {/* Tab 2: Installation */}
                <TabsContent value="installation" className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <h4 className="text-zinc-900 font-semibold mb-1">Standard Command Setup</h4>
                    <p className="text-zinc-500 text-xs mb-3">Copy this script to install and register the Claude Skill.</p>
                  </div>

                  <div className="relative font-mono text-xs rounded-lg bg-zinc-950 text-zinc-100 p-4 leading-normal overflow-x-auto shadow-inner group">
                    <Button
                      onClick={() => handleCopy(skill.installation, 'install')}
                      variant="outline"
                      size="icon-xs"
                      className="absolute right-3 top-3 border-zinc-800 hover:border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 shadow-sm"
                      title="Copy installation CLI"
                    >
                      {copiedText === 'install' ? <Check className="h-3.5 w-3.5 text-blue-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </Button>
                    <pre className="whitespace-pre-wrap select-all pr-8 py-1">{skill.installation}</pre>
                  </div>

                  <div className="p-4 border border-zinc-200 bg-zinc-50 rounded-lg text-xs space-y-2">
                    <span className="font-semibold text-zinc-950 text-xs flex items-center">
                      🔧 Local Registration Notice:
                    </span>
                    <p className="text-zinc-650">
                      Include this block in your Claude Desktop workspace configurations profile at: 
                      <code className="bg-zinc-150/80 px-1 py-0.5 rounded text-[11px] text-zinc-800 ml-1 font-mono">
                        ~/Library/Application Support/Claude/claude_desktop_config.json
                      </code>.
                    </p>
                  </div>
                </TabsContent>

                {/* Tab 3: Usage */}
                <TabsContent value="usage" className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <h4 className="text-zinc-900 font-semibold text-sm">Suggested Prompts & Automation Targets</h4>
                    <p className="text-xs text-zinc-500 mb-3.5">How to trigger this skill during Claude chat loops.</p>
                  </div>

                  <div className="border border-zinc-200 rounded-lg p-4 bg-zinc-50">
                    <span className="font-semibold text-xs text-zinc-800 font-mono">Sample Trigger Guideline:</span>
                    <p className="mt-2 text-zinc-700 leading-relaxed font-sans text-xs italic">
                      "{skill.usage}"
                    </p>
                  </div>

                  <div className="relative font-mono text-xs rounded-lg bg-zinc-950 text-zinc-100 p-4 leading-normal overflow-x-auto group">
                    <Button
                      onClick={() => handleCopy(skill.usage, 'usage')}
                      variant="outline"
                      size="icon-xs"
                      className="absolute right-3 top-3 border-zinc-800 hover:border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                    >
                      {copiedText === 'usage' ? <Check className="h-3.5 w-3.5 text-blue-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </Button>
                    <pre className="whitespace-pre-wrap select-all py-1 pr-6">{skill.usage}</pre>
                  </div>
                </TabsContent>

                {/* Tab 4: Examples */}
                <TabsContent value="examples" className="space-y-4 animate-in fade-in duration-200">
                  {skill.examples && skill.examples.length > 0 ? (
                    skill.examples.map((example, idx) => (
                      <div key={idx} className="border border-zinc-200 rounded-lg overflow-hidden bg-white">
                        <div className="bg-zinc-50 border-b border-zinc-200 px-4 py-2.5 flex justify-between items-center">
                          <span className="text-xs font-bold text-zinc-900 flex items-center font-mono">
                            <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2" />
                            Example {idx + 1}: {example.title}
                          </span>
                          <button
                            onClick={() => handleCopy(example.code, `example-${idx}`)}
                            className="text-zinc-400 hover:text-zinc-700 flex items-center text-[11px] space-x-1"
                          >
                            {copiedText === `example-${idx}` ? (
                              <>
                                <Check className="h-3 w-3 text-blue-500" />
                                <span className="text-blue-500">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="p-3 bg-zinc-950 font-mono text-[11px] text-zinc-100 leading-relaxed overflow-x-auto">
                          <pre>{example.code}</pre>
                        </div>
                        {example.description && (
                          <div className="p-3 bg-zinc-50/50 border-t border-zinc-100 text-[11px] text-zinc-500 font-sans">
                            {example.description}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="py-12 text-center text-zinc-400">
                      No standalone examples published yet.
                    </div>
                  )}
                </TabsContent>


              </div>
            </Tabs>
          </div>

          {/* RIGHT SIDEBAR: Related recommendations */}
          <div className="border-t lg:border-t-0 lg:border-l border-zinc-200 bg-zinc-50/40 p-5 space-y-5 text-xs">
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 font-sans tracking-wide">
              Similar Repositories
            </h3>

            {relatedSkills.length === 0 ? (
              <div className="py-6 text-center text-zinc-400">
                No similar skills found.
              </div>
            ) : (
              <div className="space-y-3.5">
                {relatedSkills.map((sims) => (
                  <div
                    key={sims.id}
                    onClick={() => {
                      onSelectSkill(sims);
                      setActiveSubTab('overview');
                    }}
                    className="group border border-zinc-200/80 hover:border-blue-300 bg-white p-3 rounded-lg cursor-pointer transition-all duration-150 shadow-sm"
                  >
                    <span className="font-sans font-semibold text-zinc-805 block group-hover:text-blue-600 text-[12px] truncate">
                      {sims.name}
                    </span>
                    <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                      {sims.description}
                    </p>
                    <div className="mt-2.5 pt-2 border-t border-zinc-100 flex items-center justify-between text-[10px] text-zinc-505">
                      <span className="flex items-center">
                        ★ {sims.stars}
                      </span>
                      <span className="text-blue-500 font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center">
                        Explore <ChevronRight className="h-3 w-3 ml-0.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Support section info */}
            <div className="border-t border-zinc-200/80 pt-5 space-y-2">
              <span className="font-sans font-semibold text-zinc-800 text-[11px] block">
                Contribute Updates:
              </span>
              <p className="text-[11px] text-zinc-500 leading-normal">
                See inaccurate documentation or broken URLs? Open an issue directly on the source author's repository.
              </p>
            </div>
          </div>

        </div>
      </div>
  );
}
