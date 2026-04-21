"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden h-screen flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/bg.jpg)",
          backgroundPosition: "20% center"
        }}
      >
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent opacity-85"></div>

        {/* Animated gradient elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div
            className={`space-y-8 ${isMounted ? "animate-fade-in-up" : "opacity-0"}`}
          >
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white text-balance leading-tight">
                Votre nouveau{" "}
                <span className="text-red-500">réseau mobile</span>
              </h1>

              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-xl">
                Découvrez une expérience mobile révolutionnaire. Migration
                simple, couverture optimale, tarifs transparents.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/form"
                className="group relative w-full sm:w-auto bg-gradient-to-r from-red-700 to-red-700/80 text-red-500-foreground px-8 py-4 rounded-lg font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 transform hover:scale-105"
              >
                <span className="relative text-white z-10">
                  Formulaire de portabilité
                </span>
                <div className="absolute inset-0 bg-red-700/80 -z-0 group-hover:scale-110 transition-transform duration-300"></div>
              </Link>
              <Link
                href="#offres"
                className="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg text-center hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                Découvrir nos Offres
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div
                className="space-y-1 animate-scale-in"
                style={{ animationDelay: "0.2s" }}
              >
                <p className="text-3xl font-bold text-red-500">100%</p>
                <p className="text-sm text-white/80">Couverture nationale</p>
              </div>
              <div
                className="space-y-1 animate-scale-in"
                style={{ animationDelay: "0.4s" }}
              >
                <p className="text-3xl font-bold text-red-500">24/7</p>
                <p className="text-sm text-white/80">Support client</p>
              </div>
              <div
                className="space-y-1 animate-scale-in"
                style={{ animationDelay: "0.6s" }}
              >
                <p className="text-3xl font-bold text-red-500">5G</p>
                <p className="text-sm text-white/80">Technologie</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          {/* <div
            className={`relative hidden md:block ${isMounted ? "animate-slide-in-right" : "opacity-0"}`}
          >
            <div className="relative w-full aspect-square">
              <img
                src="/portabilite.jpg"
                alt="LETOILE MOBILE Athletes"
                className="w-full h-3/4  rounded-2xl shadow-2xl shadow-primary/40 border-2 border-primary/50"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <p className="text-white/60 text-sm">Scroll pour découvrir</p>
          <svg
            className="w-6 h-6 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
