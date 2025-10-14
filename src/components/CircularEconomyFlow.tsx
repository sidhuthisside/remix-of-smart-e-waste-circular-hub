"use client"

import { ArrowRight } from 'lucide-react'

const steps = [
  { emoji: '📦', title: 'Collection', desc: 'Smart pickup & drop-off' },
  { emoji: '🔍', title: 'Segregation', desc: 'AI-powered sorting' },
  { emoji: '♻️', title: 'Recycling', desc: 'Eco-friendly processing' },
  { emoji: '🏭', title: 'Manufacture', desc: 'New product creation' },
  { emoji: '🌱', title: 'Sustainability', desc: 'Circular economy loop' },
]

export default function CircularEconomyFlow() {
  return (
    <section className="py-20 circuit-bg">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">How Our Model Works</h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          A complete circular economy system powered by technology and sustainability
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className="text-center group">
                <div className="w-32 h-32 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-5xl mb-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-glow group-hover:animate-pulse">
                  {step.emoji}
                </div>
                <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden md:block w-8 h-8 text-[#00C853] mx-4 animate-pulse" />
              )}
            </div>
          ))}
        </div>

        {/* Circular Arrow */}
        <div className="flex justify-center mt-12">
          <div className="text-4xl text-[#2196F3] animate-spin-slow">↻</div>
        </div>
      </div>
    </section>
  )
}