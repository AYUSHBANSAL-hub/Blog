import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const blogCards = [
  {
    category: "PRODUCT",
    title: "Loreum Ipsum: lorem ipsum dolor sit amet...",
    imageUrl: "/images/product-1.png",
  },
  {
    category: "YOUTUBE",
    title: "Fueling India's Musical Renaissance...",
    imageUrl: "/images/product-2.png",
  },
  {
    category: "AI & ML",
    title: "75% of Indians desire a daily growth collaborator...",
    imageUrl: "/images/product-3.png",
  },
];

const SubcategoryList = ({ onSubcategoryClick }: { onSubcategoryClick: (category: string) => void }) => {
  return (
    <section className="flex flex-col w-full items-center justify-center gap-10 py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1260px]">
        {blogCards.map((card, index) => (
          <Card
            key={index}
            onClick={() => onSubcategoryClick(card.category)}
            className="flex flex-col justify-between h-full border border-[#dadce0] rounded-xl overflow-hidden shadow-sm cursor-pointer"
          >
            <div className="flex flex-col justify-between h-full px-6 pt-6 pb-4 flex-1">
              <CardHeader className="p-0 mb-2">
                <div className="text-[#1a73e8] text-sm font-medium tracking-wide">
                  {card.category}
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-1">
                <p className="text-[#202124] text-base leading-6 whitespace-pre-line">
                  {card.title}
                </p>
              </CardContent>
            </div>
            <div className="h-[180px] w-full border-t border-[#dadce0]">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${card.imageUrl})` }}
              />
            </div>
          </Card>
        ))}
      </div>
      <Button
        variant="outline"
        className="rounded-full border-[#5f6368] text-[#1a73e8] text-base font-medium px-10 py-3"
      >
        Load more Blogs
      </Button>
    </section>
  );
};

export default SubcategoryList;
