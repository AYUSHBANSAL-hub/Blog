"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const initialFeaturedBlog = {
  title: "Lorem ipsum dolor sit amet consectetur.",
  date: "May 2025",
  category: "Models",
  image: "/images/Overlay.svg",
};

const blogPosts = [
  {
    title: "Lorem ipsum dolor sit amet consectetur.",
    date: "June 2025",
    categories: ["Models"],
    image: "/images/model-1.svg",
  },
  {
    title: "Lorem ipsum dolor sit amet consectetur.",
    date: "May 2025",
    categories: ["Models"],
    image: "/images/model-2.svg",
  },
  {
    title: "Lorem ipsum dolor sit amet consectetur.",
    date: "May 2025",
    categories: ["Labs"],
    image: "/images/model-3.svg",
  },
  {
    title: "Lorem ipsum dolor sit amet consectetur.",
    date: "May 2025",
    categories: ["Labs", "Models"],
    image: "/images/model-4.svg",
  },
  {
    title: "Lorem ipsum dolor sit amet consectetur.",
    date: "May 2025",
    categories: ["Labs", "Models"],
    image: "/images/model-4.svg",
  },
  {
    title: "Lorem ipsum dolor sit amet consectetur.",
    date: "May 2025",
    categories: ["Labs", "Models"],
    image: "/images/model-4.svg",
  },
];

const BlogSection = () => {
  const [featuredBlog, setFeaturedBlog] = useState(initialFeaturedBlog);

  return (
    <section className="w-full max-w-[1296px] pb-6 px-4 mx-auto">
      <div className="flex flex-col md:flex-row gap-12 min-h-[700px]">
        {/* Featured Blog */}
        <div className="flex-1 pt-16 flex flex-col gap-9">
          <div className="flex flex-col gap-4">
            <h2 className="font-['Figtree',Helvetica] font-semibold text-black text-[40px] tracking-[-0.51px] leading-10">
              {featuredBlog.title}
            </h2>

            <div className="flex items-center gap-4 h-[38px]">
              <span className="text-[13.6px] font-['Inter',Helvetica] font-light text-[#232323] tracking-[0.16px] leading-[21px]">
                {featuredBlog.date}
              </span>

              <span className="font-['Inter',Helvetica] font-light text-[#232323] text-sm tracking-[0.16px] leading-[21px]">
                {featuredBlog.category}
              </span>

              <Button
                variant="outline"
                className="h-9 rounded-[100px] border-[#00000029] backdrop-blur-[5px] ml-4"
              >
                <span className="font-['Inter',Helvetica] font-semibold text-[#232323] text-[13.9px] tracking-[0.11px] leading-[21px]">
                  Learn more
                </span>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden">
            <div className="p-0">
              <div className="relative w-full h-[622px]">
                <Image
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[#00000017]" />
              </div>
            </div>
          </div>
        </div>

        {/* Blog List */}
        <div className="flex-1 pt-16 max-h-[1000px] border-b-2 overflow-y-auto scroll-smooth pr-2 custom-scrollbar-hide">
          <div className="flex flex-col gap-6">
            {blogPosts.map((post, index) => (
              <div key={index} className="relative cursor-pointer" onClick={() => setFeaturedBlog({
                title: post.title,
                date: post.date,
                category: post.categories[0], // default to first category
                image: post.image,
              })}>
                <div className="flex gap-8 py-6">
                  <div className="flex-1">
                    <h3 className="font-['Figtree',Helvetica] font-semibold text-black text-[30.9px] tracking-[-0.51px] leading-[33.9px] mb-4">
                      {post.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4">
                      <span className="text-[13.6px] font-['Inter',Helvetica] font-light text-[#232323] tracking-[0.16px] leading-[21px]">
                        {post.date}
                      </span>

                      <div className="flex gap-2">
                        {post.categories.map((category, catIndex) => (
                          <span
                            key={catIndex}
                            className="font-['Inter',Helvetica] font-light text-[#232323] text-sm tracking-[0.16px] leading-[21px]"
                          >
                            {category}
                          </span>
                        ))}
                      </div>

                      <Button variant="link" className="p-0 h-9 text-[#004fce]">
                        <span className="font-['Inter',Helvetica] font-semibold text-[13.9px] tracking-[0.11px] leading-[21px]">
                          Learn more
                        </span>
                      </Button>
                    </div>
                  </div>

                  <div className="w-44 h-44 rounded-2xl overflow-hidden border-0 relative">
                    <div className="p-0 h-full">
                      <div className="relative h-full w-full">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-[#00000017]" />
                      </div>
                    </div>
                  </div>
                </div>

                {index < blogPosts.length - 1 && (
                  <Separator className="w-full h-px bg-[#00000017]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
