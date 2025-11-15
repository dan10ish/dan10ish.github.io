import { ChartSpline, CodeXml, Cpu } from 'lucide-react'
import Menu from '../components/Menu'
import GitHubContributions from '../components/GitHubContributions'
import Nav from '../components/Nav'
import { personalInfo } from '../data'
import Image from 'next/image'

const experience = [
  { year: '2025', company: 'Innovatio Labs', icon: 'chart-spline' },
  { year: '2024', company: 'Cridaa', icon: 'code-xml' },
  { year: '2023', company: 'Accelus Robotics', icon: 'cpu' }
]

export default function About() {
  return (
    <>
      <Menu page="writing" />
      <Nav currentPage="about" />
      <div className="max-w-3xl! mx-auto! py-6! mt-8! pb-12!">
        <div className="flex! flex-col! gap-5!">
          <section>
            <div className="flex! items-center! gap-3! mb-4!">
              <div className="w-16! h-16! rounded-full! bg-secondary/20! shrink-0! overflow-hidden!">
                <Image
                  src={`https://github.com/${personalInfo.socials.github}.png`}
                  alt={personalInfo.name}
                  width={64}
                  height={64}
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
            <h2 className="font-semibold! mb-4!">Experience</h2>
            <div>
              {experience.map((item, index) => {
                const Icon = item.icon === 'chart-spline' ? ChartSpline : 
                            item.icon === 'code-xml' ? CodeXml : Cpu
                const isLast = index === experience.length - 1
                
                return (
                  <div key={index} className="flex! mb-5! last:mb-0! relative!">
                    <div className="relative! z-10!">
                      <div 
                        className="w-9! h-9! rounded-full! flex! items-center! justify-center! mr-3! border-2!"
                        style={{ borderColor: 'var(--border)' }}
                      >
                        <Icon size={14} />
                      </div>
                      {!isLast && (
                        <div 
                          className="absolute! left-[17px]! top-9! bottom-[-20px]! w-[2px]! z-1!"
                          style={{ backgroundColor: 'var(--border)' }}
                        />
                      )}
                    </div>
                    <div className="flex-1! pt-0.5!">
                      <div className="font-semibold! text-sm! text-foreground!">{item.company}</div>
                      <div className="text-xs! text-secondary!">{item.year}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <section>
            <h2 className="font-semibold! mb-3!">GitHub Activity</h2>
            <GitHubContributions username={personalInfo.socials.github} />
          </section>
        </div>
      </div>
    </>
  )
}

