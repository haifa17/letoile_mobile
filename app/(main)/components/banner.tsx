'use client'

import { useEffect, useState } from 'react'

export default function Banner() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className={`relative h-32 md:h-48 overflow-hidden bg-gradient-to-r from-foreground via-foreground to-foreground/95 ${isMounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
      {/* Background Image */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(portabilite.jpg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          opacity: 0.9
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20"></div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-4">
        <div className="text-center space-y-2 md:space-y-4">
          <h3 className="text-2xl md:text-4xl font-bold text-white text-balance">
            Fiers partenaires de l'excellence
          </h3>
          <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto">
            Rejoignez une communauté de champions qui choisissent LETOILE MOBILE
          </p>
        </div>
      </div>

      {/* Animated accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-transparent animate-pulse-glow"></div>
    </div>
  )
}
