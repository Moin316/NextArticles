"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import SearchInput from "./SearchInput";
import { ModeToggle } from "./ToggleMode";
import { Menu, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-600 bg-clip-text text-transparent">
                  Welcome
                </span>
                <span className="text-foreground">Articles</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links for Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/articles"
              className={`text-sm font-medium transition-colors ${
                pathname === "/articles"
                  ? "text-blue-400 hover:text-blue-500"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Articles
            </Link>
            <Link
              href="/tutorials"
              className={`text-sm font-medium transition-colors ${
                pathname === "/tutorials"
                  ? "text-blue-400 hover:text-blue-500"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Tutorials
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors ${
                pathname === "/about"
                  ? "text-blue-400 hover:text-blue-500"
                  : "text-foreground hover:text-primary"
              }`}
            >
              About
            </Link>
            <Link
              href="/dashboard"
              className={`text-sm font-medium transition-colors ${
                pathname === "/dashboard"
                  ? "text-blue-400 hover:text-blue-500"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Dashboard
            </Link>
          </div>

          {/* Theme toggle & Auth (Desktop) */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex">
              <SearchInput />
            </div>
            <ModeToggle />
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <div className="hidden md:flex items-center space-x-2">
                <SignInButton mode="modal">
                  <Button>Log In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button>Sign Up</Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="md:hidden py-4 space-y-4 border-t">
          {/* Mobile Search */}
          <div className="px-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="pl-10 w-full focus-visible:ring-1"
              />
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <div className="space-y-2 px-4">
            <Link
              href="/articles"
              className="block px-3 py-2 text-base font-medium text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Articles
            </Link>
            <Link
              href="/tutorials"
              className="block px-3 py-2 text-base font-medium text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tutorials
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-base font-medium text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/dashboard"
              className="block px-3 py-2 text-base font-medium text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          </div>

          {/* Mobile Auth Buttons */}
          <SignedOut>
            <div className="px-4 flex flex-col gap-2">
              <SignInButton mode="modal">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="w-full">Sign up</Button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
