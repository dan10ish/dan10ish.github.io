import { GraduationCap, Cpu, Bot, Rocket } from 'lucide-react'
import Menu from '../components/Menu'
import GitHubContributions from '../components/GitHubContributions'
import Nav from '../components/Nav'
import { personalInfo } from '../data'
import Image from 'next/image'

const experience = [
  { year: '2025', company: 'Mumbai University', icon: 'graduation-cap', position: 'top' },
  { year: '2024', company: 'Projects & Research', icon: 'cpu', position: 'bottom' },
  { year: '2023', company: 'University Labs', icon: 'bot', position: 'top' },
  { year: '2022', company: 'Mumbai University', icon: 'rocket', position: 'bottom' }
]

export default function About() {
  return (
    <>
      <Menu page="writing" />
      <Nav currentPage="about" />
      <div className="max-w-3xl! mx-auto! py-8! mt-12!">
        <div className="flex! flex-col! gap-8!">
          <section>
            <div className="flex! items-center! gap-4! mb-6!">
              <div className="w-20! h-20! rounded-full! bg-secondary/20! shrink-0! overflow-hidden!">
                <Image
                  src={`https://github.com/${personalInfo.socials.github}.png`}
                  alt={personalInfo.name}
                  width={80}
                  height={80}
                  className="w-full! h-full! object-cover!"
                  unoptimized
                />
              </div>
              <div>
                <h1 className="font-bold! mb-0.5!">{personalInfo.name}</h1>
                <p className="text-secondary! text-sm!">Mechatronics Engineer</p>
              </div>
            </div>
            <p className="text-secondary! leading-relaxed! text-sm!">{personalInfo.about}</p>
          </section>

          <section>
            <h2 className="font-semibold! mb-8!">Experience</h2>
            <div className="relative! flex! items-center! justify-between! gap-6! overflow-x-auto! pb-8!">
              <div
                className="absolute! top-1/2! left-0! right-0! h-px! -translate-y-1/2! pointer-events-none!"
                style={{ backgroundColor: 'rgba(107, 107, 107, 0.25)' }}
              />
              {experience.map((item, index) => {
                const Icon = item.icon === 'graduation-cap' ? GraduationCap : 
                            item.icon === 'cpu' ? Cpu : 
                            item.icon === 'bot' ? Bot : Rocket
                return (
                  <div key={index} className="relative! flex! flex-col! items-center! min-w-[140px]! z-10! text-center! py-2!">
                    {item.position === 'bottom' && (
                      <div className="mb-6! flex! flex-col! gap-1!">
                        <div className="text-xs! font-semibold!">{item.company}</div>
                        <div className="text-xs! text-secondary!">{item.year}</div>
                      </div>
                    )}
                    <div className="flex! flex-col! items-center! gap-3!">
                      {item.position === 'bottom' && (
                        <div
                          className="w-px! h-16!"
                          style={{ backgroundColor: 'rgba(107, 107, 107, 0.25)' }}
                        />
                      )}
                      <div className="relative! w-12! h-12! rounded-full! border! border-secondary/30! bg-background! flex! items-center! justify-center!">
                        <Icon size={18} className="text-foreground!" />
                      </div>
                      {item.position === 'top' && (
                        <div
                          className="w-px! h-16!"
                          style={{ backgroundColor: 'rgba(107, 107, 107, 0.25)' }}
                        />
                      )}
                    </div>
                    {item.position === 'top' && (
                      <div className="mt-6! flex! flex-col! gap-1!">
                        <div className="text-xs! font-semibold!">{item.company}</div>
                        <div className="text-xs! text-secondary!">{item.year}</div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>

          <section>
            <h2 className="font-semibold! mb-4!">GitHub Activity</h2>
            <GitHubContributions username={personalInfo.socials.github} />
          </section>
        </div>
      </div>
    </>
  )
}

