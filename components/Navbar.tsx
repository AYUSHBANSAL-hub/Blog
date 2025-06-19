"use client";

import { SearchIcon, ChevronDown, Menu } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Product", active: false },
    { label: "Service", active: false },
    { label: "Blogs", active: false },
    { label: "About", active: false },
  ];

  return (
    <header className="bg-white w-full border-b border-gray-200">
      <div className="flex items-center justify-between px-6 md:px-20 py-4">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-black text-lg font-medium">LOGO</div>
            <div className="border-2 border-zinc-500 px-1 rounded-2xl ">
              <ChevronDown size={14} className="text-zinc-500" />
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-3">
            {navItems.map((item, index) => (
              <div
                key={index}
                className={`px-3 py-1.5 rounded-full ${
                  item.active ? "bg-[#eeeeee]" : ""
                }`}
              >
                <span className="font-['Figtree'] text-sm text-[#343434] font-medium whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            ))}
          </nav>
        </div>

        {/* Right: Search + Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block relative w-64">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-600" />
            <Input
              className="pl-11 py-2.5 h-10 rounded-full border-stone-300 font-['Figtree'] text-stone-600 text-sm"
              placeholder="Search"
            />
          </div>
          {/* Hamburger menu for mobile */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6 text-zinc-800" />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col gap-2 px-6 pb-4">
          {navItems.map((item, index) => (
            <div
              key={index}
              className={`px-4 py-2 rounded-full ${
                item.active ? "bg-[#eeeeee]" : ""
              }`}
            >
              <span className="font-['Figtree'] text-sm text-[#343434] font-medium whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
          <div className="relative w-full mt-2">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-600" />
            <Input
              className="pl-11 py-2.5 h-10 rounded-full border-stone-300 font-['Figtree'] text-stone-600 text-sm"
              placeholder="Search"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
