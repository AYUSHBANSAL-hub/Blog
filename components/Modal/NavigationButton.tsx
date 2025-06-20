import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';


interface NavigationButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  className?: string;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  direction,
  onClick,
  className
}) => {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;

  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={cn(
        "flex items-center justify-center w-16 h-16 bg-black/60 backdrop-blur-sm rounded-full",
        "border border-white/20 p-4 transition-all duration-300",
        "hover:bg-black/80 hover:border-white/40 hover:scale-110",
        "focus:ring-2 focus:ring-white/50 focus:outline-none",
        className
      )}
      aria-label={`${direction === 'left' ? 'Previous' : 'Next'} product`}
    >
      <Icon className="w-8 h-8 text-white" />
    </Button>
  );
};