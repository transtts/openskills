import React, { useState } from 'react';
import { 
  GitBranch, 
  Tag, 
  FolderClock, 
  HelpCircle, 
  CheckCircle2, 
  Upload, 
  AlertCircle,
  HelpCircleIcon
} from 'lucide-react';
import { Category, Skill } from '../types';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SubmitFormProps {
  categories: Category[];
  onSubmitCreate: (newSubmission: {
    name: string;
    repoUrl: string;
    description: string;
    category: string;
    tags: string[];
    author: string;
  }) => void;
}

export default function SubmitForm({ categories, onSubmitCreate }: SubmitFormProps) {
  const [name, setName] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]?.id || 'development');
  const [tagsInput, setTagsInput] = useState('');
  const [authorInput, setAuthorInput] = useState('');
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [draggedFileName, setDraggedFileName] = useState<string | null>(null);

  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setDraggedFileName(file.name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDraggedFileName(e.target.files[0].name);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Simple validation inputs
    if (!name.trim()) return setFormError('Please declare a descriptive Skill Name.');
    if (!repoUrl.trim()) return setFormError('GitHub repository URL link is required.');
    if (!repoUrl.toLowerCase().includes('github.com')) {
      return setFormError('A valid open-source GitHub URL link is required (e.g. github.com/username/repo)');
    }
    if (!description.trim() || description.length < 15) {
      return setFormError('Please supply a descriptive baseline summaries text (at least 15 characters).');
    }
    if (!authorInput.trim()) {
      return setFormError('Please declare your GitHub Username or Organization owner.');
    }

    // Parse comma tags list safely
    const parsedTags = tagsInput
      .split(',')
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag.length > 0);

    const defaultTags = parsedTags.length > 0 ? parsedTags : ['mcp', 'claude-skill'];

    onSubmitCreate({
      name,
      repoUrl,
      description,
      category,
      tags: defaultTags,
      author: authorInput.trim()
    });

    setSuccessMessage(true);
    // Clear fields
    setName('');
    setRepoUrl('');
    setDescription('');
    setTagsInput('');
    setAuthorInput('');
    setDraggedFileName(null);
    
    setTimeout(() => {
      setSuccessMessage(false);
    }, 6000);
  };

  return (
    <div id="submit-form-container" className="max-w-3xl mx-auto font-sans">
      
      {/* Title block */}
      <div className="text-center max-w-xl mx-auto mb-9">
        <h2 className="text-2xl font-extrabold tracking-tight text-zinc-950 sm:text-3xl">
          Submit a Claude Skill
        </h2>
        <p className="mt-2.5 text-zinc-505 text-xs text-zinc-500 leading-normal">
          Add an open-source MCP directory package, prompt automation list, or server module. Submissions enter moderations and become browseable once approved.
        </p>
      </div>

      <Card className="bg-white border border-zinc-200/80 rounded-xl shadow-sm overflow-hidden p-6 sm:p-8">
        <CardContent className="p-0">
          {/* Success screen */}
          {successMessage ? (
            <div className="py-10 text-center space-y-4 animate-in fade-in duration-350">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-90 w-auto">
                  Skill Submitted Successfully!
                </h3>
                <p className="mt-2 text-xs text-zinc-500 max-w-md mx-auto leading-relaxed">
                  Thank you! Your skill entered the admin queue in status <strong className="text-amber-600 font-bold uppercase">Pending</strong>. You can switch to the <strong>Admin Panel</strong> in the top right to instantly review and approve this submission!
                </p>
              </div>
              <div className="pt-4.5 border-t border-zinc-100 max-w-sm mx-auto">
                <span className="text-[11px] text-zinc-400">
                  Tip: Simulate double approvals in the demo dashboard securely.
                </span>
              </div>
            </div>
          ) : (
            
            <form onSubmit={handleFormSubmit} className="space-y-5.5 text-xs text-zinc-705">
              
              {formError && (
                <Alert variant="destructive" className="bg-red-50/50 border border-red-200 text-red-800 rounded-lg flex items-center space-x-2 text-xs font-semibold p-3.5">
                  <AlertCircle className="h-4.5 w-4.5 text-red-600 mr-1 shrink-0" />
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              )}

              {/* Inputs grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Field 1: Name */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="skill-name" className="font-semibold text-zinc-800 flex items-center">
                    <span>Skill / Repository Name</span>
                    <span className="text-red-500 ml-0.5">*</span>
                  </Label>
                  <Input
                    id="skill-name"
                    type="text"
                    required
                    placeholder="e.g. SQLite DB Connector"
                    className="h-9 px-3 border border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50 rounded-md focus:bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Field 2: Author name */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="author-input" className="font-semibold text-zinc-800">
                    <span>GitHub Username / Owner</span>
                    <span className="text-red-505 ml-0.5">*</span>
                  </Label>
                  <Input
                    id="author-input"
                    type="text"
                    required
                    placeholder="e.g. modelcontextprotocol"
                    className="h-9 px-3 border border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50 rounded-md focus:bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                    value={authorInput}
                    onChange={(e) => setAuthorInput(e.target.value)}
                  />
                </div>

              </div>

              {/* Field 3: Repo Url */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="repo-url" className="font-semibold text-zinc-805 flex items-center">
                  <span>GitHub Repository URL</span>
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400 font-mono">
                    github.com/
                  </div>
                  <Input
                    id="repo-url"
                    type="text"
                    required
                    placeholder="username/repository-target"
                    className="w-full h-9 pl-23 pr-3 border border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50 rounded-md focus:bg-white text-zinc-900 font-mono placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs font-semibold"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                  />
                </div>
                <span className="text-[10px] text-zinc-400 tracking-normal">
                  Must point to a public repositories code URL schema.
                </span>
              </div>

              {/* Field 4: Selection list Categories */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="category-select" className="font-semibold text-zinc-800">
                    <span>Category Target</span>
                    <span className="text-red-505 ml-0.5">*</span>
                  </Label>
                  <Select value={category} onValueChange={(val) => setCategory(val)}>
                    <SelectTrigger id="category-select" className="w-full h-9 px-3 border border-zinc-200 bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-zinc-805 font-medium cursor-pointer justify-between">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Field 5: Tag array split comma */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="tags-input" className="font-semibold text-zinc-800 flex items-center">
                    <span>Discovery Tags</span>
                    <span className="text-zinc-400 text-[10px] font-normal ml-1.5">(comma separated)</span>
                  </Label>
                  <Input
                    id="tags-input"
                    type="text"
                    placeholder="postgres, database, schema, read-only"
                    className="h-9 px-3 border border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50 rounded-md focus:bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                  />
                </div>

              </div>

              {/* Field 6: Large Content Textarea */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description-textarea" className="font-semibold text-zinc-800">
                  <span>Action Description & Purpose Summary</span>
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Textarea
                  id="description-textarea"
                  required
                  rows={4}
                  maxLength={400}
                  placeholder="A high-quality summary detailing installation commands, context structures, available tool names, and parameters guidelines for Claude."
                  className="p-3 border border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50 rounded-md focus:bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium leading-relaxed"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="flex justify-between items-center text-[10px] text-zinc-400">
                  <span>Briefly tell developers what parameters Claude can call.</span>
                  <span>{description.length}/400 chars</span>
                </div>
              </div>

              {/* Drag & Drop Visual File Area (Upload Simulation) */}
              <div className="flex flex-col space-y-1.5">
                <Label className="font-semibold text-zinc-800 flex items-center justify-between">
                  <span>Visual Logo / Feature Screenshot</span>
                  <span className="text-[10px] font-normal text-zinc-400">Optional</span>
                </Label>
                
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-xl p-6.5 text-center flex flex-col items-center justify-center cursor-pointer transition-all ${
                    dragActive 
                      ? 'border-blue-500 bg-blue-50/30' 
                      : draggedFileName 
                        ? 'border-zinc-350 bg-zinc-50/20' 
                        : 'border-zinc-250 bg-zinc-50/30 hover:border-zinc-350 hover:bg-zinc-50/40'
                  }`}
                >
                  <input
                    type="file"
                    id="screenshot-file-upload"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  
                  <Label htmlFor="screenshot-file-upload" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-zinc-200 text-zinc-500 mb-2.5 shadow-sm">
                      <Upload className="h-4 w-4" />
                    </div>
                    
                    {draggedFileName ? (
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-zinc-800">{draggedFileName}</p>
                        <p className="text-[10px] text-zinc-400">Successfully loaded graphic for submit package.</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-zinc-800">
                          Drag and drop file, or <span className="text-blue-600 hover:underline">browse files</span>
                        </p>
                        <p className="text-[10px] text-zinc-400">
                          PNG, JPEG, SVG schemas up to 4MB total.
                        </p>
                      </div>
                    )}
                  </Label>
                </div>
              </div>

              {/* Disclaimer banner */}
              <div className="p-3 border border-zinc-200/60 bg-zinc-50/50 rounded-lg text-zinc-550 text-[10px] leading-relaxed">
                * By submitting this, you certify that the repository behaves respectfully under open-source standards, uses no commercial adware/trackers, and complies with Model Context guidelines.
              </div>

              {/* Action buttons */}
              <Button
                id="submit-review-btn"
                type="submit"
                className="w-full flex h-11 items-center justify-center bg-zinc-950 hover:bg-zinc-850 text-white rounded-md text-sm font-semibold shadow-md transition-colors font-sans"
              >
                <span>Submit for Review</span>
              </Button>

            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
