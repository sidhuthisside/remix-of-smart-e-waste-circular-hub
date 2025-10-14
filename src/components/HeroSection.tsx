"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden circuit-bg">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00C853] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-[#2196F3] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-[#00C853] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute text-6xl opacity-10 ${mounted ? 'animate-float' : ''}`}
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            📱
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/20 px-4 py-2 rounded-full text-sm font-medium text-[#00C853] mb-4">
            <Sparkles className="w-4 h-4" />
            Powering the Circular Economy
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-gradient-eco">Turning Tech Trash</span>
            <br />
            <span className="text-foreground">into Tomorrow's Treasure</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Join the revolution in E-Waste Management. Our smart collection system combines AI, automation, 
            and community action to create a sustainable future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/collection">
              <Button size="lg" className="gradient-eco text-white text-lg px-8 py-6">
                Start Simulation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-[#00C853] text-[#00C853] hover:bg-green-50">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Animated Device Recycling Illustration */}
          <div className="mt-16 relative">
            <div className="flex justify-center items-center gap-8">
              <div className="text-6xl animate-float">💻</div>
              <div className="text-4xl text-[#00C853]">→</div>
              <div className="text-6xl animate-float" style={{ animationDelay: '0.5s' }}>♻️</div>
              <div className="text-4xl text-[#2196F3]">→</div>
              <div className="text-6xl animate-float" style={{ animationDelay: '1s' }}>🌱</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#00C853] rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[#00C853] rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}