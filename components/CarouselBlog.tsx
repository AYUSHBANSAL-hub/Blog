"use client";

import React, { useState } from "react";
import { ArrowRightIcon } from "lucide-react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";

const SubscriptionSection = () => {
  // ─── Data ────────────────────────────────────────────────────────────────
  const blogPosts = [
    {
      id: 1,
      category: "AI & ML",
      title:
        "Applications Open | Google for Startups Accelerator : AI First India 2025",
      author: "ABCD",
      date: "19 Mar, 2025",
      image: "/images/thumbnail-1.svg",
    },
    {
      id: 2,
      category: "AI & ML",
      title:
        "Latest, Powerful Features To Unlock Your Potential with Gemini",
      author: "Loreum",
      date: "05 Dec, 2024",
      image: "/images/landing/Product-1.svg",
    },
    {
      id: 3,
      category: "AI & ML",
      title:
        "75% of Indians desire a daily growth collaborator: Google-Kantar report",
      author: "ABCD",
      date: "05 Dec, 2024",
      image: "/images/GoogleStore.svg",
    },
    {
      id: 4,
      category: "PIXEL",
      title:
        "Meet Pixel 8a: Premium AI features meet affordability, in a phone that's built to last",
      author: "Soniya ",
      date: "07 May, 2024",
      image: "/images/GoogleStore-1.svg",
    },
    {
      id: 5,
      category: "ENTREPRENEURS",
      title:
        "Applications now open for Google for Startups Accelerator: Apps 2025 — Seeking 20 AI-powered Indian startups!",
      author: "Brian Rakowski",
      date: "06 Dec, 2023",
      image: "/images/japan-backgroud.svg",
    },
    {
      id: 6,
      category: "SEARCH",
      title: "Year in Search 2024: what sparked curiosity across India on Google",
      author: "Rick Osterloh",
      date: "19 Oct, 2023",
      image: "/images/carousel-img.svg",
    },
  ];

  /* ────────── Carousel logic ───────────────────── */
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesPerView = 3;
  const totalSlides = blogPosts.length;
  const lastIndex = totalSlides - slidesPerView;

  const handlePrev = () => setCurrentSlide((c) => (c > 0 ? c - 1 : 0));
  const handleNext = () => setCurrentSlide((c) => (c < lastIndex ? c + 1 : c));

  /* ────────── Motion variants ──────────────────── */
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.8, 0.25, 1] } },
  };

  const imgVariants = {
    initial: { scale: 1 },
    hovered: { scale: 1.05, transition: { duration: 0.35 } },
  };

  const arrowVariants = {
    initial: { x: 0 },
    hovered: { x: 4, transition: { duration: 0.25 } },
  };

  /* ────────── Render ───────────────────────────── */
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
                transform: `translateX(-${(100 / slidesPerView) * currentSlide}%)`,
              }}
            >
              {blogPosts.map((post) => (
                <CarouselItem
                  key={post.id}
                  className="md:basis-1/2 lg:basis-1/3 px-2.5 flex-shrink-0"
                >
                  {/* ── Parent detects hover but doesn’t scale ── */}
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    whileHover="hovered"            /* passes state to children */
                    className="h-full"
                  >
                    <Card className="h-[480px] py-0 border border-[#dadce0] rounded-lg overflow-hidden">
                      <CardContent className="h-full flex flex-col justify-between p-0">
                        {/* Image + text */}
                        <div>
                          {/* Only the image scales on hover */}
                          <motion.div
                            variants={imgVariants}
                            initial="initial"
                            className="h-52 hover:h-56 transition-all ease-in-out overflow-hidden"
                          >
                            <img
                              src={post.image}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </motion.div>

                          <div className="px-10 pt-6">
                            <span
                              className="text-[14px] font-[500] leading-[44px] tracking-[1.5px] text-[#202124]"
                              style={{ fontFamily: "var(--font-roboto)" }}
                            >
                              {post.category}
                            </span>
                          </div>

                          <div className="px-10 pt-1 h-20">
                            <h3
                              className="text-[22px] leading-[30px] line-clamp-2 text-[#202124]"
                              style={{ fontFamily: "var(--font-roboto)" }}
                            >
                              {post.title}
                            </h3>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="relative flex items-center px-10 pb-10">
                          <div className="flex gap-0.5 items-center">
                            <span
                              className="text-base font-light leading-5 text-[#414141]"
                              style={{ fontFamily: "var(--font-roboto)" }}
                            >
                              Posted by {post.author}
                            </span>
                            <span className="text-base font-light leading-5 text-[#414141]">&nbsp;–&nbsp;</span>
                            <span
                              className="text-base font-light leading-5 text-[#414141]"
                              style={{ fontFamily: "var(--font-roboto)" }}
                            >
                              {post.date}
                            </span>
                          </div>

                          {/* Arrow glides right on hover */}
                          <motion.div
                            variants={arrowVariants}
                            initial="initial"
                            className="absolute right-10 bottom-10"
                          >
                            <ArrowRightIcon className="h-[18px] w-[18px] text-[#414141]" />
                          </motion.div>
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