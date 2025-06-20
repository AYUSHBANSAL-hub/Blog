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
    image: "/images/background-2.png",
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
    <section className="relative flex flex-col items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      {blogData.map((blog, index) => (
        <div
          key={index}
          className="relative w-full max-w-7xl flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start"
        >
          {/* Image Section */}
          <div className="relative w-full h-[300px] sm:h-[360px] md:h-[480px] md:w-[75%] rounded-2xl overflow-hidden shadow-xl">
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
              md:absolute md:right-0  md:top-1/2 md:-translate-y-1/2 md:w-[35%]
              z-10
            `}
          >
            <Card className="rounded-2xl shadow-xl p-6 bg-white">
              <CardContent className="p-0 space-y-4">
                <div className="text-sm text-blue-600 font-medium">
                  {blog.category}
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900">
                  {blog.title}
                </h2>
                <p className="text-sm sm:text-base text-zinc-500">
                  {blog.description}
                </p>
                <div className="flex justify-end pt-4">
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      ))}
    </section>
  );
}
