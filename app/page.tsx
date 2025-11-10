import Link from 'next/link'
import { Github, Instagram, Mail } from 'lucide-react'
import Menu from './components/Menu'
import Card from './components/Card'
import { personalInfo } from './data'

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z" />
  </svg>
)

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 30 30" fill="currentColor" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"/>
  </svg>
)

const SnapchatIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5.829 4.533c-.6 1.344-.363 3.752-.267 5.436-.648.359-1.48-.271-1.951-.271-.49 0-1.075.322-1.167.802-.066.346.089.85 1.201 1.289.43.17 1.453.37 1.69.928.333.784-1.71 4.403-4.918 4.931-.251.041-.43.265-.416.519.056.975 2.242 1.357 3.211 1.507.099.134.179.7.306 1.131.057.193.204.424.582.424.493 0 1.312-.38 2.738-.144 1.398.233 2.712 2.215 5.235 2.215 2.345 0 3.744-1.991 5.09-2.215.779-.129 1.448-.088 2.196.058.515.101.977.157 1.124-.349.129-.437.208-.992.305-1.123.96-.149 3.156-.53 3.211-1.505.014-.254-.165-.477-.416-.519-3.154-.52-5.259-4.128-4.918-4.931.236-.557 1.252-.755 1.69-.928.814-.321 1.222-.716 1.213-1.173-.011-.585-.715-.934-1.233-.934-.527 0-1.284.624-1.897.286.096-1.698.332-4.095-.267-5.438-1.135-2.543-3.66-3.829-6.184-3.829-2.508 0-5.014 1.268-6.158 3.833z" />
  </svg>
)

const socialLinks = [
  {
    id: 'github',
    href: `https://github.com/${personalInfo.socials.github}`,
    icon: <Github size={18} />,
    label: 'GitHub',
  },
  {
    id: 'linkedin',
    href: `https://www.linkedin.com/in/${personalInfo.socials.linkedin}`,
    icon: <LinkedInIcon />,
    label: 'LinkedIn',
  },
  {
    id: 'x',
    href: `https://x.com/${personalInfo.socials.x}`,
    icon: <XIcon />,
    label: 'X',
  },
  {
    id: 'instagram',
    href: `https://instagram.com/${personalInfo.socials.instagram}`,
    icon: <Instagram size={18} />,
    label: 'Instagram',
  },
  {
    id: 'snapchat',
    href: `https://www.snapchat.com/add/${personalInfo.socials.snapchat}`,
    icon: <SnapchatIcon />,
    label: 'Snapchat',
  },
  {
    id: 'email',
    href: `mailto:${personalInfo.socials.email}`,
    icon: <Mail size={18} />,
    label: 'Email',
  },
] as const

const iconButtonClass =
  'flex! h-11! w-11! items-center! justify-center! rounded-full! border! border-(--border)! transition-transform! duration-200! text-secondary! hover:scale-110! hover:border-(--foreground)! hover:text-(--foreground)!'

export default function Home() {
  return (
    <div className="relative! flex! min-h-[calc(100dvh-3rem)]! w-full! items-center! justify-center! px-4!">
      <Menu page="home" />
      <div className="flex! w-full! max-w-4xl! flex-col! items-center! justify-center! gap-12!">
        <Card />
        <div className="flex! flex-wrap! items-center! justify-center! gap-5!">
          {socialLinks.map(({ id, href, icon, label }) => (
            <Link
              key={id}
              href={href}
              aria-label={label}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={iconButtonClass}
            >
              {icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
