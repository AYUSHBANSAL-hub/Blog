"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const blogCards = [
  {
    category: "Product",
    title: "Loreum Ipsum: Lorem ipsum dolor sit amet.",
    imagePath: "/images/product-1.png",
  },
  {
    category: "YouTube",
    title: "Fueling India's Musical Renaissance",
    imagePath: "/images/product-2.png",
  },
  {
    category: "AI & ML",
    title: "75% of Indians desire a daily growth collaborator",
    imagePath: "/images/product-3.png",
  },
];

const ProductSection = ({ onProductClick }: { onProductClick: (category: string) => void }) => {
  return (
    <section className="flex flex-col w-full items-center gap-6 py-6">
      <div className="flex flex-col w-full max-w-[1260px] items-start">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {blogCards.map((blog, index) => (
            <Card
              key={index}
              onClick={() => onProductClick(blog.category)}
              className="cursor-pointer flex flex-col w-full border border-[#dadce0] rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pt-1 pb-2 px-9">
                <CardTitle className="text-[#1a73e8] text-sm leading-[48px] font-medium">
                  {blog.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col justify-between h-full p-0">
                <div className="px-9 text-[#202124] text-xl leading-7">
                  {blog.title}
                </div>
                <div className="relative w-full h-[218px] mt-4 border-t border-[#dadce0]">
                  <Image
                    src={blog.imagePath}
                    alt={blog.title}
                    fill
                    className="object-center"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        className="min-w-[250px] max-w-[380px] min-h-12 px-[58px] py-2.5 rounded-[48px] border border-solid border-[#5f6368] bg-white"
      >
        <span className="text-[#1a73e8] text-base font-medium">Load more Blogs</span>
      </Button>
    </section>
  );
};

export default ProductSection;
