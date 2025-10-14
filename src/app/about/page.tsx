"use client"

import Navigation from '@/components/Navigation'
import { Card } from '@/components/ui/card'
import { Recycle, TrendingDown, DollarSign, Cpu, Globe, Zap } from 'lucide-react'

const stats = [
  { icon: Globe, value: '50M+', label: 'Tons of E-Waste Generated Annually', color: '#FF6B35' },
  { icon: TrendingDown, value: '20%', label: 'Properly Recycled Worldwide', color: '#FF4444' },
  { icon: DollarSign, value: '$62.5B', label: 'Worth of Recoverable Materials', color: '#FFD700' },
  { icon: Zap, value: '80%', label: 'Energy Saved Through Recycling', color: '#00C853' },
]

const composition = [
  { material: 'Plastics', percentage: 30, emoji: '🧱' },
  { material: 'Metals (Fe, Cu, Al)', percentage: 35, emoji: '🔩' },
  { material: 'Glass', percentage: 15, emoji: '💎' },
  { material: 'Circuit Boards', percentage: 12, emoji: '💾' },
  { material: 'Precious Metals', percentage: 5, emoji: '🏆' },
  { material: 'Other', percentage: 3, emoji: '📦' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen circuit-bg">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/20 px-4 py-2 rounded-full text-sm font-medium text-[#00C853] mb-6">
              <Recycle className="w-4 h-4" />
              About the Project
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Understanding the <span className="text-gradient-eco">E-Waste Crisis</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Electronic waste is the fastest-growing waste stream globally. Our mission is to transform 
              how we collect, process, and recycle electronic devices through innovative technology.
            </p>
          </div>

          {/* What is E-Waste */}
          <Card className="p-12 mb-12 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">What is E-Waste?</h2>
                <p className="text-muted-foreground mb-6">
                  E-waste refers to discarded electrical and electronic equipment. It includes smartphones, 
                  computers, televisions, refrigerators, and countless other devices that have reached 
                  their end of life.
                </p>
                <p className="text-muted-foreground">
                  These devices contain valuable materials like gold, silver, copper, and rare earth elements, 
                  but also hazardous substances that can harm the environment if not properly managed.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-6 bg-gradient-eco-light rounded-xl">
                  <div className="text-5xl mb-3">📱</div>
                  <div className="font-semibold">Mobile Devices</div>
                </div>
                <div className="text-center p-6 bg-gradient-eco-light rounded-xl">
                  <div className="text-5xl mb-3">💻</div>
                  <div className="font-semibold">Computers</div>
                </div>
                <div className="text-center p-6 bg-gradient-eco-light rounded-xl">
                  <div className="text-5xl mb-3">📺</div>
                  <div className="font-semibold">Televisions</div>
                </div>
                <div className="text-center p-6 bg-gradient-eco-light rounded-xl">
                  <div className="text-5xl mb-3">🔌</div>
                  <div className="font-semibold">Appliances</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Global Impact Stats */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">The Global Impact</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {stats.map((stat, index) => (
                <Card 
                  key={index} 
                  className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <stat.icon 
                    className="w-12 h-12 mx-auto mb-4" 
                    style={{ color: stat.color }}
                  />
                  <div className="text-3xl font-bold mb-2" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>

          {/* E-Waste Composition */}
          <Card className="p-12 mb-12 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">E-Waste Composition</h2>
            <div className="space-y-6">
              {composition.map((item, index) => (
                <div key={index} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.emoji}</span>
                      <span className="font-semibold">{item.material}</span>
                    </div>
                    <span className="text-[#00C853] font-bold">{item.percentage}%</span>
                  </div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-eco transition-all duration-1000"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Environmental Impact */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
            <Card className="p-8 bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800">
              <h3 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">
                ⚠️ Environmental Risks
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Heavy metals like lead and mercury can contaminate soil and water</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Toxic chemicals released during improper disposal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Greenhouse gas emissions from landfills</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Loss of valuable and finite resources</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800">
              <h3 className="text-2xl font-bold mb-4 text-[#00C853]">
                ✓ Benefits of Proper Recycling
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-[#00C853] mt-1">•</span>
                  <span>Recover valuable materials worth billions of dollars</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00C853] mt-1">•</span>
                  <span>Reduce energy consumption by up to 80%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00C853] mt-1">•</span>
                  <span>Prevent environmental contamination</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00C853] mt-1">•</span>
                  <span>Create jobs in the green economy</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Our Solution */}
          <Card className="p-12 max-w-5xl mx-auto gradient-eco text-white">
            <h2 className="text-4xl font-bold mb-6 text-center">Our Solution</h2>
            <p className="text-xl text-center mb-8 opacity-90">
              We leverage cutting-edge technology to make e-waste recycling accessible, 
              efficient, and rewarding for everyone.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Cpu className="w-12 h-12 mx-auto mb-3" />
                <h3 className="font-bold mb-2">AI-Powered Sorting</h3>
                <p className="text-sm opacity-80">
                  Machine learning algorithms identify and categorize materials automatically
                </p>
              </div>
              <div className="text-center">
                <Globe className="w-12 h-12 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Smart Collection Network</h3>
                <p className="text-sm opacity-80">
                  Convenient pickup and drop-off points across cities
                </p>
              </div>
              <div className="text-center">
                <Zap className="w-12 h-12 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Gamified Rewards</h3>
                <p className="text-sm opacity-80">
                  Earn green credits and badges for your contributions
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}