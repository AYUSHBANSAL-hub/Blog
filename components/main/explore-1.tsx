import React from "react";
import { motion } from "framer-motion";
import CardLeftImage from "./CardLeftImage";
import CardRightImage from "./CardRightImage";


const productCards = [
  {
    title: "Google Search",
    description:
      "World's most-used search engine for finding web pages, images, videos, and more. World's most-used search engine for finding web pages, images, videos, and more. ",
    image: "/images/blog-3.png",
    badge: null,
    layout: "left",
  },
  {
    title: "Google Scholar",
    description:"Search engine for scholarly articles, theses, and academic research papers. Search engine for scholarly articles, theses, and academic research papers. ",
    image: "/images/blog-1.png",
    badge: { text: "New" },
    layout: "right",
  },
  {
    title: "Google Cloud Platform (GCP)",
    description:"Suite of cloud computing services for hosting, databases, AI, and more.Suite of cloud computing services for hosting, databases, AI, and more.",
    image: "/images/blog-1.png",
    badge: null,
    layout: "left",
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

const ExploreOnePage = () => {
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

export default ExploreOnePage;
