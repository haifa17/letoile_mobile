"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white backdrop-blur-md shadow-lg" : "bg-stone-800 shadow-lg"}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 group hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 relative flex-shrink-0 group-hover:scale-110 transition-transform">
            <img
              src="/logo.svg"
              alt="LETOILE MOBILE"
              className="object-contain w-full h-full"
            />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent hidden sm:block">
            LETOILE MOBILE
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { href: "#portabilite", label: "Portabilité" },
            { href: "#migration", label: "Migration" },
            { href: "#offres", label: "Offres" },
            { href: "#faq", label: "FAQ" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative ${isScrolled ? "text-foreground/70 hover:text-foreground" : "text-white hover:text-white/70"} transition group`}
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/form")}
            className="hidden cursor-pointer sm:block group relative bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 transform hover:scale-105"
          >
            <span className="relative z-10">Formulaire</span>
            <div className="absolute inset-0 bg-primary/80 -z-0 group-hover:scale-110 transition-transform duration-300"></div>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-primary/10 rounded-lg transition-colors text-foreground hover:text-primary"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className={`md:hidden border-t border-border/50 animate-fade-in-up ${isScrolled ? "bg-white backdrop-blur-md" : "bg-transparent"}`}
        >
          <div className="px-4 py-4 space-y-2">
            {[
              { href: "#portabilite", label: "Portabilité" },
              { href: "#migration", label: "Migration" },
              { href: "#offres", label: "Offres" },
              { href: "#faq", label: "FAQ" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/form"
              className="w-full bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition font-bold mt-4"
            >
              Formulaire
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
