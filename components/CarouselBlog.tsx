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

const SubscriptionSection = () => {
  const searchParams = useSearchParams();
  const blogId = searchParams.get("blogId");
  const [blogs, setBlogs] = useState<RelatedBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesPerView = 3;
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
    <section className="w-full md:py-9 pb-2.5">
      <div className="flex flex-col items-center w-full">
        {/* Section header */}
        <div className="max-w-[1260px] w-full">
          <div className="flex justify-center py-12">
            <h2 className="font-normal text-[35.9px] leading-[44px] tracking-[-0.25px] text-[#202124] text-center font-['Figtree',Helvetica]">
              Related stories
            </h2>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative w-full">
          <Carousel className="w-full max-w-[1920px]">
            <CarouselContent
              className="flex transition-transform duration-500 ease-out px-4"
              style={{
                transform: `translateX(-${
                  (100 / slidesPerView) * currentSlide
                }%)`,
              }}
            >
              {(loading ? Array(3).fill(null) : blogs).map((post, idx) => (
                <CarouselItem
                  key={post?.blog_id || idx}
                  className="md:basis-1/2 lg:basis-1/3 px-2.5 flex-shrink-0"
                >
                  <motion.div
                    variants={cardVariants as any}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    whileHover="hovered"
                    className="h-full"
                    onClick={() => !loading && post && router.push(`/blog-open?blogId=${post.blog_id}`)}
                  >
                    <Card className="h-[480px] py-0 border border-[#dadce0] rounded-lg overflow-hidden">
                      <CardContent className="h-full flex flex-col justify-between p-0">
                        <div>
                          <motion.div
                            variants={imgVariants}
                            initial="initial"
                            className="h-52 hover:h-56 transition-all ease-in-out overflow-hidden"
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

                          <div className="px-10 pt-6">
                            {loading ? (
                              <Skeleton className="w-20 h-4" />
                            ) : (
                              <span
                                className="text-[14px] font-[500] leading-[44px] tracking-[1.5px] text-[#202124]"
                                style={{ fontFamily: "var(--font-roboto)" }}
                              >
                                {post!.category}
                              </span>
                            )}
                          </div>

                          <div className="px-10 pt-1 h-20">
                            {loading ? (
                              <Skeleton className="w-full h-12" />
                            ) : (
                              <h3
                                className="text-[22px] leading-[30px] line-clamp-2 text-[#202124]"
                                style={{ fontFamily: "var(--font-roboto)" }}
                              >
                                {post!.title}
                              </h3>
                            )}
                          </div>
                        </div>

                        <div className="relative flex items-center px-10 pb-10">
                          {loading ? (
                            <Skeleton className="w-[180px] h-4" />
                          ) : (
                            <>
                              <div className="flex gap-0.5 items-center">
                                <span
                                  className="text-base font-light leading-5 text-[#414141]"
                                  style={{
                                    fontFamily: "var(--font-roboto)",
                                  }}
                                >
                                  Posted by {post!.author}
                                </span>
                                <span className="text-base font-light leading-5 text-[#414141]">
                                  &nbsp;–&nbsp;
                                </span>
                                <span
                                  className="text-base font-light leading-5 text-[#414141]"
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
                                className="absolute right-10 bottom-10"
                              >
                                <ArrowRightIcon className="h-[18px] w-[18px] text-[#414141]" />
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
            className="absolute left-4 top-1/2 -translate-y-1/2 h-[68px] w-[68px] rounded-full 
                       bg-white border border-[#d2d2d2] flex items-center justify-center
                       disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowRightIcon className="-scale-x-100 w-[18px] h-[18px] text-[#414141]" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleNext}
            disabled={currentSlide === lastIndex}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 h-[68px] w-[68px] rounded-full 
                       bg-white border border-[#d2d2d2] flex items-center justify-center
                       disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowRightIcon className="w-[18px] h-[18px] text-[#414141]" />
          </motion.button>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center pt-3.5 gap-2">
          {Array.from({ length: lastIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="flex h-11 w-11 items-center justify-center rounded-[22px]"
            >
              <div
                className={`h-2.5 w-2.5 rounded-[5px] border-2 border-[#202124] ${
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
