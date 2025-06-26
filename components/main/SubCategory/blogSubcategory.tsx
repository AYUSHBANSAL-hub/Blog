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
        "India has long been a hub for technology and innovation, and the strong talent pool here makes it a strategic location for Google Cloud to invest in our cloud infrastructure, grow our operations and expand our workforce to support our growing customer base.",
      author: "Roma Datta …",
      date: "03 Oct, 2024",
      image: "/images/blog-1.svg",
    },
    {
      id: 2,
      category: "Google Cloud ",
      title: "Cloud Computing: AWS",
      description:
        "Today, we hosted the tenth edition of\nGoogle for India, a milestone that invites us\nto reflect on the incredible transformation\nwe…",
      author: "Roma Datta …",
      date: "03 Oct, 2024",
      image: "/images/japan-backgroud.svg",
    },
    {
      id: 3,
      category: "Google Cloud ",
      title: "Cloud Computing: AWS",
      description:
        "It’s fascinating to see the growth of India’s developer ecosystem over the years and the positive impact it has today in the lives of billions of people across the globe. The time for Indian developers to scale has never been better with new technologies, surfaces, and users emerging in the digital landscape.",
      author: "Roma Datta …",
      date: "03 Oct, 2024",
      image: "/images/carousel-img.svg",
    },
    {
      id: 4,
      category: "CLOUD COMPUTING",
      title: "Cloud Computing: AWS",
      description:
        "India has always played the role of a strategic nerve centre in the tech discourse—this is evident in the thriving startup and app ecosystems, the digital public infrastructure that's transforming life for hundreds of millions of Indians, and the depth and diversity of Indian creators.",
      author: "Roma Datta …",
      date: "03 Oct, 2024",
      image: "/images/blog-1.svg",
    },
    {
      id: 5,
      category: "Google Cloud ",
      title: "Cloud Computing: AWS",
      description:
        "Today, we hosted the tenth edition of\nGoogle for India, a milestone that invites us\nto reflect on the incredible transformation\nwe…",
      author: "Roma Datta …",
      date: "03 Oct, 2024",
      image: "/images/thumbnail-1.svg",
    },
    {
      id: 6,
      category: "Google Cloud ",
      title: "Cloud Computing: AWS",
      description:
        "Today, we are excited to share another major milestone in our ongoing commitment to India, with the inauguration of Ananta—one of Google’s largest offices globally.",
      author: "Roma Datta …",
      date: "03 Oct, 2024",
      image: "/images/GoogleStore-1.svg",
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6">
  <div className="max-w-[1260px] mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-[84px] gap-y-8 md:gap-y-[47px]">
      {featuredContent.map((content) => (
        <div key={content.id} className="flex justify-center">
          <div className="flex flex-col gap-[24px] w-full max-w-full sm:max-w-[338.22px] h-full rounded-2xl overflow-hidden border border-[#dadce0] shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Image */}
            <div
              className="h-[187.98px] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${content.image})` }}
            />

            {/* Content */}
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-[16px] px-[24px] flex-1">
                <div className="text-[#1A73E8] text-[13.67px] font-[500] tracking-[0.25px] leading-[48px] uppercase">
                  {content.category}
                </div>

                <div className="flex flex-col gap-[16px]">
                  <h3 className="text-[#202124] text-[19.84px] font-[500] leading-[28px]">
                    {content.title}
                  </h3>

                  <p className="text-[#5F6368] text-[13.89px] font-[400] leading-[24px] tracking-[0.25px] line-clamp-4">
                    {content.description}
                  </p>
                </div>
              </div>

              {/* Footer always sticks at bottom */}
              <div className="pb-[37px] pt-[80px] px-[24px] flex flex-wrap items-start justify-between gap-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="text-[#5f6368] text-[14px] font-[500] leading-[20px]">
                    Posted <br />by
                  </div>
                  <div className="text-[#5f6368] text-[14px] font-[500] leading-[20px]">
                    {content.author} - {content.date}
                  </div>
                </div>
                <img src="/images/blackArrow.svg" alt="Arrow Icon" className="w-[16px] h-[16px] my-auto" />
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
