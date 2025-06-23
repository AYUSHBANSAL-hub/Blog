"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const blogData = [
  {
    category: "PRODUCT",
    title: "Lorem ipsum dolor sit amet consectetur.",
    description: "Lorem ipsum dolor sit amet consectetur.",
    image: "/images/blog-2.svg",
  },
];

export default function BlogHero() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    });
  }, [controls]);

  return (
    <section className="relative flex flex-col  items-start justify-center  px-4 py-6 md:px-1 overflow-x-hidden">
      {blogData.map((blog, index) => (
        <div
          key={index}
          className="relative w-full max-w-screen-xl mx-auto flex flex-col md:flex-row items-center md:item-start justify-center md:justify-start"
        >
          {/* Image Section */}
          <div className="relative w-full md:-ml-10 h-[300px] sm:h-[360px] md:h-[507.67px] md:w-[950px] rounded-2xl overflow-hidden ">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover "
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
              md:absolute md:-right-[35px] md:top-1/2 md:-translate-y-1/2 md:w-[35%]
              z-10
            `}
          >
            <Card className="rounded-2xl w-full md:w-[476px] h-auto md:h-[320px] pt-6 shadow-xl px-8 pb-6 bg-white">
              <CardContent className="px-0">
                <div className="text-[#1A73E8] py-4 md:pt-4 font-roboto text-sm font-medium">
                  {blog.category}
                </div>
                <h2 className="text-xl cursor-default  md:text-[35.58px] font-medium text-[#202124]  md:pt-1 text-center md:text-left">
                  {blog.title}
                </h2>
                <p className="text-sm md:text-base md:mt-3 text-[#5F6368] mt-2 text-center md:text-left">
                  {blog.description}
                </p>
                <div className="flex justify-center md:justify-end pt-10">
                  <img src="/images/landing/Vector-6.svg" alt="Arrow" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      ))}
    </section>
  );
}
