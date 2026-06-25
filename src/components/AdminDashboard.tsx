import React from 'react';
import { Skill, Category, Submission, Collection, Resource, Prompt } from '../types';
import AdminContentEditor from './AdminContentEditor';

interface AdminDashboardProps {
  skills: Skill[];
  submissions: Submission[];
  categories: Category[];
  collections: Collection[];
  resources: Resource[];
  prompts: Prompt[];
  onApproveSubmission: (subId: string) => void;
  onRejectSubmission: (subId: string) => void;
  onAddSkill: (newSkill: Skill) => void;
  onUpdateSkill: (updatedSkill: Skill) => void;
  onDeleteSkill: (skillId: string) => void;
  onAddCategory: (newCategory: Category) => void;
  onUpdateCategory: (updatedCategory: Category) => void;
  onDeleteCategory: (categoryId: string) => void;
  onAddCollection: (newCollection: Collection) => void;
  onUpdateCollection: (updatedCollection: Collection) => void;
  onDeleteCollection: (collectionId: string) => void;
  onAddResource: (newResource: Resource) => void;
  onUpdateResource: (updatedResource: Resource) => void;
  onDeleteResource: (resourceId: string) => void;
  onAddPrompt: (newPrompt: Prompt) => void;
  onUpdatePrompt: (updatedPrompt: Prompt) => void;
  onDeletePrompt: (promptId: string) => void;
  onClose: () => void;
}

export default function AdminDashboard({
  skills,
  submissions,
  categories,
  collections,
  resources,
  prompts,
  onApproveSubmission,
  onRejectSubmission,
  onAddSkill,
  onUpdateSkill,
  onDeleteSkill,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  onAddCollection,
  onUpdateCollection,
  onDeleteCollection,
  onAddResource,
  onUpdateResource,
  onDeleteResource,
  onAddPrompt,
  onUpdatePrompt,
  onDeletePrompt,
  onClose
}: AdminDashboardProps) {
  return (
    <AdminContentEditor 
      skills={skills}
      categories={categories}
      collections={collections}
      resources={resources}
      prompts={prompts}
      onAddSkill={onAddSkill}
      onUpdateSkill={onUpdateSkill}
      onDeleteSkill={onDeleteSkill}
      onAddCategory={onAddCategory}
      onUpdateCategory={onUpdateCategory}
      onDeleteCategory={onDeleteCategory}
      onAddCollection={onAddCollection}
      onUpdateCollection={onUpdateCollection}
      onDeleteCollection={onDeleteCollection}
      onAddResource={onAddResource}
      onUpdateResource={onUpdateResource}
      onDeleteResource={onDeleteResource}
      onAddPrompt={onAddPrompt}
      onUpdatePrompt={onUpdatePrompt}
      onDeletePrompt={onDeletePrompt}
      onClose={onClose}
    />
  );
}
