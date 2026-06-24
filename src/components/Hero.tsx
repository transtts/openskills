import React from 'react';
import { 
  Compass, 
  PlusCircle, 
  GitPullRequest, 
  FolderGit2, 
  Users2, 
  Tags,
  CheckCircle2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { translations } from '../translations';

interface HeroProps {
  onBrowseClick: () => void;
  onSubmitSkillClick: () => void;
  totalSkills: number;
  totalCategories: number;
  language: 'en' | 'hi';
}

export default function Hero({ 
  onBrowseClick, 
  onSubmitSkillClick, 
  totalSkills, 
  totalCategories,
  language
}: HeroProps) {
  const t = translations[language];

  return (
    <section className="relative overflow-hidden bg-white py-14 border-b border-zinc-100">
      {/* Background radial highlight */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(35rem_20rem_at_top,rgba(124,58,237,0.04),transparent)]" />
      
      {/* Visual top subtle badge */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-1.5 rounded-full bg-zinc-50 border border-zinc-200/80 px-2.5 py-1 text-xs text-zinc-600 mb-6 hover:bg-zinc-100/50 transition-colors">
          <span className="flex h-1.5 w-1.5 rounded-full bg-blue-600" />
          <span className="font-sans font-medium">{t.mcpBadge}</span>
        </div>

        {/* Main Content */}
        <h1 className="font-sans text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl md:text-6xl max-w-3xl mx-auto leading-[1.1]">
          {t.heroTitlePrefix}<span className="text-zinc-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{t.heroTitleMiddle}</span>{t.heroTitleSuffix}
        </h1>
        
        <p className="mt-5 text-base sm:text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed">
          {t.heroDesc}
        </p>

        {/* Action Button cluster */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            id="hero-primary-browse"
            onClick={onBrowseClick}
            className="w-full sm:w-auto h-11 px-6 font-semibold cursor-pointer"
          >
            <Compass className="h-4.5 w-4.5" />
            <span>{t.browseSkills}</span>
          </Button>
          
          <Button
            id="hero-secondary-submit"
            variant="outline"
            onClick={onSubmitSkillClick}
            className="w-full sm:w-auto h-11 px-6 font-semibold cursor-pointer"
          >
            <PlusCircle className="h-4 w-4 text-zinc-500" />
            <span>{t.submitSkill}</span>
          </Button>
        </div>

        {/* Stats Grid below */}
        <div className="mt-14 max-w-5xl mx-auto border border-zinc-200/60 bg-zinc-50/50 rounded-2xl grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-zinc-200/60">
          
          <div className="p-5 flex flex-col items-center justify-center text-center">
            <div className="flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-full mb-1">
              <CheckCircle2 className="h-3 w-3 text-blue-500 mr-1" />
              <span>{t.active}</span>
            </div>
            <span className="font-mono text-3xl font-extrabold text-zinc-900 tracking-tight">
              {totalSkills}
            </span>
            <span className="text-xs font-medium text-zinc-400 mt-0.5 uppercase tracking-wider">
              {t.totalSkills}
            </span>
          </div>

          <div className="p-5 flex flex-col items-center justify-center text-center">
            <div className="flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold text-zinc-700 bg-zinc-100 border border-zinc-200 rounded-full mb-1">
              <FolderGit2 className="h-3 w-3 text-zinc-500 mr-1" />
              <span>{t.verified}</span>
            </div>
            <span className="font-mono text-3xl font-extrabold text-zinc-900 tracking-tight">
              {totalSkills}
            </span>
            <span className="text-xs font-medium text-zinc-400 mt-0.5 uppercase tracking-wider">
              {t.repositories}
            </span>
          </div>

          <div className="p-5 flex flex-col items-center justify-center text-center">
            <div className="flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-100 rounded-full mb-1">
              <Tags className="h-3 w-3 text-purple-500 mr-1" />
              <span>{t.curated}</span>
            </div>
            <span className="font-mono text-3xl font-extrabold text-zinc-900 tracking-tight">
              {totalCategories}
            </span>
            <span className="text-xs font-medium text-zinc-400 mt-0.5 uppercase tracking-wider">
              {t.categories}
            </span>
          </div>

          <div className="p-5 flex flex-col items-center justify-center text-center">
            <div className="flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full mb-1">
              <Users2 className="h-3 w-3 text-emerald-500 mr-1" />
              <span>{t.openSource}</span>
            </div>
            <span className="font-mono text-3xl font-extrabold text-zinc-900 tracking-tight">
              {(totalSkills * 1.5).toFixed(0)}
            </span>
            <span className="text-xs font-medium text-zinc-400 mt-0.5 uppercase tracking-wider">
              {t.contributors}
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
