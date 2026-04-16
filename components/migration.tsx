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
      className="py-20 sm:py-32 bg-gradient-to-r from-primary/5 via-background to-primary/5 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div
        className="absolute top-0 left-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "1.5s" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-16">
          {/* Section Header */}
          <div
            className={`space-y-4 ${isMounted ? "animate-fade-in-up" : "opacity-0"}`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              <span className="text-primary">Migration Simplifiée</span> en 3
              étapes
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl leading-relaxed">
              Si vous êtes un abonné prépayé, migrez vers LETOILE MOBILE en
              composant <span className="font-bold text-primary">*202#</span>.
              Suivez les instructions et recevez votre nouvelle carte en moins
              de 48 heures. C&apos;est simple, rapide et sans tracas!
            </p>
          </div>

          {/* Steps with Image Grid */}
          <div className="flex flex-col gap-12 items-center">
            {/* Right: Steps with Animated Arrows */}
            <div
              className={`${isMounted ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: isMounted ? "0.2s" : "0s" }}
            >
              <div className="relative">
                {/* Animated connecting line for desktop */}
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2 z-0">
                  <div className="flex-1 h-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 relative z-10">
                  {migrationSteps.map((step, idx) => (
                    <div
                      key={step.number}
                      className={`relative group ${isMounted ? "animate-scale-in" : "opacity-0"}`}
                      style={{
                        animationDelay: isMounted ? `${idx * 0.15}s` : "0s",
                      }}
                    >
                      <div className="space-y-6 relative md:w-sm ">
                        {/* Card Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl blur-xl group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300"></div>

                        {/* Card Content */}
                        <div className="relative space-y-4 p-6 rounded-2xl border border-primary/20 group-hover:border-primary/50 transition-all duration-300">
                          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/80 text-4xl font-bold shadow-lg shadow-primary/30 group-hover:scale-110 group-hover:shadow-primary/50 transition-all duration-300">
                            {step.number}
                          </div>

                          <div className="space-y-3 pt-4">
                            <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                              {step.title}
                            </h3>
                            <p className="text-foreground/70 leading-relaxed">
                              {step.description}
                            </p>
                          </div>

                          {/* Arrow for mobile */}
                          {idx < migrationSteps.length - 1 && (
                            <div className="md:hidden pt-4">
                              <ArrowRight className="w-6 h-6 text-primary/50 rotate-90" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Left: Image */}
            {/* <div
              className={`relative hidden md:block ${isMounted ? "animate-slide-in-left" : "opacity-0"}`}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/30 border-2 border-primary/20">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/662477801_1362375679259793_3996627955566398726_n-34hHvShuKikTRkoIx0aNa5ahwAA2Tx.jpg"
                  alt="LETOILE MOBILE Team"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent"></div>
              </div>
            </div> */}
          </div>

          {/* CTA Section */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 ${isMounted ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: isMounted ? "0.4s" : "0s" }}
          >
            <Link
              href="/form"
              className="group relative w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 transform hover:scale-105"
            >
              <span className="relative z-10">Démarrer la migration</span>
              <div className="absolute inset-0 bg-primary/50 -z-0 group-hover:scale-110 transition-transform duration-300"></div>
            </Link>
            <p className="text-sm text-foreground/60 text-center sm:text-left">
              ⚡ Migration instantanée disponible 24/7
            </p>
          </div>

          {/* Jersey Accent Section */}
          <div
            className={`mt-12 rounded-2xl overflow-hidden border-2 border-primary/20 ${isMounted ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: isMounted ? "0.3s" : "0s" }}
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/653708057_1349515543879140_1608780874247187604_n-ObzDfrqXIrj8SWQLnxJXsiY5XZX7GO.jpg"
                  alt="LETOILE MOBILE Athlete"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content Overlay */}
              <div className="p-8 md:p-12 bg-gradient-to-br from-primary/15 to-background flex flex-col justify-center space-y-4">
                <p className="text-sm font-bold text-primary uppercase tracking-wider">
                  Qualité & Excellence
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  Rejoignez les champions
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  Chaque migration vers LETOILE MOBILE est une victoire.
                  Bienvenue dans l'équipe gagnante.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
