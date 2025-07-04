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

const ArticleSection = () => {
  const searchParams = useSearchParams();
  const blogId = searchParams.get("blogId");
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!blogId) return;
      try {
        const res = await fetch(`/api/blogs/${blogId}`);
        const data = await res.json();
        if (data.status) {
          setBlog(data.blog);
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
      <div className="w-full max-w-[1324px] flex flex-col items-start py-9">
        <div className="w-full flex justify-center mb-6 px-4 sm:px-6 md:px-0">
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
                    className="text-[#1a73e8] text-sm tracking-[0.25px] font-medium"
                    style={{ fontFamily: "var(--font-roboto)" }}
                  >
                    PRODUCT
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRightIcon className="w-4 h-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="#"
                    className="font-medium text-[#1a73e8] text-sm tracking-[0.25px]"
                    style={{ fontFamily: "var(--font-roboto)" }}
                  >
                    GOOGLE AI
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <div className="w-full flex justify-center px-4 sm:px-6 md:px-0">
          <div className="w-full max-w-[1046px]">
            {loading ? (
              <Skeleton className="h-[60px] w-full rounded-md" />
            ) : (
              <h1 className="text-[32px] sm:text-[44px] md:text-[59.8px] font-normal text-[#202124] tracking-[-0.3px] md:tracking-[-0.5px] leading-tight md:leading-[72px]">
                {blog?.title}
              </h1>
            )}
          </div>
        </div>
      </div>

      {/* Blog Info */}
      <div className="w-full max-w-[1260px] px-4 sm:px-6 md:px-[60px] lg:px-[107px] pb-9">
        <div className="flex flex-col md:flex-row">
          <div className="pr-0 md:pr-6 border-r md:border-r border-[#dadce0]">
            {loading ? (
              <Skeleton className="h-4 w-24 mb-2" />
            ) : (
              <p
                className="text-[#5f6368] text-[13.9px] leading-6"
                style={{ fontFamily: "var(--font-roboto)" }}
              >
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
                <br />
                {readTime} min read
              </p>
            )}
          </div>
          <div className="flex-1 mt-4 md:mt-0 md:ml-6">
            {loading ? (
              <Skeleton className="h-5 w-64" />
            ) : (
              <p
                className="text-[#5f6368] text-base md:text-lg leading-[26px] md:leading-[30px]"
                style={{ fontFamily: "var(--font-roboto)" }}
              >
                Helping our customers build a 'Resilient Future'
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
          <div className="flex flex-wrap gap-[13px] mt-[13px]">
            {(blog?.tags || []).map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-[#e8f0fe] text-[#174ea6] rounded-[30px] px-5 py-2.5 text-[13.3px]"
                style={{ fontFamily: "var(--font-roboto)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Author Section */}
      <div className="w-full max-w-[1260px] flex flex-col md:flex-row justify-between items-start md:items-center px-4 sm:px-6 md:px-[60px] lg:px-[107px] mb-6">
        {loading ? (
          <div className="flex items-center gap-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-52" />
            </div>
          </div>
        ) : (
          <div className="flex items-start mb-6 md:mb-0">
            <Avatar className="w-10 h-10 border border-[#e8eaed] rounded-full mr-4">
              <AvatarImage
                src="/images/dp-1.svg"
                className="w-10 h-10 rounded-full object-cover"
              />
              <AvatarFallback>XYZ</AvatarFallback>
            </Avatar>
            <div>
              <h3
                className="text-sm font-bold text-[#202124]"
                style={{ fontFamily: "var(--font-roboto)" }}
              >
                Neha Gupta
              </h3>
              <p
                className="text-sm font-medium text-[#5f6368] tracking-[0.25px] leading-[20.2px]"
                style={{ fontFamily: "var(--font-roboto)" }}
              >
                Vice President, Product Management, Search
              </p>
            </div>
          </div>
        )}
        <button className="flex items-center">
          <img src="/images/share.svg" className="w-[19px] h-[18px]" />
          <span
            className="ml-2.5 text-base text-[#202124]"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            Share
          </span>
        </button>
      </div>

      {/* Cover Image */}
      <div className="w-full max-w-[1260px] px-4 sm:px-6 md:px-[60px] lg:px-[107px]">
        {loading ? (
          <Skeleton className="w-full h-[300px] rounded-lg" />
        ) : (
          <img
            src={blog?.coverImageUrl || "/images/blog-img.svg"}
            className="w-full h-auto rounded-lg object-cover"
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
