"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";

type BlogCategory = {
  category_id: string;
  category_name: string;
  category_description: string;
  category_image: string;
};

const ITEMS_PER_PAGE = 3;

const CategoryProductSection = ({
  onProductClick,
}: {
  onProductClick: (category: string, category_id: string) => void;
}) => {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [showingAll, setShowingAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/blogs/categories");
        const data = await res.json();
        if (data.status && data.categories) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Failed to load categories", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const visibleCategories = categories.slice(0, visibleCount);

  const handleToggle = () => {
    if (showingAll) {
      setVisibleCount(ITEMS_PER_PAGE);
      setShowingAll(false);
    } else {
      setVisibleCount(categories.length);
      setShowingAll(true);
    }
  };

  return (
    <section className="flex flex-col w-full items-center gap-3 py-6">
      <div className="w-full max-w-[1270px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:mt-3 gap-6">
          {loading
            ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col font-normal justify-between border min-h-[420px] border-[#dadce0] rounded-[8px] overflow-hidden bg-white animate-fadeIn"
                >
                  <div className="px-9 pt-5 flex flex-col gap-4">
                    <Skeleton className="h-[18px] w-[120px] rounded-md" />
                    <Skeleton className="h-[48px] w-[300px] rounded-md" />
                  </div>
                  <div className="border-t-2 w-full mt-2 h-[182px]">
                    <Skeleton className="w-full h-full rounded-none" />
                  </div>
                </div>
              ))
            : visibleCategories.map((blog, index) => (
                <div
                  key={index}
                  onClick={() => onProductClick(blog.category_name, blog.category_id)}
                  className="
                    group
                    flex flex-col font-normal justify-between
                    border min-h-[420px] border-[#dadce0]
                    rounded-[8px] overflow-hidden
                    bg-white cursor-pointer
                    hover:shadow-lg hover:scale-[1.015]
                    transition-all duration-300 ease-in-out
                    animate-fadeIn
                  "
                >
                  <div
                    className="px-9 pt-5 flex flex-col gap-4"
                    style={{ fontFamily: "var(--font-roboto)" }}
                  >
                    <p className="text-[#1A73E8] !font-roboto cursor-default text-[14px] font-[500] uppercase leading-[48px] tracking-[0.25px]">
                      {blog.category_name}
                    </p>
                    <p className="text-[#202124] line-clamp-2 cursor-default w-[330px] text-[20px] font-roboto font-[400] leading-[1.4]">
                      {blog.category_description || "No description available."}
                    </p>
                  </div>

                  <div className="relative border-t-2 w-full mt-2 h-[182px] overflow-hidden group">
                    <Image
                      src={blog.category_image || "/images/placeholder.png"}
                      alt={blog.category_name}
                      fill
                      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                  </div>
                </div>
              ))}
        </div>
      </div>

      {!loading && categories.length > ITEMS_PER_PAGE && (
        <Button
          variant="outline"
          onClick={handleToggle}
          className="min-w-[250px] font-[500] mt-[19px] font-figtree text-[16px] max-w-[380px] min-h-12 px-[58.44px] py-[12px] rounded-full border border-[#5F6368] text-[#1A73E8] hover:bg-[#f1f3f4] transition-all duration-300"
        >
          {showingAll ? "Show Less" : "Load more Categories"}
        </Button>
      )}
    </section>
  );
};

export default CategoryProductSection;
