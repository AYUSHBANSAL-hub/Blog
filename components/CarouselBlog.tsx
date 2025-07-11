"use client";

import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type RelatedBlog = {
  blog_id: string;
  category: string;
  title: string;
  author?: string;
  createdAt?: string;
  coverImageUrl?: string;
};

const categoryValue = {  
  "6127b7b9-fcc8-4ed8-9890-09ce60c29db7": "Startup",
  "dc743317-c69c-44a9-abd5-65898ac16ede": "Technology",
  "a58f7e32-a97f-4349-a4d3-c02ab5e978ac": "Lifestyle",
  "cace7d4c-4b01-4de8-8184-418b67eb18df": "Design"
}

const SubscriptionSection = () => {
  const searchParams = useSearchParams();
  const blogId = searchParams.get("blogId");
  const [blogs, setBlogs] = useState<RelatedBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Responsive slides per view
  const [slidesPerView, setSlidesPerView] = useState(1);
  
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3); // lg: 3 items
      } else if (window.innerWidth >= 640) {
        setSlidesPerView(2); // sm: 2 items
      } else {
        setSlidesPerView(1); // mobile: 1 item
      }
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  const lastIndex = Math.max(blogs.length - slidesPerView, 0);

  const router = useRouter();

  useEffect(() => {
    if (!blogId) return;
    setLoading(true);
    fetch(`/api/blogs/${blogId}/related`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          const formatted: RelatedBlog[] = (data.related || []).map((b: any) => ({
            blog_id: b.blog_id,
            category: (b.category || "BLOG").toUpperCase(),
            title: b.title,
            author: b.author || "Author",
            createdAt: b.createdAt,
            coverImageUrl: b.coverImageUrl || "/images/landing/Product-1.svg",
          }));
          setBlogs(formatted);
        }
      })
      .catch((err) => console.error("Failed to load related blogs:", err))
      .finally(() => setLoading(false));
  }, [blogId]);

  const handlePrev = () => setCurrentSlide((c) => (c > 0 ? c - 1 : 0));
  const handleNext = () => setCurrentSlide((c) => (c < lastIndex ? c + 1 : c));

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeInOut" },
    },
  };
  const imgVariants = {
    initial: { scale: 1 },
    hovered: { scale: 1.05, transition: { duration: 0.35 } },
  };
  const arrowVariants = {
    initial: { x: 0 },
    hovered: { x: 4, transition: { duration: 0.25 } },
  };

  return (
    <section className="w-full py-4 sm:py-6 md:py-9 pb-2.5">
      <div className="flex flex-col items-center w-full">
        {/* Section header */}
        <div className="max-w-[1260px] w-full px-4">
          <div className="flex justify-center py-6 sm:py-8 md:py-12">
            <h2 className="font-normal text-2xl sm:text-3xl md:text-[35.9px] leading-8 sm:leading-10 md:leading-[44px] tracking-[-0.25px] text-[#202124] text-center font-['Figtree',Helvetica]">
              Related stories
            </h2>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative w-full px-2 sm:px-4">
          <Carousel className="w-full max-w-[1920px]">
            <CarouselContent
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${
                  (100 / slidesPerView) * currentSlide
                }%)`,
              }}
            >
              {(loading ? Array(3).fill(null) : blogs).map((post, idx) => (
                <CarouselItem
                  key={post?.blog_id || idx}
                  className="w-full sm:basis-1/2 lg:basis-1/3 px-1 sm:px-2 md:px-2.5 flex-shrink-0"
                >
                  <motion.div
                    variants={cardVariants as any}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    whileHover="hovered"
                    className="h-full cursor-pointer"
                    onClick={() => !loading && post && router.push(`/blog-open?blogId=${post.blog_id}`)}
                  >
                    <Card className="h-[380px] sm:h-[420px] md:h-[480px] py-0 border border-[#dadce0] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="h-full flex flex-col justify-between p-0">
                        <div>
                          <motion.div
                            variants={imgVariants}
                            initial="initial"
                            className="h-36 sm:h-44 md:h-52 hover:h-40 sm:hover:h-48 md:hover:h-56 transition-all ease-in-out overflow-hidden"
                          >
                            {loading ? (
                              <Skeleton className="w-full h-full" />
                            ) : (
                              <img
                                src={post!.coverImageUrl!}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            )}
                          </motion.div>

                          <div className="px-4 sm:px-6 md:px-10 pt-3 sm:pt-4 md:pt-6">
                            {loading ? (
                              <Skeleton className="w-16 sm:w-20 h-3 sm:h-4" />
                            ) : (
                              <span
                                className="text-xs sm:text-sm md:text-[14px] uppercase font-[500] leading-6 sm:leading-8 md:leading-[44px] tracking-[1.2px] sm:tracking-[1.5px] text-[#202124]"
                                style={{ fontFamily: "var(--font-roboto)" }}
                              >                               
                                {categoryValue[post?.category.toLowerCase() as keyof typeof categoryValue]}
                              </span>
                            )}
                          </div>

                          <div className="px-4 sm:px-6 md:px-10 pt-1 h-14 sm:h-16 md:h-20">
                            {loading ? (
                              <Skeleton className="w-full h-8 sm:h-10 md:h-12" />
                            ) : (
                              <h3
                                className="text-base sm:text-lg md:text-[22px] leading-5 sm:leading-6 md:leading-[30px] line-clamp-2 text-[#202124] font-medium"
                                style={{ fontFamily: "var(--font-roboto)" }}
                              >
                                {post!.title}
                              </h3>
                            )}
                          </div>
                        </div>

                        <div className="relative flex items-center px-4 sm:px-6 md:px-10 pb-4 sm:pb-6 md:pb-10">
                          {loading ? (
                            <Skeleton className="w-32 sm:w-40 md:w-[180px] h-3 sm:h-4" />
                          ) : (
                            <>
                              <div className="flex gap-0.5 items-center flex-wrap">
                                <span
                                  className="text-xs sm:text-sm md:text-base font-light leading-4 sm:leading-5 text-[#414141]"
                                  style={{
                                    fontFamily: "var(--font-roboto)",
                                  }}
                                >
                                  Posted by {post!.author}
                                </span>
                                <span className="text-xs sm:text-sm md:text-base font-light leading-4 sm:leading-5 text-[#414141] hidden sm:inline">
                                  &nbsp;–&nbsp;
                                </span>
                                <span
                                  className="text-xs sm:text-sm md:text-base font-light leading-4 sm:leading-5 text-[#414141] block sm:inline mt-1 sm:mt-0"
                                  style={{
                                    fontFamily: "var(--font-roboto)",
                                  }}
                                >
                                  {post!.createdAt
                                    ? new Date(post!.createdAt).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                      })
                                    : ""}
                                </span>
                              </div>

                              <motion.div
                                variants={arrowVariants}
                                initial="initial"
                                className="absolute right-4 sm:right-6 md:right-10 bottom-4 sm:bottom-6 md:bottom-10"
                              >
                                <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-[18px] md:w-[18px] text-[#414141]" />
                              </motion.div>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Prev / Next buttons */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={handlePrev}
            disabled={currentSlide === 0}
            aria-label="Previous slide"
            className="absolute left-0 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 md:h-[68px] md:w-[68px] rounded-full 
                       bg-white border border-[#d2d2d2] flex items-center justify-center
                       disabled:opacity-40 disabled:cursor-not-allowed z-10 shadow-sm"
          >
            <ArrowRightIcon className="-scale-x-100 w-4 h-4 sm:w-5 sm:h-5 md:w-[18px] md:h-[18px] text-[#414141]" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleNext}
            disabled={currentSlide === lastIndex}
            aria-label="Next slide"
            className="absolute right-0 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 md:h-[68px] md:w-[68px] rounded-full 
                       bg-white border border-[#d2d2d2] flex items-center justify-center
                       disabled:opacity-40 disabled:cursor-not-allowed z-10 shadow-sm"
          >
            <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-[18px] md:h-[18px] text-[#414141]" />
          </motion.button>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center pt-3 sm:pt-3.5 gap-1.5 sm:gap-2">
          {Array.from({ length: lastIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-11 md:w-11 items-center justify-center rounded-[22px]"
            >
              <div
                className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-[5px] border-2 border-[#202124] ${
                  idx === currentSlide ? "bg-[#202124]" : ""
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;