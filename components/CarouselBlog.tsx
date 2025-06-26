"use client";

import React, { useState } from "react";
import { ArrowRightIcon } from "lucide-react";
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
      category: "LOREUM",
      title:
        "Loreum Ipsum: Lorem ipsum dolor sit amet consectetur. Sed est blandit pharetra",
      author: "ABCD",
      date: "19 Mar, 2025",
      image: "/images/thumbnail-1.svg",
    },
    {
      id: 2,
      category: "LOREUM",
      title:
        "Loreum Ipsum: Lorem ipsum dolor sit amet consectetur. Sed est blandit pharetra",
      author: "Loreum",
      date: "05 Dec, 2024",
      image: "/images/thumbnail-1.svg",
    },
    {
      id: 3,
      category: "LOREUM",
      title:
        "Loreum Ipsum: Lorem ipsum dolor sit amet consectetur. Sed est blandit pharetra",
      author: "ABCD",
      date: "05 Dec, 2024",
      image: "/images/thumbnail-1.svg",
    },
    {
      id: 4,
      category: "PIXEL",
      title:
        "Meet Pixel 8a: Premium AI features meet affordability, in a phone that's built to last",
      author: "Soniya ",
      date: "07 May, 2024",
      image: "/images/thumbnail-1.svg",
    },
    {
      id: 5,
      category: "PIXEL",
      title:
        "Pixel 8 Pro — the first smartphone with AI built in — is now running Gemini Nano, plus more AI updates coming to the Pixel portfolio",
      author: "Brian Rakowski",
      date: "06 Dec, 2023",
      image: "/images/thumbnail-1.svg",
    },
    {
      id: 6,
      category: "PIXEL",
      title: "Taking the next big step on our Pixel journey in India",
      author: "Rick Osterloh",
      date: "19 Oct, 2023",
      image: "/images/thumbnail-1.svg",
    },
  ];

  // ─── Carousel state ──────────────────────────────────────────────────────
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesPerView = 3;               // adjust if you add responsive logic
  const totalSlides = blogPosts.length;
  const lastIndex = totalSlides - slidesPerView;

  const handlePrev = () =>
    setCurrentSlide((c) => (c > 0 ? c - 1 : 0));

  const handleNext = () =>
    setCurrentSlide((c) => (c < lastIndex ? c + 1 : c));

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <section className="w-full md:py-9 pb-2.5">
      <div className="flex flex-col items-center w-full">
        {/* ── Section header ─────────────────────────────────────────────── */}
        <div className="max-w-[1260px] w-full">
          <div className="flex justify-center py-12">
            <h2 className="font-normal text-[35.9px] leading-[44px] tracking-[-0.25px] text-[#202124] text-center font-['Figtree',Helvetica]">
              Related stories
            </h2>
          </div>
        </div>

        {/* ── Carousel ───────────────────────────────────────────────────── */}
        <div className="relative w-full">
          <Carousel className="w-full max-w-[1920px]">
            <CarouselContent
              className="flex transition-transform duration-500 ease-in-out px-4"
              style={{
                transform: `translateX(-${
                  (100 / slidesPerView) * currentSlide
                }%)`,
              }}
            >
              {blogPosts.map((post) => (
                <CarouselItem
                  key={post.id}
                  className="md:basis-1/2 lg:basis-1/3 px-2.5 flex-shrink-0"
                >
                  <Card className="h-[480px] py-0 border border-[#dadce0] rounded-lg overflow-hidden">
                    <CardContent className="h-full flex flex-col justify-between p-0">
                      {/* ── Image + text ─────────────────────────────── */}
                      <div>
                        <div className="h-52 overflow-hidden">
                          <img
                            src={post.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>

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

                      {/* ── Footer ─────────────────────────────────── */}
                      <div className="relative flex items-center px-10 pb-10">
                        <div className="flex gap-0.5 items-center">
                          <span
                            className="text-base font-light leading-5 text-[#414141]"
                            style={{ fontFamily: "var(--font-roboto)" }}
                          >
                            Posted by {post.author}
                          </span>
                          <span
                            className="text-base font-light leading-5 text-[#414141]"
                            style={{ fontFamily: "var(--font-roboto)" }}
                          >
                            &nbsp;–&nbsp;
                          </span>
                          <span
                            className="text-base font-light leading-5 text-[#414141]"
                            style={{ fontFamily: "var(--font-roboto)" }}
                          >
                            {post.date}
                          </span>
                        </div>
                        <ArrowRightIcon className="absolute right-10 bottom-10 h-[18px] w-[18px] text-[#414141]" />
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* ── Prev / Next buttons ─────────────────────────────────── */}
          <button
            onClick={handlePrev}
            disabled={currentSlide === 0}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 h-[68px] w-[68px] rounded-full 
                       bg-white border border-[#d2d2d2] flex items-center justify-center
                       disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowRightIcon className="-scale-x-100 w-[18px] h-[18px] text-[#414141]" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentSlide === lastIndex}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 h-[68px] w-[68px] rounded-full 
                       bg-white border border-[#d2d2d2] flex items-center justify-center
                       disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowRightIcon className="w-[18px] h-[18px] text-[#414141]" />
          </button>
        </div>

        {/* ── Pagination dots ───────────────────────────────────────────── */}
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
