import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Product } from '@/types';
import { Button } from '../ui/button';


interface ProductInfoProps {
  product: Product;
  onCtaClick: (url: string) => void;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product, onCtaClick }) => {
  return (
    <div className="flex flex-col w-[900px] h-[381px] items-center gap-2.5">
      {/* Preview label with animation */}
      <div className="flex flex-col items-center relative w-full">
        <div className="relative [font-family:'Figtree',Helvetica] font-medium text-[#9aa0a6] text-[11px] text-center tracking-[0.50px] leading-4 animate-pulse">
          PREVIEW
        </div>
      </div>

      {/* Product title with slide-in animation */}
      <div className="flex flex-col items-center relative w-full">
        <h1 className="relative [font-family:'Figtree',Helvetica] font-bold text-white text-5xl text-center tracking-[-0.50px] leading-[56px] animate-in slide-in-from-bottom-4 duration-700">
          {product.title}
        </h1>
      </div>

      {/* Product subtitle */}
      <div className="flex flex-col max-w-[616px] w-[616px] items-start pt-0 pb-2 px-0 relative">
        <div className="flex flex-col items-center relative w-full">
          <p className="relative [font-family:'Figtree',Helvetica] font-normal text-[#9aa0a6] text-lg text-center tracking-[0] leading-7 animate-in slide-in-from-bottom-4 duration-700 delay-150">
            {product.subtitle}
          </p>
        </div>
      </div>

      {/* CTA and description */}
      <div className="inline-flex flex-col items-center gap-8 relative animate-in slide-in-from-bottom-4 duration-700 delay-300">
        {/* Try Now button with hover effects */}
        <Button 
          onClick={() => onCtaClick(product.ctaUrl)}
          className="inline-flex min-w-24 min-h-[50px] items-center gap-2 px-7 py-[13px] relative rounded-[48px] overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-purple-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 focus:ring-2 focus:ring-blue-400 focus:outline-none group"
        >
          <span className="relative [font-family:'Figtree',Helvetica] font-medium text-white text-base text-center tracking-[0.50px] leading-6 whitespace-nowrap">
            {product.ctaText}
          </span>
          <ExternalLink className="w-[18px] h-[18px] text-white transition-transform duration-300 group-hover:translate-x-1" />
        </Button>

        {/* Product description */}
        <p className="relative w-[900px] [font-family:'Figtree',Helvetica] font-normal text-neutral-300 text-lg text-center tracking-[0] leading-[25.2px] opacity-90">
          {product.description}
        </p>
      </div>
    </div>
  );
};