"use client"

import Navigation from '@/components/Navigation'
import { Card } from '@/components/ui/card'
import { Droplet, Flame, Wrench, Brain, Cpu, Zap } from 'lucide-react'

const techniques = [
  {
    name: 'Hydrometallurgy',
    icon: Droplet,
    color: '#2196F3',
    description: 'Water-based chemical process to extract precious metals',
    details: [
      'Uses aqueous chemistry to recover metals',
      'Lower energy consumption than pyrometallurgy',
      'Recovers gold, silver, copper, and rare earth elements',
      'Environmentally friendly with proper waste treatment'
    ],
    efficiency: 85
  },
  {
    name: 'Pyrometallurgy',
    icon: Flame,
    color: '#FF6B35',
    description: 'High-temperature thermal processing for metal extraction',
    details: [
      'Uses heat to separate and purify metals',
      'Effective for large-scale operations',
      'Processes complex material mixtures',
      'Requires advanced emission controls'
    ],
    efficiency: 75
  },
  {
    name: 'Mechanical Processing',
    icon: Wrench,
    color: '#708090',
    description: 'Physical separation of components through disassembly',
    details: [
      'Manual and automated dismantling',
      'Separates materials by physical properties',
      'First step in most recycling processes',
      'Preserves valuable components for reuse'
    ],
    efficiency: 90
  }
]

const aiFeatures = [
  {
    icon: Brain,
    title: 'Computer Vision',
    description: 'AI-powered image recognition identifies device types and conditions instantly',
    color: '#9C27B0'
  },
  {
    icon: Cpu,
    title: 'Smart Sorting',
    description: 'Machine learning algorithms categorize materials with 98% accuracy',
    color: '#00C853'
  },
  {
    icon: Zap,
    title: 'Predictive Analytics',
    description: 'Forecasts material yields and optimizes recycling processes',
    color: '#FFD700'
  }
]

export default function TechniquesPage() {
  return (
    <main className="min-h-screen circuit-bg">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient-eco">Recycling Techniques</span>
              <br />& Innovations
            </h1>
            <p className="text-xl text-muted-foreground">
              Advanced eco-friendly methods combining traditional recycling with cutting-edge AI technology
            </p>
          </div>

          {/* Main Recycling Techniques */}
          <div className="space-y-8 mb-20 max-w-6xl mx-auto">
            {techniques.map((technique, index) => (
              <Card 
                key={index}
                className="p-8 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="text-center md:text-left">
                    <div 
                      className="w-24 h-24 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4 animate-pulse"
                      style={{ backgroundColor: `${technique.color}20` }}
                    >
                      <technique.icon 
                        className="w-12 h-12" 
                        style={{ color: technique.color }}
                      />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{technique.name}</h3>
                    <p className="text-muted-foreground text-sm">{technique.description}</p>
                    
                    <div className="mt-6">
                      <div className="text-sm text-muted-foreground mb-2">Efficiency Rate</div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{ 
                              width: `${technique.efficiency}%`,
                              backgroundColor: technique.color
                            }}
                          />
                        </div>
                        <span className="font-bold" style={{ color: technique.color }}>
                          {technique.efficiency}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <h4 className="font-bold mb-4 text-lg">Key Features:</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {technique.details.map((detail, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div 
                            className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: technique.color }}
                          />
                          <p className="text-sm text-muted-foreground">{detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* AI & Automation Section */}
          <div className="mb-16 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                AI & Automation in <span className="text-gradient-eco">E-Waste Sorting</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Artificial intelligence revolutionizes how we identify, sort, and process electronic waste
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {aiFeatures.map((feature, index) => (
                <Card 
                  key={index}
                  className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse"
                    style={{ backgroundColor: `${feature.color}20`, animationDelay: `${index * 0.2}s` }}
                  >
                    <feature.icon 
                      className="w-10 h-10"
                      style={{ color: feature.color }}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Robotic Processing Visualization */}
          <Card className="p-12 max-w-5xl mx-auto gradient-eco text-white">
            <h2 className="text-3xl font-bold mb-8 text-center">Automated Processing Flow</h2>
            
            <div className="grid md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 text-3xl animate-pulse">
                  📦
                </div>
                <div className="font-semibold mb-1">Intake</div>
                <div className="text-xs opacity-80">Device Collection</div>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 text-3xl animate-pulse" style={{ animationDelay: '0.2s' }}>
                  🤖
                </div>
                <div className="font-semibold mb-1">AI Scan</div>
                <div className="text-xs opacity-80">Identification</div>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 text-3xl animate-pulse" style={{ animationDelay: '0.4s' }}>
                  🔧
                </div>
                <div className="font-semibold mb-1">Dismantle</div>
                <div className="text-xs opacity-80">Component Separation</div>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 text-3xl animate-pulse" style={{ animationDelay: '0.6s' }}>
                  🔍
                </div>
                <div className="font-semibold mb-1">Sort</div>
                <div className="text-xs opacity-80">Material Categorization</div>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 text-3xl animate-pulse" style={{ animationDelay: '0.8s' }}>
                  ♻️
                </div>
                <div className="font-semibold mb-1">Process</div>
                <div className="text-xs opacity-80">Material Recovery</div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">98%</div>
                <div className="text-sm opacity-80">Sorting Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">10x</div>
                <div className="text-sm opacity-80">Faster Processing</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">70%</div>
                <div className="text-sm opacity-80">Cost Reduction</div>
              </div>
            </div>
          </Card>

          {/* Circuit Board Extraction */}
          <div className="mt-16 max-w-6xl mx-auto">
            <Card className="p-12">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Component Extraction Process
              </h2>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-gradient-eco-light rounded-xl">
                  <div className="text-5xl mb-4">💾</div>
                  <h4 className="font-bold mb-2">Memory Chips</h4>
                  <p className="text-xs text-muted-foreground">Extracted for refurbishment or precious metal recovery</p>
                </div>

                <div className="text-center p-6 bg-gradient-eco-light rounded-xl">
                  <div className="text-5xl mb-4">🔋</div>
                  <h4 className="font-bold mb-2">Batteries</h4>
                  <p className="text-xs text-muted-foreground">Separated for specialized lithium recovery</p>
                </div>

                <div className="text-center p-6 bg-gradient-eco-light rounded-xl">
                  <div className="text-5xl mb-4">📡</div>
                  <h4 className="font-bold mb-2">Circuit Boards</h4>
                  <p className="text-xs text-muted-foreground">Processed for copper and gold extraction</p>
                </div>

                <div className="text-center p-6 bg-gradient-eco-light rounded-xl">
                  <div className="text-5xl mb-4">🖥️</div>
                  <h4 className="font-bold mb-2">Displays</h4>
                  <p className="text-xs text-muted-foreground">Glass and LCD separation for recycling</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}