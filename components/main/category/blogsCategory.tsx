"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

const CategoryBlogs = ({ blogs }: { blogs: any[] }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const skeletons = Array.from({ length: 6 });

  return (
    <section className="py-12 px-4 sm:px-6">
      <div className="max-w-[1260px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-[84px] gap-y-8 md:gap-y-[47px]">
          {(loading ? skeletons : blogs).map((blog: any, index: number) => (
            <motion.div
              key={blog?.blog_id || index}
              className="flex justify-center cursor-pointer"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              onClick={() => !loading && blog?.blog_id && router.push(`/blog-open?blogId=${blog.blog_id}`)}
            >
              <motion.div
                whileHover={{
                  scale: 1.01,
                  y: -4,
                  transition: { type: "spring", stiffness: 300 },
                }}
                className="flex flex-col justify-between gap-[24px] max-w-full sm:max-w-[338.22px] w-full h-full rounded-2xl overflow-hidden border border-[#dadce0] shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
              >
                {/* Image or Skeleton */}
                <div className="h-[160px] sm:h-[187.98px] w-full bg-cover bg-center">
                  {loading ? (
                    <Skeleton className="w-full h-full rounded-none" />
                  ) : (
                    <div
                      style={{ backgroundImage: `url(${blog.coverImageUrl})` }}
                      className="h-[189px] w-full bg-cover bg-center"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between h-full">
                  <div className="flex flex-col gap-[16px] px-[24px] flex-1">
                    <div className="text-[#1A73E8] text-[13.67px] font-[500] tracking-[0.25px] leading-[48px] uppercase">
                      {loading ? <Skeleton className="h-4 w-24" /> : blog.category_name}
                    </div>

                    <div className="flex flex-col gap-[16px]">
                      <h3 className="text-[#202124] line-clamp-2 text-[19.84px] font-[500] leading-[28px]">
                        {loading ? (
                          <>
                            <Skeleton className="h-5 w-full mb-1" />
                            <Skeleton className="h-5 w-3/4" />
                          </>
                        ) : (
                          blog.title
                        )}
                      </h3>

                      <p className="text-[#5F6368] text-[13.89px] font-[400] leading-[24px] tracking-[0.25px] line-clamp-4">
                        {loading ? (
                          <>
                            <Skeleton className="h-4 w-full mb-1" />
                            <Skeleton className="h-4 w-[90%] mb-1" />
                            <Skeleton className="h-4 w-[80%]" />
                          </>
                        ) : (
                          blog.content.replace(/<[^>]+>/g, "").substring(0, 200) + "..."
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pb-[37px] px-[24px] flex flex-wrap sm:flex-nowrap items-start justify-between gap-2">
                    <div className="flex gap-2">
                      <div className="text-[#5f6368] text-[14px] font-[500] leading-[20px] whitespace-nowrap">
                        Posted <br />by
                      </div>
                      <div className="text-[#5f6368] text-[14px] font-[500] leading-[20px]">
                        {loading ? (
                          <Skeleton className="h-4 w-[120px]" />
                        ) : (
                          <span>
                            Roma Jain -{" "}
                            {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                    {loading ? (
                      <Skeleton className="w-[16px] h-[16px] rounded-full" />
                    ) : (
                      <img
                        src="/images/blackArrow.svg"
                        alt="Arrow Icon"
                        className="w-[16px] h-[16px] my-auto"
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryBlogs;
