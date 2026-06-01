'use client'

import React, { useEffect, useState } from 'react'

export function Background() {
  const [scrollIntensity, setScrollIntensity] = useState(1)

  useEffect(() => {
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const delta = Math.abs(currentScrollY - lastScrollY)
      const intensity = Math.min(2.5, 1 + delta / 10)
      setScrollIntensity(intensity)
      lastScrollY = currentScrollY
      
      // Gradually reset intensity
      setTimeout(() => setScrollIntensity(prev => Math.max(1, prev - 0.1)), 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    const handleOverdrive = (e: any) => {
      setScrollIntensity(3) // Absolute max
      setTimeout(() => setScrollIntensity(1), e.detail?.duration || 2000)
    }

    window.addEventListener('certus-overdrive', handleOverdrive)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('certus-overdrive', handleOverdrive)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#000804]">
      {/* Layer 1: Deep Static/Slow Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] grid-bg" 
        style={{ transform: `scale(${1 + (scrollIntensity - 1) * 0.05})` }}
      />

      {/* Layer 2: Deep Circuits (Slower/Back) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <pattern id="circuit-pattern-1" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          <path
            d="M 10 100 L 50 100 L 70 80 L 120 80 L 140 100 L 190 100"
            fill="none"
            stroke="#10b981"
            strokeWidth="1"
            className="animate-circuit"
            style={{ animationDuration: '40s' }}
          />
          {/* Energy Bolt (Deep) */}
          <path
            d="M 10 100 L 50 100 L 70 80 L 120 80 L 140 100 L 190 100"
            fill="none"
            stroke="#10b981"
            strokeWidth="1.5"
            strokeDasharray="40 1000"
            className="animate-energy energy-bolt"
            style={{ animationDuration: `${6 / scrollIntensity}s` }}
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#circuit-pattern-1)" />
      </svg>

      {/* Layer 3: Active Pulsing Circuits (Medium) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <pattern id="circuit-pattern-2" x="50" y="50" width="300" height="300" patternUnits="userSpaceOnUse">
          <circle cx="150" cy="150" r="2" fill="#10b981" className="animate-pulse" style={{ animationDuration: '4s' }} />
          <path
            d="M 150 150 L 200 150 L 220 170 L 280 170"
            fill="none"
            stroke="#10b981"
            strokeWidth="1.5"
            className="animate-circuit"
            style={{ animationDuration: '25s' }}
          />
          {/* Energy Bolt (Medium) */}
          <path
            d="M 150 150 L 200 150 L 220 170 L 280 170"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            strokeDasharray="80 1000"
            className="animate-energy energy-bolt"
            style={{ animationDuration: `${4 / scrollIntensity}s`, animationDelay: '1s' }}
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#circuit-pattern-2)" />
      </svg>

      {/* Layer 4: High-Velocity Energy Beams (Front/Fast) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.1]" xmlns="http://www.w3.org/2000/svg">
        <pattern id="circuit-pattern-3" x="100" y="100" width="400" height="400" patternUnits="userSpaceOnUse">
           <path
            d="M 0 200 L 100 200 L 130 230 L 300 230 L 330 200 L 400 200"
            fill="none"
            stroke="#34d399"
            strokeWidth="2"
            strokeDasharray="120 1000"
            className="animate-energy energy-bolt"
            style={{ animationDuration: `${2.5 / scrollIntensity}s`, animationDelay: '0.5s' }}
          />
          <circle cx="130" cy="230" r="1.5" fill="#10b981" className="animate-pulse" />
          <circle cx="300" cy="230" r="1.5" fill="#10b981" className="animate-pulse" style={{ animationDelay: '1.2s' }} />
        </pattern>
        <rect width="100%" height="100%" fill="url(#circuit-pattern-3)" />
      </svg>

      {/* Layer 5: Sovereign Brain Pulse (Radial Glows) */}
      <div 
        className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-emerald-900/10 rounded-full blur-[120px] animate-brain-pulse" 
        style={{ opacity: 0.1 * scrollIntensity }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] bg-emerald-950/10 rounded-full blur-[100px] animate-brain-pulse" 
        style={{ animationDelay: '-5s', opacity: 0.1 * scrollIntensity }}
      />

      {/* Vignette Shading */}
      <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_150px_rgba(0,8,4,1)]" />
    </div>
  )
}
