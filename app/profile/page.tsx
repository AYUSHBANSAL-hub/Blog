"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hook";

import { Avatar } from "@radix-ui/react-avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

type BlogItem = {
  blog_id: string;
  title: string;
  subHeading?: string;
  content: string;
  category: string;
  createdAt: string;
  views?: number;
};

const ProfilePage = () => {
  const router = useRouter();
  const { id, email } = useAppSelector((s) => s.user) || {};

  /* ─── profile dummy data ─────────────────────────────────────────── */
  const profileData = {
    name: "Alex Johnson",
    username: "@alexjohnson",
    stats: [
      { label: "Posts", value: "--" },
      { label: "Views", value: "--" },
    ],
    details: [
      { icon: "/images/profile/img-2.svg", text: "Joined March 2025" },
      { icon: "/images/profile/img-3.svg", text: "Delhi, India" },
      { icon: "/images/profile/img-4.svg", text: "github.com/alex", isLink: true },
      { icon: "/images/profile/img-5.svg", text: "alex@example.com" },
    ],
    about:
      "Full-stack developer passionate about creating amazing user experiences. I write about technology, design, and startup life.",
  };

  /* ─── blogs state ────────────────────────────────────────────────── */
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  /* ─── fetch my blogs ─────────────────────────────────────────────── */
  useEffect(() => {
    if (!email) return;
    (async () => {
      try {
        const res = await fetch("/api/blogs/my", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email }),
        });

        const data = await res.json();
        if (data.status) setBlogs(data.blogs);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [email]);

  /* ─── helpers ────────────────────────────────────────────────────── */
  const colorMap: Record<string, { bg: string; text: string }> = {
    technology: { bg: "bg-purple-100", text: "text-purple-800" },
    design: { bg: "bg-green-100", text: "text-green-800" },
    startup: { bg: "bg-orange-100", text: "text-orange-800" },
    programming: { bg: "bg-blue-100", text: "text-blue-800" },
  };
  const getColor = (cat: string) => colorMap[cat] || { bg: "bg-gray-100", text: "text-gray-800" };

  const handleDelete = async (id: string) => {
    if (!email) return alert("Login required");
    if (!confirm("Delete this blog?")) return;

    const fd = new FormData();
    fd.append("email", email);

    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE", body: fd });
      const json = await res.json();
      if (!json.status) throw new Error(json.error);
      setBlogs(blogs.filter((b) => b.blog_id !== id));
      alert("Deleted!");
    } catch (e: any) {
      alert(e.message || "Error deleting blog");
    }
  };

  /* ─── aggregate stats ────────────────────────────────────────────── */
  const totalViews = blogs.reduce((a, b) => a + (b.views ?? 0), 0);
  profileData.stats = [
    { label: "Posts", value: blogs.length.toString() },
    { label: "Views", value: totalViews.toLocaleString() },
  ];

  /* ─── UI ─────────────────────────────────────────────────────────── */
  return (
    <div className="flex flex-col md:flex-row mt-16 mb-20 px-4 sm:px-6 md:px-[69px] justify-center md:pt-5 gap-9 w-full">
      {/* Profile Card */}
      <div className="w-full md:w-[384px]">
        <Card className="p-2 border-[#E5E7EB] border-2 rounded-[12px]">
          <CardContent className="px-7 pt-5 flex flex-col items-center">
            <Avatar className="w-20 h-20">
              <img src="/images/profile/img.svg" alt="Profile" className="object-cover w-full h-full rounded-full" />
            </Avatar>

            <div className="flex flex-col gap-[7.8px] mt-[12.24px] justify-center items-center">
              <h2 className="font-black text-2xl text-gray-900 leading-7">{profileData.name}</h2>
              <p className="text-lg font-bold text-[#4B5563] mb-4">{profileData.username}</p>
            </div>

            <div className="flex justify-center w-full gap-1 mb-4">
              {profileData.stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center w-20">
                  <span className="font-black text-2xl text-gray-900">{stat.value}</span>
                  <span className="text-sm font-bold text-[#4B5563]">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="w-full space-y-3 mt-4 py-5 flex flex-col gap-2 border-t-[1px] border-[#F3F4F6] mb-3">
              {profileData.details.map((detail, i) => (
                <div key={i} className="flex items-center gap-1">
                  <img className="w-4 h-4 mr-3" src={detail.icon} alt="" />
                  <span className={`text-sm font-bold ${detail.isLink ? "text-blue-600" : "text-gray-600"}`} style={{ fontFamily: "var(--font-roboto)" }}>
                    {detail.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="w-full border-t-[1px] border-[#F3F4F6] flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-1">About</h3>
              <p className="text-sm font-bold text-gray-600" style={{ fontFamily: "var(--font-roboto)" }}>
                {profileData.about}
              </p>
            </div>
          </CardContent>

          <Button className="w-full py-4 text-[16px] font-[500] bg-[#2563EB] hover:bg-blue-700">
            Edit Profile
          </Button>
        </Card>
      </div>

      {/* Blog Posts */}
      <div className="w-full md:w-[798px] flex flex-col gap-4">
        <Card>
          <CardContent className="px-4 sm:px-8 flex flex-col gap-[15.1px]">
            <h2 className="text-[20px] font-[900] text-[#111827]">My Blog Posts</h2>
            <div className="flex flex-wrap items-center gap-4">
              <span className="bg-blue-100 font-[500] text-[#1E40AF] rounded-full px-3 py-1 text-[14px]">
                {blogs.length} Posts
              </span>
              <span className="text-[14px] font-[900] text-[#4B5563]" style={{ fontFamily: "var(--font-roboto)" }}>
                Total views: {totalViews.toLocaleString()}
              </span>

            </div>
          </CardContent>
        </Card>

        {loading ? (
          <p className="text-center mt-6">Loading...</p>
        ) : (
          <div className="space-y-[25px] px-2 sm:px-0">
            {blogs.map((b) => {
              const color = getColor(b.category);
              return (
                <Card key={b.blog_id} className="overflow-hidden">
                  <CardContent className="pl-4 pr-4 sm:pl-[24px] sm:pr-[20.5px]">
                    <div className="flex flex-wrap justify-between items-center">
                      <span className={`${color.bg} ${color.text} capitalize rounded-full px-[7px] py-[3px] text-[12px] font-[500]`}>
                        {b.category}
                      </span>
                      <span className="text-[14px] font-[900] text-[#6B7280]" style={{ fontFamily: "var(--font-roboto)" }}>
                        {new Date(b.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>

                    <h3 className="text-[20px] mt-[10.8px] font-[700] text-[#111827]">{b.title}</h3>
                    <p className="font-[400] text-[16px] text-[#4B5563] mt-[14.44px]" style={{ fontFamily: "var(--font-roboto)" }}>
                      {b.subHeading || b.content.replace(/<[^>]*>/g, '').slice(0, 120) + "..."}
                    </p>

                    <div className="flex flex-col sm:flex-row justify-between mt-[14.76px] gap-3">
                      <div className="flex flex-wrap gap-3 text-xs font-black text-gray-500">
                        <span className="flex items-center text-[14px] font-[900] gap-1" style={{ fontFamily: "var(--font-roboto)" }}>
                          <img src="/images/profile/img-6.svg" alt="Views" className="w-[14px] h-[14px]" />
                          {(b.views ?? 0).toLocaleString()} views
                        </span>
                        <span className="flex items-center text-[14px] font-[900] gap-1" style={{ fontFamily: "var(--font-roboto)" }}>
                          <img src="/images/profile/img-7.svg" alt="Likes" className="w-[14px] h-[14px]" />
                          0 likes
                        </span>
                        <span className="flex items-center text-[14px] font-[900] gap-1" style={{ fontFamily: "var(--font-roboto)" }}>
                          <img src="/images/profile/img-8.svg" alt="Comments" className="w-[14px] h-[14px]" />
                          0 comments
                        </span>
                      </div>

                      <div className="flex gap-3">
                        <button

                          className="text-[#2563EB] text-[14px] font-[500] p-0"
                          style={{ fontFamily: "var(--font-roboto)" }}
                          onClick={() => router.push(`/blog-open?blogId=${b.blog_id}`)}
                        >
                          Read More
                        </button>
                        <button

                          className="text-[#2563EB] text-[14px] font-[500] p-0"
                          style={{ fontFamily: "var(--font-roboto)" }}
                          onClick={() => router.push(`/edit?blogId=${b.blog_id}`)}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button

                          className="text-red-600 text-[14px] font-[500] p-0"
                          style={{ fontFamily: "var(--font-roboto)" }}
                          onClick={() => handleDelete(b.blog_id)}
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
