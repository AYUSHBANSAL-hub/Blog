import { cn } from '@/lib/utils';
import React from 'react';


interface PaginationIndicatorsProps {
  total: number;
  current: number;
  onIndicatorClick: (index: number) => void;
}

export const PaginationIndicators: React.FC<PaginationIndicatorsProps> = ({
  total,
  current,
  onIndicatorClick
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }, (_, index) => (
        <button
          key={index}
          onClick={() => onIndicatorClick(index)}
          className={cn(
            "h-2.5 rounded-full border border-white transition-all duration-300 hover:bg-white/20",
            index === current 
              ? "w-[50px] bg-white/80" 
              : "w-2.5 bg-white/30 hover:bg-white/50"
          )}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};