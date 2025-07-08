"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

type Blog = {
  blog_id: string;
  category: string;
  title: string;
  content: string;
  subHeading?: string;
  coverImageUrl?: string;
};

export default function BlogHero() {
  const [pinnedBlog, setPinnedBlog] = useState<Blog | null>(null);
  const controls = useAnimation();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch("/api/blogs/pinned");
        const data = await res.json();
        if (data.blogs?.length > 0) {
          setPinnedBlog(data.blogs[0]);
        }
      } catch (err) {
        console.error("Error fetching pinned blog:", err);
      }
    };

    fetchBlog();
  }, []);

  useEffect(() => {
    if (pinnedBlog) {
      // Wait for next paint before animating (to ensure layout is ready)
      requestAnimationFrame(() => {
        controls.start({
          opacity: 1,
          x: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        });
      });
    }
  }, [pinnedBlog, controls]);

  if (!pinnedBlog) return null; // Or show loader

  return (
    <section className="relative flex flex-col items-start justify-center px-4 py-6 md:px-1 overflow-x-hidden">
      <div className="relative w-full max-w-screen-xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start">
        {/* Image Section */}
        <div className="relative w-full md:-ml-10 h-[300px] sm:h-[360px] md:h-[507.67px] md:w-[950px] rounded-[16px] overflow-hidden">
          <Image
            src={pinnedBlog.coverImageUrl || "/images/blog-2.svg"}
            alt={pinnedBlog.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Animated Overlapping Card */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={controls}
          className={`
            w-full sm:w-[90%] max-w-md
            mt-6 md:mt-0
            md:absolute md:-right-[-200px] lg:-right-[-100px] xl:-right-[10px] 2xl:-right-[35px] md:top-1/2 md:-translate-y-1/2 
            z-10
          `}
        >
          <Card className="rounded-2xl h-full w-full md:w-[476px] pt-6 shadow-xl px-8 pb-6 bg-white">
            <CardContent className="px-0">
              <div className="text-[#1A73E8] capitalize py-4 md:pt-4 text-sm font-medium" style={{ fontFamily: 'var(--font-roboto)' }}>
                {pinnedBlog.category}
              </div>
              <h2 className="text-xl  cursor-default md:text-[35.58px] font-medium text-[#202124] md:pt-1 text-center md:text-left">
                {pinnedBlog.title}
              </h2>
              <p className="text-sm md:text-base line-clamp-1 md:mt-3 text-[#5F6368] mt-2 text-center md:text-left" style={{ fontFamily: 'var(--font-roboto)' }}>
                {pinnedBlog.subHeading || ""}
              </p>
              <div className="flex justify-center md:justify-end pt-10">
                <img src="/images/landing/Vector-6.svg" alt="Arrow" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
