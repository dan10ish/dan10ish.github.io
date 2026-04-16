'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NameSvg from './NameSvg';
import SocialLinks from './SocialLinks';
import { personalInfo } from '../data';

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header className="site-header">
      <div className="site-header-inner">
        {isHome ? (
          <span className="site-header-name" aria-label={personalInfo.name}>
            <NameSvg />
          </span>
        ) : (
          <Link
            href="/"
            className="site-header-name"
            aria-label={`${personalInfo.name} — Home`}
          >
            <NameSvg />
          </Link>
        )}

        {isHome && (
          <SocialLinks
            github={personalInfo.socials.github}
            email={personalInfo.socials.email}
            x={personalInfo.socials.x}
            instagram={personalInfo.socials.instagram}
            linkedin={personalInfo.socials.linkedin}
            snapchat={personalInfo.socials.snapchat}
            threads={personalInfo.socials.threads}
          />
        )}
      </div>
    </header>
  );
}
