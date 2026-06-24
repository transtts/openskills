import React from 'react';
import { 
  Github, 
  ExternalLink,
  Star, 
  GitFork, 
  Calendar,
  Eye,
  ArrowRight
} from 'lucide-react';
import { Skill } from '../types';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface LatestReposTableProps {
  skills: Skill[];
  onOpenDetails: (skill: Skill) => void;
}

export default function LatestReposTable({ skills, onOpenDetails }: LatestReposTableProps) {
  if (skills.length === 0) {
    return (
      <div className="py-12 text-center rounded-xl border border-dashed border-zinc-200 bg-white">
        <p className="text-zinc-400 text-sm">No repository matches the specified filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-sm font-sans">
      <div className="overflow-x-auto">
        <Table className="w-full text-left text-xs border-collapse">
          
          <TableHeader className="bg-zinc-50 border-b border-zinc-200 font-semibold text-zinc-500 uppercase tracking-wider">
            <TableRow>
              <TableHead className="px-5 py-4 font-semibold text-zinc-900">
                Repository
              </TableHead>
              <TableHead className="px-5 py-4">
                Category
              </TableHead>
              <TableHead className="px-5 py-4 justify-center">
                Stars
              </TableHead>
              <TableHead className="px-5 py-4">
                Forks
              </TableHead>
              <TableHead className="px-5 py-4">
                Last Updated
              </TableHead>
              <TableHead className="px-5 py-4 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-zinc-200/80 text-zinc-700 bg-white">
            {skills.map((skill) => (
              <TableRow 
                key={skill.id}
                className="hover:bg-zinc-50/50 transition-colors group"
                id={`table-row-${skill.id}`}
              >
                
                {/* Repo / Author Info */}
                <TableCell className="px-5 py-4">
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-1.5">
                      <span 
                        onClick={() => onOpenDetails(skill)} 
                        className="font-bold text-zinc-900 hover:text-blue-600 cursor-pointer text-[13px] tracking-tight transition-colors"
                      >
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-400 font-mono mt-0.5">
                      by github.com/{skill.author}
                    </span>
                  </div>
                </TableCell>

                {/* Category Badge */}
                <TableCell className="px-5 py-4">
                  <span className="inline-flex items-center capitalize px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-zinc-100 border border-zinc-200 text-zinc-700">
                    {skill.category}
                  </span>
                </TableCell>

                {/* Stars */}
                <TableCell className="px-5 py-4 font-mono font-medium text-zinc-850">
                  <span className="flex items-center space-x-1 font-semibold text-zinc-900">
                    <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <span>{skill.stars.toLocaleString()}</span>
                  </span>
                </TableCell>

                {/* Forks */}
                <TableCell className="px-5 py-4 font-mono font-medium text-zinc-600">
                  <span className="flex items-center space-x-1">
                    <GitFork className="h-3 w-3 text-zinc-400" />
                    <span>{skill.forks.toLocaleString()}</span>
                  </span>
                </TableCell>

                {/* Last updated date */}
                <TableCell className="px-5 py-4 text-zinc-500 font-mono text-[11px]">
                  <span className="flex items-center space-x-1.5">
                    <Calendar className="h-3 w-3 text-zinc-400" />
                    <span>{skill.updated}</span>
                  </span>
                </TableCell>

                {/* Quick actions buttons */}
                <TableCell className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    
                    {/* View Details */}
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onOpenDetails(skill)}
                      className="h-7 text-[11px] font-semibold transition-colors cursor-pointer"
                      title="Read documentation & get installation snippets"
                    >
                      <Eye className="h-3 w-3" />
                      <span className="hidden sm:inline">View Code</span>
                    </Button>

                    {/* Open External GitHub */}
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="h-7 text-[11px] font-semibold transition-all cursor-pointer"
                      title="Open source code repository"
                    >
                      <a
                        href={skill.repoUrl}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-3 w-3 text-zinc-850" />
                        <span className="hidden sm:inline">Repo</span>
                        <ExternalLink className="h-2.5 w-2.5 opacity-60" />
                      </a>
                    </Button>

                  </div>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>

        </Table>
      </div>
    </div>
  );
}
