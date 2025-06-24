import { Card, CardContent } from "@/components/ui/card";
import { ArrowRightIcon } from "lucide-react";
import React from "react";

const SubCategoryBlogs = () => {
  const featuredContent = [
    {
      id: 1,
      category: "CLOUD COMPUTING",
      title: "Cloud Computing: AWS",
      description:
        "Today, we hosted the tenth edition of\nGoogle for India, a milestone that invites us\nto reflect on the incredible transformation\nwe…",
      author: "Roma Datta …",
      date: "03 Oct, 2024",
      image: "/images/blog-1.svg",
    },
    {
      id: 2,
      category: "PRODUCT Y",
      title: "Cloud Computing: AWS",
      description:
        "Today, we hosted the tenth edition of\nGoogle for India, a milestone that invites us\nto reflect on the incredible transformation\nwe…",
      author: "Roma Datta …",
      date: "03 Oct, 2024",
      image: "/images/blog-1.svg",
    },
    {
      id: 3,
      category: "LOREM IPSUM",
      title: "Cloud Computing: AWS",
      description:
        "Today, we hosted the tenth edition of\nGoogle for India, a milestone that invites us\nto reflect on the incredible transformation\nwe…",
      author: "Roma Datta …",
      date: "03 Oct, 2024",
      image: "/images/blog-1.svg",
    },
    {
      id: 4,
      category: "CLOUD COMPUTING",
      title: "Cloud Computing: AWS",
      description:
        "Today, we hosted the tenth edition of\nGoogle for India, a milestone that invites us\nto reflect on the incredible transformation\nwe…",
      author: "Roma Datta …",
      date: "03 Oct, 2024",
      image: "/images/blog-1.svg",
    },
    {
      id: 5,
      category: "PRODUCT Y",
      title: "Cloud Computing: AWS",
      description:
        "Today, we hosted the tenth edition of\nGoogle for India, a milestone that invites us\nto reflect on the incredible transformation\nwe…",
      author: "Roma Datta …",
      date: "03 Oct, 2024",
      image: "/images/blog-1.svg",
    },
    {
      id: 6,
      category: "LOREM IPSUM",
      title: "Cloud Computing: AWS",
      description:
        "Today, we hosted the tenth edition of\nGoogle for India, a milestone that invites us\nto reflect on the incredible transformation\nwe…",
      author: "Roma Datta …",
      date: "03 Oct, 2024",
      image: "/images/blog-1.svg",
    },
  ];

  return (
    <section className=" py-12">
            <div className="max-w-[1260px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-10">
                    {featuredContent.map((content) => (
                        <div key={content.id} className="flex justify-center">
                            <div className="flex flex-col gap-[24px] max-w-[334.22px] w-full h-full rounded-2xl overflow-hidden border border-[#dadce0] shadow-sm hover:shadow-md transition-shadow duration-300">
                                {/* Image */}
                                <div
                                    className="h-[187.98px] w-[334.2200012207031px] bg-cover bg-center"
                                    style={{ backgroundImage: `url(${content.image})` }}
                                />

                                {/* Content */}
                                <div>
                                <div className="flex flex-col gap-[16px] px-[24px] flex-1">
                                    <div className="text-[#1A73E8] text-[13.67px] font-[500] tracking-[0.25px] leading-[48px] uppercase">
                                        {content.category}
                                    </div>

                                    <div className="flex flex-col gap-[16px]">
                                    <h3 className="text-[#202124] text-[19.84px] pb-3 font-[500] leading-[28px]">
                                        {content.title}
                                    </h3>

                                    <p className="text-[#5F6368] text-[13.89px] font-[400] leading-[24px] tracking-[0.25px] line-clamp-4">
                                        {content.description}
                                    </p>
                                    </div>
                               </div>
                               {/* Footer always sticks at bottom */}
                                <div className="pb-[37px] pt-[80px] px-[24px] flex items-center justify-between">
                                        <div className="text-[#5f6368] text-[14px] font-[500] leading-[20px]">
                                            Posted by {content.author} - {content.date}
                                        </div>
                                        <img src="/images/blackArrow.svg" alt="Arrow Icon" className="w-4 h-4" />
                                </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
  );
};

export default SubCategoryBlogs;
