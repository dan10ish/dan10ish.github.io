import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SocialLinks from './components/SocialLinks';
import { personalInfo } from './data';

export default function NotFound() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-base font-bold">404</h1>
        <p className="text-base opacity-70">page not found</p>

        <Link href="/" className="inline-flex items-center gap-2 mt-6 bg-[var(--code-bg)] !px-2 !py-1 rounded-md !mb-6" aria-label="Go back to home page">
          <ArrowLeft size={16} />
          <span>back to home</span>
        </Link>

        <div className="flex justify-center">
        <SocialLinks
          github={personalInfo.socials.github}
          email={personalInfo.socials.email}
          x={personalInfo.socials.x}
          instagram={personalInfo.socials.instagram}
          linkedin={personalInfo.socials.linkedin}
        /></div>
      </div>
    </div>
  );
}