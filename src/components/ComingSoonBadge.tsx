import React from 'react';
import { Clock } from 'lucide-react';

interface ComingSoonBadgeProps {
  className?: string;
}

export const ComingSoonBadge: React.FC<ComingSoonBadgeProps> = ({ className = '' }) => {
  return (
    <div className={`inline-flex items-center space-x-1 px-2 py-1 bg-satim-light text-satim-primary text-xs font-medium rounded-full ${className}`}>
      <Clock className="h-3 w-3" />
      <span>Bientôt disponible</span>
    </div>
  );
}; 