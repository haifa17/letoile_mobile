'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { portability_steps } from '@/lib/constants'

export default function Portability() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section id="portabilite" className="py-20 sm:py-32 bg-gradient-to-b from-background via-background to-secondary relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-16">
          {/* Section Header */}
          <div className={`space-y-4 ${isMounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Portabilité — <span className="text-primary">gardez votre numéro</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl leading-relaxed">
              Changez pour LETOILE MOBILE en conservant votre numéro (RIO requis). Le processus est simple, rapide et sécurisé.
            </p>
          </div>

          {/* Steps with Image */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Steps with Connecting Line */}
            <div className="relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-primary/0"></div>

              <div className="grid gap-8">
                {portability_steps.map((step, idx) => (
                  <div 
                    key={step.number} 
                    className={`space-y-6 group ${isMounted ? 'animate-fade-in-up' : 'opacity-0'}`}
                    style={{animationDelay: isMounted ? `${idx * 0.2}s` : '0s'}}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-4xl font-bold shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
                        {step.number}
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{step.title}</h3>
                        <p className="text-foreground/70 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                    
                    {/* Animated checkmark for completed steps (visual enhancement) */}
                    <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all duration-300">
                      <CheckCircle2 size={20} className="group-hover:scale-125 transition-transform" />
                      <span className="text-sm font-medium">Étape {step.number}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image */}
            <div className={`relative hidden md:block ${isMounted ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/30 border-2 border-primary/20">
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/488895965_1066705428826821_5802871951311899715_n-3N9LRYjXhEjIv4TxuWo8uEuj9h8hCW.jpg"
                  alt="LETOILE MOBILE Portability"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>

          {/* CTA and Info */}
          <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 bg-gradient-to-r from-primary/10 to-primary/5 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 hover:border-primary/40 transition-all duration-300 ${isMounted ? 'animate-scale-in' : 'opacity-0'}`}>
            <div className="space-y-2">
              <p className="text-foreground/80 font-medium">
                ⚡ Une courte interruption peut survenir le jour du transfert.
              </p>
              <p className="text-sm text-foreground/60">
                Nous gérons tout pour vous. Support 24/7 disponible.
              </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none group relative bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 transform hover:scale-105">
                <span className="relative z-10">En savoir plus</span>
                <div className="absolute inset-0 bg-primary/80 -z-0 group-hover:scale-110 transition-transform duration-300"></div>
              </button>
               <Link  href="/form" className="flex-1 sm:flex-none border-2 border-primary text-primary px-6 py-3 rounded-lg font-bold hover:bg-primary/10 transition-all duration-300 backdrop-blur-sm">
                Formulaire
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
