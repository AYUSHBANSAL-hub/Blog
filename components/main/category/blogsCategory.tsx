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
        <section className=" py-12">
            <div className="max-w-[1260px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredContent.map((content) => (
                        <div key={content.id} className="flex">
                            <div className="flex flex-col w-full h-full rounded-2xl overflow-hidden border border-[#dadce0] shadow-sm hover:shadow-md transition-shadow duration-300">
                                {/* Image */}
                                <div
                                    className="h-[200px] bg-cover bg-center"
                                    style={{ backgroundImage: `url(${content.image})` }}
                                />

                                {/* Content */}
                                <div className="flex flex-col gap-4 p-6 flex-1">
                                    <div className="text-[#1a73e8] text-sm font-medium tracking-wide uppercase">
                                        {content.category}
                                    </div>

                                    <h3 className="text-[#202124] text-lg font-medium leading-snug">
                                        {content.title}
                                    </h3>

                                    <p className="text-[#5f6368] text-sm leading-relaxed line-clamp-4">
                                        {content.description}
                                    </p>

                                    {/* Footer always sticks at bottom */}
                                    <div className=" pt-4 border-t border-gray-200 mt-16 flex items-center justify-between">
                                        <div className="text-[#5f6368] text-sm font-medium leading-5">
                                            Posted by {content.author} - {content.date}
                                        </div>
                                        <ArrowRightIcon className="w-5 h-5 text-[#5f6368]" />
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

export default CategoryBlogs;