"use client"

import { SearchIcon, ChevronDown, Menu, XIcon } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import MegaMenuContent from "./Megamenu"
 // Added import

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  // State for mega menu
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const navItems = [
    { label: "Product", active: true, href: "#" },
    { label: "Service", active: false, href: "#" },
    { label: "Blogs", active: false, href: "/blog" },
    { label: "Case Studies", active: false, href: "#" },
    { label: "About", active: false, href: "#" },
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchExpanded(false)
      }
    }
    if (isSearchExpanded) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isSearchExpanded])

  // Mega menu handlers
  const handleNavItemMouseEnter = (label: string) => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current)
    }
    setActiveMegaMenu(label)
  }

  const handleNavContainerMouseLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null)
    }, 150) // Delay to allow moving to the mega menu
  }

  const handleMegaMenuMouseEnter = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current)
    }
  }

  const handleMegaMenuMouseLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null)
    }, 150)
  }

  return (
    <header
      className="bg-white w-full h-[71px] pt-2 relative" // Added relative for mega menu positioning
      onMouseLeave={handleNavContainerMouseLeave} // Add mouse leave to header
    >
      <div className="flex items-center justify-between px-6 md:px-20 py-3">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-8">
          
          <a href="/" className="flex items-center gap-2 group">
            <span className="text-black text-xl font-medium group-hover:text-neutral-700 transition-colors">LOGO</span>
            <div className="border border-stone-300 p-0.5 rounded-full flex items-center justify-center group-hover:border-stone-400 transition-colors">
              <ChevronDown size={16} className="text-stone-500 group-hover:text-stone-700 transition-colors" />
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex ml-7 items-center gap-3">
            {navItems.map((item) => (
              <div
                key={item.label}
                onMouseEnter={() => handleNavItemMouseEnter(item.label)}
                className="py-1.5" // Added padding here to ensure hover area is sufficient
              >
                <a
                  href={item.href}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-150 ease-in-out
                    ${
                      item.active
                        ? "bg-stone-100 text-neutral-800"
                        : "text-neutral-600 hover:bg-stone-100 hover:text-neutral-800"
                    }`}
                >
                  {item.label}
                </a>
              </div>
            ))}
          </nav>
        </div>

        {/* Right: Search, Sign In + Mobile Menu Button */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3" ref={searchContainerRef}>
            {!isSearchExpanded && (
              <button
                onClick={() => setIsSearchExpanded(true)}
                className="p-2 h-9 w-12 flex items-center justify-center bg-stone-100 hover:bg-stone-200 rounded-4xl transition-colors"
                aria-label="Open search"
              >
                <SearchIcon className="h-4 w-4 text-stone-600" />
              </button>
            )}
            {isSearchExpanded && (
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

            <Link href="/login">
              <Button className="bg-[#6a83ff] hover:bg-[#556acc] text-white rounded-full px-4 h-9 text-sm font-medium transition-colors">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
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

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white flex flex-col gap-1 px-4 pt-2 pb-4 border-t border-stone-200 absolute top-[69px] left-0 right-0 z-20 shadow-lg" // Added positioning for mobile menu
        >
          {navItems.map((item) => (
            <a
              href={item.href}
              key={item.label}
              className={`block px-3 py-2.5 rounded-md text-base font-medium transition-colors
                ${
                  item.active
                    ? "bg-stone-100 text-neutral-900"
                    : "text-neutral-700 hover:bg-stone-100 hover:text-neutral-900"
                }`}
            >
              {item.label}
            </a>
          ))}
          <div className="relative w-full mt-3">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-500" />
            <Input
              className="pl-10 pr-4 py-2.5 h-10 rounded-full border border-stone-300 text-sm text-stone-700 placeholder-stone-500 outline-none focus:ring-0 focus:border-stone-400"
              placeholder="Search"
            />
          </div>
          <Link href="/login">
            <Button className="w-full mt-3 rounded-full bg-[#6a83ff] hover:bg-[#556acc] text-white text-sm font-medium h-10">
              Sign In
            </Button>
          </Link>
        </div>
      )}

      {/* Mega Menu - Desktop Only */}
      {activeMegaMenu && (
        <div
          className="hidden md:block absolute left-0 right-0 top-[69px] z-10" // Positioned below the header
          onMouseEnter={handleMegaMenuMouseEnter}
          onMouseLeave={handleMegaMenuMouseLeave}
        >
          <MegaMenuContent />
        </div>
      )}
    </header>
  )
}

export default Navbar
