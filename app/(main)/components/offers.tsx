"use client";

import { useState, useEffect } from "react";
import { Zap, Users, Trophy } from "lucide-react";
import { routerServerGlobal } from "next/dist/server/lib/router-utils/router-server-context";
import { useRouter } from "next/navigation";

export default function Offers() {
  const [activeTab, setActiveTab] = useState("voice");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const router = useRouter();
  const offers = [
    {
      id: "voice",
      title: "Offre voix & data",
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      image: "offer.jpg",
      items: [
        {
          name: "LETOILE 35mil",
          description:
            "Tarifs avantageux vers tous opérateurs et 900 Mo de bonus.",
          price: "35 DT/mois",
          features: [
            "Appels illimités",
            "900 Mo data",
            "SMS illimités",
            "Roaming inclus",
          ],
          cta: "En savoir plus",
        },
      ],
    },
    {
      id: "privileges",
      title: "Avantages exclusifs",
      icon: Users,
      color: "from-red-500 to-pink-500",
      image: "offer2.jpg",
      items: [
        {
          name: "LETOILE Privilèges",
          description:
            "Des avantages exclusifs pour les supporters et abonnés.",
          price: "Gratuit",
          features: [
            "Accès VIP",
            "Réductions partenaires",
            "Points de fidélité",
            "Offres spéciales",
          ],
          cta: "Découvrir",
        },
      ],
    },
    {
      id: "games",
      title: "Jeux & Concours",
      icon: Trophy,
      color: "from-yellow-500 to-orange-500",
      image: "offer3.jpg",
      items: [
        {
          name: "Play & Win",
          description:
            "Participez à des jeux et tentez votre chance à des lots prestigieux.",
          price: "Gratuit",
          features: [
            "Jeux quotidiens",
            "Lots à gagner",
            "Bonus points",
            "Tirage mensuel",
          ],
          cta: "Participer",
        },
      ],
    },
  ];

  const currentOffer = offers.find((o) => o.id === activeTab);

  return (
    <section
      id="offres"
      className="py-20 sm:py-32 bg-gradient-to-b from-secondary to-background relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "3s" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-16">
          {/* Section Header */}
          <div
            className={`text-center space-y-4 ${isMounted ? "animate-fade-in-up" : "opacity-0"}`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Nos{" "}
              <span className="bg-gradient-to-r from-red-500 to-red-500/80 bg-clip-text text-transparent">
                Offres
              </span>{" "}
              Exceptionnelles
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Découvrez des offres taillées pour vous avec des avantages
              incomparables.
            </p>
          </div>

          {/* Tabs */}
          <div
            className={`flex flex-wrap justify-center gap-3 ${isMounted ? "animate-scale-in" : "opacity-0"}`}
          >
            {offers.map((offer, idx) => {
              const Icon = offer.icon;
              return (
                <button
                  key={offer.id}
                  onClick={() => setActiveTab(offer.id)}
                  className={`flex  items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 transform ${
                    activeTab === offer.id
                      ? "bg-gradient-to-r from-red-500 to-red-500/80 text-white shadow-lg shadow-red-500/50 scale-105"
                      : "bg-background border-2 border-border text-foreground hover:border-red-500 hover:bg-red-500/5"
                  }`}
                >
                  <Icon size={20} />
                  {offer.title}
                </button>
              );
            })}
          </div>

          {/* Offers Grid */}
          {currentOffer && (
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Image Section */}
              <div
                className={`relative block ${isMounted ? "animate-slide-in-left" : "opacity-0"}`}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/30 border-2 border-primary/20">
                  <img
                    src={currentOffer.image}
                    alt={currentOffer.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>

              {/* Content Section */}
              <div
                className={`space-y-8 ${isMounted ? "animate-slide-in-right" : "opacity-0"}`}
              >
                {currentOffer.items.map((item, idx) => (
                  <div key={idx} className="space-y-6 group">
                    <div className="space-y-4">
                      <h3 className="text-3xl md:text-4xl font-bold text-foreground group-hover:text-red-500 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-lg text-foreground/70 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="text-4xl font-bold bg-gradient-to-r from-red-500 to-red-500/80 bg-clip-text text-transparent">
                        {item.price}
                      </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {item.features.map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
                        >
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span className="text-sm font-medium text-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => router.push("/form")}
                      className="w-full group/btn relative bg-gradient-to-r from-red-500 to-red-500/80 text-white px-8 py-4 rounded-lg font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 transform hover:scale-105"
                    >
                      <span className="relative z-10">{item.cta}</span>
                      <div className="absolute inset-0 bg-red-500/50 -z-0 group-hover/btn:scale-110 transition-transform duration-300"></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
