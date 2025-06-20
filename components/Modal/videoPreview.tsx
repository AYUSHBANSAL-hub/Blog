import React from 'react';
import { Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';


interface VideoPreviewProps {
  previewImage: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  isLoading?: boolean;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({
  previewImage,
  isPlaying,
  onTogglePlay,
  isLoading = false
}) => {
  return (
    <div className="flex flex-col w-[635px] items-start">
      <div className="flex flex-col w-[637.81px] items-start relative mr-[-3.00px]">
        <div className="flex flex-col items-start p-[3px] relative w-full">
          <div 
            className="relative w-full h-[355.39px] rounded-3xl bg-cover bg-center cursor-pointer group transition-transform duration-300 hover:scale-[1.02]"
            style={{ backgroundImage: `url(${previewImage})` }}
            onClick={onTogglePlay}
          >
            {/* Play/Pause overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={cn(
                "flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300",
                "bg-black/60 backdrop-blur-sm border border-white/20",
                "group-hover:bg-black/80 group-hover:scale-110",
                isLoading && "animate-pulse"
              )}>
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" />
                )}
              </div>
            </div>

            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
};