"use client"

import Navigation from '@/components/Navigation'
import { Card } from '@/components/ui/card'
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

const leaderboardData = [
  { rank: 1, name: 'Rajesh Kumar', points: 5420, items: 54, badge: '🏆' },
  { rank: 2, name: 'Priya Sharma', points: 4850, items: 48, badge: '🥈' },
  { rank: 3, name: 'Amit Patel', points: 4320, items: 43, badge: '🥉' },
  { rank: 4, name: 'Sneha Desai', points: 3890, items: 39, badge: '⭐' },
  { rank: 5, name: 'Vikram Singh', points: 3560, items: 35, badge: '⭐' },
]

const materialData = [
  { name: 'Copper', percentage: 25, color: '#FF6B35' },
  { name: 'Aluminum', percentage: 20, color: '#C0C0C0' },
  { name: 'Plastic', percentage: 30, color: '#4ECDC4' },
  { name: 'Gold', percentage: 5, color: '#FFD700' },
  { name: 'Steel', percentage: 15, color: '#708090' },
  { name: 'Other', percentage: 5, color: '#95A5A6' },
]

const monthlyData = [
  { month: 'Jan', collected: 3200 },
  { month: 'Feb', collected: 4100 },
  { month: 'Mar', collected: 3800 },
  { month: 'Apr', collected: 5200 },
  { month: 'May', collected: 6100 },
  { month: 'Jun', collected: 7300 },
]

export default function DashboardPage() {
  const maxCollected = Math.max(...monthlyData.map(d => d.collected))

  return (
    <main className="min-h-screen circuit-bg">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              <span className="text-gradient-eco">Circular Economy</span> Dashboard
            </h1>
            <p className="text-xl text-muted-foreground">
              Real-time insights into our global sustainability impact
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Material Recovery Composition */}
            <Card className="p-8 lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-[#00C853]" />
                Material Recovery Composition
              </h2>

              <div className="space-y-6">
                {materialData.map(material => (
                  <div key={material.name} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{material.name}</span>
                      <span className="text-muted-foreground">{material.percentage}%</span>
                    </div>
                    <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full rounded-full transition-all duration-500 group-hover:opacity-80"
                        style={{
                          width: `${material.percentage}%`,
                          backgroundColor: material.color
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Circular Flow Visualization */}
              <div className="mt-12 p-6 bg-gradient-eco-light rounded-xl">
                <h3 className="font-bold text-center mb-6">Circular Flow Model</h3>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg animate-pulse">
                      🗑️
                    </div>
                    <p className="text-xs mt-2 font-medium">Waste</p>
                  </div>
                  <div className="text-2xl text-[#00C853]">→</div>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }}>
                      ♻️
                    </div>
                    <p className="text-xs mt-2 font-medium">Recycle</p>
                  </div>
                  <div className="text-2xl text-[#2196F3]">→</div>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg animate-pulse" style={{ animationDelay: '1s' }}>
                      🔄
                    </div>
                    <p className="text-xs mt-2 font-medium">Reuse</p>
                  </div>
                  <div className="text-2xl text-[#00C853]">→</div>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg animate-pulse" style={{ animationDelay: '1.5s' }}>
                      🏭
                    </div>
                    <p className="text-xs mt-2 font-medium">Manufacture</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Leaderboard */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-[#FFD700]" />
                Top Contributors
              </h2>

              <div className="space-y-4">
                {leaderboardData.map(user => (
                  <div
                    key={user.rank}
                    className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                      user.rank === 1 ? 'border-[#FFD700] bg-yellow-50 dark:bg-yellow-900/10' :
                      user.rank === 2 ? 'border-gray-400 bg-gray-50 dark:bg-gray-800/20' :
                      user.rank === 3 ? 'border-[#CD7F32] bg-orange-50 dark:bg-orange-900/10' :
                      'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{user.badge}</div>
                      <div className="flex-1">
                        <div className="font-bold">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.items} items recycled
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-[#00C853]">
                          {user.points}
                        </div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Badges */}
              <div className="mt-8 p-6 bg-gradient-eco-light rounded-lg">
                <h3 className="font-bold mb-4 text-center">Achievement Badges</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🌱</div>
                    <div className="text-xs font-medium">Eco Starter</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">🌳</div>
                    <div className="text-xs font-medium">Green Hero</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">🏆</div>
                    <div className="text-xs font-medium">Eco Champion</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* E-Waste Collected Over Time */}
          <Card className="p-8 mt-8 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">E-Waste Collected Over Time (kg)</h2>
            
            <div className="h-64 flex items-end gap-4">
              {monthlyData.map(data => (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative w-full group">
                    <div
                      className="w-full bg-gradient-to-t from-[#00C853] to-[#2196F3] rounded-t-lg transition-all duration-500 hover:opacity-80"
                      style={{ height: `${(data.collected / maxCollected) * 200}px` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs px-2 py-1 rounded">
                        {data.collected} kg
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-medium">{data.month}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}