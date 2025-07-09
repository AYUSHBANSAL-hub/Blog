"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Blog {
  blog_id: string;
  title: string;
  subHeading: string;
  content: string;
  category: string;
  subCategory: string;
  author?: string;
  createdAt?: string;
  coverImageUrl?: string;
}

const SubCategoryBlogs = () => {
  const searchParams = useSearchParams();
  const subcategoryId = searchParams.get("subcategoryId");

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [subcategory, setSubCategory] = useState<string | null>(null);

  useEffect(() => {
    if (!subcategoryId) return;

    const fetchBlogs = async () => {
      try {
        const res = await fetch(`/api/blogs/subCategories/${subcategoryId}`);
        const data = await res.json();

        if (data.status) {
          setBlogs(data.blogs);
          setSubCategory(data.subcategory_name || null);
        } else {
          console.error("Failed to fetch blogs:", data.error);
        }
      } catch (err) {
        console.error("API error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [subcategoryId]);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  if (!blogs.length)
    return (
      <div className="text-center py-10 text-gray-500">
        No blogs found for this subcategory.
      </div>
    );

  return (
    <section className="py-12 px-4 sm:px-6">
      <div className="max-w-[1260px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-[84px] gap-y-8 md:gap-y-[47px]">
          {blogs.map((blog) => (
            <div key={blog.blog_id} className="flex justify-center">
              <div className="flex flex-col gap-[24px] w-full max-w-full sm:max-w-[338.22px] h-full rounded-2xl overflow-hidden border border-[#dadce0] shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* Image */}
                <div
                  className="h-[187.98px] w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${blog.coverImageUrl || "/images/placeholder.svg"})` }}
                />

                {/* Content */}
                <div className="flex flex-col justify-between h-full">
                  <div className="flex flex-col gap-[16px] px-[24px] flex-1">
                    <div className="text-[#1A73E8] text-[13.67px] font-[500] tracking-[0.25px] leading-[48px] uppercase">
                      {subcategory}
                    </div>

                    <div className="flex flex-col gap-[16px]">
                      <h3 className="text-[#202124] text-[19.84px] font-[500] leading-[28px]">
                        {blog.title}
                      </h3>

                      <p className="text-[#5F6368] text-[13.89px] font-[400] leading-[24px] tracking-[0.25px] line-clamp-4">
                        {blog.subHeading}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pb-[37px] px-[24px] flex flex-wrap items-start justify-between gap-2">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="text-[#5f6368] text-[14px] font-[500] leading-[20px]">
                        Posted <br />by
                      </div>
                      <div className="text-[#5f6368] text-[14px] font-[500] leading-[20px]">
                        <span>
                            Roma Jain -{" "}
                            
                            {new Date(blog?.createdAt || "").toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                      </div>
                    </div>
                    <img
                      src="/images/blackArrow.svg"
                      alt="Arrow Icon"
                      className="w-[16px] h-[16px] my-auto"
                    />
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
