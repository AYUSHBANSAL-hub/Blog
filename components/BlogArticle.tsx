import React from "react";
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

const ArticleSection = () => {
  const articleMeta = {
    date: "29 May, 2025",
    readTime: "2 min read",
    summary:
      "Lorem ipsum dolor sit amet consectetur. Sed est blandit pharetra et nibh sem urna pretium. Lorem ipsum dolor sit amet consectetur. Sed est blandit pharetra et nibh sem urna pretium.",
  };

  const tags = ["Loreum Ipsum", "Loreum Ipsum", "Loreum Ipsum"];

  const keyPoints = [
    {
      label: "Loreum",
      content:
        "Lorem ipsum dolor sit amet consectetur. Sed est blandit pharetra et nibh sem urna pretium.",
    },
    {
      label: "Loreum Ipsum",
      content:
        "Lorem ipsum dolor sit amet consectetur. Sed est blandit pharetra et nibh sem urna pretium.Lorem ipsum dolor sit amet consectetur. Sed est blandit pharetra et nibh sem urna pretium.",
    },
    {
      label: "Loreum Ipsum",
      content:
        "Lorem ipsum dolor sit amet consectetur. Sed est blandit pharetra et nibh sem urna pretium.Lorem ipsum dolor sit amet consectetur. Sed est blandit pharetra et nibh sem urna pretium.",
    },
  ];

  return (
    <section className="flex flex-col items-center w-full">
      <div className="w-full max-w-[1324px] flex flex-col items-start py-9">
        {/* Breadcrumb */}
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
                    PRODUCT XYZ
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
                    LOREUM
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Title */}
        <div className="w-full flex justify-center px-4 sm:px-6 md:px-0">
          <div className="w-full max-w-[1046px]">
            <h1 className="text-[32px] sm:text-[44px] md:text-[59.8px] font-normal text-[#202124] tracking-[-0.3px] md:tracking-[-0.5px] leading-tight md:leading-[72px]">
              Lorem ipsum dolor sit amet consectetur. Sed est blandit pharetra
              et nibh sem urna pretium.
            </h1>
          </div>
        </div>
      </div>

      {/* Meta Info */}
      <div className="w-full max-w-[1260px] px-4 sm:px-6 md:px-[60px] lg:px-[107px] pb-9">
        <div className="flex flex-col md:flex-row">
          <div className="pr-0 md:pr-6 border-r md:border-r border-[#dadce0]">
            <p className="text-[#5f6368] text-[13.9px] leading-6" style={{ fontFamily: "var(--font-roboto)" }}>
              {articleMeta.date}
              <br />
              {articleMeta.readTime}
            </p>
          </div>
          <div className="flex-1 mt-4 md:mt-0 md:ml-6">
            <p className="text-[#5f6368] text-base md:text-lg leading-[26px] md:leading-[30px]" style={{ fontFamily: "var(--font-roboto)" }}>
              {articleMeta.summary}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-[13px] mt-[13px]">
          {tags.map((tag, index) => (
            <span key={index} className="bg-[#e8f0fe] text-[#174ea6] rounded-[30px] px-5 py-2.5 text-[13.3px]" style={{ fontFamily: "var(--font-roboto)" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Author and Share */}
      <div className="w-full max-w-[1260px] flex flex-col md:flex-row justify-between items-start md:items-center px-4 sm:px-6 md:px-[60px] lg:px-[107px] mb-6">
        <div className="flex items-start mb-6 md:mb-0">
          <Avatar className="w-10 h-10 border border-[#e8eaed] rounded-full mr-4">
            <AvatarImage src="/images/dp-1.svg" className="w-10 h-10 rounded-full object-cover" />
            <AvatarFallback>XYZ</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-bold text-[#202124]" style={{ fontFamily: "var(--font-roboto)" }}>XYZ</h3>
            <p className="text-sm font-medium text-[#5f6368] tracking-[0.25px] leading-[20.2px]" style={{ fontFamily: "var(--font-roboto)" }}>
              Lorem ipsum dolor sit amet consectetur. Sed est blandit pharetra et nibh sem urna pretium.
            </p>
          </div>
        </div>
        <button className="flex items-center">
          <img src="/images/share.svg" className="w-[19px] h-[18px]" />
          <span className="ml-2.5 text-base text-[#202124]" style={{ fontFamily: "var(--font-roboto)" }}>
            Share
          </span>
        </button>
      </div>

      {/* Featured Image */}
      <div className="w-full max-w-[1260px] px-4 sm:px-6 md:px-[60px] lg:px-[107px]">
        <img src="/images/blog-img.svg" className="w-full h-auto rounded-lg object-cover" />
      </div>

      {/* Article Body */}
      <div className="w-full max-w-[1260px] px-4 sm:px-6 md:px-[80px] lg:px-[214px] pt-10">
        <div className="flex flex-col items-center gap-12">
          {/* Section 1 */}
          <div className="w-full max-w-[726px]">
            <Card className="border-none shadow-none">
              <CardContent className="p-0">
                <p className="text-[#5f6368] text-base leading-[26px] mb-4" style={{ fontFamily: "var(--font-roboto)" }}>
                  Lorem ipsum dolor sit amet consectetur. Sed est blandit pharetra et nibh sem urna pretium.
                </p>
                <p className="text-[#5f6368] text-base leading-[26px]" style={{ fontFamily: "var(--font-roboto)" }}>
                  Lorem ipsum dolor sit amet consectetur. Sed est blandit pharetra et nibh sem urna pretium.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Section Image */}
          <div className="w-full max-w-[617px] rounded-lg overflow-hidden">
            <img src="/images/blog-gif.gif" className="w-full h-auto object-cover" />
          </div>

          {/* Section 2 with Key Points */}
          <div className="w-full max-w-[726px]">
            <Card className="border-none shadow-none">
              <CardContent className="p-0">
                <h2 className="text-[24px] md:text-[28px] font-bold text-[#202124] leading-9 py-4">
                  Key Insights & Analysis
                </h2>
                {keyPoints.map((point, index) => (
                  <p key={index} className="text-[#5f6368] text-base leading-[26px] mb-3" style={{ fontFamily: "var(--font-roboto)" }}>
                    <span className="font-bold">{point.label}:</span>
                    <span className="font-light"> {point.content}</span>
                  </p>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleSection;
