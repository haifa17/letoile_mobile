"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { migrationSteps } from "@/lib/constants";

export default function Migration() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      id="migration"
      className="py-20 sm:py-32 bg-gradient-to-r from-red-500/5 via-background to-red-500/5 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div
        className="absolute top-0 left-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "1.5s" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-16">
          {/* Section Header */}
          <div
            className={`space-y-4 ${isMounted ? "animate-fade-in-up" : "opacity-0"}`}
          >
            <h2 className="text-3xl font-heading font-extrabold sm:text-4xl lg:text-5xl text-foreground text-balance">
              <span className="text-red-500">Migration Simplifiée</span> en 3
              étapes
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl leading-relaxed">
              Si vous êtes un abonné prépayé, migrez vers LETOILE MOBILE en
              composant <span className="font-bold text-red-500">*172#</span>.
              Suivez les instructions et recevez votre nouvelle carte en moins
              de 48 heures. C&apos;est simple, rapide et sans tracas!
            </p>
          </div>

          {/* Steps with Image Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              {/* Right: Steps with Animated Arrows */}
              <div
                className={`relative block ${isMounted ? "animate-slide-in-left" : "opacity-0"}`}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/30 border-2 border-primary/20">
                  <img
                    src="/all.jpg"
                    alt="LETOILE MOBILE Team"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent"></div>
                </div>
              </div>
              {/* CTA Section */}
              <div
                className={`flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 ${isMounted ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: isMounted ? "0.4s" : "0s" }}
              >
                <Link
                  href="/form"
                  className="group relative w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-500/80 text-red-500-foreground px-8 py-4 rounded-lg font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 transform hover:scale-105"
                >
                  <span className="relative text-white z-10">
                    Démarrer la migration
                  </span>
                  <div className="absolute inset-0 bg-red-500/50 -z-0 group-hover:scale-110 transition-transform duration-300"></div>
                </Link>
                <p className="text-sm text-foreground/60 text-center sm:text-left">
                  ⚡ Migration instantanée disponible 24/7
                </p>
              </div>
            </div>

            {/* Left: Image */}
            <div
              className={`${isMounted ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: isMounted ? "0.2s" : "0s" }}
            >
              <div className="relative">
                {/* Animated connecting line for desktop */}
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2 z-0">
                  <div className="flex-1 h-full bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 gap-8 relative z-10">
                  {migrationSteps.map((step, idx) => (
                    <div
                      key={step.number}
                      className={`relative group ${isMounted ? "animate-scale-in" : "opacity-0"}`}
                      style={{
                        animationDelay: isMounted ? `${idx * 0.15}s` : "0s",
                      }}
                    >
                      <div className="space-y-6 relative md:w-full ">
                        {/* Card Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-500/5 rounded-2xl blur-xl group-hover:from-red-500/20 group-hover:to-red-500/10 transition-all duration-300"></div>

                        {/* Card Content */}
                        <div className="relative space-y-4 p-6 rounded-2xl border border-red-500/20 group-hover:border-red-500/50 transition-all duration-300">
                          <div className="inline-flex items-center text-white justify-center w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-500/80 text-4xl font-bold shadow-lg shadow-red-500/30 group-hover:scale-110 group-hover:shadow-red-500/50 transition-all duration-300">
                            {step.number}
                          </div>

                          <div className="space-y-3 pt-4">
                            <h3 className="text-2xl font-bold text-foreground group-hover:text-red-500 transition-colors">
                              {step.title}
                            </h3>
                            <p className="text-foreground/70 leading-relaxed">
                              {step.description}
                            </p>
                          </div>

                          {/* Arrow for mobile */}
                          {idx < migrationSteps.length - 1 && (
                            <div className="md:hidden pt-4">
                              <ArrowRight className="w-6 h-6 text-red-500/50 rotate-90" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Jersey Accent Section */}

        </div>
      </div>
    </section>
  );
}
