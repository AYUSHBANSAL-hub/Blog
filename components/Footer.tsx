import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Product data for the footer section
const productCategories = [
    {
        title: "Cloud Computing",
        icon: "/images/Vector-1.svg",
        items: ["Team Spaces", "File Sharing", "Comments", "Notifications"],
    },
    {
        title: "Encryption",
        icon: "/images/Vector-2.svg",
        items: ["Encryption", "Access Control", "Audit Logs", "Compliance"],
    },
    {
        title: "AI in Action",
        icon: "/images/Vector-3.svg",
        items: ["Workflows", "Triggers", "Integrations", "API Access"],
    },
    {
        title: "Product Managment",
        icon: "/images/Vector-4.svg",
        items: ["Dashboard", "Reports", "Insights", "Real-time Data"],
    },
];

// Resource links data
const resourceLinks = [
    { title: "Documentation", icon: "/images/Vector-5.svg" },
    { title: "Support", icon: "/images/Vector-6.svg" },
    { title: "Learning", icon: "/images/Vector-7.svg" },
    { title: "Getting Started", icon: "/images/Vector-8.svg" },
];

// Social media icons
const socialIcons = [
    "/images/Vector-9.svg",
    "/images/Vector-10.svg",
    "/images/Vector-11.svg",
    "/images/Vector-12.svg",
    
];

const Footer = () => {
  return (
    <section>
      {/* Footer */}
      <footer className="w-full bg-[#F9FAFB] border-t-[2px] px-[112px] pt-[61px] border-[#CED4DA] rounded-t-2xl pb-14 min-h-[535px]">
        <div className="max-w-[1200px] mx-auto ">
          <h3 className="font-[600]  text-[#111827]  text-[32px] mb-8">
            Our Products
          </h3>

          {/* Product Grid */}
          <div className="flex flex-wrap w-full justify-between mb-8">
            {productCategories.map((category, index) => (
              <div key={index} className="w-[220px]">
                <div className="flex items-center gap-2 mb-4">
                  <img className="w-4 h-4" src={category.icon} alt="" />
                  <span className="font-[500] text-[#111827] text-[16px]">
                    {category.title}
                  </span>
                </div>
                <ul className="space-y-2">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="text-[#4B5563] font-[400] text-[14px]" style={{ fontFamily: 'var(--font-roboto)' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Resources */}
          <div className="flex flex-wrap gap-[40.25px] border-t border-gray-200 pt-6 mb-12">
            {resourceLinks.map((link, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <img src={link.icon} className="w-4 h-4" alt="" />
                <span className="text-[14px] text-[#4B5563] font-[400]" style={{ fontFamily: 'var(--font-roboto)' }}>{link.title}</span>
              </div>
            ))}
          </div>

          {/* Footer bottom */}
          <div className="flex justify-between items-center border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-500" style={{ fontFamily: 'var(--font-roboto)' }}>
              © 2024 Your Company. All rights reserved.
            </p>
            <div className="flex gap-6">
              {socialIcons.map((icon, i) => (
                <img key={i} src={icon} alt={`icon-${i}`} className="w-4 h-4" />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};
export default Footer;
