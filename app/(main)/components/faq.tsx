'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { faqs } from '@/lib/constants'

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])



  return (
    <section id="faq" className="py-20 sm:py-32 bg-gradient-to-b from-background via-secondary/30 to-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-12">
          {/* Section Header */}
          <div className={`text-center space-y-4 ${isMounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Questions <span className="text-primary">fréquentes</span>
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Trouvez rapidement les réponses à vos questions les plus importantes.
            </p>
          </div>

          {/* FAQ Grid with Image */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: Image */}
            <div className={`relative hidden md:block ${isMounted ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/30 border-2 border-primary/20 sticky top-24">
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/488895965_1066705428826821_5802871951311899715_n-3N9LRYjXhEjIv4TxuWo8uEuj9h8hCW.jpg"
                  alt="LETOILE MOBILE Support"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent text-white">
                  <p className="font-bold text-lg">Support 24/7</p>
                  <p className="text-sm text-white/80">Nous sommes toujours là pour vous aider</p>
                </div>
              </div>
            </div>

            {/* Right: FAQ Items */}
            <div className={`space-y-3 ${isMounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: isMounted ? '0.1s' : '0s'}}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`border border-border rounded-xl bg-card overflow-hidden hover:border-primary/50 transition-all duration-300 group ${isMounted ? 'animate-scale-in' : 'opacity-0'}`}
                style={{animationDelay: isMounted ? `${idx * 0.05}s` : '0s'}}
              >
                <button
                  onClick={() => setOpenId(openId === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-primary/5 transition-colors duration-300"
                >
                  <span className="text-lg font-semibold text-foreground text-left group-hover:text-primary transition-colors duration-300">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 w-6 h-6 text-primary transition-all duration-300 group-hover:scale-110 ${
                      openId === idx ? 'rotate-180 text-primary' : 'text-primary/60 group-hover:text-primary'
                    }`}
                  />
                </button>
                {openId === idx && (
                  <div className="px-6 py-5 border-t border-primary/20 bg-gradient-to-r from-primary/5 to-transparent animate-fade-in-up">
                    <p className="text-foreground/80 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className={`text-center space-y-6 pt-12 border-t border-border/50 ${isMounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: isMounted ? '0.3s' : '0s'}}>
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Besoin d&apos;aide supplémentaire ?
              </h3>
              <p className="text-foreground/70">Notre équipe est prête à vous aider 24 heures sur 24, 7 jours sur 7.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group relative w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 transform hover:scale-105">
                <span className="relative z-10">Contacter le support</span>
                <div className="absolute inset-0 bg-primary/50 -z-0 group-hover:scale-110 transition-transform duration-300"></div>
              </button>
              <p className="text-sm text-foreground/60">
                💬 Chat disponible en direct
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
