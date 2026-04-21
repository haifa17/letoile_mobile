"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqs } from "@/lib/constants";
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
    src: "about1.jpg",
    alt: "LETOILE MOBILE Support",
  },
  {
    src: "about2.jpg",
    alt: "LETOILE MOBILE Réparation",
  },
  {
    src: "about3.jpg",
    alt: "LETOILE MOBILE Garantie",
    title: "Garantie Assurée",
    description: "Pièces certifiées et main-d'œuvre garantie",
  },
  {
    src: "about4.jpg",
    alt: "LETOILE MOBILE Garantie",
  },
  {
    src: "about5.jpg",
    alt: "LETOILE MOBILE Garantie",
  },
];
export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const plugin = useRef(Autoplay({ delay: 1500, stopOnInteraction: true }));

  return (
    <section
      id="faq"
      className="py-20 sm:py-32 bg-gradient-to-b from-background via-secondary/30 to-background relative overflow-hidden"
    >
      {/* Animated Background */}
      <div
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float pointer-events-none"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-12">
          {/* Section Header */}
          <div
            className={`text-center space-y-4 ${isMounted ? "animate-fade-in-up" : "opacity-0"}`}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <HelpCircle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Questions <span className="text-red-500">fréquentes</span>
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Trouvez rapidement les réponses à vos questions les plus
              importantes.
            </p>
          </div>

          {/* FAQ Grid with Image */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: Image */}
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

            {/* Right: FAQ Items */}
            <div
              className={`space-y-3 ${isMounted ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: isMounted ? "0.1s" : "0s" }}
            >
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`border border-border rounded-xl bg-card overflow-hidden hover:border-primary/50 transition-all duration-300 group ${isMounted ? "animate-scale-in" : "opacity-0"}`}
                  style={{
                    animationDelay: isMounted ? `${idx * 0.05}s` : "0s",
                  }}
                >
                  <button
                    onClick={() => setOpenId(openId === idx ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-primary/5 transition-colors duration-300"
                  >
                    <span className="text-lg font-semibold text-foreground text-left group-hover:text-red-500 transition-colors duration-300">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`flex-shrink-0 w-6 h-6 text-red-500 transition-all duration-300 group-hover:scale-110 ${
                        openId === idx
                          ? "rotate-180 text-red-500"
                          : "text-red-500/60 group-hover:text-red-500"
                      }`}
                    />
                  </button>
                  {openId === idx && (
                    <div className="px-6 py-5 border-t border-primary/20 bg-gradient-to-r from-primary/5 to-transparent animate-fade-in-up">
                      <p className="text-foreground/80 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
