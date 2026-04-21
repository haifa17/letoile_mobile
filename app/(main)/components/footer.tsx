"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { footer_links } from "@/lib/constants";

export default function Footer() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <footer className="bg-red-950 bg-gradient-to-r from-red-90 via-red-950/50 to-transparent text-white relative overflow-hidden pointer-events-none">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float opacity-50={value.toString()}."></div>
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float opacity-50={value.toString()}."
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div
            className={`space-y-4 group ${isMounted ? "animate-fade-in-up" : "opacity-0"}`}
          >
            <Link
              href="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 relative flex-shrink-0 group-hover:scale-110 transition-transform">
                <img
                  src="/logo.jpg"
                  alt="LETOILE MOBILE"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-white">
                LETOILE MOBILE
              </span>
            </Link>
            <p className="text-sm text-white/80 leading-relaxed">
              Votre nouveau réseau mobile révolutionnaire avec innovation,
              qualité et service client incomparables.
            </p>
            <div className="flex gap-3 pt-4">
              <Link
                href="#"
                className="p-2 rounded-lg bg-primary/20 hover:bg-primary/40 transition-colors group/icon"
              >
                <Facebook
                  size={18}
                  className="group-hover/icon:scale-110 transition-transform"
                />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-lg bg-primary/20 hover:bg-primary/40 transition-colors group/icon"
              >
                <Twitter
                  size={18}
                  className="group-hover/icon:scale-110 transition-transform"
                />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-lg bg-primary/20 hover:bg-primary/40 transition-colors group/icon"
              >
                <Linkedin
                  size={18}
                  className="group-hover/icon:scale-110 transition-transform"
                />
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div
            className={`space-y-4 ${isMounted ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: isMounted ? "0.1s" : "0s" }}
          >
            <h4 className="font-bold text-white text-lg">Produit</h4>
            <ul className="space-y-2">
              {footer_links.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-red-700 transition duration-300 text-sm group inline-block"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div
            className={`space-y-4 ${isMounted ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: isMounted ? "0.2s" : "0s" }}
          >
            <h4 className="font-bold text-white text-lg">Entreprise</h4>
            <ul className="space-y-2">
              {footer_links.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-red-700 transition duration-300 text-sm group inline-block"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div
            className={`space-y-4 ${isMounted ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: isMounted ? "0.3s" : "0s" }}
          >
            <h4 className="font-bold text-white text-lg">Contact</h4>
            <div className="space-y-3">
              <Link
                href="tel:+21699999999"
                className="flex items-center gap-2 text-white/70 hover:text-red-700 transition group"
              >
                <Phone
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="text-sm">+216 99 999 999</span>
              </Link>
              <Link
                href="mailto:support@letoile.tn"
                className="flex items-center gap-2 text-white/70 hover:text-red-700 transition group"
              >
                <Mail
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="text-sm">support@letoile.tn</span>
              </Link>
              <p className="text-sm text-white/70 pt-2">Disponible 24/7</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <p>&copy; 2025 LETOILE MOBILE. Tous droits réservés.</p>
            <div className="flex items-center gap-6">
              {footer_links.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-red-700 transition duration-300 inline-block relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
