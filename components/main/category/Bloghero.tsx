"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import React from "react";
import { motion, useAnimation } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";

const blogData = [
  {
    category: "PRODUCT",
    title: "Lorem ipsum dolor sit amet consectetur.",
    description: "Lorem ipsum dolor sit amet consectetur.",
    image: "/images/landing/hero-img.svg",
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
    <section className="relative flex flex-col items-center justify-center px-4 py-10  md:px-14">
      {blogData.map((blog, index) => (
        <div
          key={index}
          className="relative w-full max-w-[100vw] flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start"
        >
          {/* Image Section */}
          <div className="relative w-full h-[300px] sm:h-[360px] md:h-[507.67px] md:w-[922px]  rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Animated Overlapping Card (Only overlapping on md and above) */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={controls}
            className={`
              w-[90%] max-w-md
              mt-6 md:mt-0
              md:absolute md:right-[50px]  md:top-1/2 md:-translate-y-1/2 md:w-[35%]
              z-10
            `}
          >
            <Card className="rounded-2xl w-[476px] h-[320px] pt-[24px]  shadow-xl px-[36px] pb-[36px]   bg-white">
              <CardContent className="px-2 ">
                <div className="text-[#1A73E8] py-7 md:pt-4 font-roboto size-[13.78px] text-sm weight-[500]">
                  {blog.category}
                </div>
                <h2 className=" sm:text-4xl  md:pt-7 font-medium text-xl text-[#202124]">
                  {blog.title}
                </h2>
                <p className="text-sm md:text-base md:mt-6 text-[#5F6368]">
                  {blog.description}
                </p>
                <div className="flex justify-end pt-4">
                  <img src="images/landing/Vector-6.svg"/>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      ))}
    </section>
  );
}
