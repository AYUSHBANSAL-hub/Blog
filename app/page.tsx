"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { motion } from "framer-motion";
import CategoryBlogs from "@/components/main/category/blogsCategory";
import ProductSection from "@/components/main/product";
import BlogHero from "@/components/main/category/Bloghero";
import ExplorePage from "@/components/main/explore";
import ProductsExplore from "@/components/main/explore";
import SubscriptionBanner from "@/components/main/Subscription-Banner";
import Overlay from "@/components/main/overlay";

const socialIcons = [
  { icon: "/images/landing/icon-1.png", alt: "Discord" },
  { icon: "/images/landing/icon-2.png", alt: "Twitter" },
  { icon: "/images/landing/icon-3.png", alt: "Group" },
  { icon: "/images/landing/icon-4.png", alt: "Telegram" },
  { icon: "/images/landing/icon-5.png", alt: "Facebook" },
];

const transition = { duration: 1.1, ease: "easeInOut" };

const LandingPage = () => {
  return (
    <div className="p-2">
      <div className="relative w-full  flex justify-center px-4 md:px-8 mb-6 md:mb-16">
        <div className="w-full max-w-[1338px] flex flex-col lg:flex-row items-start justify-between  gap-10 lg:gap-0">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition }}
            className="flex flex-col w-full max-w-[618px] gap-8"
          >
            <div className="flex flex-col md:pt-28 pt-10 gap-8">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.1 }}
                className="font-['Figtree',Helvetica] font-bold text-[#2a2a2a] text-[42px] md:text-6xl lg:text-8xl tracking-[-0.5px] leading-tight"
              >
                Lorem ipsum dolor sit
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.2 }}
                className="font-['Roboto',Helvetica] text-[#6d6d6d] text-[18px] md:text-[20px] leading-7 max-w-[587px]"
              >
                Loreum Ipsum: Lorem ipsum dolor sit amet consectetur. Sed est
                blandit pharetra.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.3 }}
              >
                <Button className="w-[216px] h-[55px] bg-[#3a71fd] rounded-[90px] text-[#fbfcfc] font-button-1 flex items-center justify-center gap-3 text-base hover:scale-[1.02] transition-transform duration-300 ease-in-out">
                  <span>Start Reading</span>
                  <div className="w-4 h-4 bg-[url(/mi-arrow-forward-no-bg.svg)] bg-contain bg-no-repeat" />
                </Button>
              </motion.div>
            </div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.4 }}
              className="mt-4 md:mt-10 flex flex-col gap-2"
            >
              <p className="font-['Roboto',Helvetica] text-[#6d6d6d] text-[18px] md:text-[20px] leading-7">
                Follow us
              </p>

              <div className="flex items-center gap-4">
                {socialIcons.map((icon, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="w-[38px] h-[38px] bg-[#c8c8c833] rounded-full overflow-hidden flex items-center justify-center"
                  >
                    {icon.alt === "Group" ? (
                      <div className="relative w-3.5 h-3.5">
                        <img
                          className="absolute w-3.5 h-3 top-px left-0"
                          alt={icon.alt}
                          src={icon.icon}
                        />
                      </div>
                    ) : (
                      <img
                        className="w-3.5 h-3.5"
                        alt={icon.alt}
                        src={icon.icon}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.img
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...transition, delay: 0.2 }}
            className="w-full md:max-w-[738px] max-w-[500px] h-[500px] md:h-[800px] object-center rounded-2xl"
            alt="Hero Image"
            src="/images/landing/landingImg-1.png"
          />
        </div>
      </div>

      <ProductSection />
      <BlogHero/>
      <ProductsExplore/>
      <SubscriptionBanner/>
      <Overlay/>
    </div>
  );
};

export default LandingPage;
