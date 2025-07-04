"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const MegaMenuContent = ({ activeLabel }: { activeLabel: string }) => {
  const menuData: Record<string, any> = {
    Product: {
      heading: "Explore Our Products",
      description: "Innovative tools designed to elevate your workflow.",
      links: [
        { text: "AI Dashboard", href: "#" },
        { text: "Analytics Tool", href: "#" },
        { text: "Marketplace", href: "#" },
      ],
    },
    Create: {
      heading: "Our Services",
      description: "Tailored solutions for your business needs.",
      links: [
        { text: "Consulting", href: "#" },
        { text: "Custom Development", href: "#" },
        { text: "Cloud Integration", href: "#" },
      ],
    },
    Blogs: {
      heading: "From the Blog",
      description: "Insights, tutorials, and industry news.",
      links: [
        { text: "Tech Trends 2025", href: "#" },
        { text: "Scaling with Microservices", href: "#" },
        { text: "React Performance Tips", href: "#" },
      ],
    },
    "Profile": {
      heading: "Success Stories",
      description: "See how our clients achieved success.",
      links: [
        { text: "Fintech Case Study", href: "#" },
        { text: "E-commerce Optimization", href: "#" },
        { text: "AI Implementation", href: "#" },
      ],
    },
    About: {
      heading: "Who We Are",
      description: "Learn more about our mission and values.",
      links: [
        { text: "Our Team", href: "#" },
        { text: "Careers", href: "#" },
        { text: "Contact Us", href: "#" },
      ],
    },
  }

  const content = menuData[activeLabel]

  if (!content) return null

  return (
    <div className="bg-white shadow-xl w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
          {/* Column 1 */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-neutral-800">{content.heading}</h2>
              <p className="mt-2 text-sm text-neutral-600">{content.description}</p>
            </div>
            <Link href="#" passHref>
              <Button
                variant="outline"
                className="mt-6 w-full rounded-3xl md:w-auto justify-center bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 group"
              >
                Explore More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-medium text-neutral-800">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              {content.links.map((link: any, i: number) => (
                <li key={i} className="flex items-center">
                  <Link href={link.href} className="flex items-center group">
                    <img src="/images/star.svg" className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span className="text-sm text-neutral-700 group-hover:text-blue-600 transition-colors">
                      {link.text}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - You can repeat same or different section */}
          <div>
            <h3 className="text-lg font-medium text-neutral-800">More Resources</h3>
            <ul className="mt-4 space-y-3">
              {content.links.map((link: any, i: number) => (
                <li key={i} className="flex items-center">
                  <Link href={link.href} className="flex items-center group">
                    <img src="/images/star.svg" className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span className="text-sm text-neutral-700 group-hover:text-blue-600 transition-colors">
                      {link.text}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MegaMenuContent
