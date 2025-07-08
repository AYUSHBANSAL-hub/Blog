"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

const ITEMS_PER_PAGE = 3;

const SubcategoryList = ({
  onSubcategoryClick,
  subcategories,
}: {
  onSubcategoryClick: (category: string , category_id : string) => void;
  subcategories: any[];
}) => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // simulate fetch delay
    return () => clearTimeout(timeout);
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleShowLess = () => {
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const visibleSubcategories = subcategories.slice(0, visibleCount);
  const hasMore = visibleCount < subcategories.length;

  return (
    <section className="flex flex-col w-full items-center gap-3 py-6">
      <div className="w-full max-w-[1270px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:mt-3 gap-6">
          {loading
            ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col font-normal justify-between border min-h-[420px] border-[#dadce0] rounded-[8px] overflow-hidden bg-white"
                >
                  <div className="px-9 pt-5 flex flex-col gap-4">
                    <Skeleton className="h-[18px] w-[150px]" />
                    <Skeleton className="h-[50px] w-[300px]" />
                  </div>
                  <div className="border-t-2 w-full mt-2 h-[182px]">
                    <Skeleton className="w-full h-full rounded-none" />
                  </div>
                </div>
              ))
            : visibleSubcategories.map((subcategory: any, index: number) => (
                <div
                  key={index}
                  onClick={() => onSubcategoryClick(subcategory.subcategory_name , subcategory.subcategory_id)}
                  className="flex flex-col font-normal justify-between border min-h-[420px] border-[#dadce0] rounded-[8px] overflow-hidden hover:shadow-md transition-shadow bg-white"
                >
                  <div
                    className="px-9 pt-5 flex flex-col gap-4"
                    style={{ fontFamily: "var(--font-roboto)" }}
                  >
                    <p className="text-[#1A73E8] !font-roboto cursor-default text-[14px] font-[500] uppercase leading-[48px] tracking-[0.25px]">
                      {subcategory.subcategory_name}
                    </p>
                    <p className="text-[#202124] line-clamp-2 cursor-default w-[330px] text-[20px] font-roboto font-[400] leading-[1.4]">
                      {subcategory.subcategory_description}
                    </p>
                  </div>
                  <div className="relative border-t-2 w-full mt-2 h-[182px]">
                    <Image
                      src={subcategory.subcategory_image}
                      alt={subcategory.subcategory_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
        </div>
      </div>

      {!loading && subcategories.length > ITEMS_PER_PAGE && (
        <Button
          onClick={hasMore ? handleShowMore : handleShowLess}
          variant="outline"
          className="min-w-[250px] mt-[22px] font-[500] font-figtree text-[16px] max-w-[380px] min-h-12 px-[58.44px] py-[12px] rounded-full border border-[#5F6368] text-[#1A73E8] hover:bg-[#f1f3f4]"
        >
          {hasMore ? "Load more Categories" : "Show less"}
        </Button>
      )}
    </section>
  );
};

export default SubcategoryList;
