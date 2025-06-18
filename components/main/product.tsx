import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Blog card data for mapping
const blogCards = [
  {
    category: "PRODUCT",
    title:
      "Loreum Ipsum: Lorem ipsum dolor sit amet consectetur. Sed est blandit pharetra",
    imagePath: "/photo-3-width-600-format-webp-webp.png",
  },
  {
    category: "YOUTUBE",
    title:
      "Fueling India's Musical Renaissance:\nYouTube's Commitment to Artists,\nFans, and the Future",
    imagePath: "/hero-music-update-width-600-format-webp-webp.png",
  },
  {
    category: "AI & ML",
    title:
      "75% of Indians desire a daily growth\ncollaborator: Google-Kantar report",
    imagePath:
      "/screenshot-2025-04-29-3-40-10-pm-width-600-format-webp-webp.png",
  },
];

const ProductSection = () => {
  return (
    <section className="flex flex-col w-full items-center gap-7 py-8">
      <div className="flex flex-col w-full max-w-[1260px] items-start">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {blogCards.map((blog, index) => (
            <Card
              key={index}
              className="flex flex-col w-full border border-solid border-[#dadce0] rounded-lg"
            >
              <CardHeader className="pt-6 pb-2 px-9">
                <div className="min-w-12">
                  <CardTitle className="[font-family:'Roboto',Helvetica] text-[#1a73e8] text-sm tracking-[0.25px] leading-[48px] font-medium whitespace-nowrap">
                    {blog.category}
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col h-full p-0">
                <div className="flex flex-col h-full justify-between">
                  <div className="px-9 py-0">
                    <p className="[font-family:'Roboto',Helvetica] font-normal text-[#202124] text-xl tracking-[0] leading-7">
                      {blog.title.split("\n").map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i < blog.title.split("\n").length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>

                  <div className="pt-9 pb-0 px-0 h-[218px]">
                    <div className="relative w-full h-[182px] rounded-[0px_0px_7px_7px] overflow-hidden border-t border-[#dadce0]">
                      <div
                        className="relative w-full h-[182px] top-px bg-cover bg-[50%_50%]"
                        style={{ backgroundImage: `url(${blog.imagePath})` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        className="min-w-[250px] max-w-[380px] min-h-12 px-[58px] py-3 rounded-[48px] border border-solid border-[#5f6368] bg-white"
      >
        <span className="[font-family:'Figtree',Helvetica] font-medium text-[#1a73e8] text-base text-center tracking-[0] leading-6 whitespace-nowrap">
          Load more Blogs
        </span>
      </Button>
    </section>
  );
};
export default ProductSection;