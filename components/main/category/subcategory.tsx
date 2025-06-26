import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const blogCards = [
  {
    category: "PRODUCT",
    title: "AlphaGenome: AI for better understanding the genome",
    imageUrl: "/images/landing/Product-1.svg",
  },
  {
    category: "YOUTUBE",
    title: "Fueling India's Musical Renaissance: YouTube's Commitment to Artists, Fans, and the Future",
    imageUrl: "/images/landing/Product-2.svg",
  },
  {
    category: "AI & ML",
    title: "75% of Indians desire a daily growth collaborator: Google-Kantar report",
    imageUrl: "/images/landing/Product-3.svg",
  },
];

const SubcategoryList = ({ onSubcategoryClick }: { onSubcategoryClick: (category: string) => void }) => {
  return (
     <section className="flex flex-col w-full items-center gap-3 py-6">
           <div className="w-full max-w-[1270px]">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:mt-3 gap-6 ">
               {blogCards.map((blog, index) => (
                 <div
                   key={index}
                   onClick={() => onSubcategoryClick(blog.category)}
                   className=" flex  flex-col font-normal  justify-between border min-h-[420px] border-[#dadce0] rounded-[8px] overflow-hidden hover:shadow-md transition-shadow bg-white"
                 >
                   <div className="px-9 pt-5 flex flex-col gap-4" style={{ fontFamily: 'var(--font-roboto)' }}>
                     <p className="text-[#1A73E8] !font-roboto cursor-default text-[14px] font-[500] uppercase leading-[48px] tracking-[0.25px] ">
                       {blog.category}
                     </p>
                     <p className="text-[#202124] cursor-default w-[330px] text-[20px] font-roboto  font-[400] leading-[1.4] ">
                       {blog.title}
                     </p>
                   </div>
     
                   <div className="relative border-t-2 w-full mt-2 h-[182px]">
                     <Image
                       src={blog.imageUrl}
                       alt={blog.title}
                       fill
                       className="object-cover"
                     />
                   </div>
                 </div>
               ))}
             </div>
           </div>
     
           <Button
             variant="outline"
             className="min-w-[250px] mt-[22px] font-[500]  font-figtree text-[16px] max-w-[380px] min-h-12 px-[58.44px] py-[12px] rounded-full border border-[#5F6368] text-[#1A73E8] hover:bg-[#f1f3f4]"
           >
             Load more Categories
           </Button>
         </section>
  );
};

export default SubcategoryList;
