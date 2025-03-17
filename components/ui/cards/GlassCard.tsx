
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  withBorder?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className, 
  hoverEffect = true,
  withBorder = true
}) => {
  return (
    <div 
      className={cn(
        'rounded-2xl bg-white/70 backdrop-blur-lg shadow-glass transition-all duration-300',
        withBorder && 'border border-white/20',
        hoverEffect && 'hover:shadow-glass-hover hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
