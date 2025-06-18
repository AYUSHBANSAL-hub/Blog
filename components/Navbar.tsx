import { SearchIcon } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import { ChevronDown } from 'lucide-react';

 const Navbar = () => {
  // Navigation items data
  const navItems = [
    { label: "Product", active: false },
    { label: "Service", active: false },
    { label: "Blogs", active: true },
    { label: "About", active: false },
  ];

  return (
    <header className="flex bg-white w-full min-h-16 items-center justify-between px-12 py-3.5 ">
      {/* Logo section */}
      <div className="flex items-center">
        <div className="flex items-center gap-4">
          <div className="font-sans font-normal text-black text-[16.7px] tracking-[0.10px] leading-[18px]">
            LOGO
          </div>
          <div className="relative border-2 border-zinc-500 items-center px-1 rounded-3xl ">
            <ChevronDown size={14}  className="text-zinc-500"/>                             
           </div>
        </div>
      </div>

      {/* Navigation menu */}
      <nav className="flex items-center justify-center">
        <div className="flex items-center">
          {navItems.map((item, index) => (
            <div
              key={index}
              className={`inline-flex flex-col items-start pt-[7px] pb-[8.02px] px-4 rounded-[1000px] ${
                item.active ? "bg-[#eeeeee]" : ""
              }`}
            >
              <div className="relative w-fit mt-[-1.00px] [font-family:'Figtree',Helvetica] font-medium text-[#343434] text-[13.7px] tracking-[0.11px] leading-[21px] whitespace-nowrap">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* SearchIcon bar */}
      <div className="flex items-center">
        <div className="relative w-80">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-600" />
          <Input
            className="pl-11 py-2.5 h-10 rounded-full border-stone-300 [font-family:'Figtree',Helvetica] font-normal text-stone-600 text-sm tracking-[-0.08px]"
            placeholder="Search"
          />
        </div>

       
      </div>
    </header>
  );
};
export default Navbar;
