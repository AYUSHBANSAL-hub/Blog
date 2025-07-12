"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"; // shadcn skeleton
import { useRouter } from "next/navigation";

type Blog = {
  blog_id: string;
  category_name: string;
  title: string;
  coverImageUrl: string;
};

const SkeletonCard = () => (
  <div
    className="
      flex flex-col justify-between
      font-normal
      border min-h-[420px] border-[#dadce0]
      rounded-[8px] overflow-hidden
      bg-white
      animate-fadeIn
    "
  >
    <div className="px-4 sm:px-6 md:px-9 pt-5 flex flex-col gap-4">
      <Skeleton className="h-[20px] w-[100px] rounded-full" />
      <Skeleton className="h-[48px] w-full sm:w-[330px] rounded-md" />
    </div>
    <Skeleton className="border-t-2 w-full h-[182px] mt-2" />
  </div>
);

const ProductSection = () => {
  const LIMIT = 3;
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);

  const fetchPage = async (pageNum: number) => {
    if (loadingRef.current || !hasMoreRef.current) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const res = await fetch(`/api/blogs/?page=${pageNum}&limit=${LIMIT}`);
      const data = await res.json();

      if (data.status) {
        const newBlogs: Blog[] = (data.blogs || []).map((b: any) => ({
          blog_id: b.blog_id,
          category_name: (b.category_name || "BLOG").toUpperCase(),
          title: b.title,
          coverImageUrl: b.coverImageUrl || "/images/landing/Product-1.svg",
        }));

        setBlogs((prev) => {
          const ids = new Set(prev.map((p) => p.blog_id));
          return [...prev, ...newBlogs.filter((n) => !ids.has(n.blog_id))];
        });

        const more = newBlogs.length === LIMIT;
        hasMoreRef.current = more;
        setHasMore(more);
        setPage(pageNum);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="flex flex-col w-full items-center gap-3 py-6 px-4 sm:px-6">
      <div className="w-full max-w-[1270px]">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:mt-3">
          {blogs.map((blog) => (
            <div
              key={blog.blog_id}
              onClick={() => router.push(`/blog-open?blogId=${blog.blog_id}`)}
              className="
                group
                flex flex-col justify-between
                font-normal
                border min-h-[420px] border-[#dadce0]
                rounded-[8px] overflow-hidden
                transition-all duration-300 ease-in-out
                hover:shadow-xl hover:scale-[1.015]
                bg-white cursor-pointer opacity-0 animate-fadeIn
              "
            >
              <div
                className="px-4 sm:px-6 md:px-9 pt-5 flex flex-col gap-4"
                style={{ fontFamily: "var(--font-roboto)" }}
              >
                <p className="text-[#1A73E8] !font-roboto cursor-default text-[14px] font-[500] uppercase leading-[48px] tracking-[0.25px]">
                  {blog.category_name}
                </p>
                <p
                  className="
                    text-[#202124] cursor-default
                    w-full sm:w-[330px]
                    text-[18px] sm:text-[20px]
                    font-roboto font-[400]
                    leading-[1.4]
                    transition-transform duration-300 group-hover:-translate-y-[2px]
                  "
                >
                  {blog.title}
                </p>
              </div>

              <div className="relative border-t-2 w-full mt-2 h-[182px] overflow-hidden group">
                <Image
                  src={blog.coverImageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              </div>
            </div>
          ))}

          {blogs.length === 0 && loading && (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}
        </div>
      </div>

      {hasMore && (
        <Button
          onClick={() => fetchPage(page + 1)}
          variant="outline"
          className="
            mt-[24px] max-w-[380px] min-w-[200px] sm:min-w-[250px]
            min-h-[48px] px-[32px] sm:px-[58.44px] py-[12px]
            rounded-full border border-[#5F6368]
            text-[#1A73E8] font-[500] font-figtree text-[16px]
            transition-all duration-300 transform hover:scale-[1.02] hover:bg-[#f1f3f4]
          "
        >
          {loading && blogs.length > 0 ? "Loading..." : "Load more Blogs"}
        </Button>
      )}
    </section>
  );
};

export default ProductSection;
