import React from 'react';
import { Skill, Category, Submission } from '../types';
import AdminContentEditor from './AdminContentEditor';

interface AdminDashboardProps {
  skills: Skill[];
  submissions: Submission[];
  categories: Category[];
  onApproveSubmission: (subId: string) => void;
  onRejectSubmission: (subId: string) => void;
  onAddSkill: (newSkill: Skill) => void;
  onUpdateSkill: (updatedSkill: Skill) => void;
  onDeleteSkill: (skillId: string) => void;
  onClose: () => void;
}

export default function AdminDashboard({
  skills,
  submissions,
  categories,
  onApproveSubmission,
  onRejectSubmission,
  onAddSkill,
  onUpdateSkill,
  onDeleteSkill,
  onClose
}: AdminDashboardProps) {
  return (
    <AdminContentEditor 
      skills={skills}
      categories={categories}
      onAddSkill={onAddSkill}
      onUpdateSkill={onUpdateSkill}
      onDeleteSkill={onDeleteSkill}
      onClose={onClose}
    />
  );
}
