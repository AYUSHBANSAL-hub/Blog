"use client";
import React from "react";
import { Avatar } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  const profileData = {
    name: "Alex Johnson",
    username: "@alexjohnson",
    stats: [
      { label: "Posts", value: "24" },
      { label: "Followers", value: "1.2k" },
      { label: "Following", value: "428" },
    ],
    details: [
      { icon: "/images/profile/img-2.png", text: "Joined March 2025" },
      { icon: "/images/profile/img-3.png", text: "Delhi, India" },
      { icon: "/images/profile/img-4.png", text: "git link", isLink: true },
      { icon: "/images/profile/img-5.png", text: "alex@example.com" },
    ],
    about:
      "Full-stack developer passionate about creating amazing user experiences. I write about technology, design, and startup life.",
  };

  const blogPosts = [
    {
      category: { name: "Technology", color: "purple" },
      date: "Dec 15, 2024",
      title: "The Future of Web Development: Trends to Watch in 2025",
      description:
        "Exploring the latest trends in web development including AI integration, serverless architecture, and the evolution of JavaScript frameworks...",
      stats: { views: "1.2k", likes: "89", comments: "23" },
    },
    {
      category: { name: "Design", color: "green" },
      date: "Dec 10, 2024",
      title: "Creating Intuitive User Interfaces: A Designer's Guide",
      description:
        "Learn the fundamental principles of UI design that make interfaces both beautiful and functional. From color theory to typography...",
      stats: { views: "856", likes: "67", comments: "15" },
    },
    {
      category: { name: "Startup", color: "orange" },
      date: "Dec 5, 2024",
      title: "Building a Tech Startup: Lessons Learned from My Journey",
      description:
        "My experience building a startup from scratch, the challenges faced, and the valuable lessons learned along the way...",
      stats: { views: "2.1k", likes: "156", comments: "42" },
    },
    {
      category: { name: "Programming", color: "blue" },
      date: "Nov 28, 2024",
      title: "Mastering React Hooks: Advanced Patterns and Best Practices",
      description:
        "Deep dive into advanced React Hooks patterns, custom hooks creation, and performance optimization techniques...",
      stats: { views: "3.4k", likes: "234", comments: "58" },
    },
  ];

  const getBadgeColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string }> = {
      purple: { bg: "bg-purple-100", text: "text-purple-800" },
      green: { bg: "bg-green-100", text: "text-green-800" },
      orange: { bg: "bg-orange-100", text: "text-orange-800" },
      blue: { bg: "bg-blue-100", text: "text-blue-800" },
    };
    return colorMap[color] || { bg: "bg-gray-100", text: "text-gray-800" };
  };

  return (
    <div className="flex flex-col md:flex-row mt-16 px-4 md:px-6 gap-4 w-full">
      {/* Profile Card */}
      <div className="w-full md:w-1/3">
        <Card className="shadow">
          <CardContent className="p-4 flex flex-col items-center">
            <div className="my-3">
              <Avatar className="w-20 h-20 border-4 border-blue-100">
                <img
                  src="/images/profile/img-1.png"
                  alt="Profile"
                  className="object-cover w-full h-full rounded-full"
                />
              </Avatar>
            </div>

            <h2 className="font-black text-xl text-gray-900 leading-7">{profileData.name}</h2>
            <p className="text-sm text-gray-600 mb-4">{profileData.username}</p>

            <div className="flex justify-between w-full mb-4">
              {profileData.stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center w-1/3">
                  <span className="font-bold text-lg text-gray-900">{stat.value}</span>
                  <span className="text-xs text-gray-600">{stat.label}</span>
                </div>
              ))}
            </div>

            <Separator className="my-3" />

            <div className="w-full space-y-3 mb-3">
              {profileData.details.map((detail, index) => (
                <div key={index} className="flex items-center">
                  <img className="w-4 h-4 mr-3" src={detail.icon} alt="" />
                  <span className={`text-sm ${detail.isLink ? "text-blue-600" : "text-gray-600"}`}>
                    {detail.text}
                  </span>
                </div>
              ))}
            </div>

            <Separator className="my-3" />

            <div className="w-full">
              <h3 className="text-sm text-gray-900 mb-1">About</h3>
              <p className="text-sm text-gray-600">{profileData.about}</p>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Edit Profile</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Blog Posts Section */}
      <div className="w-full md:w-2/3 flex flex-col gap-4">
        <Card className="shadow">
          <CardContent className="p-4">
            <h2 className="text-lg font-bold text-gray-900 mb-2">My Blog Posts</h2>
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-medium">
                24 Posts
              </span>
              <span className="text-xs text-gray-600">Total views: 15.2k</span>
              <span className="text-xs text-gray-600">Total likes: 892</span>
            </div>
          </CardContent>
        </Card>

        <div className="max-h-[700px] overflow-y-auto scroll-smooth pr-1 space-y-4 scrollbar-hide">
  {blogPosts.map((post, index) => {
    const colorClasses = getBadgeColorClasses(post.category.color);
    return (
      <Card key={index} className="shadow overflow-hidden">
        <CardContent className="p-4">
          <div className="flex flex-wrap justify-between items-center mb-3 gap-y-1">
            <span
              className={`${colorClasses.bg} ${colorClasses.text} rounded-full px-3 py-1 text-xs font-medium`}
            >
              {post.category.name}
            </span>
            <span className="text-xs text-gray-500">{post.date}</span>
          </div>

          <h3 className="text-base font-semibold text-gray-900 mb-1">{post.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{post.description}</p>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex flex-wrap gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <img src="/images/profile/img-6.png" alt="Views" className="w-4 h-3.5" />
                {post.stats.views} views
              </span>
              <span className="flex items-center gap-1">
                <img src="/images/profile/img-7.png" alt="Likes" className="w-4 h-3.5" />
                {post.stats.likes} likes
              </span>
              <span className="flex items-center gap-1">
                <img src="/images/profile/img-8.png" alt="Comments" className="w-4 h-3.5" />
                {post.stats.comments} comments
              </span>
            </div>
            <Button variant="link" className="text-blue-600 text-sm p-0">
              Read More
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  })}
</div>


        <div className="flex justify-center mt-2 mb-7">
          <Button variant="secondary" className="text-gray-700 font-medium text-sm">
            Load More Posts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
