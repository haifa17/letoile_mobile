'use client'

import { useEffect, useState } from 'react'
import { Star, Award, Users, Zap } from 'lucide-react'

export default function Trust() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{animationDelay: '2.5s'}}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-16">
          {/* Main Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Images Grid */}
            <div className={`grid grid-cols-2 gap-4 ${isMounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
              {/* Player Salute Image - Tall */}
              <div className="relative rounded-xl overflow-hidden shadow-lg border border-primary/20 group cursor-pointer row-span-2">
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/653710168_1349515497212478_5257913358146839583_n-nGu1fKz1ujZZ1jxCQDZ0N3IhtYSisG.jpg"
                  alt="LETOILE MOBILE Athlete"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/60 transition-all duration-300"></div>
              </div>

              {/* Jersey Detail Image */}
              <div className="relative rounded-xl overflow-hidden shadow-lg border border-primary/20 group cursor-pointer">
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/651897010_1344824464348248_8427251687501644701_n-Csv0mZjqvggzauOwufekDIPL9lmgZt.jpg"
                  alt="LETOILE MOBILE Jersey Detail"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/60 transition-all duration-300"></div>
              </div>

              {/* Made In Detail */}
              <div className="relative rounded-xl overflow-hidden shadow-lg border border-primary/20 group cursor-pointer">
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/660331054_1362375729259788_886290839948961570_n-JTC3L22CQ6kHdzzwMUa9pFrqBeqVHk.jpg"
                  alt="LETOILE MOBILE Quality"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/60 transition-all duration-300"></div>
              </div>
            </div>

            {/* Right: Trust Content */}
            <div className={`space-y-8 ${isMounted ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-primary" />
                  <span className="text-sm font-bold text-primary uppercase tracking-wider">Partenariat Stratégique</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
                  Fiers partenaires de <span className="text-primary">l'Étoile du Sahel</span>
                </h2>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  LETOILE MOBILE s'associe avec les plus grands noms du sport tunisien pour vous offrir une expérience mobile exceptionnelle, remplie d'énergie et de passion.
                </p>
              </div>

              {/* Trust Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className={`group p-4 rounded-xl bg-primary/10 border border-primary/20 hover:border-primary/50 hover:bg-primary/15 transition-all duration-300 ${isMounted ? 'animate-scale-in' : 'opacity-0'}`} style={{animationDelay: isMounted ? '0.1s' : '0s'}}>
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-2xl font-bold text-foreground">100K+</span>
                  </div>
                  <p className="text-sm text-foreground/70">Utilisateurs heureux</p>
                </div>

                <div className={`group p-4 rounded-xl bg-primary/10 border border-primary/20 hover:border-primary/50 hover:bg-primary/15 transition-all duration-300 ${isMounted ? 'animate-scale-in' : 'opacity-0'}`} style={{animationDelay: isMounted ? '0.2s' : '0s'}}>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-2xl font-bold text-foreground">24/7</span>
                  </div>
                  <p className="text-sm text-foreground/70">Support disponible</p>
                </div>

                <div className={`group p-4 rounded-xl bg-primary/10 border border-primary/20 hover:border-primary/50 hover:bg-primary/15 transition-all duration-300 ${isMounted ? 'animate-scale-in' : 'opacity-0'}`} style={{animationDelay: isMounted ? '0.3s' : '0s'}}>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-2xl font-bold text-foreground">5G</span>
                  </div>
                  <p className="text-sm text-foreground/70">Technologie</p>
                </div>

                <div className={`group p-4 rounded-xl bg-primary/10 border border-primary/20 hover:border-primary/50 hover:bg-primary/15 transition-all duration-300 ${isMounted ? 'animate-scale-in' : 'opacity-0'}`} style={{animationDelay: isMounted ? '0.4s' : '0s'}}>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-2xl font-bold text-foreground">4.9/5</span>
                  </div>
                  <p className="text-sm text-foreground/70">Note clients</p>
                </div>
              </div>

              <button className="group relative w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 transform hover:scale-105">
                <span className="relative z-10">Rejoignez la communauté</span>
                <div className="absolute inset-0 bg-primary/50 -z-0 group-hover:scale-110 transition-transform duration-300"></div>
              </button>
            </div>
          </div>

          {/* Jersey Detail Banner */}
          <div className={`relative rounded-2xl overflow-hidden border-2 border-primary/20 ${isMounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: isMounted ? '0.2s' : '0s'}}>
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-72 md:h-96 overflow-hidden">
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/653708057_1349515543879140_1608780874247187604_n-ObzDfrqXIrj8SWQLnxJXsiY5XZX7GO.jpg"
                  alt="LETOILE MOBILE Athlete"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 bg-gradient-to-br from-primary/10 to-background flex flex-col justify-center space-y-6">
                <div className="space-y-2">
                  <p className="text-sm font-bold text-primary uppercase tracking-wider">Excellence & Prestige</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    Une alliance de champions
                  </h3>
                </div>
                <p className="text-foreground/70 leading-relaxed">
                  Depuis 1925, l'Étoile du Sahel incarne l'excellence sportive. Chez LETOILE MOBILE, nous partageons les mêmes valeurs : passion, détermination et qualité. Ensemble, nous créons une expérience mobile incomparable.
                </p>
                <div className="flex gap-3">
                  <div className="w-1 h-12 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                  <div>
                    <p className="font-bold text-foreground">Vision commune</p>
                    <p className="text-sm text-foreground/70">Innovation et excellence pour tous</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
