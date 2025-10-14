import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import StatsCounter from '@/components/StatsCounter'
import CircularEconomyFlow from '@/components/CircularEconomyFlow'
import CTASection from '@/components/CTASection'

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <StatsCounter />
      <CircularEconomyFlow />
      <CTASection />
    </main>
  )
}