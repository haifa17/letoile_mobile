"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { portability_steps } from "@/lib/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const slides = [
  {
    src: "tbadel.jpg",
    alt: "LETOILE MOBILE Support",
  },
  {
    src: "1.jpg",
    alt: "LETOILE MOBILE Support",
  },
  {
    src: "2.jpg",
    alt: "LETOILE MOBILE Réparation",
  },
  {
    src: "3.jpg",
    alt: "LETOILE MOBILE Garantie",
    title: "Garantie Assurée",
    description: "Pièces certifiées et main-d'œuvre garantie",
  },
];
export default function Portability() {
  const [isMounted, setIsMounted] = useState(false);
  const plugin = useRef(Autoplay({ delay: 1500, stopOnInteraction: true }));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      id="portabilite"
      className="py-20 sm:py-32 bg-gradient-to-b from-background via-background to-secondary relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-700/5 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-red-700/5 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-16">
          {/* Section Header */}
          <div
            className={`space-y-4 ${isMounted ? "animate-fade-in-up" : "opacity-0"}`}
          >
            <h2 className="text-3xl font-heading font-extrabold sm:text-4xl lg:text-5xl text-foreground text-balance">
              Portabilité —{" "}
              <span className="text-red-700">gardez votre numéro</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl leading-relaxed">
              Changez pour LETOILE MOBILE en conservant votre numéro (RIO
              requis). Le processus est simple, rapide et sécurisé.
            </p>
          </div>

          {/* Steps with Image */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Steps with Connecting Line */}
            <div className="relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-red-700 via-red-700/50 to-red-700/0"></div>

              <div className="grid gap-8">
                {portability_steps.map((step, idx) => (
                  <div
                    key={step.number}
                    className={`space-y-6 text-white group ${isMounted ? "animate-fade-in-up" : "opacity-0"}`}
                    style={{
                      animationDelay: isMounted ? `${idx * 0.2}s` : "0s",
                    }}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-700 to-red-700/80 text-red-700-foreground text-4xl font-bold shadow-lg shadow-red-700/30 group-hover:scale-110 transition-transform duration-300">
                        {step.number}
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-red-700 transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-foreground/70 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Animated checkmark for completed steps (visual enhancement) */}
                    <div className="flex items-center gap-2 text-red-700 group-hover:gap-3 transition-all duration-300">
                      <CheckCircle2
                        size={20}
                        className="group-hover:scale-125 transition-transform"
                      />
                      <span className="text-sm font-medium">
                        Étape {step.number}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image */}
            <div
              className={`relative block ${isMounted ? "animate-slide-in-left" : "opacity-0"}`}
            >
              <div className="sticky top-24">
                <Carousel
                  plugins={[plugin.current]}
                  opts={{ loop: true }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/30 border-2 border-primary/20"
                  onMouseEnter={plugin.current.stop}
                  onMouseLeave={plugin.current.reset}
                >
                  <CarouselContent>
                    {slides.map((slide, index) => (
                      <CarouselItem key={index}>
                        <div className="relative">
                          <img
                            src={slide.src}
                            alt={slide.alt}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {/* Navigation arrows */}
                  <CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white border-white/30 backdrop-blur-sm" />
                  <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white border-white/30 backdrop-blur-sm" />
                </Carousel>

                {/* Dot indicators */}
                <div className="flex justify-center gap-1.5 mt-3">
                  {slides.map((_, i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-primary/40"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA and Info */}
          <div
            className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 bg-gradient-to-r from-red-700/10 to-red-700/5 backdrop-blur-sm border border-red-700/20 rounded-2xl p-8 hover:border-red-700/40 transition-all duration-300 ${isMounted ? "animate-scale-in" : "opacity-0"}`}
          >
            <div className="space-y-2">
              <p className="text-foreground/80 font-medium">
                ⚡ Une courte interruption peut survenir le jour du transfert.
              </p>
              <p className="text-sm text-foreground/60">
                Nous gérons tout pour vous. Support 24/7 disponible.
              </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Link
                href="#contact"
                className="flex-1 sm:flex-none group relative bg-red-700 text-white px-6 py-3 rounded-lg font-bold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-red-700/50 transform hover:scale-105"
              >
                <span className="relative z-10">En savoir plus</span>
                <div className="absolute inset-0 bg-red-700/80 -z-0 group-hover:scale-110 transition-transform duration-300"></div>
              </Link>
              <Link
                href="/form"
                className="flex-1 sm:flex-none border-2 border-red-700 text-red-700 px-6 py-3 rounded-lg font-bold hover:bg-red-700/10 transition-all duration-300 backdrop-blur-sm"
              >
                Formulaire
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
