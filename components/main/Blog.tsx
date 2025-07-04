"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";          
import { useRouter } from "next/navigation";

const BlogSection = () => {
  const [featuredBlog, setFeaturedBlog] = useState<any>(null);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);               
  const router = useRouter();
   
  const handleClick = async (id: string) => {
  try {
    await fetch(`/api/blogs/${id}/view`, {
      method: "POST",
    });
    router.push(`/blog-open?blogId=${id}`);
  } catch (error) {
    console.error("Failed to register view:", error);
    router.push(`/blog-open?blogId=${id}`); // still navigate even if view tracking fails
  }
};


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();

        if (data.status && Array.isArray(data.blogs)) {
          const pinned = data.blogs.find((b: any) => b.isPinned);
          const others = data.blogs.filter((b: any) => !b.isPinned);

          setFeaturedBlog(pinned || others[0]);
          setBlogPosts(others);
        }
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);                                   
      }
    };

    fetchBlogs();
  }, []);

  const SkeletonFeatured = (
    <div className="flex-1 pt-12 flex flex-col gap-[16px]">
      {/* title */}
      <Skeleton className="h-[48px] w-[80%] sm:w-[70%]" />
      <div className="flex flex-wrap items-center gap-[12px] sm:gap-[19.56px]">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-9 w-[106px] rounded-[100px]" />
      </div>
      <Skeleton className="mt-[25px] h-[300px] sm:h-[400px] md:h-[622px] max-w-[622px] rounded-[16px]" />
    </div>
  );

  const SkeletonListItem = (
    <div className="pb-10">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-[48px]">
        <div className="flex-1 space-y-4">
          <Skeleton className="h-[34px] w-[70%]" />
          <div className="flex gap-4 items-center">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-[82px]" />
          </div>
        </div>
        <Skeleton className="w-full sm:w-[176px] h-[176px] rounded-[16px]" />
      </div>
      <Separator className="w-full h-px bg-[#00000017] mt-10" />
    </div>
  );


  return (
    <section className="w-full max-w-[1296px] mt-4 pb-6 px-4 sm:px-6 md:px-8 mx-auto">
      <div className="flex flex-col md:flex-row gap-[48px] min-h-[700px]">
        {/* Featured Blog */}
        {loading || !featuredBlog ? (
          SkeletonFeatured
        ) : (
          <div className="flex-1 pt-12 flex flex-col gap-[16px]">
            <div className="flex flex-col gap-4">
              <h2 className="font-[600] text-black text-[32px] sm:text-[36px] md:text-[40px] tracking-[-0.51px] leading-[1.2]">
                {featuredBlog.title}
              </h2>

              <div className="flex flex-wrap items-center gap-[12px] sm:gap-[19.56px]">
                <span
                  className="text-[13.6px] font-[300] text-[#232323] tracking-[0.16px] leading-[21px]"
                  style={{ fontFamily: "var(--font-roboto)" }}
                >
                  {new Date(featuredBlog.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>

                <span
                  className="font-light capitalize text-[#232323] text-sm tracking-[0.16px] leading-[21px]"
                  style={{ fontFamily: "var(--font-roboto)" }}
                >
                  {featuredBlog.category}
                </span>

                <Button
                  variant="outline"
                  className="h-9 rounded-[100px] pt-[6.5px] pb-[7.48px] pr-[9px] pl-[16px] backdrop-blur-[10px] border-[#00000029]"
                  onClick={() =>
                              handleClick(featuredBlog.blog_id)
                  }
                >
                  <span
                    className="font-[500] text-[#232323] text-[13.9px] tracking-[0.11px] leading-[21px]"
                    style={{ fontFamily: "var(--font-roboto)" }}
                  >
                    Learn more
                  </span>
                </Button>
              </div>
            </div>

            <div className="mt-[25px] rounded-[16px] overflow-hidden">
              <div className="relative w-full h-[300px] sm:h-[400px] md:h-[622px] max-w-[622px]">
                <Image
                  src={featuredBlog.coverImageUrl || "/images/Overlay.svg"}
                  alt={featuredBlog.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[#00000017]" />
              </div>
            </div>
          </div>
        )}

        {/* Blog List */}
        <div className="flex-1 pt-10 md:max-h-[1000px] md:overflow-y-auto scroll-smooth pr-1 sm:pr-2 custom-scrollbar-hide">
          <div className="flex flex-col gap-10">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <React.Fragment key={i}>{SkeletonListItem}</React.Fragment>
                ))
              : blogPosts.map((post, index) => (
                  <div
                    key={index}
                    className="relative cursor-pointer"
                    onClick={() =>
                      setFeaturedBlog({
                        title: post.title,
                        date: post.createdAt,
                        category: post.category,
                        image: post.coverImageUrl,
                        ...post,
                      })
                    }
                  >
                    <div className="flex flex-col sm:flex-row w-full pb-10 gap-4 sm:gap-[48px]">
                      <div className="flex-1">
                        <h3 className="font-[600] mt-3 text-black text-[24px] sm:text-[28px] md:text-[30.8px] tracking-[-0.51px] leading-[1.1] mb-4">
                          {post.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-4">
                          <span
                            className="text-[13.6px] font-[300] text-[#232323] tracking-[0.16px] leading-[21px]"
                            style={{ fontFamily: "var(--font-roboto)" }}
                          >
                            {new Date(post.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </span>

                          <span
                            className="text-[14.06px] capitalize font-light text-[#232323] tracking-[0.16px] leading-[21px]"
                            style={{ fontFamily: "var(--font-roboto)" }}
                          >
                            {post.category}
                          </span>

                          <Button
                            variant="link"
                            className="p-0 h-9 text-[#004FCF]"
                            onClick={() =>
                              handleClick(post.blog_id)
                            }
                          >
                            <span
                              className="font-[600] text-[13.9px] tracking-[0.11px] leading-[21px]"
                              style={{ fontFamily: "var(--font-roboto)" }}
                            >
                              Learn more
                            </span>
                          </Button>
                        </div>
                      </div>

                      <div className="w-full sm:w-[176px] h-[176px] rounded-[16px] overflow-hidden relative">
                        <Image
                          src={post.coverImageUrl || "/images/Overlay.svg"}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-[#00000017]" />
                      </div>
                    </div>

                    {index < blogPosts.length - 1 && (
                      <Separator className="w-full h-px bg-[#00000017]" />
                    )}
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
