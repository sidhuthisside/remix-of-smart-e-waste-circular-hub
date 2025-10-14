"use client"

import { useEffect, useState } from 'react'
import { Recycle, DollarSign, Leaf } from 'lucide-react'

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: number
  suffix: string
  prefix?: string
}

function StatCard({ icon, label, value, suffix, prefix = '' }: StatCardProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-glow">
      <div className="flex items-center justify-center mb-4">
        <div className="p-4 bg-gradient-to-br from-[#00C853] to-[#2196F3] rounded-full">
          {icon}
        </div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-gradient-eco mb-2">
          {prefix}{count.toLocaleString()}{suffix}
        </div>
        <div className="text-sm text-muted-foreground font-medium">{label}</div>
      </div>
    </div>
  )
}

export default function StatsCounter() {
  const [statistics, setStatistics] = useState({
    ewasteCollectedKg: 0,
    economicValueInr: 0,
    co2AvoidedTons: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStatistics()
  }, [])

  const fetchStatistics = async () => {
    try {
      const response = await fetch('/api/statistics')
      if (response.ok) {
        const data = await response.json()
        setStatistics({
          ewasteCollectedKg: data.ewasteCollectedKg || 0,
          economicValueInr: data.economicValueInr || 0,
          co2AvoidedTons: data.co2AvoidedTons || 0,
        })
      }
    } catch (error) {
      console.error('Failed to fetch statistics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-eco-light">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#00C853] border-t-transparent"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-eco-light">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Our Global Impact</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Real-time statistics showing the collective power of sustainable e-waste management
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <StatCard
            icon={<Recycle className="w-8 h-8 text-white" />}
            label="E-Waste Collected"
            value={statistics.ewasteCollectedKg}
            suffix=" kg"
          />
          <StatCard
            icon={<DollarSign className="w-8 h-8 text-white" />}
            label="Economic Value Recovered"
            value={statistics.economicValueInr}
            suffix=""
            prefix="₹"
          />
          <StatCard
            icon={<Leaf className="w-8 h-8 text-white" />}
            label="CO₂ Emissions Avoided"
            value={statistics.co2AvoidedTons}
            suffix=" tons"
          />
        </div>
      </div>
    </section>
  )
}