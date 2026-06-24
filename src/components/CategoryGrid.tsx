import React from 'react';
import { 
  Code2, 
  PenTool, 
  BookOpen, 
  Megaphone, 
  Palette, 
  Clock, 
  Cpu, 
  GraduationCap, 
  Briefcase, 
  Bot,
  Layers
} from 'lucide-react';
import { Category } from '../types';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

interface CategoryGridProps {
  categories: Category[];
  onSelectCategory: (id: string) => void;
}

// Map icon string names to dynamic Lucide elements securely
const iconMap: { [key: string]: any } = {
  Code2: Code2,
  PenTool: PenTool,
  BookOpen: BookOpen,
  Megaphone: Megaphone,
  Palette: Palette,
  Clock: Clock,
  Cpu: Cpu,
  GraduationCap: GraduationCap,
  Briefcase: Briefcase,
  Bot: Bot
};

export default function CategoryGrid({ categories, onSelectCategory }: CategoryGridProps) {
  return (
    <div className="font-sans">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl font-extrabold tracking-tight text-zinc-950 sm:text-3xl">
          Explore by Category
        </h2>
        <p className="mt-2.5 text-zinc-505 text-sm text-zinc-500">
          Discover Claude Skills categorized for your exact developer or production workflows. Click to filter immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4.5">
        {categories.map((cat) => {
          const IconComponent = iconMap[cat.iconName] || Layers;
          return (
            <Card
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/[0.02] cursor-pointer transition-all duration-250 flex flex-col justify-between"
              id={`cat-card-${cat.id}`}
            >
              <CardHeader className="space-y-3.5 pb-0">
                {/* Visual Icon Container */}
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-50 text-zinc-700 group-hover:bg-blue-50 group-hover:text-blue-600 border border-zinc-200/50 group-hover:border-blue-100 transition-colors">
                  <IconComponent className="h-5 w-5" />
                </div>

                {/* Info block */}
                <div>
                  <CardTitle className="text-[14px] font-bold text-zinc-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                    <span>{cat.name}</span>
                  </CardTitle>
                  <CardDescription className="mt-1.5 text-xs text-zinc-400 leading-normal line-clamp-2">
                    {cat.description || 'Curated Model Context features and prompt templates.'}
                  </CardDescription>
                </div>
              </CardHeader>

              {/* Bottom tag tracker count */}
              <CardFooter className="mt-5.5 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400 pb-5">
                <span className="font-medium bg-zinc-100/80 px-2 py-0.5 rounded text-zinc-650 font-mono">
                  {cat.skillsCount} {cat.skillsCount === 1 ? 'skill' : 'skills'}
                </span>
                <span className="text-blue-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Discover ➔
                </span>
              </CardFooter>

            </Card>
          );
        })}
      </div>
    </div>
  );
}
