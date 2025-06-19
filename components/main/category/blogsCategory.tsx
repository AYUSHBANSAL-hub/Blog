import { Card, CardContent } from "@/components/ui/card";
import { ArrowRightIcon } from "lucide-react";
import React from "react";

const CategoryBlogs = () => {
  const featuredContent = [
    {
      id: 1,
      category: "CLOUD COMPUTING",
      title: "Cloud Computing: AWS",
      description:
        "Today, we hosted the tenth edition of\nGoogle for India, a milestone that invites us\nto reflect on the incredible transformation\nwe…",
      author: "Roma Datta …",
      date: "03 Oct, 2024",
      image: "/images/blog-1.png",
    },
    {
      id: 2,
      category: "PRODUCT Y",
      title: "Cloud Computing: AWS",
      description:
        "Today, we hosted the tenth edition of\nGoogle for India, a milestone that invites us\nto reflect on the incredible transformation\nwe…",
      author: "Roma Datta …",
      date: "03 Oct, 2024",
      image: "/images/blog-2.png",
    },
    {
      id: 3,
      category: "LOREM IPSUM",
      title: "Cloud Computing: AWS",
      description:
        "Today, we hosted the tenth edition of\nGoogle for India, a milestone that invites us\nto reflect on the incredible transformation\nwe…",
      author: "Roma Datta …",
      date: "03 Oct, 2024",
      image: "/images/blog-3.png",
    },
    {
      id: 4,
      category: "CLOUD COMPUTING",
      title: "Cloud Computing: AWS",
      description:
        "Today, we hosted the tenth edition of\nGoogle for India, a milestone that invites us\nto reflect on the incredible transformation\nwe…",
      author: "Roma Datta …",
      date: "03 Oct, 2024",
      image: "/images/blog-1.png",
    },
    {
      id: 5,
      category: "PRODUCT Y",
      title: "Cloud Computing: AWS",
      description:
        "Today, we hosted the tenth edition of\nGoogle for India, a milestone that invites us\nto reflect on the incredible transformation\nwe…",
      author: "Roma Datta …",
      date: "03 Oct, 2024",
      image: "/images/blog-2.png",
    },
    {
      id: 6,
      category: "LOREM IPSUM",
      title: "Cloud Computing: AWS",
      description:
        "Today, we hosted the tenth edition of\nGoogle for India, a milestone that invites us\nto reflect on the incredible transformation\nwe…",
      author: "Roma Datta …",
      date: "03 Oct, 2024",
      image: "/images/blog-3.png",
    },
  ];

  return (
    <section className="w-full px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1260px] mx-auto">
        {featuredContent.map((content) => (
          <Card
            key={content.id}
            className="flex flex-col rounded-2xl overflow-hidden border border-[#dadce0] shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div
              className="h-[200px] bg-cover bg-center"
              style={{ backgroundImage: `url(${content.image})` }}
            />

            <CardContent className="flex flex-col gap-4 p-6 flex-1 justify-between">
              <div className="text-[#1a73e8] text-sm font-medium tracking-wide uppercase">
                {content.category}
              </div>

              <h3 className="text-[#202124] text-lg font-semibold leading-snug">
                {content.title}
              </h3>

              <p className="text-[#5f6368] text-sm leading-relaxed whitespace-pre-line">
                {content.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
                <div className="text-[#5f6368] text-sm font-medium leading-5">
                  Posted by {content.author} - {content.date}
                </div>

                <ArrowRightIcon className="w-5 h-5 text-[#5f6368]" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CategoryBlogs;
