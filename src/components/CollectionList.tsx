import React, { useState } from 'react';
import { 
  FolderHeart, 
  ArrowLeft, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers,
  Star,
  BookOpen
} from 'lucide-react';
import { Collection, Skill } from '../types';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CollectionListProps {
  collections: Collection[];
  skills: Skill[];
  onOpenSkillDetails: (skill: Skill) => void;
}

export default function CollectionList({ 
  collections, 
  skills, 
  onOpenSkillDetails 
}: CollectionListProps) {
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);

  const themeClasses: { [key: string]: { border: string, bg: string, text: string, bullet: string, badge: string } } = {
    blue: {
      border: 'hover:border-blue-400 border-zinc-200/80',
      bg: 'bg-gradient-to-br from-blue-50/20 to-zinc-50/50',
      text: 'text-blue-700',
      bullet: 'bg-blue-600',
      badge: 'bg-blue-50 border-blue-100 text-blue-700'
    },
    purple: {
      border: 'hover:border-purple-400 border-zinc-200/80',
      bg: 'bg-gradient-to-br from-purple-50/20 to-zinc-50/50',
      text: 'text-purple-700',
      bullet: 'bg-purple-600',
      badge: 'bg-purple-50 border-purple-100 text-purple-700'
    },
    zinc: {
      border: 'hover:border-zinc-400 border-zinc-200/80',
      bg: 'bg-gradient-to-br from-zinc-100/10 to-zinc-50/50',
      text: 'text-zinc-700',
      bullet: 'bg-zinc-600',
      badge: 'bg-zinc-100 border-zinc-200 text-zinc-700'
    },
    emerald: {
      border: 'hover:border-emerald-400 border-zinc-200/80',
      bg: 'bg-gradient-to-br from-emerald-50/20 to-zinc-50/50',
      text: 'text-emerald-700',
      bullet: 'bg-emerald-600',
      badge: 'bg-emerald-50 border-emerald-100 text-emerald-700'
    },
    amber: {
      border: 'hover:border-amber-400 border-zinc-200/80',
      bg: 'bg-gradient-to-br from-amber-50/20 to-zinc-50/50',
      text: 'text-amber-700',
      bullet: 'bg-amber-600',
      badge: 'bg-amber-50 border-amber-100 text-amber-500'
    }
  };

  // If a collection is selected, render public child skills
  if (selectedCollection) {
    const collectionSkills = skills.filter((s) => 
      selectedCollection.skillIds.includes(s.id) && s.status === 'approved'
    );

    return (
      <div className="font-sans animate-in fade-in duration-200">
        
        {/* Back navigation */}
        <Button
          variant="outline"
          onClick={() => setSelectedCollection(null)}
          className="flex items-center space-x-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 mb-6 bg-white cursor-pointer shadow-sm transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Collections Directory</span>
        </Button>

        {/* Selected Collection Header Banner */}
        <div className={`p-6 sm:p-8 rounded-2xl border border-zinc-200 mb-8 bg-zinc-50/80`}>
          <div className="flex items-center space-x-2 mb-3">
            <FolderHeart className="h-5 w-5 text-zinc-700" />
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-450 text-zinc-550">
              Curated Collection Volume
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
            {selectedCollection.name}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-550 max-w-3xl leading-relaxed text-zinc-550">
            {selectedCollection.description}
          </p>
          <div className="mt-4 flex items-center space-x-2">
            <span className="text-xs text-zinc-400">Contains:</span>
            <span className="text-xs font-mono font-bold text-zinc-900 bg-white border border-zinc-200 px-2.5 py-0.5 rounded-full">
              {collectionSkills.length} Verified MCP Services & Skill packs
            </span>
          </div>
        </div>

        {/* Grid of items in this collection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {collectionSkills.length === 0 ? (
            <div className="col-span-full py-12 text-center rounded-xl border border-zinc-200 bg-white">
              <span className="text-zinc-400 text-xs">No active skills recorded under this list.</span>
            </div>
          ) : (
            collectionSkills.map((skill) => (
              <Card
                key={skill.id}
                className="group relative hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <CardHeader className="pb-0">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 font-mono tracking-wider">
                      by {skill.author}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
                      {skill.category}
                    </span>
                  </div>
                  
                  <CardTitle className="text-sm font-bold text-zinc-900 group-hover:text-blue-600 transition-colors">
                    {skill.name}
                  </CardTitle>
                  
                  <CardDescription className="text-xs text-zinc-505 mt-2 leading-relaxed line-clamp-2">
                    {skill.description}
                  </CardDescription>
                </CardHeader>

                <CardFooter className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs pb-5">
                  <span className="font-mono text-[11px] text-zinc-500 flex items-center">
                    <Star className="h-3 w-3 text-amber-500 fill-amber-500 mr-1" />
                    {skill.stars.toLocaleString()}
                  </span>
                  <Button
                    variant="link"
                    onClick={() => onOpenSkillDetails(skill)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 p-0 h-auto cursor-pointer"
                  >
                    Explore Documentation ➔
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>

      </div>
    );
  }

  // Curated collections selection index view
  return (
    <div className="font-sans">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl font-extrabold tracking-tight text-zinc-950 sm:text-3xl">
          Curated Collections
        </h2>
        <p className="mt-2.5 text-zinc-505 text-sm text-zinc-500">
          Discover handpicked skill combinations specifically designed to tackle unified technical objectives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((coll) => {
          const theme = themeClasses[coll.colorTheme] || themeClasses.zinc;
          return (
            <Card
              key={coll.id}
              onClick={() => setSelectedCollection(coll)}
              className={`group relative p-0 hover:shadow-xl transition-all duration-305 flex flex-col justify-between cursor-pointer ${theme.border} ${theme.bg}`}
              id={`coll-card-${coll.id}`}
            >
              <CardHeader className="space-y-4 p-6 pb-0">
                {/* Header tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span className={`h-2 w-2 rounded-full ${theme.bullet}`} />
                    <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">
                      Curated Volume
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${theme.badge}`}>
                    {coll.skillsCount} Skills Included
                  </span>
                </div>

                {/* Cover block */}
                <div>
                  <CardTitle className="text-[16px] font-extrabold text-zinc-950 group-hover:text-blue-650 transition-colors">
                    {coll.name}
                  </CardTitle>
                  <CardDescription className="mt-2 text-xs text-zinc-505 leading-relaxed font-sans line-clamp-3">
                    {coll.description}
                  </CardDescription>
                </div>
              </CardHeader>

              {/* Action trigger */}
              <CardFooter className="mt-8 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs p-6 pb-6">
                <span className="text-zinc-400 font-medium">Click to unlock tools</span>
                <span className="text-zinc-900 group-hover:text-blue-600 font-bold inline-flex items-center group-hover:translate-x-1 transition-transform">
                  Explore Collection <ChevronRight className="h-4 w-4 ml-0.5" />
                </span>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
