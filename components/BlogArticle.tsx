"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { ChevronRightIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const categoryValue = {
  "6127b7b9-fcc8-4ed8-9890-09ce60c29db7": "Startup",
  "dc743317-c69c-44a9-abd5-65898ac16ede": "Technology",
  "a58f7e32-a97f-4349-a4d3-c02ab5e978ac": "Lifestyle",
  "cace7d4c-4b01-4de8-8184-418b67eb18df": "Design"
}

const ArticleSection = () => {
  const searchParams = useSearchParams();
  const blogId = searchParams.get("blogId");
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userDetail, setUserDetail] = useState<any>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!blogId) return;
      try {
        const res = await fetch(`/api/blogs/${blogId}`);
        const data = await res.json();
        if (data.status) {
          setBlog(data.blog);
          setUserDetail(data.user);
        }
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  const wordCount = blog?.content?.split(/\s+/).length || 0;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <section className="flex flex-col items-center w-full">
      {/* Top Container */}
      <div className="w-full px-4  md:px-[60px] lg:px-[107px]  max-w-[1324px] flex flex-col items-start py-9">
        <div className="w-full flex justify-center mb-6 md:px-0">
          <div className="w-full max-w-[1046px]">
            <Breadcrumb className="overflow-x-auto">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="flex items-center">
                    <img src="/images/home.svg" className="h-[16px] w-[16px]" />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRightIcon className="w-4 h-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="#"
                    className="text-[#1a73e8] uppercase text-sm tracking-[0.25px] font-medium"
                    style={{ fontFamily: "var(--font-roboto)" }}
                  >
                    {categoryValue[blog?.category as keyof typeof categoryValue]}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <div className="w-full flex justify-center  md:px-0">
          <div className="w-full max-w-[1046px]">
            {loading ? (
              <Skeleton className="h-[60px] w-full rounded-md" />
            ) : (
              <h1 className="text-[32px]  md:text-[59.8px] font-normal text-[#202124] tracking-[-0.3px] md:tracking-[-0.5px] leading-tight md:leading-[72px]">
                {blog?.title}
              </h1>
            )}
          </div>
        </div>
      </div>

      {/* Blog Info */}
      <div className="w-full max-w-[1260px] px-4  md:px-[60px] lg:px-[107px] mb:pb-9">
        <div className="flex flex-col item-center gap-2 justify-center md:flex-row">
          <div className="flex justify-between items-center">
            <div className="pr-1  md:pr-6  md:border-r border-[#dadce0]">
              {loading ? (
                <Skeleton className="h-4 w-24 mb-2" />
              ) : (
                <div className="flex flex-row lg:flex-col items-start md:items-center gap-2">
                  <p
                    className="text-[#5f6368] text-[13.9px]  leading-6"
                    style={{ fontFamily: "var(--font-roboto)" }}
                  >
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-[#5f6368] text-[13.9px]  leading-6" style={{ fontFamily: "var(--font-roboto)" }}>{readTime} min read</p>
                </div>
              )}
            </div>
            <div>
              <button className="flex  md:hidden items-center">
                <img src="/images/share.svg" className="w-[19px] h-[18px]" />
              </button>
            </div>
          </div>
          <div className="flex-1  md:mt-0 md:ml-6">
            {loading ? (
              <Skeleton className="h-5 w-64" />
            ) : (
              <p
                className="text-[#5f6368] text-sm md:text-lg leading-[26px] md:leading-[30px]"
                style={{ fontFamily: "var(--font-roboto)" }}
              >
                {blog?.subHeading}
              </p>
            )}
          </div>
        </div>

        {/* Tags */}
        {loading ? (
          <div className="flex gap-2 mt-[13px]">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        ) : (
          <div className="flex flex-wrap gap-[13px] mt-7 mb-2 md:mt-[13px]">
            {(blog?.tags || []).map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-[#e8f0fe] text-[#174ea6] rounded-[30px] capitalize px-1 md:px-5 md:py-2.5 text-[13.3px]"
                style={{ fontFamily: "var(--font-roboto)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Author Section */}
      <div className="w-full max-w-[1260px] flex mt-3 sm:mt-0  md:flex-row justify-between items-start md:items-center px-4 sm:px-6 md:px-[60px] lg:px-[107px] mb-6">
        {loading ? (
          <div className="flex items-center gap-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-52" />
            </div>
          </div>
        ) : (
          <div className="flex items-start mb-6 mt-1 md:mb-0">
            <Avatar className="w-10 h-10 border border-[#e8eaed] rounded-full mr-4">
              <AvatarImage
                src={userDetail?.profile_image || "/images/profile/img-1.svg"}
                className="w-10 h-10 rounded-full object-cover"
              />
              <AvatarFallback>XYZ</AvatarFallback>
            </Avatar>
            <div>
              <h3
                className="text-sm font-bold text-[#202124]"
                style={{ fontFamily: "var(--font-roboto)" }}
              >
                {userDetail?.username || "Anonymous"}
              </h3>
              <p
                className="text-xs md:text-sm font-medium text-[#5f6368] tracking-[0.25px] leading-[20.2px]"
                style={{ fontFamily: "var(--font-roboto)" }}
              >
                Vice President, Product Management, Search
              </p>
            </div>
          </div>
        )}
        <div className="flex-row hidden md:flex gap-1 items-center">
          <img src="/images/share.svg" className="w-[19px] h-[18px]" />
          <span
            className="ml-2.5 text-base text-[#202124]"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            Share
          </span>
        </div>
      </div>

      {/* Cover Image */}
      <div className="w-full max-w-[1260px] md:px-4 sm:px-6 md:px-[60px] lg:px-[107px]">
        {loading ? (
          <Skeleton className="w-full h-[300px] md:rounded-lg" />
        ) : (
          <img
            src={blog?.coverImageUrl || "/images/blog-img.svg"}
            className="w-full h-auto max-h-[436.17px] md:rounded-lg object-cover"
          />
        )}
      </div>

      {/* Blog Content */}
      <div className="w-full max-w-[1260px] px-4 sm:px-6 md:px-[80px] lg:px-[214px] pt-10 pb-20">
        <div className="w-full max-w-[726px] mx-auto">
          <Card className="border-none shadow-none">
            <CardContent className="p-0">
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[90%]" />
                  <Skeleton className="h-4 w-[80%]" />
                  <Skeleton className="h-4 w-[95%]" />
                  <Skeleton className="h-4 w-[85%]" />
                </div>
              ) : (
                <div
                  className="text-[#5f6368] text-base leading-[26px] space-y-4"
                  style={{ fontFamily: "var(--font-roboto)" }}
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ArticleSection;
