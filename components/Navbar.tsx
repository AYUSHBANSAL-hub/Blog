"use client";

import {
  SearchIcon,
  ChevronDown,
  Menu,
  XIcon,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";      // NEW
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MegaMenuContent from "./Megamenu";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/lib/hook";

const Navbar = () => {
  const pathname = usePathname();                   // NEW
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  
  const user = useAppSelector((state) =>  state.user );
  const getInitial = (name : string) => name?.charAt(0)?.toUpperCase() || "U"

  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);


  const navItems = [
    { label: "Product", href: "/profile" },
    { label: "Service", href: "/manageblog" },
    { label: "Blogs", href: "/Blog" },          // fixed
    { label: "Case Studies", href: "/blog-open" },
    { label: "About", href: "/signup" },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchExpanded(false);
      }
    };
    if (isSearchExpanded) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchExpanded]);


  const handleNavItemMouseEnter = (label: string) => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setActiveMegaMenu(label);
  };
  const handleNavContainerMouseLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => setActiveMegaMenu(null), 150);
  };
  const handleMegaMenuMouseEnter = () => megaMenuTimeoutRef.current && clearTimeout(megaMenuTimeoutRef.current);
  const handleMegaMenuMouseLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => setActiveMegaMenu(null), 150);
  };


  const isLinkActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href);
  return (
    
    <header
      className="bg-white w-full h-[71px] pt-2 relative"
      onMouseLeave={handleNavContainerMouseLeave}
    >
      
      <div className="flex items-center justify-between px-6 md:px-20 py-3">

        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-black text-xl font-medium group-hover:text-neutral-700 transition-colors">
              LOGO
            </span>
            <span className="border border-stone-300 p-0.5 rounded-full flex items-center justify-center group-hover:border-stone-400 transition-colors">
              <ChevronDown size={16} className="text-stone-500 group-hover:text-stone-700 transition-colors" />
            </span>
          </Link>


          <nav className="hidden md:flex ml-7 items-center gap-3">
            {navItems.map((item) => {
              const active = isLinkActive(item.href);     // NEW
              return (
                <div
                  key={item.label}
                  onMouseEnter={() => handleNavItemMouseEnter(item.label)}
                  className="py-1.5"
                >
                  <Link
                    href={item.href}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-150
                      ${active
                        ? "bg-stone-100 text-neutral-800"
                        : "text-neutral-600 hover:bg-stone-100 hover:text-neutral-800"}`}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </nav>
        </div>

        {/* ---------- RIGHT: search + sign-in + mobile-menu-btn ---------- */}
        <div className="flex items-center gap-3">
          {/* desktop search & sign in */}
          <div className="hidden md:flex items-center gap-3" ref={searchContainerRef}>
            {!isSearchExpanded ? (
              <button
                onClick={() => setIsSearchExpanded(true)}
                className="p-2 h-9 w-12 flex items-center justify-center bg-stone-100 hover:bg-stone-200 rounded-4xl transition-colors"
                aria-label="Open search"
              >
                <SearchIcon className="h-4 w-4 text-stone-600" />
              </button>
            ) : (
              <div className="relative w-80">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500 pointer-events-none" />
                <input
                  autoFocus
                  className="pl-10 pr-10 py-2 h-9 w-full rounded-full border border-stone-300 text-sm text-stone-700 placeholder-stone-500 focus:outline-none focus:ring-0 focus:border-stone-400"
                  placeholder="Search"
                />
                <button
                  onClick={() => setIsSearchExpanded(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                  aria-label="Close search"
                >
                  <XIcon size={16} />
                </button>
              </div>
            )}


            {user?.id ? (
              <div
                title={user.fullName}
                className="w-9 h-9 bg-[#6a83ff] text-white rounded-full flex items-center justify-center font-semibold text-sm"
              >
                {getInitial(user.fullName)}
              </div>
            ) : (
              <Link href="/login">
                <Button className="bg-[#6a83ff] hover:bg-[#556acc] text-white rounded-full px-4 h-9 text-sm font-medium">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* mobile menu button */}
          {user?.id ? 
           ( <div
                title={user.fullName}
                className="w-6 md:hidden h-6 bg-[#6a83ff]  text-white rounded-full flex items-center justify-center font-semibold text-[12px]"
              >
                {getInitial(user.fullName)}
          </div>) : (<></>)}

          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >

            <Menu className="w-6 h-6 text-zinc-800" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>

      {/* ---------- MOBILE NAV ---------- */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white flex flex-col gap-1 px-4 pt-2 pb-4 border-t border-stone-200 absolute top-[69px] left-0 right-0 z-20 shadow-lg"
        >
          {navItems.map((item) => {
            const active = isLinkActive(item.href);     // NEW
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-md text-base font-medium transition-colors
                  ${active
                    ? "bg-stone-100 text-neutral-900"
                    : "text-neutral-700 hover:bg-stone-100 hover:text-neutral-900"}`}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="relative w-full mt-3">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-500" />
            <Input
              className="pl-10 pr-4 py-2.5 h-10 rounded-full border border-stone-300 text-sm text-stone-700 placeholder-stone-500 outline-none focus:ring-0 focus:border-stone-400"
              placeholder="Search"
            />
          </div>

          { user.id ? (<></>) :
            (<Link href="/login">
            <Button className="w-full mt-3 rounded-full bg-[#6a83ff] hover:bg-[#556acc] text-white text-sm font-medium h-10">
              Sign In
            </Button>
          </Link>)}
        </div>
      )}

      {/* ---------- MEGA MENU (desktop) ---------- */}
      {activeMegaMenu && (
        <div
          className="hidden md:block absolute left-0 right-0 top-[69px] z-10"
          onMouseEnter={handleMegaMenuMouseEnter}
          onMouseLeave={handleMegaMenuMouseLeave}
        >
          <MegaMenuContent activeLabel={activeMegaMenu} />
        </div>
      )}
    </header>
  );
};

export default Navbar;
