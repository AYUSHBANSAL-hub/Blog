import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Avatar } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "../ui/button";
import { Badge } from "lucide-react";


const ProfilePage = () => {
  // Profile data
  const profileData = {
    name: "Alex Johnson",
    username: "@alexjohnson",
    stats: [
      { label: "Posts", value: "24" },
      { label: "Followers", value: "1.2k" },
      { label: "Following", value: "428" },
    ],
    details: [
      { icon: "/frame-24.svg", text: "Joined March 2025" },
      { icon: "/frame-10.svg", text: "Delhi, India" },
      { icon: "/frame-15.svg", text: "git link", isLink: true },
      { icon: "/frame-9.svg", text: "alex@example.com" },
    ],
    about:
      "Full-stack developer passionate about creating amazing user experiences. I write about technology, design, and startup life.",
  };

  // Blog posts data
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

  // Helper function to get badge color classes
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
    <div className="flex gap-6 w-full">
      {/* Profile Card */}
      <div className="w-96">
        <Card className="shadow-[0px_1px_2px_#0000000d]">
          <CardContent className="p-6 flex flex-col items-center">
            {/* Profile Image */}
            <div className="mt-4 mb-4">
              <Avatar className="w-24 h-24 border-4 border-solid border-blue-100">
                <img src="..//img.png" alt="Profile" className="object-cover" />
              </Avatar>
            </div>

            {/* Name and Username */}
            <h2 className="font-black text-2xl text-gray-900 font-['Figtree',Helvetica] leading-8">
              {profileData.name}
            </h2>
            <p className="font-black text-base text-gray-600 font-['Roboto',Helvetica] leading-6 mb-6">
              {profileData.username}
            </p>

            {/* Stats */}
            <div className="flex justify-between w-full mb-6">
              {profileData.stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                  <span className="font-black text-2xl text-gray-900 font-['Figtree',Helvetica]">
                    {stat.value}
                  </span>
                  <span className="font-black text-sm text-gray-600 font-['Roboto',Helvetica]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            {/* Profile Details */}
            <div className="w-full space-y-4 mb-4">
              {profileData.details.map((detail, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex items-center justify-center mr-4">
                    <img className="w-4 h-4" alt="Icon" src={detail.icon} />
                  </div>
                  <span
                    className={`font-black text-sm ${detail.isLink ? "text-blue-600" : "text-gray-600"} font-['Roboto',Helvetica] leading-5`}
                  >
                    {detail.text}
                  </span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            {/* About Section */}
            <div className="w-full">
              <h3 className="font-normal text-base text-gray-900 font-['Inter',Helvetica] mb-4">
                About
              </h3>
              <p className="font-black text-sm text-gray-600 font-['Roboto',Helvetica] leading-[23px]">
                {profileData.about}
              </p>
            </div>
          </CardContent>

          <CardFooter className="p-6 pt-0">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Edit Profile
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Blog Posts Section */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Blog Posts Header */}
        <Card className="shadow-[0px_1px_2px_#0000000d]">
          <CardContent className="p-6">
            <h2 className="font-black text-xl text-gray-900 font-['Figtree',Helvetica] mb-4">
              My Blog Posts
            </h2>
            <div className="flex items-center gap-4">
              <Badge className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 font-medium">
                24 Posts
              </Badge>
              <span className="font-black text-sm text-gray-600 font-['Roboto',Helvetica]">
                Total views: 15.2k
              </span>
              <span className="font-black text-sm text-gray-600 font-['Roboto',Helvetica]">
                Total likes: 892
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Blog Posts */}
        <div className="flex flex-col gap-6">
          {blogPosts.map((post, index) => {
            const colorClasses = getBadgeColorClasses(post.category.color);

            return (
              <Card
                key={index}
                className="shadow-[0px_1px_2px_#0000000d] overflow-hidden"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <Badge
                      className={`${colorClasses.bg} ${colorClasses.text} rounded-full px-3 py-1 font-medium text-xs`}
                    >
                      {post.category.name}
                    </Badge>
                    <span className="font-black text-sm text-gray-500 font-['Roboto',Helvetica]">
                      {post.date}
                    </span>
                  </div>

                  <h3 className="font-bold text-xl text-gray-900 font-['Figtree',Helvetica] leading-7 mb-4">
                    {post.title}
                  </h3>

                  <p className="font-normal text-base text-gray-600 font-['Roboto',Helvetica] leading-6 mb-6">
                    {post.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1">
                        <img
                          className="w-4 h-3.5"
                          alt="Views"
                          src="/frame-12.svg"
                        />
                        <span className="font-black text-sm text-gray-500 font-['Roboto',Helvetica]">
                          {post.stats.views} views
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <img
                          className="w-3.5 h-3.5"
                          alt="Likes"
                          src="/frame-1.svg"
                        />
                        <span className="font-black text-sm text-gray-500 font-['Roboto',Helvetica]">
                          {post.stats.likes} likes
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <img
                          className="w-3.5 h-3.5"
                          alt="Comments"
                          src="/frame-6.svg"
                        />
                        <span className="font-black text-sm text-gray-500 font-['Roboto',Helvetica]">
                          {post.stats.comments} comments
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="link"
                      className="font-medium text-sm text-blue-600 p-0"
                    >
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-4">
          <Button variant="secondary" className="font-medium text-gray-700">
            Load More Posts
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;