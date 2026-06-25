export interface Example {
  title: string;
  code: string;
  description?: string;
}

export interface ChangelogEntry {
  version: string;
  date: string;
  changes: string[];
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  category: string;
  tags: string[];
  stars: number;
  forks: number;
  updated: string;
  author: string;
  repoUrl: string;
  installation: string;
  usage: string;
  examples: Example[];
  changelog: ChangelogEntry[];
  featured: boolean;
  trendingToday: boolean;
  trendingWeek: boolean;
  trendingMonth: boolean;
  status: 'approved' | 'pending';
  bookmarksCount: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
    ogImages?: string[];
    activeOgImage?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  description?: string;
  skillsCount: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
  };
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  colorTheme: 'blue' | 'purple' | 'zinc' | 'emerald' | 'amber';
  skillsCount: number;
  skillIds: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
  };
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'Article' | 'Video' | 'Documentation' | 'Tutorial' | 'Guide';
  readTime: string;
  author: string;
  url: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
  };
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  category: 'Coding' | 'Writing' | 'Marketing' | 'Research' | 'Automation';
  tags: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
  };
}

export interface Submission {
  id: string;
  name: string;
  repoUrl: string;
  description: string;
  category: string;
  tags: string[];
  submittedBy: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}
