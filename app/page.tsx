"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { motion } from "framer-motion";
import ProductSection from "@/components/main/product";
import BlogHero from "@/components/main/category/Bloghero";
import ProductsExplore from "@/components/main/explore";
import SubscriptionBanner from "@/components/main/Subscription-Banner";
import Overlay from "@/components/main/overlay";
import Image from "next/image";
import { ArrowRight } from "lucide-react";


const socialIcons = [
  { icon: "/images/landing/vector-1.svg", alt: "Discord" },
  { icon: "/images/landing/vector-2.svg", alt: "Twitter" },
  { icon: "/images/landing/vector-3.svg", alt: "Group" },
  { icon: "/images/landing/vector-4.svg", alt: "Telegram" },
  { icon: "/images/landing/vector-5.svg", alt: "Facebook" },
];

const transition = { duration: 1.1, ease: "easeInOut" };

const LandingPage = () => {
  return (
    <div className="p-2 ">
      <div className="relative w-full flex justify-center px-4 md:px-8 md:mb-16">
  <div className="w-full px-4 sm:px-[67px] flex flex-col 2xl:flex-row items-center 2xl:items-start justify-center 2xl:justify-between gap-10 lg:gap-0 2xl:gap-12 max-w-screen-2xl">
        {/* ─────────── Left Content ─────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition }}
          className="flex flex-col w-full max-w-none sm:max-w-[618px] gap-2 items-center text-center sm:items-start sm:text-left"
        >
          <div className="flex flex-col pt-10 md:pt-20 lg:pt-10 2xl:pt-28 gap-2">
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.1 }}
              className="
                antialiased text-[#2A2A2A] font-bold
                text-[40px] leading-[44px] tracking-[-0.3px]
                sm:text-[64px] sm:leading-[66px]
                md:text-[80px] md:leading-[82px] lg:w-auto 2xl:w-[618px] /* Adjusted width for flexibility */
                lg:text-[96px] lg:leading-[92px] lg:tracking-[-0.51px]
              "
            >
              Lorem ipsum dolor sit
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.2 }}
              className="
                font-normal text-[#6d6d6d] max-w-full
                text-[16px] leading-[24px] mt-3
                sm:text-[18px] sm:leading-[26px]
                md:mt-6 md:text-[22px] md:leading-[28px] md:max-w-[587px]
              "
              style={{ fontFamily: "var(--font-roboto)" }}
            >
              Loreum Ipsum: Lorem ipsum dolor sit amet consectetur. Sed est blandit pharetra.
            </motion.p>

            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.3 }}
              className="w-full sm:w-auto" // Allow button to shrink on sm+ if content is smaller
            >
              <Button
                className="
                  w-full sm:w-[216px] mt-7 h-[55px] px-[24px] py-[16px]
                  bg-[#3B71FE] rounded-[90px] text-[#fbfcfc]
                  flex items-center justify-center gap-3
                  hover:scale-[1.02] transition-transform duration-300 ease-in-out
                  focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3B71FE]
                "
              >
                <span className="font-bold text-[16px] leading-[16px] text-center">Start Reading</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.4 }}
            className="mt-12 md:mt-20 lg:mt-[120px] 2xl:mt-[180px] flex flex-col gap-3 w-full sm:w-auto"
          >
            <p
              className="font-normal text-[#6d6d6d] text-[18px] sm:text-[20px] md:text-[22px] leading-[24px] sm:leading-[26px] md:leading-[28px]"
              style={{ fontFamily: "var(--font-roboto)" }}
            >
              Follow us
            </p>

            <div className="flex items-center gap-4 justify-center sm:justify-start">
              {socialIcons.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.alt}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="w-[38px] h-[38px] bg-[#c8c8c833] rounded-full flex items-center justify-center text-gray-600 hover:text-[#3B71FE] transition-colors"
                  aria-label={`Follow us on ${social.alt}`}
                >
                 <img src={social.icon} className="w-4 h-4"/>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ─────────── Hero Video ─────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...transition, delay: 0.2 }}
          className="
            w-full max-w-[320px] h-[200px]
            sm:max-w-[500px] sm:h-[300px]
            md:max-w-[600px] md:h-[600px] /* Slightly adjusted for md */
            lg:max-w-[700px] lg:h-[700px] /* Added lg specific */
            2xl:max-w-[738px] 2xl:h-[738px] /* Specific for 2xl */
            flex-shrink-0 /* Prevent shrinking in flex row */
          "
        >
          <video
            className="w-full h-full object-contain" // Changed to object-cover
            autoPlay
            muted
            loop
            playsInline
            poster="/placeholder.svg?width=738&height=738"
          >
            {/* Make sure this video path is correct and the video is in the public folder */}
            <source src="/images/landing-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </div>
</div>

      <ProductSection />
      <div >
        <BlogHero />
      </div>
      <div className="md:mt-9">
        <ProductsExplore />
      </div>

      <div className="flex flex-col gap-[172px]">
         <SubscriptionBanner />
         <Overlay />
      </div>       
    </div>
  );
};

export default LandingPage;
