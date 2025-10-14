"use client"

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pledgeCount, setPledgeCount] = useState(12847)
  const [isPledging, setIsPledging] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  // Fetch pledge count on mount
  useEffect(() => {
    fetchPledgeCount()
  }, [])

  const fetchPledgeCount = async () => {
    try {
      const response = await fetch('/api/pledges')
      if (response.ok) {
        const data = await response.json()
        setPledgeCount(data.count)
      }
    } catch (error) {
      console.error('Failed to fetch pledge count:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          message: formData.message,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to submit contact form')
      }

      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
      toast.success('Message sent successfully! We\'ll get back to you soon.')
      
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePledge = async () => {
    if (!formData.name || !formData.email) {
      toast.error('Please enter your name and email to take the pledge')
      return
    }

    setIsPledging(true)

    try {
      const response = await fetch('/api/pledges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: 'I pledge to responsibly recycle my electronic waste',
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to submit pledge')
      }

      toast.success('Thank you for taking the pledge! Together we can make a difference.')
      fetchPledgeCount() // Refresh count
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to submit pledge. Please try again.')
    } finally {
      setIsPledging(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main className="min-h-screen circuit-bg">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient-eco">Get in Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Join the movement towards a sustainable future. Contact us or take the pledge today!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-20 h-20 text-[#00C853] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#00C853] mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">
                    Your message has been received. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how you'd like to contribute..."
                      rows={6}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gradient-eco text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>

            {/* Contact Info & Pledge */}
            <div className="space-y-8">
              {/* Contact Information */}
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#00C853]/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[#00C853]" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Email Us</h3>
                      <a href="mailto:sidhant.mattoo24@pccoepune.org" className="text-sm text-muted-foreground hover:text-[#00C853]">
                        sidhant.mattoo24@pccoepune.org
                      </a><br/>
                      <a href="mailto:harshit.pandita24@pccoepune.org" className="text-sm text-muted-foreground hover:text-[#00C853]">
                        harshit.pandita24@pccoepune.org
                      </a><br/>
                      <a href="mailto:shrejal.bhardwaj24@pccoepune.org" className="text-sm text-muted-foreground hover:text-[#00C853]">
                        shrejal.bhardwaj24@pccoepune.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#2196F3]/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#2196F3]" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Visit Us</h3>
                      <p className="text-sm text-muted-foreground">
                        Pimpri Chinchwad College of Engineering<br />
                        Sector 26, Pradhikaran, Nigdi<br />
                        Pune, Maharashtra 411044
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#FFD700]/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[#FFD700]" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Call Us</h3>
                      <p className="text-sm text-muted-foreground">
                        Available Mon-Fri, 9AM-6PM IST
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Sustainability Pledge */}
              <Card className="p-8 gradient-eco text-white">
                <h2 className="text-2xl font-bold mb-4">Take the Pledge</h2>
                <p className="mb-6 opacity-90">
                  Join thousands of eco-warriors committed to responsible e-waste management
                </p>

                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg mb-6">
                  <p className="text-sm mb-4 italic">
                    "I pledge to responsibly recycle my electronic waste, support circular economy 
                    practices, and inspire others to join the sustainability movement."
                  </p>
                </div>

                <Button 
                  className="w-full bg-white text-[#00C853] hover:bg-gray-100"
                  onClick={handlePledge}
                  disabled={isPledging || !formData.name || !formData.email}
                >
                  {isPledging ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting Pledge...
                    </>
                  ) : (
                    'Sign the Pledge'
                  )}
                </Button>

                <div className="mt-6 pt-6 border-t border-white/20 text-center">
                  <div className="text-3xl font-bold mb-1">{pledgeCount.toLocaleString()}</div>
                  <div className="text-sm opacity-80">People have taken the pledge</div>
                </div>
              </Card>

              {/* QR Code Section */}
              <Card className="p-8 text-center">
                <h3 className="font-bold mb-4">Join Community Drives</h3>
                <div className="w-48 h-48 mx-auto bg-gradient-eco-light rounded-xl flex items-center justify-center mb-4">
                  <div className="text-6xl">📱</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Scan to register for upcoming e-waste collection events in your area
                </p>
              </Card>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="mt-20 max-w-4xl mx-auto">
            <Card className="p-12 text-center gradient-eco text-white">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Every device recycled is a step towards a sustainable future
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-[#00C853] hover:bg-gray-100">
                  Book Pickup Now
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                  View Collection Points
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}