"use client"

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MapPin, Smartphone, Laptop, Tv, Package, Sparkles, TrendingUp, Loader2 } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'

const eWasteTypes = [
  { value: 'smartphone', label: 'Smartphone', icon: '📱', yield: 85 },
  { value: 'laptop', label: 'Laptop', icon: '💻', yield: 92 },
  { value: 'tv', label: 'Television', icon: '📺', yield: 78 },
  { value: 'tablet', label: 'Tablet', icon: '📱', yield: 80 },
  { value: 'desktop', label: 'Desktop PC', icon: '🖥️', yield: 88 },
]

const collectionPoints = [
  { id: 1, name: 'PCCoE Campus Hub', distance: '0.5 km', address: 'PCCOE, Pune' },
  { id: 2, name: 'Akurdi Collection Center', distance: '2.1 km', address: 'Akurdi, Pune' },
  { id: 3, name: 'Pimpri Eco Point', distance: '3.5 km', address: 'Pimpri, Pune' },
]

export default function CollectionPage() {
  const [selectedType, setSelectedType] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [simulationStarted, setSimulationStarted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState('idle')
  const [isBooking, setIsBooking] = useState(false)
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    preferredDate: '',
  })

  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    })
  }

  const handleBookPickup = async () => {
    if (!selectedType || !bookingData.name || !bookingData.email || !bookingData.phone || !bookingData.address || !bookingData.preferredDate) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsBooking(true)

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_name: bookingData.name,
          email: bookingData.email,
          phone: bookingData.phone,
          address: bookingData.address,
          device_type: selectedType,
          device_count: quantity,
          preferred_date: bookingData.preferredDate,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to book pickup')
      }

      toast.success('Pickup booked successfully! We\'ll contact you soon.')
      
      // Reset form
      setBookingData({
        name: '',
        email: '',
        phone: '',
        address: '',
        preferredDate: '',
      })
      setSelectedType('')
      setQuantity(1)
      
      // Start simulation after successful booking
      startSimulation()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to book pickup. Please try again.')
    } finally {
      setIsBooking(false)
    }
  }

  const startSimulation = () => {
    setSimulationStarted(true)
    setStage('collected')
    setProgress(0)

    setTimeout(() => {
      setProgress(33)
      setStage('sorted')
    }, 1500)

    setTimeout(() => {
      setProgress(66)
      setStage('recycled')
    }, 3000)

    setTimeout(() => {
      setProgress(100)
      setStage('completed')
    }, 4500)
  }

  const selectedDevice = eWasteTypes.find(t => t.value === selectedType)
  const predictedYield = selectedDevice ? selectedDevice.yield * quantity : 0

  return (
    <main className="min-h-screen circuit-bg">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              <span className="text-gradient-eco">Smart Collection</span> Dashboard
            </h1>
            <p className="text-xl text-muted-foreground">
              Book a pickup or simulate your e-waste recycling journey
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Booking Form */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Package className="w-6 h-6 text-[#00C853]" />
                Book E-Waste Pickup
              </h2>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="device-type">Device Type *</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger id="device-type">
                      <SelectValue placeholder="Select device type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eWasteTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.icon} {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    disabled={isBooking}
                  />
                </div>

                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input 
                    id="name" 
                    name="name"
                    placeholder="Enter your name"
                    value={bookingData.name}
                    onChange={handleBookingChange}
                    disabled={isBooking}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={bookingData.email}
                    onChange={handleBookingChange}
                    disabled={isBooking}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input 
                    id="phone" 
                    name="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={bookingData.phone}
                    onChange={handleBookingChange}
                    disabled={isBooking}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Pickup Address *</Label>
                  <Input 
                    id="address" 
                    name="address"
                    placeholder="Enter pickup address"
                    value={bookingData.address}
                    onChange={handleBookingChange}
                    disabled={isBooking}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="preferredDate">Preferred Pickup Date *</Label>
                  <Input 
                    id="preferredDate" 
                    name="preferredDate"
                    type="date"
                    value={bookingData.preferredDate}
                    onChange={handleBookingChange}
                    disabled={isBooking}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <Button 
                  className="w-full gradient-eco text-white"
                  onClick={handleBookPickup}
                  disabled={isBooking || !selectedType}
                >
                  {isBooking ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Booking Pickup...
                    </>
                  ) : (
                    <>
                      <Package className="w-4 h-4 mr-2" />
                      Book Pickup & Start Simulation
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* AI Prediction Panel */}
            <div className="space-y-6">
              <Card className="p-8 gradient-eco text-white">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  AI Prediction Panel
                </h2>
                <p className="mb-6">Smart analytics for your e-waste contribution</p>

                {selectedType ? (
                  <div className="space-y-4">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                      <div className="text-sm mb-1">Recyclable Material Yield</div>
                      <div className="text-4xl font-bold">{predictedYield}%</div>
                    </div>

                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                      <div className="text-sm mb-1">Estimated Recovery Value</div>
                      <div className="text-3xl font-bold">₹{(quantity * 150).toLocaleString()}</div>
                    </div>

                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                      <div className="text-sm mb-1">CO₂ Emissions Saved</div>
                      <div className="text-3xl font-bold">{(quantity * 2.5).toFixed(1)} kg</div>
                    </div>

                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                      <div className="text-sm mb-1">Green Credits Earned</div>
                      <div className="text-3xl font-bold">{quantity * 100} points</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="opacity-80">Select a device type to see predictions</p>
                  </div>
                )}
              </Card>

              {/* Simulation Progress */}
              {simulationStarted && (
                <Card className="p-8 animate-glow">
                  <h3 className="text-xl font-bold mb-4">Recycling Journey</h3>
                  
                  <Progress value={progress} className="mb-6" />

                  <div className="space-y-4">
                    <div className={`flex items-center gap-3 ${stage === 'collected' || progress > 0 ? 'text-[#00C853]' : 'text-muted-foreground'}`}>
                      <div className="w-8 h-8 rounded-full bg-current/20 flex items-center justify-center">
                        {progress > 0 ? '✓' : '1'}
                      </div>
                      <div className="font-medium">Collected</div>
                    </div>

                    <div className={`flex items-center gap-3 ${stage === 'sorted' || progress > 33 ? 'text-[#00C853]' : 'text-muted-foreground'}`}>
                      <div className="w-8 h-8 rounded-full bg-current/20 flex items-center justify-center">
                        {progress > 33 ? '✓' : '2'}
                      </div>
                      <div className="font-medium">Sorted (AI-Powered)</div>
                    </div>

                    <div className={`flex items-center gap-3 ${stage === 'recycled' || progress > 66 ? 'text-[#00C853]' : 'text-muted-foreground'}`}>
                      <div className="w-8 h-8 rounded-full bg-current/20 flex items-center justify-center">
                        {progress > 66 ? '✓' : '3'}
                      </div>
                      <div className="font-medium">Recycled</div>
                    </div>

                    <div className={`flex items-center gap-3 ${progress === 100 ? 'text-[#00C853]' : 'text-muted-foreground'}`}>
                      <div className="w-8 h-8 rounded-full bg-current/20 flex items-center justify-center">
                        {progress === 100 ? '✓' : '4'}
                      </div>
                      <div className="font-medium">Ready for Reuse</div>
                    </div>
                  </div>

                  {progress === 100 && (
                    <div className="mt-6 p-4 bg-green-100 dark:bg-green-900/20 rounded-lg text-center">
                      <p className="text-[#00C853] font-bold">🎉 Recycling Complete!</p>
                    </div>
                  )}
                </Card>
              )}
            </div>
          </div>

          {/* Collection Points Map */}
          <div className="mt-16 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              <MapPin className="inline w-8 h-8 text-[#00C853] mr-2" />
              Nearest Collection Centers
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {collectionPoints.map(point => (
                <Card key={point.id} className="p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-6 h-6 text-[#00C853] flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-1">{point.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{point.address}</p>
                      <div className="text-[#00C853] font-medium">{point.distance} away</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}