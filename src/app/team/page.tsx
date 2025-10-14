import Navigation from '@/components/Navigation'
import { Card } from '@/components/ui/card'
import { Mail, Github, Linkedin } from 'lucide-react'

const teamMembers = [
  {
    name: 'Sidhant Mattoo',
    role: 'Core Web Developer',
    email: 'sidhant.mattoo24@pccoepune.org',
    image: 'https://drive.google.com/uc?export=view&id=1n-cmDrTrpnqZx0YWZ42NqiRB6YtrZZui',
    description: 'Full-stack developer specializing in modern web technologies and sustainable tech solutions.'
  },
  {
    name: 'Harshit Pandita',
    role: 'Debugger & Quality Lead',
    email: 'harshit.pandita24@pccoepune.org',
    image: 'https://drive.google.com/uc?export=view&id=1bMxxfF6K3MPt2STHRFRtheVM8LJ78uCs',
    description: 'Expert in code quality, testing, and ensuring robust application performance.'
  },
  {
    name: 'Shrejal Bhardwaj',
    role: 'Research Lead',
    email: 'shrejal.bhardwaj24@pccoepune.org',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    description: 'Leading research on e-waste management, circular economy models, and sustainability practices.'
  }
]

export default function TeamPage() {
  return (
    <main className="min-h-screen circuit-bg">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">
              Meet Our <span className="text-gradient-eco">Team</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Passionate innovators working together to create a sustainable future through smart e-waste management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {teamMembers.map((member, index) => (
              <Card 
                key={index} 
                className="p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-glow"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-[#00C853]"
                    />
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-eco rounded-full flex items-center justify-center text-white text-xl">
                      ✓
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                  <div className="text-[#00C853] font-semibold mb-4">{member.role}</div>
                  <p className="text-sm text-muted-foreground mb-6">{member.description}</p>

                  <div className="flex justify-center gap-4">
                    <a
                      href={`mailto:${member.email}`}
                      className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-[#00C853] hover:text-white transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Institution Section */}
          <Card className="p-12 max-w-4xl mx-auto text-center gradient-eco text-white">
            <h2 className="text-3xl font-bold mb-4">Pimpri Chinchwad College of Engineering</h2>
            <p className="text-xl mb-6">
              Empowering students to create innovative solutions for a sustainable future
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-left">
              <div>
                <div className="text-4xl font-bold mb-1">500+</div>
                <div className="text-sm opacity-90">Students Engaged</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-1">50+</div>
                <div className="text-sm opacity-90">Research Projects</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-1">10+</div>
                <div className="text-sm opacity-90">Industry Partners</div>
              </div>
            </div>
          </Card>

          {/* Contact CTA */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold mb-4">Want to collaborate?</h3>
            <p className="text-muted-foreground mb-6">
              We're always looking for partners and contributors to join our sustainability mission
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:sidhant.mattoo24@pccoepune.org" className="inline-block">
                <button className="px-8 py-3 gradient-eco text-white rounded-full font-semibold hover:shadow-lg transition-shadow">
                  Get in Touch
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}