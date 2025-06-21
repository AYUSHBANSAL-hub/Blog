"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { motion } from "framer-motion";
import ProductSection from "@/components/main/product";
import BlogHero from "@/components/main/category/Bloghero";
import ProductsExplore from "@/components/main/explore";
import SubscriptionBanner from "@/components/main/Subscription-Banner";
import Overlay from "@/components/main/overlay";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto",
});

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
      <div className="relative w-full  flex justify-center px-4 md:px-8  md:mb-16">
        <div className="w-full max-w-[1338px] flex flex-col lg:flex-row items-start justify-between  gap-10 lg:gap-0">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition }}
            className="flex flex-col w-full max-w-[618px] gap-2"
          >
            <div className="flex flex-col md:pt-28 pt-10 gap-2">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.1 }}
                className="font-bold text-[#2a2a2a] text-[42px] md:text-6xl lg:text-8xl tracking-[-0.5px] leading-[1.05]"
              >
                Lorem ipsum dolor sit
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.2 }}
                className={`${roboto.variable} font-[var(--font-roboto)] text-[#6d6d6d] md:mt-7 text-[18px] md:text-[20px] leading-[1.4] max-w-[587px]`}
              >
                Loreum Ipsum: Lorem ipsum dolor sit amet consectetur. Sed est
                blandit pharetra.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.3 }}
              >
                <Button className="w-[216px] md:mb-2 mt-7 h-[55px] bg-[#3a71fd] rounded-[90px] text-[#fbfcfc] font-button-1 flex items-center justify-center gap-3 text-base hover:scale-[1.02] transition-transform duration-300 ease-in-out">
                  <span>Start Reading</span>
                  <img src="images/arrow.svg"/>
                </Button>
                <div className="w-4 h-4 bg-[url(/mi-arrow-forward-no-bg.svg)] bg-contain bg-no-repeat" />

              </motion.div>
            </div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.4 }}
              className="mt-4 md:mt-14 flex flex-col gap-2"
            >
              <p className="roboto text-[#6d6d6d] text-[18px] md:text-[20px] leading-7">
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
          <motion.video
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...transition, delay: 0.2 }}
            className="w-full md:max-w-[738px] max-w-[500px] h-[300px] md:h-[680px] object-center rounded-2xl"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/images/landing-video.mp4" type="video/mp4" />
          </motion.video>
        </div>
      </div>

      <ProductSection />
      <div className="md:mt-5">
       <BlogHero />
      </div>
      <div className="md:mt-9">
       <ProductsExplore />
      </div>
      <SubscriptionBanner />
      <div>
      <Overlay />
      </div>
    </div>
  );
};

export default LandingPage;
