"use client"

import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 gradient-eco opacity-90"></div>
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Join the Movement
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Every Device Recycled Brings Us Closer to a Cleaner Planet
          </h2>

          <p className="text-xl mb-8 text-white/90">
            Be part of the solution. Start your e-waste collection journey today and earn rewards 
            while saving the planet.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/collection">
              <Button size="lg" className="bg-white text-[#00C853] hover:bg-gray-100 text-lg px-8 py-6">
                Book a Pickup
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white/10"
              >
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold mb-1">10K+</div>
              <div className="text-sm text-white/80">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">500+</div>
              <div className="text-sm text-white/80">Collection Points</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">98%</div>
              <div className="text-sm text-white/80">Recycling Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}