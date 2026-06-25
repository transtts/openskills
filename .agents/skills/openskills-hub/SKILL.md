---
name: openskills-hub
description: Complete blueprint and instructions to build, run, and modify the OpenSkills AI Directory & MCP Hub website in one shot.
---

# OpenSkills Web App Blueprint (SKILL.md)

This custom skill provides a comprehensive step-by-step developer specification, code patterns, and execution guidelines for building and extending the **OpenSkills AI Directory & MCP Hub** website in a single execution.

---

## 1. Project Overview & Architecture

OpenSkills is a responsive, modern React + Vite + TypeScript Single Page Application (SPA) utilizing TailwindCSS v4 and Lucide icons. It serves as a unified discovery directory for Model Context Protocol (MCP) servers, Claude custom skills, and open-source AI utilities.

### Key Directory Structure
*   `index.html`: Entry HTML structure with Google Analytics, OpenGraph meta tags, and app container.
*   `src/main.tsx`: Entry point mounting the React root.
*   `src/types.ts`: Core TypeScript interface definitions.
*   `src/data.ts`: Static local data repository for initial categories, skills, and prompts.
*   `src/translations.ts`: Key-value dictionaries for English (`en`) and Hindi (`hi`) dual-language support.
*   `src/index.css`: Tailwind v4 configuration, theme variables (light/dark), and custom UI utility overrides.
*   `src/App.tsx`: Central coordinator managing active tabs, global search, filtering, and database updates.
*   `src/components/`: Reusable components (Header, Hero, CategoryGrid, LatestReposTable, SubmitForm, AdminDashboard, AdminContentEditor, etc.)

---

## 2. Core Data Models (src/types.ts)

Developers must adhere strictly to these TypeScript interfaces for data consistency:

```typescript
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
```

---

## 3. UI and Theme System (src/index.css)

The application uses Tailwind v4 with a custom-styled dark and light theme palette.

*   **Light Theme Colors:** Slate/Zinc backgrounds (`bg-slate-50`), crisp borders (`border-slate-200`), primary indigo accents (`indigo-600`), and dark text (`text-slate-900`).
*   **Dark Theme Colors (`.dark` class):** Deep slate/zinc background (`bg-zinc-950`), custom dark border colors (`border-zinc-800`), bright green/blue neon accents, and muted light-grey text.
*   **Glassmorphism:** Use backdrops (`backdrop-blur-md bg-white/70` in light mode or `backdrop-blur-md bg-zinc-900/70` in dark mode) for premium sidebars, headers, and modal overlays.

---

## 4. Feature Implementation Guidelines

### 4.1. Dual-Language Support (English / Hindi)
All UI text strings must refer to `translations[language][key]`. Implement the language select controller in the Header and persist selection via `localStorage` with key `openskills_lang`.

### 4.2. Universal Search & Sidebar Filters
*   **Keyboard Shortcut:** Listen globally for `Ctrl + K` or `Cmd + K` to automatically focus the search bar.
*   **Filtering Logic:** Filter the main list of skills on:
    1. Text search matches on `name`, `description`, `tags`, or `author`.
    2. Active category selection (default `all`).
    3. Sort ordering (by Stars, Repos, or Latest Updated).
*   **Bookmarks:** Store bookmarked skills in `localStorage` under `claude_hub_bookmarks_2` and display them via an slide-out side drawer.

### 4.3. Admin & Content Editor Dashboard
*   **Secret Route:** Set the active panel to `admin` when `window.location.hash` resolves to `#admin`.
*   **Content Editor Features:**
    *   **Submissions Queue:** Display list of submissions; allow one-click approvals to convert submissions into live approved skills.
    *   **Manage Skills (CRUD):** Implement fully editable tabular forms to Add, Update, or Delete skills.
    *   **Import/Export JSON:** Allow administrators to import a list of skills in JSON format to update local state in one action.

---

## 5. Verification and Compilation Plan

### 5.1. Compilation Verification
Verify code validity by running:
```powershell
npm run build
```
Ensure that no TypeScript Errors occur during compile-time.

### 5.2. Functional Checklist
1. **Interactive Modal:** Clicking any skill card opens the detailed modal displaying tabs for Installation, Usage, Examples, and Changelog.
2. **Toggle Theme:** Light/Dark modes trigger the `.dark` class toggling on the `html` element.
3. **Responsive Grid:** App layout scales seamlessly from mobile screens (1 column grid) to wide viewports (4 columns grid).
