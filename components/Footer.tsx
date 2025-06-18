import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Product data for the footer section
const productCategories = [
    {
        title: "Cloud Computing",
        icon: "/images/cloud.png",
        items: ["Team Spaces", "File Sharing", "Comments", "Notifications"],
    },
    {
        title: "Encryption",
        icon: "/images/encryption.png",
        items: ["Encryption", "Access Control", "Audit Logs", "Compliance"],
    },
    {
        title: "AI in Action",
        icon: "/images/AI.png",
        items: ["Workflows", "Triggers", "Integrations", "API Access"],
    },
    {
        title: "Product Managment",
        icon: "/images/product.png",
        items: ["Dashboard", "Reports", "Insights", "Real-time Data"],
    },
];

// Resource links data
const resourceLinks = [
    { title: "Documentation", icon: "/images/img-1.png" },
    { title: "Support", icon: "/images/img-2.png" },
    { title: "Learning", icon: "/images/img-3.png" },
    { title: "Getting Started", icon: "/images/img-4.png" },
];

// Social media icons
const socialIcons = [
    "/images/icon-1.png",
    "/images/icon-2.png",
    "/images/icon-3.png",
    "/images/icon-4.png",
];

const Footer = () => {
    return (
        <section >
            {/* Footer */}
            <footer className="w-full bg-zinc-100 border-t border-gray-200 pt-10 pb-8">
                <div className="max-w-[1200px] mx-auto px-6">
                    <h3 className="font-['Figtree',Helvetica] font-semibold text-gray-900 text-xl mb-8">
                        Our Products
                    </h3>

                    {/* Product Grid */}
                    <div className="flex flex-wrap gap-8 mb-8">
                        {productCategories.map((category, index) => (
                            <div key={index} className="w-[220px]">
                                <div className="flex items-center gap-2 mb-4">
                                    <img className="w-4 h-4" src={category.icon} alt="" />
                                    <span className="font-medium text-gray-900 text-sm">
                                        {category.title}
                                    </span>
                                </div>
                                <ul className="space-y-2">
                                    {category.items.map((item, idx) => (
                                        <li key={idx} className="text-gray-600 text-sm">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Resources */}
                    <div className="flex flex-wrap gap-6 border-t border-gray-200 pt-6 mb-8">
                        {resourceLinks.map((link, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <img src={link.icon} className="w-4 h-4" alt="" />
                                <span className="text-sm text-gray-600">{link.title}</span>
                            </div>
                        ))}
                    </div>

                    {/* Footer bottom */}
                    <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                        <p className="text-sm text-gray-500">© 2024 Your Company. All rights reserved.</p>
                        <div className="flex gap-4">
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
