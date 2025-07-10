"use client";

import {
  SearchIcon,
  ChevronDown,
  Menu,
  XIcon,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MegaMenuContent from "./Megamenu";
import { useAppSelector, useAppDispatch } from "@/lib/hook";
import { clearUser } from "@/lib/features/UserSlice";


const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const user = useAppSelector((s) => s.user);
  const getInitial = (name: string) => name?.charAt(0)?.toUpperCase() || "U";

  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navItems = [
    { label: "Product", href: "/modal" },
    { label: "Create", href: "/manageblog" },
    { label: "Blogs", href: "/Blog" },
    { label: "About", href: "/404" },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchExpanded(false);
        setSearchResults([]);
      }
      if (
        avatarRef.current &&
        !avatarRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/blogs/search?search=${encodeURIComponent(searchQuery.trim())}`);
        const data = await res.json();
        setSearchResults(data.blogs || []);
      } catch {
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, [searchQuery]);


  const handleNavItemMouseEnter = (label: string) => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setActiveMegaMenu(label);
  };
  const handleNavContainerMouseLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => setActiveMegaMenu(null), 150);
  };

  const isLinkActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);


  const handleLogout = () => {
    dispatch(clearUser());              // clear Redux
    localStorage.removeItem("token");   // remove JWT
    setDropdownOpen(false);
    router.push("/login");
  };


  const ResultList = ({ mobile = false }: { mobile?: boolean }) => {
    if (!searchResults.length && !loading) return null;
    return (
      <ul
        className={`absolute left-0 right-0 mt-1 bg-white border border-stone-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-30
          ${mobile ? "" : "w-80"}`}
      >
        {loading && (
          <li className="px-4 py-2 text-sm text-stone-500">Searching...</li>
        )}
        {searchResults.map((b) => (
          <li
            key={b.blog_id}
            onClick={() => router.push(`/blog-open?blogId=${b.blog_id}`)}
            className="px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 cursor-pointer transition-colors"
          >
            {b.title}
          </li>
        ))}
      </ul>
    );
  };


  return (
    <header className="bg-white w-full h-[71px] pt-2 relative" onMouseLeave={handleNavContainerMouseLeave}>
      <div className="flex items-center justify-between px-6 md:px-20 py-3">

        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-black text-xl font-medium group-hover:text-neutral-700 transition-colors">LOGO</span>
            <span className="border border-stone-300 p-0.5 rounded-full flex items-center justify-center group-hover:border-stone-400 transition-colors">
              <ChevronDown size={16} className="text-stone-500 group-hover:text-stone-700 transition-colors" />
            </span>
          </Link>

          <nav className="hidden md:flex ml-7 items-center gap-3">
            {navItems.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <div key={item.label} onMouseEnter={() => handleNavItemMouseEnter(item.label)} className="py-1.5">
                  <span
                    onClick={() => {
                      if (item.label === "Create" && !user?.id) {
                        router.push("/login");
                      } else {
                        router.push(item.href);
                      }
                    }}
                    className={`cursor-pointer px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-150
                    ${active
                        ? "bg-stone-100 text-neutral-800"
                        : "text-neutral-600 hover:bg-stone-100 hover:text-neutral-800"}`}
                  >
                    {item.label}
                  </span>

                </div>
              );
            })}
          </nav>
        </div>


        <div className="flex items-center gap-3">
          {/* search container */}
          <div className="hidden md:flex items-center gap-3 relative" ref={searchContainerRef}>
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 py-2 h-9 w-full rounded-full border border-stone-300 text-sm text-stone-700 placeholder-stone-500 focus:outline-none focus:ring-0 focus:border-stone-400"
                  placeholder="Search"
                />
                <button
                  onClick={() => {
                    setIsSearchExpanded(false);
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                  aria-label="Close search"
                >
                  <XIcon size={16} />
                </button>
                <ResultList />
              </div>
            )}


            {user?.id ? (
              <div className="relative" ref={avatarRef}>
                <button
                  onClick={() => setDropdownOpen((p) => !p)}
                  className="w-9 h-9 bg-[#6a83ff] text-white rounded-full flex items-center justify-center font-semibold text-sm"
                  title={user.fullName}
                >
                  {getInitial(user.fullName)}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-36 bg-white border border-stone-200 rounded-md shadow-lg z-50">
                    <button
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        setDropdownOpen(false);
                        router.push("/profile");
                      }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 transition-colors"
                    >
                      <span className="mr-2">👤</span> Profile
                    </button>
                    <button
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        handleLogout();
                      }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 transition-colors"
                    >
                      <span className="mr-2">🚪</span> Logout
                    </button>
                  </div>
                )}


              </div>
            ) : (
              <Link href="/login">
                <Button className="bg-[#6a83ff] hover:bg-[#556acc] text-white rounded-full px-4 h-9 text-sm font-medium">
                  Sign In
                </Button>
              </Link>
            )}
          </div>


          {user?.id && (
            <div className="relative md:hidden" ref={avatarRef}>
              <button
                onClick={() => setDropdownOpen((p) => !p)}
                className="w-6 h-6 bg-[#6a83ff] text-white rounded-full flex items-center justify-center font-semibold text-[12px]"
                title={user.fullName}
              >
                {getInitial(user.fullName)}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-stone-200 rounded-md shadow-lg z-50">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      router.push("/profile");
                    }}
                    className="flex items-center w-full text-left px-3 py-2 text-sm text-stone-700 hover:bg-stone-100 transition-colors"
                  >
                    <span className="mr-2">👤</span> Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-3 py-2 text-sm text-stone-700 hover:bg-stone-100 transition-colors"
                  >
                    <span className="mr-2">🚪</span> Logout
                  </button>
                </div>
              )}

            </div>
          )}


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


      {isMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-white flex flex-col gap-1 px-4 pt-2 pb-4 border-t border-stone-200 absolute top-[69px] left-0 right-0 z-20 shadow-lg">
          {navItems.map((item) => {
            const active = isLinkActive(item.href);
            return (
              <span
                key={item.label}
                onClick={() => {
                  setIsMenuOpen(false);
                  if (item.label === "Create" && !user?.id) {
                    router.push("/login");
                  } else {
                    router.push(item.href);
                  }
                }}
                className={`block cursor-pointer px-3 py-2.5 rounded-md text-base font-medium transition-colors
                  ${active
                    ? "bg-stone-100 text-neutral-900"
                    : "text-neutral-700 hover:bg-stone-100 hover:text-neutral-900"}`}
              >
                {item.label}
              </span>

            );
          })}


          <div className="relative w-full mt-3">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-500" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 h-10 rounded-full border border-stone-300 text-sm text-stone-700 placeholder-stone-500 outline-none focus:ring-0 focus:border-stone-400"
              placeholder="Search"
            />
            <ResultList mobile />
          </div>

          {!user?.id && (
            <Link href="/login">
              <Button className="w-full mt-3 rounded-full bg-[#6a83ff] hover:bg-[#556acc] text-white text-sm font-medium h-10">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      )}


      {activeMegaMenu && (
        <div className="hidden md:block absolute left-0 right-0 top-[69px] z-10" onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)} onMouseLeave={handleNavContainerMouseLeave}>
          <MegaMenuContent activeLabel={activeMegaMenu} />
        </div>
      )}
    </header>
  );
};

export default Navbar;
