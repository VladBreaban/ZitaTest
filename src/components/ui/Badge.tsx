import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant: 'achieved' | 'in-progress' | 'new' | 'visualized' | 'draft' | 'pending' | 'completed' | 'active' | 'inactive';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant, className = '' }) => {
  const variantStyles = {
    achieved: 'bg-status-achieved-bg text-status-achieved-text',
    'in-progress': 'bg-status-in-progress-bg text-status-in-progress-text',
    new: 'bg-status-new-bg text-status-new-text',
    visualized: 'bg-status-visualized-bg text-status-visualized-text',
    draft: 'bg-status-draft-bg text-status-draft-text',
    pending: 'bg-status-pending-bg text-status-pending-text',
    completed: 'bg-status-completed-bg text-status-completed-text',
    active: 'bg-status-active-bg text-status-active-text',
    inactive: 'bg-status-inactive-bg text-status-inactive-text',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wide ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
