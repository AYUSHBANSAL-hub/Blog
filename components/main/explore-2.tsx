import React from "react";
import { motion } from "framer-motion";
import CardLeftImage from "./CardLeftImage";
import CardRightImage from "./CardRightImage";


const productCards = [
  {
    title: "Product B",
    description:
      "Lorem ipsum dolor sit amet consectetur. Sed est blandit pharetra et nibh sem urna pretium. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.",
    image: "/images/blog-4.png",
    badge: null,
    layout: "left",
  },
  {
    title: "Product X",
    description:
      "Lorem ipsum dolor sit amet consectetur. Sed est blandit pharetra et nibh sem urna pretium. Lorem ipsum dolor sit amet consectetur. ",
    image: "/images/blog-2.png",
    badge: null,
    layout: "left",
  },
  {
    title: "Product T",
    description:
      "Lorem ipsum dolor sit amet consectetur. Sed est blandit pharetra et nibh sem urna pretiumLorem ipsum dolor sit amet consectetur. Sed est blandit pharetra et nibh sem urna pretium. Lorem ipsum dolor sit amet consectetur.  Lorem ipsum dolor sit amet consectetur. Sed est blandit pharetra et nibh sem urna pretium. Lorem ipsum dolor sit amet consectetur.  Lorem ipsum dolor sit amet consectetur. Sed est blandit .",
    image: "/images/blog-1.png",
    badge: { text: "Step 6" },
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
