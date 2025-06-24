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
  
];

const BlogSection = () => {
  const [featuredBlog, setFeaturedBlog] = useState(initialFeaturedBlog);

  return (
    <section className="w-full max-w-[1296px] pb-6 px-2 mx-auto">
      <div className="flex flex-col md:flex-row gap-[48px] min-h-[700px]">
        {/* Featured Blog */}
        <div className="flex-1 pt-12 flex flex-col gap-[16px]">
          <div className="flex flex-col gap-4">
            <h2 className="font-[600] text-black text-[40px] tracking-[-0.51px] leading-[40px]">
              {featuredBlog.title}
            </h2>

            <div className="flex items-center gap-[19.56px] h-[38px]">
              <span className="text-[13.6px] font-[300] text-[#232323] tracking-[0.16px] leading-[21px]"style={{ fontFamily: 'var(--font-roboto)' }}>
                {featuredBlog.date}
              </span>

              <span className="font-['Inter',Helvetica] font-light text-[#232323] text-sm tracking-[0.16px] leading-[21px]"style={{ fontFamily: 'var(--font-roboto)' }}>
                {featuredBlog.category}
              </span>

              <Button
                variant="outline"
                className="h-9 rounded-[100px] pt-[6.5px] pb-[7.48px] pr-[9px] pl-[16px] backdrop-blur-[10px]  border-[#00000029]"
              >
                <span className="font-[500] text-[#232323] text-[13.9px] tracking-[0.11px] leading-[21px]"style={{ fontFamily: 'var(--font-roboto)' }}>
                  Learn more
                </span>
              </Button>
            </div>
          </div>

          <div className=" mt-[25px] rounded-[16px] overflow-hidden">
            <div className="">
              <div className="relative w-full  max-w-[622px] h-[422px] md:h-[622px]">
                <Image
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  fill
                  className="object-cover "
                />
                <div className="absolute inset-0 bg-[#00000017]" />
              </div>
            </div>
          </div>
        </div>

        {/* Blog List */}
        <div className="flex-1 pt-10 max-h-[1000px] border-b-2 overflow-y-auto scroll-smooth pr-2 custom-scrollbar-hide">
          <div className="flex flex-col gap-10 ">
            {blogPosts.map((post, index) => (
              <div key={index} className="relative cursor-pointer" onClick={() => setFeaturedBlog({
                title: post.title,
                date: post.date,
                category: post.categories[0], // default to first category
                image: post.image,
              })}>
                <div className="flex w-full max-w-[624px] pb-10 gap-[48px]">
                  <div className="flex-1">
                    <h3 className="font-[600] mt-3 text-black text-[30.8px] tracking-[-0.51px] leading-[33.9px] mb-4">
                      {post.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4">
                      <span className="text-[13.6px]  font-[300] text-[#232323] tracking-[0.16px] leading-[21px]" style={{ fontFamily: 'var(--font-roboto)' }}>
                        {post.date}
                      </span>

                      <div className="flex">
                        {post.categories.map((category, catIndex) => (
                          <span
                            key={catIndex}
                            className="text-[14.06px] font-light text-[#232323] text-sm tracking-[0.16px] leading-[21px]"
                            style={{ fontFamily: 'var(--font-roboto)' }}
                          >
                            {category}
                          </span>
                        ))}
                      </div>

                      <Button variant="link" className="p-0 h-9 text-[#004FCF]">
                        <span className="font-[600] text-[13.9px] tracking-[0.11px] leading-[21px]" style={{ fontFamily: 'var(--font-roboto)' }}>
                          Learn more
                        </span>
                      </Button>
                    </div>
                  </div>

                  <div className="w-[176px] h-[176px] rounded-[16px] overflow-hidden border-0 relative">
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
