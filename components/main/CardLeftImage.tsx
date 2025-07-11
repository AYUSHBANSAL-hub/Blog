import React from "react";
import { Card } from "../ui/card";

interface CardProps {
  title: string;
  description: string;
  image: string;
  badge?: { text: string };
}

const CardLeftImage: React.FC<CardProps> = ({ title, description, image, badge }) => {
  return (
    <div className="relative w-full max-w-full   md:max-w-[600px]">
      {/* Floating Image */}
      <div
        className="
          absolute 
          w-[80px] h-[80px] 
          sm:w-[90px] sm:h-[90px] 
          md:w-[130px] md:h-[130px] 
          rounded-[14px] overflow-hidden z-10 shadow-md 
          -top-[40px] left-1/2 -translate-x-1/2 
          md:top-[-20px] md:left-[-55px] md:translate-x-0
        "
      >
        <div
          className="w-full h-full  bg-cover bg-center rounded-[14px]"
          style={{ backgroundImage: `url(${image})` }}
        />
        {badge && (
          <div className="absolute top-[-10px] right-[-10px] px-2 py-[2px] rounded-full bg-white border border-black text-[10px] font-medium">
            {badge.text}
          </div>
        )}
      </div>

      {/* Card */}
      <Card
        className="
          flex flex-col justify-center 
          p-4 pt-[60px] 
          sm:p-6 sm:pt-[70px] 
          md:p-8 md:pt-8 md:pl-[110px] 
          rounded-[12px] border border-black shadow-sm relative
        "
      >
        <h3 className="font-medium text-[#202124] text-base sm:text-lg md:text-xl leading-[22px] mb-2">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-[#202124] leading-[20px]">
          {description}
        </p>
      </Card>
    </div>
  );
};

export default CardLeftImage;
