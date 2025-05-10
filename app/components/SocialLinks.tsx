'use client';

import { Github, Mail, Instagram } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';

const XIcon = memo((props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 256 256"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z" />
  </svg>
));

XIcon.displayName = 'XIcon';

const LinkedInIcon = memo((props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="2" />
    <path d="M8 11v5" />
    <path d="M8 8v.01" />
    <path d="M12 16v-5" />
    <path d="M16 16v-3a2 2 0 0 0-4 0" />
  </svg>
));

LinkedInIcon.displayName = 'LinkedInIcon';

interface SocialLinksProps {
  github?: string;
  email?: string;
  x?: string;
  instagram?: string;
  linkedin?: string;
}

export default function SocialLinks({ github, email, x, instagram, linkedin }: SocialLinksProps) {
  return (
    <div className="flex items-center gap-2">
      {github && (
        <Link href={`https://github.com/${github}`} target="_blank" className="flex items-center justify-center" aria-label={`GitHub profile of ${github}`}>
          <Github size={20} />
        </Link>
      )}
      {email && (
        <Link href={`mailto:${email}`} className="flex items-center justify-center" aria-label={`Send email to ${email}`}>
          <Mail size={20} />
        </Link>
      )}
      {linkedin && (
        <Link href={`https://www.linkedin.com/in/${linkedin}`} target="_blank" className="flex items-center justify-center" aria-label={`LinkedIn profile of ${linkedin}`}>
          <LinkedInIcon />
        </Link>
      )}
      {x && (
        <Link href={`https://x.com/${x}`} target="_blank" className="flex items-center justify-center" aria-label={`X (Twitter) profile of ${x}`}>
          <XIcon />
        </Link>
      )}
      {instagram && (
        <Link href={`https://instagram.com/${instagram}`} target="_blank" className="flex items-center justify-center" aria-label={`Instagram profile of ${instagram}`}>
          <Instagram size={20} />
        </Link>
      )}
    </div>
  );
} 