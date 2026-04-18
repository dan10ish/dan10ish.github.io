'use client';

import { useRouter, usePathname } from 'next/navigation';
import NameSvg from './NameSvg';
import ThemeToggle from './ThemeToggle';
import { personalInfo } from '../data';

export default function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === '/';

  const handleNameClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="site-header-name-frame" aria-hidden={false}>
        <a
          href="/"
          onClick={handleNameClick}
          className="site-header-name"
          aria-label={isHome ? `${personalInfo.name} — Scroll to top` : `${personalInfo.name} — Home`}
        >
          <NameSvg />
        </a>
      </div>

      <header className="flex items-center justify-between gap-4 w-full mb-6 min-h-[45px]">
        <span className="w-[95px] h-[45px] shrink-0" aria-hidden="true" />
        <ThemeToggle />
      </header>
    </>
  );
}
