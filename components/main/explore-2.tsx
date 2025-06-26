import React from "react";
import { motion } from "framer-motion";
import CardLeftImage from "./CardLeftImage";
import CardRightImage from "./CardRightImage";


const productCards = [
  {
    title: "Vertex AI",
    description:"Managed platform to build, deploy, and scale ML models in Google Cloud Managed platform to build, deploy, and scale ML models in Google Cloud",
    image: "/images/blog-4.png",
    badge: null,
    layout: "left",
  },
  {
    title: "Gemini",
    description:
      "Google's generative AI assistant for writing, coding, and problem-solving.Google's generative AI assistant for writing, coding, and problem-solving.",
    image: "/images/blog-2.png",
    badge: null,
    layout: "left",
  },
  {
    title: "AutoML",
    description:
      "Tools to train custom ML models with minimal coding required.Tools to train custom ML models with minimal coding required.Tools to train custom ML models with minimal coding required.Tools to train custom ML models with minimal coding required.",
    image: "/images/blog-1.png",
    badge: { text: "New" },
    layout: "right",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const ExploreTwoPage = () => {
  return (
    <div className="w-full flex flex-col items-center mb-24">
      
      <div className="w-full max-w-[1100px] flex flex-col gap-20">
        {productCards.map((product, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {product.layout === "left" ? (
              <CardLeftImage {...product} />
            ) : (
              <CardRightImage {...product} />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExploreTwoPage;
