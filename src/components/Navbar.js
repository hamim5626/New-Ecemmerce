"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  Globe,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ModalManager from "./reusable/ModalManager";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cartUtils } from "@/lib/utils";
import useFetch from "@/hooks/use-fetch";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/videos", label: "Videos" },
  { href: "/offers", label: "Offers" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const languages = [
  { code: "EN", label: "English", flag: "🇺🇸" },
  { code: "ES", label: "Español", flag: "🇪🇸" },
  { code: "FR", label: "Français", flag: "🇫🇷" },
];

const PRIMARY_COLOR = "#CFA54B";
const PRIMARY_LIGHT = "#222222";
const PRIMARY_DARK = "#B8944A";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { data: logoData, loading: logoLoading } = useFetch("/get-logo");

  useEffect(() => {
    const loadCartCount = () => {
      try {
        const count = cartUtils.getCartCount();
        setCartCount(count);
      } catch (error) {
        console.error("Error loading cart count:", error);
        setCartCount(0);
      }
    };

    loadCartCount();

    const handleStorageChange = (e) => {
      if (e.key === "cart") {
        loadCartCount();
      }
    };

    const handleCartUpdate = () => {
      loadCartCount();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  const isActiveLink = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-[100] w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 font-inter">
        <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="hover:opacity-80 transition-all relative z-[60]"
            style={{
              color: isMobileMenuOpen ? "white" : PRIMARY_COLOR,
              textShadow: isMobileMenuOpen
                ? "0 2px 4px rgba(0,0,0,0.3)"
                : "none",
            }}
          >
            {logoLoading ? (
              <div className="w-24 h-8 sm:w-32 sm:h-10 md:w-40 md:h-12 lg:w-48 lg:h-14 bg-gray-300 animate-pulse rounded"></div>
            ) : logoData?.data?.logo ? (
              <img 
                src={logoData.data.logo} 
                alt="Allurdevine Logo" 
                className="h-8 w-auto sm:h-10 md:h-12 lg:h-14 object-contain"
              />
            ) : (
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                Allurdevine
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center relative z-[150]">
            <ul className="flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`font-medium transition-all duration-300 relative py-2 px-1 group ${isActive ? "text-[#CFA54B]" : "text-zinc-900"
                        }`}
                    >
                      {link.label}
                      <span
                        className={`absolute bottom-0 left-0 h-0.5 bg-[#CFA54B] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 sm:gap-4 relative z-[150]">
            {/* Language Selector Desktop */}
            <div className="hidden md:block relative z-[200]">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 px-3 py-2 hover:opacity-80"
                  >
                    <Globe className="h-4 w-4" />
                    {selectedLanguage}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-40 bg-white text-heading font-inter z-[200]"
                >
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className="cursor-pointer flex items-center gap-2 hover:opacity-80"
                      style={{
                        backgroundColor:
                          selectedLanguage === lang.code
                            ? `${PRIMARY_COLOR}20`
                            : undefined,
                      }}
                    >
                      <span>{lang.flag}</span>
                      {lang.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Desktop Action Icons */}
            <div className="hidden sm:flex items-center gap-3 lg:gap-4">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Search"
                className="hover:opacity-80"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Link
                href="/wishlist"
                className="hover:opacity-80"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
              </Link>
              <Link
                href="/cart"
                className="relative hover:opacity-80"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-semibold text-white"
                    style={{ backgroundColor: PRIMARY_COLOR }}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* User Login / Dropdown */}
            {user ? (
              <DropdownMenu className="cursor-pointer font-inter relative z-[200]">
                <DropdownMenuTrigger asChild>
                  <div className="cursor-pointer">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user.profile_photo} alt={user.name} />
                      <AvatarFallback>
                        {user.name?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mt-2 bg-white text-heading font-inter z-[200]">
                  <DropdownMenuLabel>
                    <div className="text-sm font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <ModalManager />
            )}

            {/* Mobile Icons and Menu Toggle */}
            <div className="flex items-center gap-2 xl:hidden relative z-[160]">
              {/* Mobile Search Icon */}
              <Button
                variant="ghost"
                size="icon"
                aria-label="Search"
                className="sm:hidden hover:opacity-80 relative z-[60]"
                style={{ color: isMobileMenuOpen ? "white" : "#18181b" }}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Mobile Cart Icon */}
              <Button asChild variant="ghost" size="icon" aria-label="Shopping Cart" style={{ color: isMobileMenuOpen ? "white" : "#18181b" }} className="sm:hidden relative z-[60] hover:opacity-80">
                <Link href="/cart" className="inline-flex items-center justify-center relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-semibold text-white" style={{ backgroundColor: PRIMARY_COLOR }}>
                      {cartCount}
                    </span>
                  )}
                </Link>
              </Button>


              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="relative z-[80] p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  backgroundColor: isMobileMenuOpen
                    ? "rgba(255,255,255,0.95)"
                    : "transparent",
                  color: isMobileMenuOpen ? PRIMARY_COLOR : "#18181b",
                  border: isMobileMenuOpen ? `2px solid ${PRIMARY_COLOR}` : "none",
                }}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 font-bold" strokeWidth={3} />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[70] xl:hidden transition-all duration-500 ease-in-out font-inter ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
        onClick={closeMobileMenu}
      >
        {/* Background Overlay */}
        <div
          className={`absolute inset-0 backdrop-blur-md transition-all duration-500 ${isMobileMenuOpen ? "scale-100" : "scale-95"
            }`}
          style={{
            background: `linear-gradient(135deg, ${PRIMARY_COLOR}F5, ${PRIMARY_DARK}F0, #A6833AF0)`,
          }}
        />

        {/* Menu Content */}
        <div
          className={`relative h-full overflow-y-auto flex flex-col text-white transition-all duration-700 delay-200 px-4 sm:px-6 py-4 ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Close Button */}
          <div className="flex justify-end items-center mb-6 pt-2">
            <Button
              variant="ghost"
              size="icon"
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-white hover:bg-white/30 transition-all"
              onClick={closeMobileMenu}
            >
              <X className="h-6 w-6" strokeWidth={2.5} />
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="mb-6">
            <ul className="space-y-2 sm:space-y-3 max-w-max">
              {navLinks.map((link, index) => {
                const isActive = isActiveLink(link.href);
                return (
                  <li
                    key={link.href}
                    className={`transition-all duration-500 ${isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                      }`}
                    style={{ transitionDelay: `${300 + index * 60}ms` }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`block text-xl sm:text-2xl font-bold transition-all duration-300 hover:scale-105 py-2 sm:py-3 px-4 sm:px-6 rounded-lg relative group ${isActive ? "scale-105" : ""
                        }`}
                      style={{ color: isActive ? PRIMARY_LIGHT : "#ffffff" }}
                      onTouchStart={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
                        }
                      }}
                      onTouchEnd={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      {link.label}
                      <span
                        className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-white transition-all duration-300 ${isActive ? "w-24" : "w-0 group-hover:w-8"
                          }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Action Buttons Grid */}
          <div
            className={`flex gap-3 mb-6 justify-start transition-all duration-500 ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            style={{ transitionDelay: "700ms" }}
          >
            <Link
              href="/wishlist"
              className="flex flex-col items-center justify-center gap-1 h-16 w-24 bg-white/15 border rounded-lg border-white/40 text-white hover:bg-white/25 transition-all active:scale-95"
            >
              <Heart className="h-4 w-4" />
              <span className="text-xs font-medium">Wishlist</span>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-col items-center gap-1 h-16 w-24 bg-white/15 border-white/40 text-white hover:bg-white/25 backdrop-blur-sm transition-all active:scale-95"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-xs font-medium">{selectedLanguage}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-32 bg-white/95 backdrop-blur-sm z-[200]"
              >
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className="cursor-pointer flex items-center gap-2 hover:opacity-80 active:scale-95 transition-all text-sm"
                    style={{
                      backgroundColor:
                        selectedLanguage === lang.code ? `${PRIMARY_COLOR}25` : undefined,
                    }}
                  >
                    <span>{lang.flag}</span>
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Login Button */}
          <div
            className={`transition-all duration-500 ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            style={{ transitionDelay: "800ms" }}
          >
            <Button
              asChild
              size="default"
              className="font-bold px-8 py-2 text-sm rounded-md shadow-xl hover:shadow-2xl transition-all active:scale-95"
              style={{
                backgroundColor: "white",
                color: PRIMARY_COLOR,
              }}
            >
              <Link href="/login" onClick={closeMobileMenu}>
                Login
              </Link>
            </Button>
          </div>

          <div className="h-4" />

          {/* Decorative Elements */}
          <div className="absolute top-20 left-4 w-12 h-12 bg-white/10 rounded-full blur-xl animate-pulse" />
          <div
            className="absolute bottom-20 right-4 w-16 h-16 bg-white/5 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>
      </div>
    </>
  );
}
