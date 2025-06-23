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
import Image from "next/image";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto",
});

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
                className="font-bold cursor-default text-[#2a2a2a] text-[42px] md:text-6xl lg:text-8xl tracking-[-0.5px] lleading-[92px]"
              >
                Lorem ipsum dolor sit
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.2 }}
                className={` font-roboto font-normal text-[#6d6d6d] md:mt-6 text-[22px] leading-[28px] max-w-[587px]`}
              >
                Loreum Ipsum: Lorem ipsum dolor sit amet consectetur. Sed est
                blandit pharetra.
              </motion.p>


              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.3 }}
              >
                <Button className="w-[216px] md:mb-2 mt-7 h-[55px] px-[24px] py-[16px] bg-[#3B71FE] rounded-[90px] text-[#fbfcfc] flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform duration-300 ease-in-out">
                  <span className="font-bold text-base leading-[16px] text-center">
                    Start Reading
                  </span>
                  <img src="images/arrow.svg" />
                </Button>


              </motion.div>
            </div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.4 }}
              className="mt-4 md:mt-[175px] flex flex-col gap-2"
            >
              <p className="roboto font-normal text-[#6d6d6d] text-[22px] leading-[28px]">
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
                        <Image
                          className="absolute top-px left-0"
                          alt={icon.alt}
                          src={icon.icon}
                          width={14}  // 3.5 * 4 (Tailwind spacing units = 1rem = 16px, so 3.5 = 14px)
                          height={12} // h-3 = 0.75rem = 12px
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
            className="w-full md:max-w-[738px] max-w-[500px] h-[300px] md:h-[738px] object-center rounded-2xl"
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
